import { DoDAFJSONLDValidator } from '../validation/jsonld-validator';
import { DODAF_VIEWS, getProductsForView } from '../ontology/dodaf-views';
import { validateElementAgainstMetaModel, validateRelationshipAgainstMetaModel } from '../ontology/dodaf-metamodel';
import type { DoDAFArchitecture, View, Product, Element, Relationship } from '../types/dodaf';

/**
 * DoDAF Architecture Builder Utilities
 */

/**
 * Create a complete DoDAF architecture with all standard views
 */
export function createDoDAFArchitecture(params: {
  id: string;
  name: string;
  description: string;
  version?: string;
  author: string;
  organization: string;
  includeAllViews?: boolean;
}): DoDAFArchitecture {
  const baseArchitecture = DoDAFJSONLDValidator.createArchitecture(params);

  if (params.includeAllViews) {
    // Add all standard views with their products
    baseArchitecture.views = DODAF_VIEWS.map((viewDef, index) => ({
      id: `${params.id}/view/${viewDef.type}`,
      type: viewDef.type,
      name: viewDef.name,
      description: viewDef.description,
      purpose: viewDef.purpose,
      products: getProductsForView(viewDef.type).map((productDef, productIndex) => ({
        id: `${params.id}/view/${viewDef.type}/product/${productDef.number}`,
        viewId: `${params.id}/view/${viewDef.type}`,
        number: productDef.number,
        name: productDef.name,
        description: productDef.description,
        purpose: productDef.purpose,
        elements: [],
        relationships: []
      }))
    }));
  }

  return baseArchitecture;
}

/**
 * Add a view to an existing architecture
 */
export function addViewToArchitecture(
  architecture: DoDAFArchitecture,
  viewType: string,
  customProducts?: Omit<Product, 'id' | 'viewId'>[]
): DoDAFArchitecture {
  const viewDef = DODAF_VIEWS.find(v => v.type === viewType);
  if (!viewDef) {
    throw new Error(`Unknown view type: ${viewType}`);
  }

  const products: Product[] = customProducts ?
    customProducts.map((product, index) => ({
      id: `${architecture.id}/view/${viewType}/product/${product.number}`,
      viewId: `${architecture.id}/view/${viewType}`,
      elements: [],
      relationships: [],
      ...product
    })) :
    getProductsForView(viewType).map((productDef, index) => ({
      id: `${architecture.id}/view/${viewType}/product/${productDef.number}`,
      viewId: `${architecture.id}/view/${viewType}`,
      number: productDef.number,
      name: productDef.name,
      description: productDef.description,
      purpose: productDef.purpose,
      elements: [],
      relationships: []
    }));

  const newView: View = {
    id: `${architecture.id}/view/${viewType}`,
    type: viewType as any,
    name: viewDef.name,
    description: viewDef.description,
    purpose: viewDef.purpose,
    products
  };

  return {
    ...architecture,
    views: [...architecture.views, newView]
  };
}

/**
 * Add a product to a view
 */
export function addProductToView(
  architecture: DoDAFArchitecture,
  viewId: string,
  product: Omit<Product, 'id' | 'viewId'>
): DoDAFArchitecture {
  return {
    ...architecture,
    views: architecture.views.map(view =>
      view.id === viewId
        ? {
            ...view,
            products: [...view.products, {
              id: `${viewId}/product/${product.number}`,
              viewId,
              elements: [],
              relationships: [],
              ...product
            }]
          }
        : view
    )
  };
}

/**
 * Add an element to a product
 */
export function addElementToProduct(
  architecture: DoDAFArchitecture,
  productId: string,
  element: Omit<Element, 'productId'>
): DoDAFArchitecture {
  return {
    ...architecture,
    views: architecture.views.map(view => ({
      ...view,
      products: view.products.map(product =>
        product.id === productId
          ? {
              ...product,
              elements: [...product.elements, {
                ...element,
                productId
              }]
            }
          : product
      )
    }))
  };
}

/**
 * Add a relationship to a product
 */
export function addRelationshipToProduct(
  architecture: DoDAFArchitecture,
  productId: string,
  relationship: Omit<Relationship, 'productId'>
): DoDAFArchitecture {
  return {
    ...architecture,
    views: architecture.views.map(view => ({
      ...view,
      products: view.products.map(product =>
        product.id === productId
          ? {
              ...product,
              relationships: [...product.relationships, {
                ...relationship,
                productId
              }]
            }
          : product
      )
    }))
  };
}

/**
 * Validate the entire architecture including meta model compliance
 */
