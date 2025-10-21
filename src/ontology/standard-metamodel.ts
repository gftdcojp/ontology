/**
 * DoDAF DM2 Standard Meta Model
 * Standards View (StdV) concepts from DoDAF DM2 ontology
 */

import type { MetaModelClass } from './meta-model-types';

// Standards View (StdV) Elements from DoDAF DM2
export const STANDARD_METAMODEL: Record<string, MetaModelClass> = {
  // Core standard concepts
  Standard: {
    name: 'Standard',
    description: 'A formal agreement documenting generally accepted specifications or criteria for products, processes, procedures, policies, systems, and/or personnel.',
    superClass: 'Rule',
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

  TechnicalStandard: {
    name: 'TechnicalStandard',
    description: 'Technical standards document specific technical methodologies and practices to design and implement.',
    superClass: 'Standard',
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

  FunctionalStandard: {
    name: 'FunctionalStandard',
    description: 'Functional standards set forth rules, conditions, guidelines, and characteristics.',
    superClass: 'Standard',
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

  Agreement: {
    name: 'Agreement',
    description: 'A consent among parties regarding the terms and conditions of activities that said parties participate in.',
    superClass: 'Rule',
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

  Rule: {
    name: 'Rule',
    description: 'A principle or condition that governs behavior; a prescribed guide for conduct or action',
    superClass: 'Guidance',
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
  StandardType: {
    name: 'StandardType',
    description: 'The Powertype of Standard.',
    superClass: 'RuleType',
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

  TechnicalStandardType: {
    name: 'TechnicalStandardType',
    description: 'The Powertype of TechnicalStandard.',
    superClass: 'StandardType',
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

  FunctionalStandardType: {
    name: 'FunctionalStandardType',
    description: 'The Powertype of FunctionalStandard.',
    superClass: 'StandardType',
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

  AgreementType: {
    name: 'AgreementType',
    description: 'The Powertype of Agreement.',
    superClass: 'RuleType',
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

  RuleType: {
    name: 'RuleType',
    description: 'The Powertype of Rule.',
    superClass: 'GuidanceType',
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

  // Additional standard-related concepts that may be needed
  PositionReferenceFrameType: {
    name: 'PositionReferenceFrameType',
    description: 'The Powertype of PositionReferenceFrame.',
    superClass: 'InformationType',
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

