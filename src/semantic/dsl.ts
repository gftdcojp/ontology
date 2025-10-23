/**
 * Domain-Specific Language for TypeBox + RDF/OWL/SHACL Integration
 *
 * This DSL extends TypeBox with semantic metadata that enables automatic
 * generation of JSON-LD contexts, SHACL shapes, and OWL ontologies.
 */

import { Type, type TSchema, type TObject, type TProperties, type TOptional } from "@sinclair/typebox";
import type { IRI, DodafClass, RdfProperty } from "./vocab";

// RDF/OWL metadata attached to TypeBox schemas
type RdfMeta = {
  /** OWL Class IRI */
  "@class": IRI<string>;
  /** JSON-LD context mappings */
  "@context"?: Record<string, string>;
  /** Human-readable comment */
  "rdfs:comment"?: string;
  /** OWL restrictions or annotations */
  "@restrictions"?: Record<string, unknown>;
};

// Property-level RDF/OWL/SHACL metadata
type PropMeta = {
  /** Property IRI (maps to OWL property or SHACL path) */
  "@prop": IRI<string>;
  /** Property type classification */
  "@kind": "data" | "object";
  /** SHACL constraints */
  "sh:minCount"?: number;
  "sh:maxCount"?: number;
  "sh:pattern"?: string;
  "sh:datatype"?: IRI<string>;
  "sh:in"?: readonly unknown[];
  "sh:hasValue"?: unknown;
  "sh:nodeKind"?: "sh:IRI" | "sh:BlankNode" | "sh:Literal";
  /** OWL property characteristics */
  "owl:FunctionalProperty"?: boolean;
  "owl:InverseFunctionalProperty"?: boolean;
  /** RDFS domain/range hints */
  "rdfs:domain"?: IRI<string>;
  "rdfs:range"?: IRI<string>;
};

/**
 * Enhanced TypeBox schema with RDF metadata
 */
export type SemanticSchema<T extends TSchema = TSchema> = T & {
  "@rdf"?: RdfMeta;
  "@props"?: Record<string, PropMeta>;
};

/**
 * Create an OWL Class with TypeBox schema
 *
 * @param iri - The OWL Class IRI
 * @param properties - TypeBox property definitions
 * @param meta - Additional RDF metadata
 * @returns TypeBox object schema with RDF metadata
 */
export function Class<P extends TProperties>(
  iri: IRI<string>,
  properties: P,
  meta: Omit<RdfMeta, "@class"> = {}
): TObject<P> & SemanticSchema<TObject<P>> {
  const schema = Type.Object(properties, {
    $id: iri,
    title: iri.localName?.(iri) || String(iri),
  });

  // Attach RDF metadata to the schema
  (schema as any)["@rdf"] = { "@class": iri, ...meta };
  (schema as any)["@props"] = {};

  // Extract property metadata from individual property schemas
  for (const [key, propSchema] of Object.entries(properties)) {
    const propMeta = (propSchema as any)["@prop"];
    if (propMeta) {
      (schema as any)["@props"][key] = propMeta;
    }
  }

  return schema as TObject<P> & SemanticSchema<TObject<P>>;
}

/**
 * Create a data property (maps to OWL DatatypeProperty)
 *
 * @param schema - Base TypeBox schema
 * @param meta - RDF/OWL/SHACL metadata
 * @returns Enhanced schema with semantic metadata
 */
export function DataProperty<T extends TSchema>(
  schema: T,
  meta: Omit<PropMeta, "@kind"> & { "@kind"?: "data" }
): T & SemanticSchema<T> {
  const enhanced = { ...schema, "@prop": { "@kind": "data" as const, ...meta } };
  return enhanced as T & SemanticSchema<T>;
}

/**
 * Create an object property (maps to OWL ObjectProperty)
 *
 * @param schema - Base TypeBox schema
 * @param meta - RDF/OWL/SHACL metadata
 * @returns Enhanced schema with semantic metadata
 */
export function ObjectProperty<T extends TSchema>(
  schema: T,
  meta: Omit<PropMeta, "@kind"> & { "@kind"?: "object" }
): T & SemanticSchema<T> {
  const enhanced = { ...schema, "@prop": { "@kind": "object" as const, ...meta } };
  return enhanced as T & SemanticSchema<T>;
}

/**
 * Create a functional property (OWL FunctionalProperty)
 */
export function FunctionalDataProperty<T extends TSchema>(
  schema: T,
  meta: Omit<PropMeta, "@kind" | "owl:FunctionalProperty">
): T & SemanticSchema<T> {
  return DataProperty(schema, { ...meta, "owl:FunctionalProperty": true });
}

/**
 * Create a functional object property
 */
export function FunctionalObjectProperty<T extends TSchema>(
  schema: T,
  meta: Omit<PropMeta, "@kind" | "owl:FunctionalProperty">
): T & SemanticSchema<T> {
  return ObjectProperty(schema, { ...meta, "owl:FunctionalProperty": true });
}

/**
 * Utility to extract RDF metadata from a schema
 */
export const extractRdf = {
  /**
   * Get class IRI from schema
   */
  getClass: (schema: SemanticSchema): IRI<string> | undefined => {
    return schema["@rdf"]?.["@class"];
  },

  /**
   * Get all properties metadata
   */
  getProperties: (schema: SemanticSchema): Record<string, PropMeta> => {
    return schema["@props"] || {};
  },

  /**
   * Check if schema has RDF metadata
   */
  hasRdf: (schema: SemanticSchema): boolean => {
    return !!schema["@rdf"];
  },

  /**
   * Get JSON-LD context from schema
   */
  getContext: (schema: SemanticSchema): Record<string, string> | undefined => {
    return schema["@rdf"]?.["@context"];
  },
} as const;

/**
 * Predefined constraint helpers for common SHACL patterns
 */
export const Constraints = {
  /**
   * Required property (sh:minCount = 1)
   */
  required: { "sh:minCount": 1 } as const,

  /**
   * Optional property (sh:maxCount = 1)
   */
  optional: { "sh:maxCount": 1 } as const,

  /**
   * Exactly one occurrence
   */
  exactlyOne: { "sh:minCount": 1, "sh:maxCount": 1 } as const,

  /**
   * Zero or more
   */
  zeroOrMore: {} as const,

  /**
   * One or more
   */
  oneOrMore: { "sh:minCount": 1 } as const,

  /**
   * IRI reference
   */
  iri: { "sh:nodeKind": "sh:IRI" as const } as const,

  /**
   * String pattern constraint
   */
  pattern: (regex: string) => ({ "sh:pattern": regex } as const),

  /**
   * Enumeration constraint
   */
  oneOf: <T>(values: readonly T[]) => ({ "sh:in": values } as const),

  /**
   * Datatype constraint
   */
  datatype: (dt: IRI<string>) => ({ "sh:datatype": dt } as const),
} as const;

/**
 * Common datatype mappings
 */
export const Datatypes = {
  string: "http://www.w3.org/2001/XMLSchema#string" as IRI<string>,
  integer: "http://www.w3.org/2001/XMLSchema#integer" as IRI<string>,
  boolean: "http://www.w3.org/2001/XMLSchema#boolean" as IRI<string>,
  dateTime: "http://www.w3.org/2001/XMLSchema#dateTime" as IRI<string>,
  uri: "http://www.w3.org/2001/XMLSchema#anyURI" as IRI<string>,
} as const;
