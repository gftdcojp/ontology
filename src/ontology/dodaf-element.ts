/**
 * DoDAF 2.0 Element Ontology Schema with Semantic Metadata
 *
 * TypeBox schemas enhanced with RDF/OWL/SHACL metadata for automatic
 * generation of JSON-LD contexts, SHACL shapes, and OWL ontologies.
 */

import { Type } from "@sinclair/typebox";
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import type { ElementType } from "../types/dodaf";

/**
 * Element Type enumeration with SHACL constraints
 */
export const ElementTypeSchema = DataProperty(
  Type.Union([
    // Core Elements
    Type.Literal('ArchitectureDescription'),
    Type.Literal('View'),
    Type.Literal('Product'),
    Type.Literal('Element'),
    Type.Literal('Relationship'),
    // Operational Elements
    Type.Literal('OperationalActivity'),
    Type.Literal('OperationalPerformer'),
    Type.Literal('OperationalResource'),
    Type.Literal('OperationalResourceFlow'),
    Type.Literal('OperationalEvent'),
    Type.Literal('OperationalNode'),
    Type.Literal('OperationalExchange'),
    // System Elements
    Type.Literal('System'),
    Type.Literal('SystemInterface'),
    Type.Literal('SystemFunction'),
    Type.Literal('SystemResource'),
    Type.Literal('SystemResourceFlow'),
    Type.Literal('SystemNode'),
    Type.Literal('SystemExchange'),
    // Data Elements
    Type.Literal('Data'),
    Type.Literal('DataInterface'),
    Type.Literal('DataRelationship'),
    Type.Literal('DataEntity'),
    Type.Literal('DataAttribute'),
    // Services Elements (統合)
    Type.Literal('ServiceDescription'),
    Type.Literal('Service'),
    Type.Literal('Information'),
    Type.Literal('Representation'),
    Type.Literal('InformationType'),
    Type.Literal('RepresentationType'),
    Type.Literal('Port'),
    Type.Literal('ServicePort'),
    Type.Literal('ServiceInterface'),
    // Data Model Elements (CDM, LDM, PES統合)
    Type.Literal('ConceptualDataModel'),
    Type.Literal('LogicalDataModel'),
    Type.Literal('PhysicalDataModel'),
    Type.Literal('DataModel'),
    Type.Literal('Entity'),
    Type.Literal('Attribute'),
    Type.Literal('RelationshipEntity'),
    Type.Literal('Domain'),
    Type.Literal('Key'),
    Type.Literal('Constraint'),
    Type.Literal('Index'),
    Type.Literal('Table'),
    Type.Literal('Column'),
    Type.Literal('ViewDefinition'),
    Type.Literal('Procedure'),
    Type.Literal('Trigger'),
    Type.Literal('Sequence'),
    Type.Literal('Synonym'),
    Type.Literal('Schema'),
    // Logical Model Elements (詳細統合)
    Type.Literal('LogicalArchitecture'),
    Type.Literal('LogicalActivity'),
    Type.Literal('LogicalPerformer'),
    Type.Literal('LogicalResource'),
    Type.Literal('LogicalSystem'),
    Type.Literal('LogicalInterface'),
    Type.Literal('LogicalNode'),
    Type.Literal('LogicalFlow'),
    Type.Literal('LogicalConstraint'),
    Type.Literal('LogicalComponent'),
    Type.Literal('LogicalService'),
    Type.Literal('LogicalDataFlow'),
    Type.Literal('LogicalControlFlow'),
    Type.Literal('LogicalInformationFlow'),
    Type.Literal('LogicalPhysicalFlow'),
    Type.Literal('LogicalOperationalActivity'),
    Type.Literal('LogicalSystemFunction'),
    Type.Literal('LogicalDataStructure'),
    Type.Literal('LogicalBusinessRule'),
    Type.Literal('LogicalPolicy'),
    Type.Literal('LogicalStandard'),
    Type.Literal('LogicalRequirement'),
    Type.Literal('LogicalCapability'),
    Type.Literal('LogicalServiceInterface'),
    Type.Literal('LogicalDataInterface'),
    Type.Literal('LogicalSystemInterface'),
    Type.Literal('LogicalNodeConnector'),
    Type.Literal('LogicalLink'),
    Type.Literal('LogicalNetwork'),
    Type.Literal('LogicalProtocol'),
    Type.Literal('LogicalMessage'),
    Type.Literal('LogicalEvent'),
    Type.Literal('LogicalState'),
    Type.Literal('LogicalTransition'),
    Type.Literal('LogicalCondition'),
    Type.Literal('LogicalAction'),
    Type.Literal('LogicalDecision'),
    Type.Literal('LogicalMerge'),
    Type.Literal('LogicalFork'),
    Type.Literal('LogicalJoin'),
    Type.Literal('LogicalStart'),
    Type.Literal('LogicalEnd'),
    // Standard Elements
    Type.Literal('Standard'),
    Type.Literal('StandardProfile'),
    Type.Literal('TechnicalStandard'),
    // Organizational Elements
    Type.Literal('Organization'),
    Type.Literal('OrganizationalUnit'),
    Type.Literal('Person'),
    Type.Literal('Capability'),
    // Infrastructure Elements
    Type.Literal('Facility'),
    Type.Literal('Location'),
    Type.Literal('Equipment'),
    // Security Elements
    Type.Literal('SecurityAttribute'),
    Type.Literal('SecurityControl'),
    Type.Literal('InformationAssuranceRequirement'),
    // DM2 Data Groups - Principal Architectural Constructs
    Type.Literal('Performer'),
    Type.Literal('ResourceFlow'),
    Type.Literal('Rule'),
    Type.Literal('Goal'),
    Type.Literal('Project'),
    Type.Literal('Reification'),
    // DM2 Data Groups - Supporting Architectural Constructs
    Type.Literal('Measure'),
    Type.Literal('Pedigree'),
  ]),
  {
    "@prop": term.dodaf.type,
    "@kind": "data",
    "sh:datatype": Datatypes.string,
    "sh:minCount": 1,
    "rdfs:domain": term.dodaf.Element,
  }
);

