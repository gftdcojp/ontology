/**
 * DoDAF 2.0 Infrastructure Meta Model
 * Infrastructure and security elements
 */

import type { MetaModelClass } from './meta-model-types';

// Infrastructure Domain Elements
export const INFRASTRUCTURE_METAMODEL: Record<string, MetaModelClass> = {
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

  Location: {
    name: 'Location',
    description: 'A physical or logical location',
    superClass: 'Element',
    properties: [
      {
        name: 'locationType',
        type: 'string',
        required: false,
        description: 'Type of location'
      },
      {
        name: 'coordinates',
        type: 'string',
        required: false,
        description: 'Geographic coordinates'
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: 'Physical address'
      }
    ],
    constraints: []
  },

  Equipment: {
    name: 'Equipment',
    description: 'Physical equipment or hardware',
    superClass: 'Element',
    properties: [
      {
        name: 'equipmentType',
        type: 'string',
        required: false,
        description: 'Type of equipment'
      },
      {
        name: 'manufacturer',
        type: 'string',
        required: false,
        description: 'Equipment manufacturer'
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: 'Equipment model'
      }
    ],
    constraints: []
  }
};

// Infrastructure relationship types
export const INFRASTRUCTURE_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
  FacilityLocation: {
    name: 'FacilityLocation',
    description: 'Facility location relationship',
    properties: [],
    constraints: []
  },

  EquipmentAssignment: {
    name: 'EquipmentAssignment',
    description: 'Equipment assignment',
    properties: [],
    constraints: []
  },

  LocationHierarchy: {
    name: 'LocationHierarchy',
    description: 'Location hierarchy',
    properties: [],
    constraints: []
  }
};
