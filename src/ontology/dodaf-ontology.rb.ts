/**
 * ResourceBox Canonical Ontology for DoDAF 2.0
 * Base IRI: https://dodaf.defense.gov/ontology#
 *
 * Merkle DAG: node=rb-canon-ontology, depends: none
 */

import { Onto } from "@gftdcojp/resourcebox";

export const dodaf = Onto.Namespace({
  prefix: "dodaf",
  uri: "https://dodaf.defense.gov/ontology#",
});

// Core classes
export const Architecture = Onto.Class({
  iri: dodaf("Architecture"),
  label: "Architecture",
  comment: "Top-level container for DoDAF architecture representations",
});

export const View = Onto.Class({
  iri: dodaf("View"),
  label: "View",
  comment: "DoDAF architectural view",
});

export const Product = Onto.Class({
  iri: dodaf("Product"),
  label: "Product",
  comment: "DoDAF architectural product",
});

export const Element = Onto.Class({
  iri: dodaf("Element"),
  label: "Element",
  comment: "Basic architectural element",
});

export const Relationship = Onto.Class({
  iri: dodaf("Relationship"),
  label: "Relationship",
  comment: "Relationships between elements",
});

export const Metadata = Onto.Class({
  iri: dodaf("Metadata"),
  label: "Metadata",
  comment: "Metadata for DoDAF elements and architectures",
});

// Properties
export const name = Onto.Property({
  iri: dodaf("name"),
  label: "name",
  domain: [Architecture],
  range: [Onto.Datatype.String],
  functional: true,
});

export const description = Onto.Property({
  iri: dodaf("description"),
  label: "description",
  domain: [Architecture],
  range: [Onto.Datatype.String],
});

export const purpose = Onto.Property({
  iri: dodaf("purpose"),
  label: "purpose",
  domain: [Architecture],
  range: [Onto.Datatype.String],
});

export const type = Onto.Property({
  iri: dodaf("type"),
  label: "type",
  domain: [Element],
  range: [Onto.Datatype.String],
});

export const number = Onto.Property({
  iri: dodaf("number"),
  label: "number",
  domain: [Product],
  range: [Onto.Datatype.String],
});

export const status = Onto.Property({
  iri: dodaf("status"),
  label: "status",
  domain: [Metadata],
  range: [Onto.Datatype.String],
});

export const classification = Onto.Property({
  iri: dodaf("classification"),
  label: "classification",
  domain: [Metadata],
  range: [Onto.Datatype.String],
});

export const created = Onto.Property({
  iri: Onto.DCTerms("created"),
  label: "created",
  domain: [Metadata],
  range: [Onto.Datatype.DateTime],
  functional: true,
});

export const modified = Onto.Property({
  iri: Onto.DCTerms("modified"),
  label: "modified",
  domain: [Metadata],
  range: [Onto.Datatype.DateTime],
});

export const author = Onto.Property({
  iri: Onto.DCTerms("creator"),
  label: "author",
  domain: [Metadata],
  range: [Onto.Datatype.String],
});

export const version = Onto.Property({
  iri: Onto.DCTerms("hasVersion"),
  label: "version",
  domain: [Architecture],
  range: [Onto.Datatype.String],
});

export const organization = Onto.Property({
  iri: Onto.FOAF("organization"),
  label: "organization",
  domain: [Metadata],
  range: [Onto.Datatype.String],
});

// Object properties
export const viewId = Onto.Property({
  iri: dodaf("viewId"),
  label: "viewId",
  domain: [Product],
  range: [View],
});

export const productId = Onto.Property({
  iri: dodaf("productId"),
  label: "productId",
  domain: [Element],
  range: [Product],
});

export const sourceId = Onto.Property({
  iri: dodaf("sourceId"),
  label: "sourceId",
  domain: [Relationship],
  range: [Element],
});

export const targetId = Onto.Property({
  iri: dodaf("targetId"),
  label: "targetId",
  domain: [Relationship],
  range: [Element],
});

export const views = Onto.Property({
  iri: dodaf("views"),
  label: "views",
  domain: [Architecture],
  range: [View],
});

export const products = Onto.Property({
  iri: dodaf("products"),
  label: "products",
  domain: [View],
  range: [Product],
});

export const elements = Onto.Property({
  iri: dodaf("elements"),
  label: "elements",
  domain: [Product],
  range: [Element],
});

export const relationships = Onto.Property({
  iri: dodaf("relationships"),
  label: "relationships",
  domain: [Product],
  range: [Relationship],
});

export const metadata = Onto.Property({
  iri: dodaf("metadata"),
  label: "metadata",
  domain: [Architecture],
  range: [Metadata],
});

export const properties = Onto.Property({
  iri: dodaf("properties"),
  label: "properties",
  domain: [Element],
  range: [Onto.Datatype.String],
});

export const RB_CANON = {
  dodaf,
  classes: { Architecture, View, Product, Element, Relationship, Metadata },
  properties: {
    name,
    description,
    purpose,
    type,
    number,
    status,
    classification,
    created,
    modified,
    author,
    version,
    organization,
    viewId,
    productId,
    sourceId,
    targetId,
    views,
    products,
    elements,
    relationships,
    metadata,
    properties,
  },
};

export type RBCanon = typeof RB_CANON;


