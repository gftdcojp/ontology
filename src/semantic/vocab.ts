/**
 * Type-Safe RDF Vocabulary and IRI Definitions for DoDAF Ontology
 *
 * This module provides type-safe IRI definitions and prefix mappings,
 * ensuring that RDF terms are not string literals but strongly-typed
 * identifiers that prevent typos and semantic mismatches.
 */

// Type-safe IRI wrapper
export type IRI<T extends string> = string & { readonly __iri: T };

// Standard RDF prefixes
export const prefix = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#" as const,
  rdfs: "http://www.w3.org/2000/01/rdf-schema#" as const,
  owl: "http://www.w3.org/2002/07/owl#" as const,
  xsd: "http://www.w3.org/2001/XMLSchema#" as const,
  sh: "http://www.w3.org/ns/shacl#" as const,
  dct: "http://purl.org/dc/terms/" as const,
  foaf: "http://xmlns.com/foaf/0.1/" as const,
  schema: "https://schema.org/" as const,
  dodaf: "https://dodaf.defense.gov/ontology#" as const,
} as const;

// DoDAF-specific terms with type safety
export const term = {
  // RDF/OWL base terms
  rdf: {
    type: `${prefix.rdf}type` as IRI<"rdf:type">,
    ID: `${prefix.rdf}ID` as IRI<"rdf:ID">,
  },

  rdfs: {
    label: `${prefix.rdfs}label` as IRI<"rdfs:label">,
    comment: `${prefix.rdfs}comment` as IRI<"rdfs:comment">,
    domain: `${prefix.rdfs}domain` as IRI<"rdfs:domain">,
    range: `${prefix.rdfs}range` as IRI<"rdfs:range">,
  },

  owl: {
    Class: `${prefix.owl}Class` as IRI<"owl:Class">,
    DatatypeProperty: `${prefix.owl}DatatypeProperty` as IRI<"owl:DatatypeProperty">,
    ObjectProperty: `${prefix.owl}ObjectProperty` as IRI<"owl:ObjectProperty">,
    FunctionalProperty: `${prefix.owl}FunctionalProperty` as IRI<"owl:FunctionalProperty">,
  },

  sh: {
    NodeShape: `${prefix.sh}NodeShape` as IRI<"sh:NodeShape">,
    PropertyShape: `${prefix.sh}PropertyShape` as IRI<"sh:PropertyShape">,
    targetClass: `${prefix.sh}targetClass` as IRI<"sh:targetClass">,
    property: `${prefix.sh}property` as IRI<"sh:property">,
    path: `${prefix.sh}path` as IRI<"sh:path">,
    minCount: `${prefix.sh}minCount` as IRI<"sh:minCount">,
    maxCount: `${prefix.sh}maxCount` as IRI<"sh:maxCount">,
    datatype: `${prefix.sh}datatype` as IRI<"sh:datatype">,
    nodeKind: `${prefix.sh}nodeKind` as IRI<"sh:nodeKind">,
    IRI: `${prefix.sh}IRI` as IRI<"sh:IRI">,
    pattern: `${prefix.sh}pattern` as IRI<"sh:pattern">,
    in: `${prefix.sh}in` as IRI<"sh:in">,
  },

  xsd: {
    string: `${prefix.xsd}string` as IRI<"xsd:string">,
    integer: `${prefix.xsd}integer` as IRI<"xsd:integer">,
    boolean: `${prefix.xsd}boolean` as IRI<"xsd:boolean">,
    dateTime: `${prefix.xsd}dateTime` as IRI<"xsd:dateTime">,
  },

  // DoDAF ontology terms
  dodaf: {
    Architecture: `${prefix.dodaf}Architecture` as IRI<"dodaf:Architecture">,
    View: `${prefix.dodaf}View` as IRI<"dodaf:View">,
    Product: `${prefix.dodaf}Product` as IRI<"dodaf:Product">,
    Element: `${prefix.dodaf}Element` as IRI<"dodaf:Element">,
    Relationship: `${prefix.dodaf}Relationship` as IRI<"dodaf:Relationship">,
    Metadata: `${prefix.dodaf}Metadata` as IRI<"dodaf:Metadata">,

    // Properties
    name: `${prefix.dodaf}name` as IRI<"dodaf:name">,
    description: `${prefix.dodaf}description` as IRI<"dodaf:description">,
    purpose: `${prefix.dodaf}purpose` as IRI<"dodaf:purpose">,
    version: `${prefix.dodaf}version` as IRI<"dodaf:version">,
    status: `${prefix.dodaf}status` as IRI<"dodaf:status">,
    properties: `${prefix.dodaf}properties` as IRI<"dodaf:properties">,
    metadata: `${prefix.dodaf}metadata` as IRI<"dodaf:metadata">,
    elements: `${prefix.dodaf}elements` as IRI<"dodaf:elements">,
    relationships: `${prefix.dodaf}relationships` as IRI<"dodaf:relationships">,
    products: `${prefix.dodaf}products` as IRI<"dodaf:products">,
    views: `${prefix.dodaf}views` as IRI<"dodaf:views">,
    architecture: `${prefix.dodaf}architecture` as IRI<"dodaf:architecture">,
    organization: `${prefix.dodaf}organization` as IRI<"dodaf:organization">,
    classification: `${prefix.dodaf}classification` as IRI<"dodaf:classification">,

    // Specific relationships
    viewId: `${prefix.dodaf}viewId` as IRI<"dodaf:viewId">,
    productId: `${prefix.dodaf}productId` as IRI<"dodaf:productId">,
    sourceId: `${prefix.dodaf}sourceId` as IRI<"dodaf:sourceId">,
    targetId: `${prefix.dodaf}targetId` as IRI<"dodaf:targetId">,
    type: `${prefix.dodaf}type` as IRI<"dodaf:type">,
    number: `${prefix.dodaf}number` as IRI<"dodaf:number">,
  },

  // External vocabularies
  dct: {
    created: `${prefix.dct}created` as IRI<"dct:created">,
    modified: `${prefix.dct}modified` as IRI<"dct:modified">,
    creator: `${prefix.dct}creator` as IRI<"dct:creator">,
    hasVersion: `${prefix.dct}hasVersion` as IRI<"dct:hasVersion">,
  },

  foaf: {
    organization: `${prefix.foaf}organization` as IRI<"foaf:organization">,
  },

  schema: {
    name: `${prefix.schema}name` as IRI<"schema:name">,
    description: `${prefix.schema}description` as IRI<"schema:description">,
  },
} as const;

