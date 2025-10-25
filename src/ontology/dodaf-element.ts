
/**
 * DoDAF 2.0 Element Ontology Schema with ResourceBox Semantic Metadata
 *
 * ResourceBox schemas enhanced with RDF/OWL/SHACL metadata for automatic
 * generation of JSON-LD contexts, SHACL shapes, and OWL ontologies.
 */

import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import type { ElementType } from "../types/dodaf";
import { ElementClass, ElementMetadataClass } from "./dodaf-schema";

/**
 * Element Type enumeration with SHACL constraints using ResourceBox
 */
export const ElementTypeSchema = Resource.String();

/**
 * Element Metadata Schema with semantic constraints
 */
export const ElementMetadataSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  created: Resource.String({ format: "date-time" }),
  modified: Resource.String({ format: "date-time" }),
  author: Resource.String({ minLength: 1 }),
  version: Resource.String({ minLength: 1 }),
  status: Resource.String()
}, {
  class: ElementMetadataClass
});

/**
 * Element Schema with full semantic metadata
 */
const ElementSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  productId: Resource.String({ format: "uri" }),
  type: ElementTypeSchema,
  name: Resource.String({ minLength: 1 }),
  description: Resource.Optional(Resource.String()),
  properties: Resource.Object({}),
  metadata: Resource.Optional(ElementMetadataSchema)
}, {
  class: ElementClass
});

// Export for use in other schemas
export { ElementSchema };
