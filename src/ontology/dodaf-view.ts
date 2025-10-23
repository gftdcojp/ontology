/**
 * DoDAF 2.0 View Ontology Schema with Semantic Metadata
 */

import { Type } from "@sinclair/typebox";
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import { ProductSchema } from "./dodaf-product";

/**
 * View Type Schema with semantic constraints
 */
export const ViewTypeSchema = DataProperty(
  Type.Union([
    Type.Literal('AV'),
    Type.Literal('OV'),
    Type.Literal('SV'),
    Type.Literal('TV'),
    Type.Literal('DIV')
  ]),
  {
    "@prop": term.dodaf.type,
    "@kind": "data",
    "sh:datatype": Datatypes.string,
    "sh:minCount": 1,
    "sh:in": ['AV', 'OV', 'SV', 'TV', 'DIV'],
    "rdfs:domain": term.dodaf.View,
    "owl:FunctionalProperty": true,
  }
);

/**
 * View Name Schema with semantic constraints
 */
export const ViewNameSchema = DataProperty(
  Type.Union([
    Type.Literal('All Views'),
    Type.Literal('Operational View'),
    Type.Literal('Systems View'),
    Type.Literal('Technical Standards View'),
    Type.Literal('Data and Information View')
  ]),
  {
    "@prop": term.dodaf.name,
    "@kind": "data",
    "sh:datatype": Datatypes.string,
    "sh:minCount": 1,
    "sh:in": [
      'All Views',
      'Operational View',
      'Systems View',
      'Technical Standards View',
      'Data and Information View'
    ],
    "rdfs:domain": term.dodaf.View,
    "owl:FunctionalProperty": true,
  }
);

/**
 * View Schema with semantic metadata
 */
const ViewSchema = Class(
  term.dodaf.View,
  {
    "@id": DataProperty(Type.String({ format: "uri" }), {
      "@prop": term.rdf.ID,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.uri,
      "owl:FunctionalProperty": true,
    }),
    type: ViewTypeSchema,
    name: ViewNameSchema,
    description: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dodaf.description,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    purpose: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dodaf.purpose,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    products: ObjectProperty(Type.Array(ProductSchema), {
      "@prop": term.dodaf.products,
      "@kind": "object",
      "sh:minCount": 0,
      "sh:nodeKind": "sh:BlankNode",
      "rdfs:range": term.dodaf.Product,
    }),
  },
  {
    "rdfs:comment": "Views organize products in DoDAF architecture according to different perspectives (Operational, Systems, Technical Standards, Data and Information)",
    "@context": {
      dodaf: "https://dodaf.defense.gov/ontology#",
      name: term.dodaf.name,
      description: term.dodaf.description,
      purpose: term.dodaf.purpose,
      products: term.dodaf.products,
    }
  }
);

// Export for use in other schemas
export { ViewSchema };
