/**
 * SHACL Validation for TypeBox + RDF Schemas
 *
 * Validates JSON-LD documents against SHACL shapes generated from
 * semantically-enhanced TypeBox schemas.
 */

import * as jsonld from 'jsonld';
import { Parser, Store, DataFactory } from 'n3';
// @ts-ignore - rdf-validate-shacl has no type definitions
import { ShaclValidator } from 'rdf-validate-shacl';
import type { SemanticSchema } from '../dsl';
import { generateDodafShaclTurtle } from '../generators/shacl';

/**
 * SHACL validation result
 */
export interface ShaclValidationResult {
  /** Whether the document conforms to the SHACL shapes */
  conforms: boolean;
  /** Validation results (violations) */
  results: ShaclValidationError[];
  /** Validation report as RDF dataset */
  report?: any;
}

/**
 * Individual SHACL validation error
 */
export interface ShaclValidationError {
  /** The node that failed validation */
  focusNode?: string;
  /** The property that failed */
  path?: string;
  /** The constraint that was violated */
  constraint?: string;
  /** Human-readable error message */
  message: string;
  /** Severity level */
  severity: 'error' | 'warning' | 'info';
  /** Source shape that caused the violation */
  sourceShape?: string;
}

/**
 * SHACL Validator class for DoDAF ontologies
 */
export class DoDAFSHACLValidator {
  private validator: ShaclValidator;
  private shapesStore: Store;

  /**
   * Create a validator from semantic schemas
   *
   * @param schemas - Array of semantic TypeBox schemas
   */
  constructor(schemas: SemanticSchema[]) {
    const shaclTurtle = generateDodafShaclTurtle(schemas);
    this.shapesStore = new Store(new Parser({ format: 'text/turtle' }).parse(shaclTurtle));
    this.validator = new ShaclValidator(this.shapesStore);
  }

  /**
   * Create a validator from pre-generated SHACL Turtle
   *
   * @param shaclTurtle - SHACL shapes as Turtle string
   */
  static fromTurtle(shaclTurtle: string): DoDAFSHACLValidator {
    const instance = new DoDAFSHACLValidator([]);
    instance.shapesStore = new Store(new Parser({ format: 'text/turtle' }).parse(shaclTurtle));
    instance.validator = new ShaclValidator(instance.shapesStore);
    return instance;
  }

  /**
   * Validate a JSON-LD document against SHACL shapes
   *
   * @param jsonldDoc - JSON-LD document to validate
   * @param options - Validation options
   * @returns Validation result
   */
  async validate(
    jsonldDoc: any,
    options: { expandContext?: boolean } = {}
  ): Promise<ShaclValidationResult> {
    try {
      // Convert JSON-LD to N-Quads
      const rdfResult = await jsonld.toRDF(jsonldDoc, {
        format: 'application/n-quads'
      });

      // Extract N-Quads string from result
      const nquads = typeof rdfResult === 'string' ? rdfResult : rdfResult.toString();

      // Parse N-Quads into RDF store
      const dataStore = new Store(new Parser({ format: 'N-Quads' }).parse(nquads));

      // Validate against SHACL shapes
      const report = await this.validator.validate(dataStore);

      // Convert report to our result format
      const results: ShaclValidationError[] = report.results.map((result: any) => ({
        focusNode: result.focusNode?.value,
        path: result.path?.value,
        constraint: result.constraint?.value,
        message: result.message.map((msg: any) => msg.value).join('; ') || 'Validation failed',
        severity: this.mapSeverity(result.severity?.value),
        sourceShape: result.sourceShape?.value,
      }));

      return {
        conforms: report.conforms,
        results,
        report
      };
    } catch (error) {
      return {
        conforms: false,
        results: [{
          message: `SHACL validation error: ${error}`,
          severity: 'error'
        }]
      };
    }
  }

  /**
   * Validate JSON-LD string against SHACL shapes
   *
   * @param jsonldString - JSON-LD document as string
   * @param options - Validation options
   * @returns Validation result
   */
  async validateString(
    jsonldString: string,
    options: { expandContext?: boolean } = {}
  ): Promise<ShaclValidationResult> {
    try {
      const jsonldDoc = JSON.parse(jsonldString);
      return this.validate(jsonldDoc, options);
    } catch (error) {
      return {
        conforms: false,
        results: [{
          message: `Invalid JSON-LD: ${error}`,
          severity: 'error'
        }]
      };
    }
  }

  /**
   * Get the SHACL shapes as Turtle string
   *
   * @returns SHACL shapes in Turtle format
   */
  getShapesTurtle(): string {
    const writer = new (require('n3')).Writer({ prefixes: {} });
    let result = '';
    writer.end((error: any, turtle: string) => {
      if (error) throw error;
      result = turtle;
    });

    // Add all quads from the shapes store
    for (const quad of this.shapesStore) {
      writer.addQuad(quad);
    }

    return result;
  }

  /**
   * Map SHACL severity IRI to our severity enum
   */
  private mapSeverity(severityIri?: string): 'error' | 'warning' | 'info' {
    if (!severityIri) return 'error';

    if (severityIri.includes('Violation')) return 'error';
    if (severityIri.includes('Warning')) return 'warning';
    if (severityIri.includes('Info')) return 'info';

    return 'error';
  }
}

/**
 * Standalone validation function for convenience
 *
 * @param jsonldDoc - JSON-LD document to validate
 * @param schemas - Semantic schemas to generate shapes from
 * @param options - Validation options
 * @returns Validation result
 */
export async function validateWithSHACL(
  jsonldDoc: any,
  schemas: SemanticSchema[],
  options: { expandContext?: boolean } = {}
): Promise<ShaclValidationResult> {
  const validator = new DoDAFSHACLValidator(schemas);
  return validator.validate(jsonldDoc, options);
}

/**
 * Validate JSON-LD string with pre-generated SHACL Turtle
 *
 * @param jsonldString - JSON-LD document as string
 * @param shaclTurtle - SHACL shapes as Turtle string
 * @param options - Validation options
 * @returns Validation result
 */
export async function validateStringWithSHACL(
  jsonldString: string,
  shaclTurtle: string,
  options: { expandContext?: boolean } = {}
): Promise<ShaclValidationResult> {
  const validator = DoDAFSHACLValidator.fromTurtle(shaclTurtle);
  return validator.validateString(jsonldString, options);
}

/**
 * Validate and report detailed results
 *
 * @param result - SHACL validation result
 * @returns Formatted report
 */
export function formatValidationReport(result: ShaclValidationResult): string {
  if (result.conforms) {
    return '✅ Validation successful: Document conforms to SHACL shapes';
  }

  let report = '❌ Validation failed: Document does not conform to SHACL shapes\n\n';
  report += `Found ${result.results.length} violation(s):\n\n`;

  for (let i = 0; i < result.results.length; i++) {
    const error = result.results[i];
    report += `${i + 1}. ${error.severity.toUpperCase()}: ${error.message}\n`;

    if (error.focusNode) {
      report += `   Focus Node: ${error.focusNode}\n`;
    }

    if (error.path) {
      report += `   Path: ${error.path}\n`;
    }

    if (error.sourceShape) {
      report += `   Source Shape: ${error.sourceShape}\n`;
    }

    report += '\n';
  }

  return report;
}

/**
 * Validate SHACL shapes syntax
 *
 * @param shaclTurtle - SHACL shapes as Turtle string
 * @returns Validation result
 */
export function validateShaclSyntax(shaclTurtle: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    const parser = new Parser({ format: 'text/turtle' });
    parser.parse(shaclTurtle);
  } catch (error) {
    errors.push(`SHACL syntax error: ${error}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
