/**
 * OWL Ontology Generator from TypeBox + RDF Schemas
 *
 * Automatically generates OWL ontologies (in Turtle format) from semantically-enhanced
 * TypeBox schemas that include RDF and OWL metadata via the DSL.
 */

import DataFactory from "@rdfjs/data-model";
import { Writer } from "n3";
import { prefix, term, type IRI } from "../vocab";
import { extractRdf, type SemanticSchema, type PropMeta } from "../dsl";

/**
 * OWL generation options
 */
export interface OwlOptions {
  /** Ontology IRI */
  ontologyIri?: string;
  /** Include version IRI */
  versionIri?: string;
  /** Include imports */
  imports?: IRI<string>[];
  /** Custom prefixes to include */
  customPrefixes?: Record<string, string>;
  /** Include annotations */
  includeAnnotations?: boolean;
}

/**
 * Generate OWL ontology in Turtle format from semantic TypeBox schemas
 *
 * @param schemas - Array of semantic TypeBox schemas
 * @param options - OWL generation options
 * @returns OWL ontology as Turtle string
 */
export function generateOwlTurtle(
  schemas: SemanticSchema[],
  options: OwlOptions = {}
): string {
  const {
    ontologyIri = "https://dodaf.defense.gov/ontology",
    versionIri,
    imports = [],
    customPrefixes = {},
    includeAnnotations = true
  } = options;

  const writer = new Writer({
    prefixes: {
      ...prefix,
      ...customPrefixes,
      "": ontologyIri + "#"
    }
  });

  const ontologyNode = DataFactory.namedNode(ontologyIri);

  // Ontology declaration
  writer.addQuad(
    ontologyNode,
    DataFactory.namedNode(term.rdf.type),
    DataFactory.namedNode(term.owl.Class.replace("Class", "Ontology"))
  );

  // Version IRI
  if (versionIri) {
    writer.addQuad(
      ontologyNode,
      DataFactory.namedNode(`${prefix.owl}versionIRI`),
      DataFactory.namedNode(versionIri)
    );
  }

  // Imports
  for (const importIri of imports) {
    writer.addQuad(
      ontologyNode,
      DataFactory.namedNode(`${prefix.owl}imports`),
      DataFactory.namedNode(String(importIri))
    );
  }

  // Process each schema
  for (const schema of schemas) {
    if (!extractRdf.hasRdf(schema)) continue;

    const classIri = extractRdf.getClass(schema);
    if (!classIri) continue;

    const classNode = DataFactory.namedNode(String(classIri));
    const props = extractRdf.getProperties(schema);

    // Declare OWL Class
    writer.addQuad(
      classNode,
      DataFactory.namedNode(term.rdf.type),
      DataFactory.namedNode(term.owl.Class)
    );

    // Add annotations
    if (includeAnnotations) {
      const comment = schema["@rdf"]?.["rdfs:comment"];
      if (comment) {
        writer.addQuad(
          classNode,
          DataFactory.namedNode(term.rdfs.comment),
          DataFactory.literal(String(comment))
        );
      }

      // Add label if not present
      const label = getLocalNameFromIri(classIri);
      writer.addQuad(
        classNode,
        DataFactory.namedNode(term.rdfs.label),
        DataFactory.literal(label)
      );
    }

    // Process properties
    for (const [propName, propMeta] of Object.entries(props)) {
      if (!propMeta["@prop"]) continue;

      const propNode = DataFactory.namedNode(String(propMeta["@prop"]));
      const isObjectProperty = propMeta["@kind"] === "object";

      // Declare property type
      const propType = isObjectProperty ? term.owl.ObjectProperty : term.owl.DatatypeProperty;
      writer.addQuad(
        propNode,
        DataFactory.namedNode(term.rdf.type),
        DataFactory.namedNode(propType)
      );

      // Domain (inferred from class)
      writer.addQuad(
        propNode,
        DataFactory.namedNode(term.rdfs.domain),
        classNode
      );

      // Range
      if (propMeta["rdfs:range"]) {
        writer.addQuad(
          propNode,
          DataFactory.namedNode(term.rdfs.range),
          DataFactory.namedNode(String(propMeta["rdfs:range"]))
        );
      } else if (!isObjectProperty && propMeta["sh:datatype"]) {
        writer.addQuad(
          propNode,
          DataFactory.namedNode(term.rdfs.range),
          DataFactory.namedNode(String(propMeta["sh:datatype"]))
        );
      }

      // Functional property
      if (propMeta["owl:FunctionalProperty"]) {
        writer.addQuad(
          propNode,
          DataFactory.namedNode(term.rdf.type),
          DataFactory.namedNode(`${prefix.owl}FunctionalProperty`)
        );
      }

      // Inverse functional property
      if (propMeta["owl:InverseFunctionalProperty"]) {
        writer.addQuad(
          propNode,
          DataFactory.namedNode(term.rdf.type),
          DataFactory.namedNode(`${prefix.owl}InverseFunctionalProperty`)
        );
      }

      // Property annotations
      if (includeAnnotations) {
        writer.addQuad(
          propNode,
          DataFactory.namedNode(term.rdfs.label),
          DataFactory.literal(propName)
        );
      }
    }
  }

  // Add subclass relationships (if inferable from schema structure)
  addInferredSubclassRelationships(writer, schemas);

  // Convert to Turtle string
  let turtle = "";
  writer.end((error, result) => {
    if (error) throw error;
    turtle = result;
  });

  return turtle;
}

