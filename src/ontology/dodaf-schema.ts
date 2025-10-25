import { Onto, Resource, Shape, Static } from '@gftdcojp/resourcebox';

/**
 * DoDAF 2.0 Ontology Schema using ResourceBox
 * JSON-LD compatible schema definitions with OWL ontology support
 */

// Define DoDAF namespace
export const dodaf = Onto.Namespace({
  prefix: "dodaf",
  uri: "http://dodcio.defense.gov/dodaf20#"
});

// Base JSON-LD context type (without actual context definition)
export type DoDAFContextType = {
  '@context': Record<string, any>;
};

// Define core DoDAF ontology classes
export const ArchitectureClass = Onto.Class({
  iri: dodaf("Architecture"),
  label: "Architecture",
  comment: "DoDAF architecture definition"
});

export const ViewClass = Onto.Class({
  iri: dodaf("View"),
  label: "View",
  comment: "DoDAF architectural view",
  subClassOf: [ArchitectureClass]
});

export const ProductClass = Onto.Class({
  iri: dodaf("Product"),
  label: "Product",
  comment: "DoDAF architectural product",
  subClassOf: [ArchitectureClass]
});

export const ElementClass = Onto.Class({
  iri: dodaf("Element"),
  label: "Element",
  comment: "DoDAF architectural element",
  subClassOf: [ArchitectureClass]
});

export const RelationshipClass = Onto.Class({
  iri: dodaf("Relationship"),
  label: "Relationship",
  comment: "DoDAF architectural relationship",
  subClassOf: [ArchitectureClass]
});

export const ElementMetadataClass = Onto.Class({
  iri: dodaf("ElementMetadata"),
  label: "Element Metadata",
  comment: "Metadata for architectural elements"
});

export const ArchitectureMetadataClass = Onto.Class({
  iri: dodaf("ArchitectureMetadata"),
  label: "Architecture Metadata",
  comment: "Metadata for architectures"
});

// Define properties
export const name = Onto.Property({
  iri: dodaf("name"),
  label: "name",
  domain: [ArchitectureClass],
  range: [Onto.Datatype.String],
  functional: true
});

export const description = Onto.Property({
  iri: dodaf("description"),
  label: "description",
  domain: [ArchitectureClass],
  range: [Onto.Datatype.String]
});

export const version = Onto.Property({
  iri: dodaf("version"),
  label: "version",
  domain: [ArchitectureClass],
  range: [Onto.Datatype.String],
  functional: true
});

export const created = Onto.Property({
  iri: dodaf("created"),
  label: "created",
  domain: [ElementMetadataClass, ArchitectureMetadataClass],
  range: [Onto.Datatype.DateTime],
  functional: true
});

export const modified = Onto.Property({
  iri: dodaf("modified"),
  label: "modified",
  domain: [ElementMetadataClass, ArchitectureMetadataClass],
  range: [Onto.Datatype.DateTime],
  functional: true
});

export const author = Onto.Property({
  iri: dodaf("author"),
  label: "author",
  domain: [ElementMetadataClass, ArchitectureMetadataClass],
  range: [Onto.Datatype.String],
  functional: true
});

export const status = Onto.Property({
  iri: dodaf("status"),
  label: "status",
  domain: [ElementMetadataClass],
  range: [Onto.Datatype.String]
});

// ResourceBox schemas

// Element Metadata Schema
export const ElementMetadataSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  created: Resource.String({
    property: created,
    format: "date-time"
  }),
  modified: Resource.String({
    property: modified,
    format: "date-time"
  }),
  author: Resource.String({
    property: author
  }),
  version: Resource.String({
    property: version
  }),
  status: Resource.String({
    property: status
  })
}, {
  class: ElementMetadataClass
});

// Element Schema
export const ElementSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  productId: Resource.String({
    property: dodaf("productId")
  }),
  type: Resource.String({
    property: dodaf("type")
  }),
  name: Resource.String({
    property: name,
    minLength: 1
  }),
  description: Resource.String({
    property: description
  }),
  properties: Resource.Object({}),
  metadata: Resource.Optional(ElementMetadataSchema)
}, {
  class: ElementClass
});

