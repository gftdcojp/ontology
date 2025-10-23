/**
 * DoDAF 2.0 Architecture Ontology Schema with Semantic Metadata
 */

import { Type } from "@sinclair/typebox";
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import { ViewSchema } from "./dodaf-view";

/**
 * Architecture Metadata Schema with semantic constraints
 */
const ArchitectureMetadataSchema = Class(
  term.dodaf.Metadata,
  {
    "@id": DataProperty(Type.String({ format: "uri" }), {
      "@prop": `${term.rdf.ID}`,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.uri,
      "owl:FunctionalProperty": true,
    }),
    created: DataProperty(Type.String({ format: "date-time" }), {
      "@prop": term.dct.created,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.dateTime,
      "owl:FunctionalProperty": true,
    }),
    modified: DataProperty(Type.String({ format: "date-time" }), {
      "@prop": term.dct.modified,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.dateTime,
      "owl:FunctionalProperty": true,
    }),
    author: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dct.creator,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
    }),
    organization: DataProperty(Type.Optional(Type.String()), {
      "@prop": term.foaf.organization,
      "@kind": "data",
      "sh:maxCount": 1,
      "sh:datatype": Datatypes.string,
    }),
    classification: DataProperty(Type.Optional(Type.String()), {
      "@prop": term.dodaf.classification,
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
  },
  {
    "rdfs:comment": "Metadata for DoDAF architectures including creation, authorship, and organizational information",
    "@context": {
      dodaf: "https://dodaf.defense.gov/ontology#",
      dct: "http://purl.org/dc/terms/",
      foaf: "http://xmlns.com/foaf/0.1/",
    }
  }
);

/**
 * DoDAF Architecture Schema with semantic metadata
 */
const DoDAFArchitectureSchema = Class(
  term.dodaf.Architecture,
  {
    "@id": DataProperty(Type.String({ format: "uri" }), {
      "@prop": term.rdf.ID,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.uri,
      "owl:FunctionalProperty": true,
    }),
    name: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dodaf.name,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    description: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dodaf.description,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    version: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dct.hasVersion,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    views: ObjectProperty(Type.Array(ViewSchema), {
      "@prop": term.dodaf.views,
      "@kind": "object",
      "sh:minCount": 0,
      "sh:nodeKind": "sh:BlankNode",
      "rdfs:range": term.dodaf.View,
    }),
    metadata: ObjectProperty(ArchitectureMetadataSchema, {
      "@prop": term.dodaf.metadata,
      "@kind": "object",
      "sh:minCount": 1,
      "sh:nodeKind": "sh:BlankNode",
      "rdfs:range": term.dodaf.Metadata,
      "owl:FunctionalProperty": true,
    }),
  },
  {
    "rdfs:comment": "Top-level container for DoDAF 2.0 architecture representations, containing views, products, elements, and relationships",
    "@context": {
      "@version": 1.1,
      "@base": "https://dodaf.defense.gov/ontology#",
      dodaf: "https://dodaf.defense.gov/ontology#",
      id: "@id",
      type: "@type",
      name: term.dodaf.name,
      description: term.dodaf.description,
      purpose: term.dodaf.purpose,
      created: term.dct.created,
      modified: term.dct.modified,
      author: term.dct.creator,
      organization: term.foaf.organization,
      classification: term.dodaf.classification,
      version: term.dct.hasVersion,
      status: term.dodaf.status,
      properties: term.dodaf.properties,
      metadata: term.dodaf.metadata,
      elements: term.dodaf.elements,
      relationships: term.dodaf.relationships,
      products: term.dodaf.products,
      views: term.dodaf.views,
    }
  }
);

// Export the main schema
const DoDAFSchema = DoDAFArchitectureSchema;
export { DoDAFArchitectureSchema, ArchitectureMetadataSchema, DoDAFSchema };
