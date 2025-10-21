/**
 * DoDAF DM2 Operational Meta Model
 * Operational View (OV) concepts from DoDAF DM2 ontology
 */

import type { MetaModelClass } from './meta-model-types';

// Operational View (OV) Elements from DoDAF DM2
export const OPERATIONAL_METAMODEL: Record<string, MetaModelClass> = {
  // Core operational concepts
  Activity: {
    name: 'Activity',
    description: 'Work, not specific to a single organization, weapon system or individual that transforms inputs (Resources) into outputs (Resources) or changes their state.',
    superClass: 'IndividualType',
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
      }
    ],
    constraints: []
  },

  Capability: {
    name: 'Capability',
    description: 'Capability class',
    superClass: 'IndividualType',
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
      }
    ],
    constraints: []
  },

  Project: {
    name: 'Project',
    description: 'A temporary endeavor undertaken to create Resources or Desired Effects.',
    superClass: 'Individual',
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
      }
    ],
    constraints: []
  },

  Vision: {
    name: 'Vision',
    description: 'An end that describes the future state of the enterprise, without regard to how it is to be achieved; a mental image of what the future will or could be like',
    superClass: 'IndividualType',
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
      }
    ],
    constraints: []
  },

  Condition: {
    name: 'Condition',
    description: 'The state of an environment or situation in which a Performer performs or is disposed to perform.',
    superClass: 'IndividualType',
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
      }
    ],
    constraints: []
  },

  Guidance: {
    name: 'Guidance',
    description: 'An authoritative statement intended to lead or steer the execution of actions.',
    superClass: 'IndividualType',
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
      }
    ],
    constraints: []
  },

  // Activity-related concepts
  SingletonActivity: {
    name: 'SingletonActivity',
    description: 'A set of activities containing only one activity.',
    superClass: 'Activity',
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
      }
    ],
    constraints: []
  },

  IndividualActivity: {
    name: 'IndividualActivity',
    description: 'Activities that are Individuals, i.e., that occur in space and time.',
    superClass: 'Individual',
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
      }
    ],
    constraints: []
  },

  // Type concepts
  ActivityType: {
    name: 'ActivityType',
    description: 'Classes of Activities.',
    superClass: 'IndividualTypeType',
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
      }
    ],
    constraints: []
  },

  CapabilityType: {
    name: 'CapabilityType',
    description: 'Category or type of capability',
    superClass: 'IndividualTypeType',
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
      }
    ],
    constraints: []
  },

  ProjectType: {
    name: 'ProjectType',
    description: 'The powertype of Project',
    superClass: 'IndividualType',
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
      }
    ],
    constraints: []
  },

  ProjectTypeType: {
    name: 'ProjectTypeType',
    description: 'The Powertype of ProjectType.',
    superClass: 'IndividualTypeType',
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
      }
    ],
    constraints: []
  },

  ConditionType: {
    name: 'ConditionType',
    description: 'The Powertype of Condition.',
    superClass: 'IndividualTypeType',
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
      }
    ],
    constraints: []
  },

  GuidanceType: {
    name: 'GuidanceType',
    description: 'The Powertype of Guidance.',
    superClass: 'IndividualTypeType',
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
      }
    ],
    constraints: []
  },

  VisionType: {
    name: 'VisionType',
    description: 'The Powertype of Vision.',
    superClass: 'IndividualTypeType',
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
