
/**
 * DoDAF 2.0 Relationship Ontology Schema with ResourceBox Semantic Metadata
 */

import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import type { RelationshipType } from "../types/dodaf";
import { RelationshipClass } from "./dodaf-schema";

/**
 * Relationship Type enumeration with SHACL constraints using ResourceBox
 */
export const RelationshipTypeSchema = Resource.String();

/**
 * Relationship Schema with semantic metadata using ResourceBox
 */
const RelationshipSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  productId: Resource.String({ format: "uri" }),
  type: RelationshipTypeSchema,
  name: Resource.String({ minLength: 1 }),
  description: Resource.Optional(Resource.String()),
  sourceId: Resource.String({ format: "uri" }),
  targetId: Resource.String({ format: "uri" }),
  properties: Resource.Object({})
}, {
  class: RelationshipClass
});

// Export for use in other schemas
export { RelationshipSchema };
