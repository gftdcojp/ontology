import { describe, it, expect } from 'vitest';
import {
  createDoDAFArchitecture,
  validateArchitecture,
  validateArchitectureDetailed,
  exportAsJSONLD,
  addElementToProduct,
  addRelationshipToProduct
} from '../index';
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

  describe('Meta Model Validation', () => {
    it('should validate architecture with meta model compliant elements', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'meta-model-test',
        name: 'Meta Model Test',
        description: 'Test for meta model validation',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      // Add a valid operational activity element
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'activity-1',
          type: 'OperationalActivity',
          name: 'Sample Operational Activity',
          description: 'A sample operational activity for testing',
          properties: {
            priority: 'high',
            estimatedDuration: '2 hours'
          }
        }
      );

      // Add a valid system element
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'system-1',
          type: 'System',
          name: 'Sample System',
          description: 'A sample system for testing',
          properties: {
            systemType: 'software',
            criticality: 'high'
          }
        }
      );

      // Add a valid relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'activity-flow-1',
          type: 'OperationalActivityFlow',
          name: 'Activity Flow Relationship',
          description: 'Flow between operational activities',
          sourceId: 'activity-1',
          targetId: 'activity-1', // Self-reference for testing
          properties: {
            flowType: 'control',
            condition: 'success'
          }
        }
      );

      const result = await validateArchitecture(architecture);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate elements directly against meta model', async () => {
      const { validateElementAgainstMetaModel, DODAF_CORE_METAMODEL } = await import('../ontology/dodaf-metamodel');

      // Test with defined meta model (OperationalActivity)
      const validElement = {
        id: 'test-element',
        type: 'OperationalActivity',
        name: 'Test Activity',
        description: 'A test operational activity',
        properties: { priority: 'high' }
      };

      const validResult = validateElementAgainstMetaModel(validElement);
      expect(validResult.valid).toBe(true);
      expect(validResult.errors).toHaveLength(0);

      // Test with undefined meta model (uses default)
      const unknownElement = {
        id: 'unknown-element',
        type: 'UnknownElementType',
        name: 'Unknown Element',
        description: 'An element with unknown type',
        properties: {}
      };

      const unknownResult = validateElementAgainstMetaModel(unknownElement);
      expect(unknownResult.valid).toBe(true); // Default meta model accepts basic properties

      // Invalid element (missing required name from default meta model)
      const invalidElement = {
        id: 'invalid-element',
        type: 'UnknownElementType',
        description: 'Missing name property',
        properties: {}
      };

      const invalidResult = validateElementAgainstMetaModel(invalidElement);
      expect(invalidResult.valid).toBe(false);
      expect(invalidResult.errors.length).toBeGreaterThan(0);
      expect(invalidResult.errors.some(error => error.includes('Required property \'name\''))).toBe(true);
    });

    it('should provide detailed validation report', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'detailed-validation-test',
        name: 'Detailed Validation Test',
        description: 'Test for detailed validation reporting',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      // Add valid elements
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'activity-1',
          type: 'OperationalActivity',
          name: 'Sample Activity',
          description: 'Sample operational activity',
          properties: {}
        }
      );

      const report = await validateArchitectureDetailed(architecture);

      expect(report.summary.valid).toBe(true);
      expect(report.summary.elementsValidated).toBe(1);
      expect(report.summary.relationshipsValidated).toBe(0);
      expect(report.metaModelValidation.elements).toHaveLength(1);
      expect(report.metaModelValidation.elements[0].valid).toBe(true);
    });

    it('should validate Services Model elements', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'services-model-test',
        name: 'Services Model Test',
        description: 'Test for Services Model validation',
        author: 'Test Author',
        organization: 'Test Organization',
        includeAllViews: true
      });

      // Add Service Description element
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'service-desc-1',
          type: 'ServiceDescription',
          name: 'Sample Service Description',
          description: 'Description of a sample service',
          properties: {
            serviceType: 'REST API',
            serviceLevel: 'Gold'
          }
        }
      );

      // Add Service element
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'service-1',
          type: 'Service',
          name: 'Sample Service',
          description: 'A sample service',
          properties: {
            serviceType: 'web service',
            protocol: 'HTTP/REST'
          }
        }
      );

      // Add Information element
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'info-1',
          type: 'Information',
          name: 'Sample Information',
          description: 'Sample information entity',
          properties: {
            informationType: 'customer data',
            classification: 'internal'
          }
        }
      );

      // Add Service Description relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'service-desc-rel',
          type: 'ServiceDescribedBy',
          name: 'Service Description Relationship',
          description: 'Service described by service description',
          sourceId: 'service-1',
          targetId: 'service-desc-1',
          properties: {
            descriptionType: 'functional'
          }
        }
      );

      const result = await validateArchitecture(architecture);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate complex Services Model relationships', async () => {
      const { validateElementAgainstMetaModel, validateRelationshipAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Service Description element
      const serviceDescValidation = validateElementAgainstMetaModel({
        id: 'service-desc-1',
        type: 'ServiceDescription',
        name: 'Test Service Description',
        description: 'A test service description',
        properties: {
          serviceType: 'SOAP',
          serviceLevel: 'Silver'
        }
      });

      expect(serviceDescValidation.valid).toBe(true);

      // Test Service element
      const serviceValidation = validateElementAgainstMetaModel({
        id: 'service-1',
        type: 'Service',
        name: 'Test Service',
        description: 'A test service',
        properties: {
          serviceType: 'web service',
          protocol: 'SOAP'
        }
      });

      expect(serviceValidation.valid).toBe(true);

      // Test Information element
      const infoValidation = validateElementAgainstMetaModel({
        id: 'info-1',
        type: 'Information',
        name: 'Test Information',
        description: 'Test information',
        properties: {
          informationType: 'metadata',
          classification: 'public'
        }
      });

      expect(infoValidation.valid).toBe(true);

      // Test ServiceDescribedBy relationship
      const relationshipValidation = validateRelationshipAgainstMetaModel({
        id: 'rel-1',
        type: 'ServiceDescribedBy',
        name: 'Service Description Relationship',
        description: 'Service described by description',
        sourceId: 'service-1',
        targetId: 'service-desc-1',
        properties: {
          descriptionType: 'technical'
        }
      });

      expect(relationshipValidation.valid).toBe(true);
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
