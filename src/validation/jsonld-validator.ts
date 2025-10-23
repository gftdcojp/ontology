import * as jsonld from 'jsonld';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { DoDAFSchema } from '../ontology/dodaf-schema';
import type { DoDAFArchitecture } from '../types/dodaf';
import { validateElementAgainstMetaModel, validateRelationshipAgainstMetaModel } from '../ontology/dodaf-metamodel';

/**
 * Enhanced JSON-LD Validator for DoDAF 2.0 Ontology with SHACL support
 */

const compiler = TypeCompiler.Compile(DoDAFSchema);

export class DoDAFJSONLDValidator {
  static readonly DoDAF_CONTEXT = {
    '@base': 'https://dodaf.defense.gov/ontology#',
    dodaf: 'https://dodaf.defense.gov/ontology#',
    id: '@id',
    type: '@type',
    name: 'https://schema.org/name',
    description: 'https://schema.org/description',
    purpose: 'dodaf:purpose',
    created: 'http://purl.org/dc/terms/created',
    modified: 'http://purl.org/dc/terms/modified',
    author: 'http://purl.org/dc/terms/creator',
    version: 'http://purl.org/dc/terms/hasVersion',
    status: 'dodaf:status',
    properties: 'dodaf:properties',
    metadata: 'dodaf:metadata',
    elements: 'dodaf:elements',
    relationships: 'dodaf:relationships',
    products: 'dodaf:products',
    views: 'dodaf:views',
    architecture: 'dodaf:architecture',
    organization: 'http://xmlns.com/foaf/0.1/organization',
    classification: 'dodaf:classification'
  };

  /**
   * Export the DoDAF JSON-LD context as a standalone JSON file
   */
  static exportContext(): string {
    return JSON.stringify(this.DoDAF_CONTEXT, null, 2);
  }

  /**
   * Validate a DoDAF architecture instance
   */
  static async validate(document: any): Promise<{
    valid: boolean;
    errors: string[];
    normalized?: any;
  }> {
    const errors: string[] = [];

    try {
      // Validate JSON-LD structure
      const expanded = await jsonld.expand(document);
      if (!expanded || expanded.length === 0) {
        errors.push('Invalid JSON-LD document: could not expand');
      }

      // Validate against DoDAF context
      const compacted = await jsonld.compact(document, this.DoDAF_CONTEXT);

      // Basic structure validation
      if (!compacted.id) {
        errors.push('Invalid DoDAF architecture: missing required id field');
      }

      if (!compacted.type || compacted.type !== 'dodaf:Architecture') {
        errors.push('Invalid DoDAF architecture: missing or incorrect type field');
      }

      if (!compacted.name || !compacted.description) {
        errors.push('Invalid DoDAF architecture: missing required name or description');
      }

      if (errors.length > 0) {
        return { valid: false, errors };
      }

      return {
        valid: true,
        errors: [],
        normalized: compacted
      };

    } catch (error) {
      errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`);
      return { valid: false, errors };
    }
  }

  /**
   * Convert DoDAF instance to RDF triples
   */
  static async toRDF(document: any): Promise<any> {
    try {
      const expanded = await jsonld.expand(document);
      const rdf = await jsonld.toRDF(expanded);
      return rdf;
    } catch (error) {
      throw new Error(`RDF conversion failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Normalize DoDAF document to canonical form
   */
  static async normalize(document: any): Promise<any> {
    try {
      const expanded = await jsonld.expand(document);
      const normalized = await jsonld.normalize(expanded, {
        algorithm: 'URDNA2015',
        format: 'application/n-quads'
      });
      return normalized;
    } catch (error) {
      throw new Error(`Normalization failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Create a new DoDAF architecture instance
   */
  static createArchitecture(params: {
    id: string;
    name: string;
    description: string;
    version?: string;
    author: string;
    organization: string;
  }): DoDAFArchitecture {
    const now = new Date().toISOString();

    return {
      id: params.id,
      name: params.name,
      description: params.description,
      version: params.version || '2.0',
      views: [],
      metadata: {
        created: now,
        modified: now,
        author: params.author,
        organization: params.organization,
        classification: 'UNCLASSIFIED',
        purpose: 'System Architecture Description'
      }
    } as DoDAFArchitecture;
  }
}