// Type unions for validation
export type DodafClass =
  | typeof term.dodaf.Architecture
  | typeof term.dodaf.View
  | typeof term.dodaf.Product
  | typeof term.dodaf.Element
  | typeof term.dodaf.Relationship
  | typeof term.dodaf.Metadata;

export type RdfProperty =
  | typeof term.dodaf.name
  | typeof term.dodaf.description
  | typeof term.dodaf.purpose
  | typeof term.dodaf.version
  | typeof term.dodaf.status
  | typeof term.dodaf.properties
  | typeof term.dodaf.metadata
  | typeof term.dodaf.elements
  | typeof term.dodaf.relationships
  | typeof term.dodaf.products
  | typeof term.dodaf.views
  | typeof term.dodaf.architecture
  | typeof term.dodaf.organization
  | typeof term.dodaf.classification
  | typeof term.dodaf.viewId
  | typeof term.dodaf.productId
  | typeof term.dodaf.sourceId
  | typeof term.dodaf.targetId
  | typeof term.dodaf.type
  | typeof term.dodaf.number;

// Common datatype mappings for SHACL and OWL
export const Datatypes = {
  string: `${prefix.xsd}string` as IRI<"xsd:string">,
  integer: `${prefix.xsd}integer` as IRI<"xsd:integer">,
  boolean: `${prefix.xsd}boolean` as IRI<"xsd:boolean">,
  dateTime: `${prefix.xsd}dateTime` as IRI<"xsd:dateTime">,
  uri: `${prefix.xsd}anyURI` as IRI<"xsd:anyURI">,
} as const;

// Utility functions for IRI manipulation
export const iri = {
  /**
   * Create a type-safe IRI from a string
   */
  fromString: <T extends string>(value: string): IRI<T> => value as IRI<T>,

  /**
   * Extract local name from IRI (after # or /)
   */
  localName: (iri: IRI<string>): string => {
    const hashIndex = iri.lastIndexOf('#');
    const slashIndex = iri.lastIndexOf('/');
    const index = Math.max(hashIndex, slashIndex);
    return index >= 0 ? iri.substring(index + 1) : iri;
  },

  /**
   * Extract namespace from IRI (before # or /)
   */
  namespace: (iri: IRI<string>): string => {
    const hashIndex = iri.lastIndexOf('#');
    const slashIndex = iri.lastIndexOf('/');
    const index = Math.max(hashIndex, slashIndex);
    return index >= 0 ? iri.substring(0, index + 1) : '';
  },
} as const;
