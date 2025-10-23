/**
 * DoDAF 2.0 Product Ontology Schema with Semantic Metadata
 */

import { Type } from "@sinclair/typebox";
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import { ElementSchema } from "./dodaf-element";
import { RelationshipSchema } from "./dodaf-relationship";

/**
 * Product Schema with semantic metadata
 */
const ProductSchema = Class(
  term.dodaf.Product,
  {
    "@id": DataProperty(Type.String({ format: "uri" }), {
      "@prop": term.rdf.ID,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.uri,
      "owl:FunctionalProperty": true,
    }),
    viewId: ObjectProperty(Type.String({ format: "uri" }), {
      "@prop": term.dodaf.viewId,
      "@kind": "object",
      "sh:minCount": 1,
      "sh:nodeKind": "sh:IRI",
      "rdfs:range": term.dodaf.View,
      "owl:FunctionalProperty": true,
    }),
    number: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dodaf.number,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "sh:pattern": "^[A-Z]{2}-\\d+$", // Pattern like "OV-1", "SV-1"
      "owl:FunctionalProperty": true,
    }),
    name: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dodaf.name,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    description: DataProperty(Type.Optional(Type.String()), {
      "@prop": term.dodaf.description,
      "@kind": "data",
      "sh:maxCount": 1,
      "sh:datatype": Datatypes.string,
    }),
    purpose: DataProperty(Type.Optional(Type.String()), {
      "@prop": term.dodaf.purpose,
      "@kind": "data",
      "sh:maxCount": 1,
      "sh:datatype": Datatypes.string,
    }),
    elements: ObjectProperty(Type.Array(ElementSchema), {
      "@prop": term.dodaf.elements,
      "@kind": "object",
      "sh:minCount": 0,
      "sh:nodeKind": "sh:BlankNode",
      "rdfs:range": term.dodaf.Element,
    }),
    relationships: ObjectProperty(Type.Array(RelationshipSchema), {
      "@prop": term.dodaf.relationships,
      "@kind": "object",
      "sh:minCount": 0,
      "sh:nodeKind": "sh:BlankNode",
      "rdfs:range": term.dodaf.Relationship,
    }),
  },
  {
    "rdfs:comment": "Products are the basic unit of architecture representation in DoDAF, containing elements and their relationships",
    "@context": {
      dodaf: "https://dodaf.defense.gov/ontology#",
      name: term.dodaf.name,
      description: term.dodaf.description,
      purpose: term.dodaf.purpose,
      number: term.dodaf.number,
      viewId: term.dodaf.viewId,
      elements: term.dodaf.elements,
      relationships: term.dodaf.relationships,
    }
  }
);

// Export for use in other schemas
export { ProductSchema };
