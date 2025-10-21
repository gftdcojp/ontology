/**
 * DoDAF 2.0 Meta Model Definitions
 * Based on DoD Architecture Framework Version 2.0 Meta Model
 */

import type { ElementType, RelationshipType } from '../types/dodaf';

// DoDAF 2.0 Meta Model Classes and their Properties
export interface MetaModelClass {
  name: string;
  description: string;
  superClass?: string;
  properties: MetaModelProperty[];
  constraints: MetaModelConstraint[];
}

export interface MetaModelProperty {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'date' | 'reference' | 'array';
  required: boolean;
  description: string;
  constraints?: MetaModelConstraint[];
}

export interface MetaModelConstraint {
  type: 'cardinality' | 'valueRange' | 'pattern' | 'reference' | 'custom';
  description: string;
  parameters?: Record<string, any>;
}

// DoDAF 2.0 Core Meta Model (主要な要素のみ定義)
export const DODAF_CORE_METAMODEL: Partial<Record<ElementType, MetaModelClass>> = {
  // Core Architecture Elements
  ArchitectureDescription: {
    name: 'ArchitectureDescription',
    description: 'The root element of a DoDAF architecture description',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier for the architecture description'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name of the architecture'
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description of the architecture'
      },
      {
        name: 'version',
        type: 'string',
        required: true,
        description: 'Version of the architecture description'
      },
      {
        name: 'views',
        type: 'array',
        required: true,
        description: 'Collection of views in the architecture'
      },
      {
        name: 'metadata',
        type: 'reference',
        required: true,
        description: 'Metadata about the architecture'
      }
    ],
    constraints: [
      {
        type: 'cardinality',
        description: 'Must have at least one view',
        parameters: { min: 1, property: 'views' }
      }
    ]
  },

  View: {
    name: 'View',
    description: 'A viewpoint of the architecture focusing on specific concerns',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier for the view'
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Type of view (AV, OV, SV, TV, DIV)'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name of the view'
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description of the view'
      },
      {
        name: 'purpose',
        type: 'string',
        required: true,
        description: 'Purpose of the view'
      },
      {
        name: 'products',
        type: 'array',
        required: true,
        description: 'Collection of products in the view'
      }
    ],
    constraints: [
      {
        type: 'valueRange',
        description: 'View type must be one of the standard DoDAF view types',
        parameters: { values: ['AV', 'OV', 'SV', 'TV', 'DIV'] }
      }
    ]
  },

  Product: {
    name: 'Product',
    description: 'A specific artifact or representation within a view',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier for the product'
      },
      {
        name: 'viewId',
        type: 'string',
        required: true,
        description: 'Reference to the parent view'
      },
      {
        name: 'number',
        type: 'string',
        required: true,
        description: 'Product number (e.g., OV-1, SV-2)'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name of the product'
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description of the product'
      },
      {
        name: 'purpose',
        type: 'string',
        required: true,
        description: 'Purpose of the product'
      },
      {
        name: 'elements',
        type: 'array',
        required: false,
        description: 'Collection of elements in the product'
      },
      {
        name: 'relationships',
        type: 'array',
        required: false,
        description: 'Collection of relationships in the product'
      }
    ],
    constraints: [
      {
        type: 'pattern',
        description: 'Product number must follow DoDAF naming convention',
        parameters: { pattern: '^[A-Z]{2,3}-\\d+[a-z]?$' }
      }
    ]
  },

  Element: {
    name: 'Element',
    description: 'A basic building block within a product',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier for the element'
      },
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: 'Reference to the parent product'
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Type of element from the DoDAF meta model'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name of the element'
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description of the element'
      },
      {
        name: 'properties',
        type: 'reference',
        required: false,
        description: 'Additional properties of the element'
      },
      {
        name: 'metadata',
        type: 'reference',
        required: false,
        description: 'Metadata about the element'
      }
    ],
    constraints: []
  },

  Relationship: {
    name: 'Relationship',
    description: 'A connection between elements',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier for the relationship'
      },
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: 'Reference to the parent product'
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Type of relationship from the DoDAF meta model'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name of the relationship'
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description of the relationship'
      },
      {
        name: 'sourceId',
        type: 'string',
        required: true,
        description: 'Reference to the source element'
      },
      {
        name: 'targetId',
        type: 'string',
        required: true,
        description: 'Reference to the target element'
      },
      {
        name: 'properties',
        type: 'reference',
        required: false,
        description: 'Additional properties of the relationship'
      }
    ],
    constraints: [
      {
        type: 'reference',
        description: 'Source and target IDs must reference existing elements',
        parameters: { property: 'sourceId,targetId' }
      }
    ]
  },

  // Operational Domain Elements
  OperationalActivity: {
    name: 'OperationalActivity',
    description: 'An activity performed by operational performers',
    superClass: 'Element',
    properties: [
      {
        name: 'inputs',
        type: 'array',
        required: false,
        description: 'Resources required as inputs'
      },
      {
        name: 'outputs',
        type: 'array',
        required: false,
        description: 'Resources produced as outputs'
      },
      {
        name: 'performers',
        type: 'array',
        required: false,
        description: 'Operational performers that execute this activity'
      }
    ],
    constraints: []
  },

  OperationalPerformer: {
    name: 'OperationalPerformer',
    description: 'An entity that performs operational activities',
    superClass: 'Element',
    properties: [
      {
        name: 'activities',
        type: 'array',
        required: false,
        description: 'Activities performed by this performer'
      },
      {
        name: 'resources',
        type: 'array',
        required: false,
        description: 'Resources used by this performer'
      }
    ],
    constraints: []
  },

  OperationalResource: {
    name: 'OperationalResource',
    description: 'A resource used in operational activities',
    superClass: 'Element',
    properties: [
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: 'Type of operational resource'
      },
      {
        name: 'quantity',
        type: 'string',
        required: false,
        description: 'Quantity of the resource'
      }
    ],
    constraints: []
  },

  // System Domain Elements
  System: {
    name: 'System',
    description: 'A system that provides capabilities',
    superClass: 'Element',
    properties: [
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'System interfaces'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions provided by the system'
      },
      {
        name: 'resources',
        type: 'array',
        required: false,
        description: 'Resources used by the system'
      }
    ],
    constraints: []
  },

  SystemInterface: {
    name: 'SystemInterface',
    description: 'An interface between systems',
    superClass: 'Element',
    properties: [
      {
        name: 'interfaceType',
        type: 'string',
        required: false,
        description: 'Type of system interface'
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: 'Communication protocol'
      }
    ],
    constraints: []
  },

  // Data Domain Elements
  Data: {
    name: 'Data',
    description: 'Data entity used in the architecture',
    superClass: 'Element',
    properties: [
      {
        name: 'dataType',
        type: 'string',
        required: false,
        description: 'Type of data'
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: 'Data format'
      }
    ],
    constraints: []
  },

  // Standard Elements
  Standard: {
    name: 'Standard',
    description: 'A technical or operational standard',
    superClass: 'Element',
    properties: [
      {
        name: 'standardType',
        type: 'string',
        required: false,
        description: 'Type of standard'
      },
      {
        name: 'authority',
        type: 'string',
        required: false,
        description: 'Authority that defines the standard'
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: 'Version of the standard'
      }
    ],
    constraints: []
  },

  // Organizational Elements
  Organization: {
    name: 'Organization',
    description: 'An organizational entity',
    superClass: 'Element',
    properties: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Type of organization'
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: 'Parent organization'
      }
    ],
    constraints: []
  },

  // Infrastructure Elements
  Facility: {
    name: 'Facility',
    description: 'A physical facility',
    superClass: 'Element',
    properties: [
      {
        name: 'location',
        type: 'string',
        required: false,
        description: 'Location of the facility'
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Type of facility'
      }
    ],
    constraints: []
  },

  // Security Elements
  SecurityAttribute: {
    name: 'SecurityAttribute',
    description: 'A security attribute or classification',
    superClass: 'Element',
    properties: [
      {
        name: 'classification',
        type: 'string',
        required: false,
        description: 'Security classification level'
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Security category'
      }
    ],
    constraints: []
  },

  // Services Elements (統合)
  ServiceDescription: {
    name: 'ServiceDescription',
    description: 'Description of a service',
    superClass: 'Element',
    properties: [
      {
        name: 'serviceType',
        type: 'string',
        required: false,
        description: 'Type of service'
      },
      {
        name: 'serviceLevel',
        type: 'string',
        required: false,
        description: 'Service level agreement'
      },
      {
        name: 'services',
        type: 'array',
        required: false,
        description: 'Services described by this description'
      }
    ],
    constraints: []
  },

  Service: {
    name: 'Service',
    description: 'A service provided or consumed',
    superClass: 'Element',
    properties: [
      {
        name: 'serviceType',
        type: 'string',
        required: false,
        description: 'Type of service (e.g., web service, API)'
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: 'Service protocol'
      },
      {
        name: 'ports',
        type: 'array',
        required: false,
        description: 'Service ports'
      },
      {
        name: 'serviceDescription',
        type: 'string',
        required: false,
        description: 'Reference to service description'
      }
    ],
    constraints: []
  },

  Information: {
    name: 'Information',
    description: 'Information entity used in services',
    superClass: 'Element',
    properties: [
      {
        name: 'informationType',
        type: 'string',
        required: false,
        description: 'Type of information'
      },
      {
        name: 'classification',
        type: 'string',
        required: false,
        description: 'Information classification'
      },
      {
        name: 'representations',
        type: 'array',
        required: false,
        description: 'Information representations'
      }
    ],
    constraints: []
  },

  Representation: {
    name: 'Representation',
    description: 'Representation of information',
    superClass: 'Element',
    properties: [
      {
        name: 'representationType',
        type: 'string',
        required: false,
        description: 'Type of representation'
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: 'Format of representation'
      },
      {
        name: 'information',
        type: 'string',
        required: false,
        description: 'Information being represented'
      }
    ],
    constraints: []
  },

  InformationType: {
    name: 'InformationType',
    description: 'Type definition for information',
    superClass: 'Element',
    properties: [
      {
        name: 'baseType',
        type: 'string',
        required: false,
        description: 'Base data type'
      },
      {
        name: 'constraints',
        type: 'array',
        required: false,
        description: 'Type constraints'
      },
      {
        name: 'information',
        type: 'array',
        required: false,
        description: 'Information instances of this type'
      }
    ],
    constraints: []
  },

  RepresentationType: {
    name: 'RepresentationType',
    description: 'Type definition for representations',
    superClass: 'Element',
    properties: [
      {
        name: 'baseType',
        type: 'string',
        required: false,
        description: 'Base representation type'
      },
      {
        name: 'mediaType',
        type: 'string',
        required: false,
        description: 'Media type'
      },
      {
        name: 'representations',
        type: 'array',
        required: false,
        description: 'Representations of this type'
      }
    ],
    constraints: []
  },

  Port: {
    name: 'Port',
    description: 'A port for service interaction',
    superClass: 'Element',
    properties: [
      {
        name: 'portType',
        type: 'string',
        required: false,
        description: 'Type of port'
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: 'Port direction (in/out/inout)'
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: 'Communication protocol'
      }
    ],
    constraints: []
  },

  ServicePort: {
    name: 'ServicePort',
    description: 'A port specifically for services',
    superClass: 'Port',
    properties: [
      {
        name: 'serviceInterface',
        type: 'string',
        required: false,
        description: 'Associated service interface'
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: 'Service operations available through this port'
      }
    ],
    constraints: []
  },

  ServiceInterface: {
    name: 'ServiceInterface',
    description: 'Interface definition for services',
    superClass: 'Element',
    properties: [
      {
        name: 'interfaceType',
        type: 'string',
        required: false,
        description: 'Type of service interface'
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: 'Interface operations'
      },
      {
        name: 'ports',
        type: 'array',
        required: false,
        description: 'Ports implementing this interface'
      }
    ],
    constraints: []
  }
};

