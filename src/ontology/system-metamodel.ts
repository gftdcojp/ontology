/**
 * DoDAF DM2 System Meta Model
 * Systems View (SV) concepts from DoDAF DM2 ontology
 */

import type { MetaModelClass } from './meta-model-types';

// Systems View (SV) Elements from DoDAF DM2
export const SYSTEM_METAMODEL: Record<string, MetaModelClass> = {
  // Core system concepts
  System: {
    name: 'System',
    description: 'A functionally, physically, and/or behaviorally related group of regularly interacting or interdependent elements.',
    superClass: 'Performer',
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

  Service: {
    name: 'Service',
    description: 'Service class',
    superClass: 'Performer',
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

  Performer: {
    name: 'Performer',
    description: 'Any entity - human, automated, or any aggregation of human and/or automated - that performs an activity and provides a capability.',
    superClass: 'Resource',
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

  Resource: {
    name: 'Resource',
    description: 'Data, Information, Performers, Materiel, or Personnel Types that are produced or consumed.',
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

  Materiel: {
    name: 'Materiel',
    description: 'Equipment, apparatus or supplies that are of interest, without distinction as to its application for administrative or combat purposes.',
    superClass: 'Resource',
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

  Port: {
    name: 'Port',
    description: 'An interface (performer) provided by a Performer that is disposed to perform production or consumption of resources external to the Performer.',
    superClass: 'Performer',
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

  // Service-specific concepts
  ServicePort: {
    name: 'ServicePort',
    description: 'A part of a Performer that specifics a interaction component through which the Performer interacts with other Performers.  This isolates dependencies between performers to particular interaction points rather than to the performer as a whole.',
    superClass: 'Port',
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

  ServiceDescription: {
    name: 'ServiceDescription',
    description: 'Information necessary to interact with the service in such terms as the service inputs, outputs, and associated semantics. The service description also conveys what is accomplished when the service is invoked and the conditions for using the service.',
    superClass: 'ArchitecturalDescription',
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

  // Individual resources
  IndividualResource: {
    name: 'IndividualResource',
    description: 'Any specific physical or virtual entity of limited availability',
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

  IndividualPerformer: {
    name: 'IndividualPerformer',
    description: 'A specific thing that can perform an action',
    superClass: 'IndividualResource',
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

  // Singleton concepts
  SingletonResource: {
    name: 'SingletonResource',
    description: 'A set of resources containing only one resource',
    superClass: 'SingletonIndividualType',
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

  SingletonIndividualType: {
    name: 'SingletonIndividualType',
    description: 'A set of individuals containing only one individual.',
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

  // Type concepts
  SystemType: {
    name: 'SystemType',
    description: 'The Powertype of System.',
    superClass: 'PerformerType',
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

  ServiceType: {
    name: 'ServiceType',
    description: 'The Powertype of Service.',
    superClass: 'PerformerType',
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

  PerformerType: {
    name: 'PerformerType',
    description: 'Types of Performers, taken from the powerset over individual Performers.',
    superClass: 'ResourceType',
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

  ResourceType: {
    name: 'ResourceType',
    description: 'The Powertype of Resource.',
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

  MaterielType: {
    name: 'MaterielType',
    description: 'The Powertype of Materiel.',
    superClass: 'ResourceType',
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

  PortType: {
    name: 'PortType',
    description: 'The Powertype of Port.',
    superClass: 'PerformerType',
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

  ServicePortType: {
    name: 'ServicePortType',
    description: 'The Powertype of ServicePort.',
    superClass: 'PortType',
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

  ServiceDescriptionType: {
    name: 'ServiceDescriptionType',
    description: 'The Powertype of ServiceDescription.',
    superClass: 'ArchitecturalDescriptionType',
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
