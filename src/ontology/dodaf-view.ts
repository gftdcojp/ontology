
/**
 * DoDAF 2.0 View Ontology Schema with ResourceBox Semantic Metadata
 */

import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import { ProductSchema } from "./dodaf-product";
import { ViewClass } from "./dodaf-schema";

/**
 * View Type Schema with semantic constraints using ResourceBox
 */
export const ViewTypeSchema = Resource.String();

/**
 * View Name Schema with semantic constraints using ResourceBox
 */
export const ViewNameSchema = Resource.String();

/**
 * View Schema with semantic metadata using ResourceBox
 */
const ViewSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  type: ViewTypeSchema,
  name: ViewNameSchema,
  description: Resource.String({ minLength: 1 }),
  purpose: Resource.String({ minLength: 1 }),
  products: Resource.Array(ProductSchema)
}, {
  class: ViewClass
});

// Export for use in other schemas
export { ViewSchema };
