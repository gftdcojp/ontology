/**
 * DoDAF 2.0 Ontology TypeBox + JSON-LD Implementation
 *
 * This library provides TypeScript types and validation for DoDAF 2.0 architecture descriptions
 * using TypeBox for runtime type checking and JSON-LD for semantic web compatibility.
 */

// Export types
export type {
  ViewType,
  ViewName,
  View,
  Product,
  Element,
  ElementMetadata,
  Relationship,
  DoDAFArchitecture,
  ArchitectureMetadata
} from './types/dodaf';

// Export schemas
export {
  DoDAFSchema,
  ViewTypeSchema,
  ViewNameSchema,
  ElementSchema,
  RelationshipSchema,
  ProductSchema,
  ViewSchema,
  DoDAFArchitectureSchema,
  ElementMetadataSchema,
  ArchitectureMetadataSchema,
  DoDAFContext
} from './ontology/dodaf-schema';

// Export validator
import { DoDAFJSONLDValidator } from './validation/jsonld-validator';
export { DoDAFJSONLDValidator };

// Export standard views and products
export {
  DODAF_VIEWS,
  AV_PRODUCTS,
  OV_PRODUCTS,
  SV_PRODUCTS,
  TV_PRODUCTS,
  DIV_PRODUCTS,
  getProductsForView
} from './ontology/dodaf-views';

// Export utilities
export {
  createDoDAFArchitecture,
  validateArchitecture,
  exportAsJSONLD
} from './utils/builder';

/**
 * Create a new DoDAF architecture instance
 * @param params Architecture parameters
 * @returns New DoDAF architecture instance
 */
export function createArchitecture(params: {
  id: string;
  name: string;
  description: string;
  version?: string;
  author: string;
  organization: string;
}) {
  return DoDAFJSONLDValidator.createArchitecture(params);
}
