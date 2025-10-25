/**
 * DoDAF 2.0 Product Ontology Schema with ResourceBox Semantic Metadata
 */

import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import { ElementSchema } from "./dodaf-element";
import { RelationshipSchema } from "./dodaf-relationship";
import { ProductClass } from "./dodaf-schema";

/**
 * Product Schema with semantic metadata using ResourceBox
 */
const ProductSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  viewId: Resource.String({ format: "uri" }),
  number: Resource.String({ minLength: 1, pattern: "^[A-Z]{2}-\\d+$" }),
  name: Resource.String({ minLength: 1 }),
  description: Resource.Optional(Resource.String()),
  purpose: Resource.Optional(Resource.String()),
  elements: Resource.Array(ElementSchema),
  relationships: Resource.Array(RelationshipSchema)
}, {
  class: ProductClass
}
);

// Export for use in other schemas
export { ProductSchema };
