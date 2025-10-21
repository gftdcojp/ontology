/**
 * DoDAF 2.0 Meta Model Index
 * Unified access to all DoDAF 2.0 meta model definitions
 */

export type { MetaModelClass, MetaModelProperty, MetaModelConstraint } from './meta-model-types';
export type { ElementType, RelationshipType } from '../types/dodaf';

// Import all meta model modules
import { CORE_METAMODEL, CORE_RELATIONSHIP_METAMODEL } from './core-metamodel';
import { OPERATIONAL_METAMODEL, OPERATIONAL_RELATIONSHIP_METAMODEL } from './operational-metamodel';
import { SYSTEM_METAMODEL, SYSTEM_RELATIONSHIP_METAMODEL } from './system-metamodel';
import { DATA_METAMODEL, DATA_RELATIONSHIP_METAMODEL } from './data-metamodel';
import { SERVICE_METAMODEL, SERVICE_RELATIONSHIP_METAMODEL } from './service-metamodel';
import { LOGICAL_METAMODEL, LOGICAL_RELATIONSHIP_METAMODEL } from './logical-metamodel';
import { STANDARD_METAMODEL, STANDARD_RELATIONSHIP_METAMODEL } from './standard-metamodel';
import { ORGANIZATIONAL_METAMODEL, ORGANIZATIONAL_RELATIONSHIP_METAMODEL } from './organizational-metamodel';
import { INFRASTRUCTURE_METAMODEL, INFRASTRUCTURE_RELATIONSHIP_METAMODEL } from './infrastructure-metamodel';
import { SECURITY_METAMODEL, SECURITY_RELATIONSHIP_METAMODEL } from './security-metamodel';

// Unified DoDAF 2.0 Meta Model
export const DODAF_CORE_METAMODEL = {
  ...CORE_METAMODEL,
  ...OPERATIONAL_METAMODEL,
  ...SYSTEM_METAMODEL,
  ...DATA_METAMODEL,
  ...SERVICE_METAMODEL,
  ...LOGICAL_METAMODEL,
  ...STANDARD_METAMODEL,
  ...ORGANIZATIONAL_METAMODEL,
  ...INFRASTRUCTURE_METAMODEL,
  ...SECURITY_METAMODEL
} as const;

