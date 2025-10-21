/**
 * DoDAF 2.0 Core Meta Model
 * Core architecture elements
 */

import type { ElementType, RelationshipType } from '../types/dodaf';
import type { MetaModelClass } from './meta-model-types';

// Core Architecture Elements
export const CORE_METAMODEL: Record<string, MetaModelClass> = {
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
  }
};

// Core relationship types
export const CORE_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
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

  Composition: {
    name: 'Composition',
    description: 'Strong whole-part relationship',
    properties: [],
    constraints: []
  },

  Generalization: {
    name: 'Generalization',
    description: 'Inheritance relationship',
    properties: [],
    constraints: []
  },

  Dependency: {
    name: 'Dependency',
    description: 'Dependency relationship',
    properties: [],
    constraints: []
  },

  Realization: {
    name: 'Realization',
    description: 'Realization relationship',
    properties: [],
    constraints: []
  }
};
