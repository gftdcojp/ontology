/**
 * SHACL Shape Generator from TypeBox + RDF Schemas
 *
 * Automatically generates SHACL shapes (in Turtle format) from semantically-enhanced
 * TypeBox schemas that include RDF and SHACL metadata via the DSL.
 */

import DataFactory from "@rdfjs/data-model";
import { Writer } from "n3";
import type { TObject } from "@sinclair/typebox";
import { prefix, term, type IRI } from "../vocab";
import { extractRdf, type SemanticSchema, type PropMeta } from "../dsl";

/**
 * SHACL generation options
 */
export interface ShaclOptions {
  /** Include base IRI in output */
  includeBase?: boolean;
  /** Generate property shapes inline or separate */
  inlinePropertyShapes?: boolean;
  /** Custom prefixes to include */
  customPrefixes?: Record<string, string>;
}

/**
 * Generate SHACL shapes in Turtle format from semantic TypeBox schemas
 *
 * @param schemas - Array of semantic TypeBox schemas
 * @param options - SHACL generation options
 * @returns SHACL shapes as Turtle string
 */
export function generateShaclTurtle(
  schemas: SemanticSchema[],
  options: ShaclOptions = {}
): string {
  const {
    includeBase = true,
    inlinePropertyShapes = false,
    customPrefixes = {}
  } = options;

  const writer = new Writer({
    prefixes: {
      ...prefix,
      ...customPrefixes
    }
  });

  // Add base directive if requested
  if (includeBase) {
    writer.addPrefix("", prefix.dodaf);
  }

  for (const schema of schemas) {
    if (!extractRdf.hasRdf(schema)) continue;

    const classIri = extractRdf.getClass(schema);
    if (!classIri) continue;

    const shapeIri = DataFactory.namedNode(`${String(classIri)}Shape`);
    const classNode = DataFactory.namedNode(String(classIri));
    const props = extractRdf.getProperties(schema);

    // Create NodeShape
    writer.addQuad(
      shapeIri,
      DataFactory.namedNode(term.rdf.type),
      DataFactory.namedNode(term.sh.NodeShape)
    );

    // Add target class
    writer.addQuad(
      shapeIri,
      DataFactory.namedNode(term.sh.targetClass),
      classNode
    );

    // Add rdfs:comment if present
    const comment = schema["@rdf"]?.["rdfs:comment"];
    if (comment) {
      writer.addQuad(
        shapeIri,
        DataFactory.namedNode(term.rdfs.comment),
        DataFactory.literal(String(comment))
      );
    }

    // Process properties
    for (const [propName, propMeta] of Object.entries(props)) {
      if (!propMeta["@prop"]) continue;

      const propertyShape = inlinePropertyShapes
        ? DataFactory.blankNode()
        : DataFactory.namedNode(`${String(classIri)}Shape_${propName}`);

      // Add property to shape
      writer.addQuad(
        shapeIri,
        DataFactory.namedNode(term.sh.property),
        propertyShape
      );

      // Add property path
      writer.addQuad(
        propertyShape,
        DataFactory.namedNode(term.sh.path),
        DataFactory.namedNode(String(propMeta["@prop"]))
      );

      // Add SHACL constraints
      addShaclConstraints(writer, propertyShape, propMeta);
    }
  }

  // Convert to Turtle string
  let turtle = "";
  writer.end((error, result) => {
    if (error) throw error;
    turtle = result;
  });

  return turtle;
}

/**
 * Add SHACL constraints to a property shape
 */
function addShaclConstraints(
  writer: Writer,
  propertyShape: any,
  propMeta: PropMeta
): void {
  // Cardinality constraints
  if (typeof propMeta["sh:minCount"] === "number") {
    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(term.sh.minCount),
      DataFactory.literal(String(propMeta["sh:minCount"]), DataFactory.namedNode(term.xsd.integer))
    );
  }

  if (typeof propMeta["sh:maxCount"] === "number") {
    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(term.sh.maxCount),
      DataFactory.literal(String(propMeta["sh:maxCount"]), DataFactory.namedNode(term.xsd.integer))
    );
  }

  // Datatype constraint
  if (propMeta["sh:datatype"]) {
    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(term.sh.datatype),
      DataFactory.namedNode(String(propMeta["sh:datatype"]))
    );
  }

  // Node kind constraint
  if (propMeta["sh:nodeKind"]) {
    const nodeKind = propMeta["sh:nodeKind"] === "sh:IRI"
      ? term.sh.IRI
      : propMeta["sh:nodeKind"] === "sh:BlankNode"
        ? `${prefix.sh}BlankNode`
        : `${prefix.sh}Literal`;

    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(term.sh.nodeKind),
      DataFactory.namedNode(nodeKind)
    );
  }

  // Pattern constraint
  if (propMeta["sh:pattern"]) {
    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(term.sh.pattern),
      DataFactory.literal(propMeta["sh:pattern"])
    );
  }

  // Enumeration constraint (sh:in)
  if (propMeta["sh:in"] && Array.isArray(propMeta["sh:in"])) {
    const listNode = createRdfList(writer, propMeta["sh:in"]);
    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(term.sh.in),
      listNode
    );
  }

  // Has value constraint
  if (propMeta["sh:hasValue"] !== undefined) {
    const value = propMeta["sh:hasValue"];
    const literal = typeof value === "string"
      ? DataFactory.literal(value)
      : DataFactory.literal(String(value), DataFactory.namedNode(term.xsd.string));

    writer.addQuad(
      propertyShape,
      DataFactory.namedNode(`${prefix.sh}hasValue`),
      literal
    );
  }
}

/**
 * Create RDF list from array values
 */
function createRdfList(writer: Writer, values: readonly unknown[]): any {
  if (values.length === 0) {
    return DataFactory.namedNode(`${prefix.rdf}nil`);
  }

  const listNode = DataFactory.blankNode();

  // First element
  const firstValue = values[0];
  const valueNode = typeof firstValue === "string"
    ? DataFactory.literal(firstValue)
    : DataFactory.literal(String(firstValue), DataFactory.namedNode(term.xsd.string));

  writer.addQuad(
    listNode,
    DataFactory.namedNode(`${prefix.rdf}first`),
    valueNode
  );

  // Rest of the list
  const restList = createRdfList(writer, values.slice(1));
  writer.addQuad(
    listNode,
    DataFactory.namedNode(`${prefix.rdf}rest`),
    restList
  );

  return listNode;
}

/**
 * Generate DoDAF-specific SHACL shapes
 *
 * @param schemas - Array of semantic TypeBox schemas
 * @returns SHACL shapes as Turtle string
 */
export function generateDodafShaclTurtle(schemas: SemanticSchema[]): string {
  return generateShaclTurtle(schemas, {
    includeBase: true,
    inlinePropertyShapes: false,
    customPrefixes: {
      dodaf: prefix.dodaf
    }
  });
}

/**
 * Validate generated SHACL shapes
 *
 * @param turtle - SHACL Turtle string
 * @returns Validation report
 */
export function validateShaclTurtle(turtle: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    // Basic syntax validation by parsing
    const parser = new (require('n3').Parser)();
    parser.parse(turtle);
  } catch (error) {
    errors.push(`SHACL syntax error: ${error}`);
  }

  // Additional validation could be added here
  // - Check for required properties
  // - Validate IRI formats
  // - Check constraint consistency

  return {
    valid: errors.length === 0,
    errors
  };
}