// Relationship Meta Model (主要な関係のみ定義)
export const DODAF_RELATIONSHIP_METAMODEL: Partial<Record<RelationshipType, MetaModelClass>> = {
  // Services Relationships (統合)
  ServiceDescribedBy: {
    name: 'ServiceDescribedBy',
    description: 'Service described by service description',
    properties: [
      {
        name: 'descriptionType',
        type: 'string',
        required: false,
        description: 'Type of description'
      }
    ],
    constraints: []
  },

  ServicePortDescribedBy: {
    name: 'ServicePortDescribedBy',
    description: 'Service port described by description',
    properties: [
      {
        name: 'descriptionType',
        type: 'string',
        required: false,
        description: 'Type of port description'
      }
    ],
    constraints: []
  },

  RepresentedBy: {
    name: 'RepresentedBy',
    description: 'Information represented by representation',
    properties: [
      {
        name: 'representationType',
        type: 'string',
        required: false,
        description: 'Type of representation'
      }
    ],
    constraints: []
  },

  Description: {
    name: 'Description',
    description: 'General description relationship',
    properties: [
      {
        name: 'descriptionType',
        type: 'string',
        required: false,
        description: 'Type of description'
      }
    ],
    constraints: []
  },

  ServicePortBeingDescribed: {
    name: 'ServicePortBeingDescribed',
    description: 'Service port being described',
    properties: [],
    constraints: []
  },

  ServiceBeingDescribed: {
    name: 'ServiceBeingDescribed',
    description: 'Service being described',
    properties: [],
    constraints: []
  },

  InformationDescribedBy: {
    name: 'InformationDescribedBy',
    description: 'Information described by information type',
    properties: [],
    constraints: []
  },

  RepresentationDescribedBy: {
    name: 'RepresentationDescribedBy',
    description: 'Representation described by representation type',
    properties: [],
    constraints: []
  },
  // General Relationships
  Association: {
    name: 'Association',
    description: 'A general association between elements',
    properties: [],
    constraints: []
  },

  Aggregation: {
    name: 'Aggregation',
    description: 'A whole-part relationship',
    properties: [
      {
        name: 'multiplicity',
        type: 'string',
        required: false,
        description: 'Multiplicity of the aggregation'
      }
    ],
    constraints: []
  },

  // Operational Relationships
  OperationalActivityFlow: {
    name: 'OperationalActivityFlow',
    description: 'Flow of control between operational activities',
    properties: [
      {
        name: 'trigger',
        type: 'string',
        required: false,
        description: 'Trigger condition for the flow'
      },
      {
        name: 'resources',
        type: 'array',
        required: false,
        description: 'Resources that flow with the activity'
      }
    ],
    constraints: []
  },

  OperationalResourceFlow: {
    name: 'OperationalResourceFlow',
    description: 'Flow of resources between operational elements',
    properties: [
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: 'Type of resource being transferred'
      },
      {
        name: 'quantity',
        type: 'string',
        required: false,
        description: 'Quantity of resource flow'
      }
    ],
    constraints: []
  },

  // System Relationships
  SystemInterfaceConnection: {
    name: 'SystemInterfaceConnection',
    description: 'Connection between system interfaces',
    properties: [
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: 'Communication protocol'
      },
      {
        name: 'bandwidth',
        type: 'string',
        required: false,
        description: 'Required bandwidth'
      }
    ],
    constraints: []
  },

  // Traceability Relationships
  Traceability: {
    name: 'Traceability',
    description: 'Traceability link between elements in different views',
    properties: [
      {
        name: 'rationale',
        type: 'string',
        required: false,
        description: 'Rationale for the traceability link'
      },
      {
        name: 'strength',
        type: 'string',
        required: false,
        description: 'Strength of the traceability relationship'
      }
    ],
    constraints: []
  },

  // Placeholder for other relationship types
  Composition: { name: 'Composition', description: 'Strong whole-part relationship', properties: [], constraints: [] },
  Generalization: { name: 'Generalization', description: 'Inheritance relationship', properties: [], constraints: [] },
  Dependency: { name: 'Dependency', description: 'Dependency relationship', properties: [], constraints: [] },
  Realization: { name: 'Realization', description: 'Realization relationship', properties: [], constraints: [] },

  OperationalPerformerAssignment: { name: 'OperationalPerformerAssignment', description: 'Assignment of performer to activity', properties: [], constraints: [] },
  OperationalResourceAssignment: { name: 'OperationalResourceAssignment', description: 'Assignment of resource to activity', properties: [], constraints: [] },
  OperationalEventTrigger: { name: 'OperationalEventTrigger', description: 'Event trigger for activity', properties: [], constraints: [] },
  OperationalNeedline: { name: 'OperationalNeedline', description: 'Needline between operational elements', properties: [], constraints: [] },

  SystemFunctionFlow: { name: 'SystemFunctionFlow', description: 'Flow between system functions', properties: [], constraints: [] },
  SystemResourceAssignment: { name: 'SystemResourceAssignment', description: 'Assignment of resource to system', properties: [], constraints: [] },
  SystemResourceFlow: { name: 'SystemResourceFlow', description: 'Flow of system resources', properties: [], constraints: [] },
  SystemNeedline: { name: 'SystemNeedline', description: 'Needline between system elements', properties: [], constraints: [] },
  SystemCapabilityRealization: { name: 'SystemCapabilityRealization', description: 'System realization of capability', properties: [], constraints: [] },

  DataInterfaceConnection: { name: 'DataInterfaceConnection', description: 'Connection between data interfaces', properties: [], constraints: [] },
  DataRelationship: { name: 'DataRelationship', description: 'Relationship between data elements', properties: [], constraints: [] },
  DataEntityRelationship: { name: 'DataEntityRelationship', description: 'Relationship between data entities', properties: [], constraints: [] },
  DataAttributeRelationship: { name: 'DataAttributeRelationship', description: 'Relationship between data attributes', properties: [], constraints: [] },

  OrganizationalHierarchy: { name: 'OrganizationalHierarchy', description: 'Organizational hierarchy', properties: [], constraints: [] },
  OrganizationalReporting: { name: 'OrganizationalReporting', description: 'Reporting relationship', properties: [], constraints: [] },
  CapabilityOwnership: { name: 'CapabilityOwnership', description: 'Capability ownership', properties: [], constraints: [] },
  PersonAssignment: { name: 'PersonAssignment', description: 'Person assignment', properties: [], constraints: [] },

  FacilityLocation: { name: 'FacilityLocation', description: 'Facility location relationship', properties: [], constraints: [] },
  EquipmentAssignment: { name: 'EquipmentAssignment', description: 'Equipment assignment', properties: [], constraints: [] },
  LocationHierarchy: { name: 'LocationHierarchy', description: 'Location hierarchy', properties: [], constraints: [] },

  SecurityControlImplementation: { name: 'SecurityControlImplementation', description: 'Security control implementation', properties: [], constraints: [] },
  SecurityAttributeAssignment: { name: 'SecurityAttributeAssignment', description: 'Security attribute assignment', properties: [], constraints: [] },

  Implementation: { name: 'Implementation', description: 'Implementation relationship', properties: [], constraints: [] },
  Satisfaction: { name: 'Satisfaction', description: 'Satisfaction relationship', properties: [], constraints: [] },
  Verification: { name: 'Verification', description: 'Verification relationship', properties: [], constraints: [] },
  Validation: { name: 'Validation', description: 'Validation relationship', properties: [], constraints: [] }
};

