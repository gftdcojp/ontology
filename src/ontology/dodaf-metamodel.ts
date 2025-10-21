/**
 * DoDAF 2.0 Meta Model Index
 * Unified access to all DoDAF 2.0 meta model definitions
 */

import type { MetaModelClass, MetaModelProperty, MetaModelConstraint } from './meta-model-types';
import type { ElementType, RelationshipType } from '../types/dodaf';

export type { MetaModelClass, MetaModelProperty, MetaModelConstraint };
export type { ElementType, RelationshipType };

// Import all meta model modules
import { CORE_METAMODEL, CORE_RELATIONSHIP_METAMODEL } from './core-metamodel';
import { OPERATIONAL_METAMODEL, OPERATIONAL_RELATIONSHIP_METAMODEL } from './operational-metamodel';
import { SYSTEM_METAMODEL, SYSTEM_RELATIONSHIP_METAMODEL } from './system-metamodel';
import { DATA_METAMODEL, DATA_RELATIONSHIP_METAMODEL } from './data-metamodel';
import { SERVICE_METAMODEL, SERVICE_RELATIONSHIP_METAMODEL } from './service-metamodel';
import { LOGICAL_METAMODEL, LOGICAL_RELATIONSHIP_METAMODEL } from './logical-metamodel';
import { STANDARD_METAMODEL, STANDARD_RELATIONSHIP_METAMODEL } from './standard-metamodel';
import { ORGANIZATIONAL_METAMODEL, ORGANIZATIONAL_RELATIONSHIP_METAMODEL } from './organizational-metamodel';
import { INFRASTRUCTURE_METAMODEL, INFRASTRUCTURE_RELATIONSHIP_METAMODEL } from './infrastructure-metamodel';
import { SECURITY_METAMODEL, SECURITY_RELATIONSHIP_METAMODEL } from './security-metamodel';
import { DM2_PRINCIPAL_METAMODEL, DM2_SUPPORTING_METAMODEL, DM2_RELATIONSHIP_METAMODEL } from './dm2-metamodel';

// Unified DoDAF 2.0 Meta Model - Import all modules
export const DODAF_CORE_METAMODEL: Partial<Record<ElementType, MetaModelClass>> = {
  ...CORE_METAMODEL,
  ...OPERATIONAL_METAMODEL,
  ...SYSTEM_METAMODEL,
  ...DATA_METAMODEL,
  ...SERVICE_METAMODEL,
  ...LOGICAL_METAMODEL,
  ...STANDARD_METAMODEL,
  ...ORGANIZATIONAL_METAMODEL,
  ...INFRASTRUCTURE_METAMODEL,
  ...SECURITY_METAMODEL,
  // DM2 Data Groups
  ...DM2_PRINCIPAL_METAMODEL,
  ...DM2_SUPPORTING_METAMODEL
};

export const DODAF_RELATIONSHIP_METAMODEL: Partial<Record<RelationshipType, MetaModelClass>> = {
  ...CORE_RELATIONSHIP_METAMODEL,
  ...OPERATIONAL_RELATIONSHIP_METAMODEL,
  ...SYSTEM_RELATIONSHIP_METAMODEL,
  ...DATA_RELATIONSHIP_METAMODEL,
  ...SERVICE_RELATIONSHIP_METAMODEL,
  ...LOGICAL_RELATIONSHIP_METAMODEL,
  ...STANDARD_RELATIONSHIP_METAMODEL,
  ...ORGANIZATIONAL_RELATIONSHIP_METAMODEL,
  ...INFRASTRUCTURE_RELATIONSHIP_METAMODEL,
  ...SECURITY_RELATIONSHIP_METAMODEL,
  // DM2 Data Groups Relationships
  ...DM2_RELATIONSHIP_METAMODEL
};

// Helper functions for meta model validation
export function getElementMetaModel(elementType: ElementType): MetaModelClass | undefined {
  return DODAF_CORE_METAMODEL[elementType];
}

export function getRelationshipMetaModel(relationshipType: RelationshipType): MetaModelClass | undefined {
  return DODAF_RELATIONSHIP_METAMODEL[relationshipType];
}

// Create a default meta model class for undefined types
function createDefaultMetaModel(name: string, type: string): MetaModelClass {
  return {
    name,
    description: `A ${type} element in the DoDAF meta model`,
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
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: 'Description'
      },
      {
        name: 'properties',
        type: 'reference',
        required: false,
        description: 'Additional properties'
      }
    ],
    constraints: []
  };
}

export function validateElementAgainstMetaModel(element: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  let metaModel = getElementMetaModel(element.type);

  if (!metaModel) {
    // For unknown types, create a default meta model with basic validation
    metaModel = createDefaultMetaModel(element.type, 'element');
  }

  // Validate required properties
  for (const prop of metaModel.properties) {
    if (prop.required && !(prop.name in element)) {
      errors.push(`Required property '${prop.name}' is missing for element type '${element.type}'`);
    }
  }

  // Validate constraints
  for (const constraint of metaModel.constraints) {
    // Add constraint validation logic here as needed
  }

  return { valid: errors.length === 0, errors };
}

export function validateRelationshipAgainstMetaModel(relationship: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  let metaModel = getRelationshipMetaModel(relationship.type);

  if (!metaModel) {
    // For unknown types, create a default meta model with basic validation
    metaModel = createDefaultMetaModel(relationship.type, 'relationship');
  }

  // Validate required properties
  for (const prop of metaModel.properties) {
    if (prop.required && !(prop.name in relationship)) {
      errors.push(`Required property '${prop.name}' is missing for relationship type '${relationship.type}'`);
    }
  }

  return { valid: errors.length === 0, errors };
}
