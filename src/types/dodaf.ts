/**
 * DoDAF 2.0 Ontology Types
 * Based on DoD Architecture Framework Version 2.0
 */

export type ViewType = 'AV' | 'OV' | 'SV' | 'TV' | 'DIV';

export type ViewName =
  | 'All Views'
  | 'Operational View'
  | 'Systems View'
  | 'Technical Standards View'
  | 'Data and Information View';

export interface View {
  id: string;
  type: ViewType;
  name: ViewName;
  description: string;
  purpose: string;
  products: Product[];
}

export interface Product {
  id: string;
  viewId: string;
  number: string; // e.g., "OV-1", "SV-1"
  name: string;
  description: string;
  purpose: string;
  elements: Element[];
  relationships: Relationship[];
}

// DoDAF 2.0 Meta Model Element Types
export type ElementType =
  // Core Elements
  | 'ArchitectureDescription'
  | 'View'
  | 'Product'
  | 'Element'
  | 'Relationship'
  // Operational Elements
  | 'OperationalActivity'
  | 'OperationalPerformer'
  | 'OperationalResource'
  | 'OperationalResourceFlow'
  | 'OperationalEvent'
  | 'OperationalNode'
  | 'OperationalExchange'
  // System Elements
  | 'System'
  | 'SystemInterface'
  | 'SystemFunction'
  | 'SystemResource'
  | 'SystemResourceFlow'
  | 'SystemNode'
  | 'SystemExchange'
  // Data Elements
  | 'Data'
  | 'DataInterface'
  | 'DataRelationship'
  | 'DataEntity'
  | 'DataAttribute'
  // Services Elements (統合)
  | 'ServiceDescription'
  | 'Service'
  | 'Information'
  | 'Representation'
  | 'InformationType'
  | 'RepresentationType'
  | 'Port'
  | 'ServicePort'
  | 'ServiceInterface'
  // Data Model Elements (CDM, LDM, PES統合)
  | 'ConceptualDataModel'
  | 'LogicalDataModel'
  | 'PhysicalDataModel'
  | 'DataModel'
  | 'Entity'
  | 'Attribute'
  | 'RelationshipEntity'
  | 'Domain'
  | 'Key'
  | 'Constraint'
  | 'Index'
  | 'Table'
  | 'Column'
  | 'ViewDefinition'
  | 'Procedure'
  | 'Trigger'
  | 'Sequence'
  | 'Synonym'
  | 'Schema'
  // Logical Model Elements (詳細統合)
  | 'LogicalArchitecture'
  | 'LogicalActivity'
  | 'LogicalPerformer'
  | 'LogicalResource'
  | 'LogicalSystem'
  | 'LogicalInterface'
  | 'LogicalNode'
  | 'LogicalFlow'
  | 'LogicalConstraint'
  | 'LogicalComponent'
  | 'LogicalService'
  | 'LogicalDataFlow'
  | 'LogicalControlFlow'
  | 'LogicalInformationFlow'
  | 'LogicalPhysicalFlow'
  | 'LogicalOperationalActivity'
  | 'LogicalSystemFunction'
  | 'LogicalDataStructure'
  | 'LogicalBusinessRule'
  | 'LogicalPolicy'
  | 'LogicalStandard'
  | 'LogicalRequirement'
  | 'LogicalCapability'
  | 'LogicalServiceInterface'
  | 'LogicalDataInterface'
  | 'LogicalSystemInterface'
  | 'LogicalNodeConnector'
  | 'LogicalLink'
  | 'LogicalNetwork'
  | 'LogicalProtocol'
  | 'LogicalMessage'
  | 'LogicalEvent'
  | 'LogicalState'
  | 'LogicalTransition'
  | 'LogicalCondition'
  | 'LogicalAction'
  | 'LogicalDecision'
  | 'LogicalMerge'
  | 'LogicalFork'
  | 'LogicalJoin'
  | 'LogicalStart'
  | 'LogicalEnd'
  // Standard Elements
  | 'Standard'
  | 'StandardProfile'
  | 'TechnicalStandard'
  // Organizational Elements
  | 'Organization'
  | 'OrganizationalUnit'
  | 'Person'
  | 'Capability'
  // Infrastructure Elements
  | 'Facility'
  | 'Location'
  | 'Equipment'
  // Security Elements
  | 'SecurityAttribute'
  | 'SecurityControl'
  | 'InformationAssuranceRequirement';

export interface Element {
  id: string;
  productId: string;
  type: ElementType;
  name: string;
  description: string;
  properties: Record<string, any>;
  metadata?: ElementMetadata;
}