// Helper functions for meta model validation
export function getElementMetaModel(elementType: ElementType): MetaModelClass | undefined {
  return DODAF_CORE_METAMODEL[elementType];
}

export function getRelationshipMetaModel(relationshipType: RelationshipType): MetaModelClass | undefined {
  return DODAF_RELATIONSHIP_METAMODEL[relationshipType];
}

// Create a default meta model class for undefined types
function createDefaultMetaModel(name: string, type: string): MetaModelClass {
  return {
    name,
    description: `A ${type} element in the DoDAF meta model`,
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description'
      },
      {
        name: 'properties',
        type: 'reference',
        required: false,
        description: 'Additional properties'
      }
    ],
    constraints: []
  };
}

export function validateElementAgainstMetaModel(element: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  let metaModel = getElementMetaModel(element.type);

  if (!metaModel) {
    // For unknown types, create a default meta model with basic validation
    metaModel = createDefaultMetaModel(element.type, 'element');
  }

  // Validate required properties
  for (const prop of metaModel.properties) {
    if (prop.required && !(prop.name in element)) {
      errors.push(`Required property '${prop.name}' is missing for element type '${element.type}'`);
    }
  }

  // Validate constraints
  for (const constraint of metaModel.constraints) {
    // Add constraint validation logic here as needed
  }

  return { valid: errors.length === 0, errors };
}

export function validateRelationshipAgainstMetaModel(relationship: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  let metaModel = getRelationshipMetaModel(relationship.type);

  if (!metaModel) {
    // For unknown types, create a default meta model with basic validation
    metaModel = createDefaultMetaModel(relationship.type, 'relationship');
  }

  // Validate required properties
  for (const prop of metaModel.properties) {
    if (prop.required && !(prop.name in relationship)) {
      errors.push(`Required property '${prop.name}' is missing for relationship type '${relationship.type}'`);
    }
  }

  return { valid: errors.length === 0, errors };
}
