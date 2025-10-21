import { Type } from '@sinclair/typebox';

/**
 * DoDAF 2.0 Ontology Schema using TypeBox
 * JSON-LD compatible schema definitions
 */

// Base JSON-LD context type (without actual context definition)
export type DoDAFContextType = {
  '@context': Record<string, any>;
};

// View Types
export const ViewTypeSchema = Type.Union([
  Type.Literal('AV'),
  Type.Literal('OV'),
  Type.Literal('SV'),
  Type.Literal('TV'),
  Type.Literal('DIV')
]);

export const ViewNameSchema = Type.Union([
  Type.Literal('All Views'),
  Type.Literal('Operational View'),
  Type.Literal('Systems View'),
  Type.Literal('Technical Standards View'),
  Type.Literal('Data and Information View')
]);

// Element Metadata Schema
export const ElementMetadataSchema = Type.Object({
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:ElementMetadata'),
  created: Type.String({ format: 'date-time' }),
  modified: Type.String({ format: 'date-time' }),
  author: Type.String(),
  version: Type.String(),
  status: Type.Union([
    Type.Literal('draft'),
    Type.Literal('review'),
    Type.Literal('approved'),
    Type.Literal('deprecated')
  ])
});

// Simplified schemas without circular references for TypeBox compatibility

// Element Schema
export const ElementSchema = Type.Object({
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:Element'),
  productId: Type.String(),
  type: Type.String(),
  name: Type.String(),
  description: Type.String(),
  properties: Type.Record(Type.String(), Type.Any()),
  metadata: Type.Optional(ElementMetadataSchema)
});

// Relationship Schema
export const RelationshipSchema = Type.Object({
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:Relationship'),
  productId: Type.String(),
  type: Type.String(),
  name: Type.String(),
  description: Type.String(),
  sourceId: Type.String(),
  targetId: Type.String(),
  properties: Type.Record(Type.String(), Type.Any())
});

// Product Schema (simplified)
export const ProductSchema = Type.Object({
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:Product'),
  viewId: Type.String(),
  number: Type.String(),
  name: Type.String(),
  description: Type.String(),
  purpose: Type.String(),
  elements: Type.Array(Type.Any()), // Simplified to avoid circular refs
  relationships: Type.Array(Type.Any())
});

// View Schema (simplified)
export const ViewSchema = Type.Object({
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:View'),
  type: ViewTypeSchema,
  name: ViewNameSchema,
  description: Type.String(),
  purpose: Type.String(),
  products: Type.Array(Type.Any()) // Simplified to avoid circular refs
});

// Architecture Metadata Schema
export const ArchitectureMetadataSchema = Type.Object({
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:ArchitectureMetadata'),
  created: Type.String({ format: 'date-time' }),
  modified: Type.String({ format: 'date-time' }),
  author: Type.String(),
  organization: Type.String(),
  classification: Type.String(),
  purpose: Type.String()
});

// Main DoDAF Architecture Schema (simplified)
export const DoDAFArchitectureSchema = Type.Object({
  '@context': Type.Any(),
  '@id': Type.String(),
  '@type': Type.Literal('dodaf:Architecture'),
  name: Type.String(),
  description: Type.String(),
  version: Type.String(),
  views: Type.Array(Type.Any()), // Simplified to avoid circular refs
  metadata: Type.Any()
});

// Export the main schema
export const DoDAFSchema = DoDAFArchitectureSchema;