export const DODAF_RELATIONSHIP_METAMODEL = {
  ...CORE_RELATIONSHIP_METAMODEL,
  ...OPERATIONAL_RELATIONSHIP_METAMODEL,
  ...SYSTEM_RELATIONSHIP_METAMODEL,
  ...DATA_RELATIONSHIP_METAMODEL,
  ...SERVICE_RELATIONSHIP_METAMODEL,
  ...LOGICAL_RELATIONSHIP_METAMODEL,
  ...STANDARD_RELATIONSHIP_METAMODEL,
  ...ORGANIZATIONAL_RELATIONSHIP_METAMODEL,
  ...INFRASTRUCTURE_RELATIONSHIP_METAMODEL,
  ...SECURITY_RELATIONSHIP_METAMODEL
} as const;
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
  },

  // Data Model Elements (CDM, LDM, PES統合)
  ConceptualDataModel: {
    name: 'ConceptualDataModel',
    description: 'Conceptual data model representing business concepts',
    superClass: 'Element',
    properties: [
      {
        name: 'modelType',
        type: 'string',
        required: false,
        description: 'Type of data model (CDM, LDM, PES)'
      },
      {
        name: 'entities',
        type: 'array',
        required: false,
        description: 'Conceptual entities in the model'
      },
      {
        name: 'relationships',
        type: 'array',
        required: false,
        description: 'Conceptual relationships between entities'
      },
      {
        name: 'domains',
        type: 'array',
        required: false,
        description: 'Value domains used in the model'
      }
    ],
    constraints: []
  },

  LogicalDataModel: {
    name: 'LogicalDataModel',
    description: 'Logical data model with normalized structures',
    superClass: 'Element',
    properties: [
      {
        name: 'modelType',
        type: 'string',
        required: false,
        description: 'Type of data model (CDM, LDM, PES)'
      },
      {
        name: 'tables',
        type: 'array',
        required: false,
        description: 'Logical tables in the model'
      },
      {
        name: 'views',
        type: 'array',
        required: false,
        description: 'Logical views in the model'
      },
      {
        name: 'procedures',
        type: 'array',
        required: false,
        description: 'Stored procedures in the model'
      }
    ],
    constraints: []
  },

  PhysicalDataModel: {
    name: 'PhysicalDataModel',
    description: 'Physical data model for database implementation',
    superClass: 'Element',
    properties: [
      {
        name: 'modelType',
        type: 'string',
        required: false,
        description: 'Type of data model (CDM, LDM, PES)'
      },
      {
        name: 'databaseType',
        type: 'string',
        required: false,
        description: 'Target database type'
      },
      {
        name: 'tables',
        type: 'array',
        required: false,
        description: 'Physical tables in the model'
      },
      {
        name: 'indexes',
        type: 'array',
        required: false,
        description: 'Physical indexes in the model'
      }
    ],
    constraints: []
  },

  DataModel: {
    name: 'DataModel',
    description: 'Generic data model',
    superClass: 'Element',
    properties: [
      {
        name: 'modelType',
        type: 'string',
        required: false,
        description: 'Type of data model'
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: 'Model version'
      }
    ],
    constraints: []
  },

  Entity: {
    name: 'Entity',
    description: 'Conceptual entity representing a business object',
    superClass: 'Element',
    properties: [
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: 'Type of entity'
      },
      {
        name: 'attributes',
        type: 'array',
        required: false,
        description: 'Attributes of the entity'
      },
      {
        name: 'keys',
        type: 'array',
        required: false,
        description: 'Keys defined for the entity'
      }
    ],
    constraints: []
  },

  Attribute: {
    name: 'Attribute',
    description: 'Attribute of an entity or table',
    superClass: 'Element',
    properties: [
      {
        name: 'dataType',
        type: 'string',
        required: false,
        description: 'Data type of the attribute'
      },
      {
        name: 'length',
        type: 'number',
        required: false,
        description: 'Length or size of the attribute'
      },
      {
        name: 'precision',
        type: 'number',
        required: false,
        description: 'Precision for numeric types'
      },
      {
        name: 'scale',
        type: 'number',
        required: false,
        description: 'Scale for numeric types'
      },
      {
        name: 'nullable',
        type: 'boolean',
        required: false,
        description: 'Whether the attribute can be null'
      },
      {
        name: 'defaultValue',
        type: 'string',
        required: false,
        description: 'Default value for the attribute'
      }
    ],
    constraints: []
  },

  RelationshipEntity: {
    name: 'RelationshipEntity',
    description: 'Entity representing a relationship between other entities',
    superClass: 'Entity',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of relationship (1:1, 1:N, N:M)'
      },
      {
        name: 'cardinality',
        type: 'string',
        required: false,
        description: 'Cardinality specification'
      }
    ],
    constraints: []
  },

  Domain: {
    name: 'Domain',
    description: 'Value domain defining valid values for attributes',
    superClass: 'Element',
    properties: [
      {
        name: 'dataType',
        type: 'string',
        required: false,
        description: 'Base data type'
      },
      {
        name: 'constraints',
        type: 'array',
        required: false,
        description: 'Domain constraints'
      },
      {
        name: 'checkConstraints',
        type: 'array',
        required: false,
        description: 'Check constraints for the domain'
      }
    ],
    constraints: []
  },

  Key: {
    name: 'Key',
    description: 'Key definition for uniqueness or reference',
    superClass: 'Element',
    properties: [
      {
        name: 'keyType',
        type: 'string',
        required: false,
        description: 'Type of key (primary, foreign, unique, etc.)'
      },
      {
        name: 'columns',
        type: 'array',
        required: false,
        description: 'Columns included in the key'
      },
      {
        name: 'referencedTable',
        type: 'string',
        required: false,
        description: 'Referenced table for foreign keys'
      }
    ],
    constraints: []
  },

  Constraint: {
    name: 'Constraint',
    description: 'Business rule or data constraint',
    superClass: 'Element',
    properties: [
      {
        name: 'constraintType',
        type: 'string',
        required: false,
        description: 'Type of constraint'
      },
      {
        name: 'expression',
        type: 'string',
        required: false,
        description: 'Constraint expression or rule'
      },
      {
        name: 'enforced',
        type: 'boolean',
        required: false,
        description: 'Whether the constraint is enforced'
      }
    ],
    constraints: []
  },

  Index: {
    name: 'Index',
    description: 'Database index for performance',
    superClass: 'Element',
    properties: [
      {
        name: 'indexType',
        type: 'string',
        required: false,
        description: 'Type of index'
      },
      {
        name: 'columns',
        type: 'array',
        required: false,
        description: 'Columns included in the index'
      },
      {
        name: 'unique',
        type: 'boolean',
        required: false,
        description: 'Whether the index is unique'
      }
    ],
    constraints: []
  },

  Table: {
    name: 'Table',
    description: 'Physical or logical table structure',
    superClass: 'Element',
    properties: [
      {
        name: 'tableType',
        type: 'string',
        required: false,
        description: 'Type of table'
      },
      {
        name: 'columns',
        type: 'array',
        required: false,
        description: 'Columns in the table'
      },
      {
        name: 'keys',
        type: 'array',
        required: false,
        description: 'Keys defined for the table'
      },
      {
        name: 'indexes',
        type: 'array',
        required: false,
        description: 'Indexes defined for the table'
      }
    ],
    constraints: []
  },

  Column: {
    name: 'Column',
    description: 'Column in a table',
    superClass: 'Attribute',
    properties: [
      {
        name: 'table',
        type: 'string',
        required: false,
        description: 'Parent table'
      },
      {
        name: 'position',
        type: 'number',
        required: false,
        description: 'Position in the table'
      }
    ],
    constraints: []
  },

  ViewDefinition: {
    name: 'ViewDefinition',
    description: 'Definition of a database view',
    superClass: 'Element',
    properties: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'SQL query defining the view'
      },
      {
        name: 'baseTables',
        type: 'array',
        required: false,
        description: 'Base tables used in the view'
      }
    ],
    constraints: []
  },

  Procedure: {
    name: 'Procedure',
    description: 'Stored procedure or function',
    superClass: 'Element',
    properties: [
      {
        name: 'procedureType',
        type: 'string',
        required: false,
        description: 'Type of procedure'
      },
      {
        name: 'parameters',
        type: 'array',
        required: false,
        description: 'Procedure parameters'
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: 'Procedure body or implementation'
      }
    ],
    constraints: []
  },

  Trigger: {
    name: 'Trigger',
    description: 'Database trigger',
    superClass: 'Element',
    properties: [
      {
        name: 'triggerType',
        type: 'string',
        required: false,
        description: 'Type of trigger (before, after, instead of)'
      },
      {
        name: 'event',
        type: 'string',
        required: false,
        description: 'Triggering event'
      },
      {
        name: 'table',
        type: 'string',
        required: false,
        description: 'Table the trigger is defined on'
      }
    ],
    constraints: []
  },

  Sequence: {
    name: 'Sequence',
    description: 'Database sequence for generating unique values',
    superClass: 'Element',
    properties: [
      {
        name: 'startValue',
        type: 'number',
        required: false,
        description: 'Starting value for the sequence'
      },
      {
        name: 'increment',
        type: 'number',
        required: false,
        description: 'Increment value'
      },
      {
        name: 'maxValue',
        type: 'number',
        required: false,
        description: 'Maximum value'
      }
    ],
    constraints: []
  },

  Synonym: {
    name: 'Synonym',
    description: 'Database synonym or alias',
    superClass: 'Element',
    properties: [
      {
        name: 'synonymType',
        type: 'string',
        required: false,
        description: 'Type of synonym'
      },
      {
        name: 'targetObject',
        type: 'string',
        required: false,
        description: 'Object being aliased'
      }
    ],
    constraints: []
  },

  Schema: {
    name: 'Schema',
    description: 'Database schema or namespace',
    superClass: 'Element',
    properties: [
      {
        name: 'schemaType',
        type: 'string',
        required: false,
        description: 'Type of schema'
      },
      {
        name: 'owner',
        type: 'string',
        required: false,
        description: 'Schema owner'
      },
      {
        name: 'objects',
        type: 'array',
        required: false,
        description: 'Objects in the schema'
      }
    ],
    constraints: []
  },

  // Logical Model Elements (詳細統合)
  LogicalArchitecture: {
    name: 'LogicalArchitecture',
    description: 'Logical architecture representing system structure and behavior',
    superClass: 'Element',
    properties: [
      {
        name: 'architectureType',
        type: 'string',
        required: false,
        description: 'Type of logical architecture'
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: 'Logical components in the architecture'
      },
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'Logical interfaces in the architecture'
      },
      {
        name: 'flows',
        type: 'array',
        required: false,
        description: 'Logical flows in the architecture'
      },
      {
        name: 'constraints',
        type: 'array',
        required: false,
        description: 'Logical constraints in the architecture'
      }
    ],
    constraints: []
  },

  LogicalActivity: {
    name: 'LogicalActivity',
    description: 'Logical activity representing a unit of work',
    superClass: 'Element',
    properties: [
      {
        name: 'activityType',
        type: 'string',
        required: false,
        description: 'Type of logical activity'
      },
      {
        name: 'inputs',
        type: 'array',
        required: false,
        description: 'Inputs required for the activity'
      },
      {
        name: 'outputs',
        type: 'array',
        required: false,
        description: 'Outputs produced by the activity'
      },
      {
        name: 'performer',
        type: 'string',
        required: false,
        description: 'Performer of the activity'
      },
      {
        name: 'preConditions',
        type: 'array',
        required: false,
        description: 'Pre-conditions for the activity'
      },
      {
        name: 'postConditions',
        type: 'array',
        required: false,
        description: 'Post-conditions for the activity'
      }
    ],
    constraints: []
  },

  LogicalPerformer: {
    name: 'LogicalPerformer',
    description: 'Logical performer that executes activities',
    superClass: 'Element',
    properties: [
      {
        name: 'performerType',
        type: 'string',
        required: false,
        description: 'Type of logical performer'
      },
      {
        name: 'activities',
        type: 'array',
        required: false,
        description: 'Activities performed by this performer'
      },
      {
        name: 'capabilities',
        type: 'array',
        required: false,
        description: 'Capabilities of the performer'
      },
      {
        name: 'resources',
        type: 'array',
        required: false,
        description: 'Resources used by the performer'
      }
    ],
    constraints: []
  },

  LogicalResource: {
    name: 'LogicalResource',
    description: 'Logical resource used in activities',
    superClass: 'Element',
    properties: [
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: 'Type of logical resource'
      },
      {
        name: 'resourceCategory',
        type: 'string',
        required: false,
        description: 'Category of the resource'
      },
      {
        name: 'consumers',
        type: 'array',
        required: false,
        description: 'Activities that consume this resource'
      },
      {
        name: 'producers',
        type: 'array',
        required: false,
        description: 'Activities that produce this resource'
      }
    ],
    constraints: []
  },

  LogicalSystem: {
    name: 'LogicalSystem',
    description: 'Logical system representing a collection of components',
    superClass: 'Element',
    properties: [
      {
        name: 'systemType',
        type: 'string',
        required: false,
        description: 'Type of logical system'
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: 'Components in the system'
      },
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'Interfaces provided by the system'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions performed by the system'
      }
    ],
    constraints: []
  },

  LogicalInterface: {
    name: 'LogicalInterface',
    description: 'Logical interface defining interaction points',
    superClass: 'Element',
    properties: [
      {
        name: 'interfaceType',
        type: 'string',
        required: false,
        description: 'Type of logical interface'
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: 'Communication protocol'
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: 'Operations provided by the interface'
      },
      {
        name: 'dataTypes',
        type: 'array',
        required: false,
        description: 'Data types exchanged through the interface'
      }
    ],
    constraints: []
  },

  LogicalNode: {
    name: 'LogicalNode',
    description: 'Logical node representing a processing location',
    superClass: 'Element',
    properties: [
      {
        name: 'nodeType',
        type: 'string',
        required: false,
        description: 'Type of logical node'
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: 'Physical or logical location'
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: 'Components hosted by the node'
      },
      {
        name: 'connectors',
        type: 'array',
        required: false,
        description: 'Connectors to other nodes'
      }
    ],
    constraints: []
  },

  LogicalFlow: {
    name: 'LogicalFlow',
    description: 'Logical flow representing data or control flow',
    superClass: 'Element',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of logical flow'
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: 'Source of the flow'
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: 'Target of the flow'
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: 'Content or type of data flowing'
      }
    ],
    constraints: []
  },

  LogicalConstraint: {
    name: 'LogicalConstraint',
    description: 'Logical constraint on system behavior or structure',
    superClass: 'Element',
    properties: [
      {
        name: 'constraintType',
        type: 'string',
        required: false,
        description: 'Type of logical constraint'
      },
      {
        name: 'expression',
        type: 'string',
        required: false,
        description: 'Constraint expression'
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: 'Scope of the constraint'
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: 'Severity level of the constraint'
      }
    ],
    constraints: []
  },

  LogicalComponent: {
    name: 'LogicalComponent',
    description: 'Logical component representing a system part',
    superClass: 'Element',
    properties: [
      {
        name: 'componentType',
        type: 'string',
        required: false,
        description: 'Type of logical component'
      },
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'Interfaces provided by the component'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions performed by the component'
      },
      {
        name: 'dependencies',
        type: 'array',
        required: false,
        description: 'Dependencies on other components'
      }
    ],
    constraints: []
  },

  LogicalService: {
    name: 'LogicalService',
    description: 'Logical service providing business functionality',
    superClass: 'Element',
    properties: [
      {
        name: 'serviceType',
        type: 'string',
        required: false,
        description: 'Type of logical service'
      },
      {
        name: 'serviceLevel',
        type: 'string',
        required: false,
        description: 'Service level agreement'
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: 'Operations provided by the service'
      },
      {
        name: 'contracts',
        type: 'array',
        required: false,
        description: 'Service contracts'
      }
    ],
    constraints: []
  },

  LogicalDataFlow: {
    name: 'LogicalDataFlow',
    description: 'Logical data flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'dataType',
        type: 'string',
        required: false,
        description: 'Type of data flowing'
      },
      {
        name: 'dataFormat',
        type: 'string',
        required: false,
        description: 'Format of the data'
      },
      {
        name: 'dataSize',
        type: 'string',
        required: false,
        description: 'Size or volume of data'
      }
    ],
    constraints: []
  },

  LogicalControlFlow: {
    name: 'LogicalControlFlow',
    description: 'Logical control flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'controlType',
        type: 'string',
        required: false,
        description: 'Type of control flow'
      },
      {
        name: 'triggerCondition',
        type: 'string',
        required: false,
        description: 'Condition that triggers the flow'
      }
    ],
    constraints: []
  },

  LogicalInformationFlow: {
    name: 'LogicalInformationFlow',
    description: 'Logical information flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'informationType',
        type: 'string',
        required: false,
        description: 'Type of information flowing'
      },
      {
        name: 'informationCategory',
        type: 'string',
        required: false,
        description: 'Category of information'
      },
      {
        name: 'securityClassification',
        type: 'string',
        required: false,
        description: 'Security classification of information'
      }
    ],
    constraints: []
  },

  LogicalPhysicalFlow: {
    name: 'LogicalPhysicalFlow',
    description: 'Logical physical flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'physicalType',
        type: 'string',
        required: false,
        description: 'Type of physical flow'
      },
      {
        name: 'medium',
        type: 'string',
        required: false,
        description: 'Physical medium used for flow'
      },
      {
        name: 'bandwidth',
        type: 'string',
        required: false,
        description: 'Bandwidth requirement'
      }
    ],
    constraints: []
  },

  LogicalOperationalActivity: {
    name: 'LogicalOperationalActivity',
    description: 'Logical operational activity in business processes',
    superClass: 'LogicalActivity',
    properties: [
      {
        name: 'businessProcess',
        type: 'string',
        required: false,
        description: 'Business process this activity belongs to'
      },
      {
        name: 'lane',
        type: 'string',
        required: false,
        description: 'Swim lane or organizational unit'
      },
      {
        name: 'milestone',
        type: 'boolean',
        required: false,
        description: 'Whether this is a milestone activity'
      }
    ],
    constraints: []
  },

  LogicalSystemFunction: {
    name: 'LogicalSystemFunction',
    description: 'Logical system function performed by components',
    superClass: 'Element',
    properties: [
      {
        name: 'functionType',
        type: 'string',
        required: false,
        description: 'Type of system function'
      },
      {
        name: 'inputs',
        type: 'array',
        required: false,
        description: 'Inputs required for the function'
      },
      {
        name: 'outputs',
        type: 'array',
        required: false,
        description: 'Outputs produced by the function'
      },
      {
        name: 'performanceRequirements',
        type: 'array',
        required: false,
        description: 'Performance requirements for the function'
      }
    ],
    constraints: []
  },

  LogicalDataStructure: {
    name: 'LogicalDataStructure',
    description: 'Logical data structure definition',
    superClass: 'Element',
    properties: [
      {
        name: 'structureType',
        type: 'string',
        required: false,
        description: 'Type of data structure'
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: 'Fields in the data structure'
      },
      {
        name: 'relationships',
        type: 'array',
        required: false,
        description: 'Relationships to other data structures'
      }
    ],
    constraints: []
  },

  LogicalBusinessRule: {
    name: 'LogicalBusinessRule',
    description: 'Logical business rule governing system behavior',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'ruleType',
        type: 'string',
        required: false,
        description: 'Type of business rule'
      },
      {
        name: 'ruleCategory',
        type: 'string',
        required: false,
        description: 'Category of business rule'
      },
      {
        name: 'enforcementLevel',
        type: 'string',
        required: false,
        description: 'Level of rule enforcement'
      }
    ],
    constraints: []
  },

  LogicalPolicy: {
    name: 'LogicalPolicy',
    description: 'Logical policy defining system behavior',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'policyType',
        type: 'string',
        required: false,
        description: 'Type of policy'
      },
      {
        name: 'policyDomain',
        type: 'string',
        required: false,
        description: 'Domain of the policy'
      },
      {
        name: 'enforcementMechanism',
        type: 'string',
        required: false,
        description: 'Mechanism for policy enforcement'
      }
    ],
    constraints: []
  },

  LogicalStandard: {
    name: 'LogicalStandard',
    description: 'Logical standard defining requirements',
    superClass: 'Element',
    properties: [
      {
        name: 'standardType',
        type: 'string',
        required: false,
        description: 'Type of standard'
      },
      {
        name: 'standardAuthority',
        type: 'string',
        required: false,
        description: 'Authority defining the standard'
      },
      {
        name: 'complianceRequirements',
        type: 'array',
        required: false,
        description: 'Requirements for compliance'
      }
    ],
    constraints: []
  },

  LogicalRequirement: {
    name: 'LogicalRequirement',
    description: 'Logical requirement for system behavior',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'requirementType',
        type: 'string',
        required: false,
        description: 'Type of requirement'
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: 'Priority level'
      },
      {
        name: 'verificationMethod',
        type: 'string',
        required: false,
        description: 'Method for requirement verification'
      }
    ],
    constraints: []
  },

  LogicalCapability: {
    name: 'LogicalCapability',
    description: 'Logical capability provided by the system',
    superClass: 'Element',
    properties: [
      {
        name: 'capabilityType',
        type: 'string',
        required: false,
        description: 'Type of capability'
      },
      {
        name: 'capabilityLevel',
        type: 'string',
        required: false,
        description: 'Level or maturity of capability'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions that provide this capability'
      }
    ],
    constraints: []
  },

  LogicalServiceInterface: {
    name: 'LogicalServiceInterface',
    description: 'Logical service interface definition',
    superClass: 'LogicalInterface',
    properties: [
      {
        name: 'serviceContract',
        type: 'string',
        required: false,
        description: 'Service contract reference'
      },
      {
        name: 'serviceLevel',
        type: 'string',
        required: false,
        description: 'Service level agreement'
      }
    ],
    constraints: []
  },

  LogicalDataInterface: {
    name: 'LogicalDataInterface',
    description: 'Logical data interface definition',
    superClass: 'LogicalInterface',
    properties: [
      {
        name: 'dataFormat',
        type: 'string',
        required: false,
        description: 'Data format specification'
      },
      {
        name: 'dataSchema',
        type: 'string',
        required: false,
        description: 'Data schema reference'
      }
    ],
    constraints: []
  },

  LogicalSystemInterface: {
    name: 'LogicalSystemInterface',
    description: 'Logical system interface definition',
    superClass: 'LogicalInterface',
    properties: [
      {
        name: 'systemProtocol',
        type: 'string',
        required: false,
        description: 'System communication protocol'
      },
      {
        name: 'systemStandard',
        type: 'string',
        required: false,
        description: 'System interface standard'
      }
    ],
    constraints: []
  },

  LogicalNodeConnector: {
    name: 'LogicalNodeConnector',
    description: 'Logical connector between nodes',
    superClass: 'Element',
    properties: [
      {
        name: 'connectorType',
        type: 'string',
        required: false,
        description: 'Type of connector'
      },
      {
        name: 'sourceNode',
        type: 'string',
        required: false,
        description: 'Source node'
      },
      {
        name: 'targetNode',
        type: 'string',
        required: false,
        description: 'Target node'
      },
      {
        name: 'bandwidth',
        type: 'string',
        required: false,
        description: 'Bandwidth capacity'
      }
    ],
    constraints: []
  },

  LogicalLink: {
    name: 'LogicalLink',
    description: 'Logical communication link',
    superClass: 'Element',
    properties: [
      {
        name: 'linkType',
        type: 'string',
        required: false,
        description: 'Type of link'
      },
      {
        name: 'technology',
        type: 'string',
        required: false,
        description: 'Link technology'
      },
      {
        name: 'capacity',
        type: 'string',
        required: false,
        description: 'Link capacity'
      }
    ],
    constraints: []
  },

  LogicalNetwork: {
    name: 'LogicalNetwork',
    description: 'Logical network structure',
    superClass: 'Element',
    properties: [
      {
        name: 'networkType',
        type: 'string',
        required: false,
        description: 'Type of network'
      },
      {
        name: 'topology',
        type: 'string',
        required: false,
        description: 'Network topology'
      },
      {
        name: 'nodes',
        type: 'array',
        required: false,
        description: 'Nodes in the network'
      },
      {
        name: 'links',
        type: 'array',
        required: false,
        description: 'Links in the network'
      }
    ],
    constraints: []
  },

  LogicalProtocol: {
    name: 'LogicalProtocol',
    description: 'Logical protocol definition',
    superClass: 'Element',
    properties: [
      {
        name: 'protocolType',
        type: 'string',
        required: false,
        description: 'Type of protocol'
      },
      {
        name: 'protocolStandard',
        type: 'string',
        required: false,
        description: 'Protocol standard reference'
      },
      {
        name: 'messageFormats',
        type: 'array',
        required: false,
        description: 'Supported message formats'
      }
    ],
    constraints: []
  },

  LogicalMessage: {
    name: 'LogicalMessage',
    description: 'Logical message definition',
    superClass: 'Element',
    properties: [
      {
        name: 'messageType',
        type: 'string',
        required: false,
        description: 'Type of message'
      },
      {
        name: 'messageFormat',
        type: 'string',
        required: false,
        description: 'Message format specification'
      },
      {
        name: 'payload',
        type: 'string',
        required: false,
        description: 'Message payload structure'
      }
    ],
    constraints: []
  },

  LogicalEvent: {
    name: 'LogicalEvent',
    description: 'Logical event that triggers actions',
    superClass: 'Element',
    properties: [
      {
        name: 'eventType',
        type: 'string',
        required: false,
        description: 'Type of event'
      },
      {
        name: 'eventSource',
        type: 'string',
        required: false,
        description: 'Source of the event'
      },
      {
        name: 'triggerConditions',
        type: 'array',
        required: false,
        description: 'Conditions that trigger the event'
      }
    ],
    constraints: []
  },

  LogicalState: {
    name: 'LogicalState',
    description: 'Logical state of a system or component',
    superClass: 'Element',
    properties: [
      {
        name: 'stateType',
        type: 'string',
        required: false,
        description: 'Type of state'
      },
      {
        name: 'initialState',
        type: 'boolean',
        required: false,
        description: 'Whether this is an initial state'
      },
      {
        name: 'finalState',
        type: 'boolean',
        required: false,
        description: 'Whether this is a final state'
      }
    ],
    constraints: []
  },

  LogicalTransition: {
    name: 'LogicalTransition',
    description: 'Logical transition between states',
    superClass: 'Element',
    properties: [
      {
        name: 'transitionType',
        type: 'string',
        required: false,
        description: 'Type of transition'
      },
      {
        name: 'sourceState',
        type: 'string',
        required: false,
        description: 'Source state'
      },
      {
        name: 'targetState',
        type: 'string',
        required: false,
        description: 'Target state'
      },
      {
        name: 'trigger',
        type: 'string',
        required: false,
        description: 'Trigger for the transition'
      },
      {
        name: 'guard',
        type: 'string',
        required: false,
        description: 'Guard condition for the transition'
      }
    ],
    constraints: []
  },

  LogicalCondition: {
    name: 'LogicalCondition',
    description: 'Logical condition that must be satisfied',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'conditionType',
        type: 'string',
        required: false,
        description: 'Type of condition'
      },
      {
        name: 'conditionExpression',
        type: 'string',
        required: false,
        description: 'Condition expression'
      }
    ],
    constraints: []
  },

  LogicalAction: {
    name: 'LogicalAction',
    description: 'Logical action performed in response to events',
    superClass: 'Element',
    properties: [
      {
        name: 'actionType',
        type: 'string',
        required: false,
        description: 'Type of action'
      },
      {
        name: 'actionSequence',
        type: 'string',
        required: false,
        description: 'Sequence of actions'
      },
      {
        name: 'preConditions',
        type: 'array',
        required: false,
        description: 'Pre-conditions for the action'
      },
      {
        name: 'postConditions',
        type: 'array',
        required: false,
        description: 'Post-conditions for the action'
      }
    ],
    constraints: []
  },

  LogicalDecision: {
    name: 'LogicalDecision',
    description: 'Logical decision point in a process',
    superClass: 'Element',
    properties: [
      {
        name: 'decisionType',
        type: 'string',
        required: false,
        description: 'Type of decision'
      },
      {
        name: 'decisionCriteria',
        type: 'array',
        required: false,
        description: 'Criteria for making the decision'
      },
      {
        name: 'alternatives',
        type: 'array',
        required: false,
        description: 'Alternative outcomes'
      }
    ],
    constraints: []
  },

  LogicalMerge: {
    name: 'LogicalMerge',
    description: 'Logical merge point for multiple flows',
    superClass: 'Element',
    properties: [
      {
        name: 'mergeType',
        type: 'string',
        required: false,
        description: 'Type of merge'
      },
      {
        name: 'inputFlows',
        type: 'array',
        required: false,
        description: 'Input flows to be merged'
      },
      {
        name: 'mergeCondition',
        type: 'string',
        required: false,
        description: 'Condition for merging'
      }
    ],
    constraints: []
  },

  LogicalFork: {
    name: 'LogicalFork',
    description: 'Logical fork point for splitting flows',
    superClass: 'Element',
    properties: [
      {
        name: 'forkType',
        type: 'string',
        required: false,
        description: 'Type of fork'
      },
      {
        name: 'inputFlow',
        type: 'string',
        required: false,
        description: 'Input flow to be forked'
      },
      {
        name: 'outputFlows',
        type: 'array',
        required: false,
        description: 'Output flows after forking'
      }
    ],
    constraints: []
  },

  LogicalJoin: {
    name: 'LogicalJoin',
    description: 'Logical join point for synchronizing flows',
    superClass: 'Element',
    properties: [
      {
        name: 'joinType',
        type: 'string',
        required: false,
        description: 'Type of join'
      },
      {
        name: 'inputFlows',
        type: 'array',
        required: false,
        description: 'Input flows to be joined'
      },
      {
        name: 'joinCondition',
        type: 'string',
        required: false,
        description: 'Condition for joining'
      }
    ],
    constraints: []
  },

  LogicalStart: {
    name: 'LogicalStart',
    description: 'Logical start point of a process',
    superClass: 'Element',
    properties: [
      {
        name: 'startType',
        type: 'string',
        required: false,
        description: 'Type of start'
      },
      {
        name: 'trigger',
        type: 'string',
        required: false,
        description: 'Trigger that starts the process'
      }
    ],
    constraints: []
  },

  LogicalEnd: {
    name: 'LogicalEnd',
    description: 'Logical end point of a process',
    superClass: 'Element',
    properties: [
      {
        name: 'endType',
        type: 'string',
        required: false,
        description: 'Type of end'
      },
      {
        name: 'terminationCondition',
        type: 'string',
        required: false,
        description: 'Condition that terminates the process'
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

  // Logical Model Relationships (詳細統合)
  LogicalArchitectureRelationship: {
    name: 'LogicalArchitectureRelationship',
    description: 'Relationship between logical architecture elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of logical architecture relationship'
      }
    ],
    constraints: []
  },

  LogicalActivityRelationship: {
    name: 'LogicalActivityRelationship',
    description: 'Relationship between logical activities',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of activity relationship'
      },
      {
        name: 'sequence',
        type: 'string',
        required: false,
        description: 'Sequence relationship'
      }
    ],
    constraints: []
  },

  LogicalPerformerRelationship: {
    name: 'LogicalPerformerRelationship',
    description: 'Relationship between logical performers',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of performer relationship'
      }
    ],
    constraints: []
  },

  LogicalResourceRelationship: {
    name: 'LogicalResourceRelationship',
    description: 'Relationship between logical resources',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of resource relationship'
      }
    ],
    constraints: []
  },

  LogicalSystemRelationship: {
    name: 'LogicalSystemRelationship',
    description: 'Relationship between logical systems',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of system relationship'
      }
    ],
    constraints: []
  },

  LogicalInterfaceRelationship: {
    name: 'LogicalInterfaceRelationship',
    description: 'Relationship between logical interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of interface relationship'
      }
    ],
    constraints: []
  },

  LogicalNodeRelationship: {
    name: 'LogicalNodeRelationship',
    description: 'Relationship between logical nodes',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of node relationship'
      }
    ],
    constraints: []
  },

  LogicalFlowRelationship: {
    name: 'LogicalFlowRelationship',
    description: 'Relationship between logical flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of flow relationship'
      }
    ],
    constraints: []
  },

  LogicalConstraintRelationship: {
    name: 'LogicalConstraintRelationship',
    description: 'Relationship between logical constraints',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of constraint relationship'
      }
    ],
    constraints: []
  },

  LogicalComponentRelationship: {
    name: 'LogicalComponentRelationship',
    description: 'Relationship between logical components',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of component relationship'
      }
    ],
    constraints: []
  },

  LogicalServiceRelationship: {
    name: 'LogicalServiceRelationship',
    description: 'Relationship between logical services',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of service relationship'
      }
    ],
    constraints: []
  },

  LogicalDataFlowRelationship: {
    name: 'LogicalDataFlowRelationship',
    description: 'Relationship between logical data flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data flow relationship'
      }
    ],
    constraints: []
  },

  LogicalControlFlowRelationship: {
    name: 'LogicalControlFlowRelationship',
    description: 'Relationship between logical control flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of control flow relationship'
      }
    ],
    constraints: []
  },

  LogicalInformationFlowRelationship: {
    name: 'LogicalInformationFlowRelationship',
    description: 'Relationship between logical information flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of information flow relationship'
      }
    ],
    constraints: []
  },

  LogicalPhysicalFlowRelationship: {
    name: 'LogicalPhysicalFlowRelationship',
    description: 'Relationship between logical physical flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of physical flow relationship'
      }
    ],
    constraints: []
  },

  LogicalOperationalActivityRelationship: {
    name: 'LogicalOperationalActivityRelationship',
    description: 'Relationship between logical operational activities',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of operational activity relationship'
      }
    ],
    constraints: []
  },

  LogicalSystemFunctionRelationship: {
    name: 'LogicalSystemFunctionRelationship',
    description: 'Relationship between logical system functions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of system function relationship'
      }
    ],
    constraints: []
  },

  LogicalDataStructureRelationship: {
    name: 'LogicalDataStructureRelationship',
    description: 'Relationship between logical data structures',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data structure relationship'
      }
    ],
    constraints: []
  },

  LogicalBusinessRuleRelationship: {
    name: 'LogicalBusinessRuleRelationship',
    description: 'Relationship between logical business rules',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of business rule relationship'
      }
    ],
    constraints: []
  },

  LogicalPolicyRelationship: {
    name: 'LogicalPolicyRelationship',
    description: 'Relationship between logical policies',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of policy relationship'
      }
    ],
    constraints: []
  },

  LogicalStandardRelationship: {
    name: 'LogicalStandardRelationship',
    description: 'Relationship between logical standards',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of standard relationship'
      }
    ],
    constraints: []
  },

  LogicalRequirementRelationship: {
    name: 'LogicalRequirementRelationship',
    description: 'Relationship between logical requirements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of requirement relationship'
      }
    ],
    constraints: []
  },

  LogicalCapabilityRelationship: {
    name: 'LogicalCapabilityRelationship',
    description: 'Relationship between logical capabilities',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of capability relationship'
      }
    ],
    constraints: []
  },

  LogicalServiceInterfaceRelationship: {
    name: 'LogicalServiceInterfaceRelationship',
    description: 'Relationship between logical service interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of service interface relationship'
      }
    ],
    constraints: []
  },

  LogicalDataInterfaceRelationship: {
    name: 'LogicalDataInterfaceRelationship',
    description: 'Relationship between logical data interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data interface relationship'
      }
    ],
    constraints: []
  },

  LogicalSystemInterfaceRelationship: {
    name: 'LogicalSystemInterfaceRelationship',
    description: 'Relationship between logical system interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of system interface relationship'
      }
    ],
    constraints: []
  },

  LogicalNodeConnectorRelationship: {
    name: 'LogicalNodeConnectorRelationship',
    description: 'Relationship between logical node connectors',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of node connector relationship'
      }
    ],
    constraints: []
  },

  LogicalLinkRelationship: {
    name: 'LogicalLinkRelationship',
    description: 'Relationship between logical links',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of link relationship'
      }
    ],
    constraints: []
  },

  LogicalNetworkRelationship: {
    name: 'LogicalNetworkRelationship',
    description: 'Relationship between logical networks',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of network relationship'
      }
    ],
    constraints: []
  },

  LogicalProtocolRelationship: {
    name: 'LogicalProtocolRelationship',
    description: 'Relationship between logical protocols',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of protocol relationship'
      }
    ],
    constraints: []
  },

  LogicalMessageRelationship: {
    name: 'LogicalMessageRelationship',
    description: 'Relationship between logical messages',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of message relationship'
      }
    ],
    constraints: []
  },

  LogicalEventRelationship: {
    name: 'LogicalEventRelationship',
    description: 'Relationship between logical events',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of event relationship'
      }
    ],
    constraints: []
  },

  LogicalStateRelationship: {
    name: 'LogicalStateRelationship',
    description: 'Relationship between logical states',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of state relationship'
      }
    ],
    constraints: []
  },

  LogicalTransitionRelationship: {
    name: 'LogicalTransitionRelationship',
    description: 'Relationship between logical transitions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of transition relationship'
      }
    ],
    constraints: []
  },

  LogicalConditionRelationship: {
    name: 'LogicalConditionRelationship',
    description: 'Relationship between logical conditions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of condition relationship'
      }
    ],
    constraints: []
  },

  LogicalActionRelationship: {
    name: 'LogicalActionRelationship',
    description: 'Relationship between logical actions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of action relationship'
      }
    ],
    constraints: []
  },

  LogicalDecisionRelationship: {
    name: 'LogicalDecisionRelationship',
    description: 'Relationship between logical decisions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of decision relationship'
      }
    ],
    constraints: []
  },

  LogicalMergeRelationship: {
    name: 'LogicalMergeRelationship',
    description: 'Relationship between logical merges',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of merge relationship'
      }
    ],
    constraints: []
  },

  LogicalForkRelationship: {
    name: 'LogicalForkRelationship',
    description: 'Relationship between logical forks',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of fork relationship'
      }
    ],
    constraints: []
  },

  LogicalJoinRelationship: {
    name: 'LogicalJoinRelationship',
    description: 'Relationship between logical joins',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of join relationship'
      }
    ],
    constraints: []
  },

  LogicalStartRelationship: {
    name: 'LogicalStartRelationship',
    description: 'Relationship between logical starts',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of start relationship'
      }
    ],
    constraints: []
  },

  LogicalEndRelationship: {
    name: 'LogicalEndRelationship',
    description: 'Relationship between logical ends',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of end relationship'
      }
    ],
    constraints: []
  },

  LogicalSequenceFlow: {
    name: 'LogicalSequenceFlow',
    description: 'Sequence flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of sequence flow'
      }
    ],
    constraints: []
  },

  LogicalMessageFlow: {
    name: 'LogicalMessageFlow',
    description: 'Message flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of message flow'
      }
    ],
    constraints: []
  },

  LogicalObjectFlow: {
    name: 'LogicalObjectFlow',
    description: 'Object flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of object flow'
      }
    ],
    constraints: []
  },

  LogicalExceptionFlow: {
    name: 'LogicalExceptionFlow',
    description: 'Exception flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of exception flow'
      }
    ],
    constraints: []
  },

  LogicalCompensationFlow: {
    name: 'LogicalCompensationFlow',
    description: 'Compensation flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of compensation flow'
      }
    ],
    constraints: []
  },

  LogicalCancelFlow: {
    name: 'LogicalCancelFlow',
    description: 'Cancel flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of cancel flow'
      }
    ],
    constraints: []
  },

  LogicalTimerFlow: {
    name: 'LogicalTimerFlow',
    description: 'Timer flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of timer flow'
      }
    ],
    constraints: []
  },

  LogicalSignalFlow: {
    name: 'LogicalSignalFlow',
    description: 'Signal flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of signal flow'
      }
    ],
    constraints: []
  },

  LogicalDataAssociation: {
    name: 'LogicalDataAssociation',
    description: 'Data association between logical elements',
    properties: [
      {
        name: 'associationType',
        type: 'string',
        required: false,
        description: 'Type of data association'
      }
    ],
    constraints: []
  },

  // Data Model Relationships (CDM, LDM, PES統合)
  DataModelRelationship: {
    name: 'DataModelRelationship',
    description: 'Relationship between data model elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data model relationship'
      }
    ],
    constraints: []
  },

  EntityRelationship: {
    name: 'EntityRelationship',
    description: 'Relationship between entities in conceptual data model',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of entity relationship'
      },
      {
        name: 'cardinality',
        type: 'string',
        required: false,
        description: 'Relationship cardinality'
      }
    ],
    constraints: []
  },

  AttributeRelationship: {
    name: 'AttributeRelationship',
    description: 'Relationship between attributes',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of attribute relationship'
      }
    ],
    constraints: []
  },

  TableRelationship: {
    name: 'TableRelationship',
    description: 'Relationship between tables',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of table relationship'
      },
      {
        name: 'joinType',
        type: 'string',
        required: false,
        description: 'Type of join relationship'
      }
    ],
    constraints: []
  },

  ColumnRelationship: {
    name: 'ColumnRelationship',
    description: 'Relationship between columns',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of column relationship'
      }
    ],
    constraints: []
  },

  SchemaRelationship: {
    name: 'SchemaRelationship',
    description: 'Relationship between schemas',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of schema relationship'
      }
    ],
    constraints: []
  },

  KeyRelationship: {
    name: 'KeyRelationship',
    description: 'Relationship between keys',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of key relationship'
      }
    ],
    constraints: []
  },

  ConstraintRelationship: {
    name: 'ConstraintRelationship',
    description: 'Relationship between constraints',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of constraint relationship'
      }
    ],
    constraints: []
  },

  IndexRelationship: {
    name: 'IndexRelationship',
    description: 'Relationship between indexes',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of index relationship'
      }
    ],
    constraints: []
  },

  Inheritance: {
    name: 'Inheritance',
    description: 'Inheritance relationship between entities or classes',
    properties: [
      {
        name: 'inheritanceType',
        type: 'string',
        required: false,
        description: 'Type of inheritance (single, multiple, etc.)'
      },
      {
        name: 'discriminator',
        type: 'string',
        required: false,
        description: 'Discriminator attribute for inheritance'
      }
    ],
    constraints: []
  },

  AssociationEntity: {
    name: 'AssociationEntity',
    description: 'Association relationship between entities',
    properties: [
      {
        name: 'associationType',
        type: 'string',
        required: false,
        description: 'Type of association'
      },
      {
        name: 'cardinality',
        type: 'string',
        required: false,
        description: 'Association cardinality'
      }
    ],
    constraints: []
  },

  AggregationEntity: {
    name: 'AggregationEntity',
    description: 'Aggregation relationship between entities',
    properties: [
      {
        name: 'aggregationType',
        type: 'string',
        required: false,
        description: 'Type of aggregation (shared, composite)'
      }
    ],
    constraints: []
  },

  CompositionEntity: {
    name: 'CompositionEntity',
    description: 'Composition relationship between entities',
    properties: [
      {
        name: 'compositionType',
        type: 'string',
        required: false,
        description: 'Type of composition'
      }
    ],
    constraints: []
  },

  DependencyEntity: {
    name: 'DependencyEntity',
    description: 'Dependency relationship between entities',
    properties: [
      {
        name: 'dependencyType',
        type: 'string',
        required: false,
        description: 'Type of dependency'
      }
    ],
    constraints: []
  },

  GeneralizationEntity: {
    name: 'GeneralizationEntity',
    description: 'Generalization relationship between entities',
    properties: [
      {
        name: 'generalizationType',
        type: 'string',
        required: false,
        description: 'Type of generalization'
      }
    ],
    constraints: []
  },

  RealizationEntity: {
    name: 'RealizationEntity',
    description: 'Realization relationship between entities',
    properties: [
      {
        name: 'realizationType',
        type: 'string',
        required: false,
        description: 'Type of realization'
      }
    ],
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