/**
 * Add inferred subclass relationships based on schema analysis
 */
function addInferredSubclassRelationships(writer: Writer, schemas: SemanticSchema[]): void {
  // This is a simplified inference - in a full implementation,
  // you might want to analyze schema inheritance or composition

  const classMap = new Map<string, SemanticSchema>();

  // Build class map
  for (const schema of schemas) {
    const classIri = extractRdf.getClass(schema);
    if (classIri) {
      classMap.set(String(classIri), schema);
    }
  }

  // Simple inference: if a class has "type" property that references another class,
  // it might be a subclass
  for (const [classIri, schema] of classMap) {
    const props = extractRdf.getProperties(schema);

    for (const [propName, propMeta] of Object.entries(props)) {
      if (propName === "type" && propMeta["@kind"] === "object" && propMeta["sh:in"]) {
        // If type property has enumerated values, those might be subclasses
        const typeValues = propMeta["sh:in"];
        if (Array.isArray(typeValues)) {
          for (const typeValue of typeValues) {
            if (typeof typeValue === "string" && classMap.has(typeValue)) {
              const subclassNode = DataFactory.namedNode(classIri);
              const superclassNode = DataFactory.namedNode(typeValue);

              writer.addQuad(
                subclassNode,
                DataFactory.namedNode(`${prefix.rdfs}subClassOf`),
                superclassNode
              );
            }
          }
        }
      }
    }
  }
}

/**
 * Generate DoDAF-specific OWL ontology
 *
 * @param schemas - Array of semantic TypeBox schemas
 * @returns OWL ontology as Turtle string
 */
export function generateDodafOwlTurtle(schemas: SemanticSchema[]): string {
  return generateOwlTurtle(schemas, {
    ontologyIri: "https://dodaf.defense.gov/ontology",
    versionIri: "https://dodaf.defense.gov/ontology/2.0",
    imports: [
      "http://www.w3.org/2002/07/owl#" as IRI<string>,
      "http://www.w3.org/2000/01/rdf-schema#" as IRI<string>,
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#" as IRI<string>,
    ],
    includeAnnotations: true,
    customPrefixes: {
      dodaf: prefix.dodaf
    }
  });
}

/**
 * Validate generated OWL ontology
 *
 * @param turtle - OWL Turtle string
 * @returns Validation report
 */
export function validateOwlTurtle(turtle: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    // Basic syntax validation by parsing
    const parser = new (require('n3').Parser)();
    parser.parse(turtle);
  } catch (error) {
    errors.push(`OWL syntax error: ${error}`);
  }

  // Additional OWL-specific validations could be added here
  // - Check for ontology declaration
  // - Validate IRI formats
  // - Check for inconsistent property declarations
  // - Verify subclass cycles

  return {
    valid: errors.length === 0,
    errors
  };
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
