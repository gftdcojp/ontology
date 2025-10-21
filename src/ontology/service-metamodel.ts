/**
 * DoDAF 2.0 Service Meta Model
 * Service domain elements and relationships
 */

import type { MetaModelClass } from './meta-model-types';

// Service Domain Elements
export const SERVICE_METAMODEL: Record<string, MetaModelClass> = {
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

// Service relationship types
export const SERVICE_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
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
  }
};
