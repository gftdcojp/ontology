/**
 * DoDAF 2.0 Operational Meta Model
 * Operational domain elements and relationships
 */

import type { MetaModelClass } from './meta-model-types';

// Operational Domain Elements
export const OPERATIONAL_METAMODEL: Record<string, MetaModelClass> = {
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
  }
};

// Operational relationship types
export const OPERATIONAL_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
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

  OperationalPerformerAssignment: {
    name: 'OperationalPerformerAssignment',
    description: 'Assignment of performer to activity',
    properties: [],
    constraints: []
  },

  OperationalResourceAssignment: {
    name: 'OperationalResourceAssignment',
    description: 'Assignment of resource to activity',
    properties: [],
    constraints: []
  },

  OperationalEventTrigger: {
    name: 'OperationalEventTrigger',
    description: 'Event trigger for activity',
    properties: [],
    constraints: []
  },

  OperationalNeedline: {
    name: 'OperationalNeedline',
    description: 'Needline between operational elements',
    properties: [],
    constraints: []
  }
};
