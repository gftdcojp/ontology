import { describe, it, expect } from 'vitest';
import { createDoDAFArchitecture, validateArchitecture, exportAsJSONLD } from '../index';
import { DoDAFJSONLDValidator } from '../validation/jsonld-validator';

describe('DoDAF 2.0 Ontology', () => {
  describe('Architecture Creation', () => {
    it('should create a basic DoDAF architecture', () => {
      const architecture = createDoDAFArchitecture({
        id: 'test-architecture',
        name: 'Test Architecture',
        description: 'A test DoDAF architecture',
        author: 'Test Author',
        organization: 'Test Organization'
      });

      expect(architecture.id).toBe('test-architecture');
      expect(architecture.name).toBe('Test Architecture');
      expect(architecture.version).toBe('2.0');
      expect(architecture.views).toHaveLength(0);
      expect(architecture.metadata.author).toBe('Test Author');
    });

    it('should create architecture with all standard views', () => {
      const architecture = createDoDAFArchitecture({
        id: 'test-architecture-full',
        name: 'Test Architecture Full',
        description: 'A test DoDAF architecture with all views',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      expect(architecture.views).toHaveLength(5); // AV, OV, SV, TV, DIV

      // Check that views have correct types
      const viewTypes = architecture.views.map(v => v.type);
      expect(viewTypes).toContain('AV');
      expect(viewTypes).toContain('OV');
      expect(viewTypes).toContain('SV');
      expect(viewTypes).toContain('TV');
      expect(viewTypes).toContain('DIV');

      // Check Operational View products
      const ovView = architecture.views.find(v => v.type === 'OV');
      expect(ovView?.products).toHaveLength(9); // OV-1 through OV-6c

      // Check Systems View products
      const svView = architecture.views.find(v => v.type === 'SV');
      expect(svView?.products).toHaveLength(9); // SV-1 through SV-9
    });
  });

  describe('JSON-LD Validation', () => {
    it('should validate a basic architecture', async () => {
      const architecture = createDoDAFArchitecture({
        id: 'validation-test',
        name: 'Validation Test',
        description: 'Test for JSON-LD validation',
        author: 'Test Author',
        organization: 'Test Organization'
      });

      const result = await validateArchitecture(architecture);

      if (!result.valid) {
        console.log('Validation errors:', result.errors);
      }
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalized).toBeDefined();
    });

    it('should validate architecture with views and products', async () => {
      const architecture = createDoDAFArchitecture({
        id: 'full-validation-test',
        name: 'Full Validation Test',
        description: 'Test for full architecture validation',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      const result = await validateArchitecture(architecture);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for invalid architecture', async () => {
      const invalidArchitecture = {
        '@id': 'invalid',
        name: 'Invalid Architecture'
        // Missing required fields
      };

      const result = await DoDAFJSONLDValidator.validate(invalidArchitecture);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('JSON-LD Export', () => {
    it('should export architecture as valid JSON-LD', () => {
      const architecture = createDoDAFArchitecture({
        id: 'export-test',
        name: 'Export Test',
        description: 'Test for JSON-LD export',
        author: 'Test Author',
        organization: 'Test Organization'
      });

      const jsonld = exportAsJSONLD(architecture);

      expect(typeof jsonld).toBe('string');

      const parsed = JSON.parse(jsonld);
      expect(parsed['@id']).toBe('export-test');
      expect(parsed['@type']).toBe('dodaf:Architecture');
      expect(parsed['@context']).toBeDefined();
    });
  });

  describe('RDF Conversion', () => {
    it('should convert architecture to RDF', async () => {
      const architecture = createDoDAFArchitecture({
        id: 'rdf-test',
        name: 'RDF Test',
        description: 'Test for RDF conversion',
        author: 'Test Author',
        organization: 'Test Organization'
      });

      const rdf = await DoDAFJSONLDValidator.toRDF(architecture);

      expect(rdf).toBeDefined();
      expect(Array.isArray(rdf)).toBe(true);
    });
  });

  describe('Standard Views', () => {
    it('should have correct Operational View products', () => {
      const architecture = createDoDAFArchitecture({
        id: 'ov-test',
        name: 'OV Test',
        description: 'Test Operational View',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      const ovView = architecture.views.find(v => v.type === 'OV');
      expect(ovView).toBeDefined();

      const productNumbers = ovView!.products.map(p => p.number);
      expect(productNumbers).toContain('OV-1');
      expect(productNumbers).toContain('OV-2');
      expect(productNumbers).toContain('OV-5b');
      expect(productNumbers).toContain('OV-6c');
    });

    it('should have correct Systems View products', () => {
      const architecture = createDoDAFArchitecture({
        id: 'sv-test',
        name: 'SV Test',
        description: 'Test Systems View',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      const svView = architecture.views.find(v => v.type === 'SV');
      expect(svView).toBeDefined();

      const productNumbers = svView!.products.map(p => p.number);
      expect(productNumbers).toContain('SV-1');
      expect(productNumbers).toContain('SV-4');
      expect(productNumbers).toContain('SV-8');
    });
  });
});