export async function validateArchitecture(architecture: DoDAFArchitecture) {
  const errors: string[] = [];

  // Validate elements against meta model
  for (const view of architecture.views) {
    for (const product of view.products) {
      for (const element of product.elements) {
        const elementValidation = validateElementAgainstMetaModel(element);
        if (!elementValidation.valid) {
          errors.push(...elementValidation.errors.map(err =>
            `Element ${element.id} in ${product.number}: ${err}`
          ));
        }
      }

      for (const relationship of product.relationships) {
        const relationshipValidation = validateRelationshipAgainstMetaModel(relationship);
        if (!relationshipValidation.valid) {
          errors.push(...relationshipValidation.errors.map(err =>
            `Relationship ${relationship.id} in ${product.number}: ${err}`
          ));
        }
      }
    }
  }

  // If meta model validation passes, perform JSON-LD validation
  if (errors.length === 0) {
    try {
      // Convert to JSON-LD format for validation
      const jsonldString = exportAsJSONLD(architecture);
      const jsonldObject = JSON.parse(jsonldString);
      const jsonldResult = await DoDAFJSONLDValidator.validate(jsonldObject);

      if (!jsonldResult.valid) {
        errors.push(...jsonldResult.errors);
        return { valid: false, errors };
      }

      return {
        valid: true,
        errors: [],
        normalized: jsonldResult.normalized
      };
    } catch (error) {
      errors.push(`JSON-LD validation error: ${error instanceof Error ? error.message : String(error)}`);
      return { valid: false, errors };
    }
  }

  return { valid: false, errors };
}

/**
 * Validate architecture with detailed reporting
 */
export async function validateArchitectureDetailed(architecture: DoDAFArchitecture) {
  const result = await validateArchitecture(architecture);

  const report = {
    summary: {
      valid: result.valid,
      totalErrors: result.errors.length,
      elementsValidated: 0,
      relationshipsValidated: 0
    },
    errors: result.errors,
    metaModelValidation: {
      elements: [] as Array<{ id: string; type: string; valid: boolean; errors: string[] }>,
      relationships: [] as Array<{ id: string; type: string; valid: boolean; errors: string[] }>
    },
    jsonLdValidation: {
      valid: result.valid && result.errors.length === 0,
      normalized: result.normalized
    }
  };

  // Collect detailed validation results
  for (const view of architecture.views) {
    for (const product of view.products) {
      for (const element of product.elements) {
        report.summary.elementsValidated++;
        const elementValidation = validateElementAgainstMetaModel(element);
        report.metaModelValidation.elements.push({
          id: element.id,
          type: element.type,
          valid: elementValidation.valid,
          errors: elementValidation.errors
        });
      }

      for (const relationship of product.relationships) {
        report.summary.relationshipsValidated++;
        const relationshipValidation = validateRelationshipAgainstMetaModel(relationship);
        report.metaModelValidation.relationships.push({
          id: relationship.id,
          type: relationship.type,
          valid: relationshipValidation.valid,
          errors: relationshipValidation.errors
        });
      }
    }
  }

  return report;
}

/**
 * Export architecture as JSON-LD
 */
export function exportAsJSONLD(architecture: DoDAFArchitecture): string {
  // Convert TypeScript object to JSON-LD format
  const jsonldArchitecture = {
    '@context': DoDAFJSONLDValidator['DoDAF_CONTEXT'],
    '@id': architecture.id,
    '@type': 'dodaf:Architecture',
    name: architecture.name,
    description: architecture.description,
    version: architecture.version,
    views: architecture.views.map(view => ({
      '@id': view.id,
      '@type': 'dodaf:View',
      type: view.type,
      name: view.name,
      description: view.description,
      purpose: view.purpose,
      products: view.products.map(product => ({
        '@id': product.id,
        '@type': 'dodaf:Product',
        viewId: product.viewId,
        number: product.number,
        name: product.name,
        description: product.description,
        purpose: product.purpose,
        elements: product.elements.map(element => ({
          '@id': element.id,
          '@type': 'dodaf:Element',
          productId: element.productId,
          type: element.type,
          name: element.name,
          description: element.description,
          properties: element.properties,
          metadata: element.metadata
        })),
        relationships: product.relationships.map(relationship => ({
          '@id': relationship.id,
          '@type': 'dodaf:Relationship',
          productId: relationship.productId,
          type: relationship.type,
          name: relationship.name,
          description: relationship.description,
          sourceId: relationship.sourceId,
          targetId: relationship.targetId,
          properties: relationship.properties
        }))
      }))
    })),
    metadata: {
      '@id': `${architecture.id}/metadata`,
      '@type': 'dodaf:ArchitectureMetadata',
      created: architecture.metadata.created,
      modified: architecture.metadata.modified,
      author: architecture.metadata.author,
      organization: architecture.metadata.organization,
      classification: architecture.metadata.classification,
      purpose: architecture.metadata.purpose
    }
  };

  return JSON.stringify(jsonldArchitecture, null, 2);
}
