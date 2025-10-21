/**
 * DoDAF 2.0 Security Meta Model
 * Security and information assurance elements
 */

import type { MetaModelClass } from './meta-model-types';

// Security Domain Elements
export const SECURITY_METAMODEL: Record<string, MetaModelClass> = {
  SecurityAttribute: {
    name: 'SecurityAttribute',
    description: 'A security attribute or classification',
    superClass: 'Element',
    properties: [
      {
        name: 'classification',
        type: 'string',
        required: false,
        description: 'Security classification level'
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Security category'
      }
    ],
    constraints: []
  },

  SecurityControl: {
    name: 'SecurityControl',
    description: 'A security control or mechanism',
    superClass: 'Element',
    properties: [
      {
        name: 'controlType',
        type: 'string',
        required: false,
        description: 'Type of security control'
      },
      {
        name: 'controlFamily',
        type: 'string',
        required: false,
        description: 'Family of security controls'
      },
      {
        name: 'implementationGuidance',
        type: 'string',
        required: false,
        description: 'Guidance for implementing the control'
      }
    ],
    constraints: []
  },

  InformationAssuranceRequirement: {
    name: 'InformationAssuranceRequirement',
    description: 'Requirement for information assurance',
    superClass: 'Element',
    properties: [
      {
        name: 'requirementType',
        type: 'string',
        required: false,
        description: 'Type of assurance requirement'
      },
      {
        name: 'assuranceLevel',
        type: 'string',
        required: false,
        description: 'Level of assurance required'
      },
      {
        name: 'verificationMethod',
        type: 'string',
        required: false,
        description: 'Method for verifying compliance'
      }
    ],
    constraints: []
  }
};

// Security relationship types
export const SECURITY_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
  SecurityControlImplementation: {
    name: 'SecurityControlImplementation',
    description: 'Security control implementation',
    properties: [],
    constraints: []
  },

  SecurityAttributeAssignment: {
    name: 'SecurityAttributeAssignment',
    description: 'Security attribute assignment',
    properties: [],
    constraints: []
  }
};