/**
 * Element Metadata Schema with semantic constraints
 */
export const ElementMetadataSchema = Class(
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
    version: DataProperty(Type.String({ minLength: 1 }), {
      "@prop": term.dct.hasVersion,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string,
      "owl:FunctionalProperty": true,
    }),
    status: DataProperty(
      Type.Union([
        Type.Literal('draft'),
        Type.Literal('review'),
        Type.Literal('approved'),
        Type.Literal('deprecated')
      ]),
      {
        "@prop": term.dodaf.status,
        "@kind": "data",
        "sh:minCount": 1,
        "sh:datatype": Datatypes.string,
        "sh:in": ['draft', 'review', 'approved', 'deprecated'],
        "owl:FunctionalProperty": true,
      }
    ),
  },
  {
    "rdfs:comment": "Metadata for DoDAF elements including creation, modification, and versioning information",
    "@context": {
      dodaf: "https://dodaf.defense.gov/ontology#",
      dct: "http://purl.org/dc/terms/",
    }
  }
);

/**
 * Element Schema with full semantic metadata
 */
const ElementSchema = Class(
  term.dodaf.Element,
  {
    "@id": DataProperty(Type.String({ format: "uri" }), {
      "@prop": term.rdf.ID,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.uri,
      "owl:FunctionalProperty": true,
    }),
    productId: ObjectProperty(Type.String({ format: "uri" }), {
      "@prop": term.dodaf.productId,
      "@kind": "object",
      "sh:minCount": 1,
      "sh:nodeKind": "sh:IRI",
      "rdfs:range": term.dodaf.Product,
      "owl:FunctionalProperty": true,
    }),
    type: ElementTypeSchema,
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
    properties: DataProperty(Type.Record(Type.String(), Type.Any()), {
      "@prop": term.dodaf.properties,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string, // JSON string
    }),
    metadata: ObjectProperty(Type.Optional(ElementMetadataSchema), {
      "@prop": term.dodaf.metadata,
      "@kind": "object",
      "sh:maxCount": 1,
      "sh:nodeKind": "sh:BlankNode",
      "rdfs:range": term.dodaf.Metadata,
    }),
  },
  {
    "rdfs:comment": "Core element in DoDAF architecture representing architectural constructs such as systems, activities, data, etc.",
    "@context": {
      dodaf: "https://dodaf.defense.gov/ontology#",
      name: term.dodaf.name,
      description: term.dodaf.description,
      productId: term.dodaf.productId,
      metadata: term.dodaf.metadata,
    }
  }
);

// Export for use in other schemas
export { ElementSchema };
