
/**
 * DoDAF 2.0 Architecture Ontology Schema with ResourceBox Semantic Metadata
 */

import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import { ViewSchema } from "./dodaf-view";

// Import DoDAF schema for namespace and classes
import { dodaf, ArchitectureMetadataClass, ArchitectureClass } from "./dodaf-schema";

/**
 * Architecture Metadata Schema with semantic constraints using ResourceBox
 */
const ArchitectureMetadataSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  created: Resource.String({ format: "date-time" }),
  modified: Resource.String({ format: "date-time" }),
  author: Resource.String({ minLength: 1 }),
  organization: Resource.Optional(Resource.String()),
  classification: Resource.Optional(Resource.String()),
  purpose: Resource.Optional(Resource.String())
}, {
  class: ArchitectureMetadataClass
});

/**
 * DoDAF Architecture Schema with semantic metadata using ResourceBox
 */
const DoDAFArchitectureSchema = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  name: Resource.String({ minLength: 1 }),
  description: Resource.String(),
  version: Resource.String({ minLength: 1 }),
  views: Resource.Array(ViewSchema),
  metadata: ArchitectureMetadataSchema
}, {
  class: ArchitectureClass
});

// Export the main schema
const DoDAFSchema = DoDAFArchitectureSchema;
export { DoDAFArchitectureSchema, ArchitectureMetadataSchema, DoDAFSchema };
