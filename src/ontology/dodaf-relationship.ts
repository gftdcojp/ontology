/**
 * DoDAF 2.0 Relationship Ontology Schema with Semantic Metadata
 */

import { Type } from "@sinclair/typebox";
import { Class, DataProperty, ObjectProperty, Constraints } from "../semantic/dsl";
import { term, Datatypes } from "../semantic/vocab";
import type { RelationshipType } from "../types/dodaf";

/**
 * Relationship Type enumeration with SHACL constraints
 */
export const RelationshipTypeSchema = DataProperty(
  Type.Union([
    // General Relationships
    Type.Literal('Association'),
    Type.Literal('Aggregation'),
    Type.Literal('Composition'),
    Type.Literal('Generalization'),
    Type.Literal('Dependency'),
    Type.Literal('Realization'),
    // Operational Relationships
    Type.Literal('OperationalActivityFlow'),
    Type.Literal('OperationalPerformerAssignment'),
    Type.Literal('OperationalResourceAssignment'),
    Type.Literal('OperationalResourceFlow'),
    Type.Literal('OperationalEventTrigger'),
    Type.Literal('OperationalNeedline'),
    // System Relationships
    Type.Literal('SystemInterfaceConnection'),
    Type.Literal('SystemFunctionFlow'),
    Type.Literal('SystemResourceAssignment'),
    Type.Literal('SystemResourceFlow'),
    Type.Literal('SystemNeedline'),
    Type.Literal('SystemCapabilityRealization'),
    // Data Relationships
    Type.Literal('DataInterfaceConnection'),
    Type.Literal('DataRelationship'),
    Type.Literal('DataEntityRelationship'),
    Type.Literal('DataAttributeRelationship'),
    // Services Relationships (統合)
    Type.Literal('ServiceDescribedBy'),
    Type.Literal('ServicePortDescribedBy'),
    Type.Literal('RepresentedBy'),
    Type.Literal('Description'),
    Type.Literal('ServicePortBeingDescribed'),
    Type.Literal('ServiceBeingDescribed'),
    Type.Literal('InformationDescribedBy'),
    Type.Literal('RepresentationDescribedBy'),
    // Data Model Relationships (CDM, LDM, PES統合)
    Type.Literal('DataModelRelationship'),
    Type.Literal('EntityRelationship'),
    Type.Literal('AttributeRelationship'),
    Type.Literal('TableRelationship'),
    Type.Literal('ColumnRelationship'),
    Type.Literal('SchemaRelationship'),
    Type.Literal('KeyRelationship'),
    Type.Literal('ConstraintRelationship'),
    Type.Literal('IndexRelationship'),
    Type.Literal('Inheritance'),
    Type.Literal('AssociationEntity'),
    Type.Literal('AggregationEntity'),
    Type.Literal('CompositionEntity'),
    Type.Literal('DependencyEntity'),
    Type.Literal('GeneralizationEntity'),
    Type.Literal('RealizationEntity'),
    // Logical Model Relationships (詳細統合)
    Type.Literal('LogicalArchitectureRelationship'),
    Type.Literal('LogicalActivityRelationship'),
    Type.Literal('LogicalPerformerRelationship'),
    Type.Literal('LogicalResourceRelationship'),
    Type.Literal('LogicalSystemRelationship'),
    Type.Literal('LogicalInterfaceRelationship'),
    Type.Literal('LogicalNodeRelationship'),
    Type.Literal('LogicalFlowRelationship'),
    Type.Literal('LogicalConstraintRelationship'),
    Type.Literal('LogicalComponentRelationship'),
    Type.Literal('LogicalServiceRelationship'),
    Type.Literal('LogicalDataFlowRelationship'),
    Type.Literal('LogicalControlFlowRelationship'),
    Type.Literal('LogicalInformationFlowRelationship'),
    Type.Literal('LogicalPhysicalFlowRelationship'),
    Type.Literal('LogicalOperationalActivityRelationship'),
    Type.Literal('LogicalSystemFunctionRelationship'),
    Type.Literal('LogicalDataStructureRelationship'),
    Type.Literal('LogicalBusinessRuleRelationship'),
    Type.Literal('LogicalPolicyRelationship'),
    Type.Literal('LogicalStandardRelationship'),
    Type.Literal('LogicalRequirementRelationship'),
    Type.Literal('LogicalCapabilityRelationship'),
    Type.Literal('LogicalServiceInterfaceRelationship'),
    Type.Literal('LogicalDataInterfaceRelationship'),
    Type.Literal('LogicalSystemInterfaceRelationship'),
    Type.Literal('LogicalNodeConnectorRelationship'),
    Type.Literal('LogicalLinkRelationship'),
    Type.Literal('LogicalNetworkRelationship'),
    Type.Literal('LogicalProtocolRelationship'),
    Type.Literal('LogicalMessageRelationship'),
    Type.Literal('LogicalEventRelationship'),
    Type.Literal('LogicalStateRelationship'),
    Type.Literal('LogicalTransitionRelationship'),
    Type.Literal('LogicalConditionRelationship'),
    Type.Literal('LogicalActionRelationship'),
    Type.Literal('LogicalDecisionRelationship'),
    Type.Literal('LogicalMergeRelationship'),
    Type.Literal('LogicalForkRelationship'),
    Type.Literal('LogicalJoinRelationship'),
    Type.Literal('LogicalStartRelationship'),
    Type.Literal('LogicalEndRelationship'),
    Type.Literal('LogicalSequenceFlow'),
    Type.Literal('LogicalMessageFlow'),
    Type.Literal('LogicalObjectFlow'),
    Type.Literal('LogicalControlFlow'),
    Type.Literal('LogicalExceptionFlow'),
    Type.Literal('LogicalCompensationFlow'),
    Type.Literal('LogicalCancelFlow'),
    Type.Literal('LogicalTimerFlow'),
    Type.Literal('LogicalSignalFlow'),
    Type.Literal('LogicalDataAssociation'),
    Type.Literal('LogicalAnnotation'),
    // Organizational Relationships
    Type.Literal('OrganizationalHierarchy'),
    Type.Literal('OrganizationalReporting'),
    Type.Literal('CapabilityOwnership'),
    Type.Literal('PersonAssignment'),
    // Infrastructure Relationships
    Type.Literal('FacilityLocation'),
    Type.Literal('EquipmentAssignment'),
    Type.Literal('LocationHierarchy'),
    // Security Relationships
    Type.Literal('SecurityControlImplementation'),
    Type.Literal('SecurityAttributeAssignment'),
    // Traceability Relationships
    Type.Literal('Traceability'),
    Type.Literal('Implementation'),
    Type.Literal('Satisfaction'),
    Type.Literal('Verification'),
    Type.Literal('Validation'),
    // DM2 Data Groups Relationships - Principal Architectural Constructs
    Type.Literal('PerformerRelationship'),
    Type.Literal('ResourceFlowRelationship'),
    Type.Literal('RuleRelationship'),
    Type.Literal('GoalRelationship'),
    Type.Literal('CapabilityRelationship'),
    Type.Literal('ProjectRelationship'),
    Type.Literal('ReificationRelationship'),
    // DM2 Data Groups Relationships - Supporting Architectural Constructs
    Type.Literal('MeasureRelationship'),
    Type.Literal('LocationRelationship'),
    Type.Literal('PedigreeRelationship'),
  ]),
  {
    "@prop": term.dodaf.type,
    "@kind": "data",
    "sh:datatype": Datatypes.string,
    "sh:minCount": 1,
    "rdfs:domain": term.dodaf.Relationship,
  }
);

