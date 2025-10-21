/**
 * DoDAF 2.0 Organizational Meta Model
 * Organizational and infrastructure elements
 */

import type { MetaModelClass } from './meta-model-types';

// Organizational Domain Elements
export const ORGANIZATIONAL_METAMODEL: Record<string, MetaModelClass> = {
  Organization: {
    name: 'Organization',
    description: 'An organizational entity',
    superClass: 'Element',
    properties: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Type of organization'
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: 'Parent organization'
      }
    ],
    constraints: []
  },

  OrganizationalUnit: {
    name: 'OrganizationalUnit',
    description: 'A unit within an organization',
    superClass: 'Element',
    properties: [
      {
        name: 'unitType',
        type: 'string',
        required: false,
        description: 'Type of organizational unit'
      },
      {
        name: 'parentOrganization',
        type: 'string',
        required: false,
        description: 'Parent organization'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions performed by the unit'
      }
    ],
    constraints: []
  },

  Person: {
    name: 'Person',
    description: 'A person in the organization',
    superClass: 'Element',
    properties: [
      {
        name: 'role',
        type: 'string',
        required: false,
        description: 'Role of the person'
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: 'Organization the person belongs to'
      },
      {
        name: 'contactInformation',
        type: 'string',
        required: false,
        description: 'Contact information'
      }
    ],
    constraints: []
  },

  Capability: {
    name: 'Capability',
    description: 'A capability provided by the organization',
    superClass: 'Element',
    properties: [
      {
        name: 'capabilityType',
        type: 'string',
        required: false,
        description: 'Type of capability'
      },
      {
        name: 'maturityLevel',
        type: 'string',
        required: false,
        description: 'Maturity level of the capability'
      },
      {
        name: 'supportingSystems',
        type: 'array',
        required: false,
        description: 'Systems that support this capability'
      }
    ],
    constraints: []
  }
};

// Organizational relationship types
export const ORGANIZATIONAL_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
  OrganizationalHierarchy: {
    name: 'OrganizationalHierarchy',
    description: 'Organizational hierarchy',
    properties: [],
    constraints: []
  },

  OrganizationalReporting: {
    name: 'OrganizationalReporting',
    description: 'Reporting relationship',
    properties: [],
    constraints: []
  },

  CapabilityOwnership: {
    name: 'CapabilityOwnership',
    description: 'Capability ownership',
    properties: [],
    constraints: []
  },

  PersonAssignment: {
    name: 'PersonAssignment',
    description: 'Person assignment',
    properties: [],
    constraints: []
  }
};