export interface ElementMetadata {
  created: string;
  modified: string;
  author: string;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

// DoDAF 2.0 Meta Model Relationship Types
export type RelationshipType =
  // General Relationships
  | 'Association'
  | 'Aggregation'
  | 'Composition'
  | 'Generalization'
  | 'Dependency'
  | 'Realization'
  // Operational Relationships
  | 'OperationalActivityFlow'
  | 'OperationalPerformerAssignment'
  | 'OperationalResourceAssignment'
  | 'OperationalResourceFlow'
  | 'OperationalEventTrigger'
  | 'OperationalNeedline'
  // System Relationships
  | 'SystemInterfaceConnection'
  | 'SystemFunctionFlow'
  | 'SystemResourceAssignment'
  | 'SystemResourceFlow'
  | 'SystemNeedline'
  | 'SystemCapabilityRealization'
  // Data Relationships
  | 'DataInterfaceConnection'
  | 'DataRelationship'
  | 'DataEntityRelationship'
  | 'DataAttributeRelationship'
  // Services Relationships (統合)
  | 'ServiceDescribedBy'
  | 'ServicePortDescribedBy'
  | 'RepresentedBy'
  | 'Description'
  | 'ServicePortBeingDescribed'
  | 'ServiceBeingDescribed'
  | 'InformationDescribedBy'
  | 'RepresentationDescribedBy'
  // Data Model Relationships (CDM, LDM, PES統合)
  | 'DataModelRelationship'
  | 'EntityRelationship'
  | 'AttributeRelationship'
  | 'TableRelationship'
  | 'ColumnRelationship'
  | 'SchemaRelationship'
  | 'KeyRelationship'
  | 'ConstraintRelationship'
  | 'IndexRelationship'
  | 'Inheritance'
  | 'AssociationEntity'
  | 'AggregationEntity'
  | 'CompositionEntity'
  | 'DependencyEntity'
  | 'GeneralizationEntity'
  | 'RealizationEntity'
  // Logical Model Relationships (詳細統合)
  | 'LogicalArchitectureRelationship'
  | 'LogicalActivityRelationship'
  | 'LogicalPerformerRelationship'
  | 'LogicalResourceRelationship'
  | 'LogicalSystemRelationship'
  | 'LogicalInterfaceRelationship'
  | 'LogicalNodeRelationship'
  | 'LogicalFlowRelationship'
  | 'LogicalConstraintRelationship'
  | 'LogicalComponentRelationship'
  | 'LogicalServiceRelationship'
  | 'LogicalDataFlowRelationship'
  | 'LogicalControlFlowRelationship'
  | 'LogicalInformationFlowRelationship'
  | 'LogicalPhysicalFlowRelationship'
  | 'LogicalOperationalActivityRelationship'
  | 'LogicalSystemFunctionRelationship'
  | 'LogicalDataStructureRelationship'
  | 'LogicalBusinessRuleRelationship'
  | 'LogicalPolicyRelationship'
  | 'LogicalStandardRelationship'
  | 'LogicalRequirementRelationship'
  | 'LogicalCapabilityRelationship'
  | 'LogicalServiceInterfaceRelationship'
  | 'LogicalDataInterfaceRelationship'
  | 'LogicalSystemInterfaceRelationship'
  | 'LogicalNodeConnectorRelationship'
  | 'LogicalLinkRelationship'
  | 'LogicalNetworkRelationship'
  | 'LogicalProtocolRelationship'
  | 'LogicalMessageRelationship'
  | 'LogicalEventRelationship'
  | 'LogicalStateRelationship'
  | 'LogicalTransitionRelationship'
  | 'LogicalConditionRelationship'
  | 'LogicalActionRelationship'
  | 'LogicalDecisionRelationship'
  | 'LogicalMergeRelationship'
  | 'LogicalForkRelationship'
  | 'LogicalJoinRelationship'
  | 'LogicalStartRelationship'
  | 'LogicalEndRelationship'
  | 'LogicalSequenceFlow'
  | 'LogicalMessageFlow'
  | 'LogicalObjectFlow'
  | 'LogicalControlFlow'
  | 'LogicalExceptionFlow'
  | 'LogicalCompensationFlow'
  | 'LogicalCancelFlow'
  | 'LogicalTimerFlow'
  | 'LogicalSignalFlow'
  | 'LogicalDataAssociation'
  | 'LogicalAnnotation'
  // Organizational Relationships
  | 'OrganizationalHierarchy'
  | 'OrganizationalReporting'
  | 'CapabilityOwnership'
  | 'PersonAssignment'
  // Infrastructure Relationships
  | 'FacilityLocation'
  | 'EquipmentAssignment'
  | 'LocationHierarchy'
  // Security Relationships
  | 'SecurityControlImplementation'
  | 'SecurityAttributeAssignment'
  // Traceability Relationships
  | 'Traceability'
  | 'Implementation'
  | 'Satisfaction'
  | 'Verification'
  | 'Validation';

export interface Relationship {
  id: string;
  productId: string;
  type: RelationshipType;
  name: string;
  description: string;
  sourceId: string;
  targetId: string;
  properties: Record<string, any>;
}

export interface DoDAFArchitecture {
  id: string;
  name: string;
  description: string;
  version: string;
  views: View[];
  metadata: ArchitectureMetadata;
}

export interface ArchitectureMetadata {
  created: string;
  modified: string;
  author: string;
  organization: string;
  classification: string;
  purpose: string;
}
