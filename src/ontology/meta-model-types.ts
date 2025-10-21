/**
 * DoDAF 2.0 Meta Model Types
 * Common types used across all meta model modules
 */

export interface MetaModelClass {
  name: string;
  description: string;
  superClass?: string;
  properties: MetaModelProperty[];
  constraints: MetaModelConstraint[];
}

export interface MetaModelProperty {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'date' | 'reference' | 'array';
  required: boolean;
  description: string;
  constraints?: MetaModelConstraint[];
}

export interface MetaModelConstraint {
  type: 'cardinality' | 'valueRange' | 'pattern' | 'reference' | 'custom';
  description: string;
  parameters?: Record<string, any>;
}

// Re-export from types/dodaf.ts
export type { ElementType, RelationshipType } from '../types/dodaf';