// Relationship Schema
export const RelationshipSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  productId: Resource.String({
    property: dodaf("productId")
  }),
  type: Resource.String({
    property: dodaf("type")
  }),
  name: Resource.String({
    property: name,
    minLength: 1
  }),
  description: Resource.String({
    property: description
  }),
  sourceId: Resource.String({
    property: dodaf("sourceId"),
    format: "uri"
  }),
  targetId: Resource.String({
    property: dodaf("targetId"),
    format: "uri"
  }),
  properties: Resource.Object({})
}, {
  class: RelationshipClass
});

// Product Schema
export const ProductSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  viewId: Resource.String({
    property: dodaf("viewId"),
    format: "uri"
  }),
  number: Resource.String({
    property: dodaf("number"),
    minLength: 1
  }),
  name: Resource.String({
    property: name,
    minLength: 1
  }),
  description: Resource.String({
    property: description
  }),
  purpose: Resource.String({
    property: dodaf("purpose")
  }),
  elements: Resource.Array(ElementSchema, {
    property: dodaf("elements")
  }),
  relationships: Resource.Array(RelationshipSchema, {
    property: dodaf("relationships")
  })
}, {
  class: ProductClass
});

// View Schema
export const ViewSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  type: Resource.String({
    property: dodaf("type")
  }),
  name: Resource.String({
    property: dodaf("name")
  }),
  description: Resource.String({
    property: description,
    minLength: 1
  }),
  purpose: Resource.String({
    property: dodaf("purpose"),
    minLength: 1
  }),
  products: Resource.Array(ProductSchema, {
    property: dodaf("products")
  })
}, {
  class: ViewClass
});

// Architecture Metadata Schema
export const ArchitectureMetadataSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  created: Resource.String({
    property: created,
    format: "date-time"
  }),
  modified: Resource.String({
    property: modified,
    format: "date-time"
  }),
  author: Resource.String({
    property: author,
    minLength: 1
  }),
  organization: Resource.String({
    property: dodaf("organization")
  }),
  classification: Resource.String({
    property: dodaf("classification")
  }),
  purpose: Resource.String({
    property: dodaf("purpose")
  })
}, {
  class: ArchitectureMetadataClass
});

// Main DoDAF Architecture Schema
export const DoDAFArchitectureSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  name: Resource.String({
    property: name,
    minLength: 1
  }),
  description: Resource.String({
    property: description
  }),
  version: Resource.String({
    property: version,
    minLength: 1
  }),
  views: Resource.Array(ViewSchema, {
    property: dodaf("views")
  }),
  metadata: ArchitectureMetadataSchema
}, {
  class: ArchitectureClass
});

// SHACL shapes for semantic validation
export const ElementShape = Shape.fromResource(ElementSchema, {
  strict: true,
  closed: true
});

export const RelationshipShape = Shape.fromResource(RelationshipSchema, {
  strict: true,
  closed: true
});

export const ProductShape = Shape.fromResource(ProductSchema, {
  strict: true,
  closed: true
});

export const ViewShape = Shape.fromResource(ViewSchema, {
  strict: true,
  closed: true
});

export const ArchitectureShape = Shape.fromResource(DoDAFArchitectureSchema, {
  strict: true,
  closed: true
});

// Type inference
export type ElementMetadata = Static<typeof ElementMetadataSchema>;
export type Element = Static<typeof ElementSchema>;
export type Relationship = Static<typeof RelationshipSchema>;
export type Product = Static<typeof ProductSchema>;
export type View = Static<typeof ViewSchema>;
export type ArchitectureMetadata = Static<typeof ArchitectureMetadataSchema>;
export type DoDAFArchitecture = Static<typeof DoDAFArchitectureSchema>;

// JSON-LD context generation
export const dodafContext = Resource.context(DoDAFArchitectureSchema, {
  includeNamespaces: true,
  namespaces: {
    dodaf: "http://dodcio.defense.gov/dodaf20#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    owl: "http://www.w3.org/2002/07/owl#",
    xsd: "http://www.w3.org/2001/XMLSchema#"
  }
});

// Export the main schema
export const DoDAFSchema = DoDAFArchitectureSchema;
