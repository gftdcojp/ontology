/**
 * DoDAF 2.0 System Meta Model
 * System domain elements and relationships
 */

import type { MetaModelClass } from './meta-model-types';

// System Domain Elements
export const SYSTEM_METAMODEL: Record<string, MetaModelClass> = {
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
  }
};

// System relationship types
export const SYSTEM_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
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

  SystemFunctionFlow: {
    name: 'SystemFunctionFlow',
    description: 'Flow between system functions',
    properties: [],
    constraints: []
  },

  SystemResourceAssignment: {
    name: 'SystemResourceAssignment',
    description: 'Assignment of resource to system',
    properties: [],
    constraints: []
  },

  SystemResourceFlow: {
    name: 'SystemResourceFlow',
    description: 'Flow of system resources',
    properties: [],
    constraints: []
  },

  SystemNeedline: {
    name: 'SystemNeedline',
    description: 'Needline between system elements',
    properties: [],
    constraints: []
  },

  SystemCapabilityRealization: {
    name: 'SystemCapabilityRealization',
    description: 'System realization of capability',
    properties: [],
    constraints: []
  }
};