/**
 * Relationship Schema with semantic metadata
 */
const RelationshipSchema = Class(
  term.dodaf.Relationship,
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
    type: RelationshipTypeSchema,
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
    sourceId: ObjectProperty(Type.String({ format: "uri" }), {
      "@prop": term.dodaf.sourceId,
      "@kind": "object",
      "sh:minCount": 1,
      "sh:nodeKind": "sh:IRI",
      "rdfs:range": term.dodaf.Element,
      "owl:FunctionalProperty": true,
    }),
    targetId: ObjectProperty(Type.String({ format: "uri" }), {
      "@prop": term.dodaf.targetId,
      "@kind": "object",
      "sh:minCount": 1,
      "sh:nodeKind": "sh:IRI",
      "rdfs:range": term.dodaf.Element,
      "owl:FunctionalProperty": true,
    }),
    properties: DataProperty(Type.Record(Type.String(), Type.Any()), {
      "@prop": term.dodaf.properties,
      "@kind": "data",
      "sh:minCount": 1,
      "sh:datatype": Datatypes.string, // JSON string
    }),
  },
  {
    "rdfs:comment": "Relationships between elements in DoDAF architecture representing connections, flows, hierarchies, and other associations",
    "@context": {
      dodaf: "https://dodaf.defense.gov/ontology#",
      name: term.dodaf.name,
      description: term.dodaf.description,
      sourceId: term.dodaf.sourceId,
      targetId: term.dodaf.targetId,
      productId: term.dodaf.productId,
    }
  }
);

// Export for use in other schemas
export { RelationshipSchema };
