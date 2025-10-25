/**
 * ResourceBox Migration Experiment
 *
 * Testing migration from TypeBox to ResourceBox for DoDAF ontology
 * This file demonstrates how to convert existing TypeBox schemas to ResourceBox
 */

import { Onto, Resource, Shape, Static } from '@gftdcojp/resourcebox';

// Define DoDAF namespace using ResourceBox
export const dodaf = Onto.Namespace({
  prefix: "dodaf",
  uri: "https://dodaf.defense.gov/ontology#"
});

// Built-in namespaces (reserved for future use)

// Define core DoDAF ontology classes
export const ResourceClass = Onto.Class({
  iri: dodaf("Resource"),
  label: "Resource",
  comment: "Fundamental DoDAF resource"
});

export const Element = Onto.Class({
  iri: dodaf("Element"),
  label: "Element",
  comment: "Basic architectural element",
  subClassOf: [ResourceClass]
});

export const View = Onto.Class({
  iri: dodaf("View"),
  label: "View",
  comment: "Architectural view",
  subClassOf: [ResourceClass]
});

// Define properties
export const name = Onto.Property({
  iri: dodaf("name"),
  label: "name",
  domain: [ResourceClass],
  range: [Onto.Datatype.String],
  functional: true
});

export const description = Onto.Property({
  iri: dodaf("description"),
  label: "description",
  domain: [ResourceClass],
  range: [Onto.Datatype.String]
});

export const created = Onto.Property({
  iri: dodaf("created"),
  label: "created",
  domain: [ResourceClass],
  range: [Onto.Datatype.DateTime],
  functional: true
});

// Convert TypeBox schemas to ResourceBox

// View Types (equivalent to ViewTypeSchema)
export const ViewTypeResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  type: Resource.String({
    property: dodaf("type")
  })
});

// Element Metadata (equivalent to ElementMetadataSchema)
export const ElementMetadataResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),

  created: Resource.String({
    property: created,
    format: "date-time"
  }),

  modified: Resource.String({
    property: dodaf("modified"),
    format: "date-time"
  }),

  author: Resource.String({
    property: dodaf("author")
  }),

  version: Resource.String({
    property: dodaf("version")
  }),

  status: Resource.String({
    property: dodaf("status")
  })
}, {
  class: Onto.Class({
    iri: dodaf("ElementMetadata"),
    label: "Element Metadata"
  })
});

// Element Schema (equivalent to ElementSchema)
export const ElementResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),

  name: Resource.String({
    property: name,
    minLength: 1,
    maxLength: 200
  }),

  description: Resource.String({
    property: description,
    optional: true,
    maxLength: 1000
  })
}, {
  class: Element
});

// SHACL shapes for semantic validation
export const ElementShape = Shape.fromResource(ElementResource, {
  strict: true,
  closed: true
});

export const ElementMetadataShape = Shape.fromResource(ElementMetadataResource, {
  strict: true,
  closed: true
});

// Type inference
export type ViewType = Static<typeof ViewTypeResource>;
export type ElementMetadata = Static<typeof ElementMetadataResource>;
export type Element = Static<typeof ElementResource>;

// JSON-LD context generation
export const dodafContext = Resource.context(ElementResource, {
  includeNamespaces: true,
  namespaces: {
    dodaf: "https://dodaf.defense.gov/ontology#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#"
  }
});

// Utility functions for migration
export class ResourceBoxMigrationUtils {

  /**
   * Validate data with ResourceBox schema
   */
  static validateResource(
    resourceSchema: any,
    data: any
  ) {
    return Resource.validate(resourceSchema, data);
  }

  /**
   * Convert ResourceBox schema to JSON-LD context
   */
  static generateContext(schema: any, options?: any) {
    return Resource.context(schema, options);
  }

  /**
   * Generate SHACL shape from ResourceBox schema
   */
  static generateShape(schema: any, options?: any) {
    return Shape.fromResource(schema, options);
  }
}
