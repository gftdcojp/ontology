/**
 * DoDAF 2.0 Data Meta Model
 * Data domain elements and relationships (CDM, LDM, PES)
 */

import type { MetaModelClass } from './meta-model-types';

// Data Domain Elements
export const DATA_METAMODEL: Record<string, MetaModelClass> = {
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
  }
};

// Data relationship types
export const DATA_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
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
  }
};
