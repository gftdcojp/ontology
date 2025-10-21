/**
 * DoDAF 2.0 Standard Meta Model
 * Standard and organizational elements
 */

import type { MetaModelClass } from './meta-model-types';

// Standard Domain Elements
export const STANDARD_METAMODEL: Record<string, MetaModelClass> = {
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

  StandardProfile: {
    name: 'StandardProfile',
    description: 'Profile of standards for a specific domain',
    superClass: 'Element',
    properties: [
      {
        name: 'profileType',
        type: 'string',
        required: false,
        description: 'Type of standard profile'
      },
      {
        name: 'standards',
        type: 'array',
        required: false,
        description: 'Standards included in the profile'
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: 'Domain the profile applies to'
      }
    ],
    constraints: []
  },

  TechnicalStandard: {
    name: 'TechnicalStandard',
    description: 'Technical standard for systems and interfaces',
    superClass: 'Standard',
    properties: [
      {
        name: 'technicalDomain',
        type: 'string',
        required: false,
        description: 'Technical domain of the standard'
      },
      {
        name: 'implementationGuidance',
        type: 'string',
        required: false,
        description: 'Guidance for implementing the standard'
      }
    ],
    constraints: []
  }
};

// Standard relationship types
export const STANDARD_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
  StandardRelationship: {
    name: 'StandardRelationship',
    description: 'Relationship between standards',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of standard relationship'
      }
    ],
    constraints: []
  }
};
