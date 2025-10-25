/**
 * JSON-LD Context Generator from TypeBox + RDF Schemas
 *
 * Automatically generates JSON-LD contexts from semantically-enhanced TypeBox schemas
 * that include RDF metadata via the DSL.
 */

import { prefix, term, type IRI } from "../vocab";
import { extractRdf, type SemanticSchema } from "../dsl";

/**
 * JSON-LD Context generation options
 */
export interface JsonLdContextOptions {
  /** Base IRI for the context */
  base?: string;
  /** Version information */
  version?: string;
  /** Include standard prefixes */
  includeStandardPrefixes?: boolean;
  /** Custom prefix mappings */
  customPrefixes?: Record<string, string>;
}

/**
 * Generate JSON-LD context from semantic TypeBox schemas
 *
 * @param schemas - Array of semantic TypeBox schemas
 * @param options - Context generation options
 * @returns JSON-LD context object
 */
export function generateJsonLdContext(
  schemas: SemanticSchema[],
  options: JsonLdContextOptions = {}
): Record<string, any> {
  const {
    base = "https://dodaf.defense.gov/ontology#",
    version = "1.1",
    includeStandardPrefixes = true,
    customPrefixes = {}
  } = options;

  const context: Record<string, any> = {
    "@version": version,
    "@base": base,
  };

  // Add standard prefixes
  if (includeStandardPrefixes) {
    context.dodaf = prefix.dodaf;
    context.rdf = prefix.rdf;
    context.rdfs = prefix.rdfs;
    context.owl = prefix.owl;
    context.sh = prefix.sh;
    context.xsd = prefix.xsd;
    context.dct = prefix.dct;
    context.foaf = prefix.foaf;
    context.schema = prefix.schema;
  }

  // Add custom prefixes
  Object.assign(context, customPrefixes);

  // Add JSON-LD keyword mappings
  context.id = "@id";
  context.type = "@type";

  // Process each schema for context mappings
  for (const schema of schemas) {
    if (!extractRdf.hasRdf(schema)) continue;

    const rdfMeta = schema["@rdf"];
    const props = extractRdf.getProperties(schema);

    // Add schema-level context mappings
    if (rdfMeta?.["@context"]) {
      Object.assign(context, rdfMeta["@context"]);
    }

    // Add property mappings
    for (const [propName, propMeta] of Object.entries(props)) {
      if (propMeta["@prop"]) {
        // Map property name to IRI
        context[propName] = String(propMeta["@prop"]);
      }
    }

    // Add class mapping if it doesn't exist
    const classIri = extractRdf.getClass(schema);
    if (classIri) {
      const className = getLocalNameFromIri(classIri);
      if (!context[className]) {
        context[className] = String(classIri);
      }
    }
  }

  return context;
}

/**
 * Generate compact JSON-LD context optimized for DoDAF
 *
 * @param schemas - Array of semantic TypeBox schemas
 * @returns Optimized JSON-LD context
 */
export function generateDodafJsonLdContext(schemas: SemanticSchema[]): Record<string, any> {
  return generateJsonLdContext(schemas, {
    base: "https://dodaf.defense.gov/ontology#",
    includeStandardPrefixes: true,
    customPrefixes: {
      // DoDAF-specific compact terms
      name: term.schema.name,
      description: term.schema.description,
      purpose: term.dodaf.purpose,
      created: term.dct.created,
      modified: term.dct.modified,
      author: term.dct.creator,
      organization: term.foaf.organization,
    }
  });
}

/**
 * Extract local name from IRI (helper function)
 */
function getLocalNameFromIri(iri: IRI<string>): string {
  const hashIndex = String(iri).lastIndexOf('#');
  const slashIndex = String(iri).lastIndexOf('/');
  const index = Math.max(hashIndex, slashIndex);
  return index >= 0 ? String(iri).substring(index + 1) : String(iri);
}

/**
 * Validate that all required IRIs are properly defined
 *
 * @param context - Generated context
 * @param schemas - Source schemas
 * @returns Validation report
 */
export function validateJsonLdContext(
  context: Record<string, any>,
  schemas: SemanticSchema[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check that all properties from schemas are represented
  for (const schema of schemas) {
    if (!extractRdf.hasRdf(schema)) continue;

    const props = extractRdf.getProperties(schema);
    for (const [propName, propMeta] of Object.entries(props)) {
      if (propMeta["@prop"] && !context[propName]) {
        errors.push(`Property '${propName}' is not mapped in context`);
      }
    }
  }

  // Check for duplicate mappings
  const mappings = new Map<string, string[]>();
  for (const [key, value] of Object.entries(context)) {
    if (typeof value === 'string' && !key.startsWith('@')) {
      if (!mappings.has(value)) {
        mappings.set(value, []);
      }
      mappings.get(value)!.push(key);
    }
  }

  for (const [iri, keys] of mappings) {
    if (keys.length > 1) {
      errors.push(`IRI '${iri}' is mapped to multiple terms: ${keys.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Export context as formatted JSON string
 *
 * @param context - Context object
 * @returns Formatted JSON string
 */
export function exportContextAsJson(context: Record<string, any>): string {
  return JSON.stringify(context, null, 2);
}

/**
 * Generate context and export as JSON file content
 *
 * @param schemas - Source schemas
 * @param options - Context options
 * @returns JSON file content
 */
export function generateContextFile(
  schemas: SemanticSchema[],
  options?: JsonLdContextOptions
): string {
  const context = generateJsonLdContext(schemas, options);
  return exportContextAsJson(context);
}
