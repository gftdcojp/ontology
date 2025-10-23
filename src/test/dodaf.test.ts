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

  describe('SHACL Validation', () => {
    it('should validate architecture with SHACL', async () => {
      const architecture = createDoDAFArchitecture({
        id: 'shacl-test',
        name: 'SHACL Test',
        description: 'Test for SHACL validation',
        author: 'Test Author',
        organization: 'Test Organization'
      });

      // Convert to JSON-LD format first
      const jsonldString = exportAsJSONLD(architecture);
      const jsonldObject = JSON.parse(jsonldString);

      const result = await DoDAFJSONLDValidator.validate(jsonldObject, {
        includeShaclValidation: true
      });


      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.shaclResult).toBeDefined();
      expect(typeof result.shaclResult!.conforms).toBe('boolean');
      expect(result.shaclResult!.conforms).toBe(true);
    });

    it('should fail SHACL validation for invalid architecture', async () => {
      const invalidArchitecture = {
        '@id': 'invalid',
        '@type': 'dodaf:Architecture',
        'https://schema.org/name': 'Invalid Architecture'
        // Missing required description field
      };

      const result = await DoDAFJSONLDValidator.validate(invalidArchitecture, {
        includeShaclValidation: true
      });

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      // SHACL validation is not executed when basic JSON-LD validation fails
      // This is expected behavior to avoid running SHACL on malformed data
      expect(result.shaclResult).toBeUndefined();
    });

    it('should validate complex architecture with elements and relationships', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'complex-shacl-test',
        name: 'Complex SHACL Test',
        description: 'Test for SHACL validation with complex architecture',
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

      // Add valid relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'relationship-1',
          type: 'OperationalActivityFlow',
          name: 'Activity Flow',
          description: 'Flow between activities',
          sourceId: 'activity-1',
          targetId: 'activity-1',
          properties: {}
        }
      );

      // Convert to JSON-LD format first
      const jsonldString = exportAsJSONLD(architecture);
      const jsonldObject = JSON.parse(jsonldString);

      const result = await DoDAFJSONLDValidator.validate(jsonldObject, {
        includeShaclValidation: true
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.shaclResult).toBeDefined();
      expect(typeof result.shaclResult!.conforms).toBe('boolean');
      expect(result.shaclResult!.conforms).toBe(true);
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

    it('should validate Data Model elements (CDM, LDM, PES)', async () => {
      const { validateElementAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Conceptual Data Model
      const cdmValidation = validateElementAgainstMetaModel({
        id: 'cdm-1',
        type: 'ConceptualDataModel',
        name: 'Customer Conceptual Model',
        description: 'Conceptual model for customer data',
        properties: {
          modelType: 'CDM',
          entities: ['customer', 'order'],
          relationships: ['customer-order']
        }
      });

      expect(cdmValidation.valid).toBe(true);

      // Test Logical Data Model
      const ldmValidation = validateElementAgainstMetaModel({
        id: 'ldm-1',
        type: 'LogicalDataModel',
        name: 'Customer Logical Model',
        description: 'Logical model for customer data',
        properties: {
          modelType: 'LDM',
          tables: ['customers', 'orders'],
          views: ['customer_orders']
        }
      });

      expect(ldmValidation.valid).toBe(true);

      // Test Physical Data Model
      const pdmValidation = validateElementAgainstMetaModel({
        id: 'pdm-1',
        type: 'PhysicalDataModel',
        name: 'Customer Physical Model',
        description: 'Physical model for customer data',
        properties: {
          modelType: 'PES',
          databaseType: 'PostgreSQL',
          tables: ['customers', 'orders'],
          indexes: ['idx_customer_email']
        }
      });

      expect(pdmValidation.valid).toBe(true);

      // Test Entity
      const entityValidation = validateElementAgainstMetaModel({
        id: 'entity-1',
        type: 'Entity',
        name: 'Customer',
        description: 'Customer entity',
        properties: {
          entityType: 'master',
          attributes: ['customer_id', 'name', 'email'],
          keys: ['primary_key']
        }
      });

      expect(entityValidation.valid).toBe(true);

      // Test Attribute
      const attributeValidation = validateElementAgainstMetaModel({
        id: 'attr-1',
        type: 'Attribute',
        name: 'Customer Name',
        description: 'Customer name attribute',
        properties: {
          dataType: 'VARCHAR',
          length: 100,
          nullable: false,
          defaultValue: ''
        }
      });

      expect(attributeValidation.valid).toBe(true);

      // Test Table
      const tableValidation = validateElementAgainstMetaModel({
        id: 'table-1',
        type: 'Table',
        name: 'Customers',
        description: 'Customer table',
        properties: {
          tableType: 'base',
          columns: ['customer_id', 'name', 'email'],
          keys: ['primary_key', 'unique_email'],
          indexes: ['idx_name']
        }
      });

      expect(tableValidation.valid).toBe(true);

      // Test Column
      const columnValidation = validateElementAgainstMetaModel({
        id: 'col-1',
        type: 'Column',
        name: 'Customer ID',
        description: 'Customer ID column',
        properties: {
          table: 'customers',
          position: 1,
          dataType: 'INTEGER',
          nullable: false
        }
      });

      expect(columnValidation.valid).toBe(true);

      // Test Relationship Entity
      const relEntityValidation = validateElementAgainstMetaModel({
        id: 'rel-entity-1',
        type: 'RelationshipEntity',
        name: 'Customer Order',
        description: 'Relationship between customer and order',
        properties: {
          relationshipType: '1:N',
          cardinality: 'one-to-many'
        }
      });

      expect(relEntityValidation.valid).toBe(true);
    });

    it('should validate Data Model relationships', async () => {
      const { validateRelationshipAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Entity Relationship
      const entityRelValidation = validateRelationshipAgainstMetaModel({
        id: 'entity-rel-1',
        type: 'EntityRelationship',
        name: 'Customer Order Relationship',
        description: 'Relationship between customer and order entities',
        sourceId: 'customer-entity',
        targetId: 'order-entity',
        properties: {
          relationshipType: '1:N',
          cardinality: 'one-to-many'
        }
      });

      expect(entityRelValidation.valid).toBe(true);

      // Test Table Relationship
      const tableRelValidation = validateRelationshipAgainstMetaModel({
        id: 'table-rel-1',
        type: 'TableRelationship',
        name: 'Customer Order Table Relationship',
        description: 'Relationship between customer and order tables',
        sourceId: 'customers-table',
        targetId: 'orders-table',
        properties: {
          relationshipType: 'foreign_key',
          joinType: 'inner'
        }
      });

      expect(tableRelValidation.valid).toBe(true);

      // Test Inheritance
      const inheritanceValidation = validateRelationshipAgainstMetaModel({
        id: 'inheritance-1',
        type: 'Inheritance',
        name: 'Person Customer Inheritance',
        description: 'Inheritance from person to customer',
        sourceId: 'customer-entity',
        targetId: 'person-entity',
        properties: {
          inheritanceType: 'single',
          discriminator: 'person_type'
        }
      });

      expect(inheritanceValidation.valid).toBe(true);

      // Test Association Entity
      const associationValidation = validateRelationshipAgainstMetaModel({
        id: 'association-1',
        type: 'AssociationEntity',
        name: 'Customer Address Association',
        description: 'Association between customer and address',
        sourceId: 'customer-entity',
        targetId: 'address-entity',
        properties: {
          associationType: 'optional',
          cardinality: '1:1'
        }
      });

      expect(associationValidation.valid).toBe(true);
    });

    it('should validate complex Data Model architecture', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'data-model-architecture',
        name: 'Data Model Architecture',
        description: 'Architecture demonstrating CDM, LDM, PES integration',
        author: 'Data Architect',
        organization: 'Enterprise',
        includeAllViews: true
      });

      // Add Conceptual Data Model
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-1`,
        {
          id: 'cdm-model',
          type: 'ConceptualDataModel',
          name: 'Enterprise Conceptual Model',
          description: 'Enterprise-wide conceptual data model',
          properties: {
            modelType: 'CDM',
            entities: ['customer', 'order', 'product'],
            relationships: ['customer-order', 'order-product']
          }
        }
      );

      // Add Entity
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-1`,
        {
          id: 'customer-entity',
          type: 'Entity',
          name: 'Customer',
          description: 'Customer business entity',
          properties: {
            entityType: 'master',
            attributes: ['customerId', 'name', 'email'],
            keys: ['customerId']
          }
        }
      );

      // Add Logical Data Model
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-2`,
        {
          id: 'ldm-model',
          type: 'LogicalDataModel',
          name: 'Enterprise Logical Model',
          description: 'Enterprise-wide logical data model',
          properties: {
            modelType: 'LDM',
            tables: ['customers', 'orders', 'products'],
            views: ['customer_orders']
          }
        }
      );

      // Add Table
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-2`,
        {
          id: 'customers-table',
          type: 'Table',
          name: 'Customers',
          description: 'Customer table',
          properties: {
            tableType: 'base',
            columns: ['customer_id', 'name', 'email'],
            keys: ['primary_key']
          }
        }
      );

      // Add Physical Data Model
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-3`,
        {
          id: 'pdm-model',
          type: 'PhysicalDataModel',
          name: 'Enterprise Physical Model',
          description: 'Enterprise-wide physical data model',
          properties: {
            modelType: 'PES',
            databaseType: 'PostgreSQL',
            tables: ['customers', 'orders'],
            indexes: ['idx_customer_email', 'idx_order_date']
          }
        }
      );

      // Add Entity Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-1`,
        {
          id: 'customer-order-rel',
          type: 'EntityRelationship',
          name: 'Customer Order Relationship',
          description: 'Relationship between customer and order entities',
          sourceId: 'customer-entity',
          targetId: 'order-entity',
          properties: {
            relationshipType: '1:N',
            cardinality: 'one-to-many'
          }
        }
      );

      // Add Table Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/DIV/product/DIV-2`,
        {
          id: 'customer-order-table-rel',
          type: 'TableRelationship',
          name: 'Customer Order Table Relationship',
          description: 'Relationship between customer and order tables',
          sourceId: 'customers-table',
          targetId: 'orders-table',
          properties: {
            relationshipType: 'foreign_key',
            joinType: 'inner'
          }
        }
      );

      const result = await validateArchitecture(architecture);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate Logical Model elements', async () => {
      const { validateElementAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Logical Architecture
      const logicalArchValidation = validateElementAgainstMetaModel({
        id: 'logical-arch-1',
        type: 'LogicalArchitecture',
        name: 'Enterprise Logical Architecture',
        description: 'Logical architecture for enterprise',
        properties: {
          architectureType: 'SOA',
          components: ['service-1', 'service-2'],
          interfaces: ['interface-1'],
          flows: ['flow-1']
        }
      });

      expect(logicalArchValidation.valid).toBe(true);

      // Test Logical Activity
      const logicalActivityValidation = validateElementAgainstMetaModel({
        id: 'logical-activity-1',
        type: 'LogicalActivity',
        name: 'Process Order',
        description: 'Logical activity for processing orders',
        properties: {
          activityType: 'business',
          inputs: ['order'],
          outputs: ['processed_order'],
          performer: 'order_service'
        }
      });

      expect(logicalActivityValidation.valid).toBe(true);

      // Test Logical System
      const logicalSystemValidation = validateElementAgainstMetaModel({
        id: 'logical-system-1',
        type: 'LogicalSystem',
        name: 'Order Management System',
        description: 'Logical system for order management',
        properties: {
          systemType: 'application',
          components: ['order_component'],
          interfaces: ['order_interface'],
          functions: ['process_order', 'validate_order']
        }
      });

      expect(logicalSystemValidation.valid).toBe(true);

      // Test Logical Interface
      const logicalInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-interface-1',
        type: 'LogicalInterface',
        name: 'Order Processing Interface',
        description: 'Interface for order processing',
        properties: {
          interfaceType: 'service',
          protocol: 'REST',
          operations: ['create_order', 'update_order'],
          dataTypes: ['Order', 'OrderResponse']
        }
      });

      expect(logicalInterfaceValidation.valid).toBe(true);

      // Test Logical Flow
      const logicalFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-flow-1',
        type: 'LogicalFlow',
        name: 'Order Data Flow',
        description: 'Flow of order data',
        properties: {
          flowType: 'data',
          source: 'input_service',
          target: 'order_service',
          content: 'order_data'
        }
      });

      expect(logicalFlowValidation.valid).toBe(true);

      // Test Logical Component
      const logicalComponentValidation = validateElementAgainstMetaModel({
        id: 'logical-component-1',
        type: 'LogicalComponent',
        name: 'Order Processor',
        description: 'Component for processing orders',
        properties: {
          componentType: 'business_logic',
          interfaces: ['order_interface'],
          functions: ['process_order'],
          dependencies: ['validation_component']
        }
      });

      expect(logicalComponentValidation.valid).toBe(true);

      // Test Logical Service
      const logicalServiceValidation = validateElementAgainstMetaModel({
        id: 'logical-service-1',
        type: 'LogicalService',
        name: 'Order Service',
        description: 'Service for order management',
        properties: {
          serviceType: 'business',
          serviceLevel: 'gold',
          operations: ['create', 'update', 'delete'],
          contracts: ['sla_gold']
        }
      });

      expect(logicalServiceValidation.valid).toBe(true);

      // Test Logical Data Flow
      const logicalDataFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-data-flow-1',
        type: 'LogicalDataFlow',
        name: 'Customer Data Flow',
        description: 'Flow of customer data',
        properties: {
          dataType: 'customer',
          dataFormat: 'JSON',
          dataSize: '1KB'
        }
      });

      expect(logicalDataFlowValidation.valid).toBe(true);

      // Test Logical Control Flow
      const logicalControlFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-control-flow-1',
        type: 'LogicalControlFlow',
        name: 'Order Validation Control',
        description: 'Control flow for order validation',
        properties: {
          controlType: 'sequential',
          triggerCondition: 'order_received'
        }
      });

      expect(logicalControlFlowValidation.valid).toBe(true);

      // Test Logical Information Flow
      const logicalInfoFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-info-flow-1',
        type: 'LogicalInformationFlow',
        name: 'Order Status Information',
        description: 'Information flow for order status',
        properties: {
          informationType: 'status',
          informationCategory: 'order',
          securityClassification: 'internal'
        }
      });

      expect(logicalInfoFlowValidation.valid).toBe(true);

      // Test Logical Operational Activity
      const logicalOpActivityValidation = validateElementAgainstMetaModel({
        id: 'logical-op-activity-1',
        type: 'LogicalOperationalActivity',
        name: 'Customer Service',
        description: 'Operational activity for customer service',
        properties: {
          businessProcess: 'customer_management',
          lane: 'customer_service',
          milestone: false
        }
      });

      expect(logicalOpActivityValidation.valid).toBe(true);

      // Test Logical System Function
      const logicalSysFunctionValidation = validateElementAgainstMetaModel({
        id: 'logical-sys-function-1',
        type: 'LogicalSystemFunction',
        name: 'Order Validation Function',
        description: 'Function for validating orders',
        properties: {
          functionType: 'validation',
          inputs: ['order'],
          outputs: ['valid_order'],
          performanceRequirements: ['response_time_100ms']
        }
      });

      expect(logicalSysFunctionValidation.valid).toBe(true);

      // Test Logical Node
      const logicalNodeValidation = validateElementAgainstMetaModel({
        id: 'logical-node-1',
        type: 'LogicalNode',
        name: 'Application Server',
        description: 'Logical node for application hosting',
        properties: {
          nodeType: 'server',
          location: 'data_center_1',
          components: ['order_service'],
          connectors: ['network_connector']
        }
      });

      expect(logicalNodeValidation.valid).toBe(true);

      // Test Logical Constraint
      const logicalConstraintValidation = validateElementAgainstMetaModel({
        id: 'logical-constraint-1',
        type: 'LogicalConstraint',
        name: 'Order Processing Time',
        description: 'Constraint on order processing time',
        properties: {
          constraintType: 'performance',
          expression: 'processing_time <= 100ms',
          scope: 'order_service',
          severity: 'critical'
        }
      });

      expect(logicalConstraintValidation.valid).toBe(true);

      // Test Logical Business Rule
      const logicalBusinessRuleValidation = validateElementAgainstMetaModel({
        id: 'logical-business-rule-1',
        type: 'LogicalBusinessRule',
        name: 'Order Validation Rule',
        description: 'Business rule for order validation',
        properties: {
          ruleType: 'validation',
          ruleCategory: 'business',
          enforcementLevel: 'mandatory'
        }
      });

      expect(logicalBusinessRuleValidation.valid).toBe(true);

      // Test Logical Policy
      const logicalPolicyValidation = validateElementAgainstMetaModel({
        id: 'logical-policy-1',
        type: 'LogicalPolicy',
        name: 'Data Retention Policy',
        description: 'Policy for data retention',
        properties: {
          policyType: 'data_management',
          policyDomain: 'enterprise',
          enforcementMechanism: 'automated'
        }
      });

      expect(logicalPolicyValidation.valid).toBe(true);

      // Test Logical Requirement
      const logicalRequirementValidation = validateElementAgainstMetaModel({
        id: 'logical-requirement-1',
        type: 'LogicalRequirement',
        name: 'System Availability',
        description: 'Requirement for system availability',
        properties: {
          requirementType: 'non_functional',
          priority: 'high',
          verificationMethod: 'monitoring'
        }
      });

      expect(logicalRequirementValidation.valid).toBe(true);

      // Test Logical Capability
      const logicalCapabilityValidation = validateElementAgainstMetaModel({
        id: 'logical-capability-1',
        type: 'LogicalCapability',
        name: 'Order Processing Capability',
        description: 'Capability for processing orders',
        properties: {
          capabilityType: 'business',
          capabilityLevel: 'advanced',
          functions: ['process_order', 'validate_order']
        }
      });

      expect(logicalCapabilityValidation.valid).toBe(true);

      // Test Logical Service Interface
      const logicalServiceInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-service-interface-1',
        type: 'LogicalServiceInterface',
        name: 'Order Service Interface',
        description: 'Interface for order service',
        properties: {
          serviceContract: 'order_contract',
          serviceLevel: 'gold'
        }
      });

      expect(logicalServiceInterfaceValidation.valid).toBe(true);

      // Test Logical Data Interface
      const logicalDataInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-data-interface-1',
        type: 'LogicalDataInterface',
        name: 'Customer Data Interface',
        description: 'Interface for customer data',
        properties: {
          dataFormat: 'JSON',
          dataSchema: 'customer_schema'
        }
      });

      expect(logicalDataInterfaceValidation.valid).toBe(true);

      // Test Logical System Interface
      const logicalSystemInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-system-interface-1',
        type: 'LogicalSystemInterface',
        name: 'Order System Interface',
        description: 'Interface for order system',
        properties: {
          systemProtocol: 'SOAP',
          systemStandard: 'WS-I'
        }
      });

      expect(logicalSystemInterfaceValidation.valid).toBe(true);

      // Test Logical Network
      const logicalNetworkValidation = validateElementAgainstMetaModel({
        id: 'logical-network-1',
        type: 'LogicalNetwork',
        name: 'Enterprise Network',
        description: 'Logical network for enterprise',
        properties: {
          networkType: 'enterprise',
          topology: 'hierarchical',
          nodes: ['server_1', 'server_2'],
          links: ['link_1', 'link_2']
        }
      });

      expect(logicalNetworkValidation.valid).toBe(true);

      // Test Logical Protocol
      const logicalProtocolValidation = validateElementAgainstMetaModel({
        id: 'logical-protocol-1',
        type: 'LogicalProtocol',
        name: 'REST Protocol',
        description: 'REST protocol definition',
        properties: {
          protocolType: 'application',
          protocolStandard: 'REST',
          messageFormats: ['JSON', 'XML']
        }
      });

      expect(logicalProtocolValidation.valid).toBe(true);

      // Test Logical Message
      const logicalMessageValidation = validateElementAgainstMetaModel({
        id: 'logical-message-1',
        type: 'LogicalMessage',
        name: 'Order Request Message',
        description: 'Message for order requests',
        properties: {
          messageType: 'request',
          messageFormat: 'JSON',
          payload: 'order_data'
        }
      });

      expect(logicalMessageValidation.valid).toBe(true);

      // Test Logical Event
      const logicalEventValidation = validateElementAgainstMetaModel({
        id: 'logical-event-1',
        type: 'LogicalEvent',
        name: 'Order Received Event',
        description: 'Event when order is received',
        properties: {
          eventType: 'business',
          eventSource: 'order_service',
          triggerConditions: ['order_submitted']
        }
      });

      expect(logicalEventValidation.valid).toBe(true);

      // Test Logical State
      const logicalStateValidation = validateElementAgainstMetaModel({
        id: 'logical-state-1',
        type: 'LogicalState',
        name: 'Order Processing State',
        description: 'State for order processing',
        properties: {
          stateType: 'process',
          initialState: false,
          finalState: false
        }
      });

      expect(logicalStateValidation.valid).toBe(true);

      // Test Logical Transition
      const logicalTransitionValidation = validateElementAgainstMetaModel({
        id: 'logical-transition-1',
        type: 'LogicalTransition',
        name: 'Order to Processing',
        description: 'Transition from order to processing',
        properties: {
          transitionType: 'automatic',
          sourceState: 'order_received',
          targetState: 'processing',
          trigger: 'order_validated',
          guard: 'payment_confirmed'
        }
      });

      expect(logicalTransitionValidation.valid).toBe(true);

      // Test Logical Condition
      const logicalConditionValidation = validateElementAgainstMetaModel({
        id: 'logical-condition-1',
        type: 'LogicalCondition',
        name: 'Payment Valid Condition',
        description: 'Condition for payment validation',
        properties: {
          conditionType: 'business',
          conditionExpression: 'payment_amount > 0'
        }
      });

      expect(logicalConditionValidation.valid).toBe(true);

      // Test Logical Action
      const logicalActionValidation = validateElementAgainstMetaModel({
        id: 'logical-action-1',
        type: 'LogicalAction',
        name: 'Process Payment Action',
        description: 'Action for processing payment',
        properties: {
          actionType: 'business',
          actionSequence: 'validate_payment',
          preConditions: ['payment_received'],
          postConditions: ['payment_processed']
        }
      });

      expect(logicalActionValidation.valid).toBe(true);

      // Test Logical Decision
      const logicalDecisionValidation = validateElementAgainstMetaModel({
        id: 'logical-decision-1',
        type: 'LogicalDecision',
        name: 'Payment Method Decision',
        description: 'Decision for payment method',
        properties: {
          decisionType: 'business',
          decisionCriteria: ['payment_amount', 'customer_credit'],
          alternatives: ['credit_card', 'bank_transfer']
        }
      });

      expect(logicalDecisionValidation.valid).toBe(true);

      // Test Logical Merge
      const logicalMergeValidation = validateElementAgainstMetaModel({
        id: 'logical-merge-1',
        type: 'LogicalMerge',
        name: 'Order Processing Merge',
        description: 'Merge point for order processing',
        properties: {
          mergeType: 'synchronization',
          inputFlows: ['validation_flow', 'payment_flow'],
          mergeCondition: 'all_completed'
        }
      });

      expect(logicalMergeValidation.valid).toBe(true);

      // Test Logical Fork
      const logicalForkValidation = validateElementAgainstMetaModel({
        id: 'logical-fork-1',
        type: 'LogicalFork',
        name: 'Order Processing Fork',
        description: 'Fork point for order processing',
        properties: {
          forkType: 'parallel',
          inputFlow: 'order_received',
          outputFlows: ['validation_flow', 'payment_flow']
        }
      });

      expect(logicalForkValidation.valid).toBe(true);

      // Test Logical Join
      const logicalJoinValidation = validateElementAgainstMetaModel({
        id: 'logical-join-1',
        type: 'LogicalJoin',
        name: 'Order Processing Join',
        description: 'Join point for order processing',
        properties: {
          joinType: 'synchronization',
          inputFlows: ['validation_flow', 'payment_flow'],
          joinCondition: 'all_completed'
        }
      });

      expect(logicalJoinValidation.valid).toBe(true);

      // Test Logical Start
      const logicalStartValidation = validateElementAgainstMetaModel({
        id: 'logical-start-1',
        type: 'LogicalStart',
        name: 'Order Process Start',
        description: 'Start of order process',
        properties: {
          startType: 'trigger',
          trigger: 'order_received'
        }
      });

      expect(logicalStartValidation.valid).toBe(true);

      // Test Logical End
      const logicalEndValidation = validateElementAgainstMetaModel({
        id: 'logical-end-1',
        type: 'LogicalEnd',
        name: 'Order Process End',
        description: 'End of order process',
        properties: {
          endType: 'completion',
          terminationCondition: 'order_shipped'
        }
      });

      expect(logicalEndValidation.valid).toBe(true);
    });

    it('should validate Logical Model relationships', async () => {
      const { validateRelationshipAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Logical Activity Relationship
      const logicalActivityRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-activity-rel-1',
        type: 'LogicalActivityRelationship',
        name: 'Order Processing Sequence',
        description: 'Sequence relationship between activities',
        sourceId: 'receive_order',
        targetId: 'validate_order',
        properties: {
          relationshipType: 'sequence',
          sequence: '1'
        }
      });

      expect(logicalActivityRelValidation.valid).toBe(true);

      // Test Logical System Relationship
      const logicalSystemRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-system-rel-1',
        type: 'LogicalSystemRelationship',
        name: 'System Dependency',
        description: 'Dependency between systems',
        sourceId: 'order_system',
        targetId: 'inventory_system',
        properties: {
          relationshipType: 'dependency'
        }
      });

      expect(logicalSystemRelValidation.valid).toBe(true);

      // Test Logical Flow Relationship
      const logicalFlowRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-flow-rel-1',
        type: 'LogicalFlowRelationship',
        name: 'Data Flow Connection',
        description: 'Connection between data flows',
        sourceId: 'input_flow',
        targetId: 'output_flow',
        properties: {
          relationshipType: 'connection'
        }
      });

      expect(logicalFlowRelValidation.valid).toBe(true);

      // Test Logical Architecture Relationship
      const logicalArchRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-arch-rel-1',
        type: 'LogicalArchitectureRelationship',
        name: 'Architecture Layer',
        description: 'Layer relationship in architecture',
        sourceId: 'business_layer',
        targetId: 'application_layer',
        properties: {
          relationshipType: 'layer'
        }
      });

      expect(logicalArchRelValidation.valid).toBe(true);

      // Test Logical Sequence Flow
      const logicalSequenceFlowValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-sequence-flow-1',
        type: 'LogicalSequenceFlow',
        name: 'Process Sequence',
        description: 'Sequence flow in process',
        sourceId: 'activity_1',
        targetId: 'activity_2',
        properties: {
          flowType: 'sequential'
        }
      });

      expect(logicalSequenceFlowValidation.valid).toBe(true);

      // Test Logical Message Flow
      const logicalMessageFlowValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-message-flow-1',
        type: 'LogicalMessageFlow',
        name: 'Service Message',
        description: 'Message flow between services',
        sourceId: 'service_1',
        targetId: 'service_2',
        properties: {
          flowType: 'request_response'
        }
      });

      expect(logicalMessageFlowValidation.valid).toBe(true);

      // Test Logical Data Association
      const logicalDataAssociationValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-data-assoc-1',
        type: 'LogicalDataAssociation',
        name: 'Data Association',
        description: 'Association between data elements',
        sourceId: 'customer_data',
        targetId: 'order_data',
        properties: {
          associationType: 'reference'
        }
      });

      expect(logicalDataAssociationValidation.valid).toBe(true);
    });

    it('should validate complex Logical Model architecture', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'logical-model-architecture',
        name: 'Enterprise Logical Architecture',
        description: 'Architecture demonstrating logical model integration',
        author: 'Logical Architect',
        organization: 'Enterprise',
        includeAllViews: true
      });

      // Add Logical Architecture
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'logical-architecture',
          type: 'LogicalArchitecture',
          name: 'Enterprise Logical Architecture',
          description: 'Logical architecture for enterprise systems',
          properties: {
            architectureType: 'SOA',
            components: ['order_service', 'customer_service'],
            interfaces: ['order_interface'],
            flows: ['order_flow']
          }
        }
      );

      // Add Logical System
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'order_system',
          type: 'LogicalSystem',
          name: 'Order Management System',
          description: 'System for managing orders',
          properties: {
            systemType: 'application',
            components: ['order_component'],
            interfaces: ['order_interface'],
            functions: ['process_order']
          }
        }
      );

      // Add Logical Activity
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'process_order_activity',
          type: 'LogicalActivity',
          name: 'Process Order',
          description: 'Activity for processing customer orders',
          properties: {
            activityType: 'business',
            inputs: ['customer_order'],
            outputs: ['processed_order'],
            performer: 'order_system'
          }
        }
      );

      // Add Logical Interface
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'order_interface',
          type: 'LogicalInterface',
          name: 'Order Processing Interface',
          description: 'Interface for order processing',
          properties: {
            interfaceType: 'service',
            protocol: 'REST',
            operations: ['create_order', 'update_order'],
            dataTypes: ['Order', 'OrderResponse']
          }
        }
      );

      // Add Logical Data Flow
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'order_data_flow',
          type: 'LogicalDataFlow',
          name: 'Order Data Flow',
          description: 'Flow of order data',
          properties: {
            dataType: 'order',
            dataFormat: 'JSON',
            dataSize: '2KB'
          }
        }
      );

      // Add Logical System Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'system-relationship',
          type: 'LogicalSystemRelationship',
          name: 'System Dependency',
          description: 'Dependency between order and customer systems',
          sourceId: 'order_system',
          targetId: 'customer_system',
          properties: {
            relationshipType: 'uses'
          }
        }
      );

      // Add Logical Activity Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'activity-relationship',
          type: 'LogicalActivityRelationship',
          name: 'Activity Sequence',
          description: 'Sequence between activities',
          sourceId: 'receive_order',
          targetId: 'process_order_activity',
          properties: {
            relationshipType: 'sequence',
            sequence: '2'
          }
        }
      );

      // Add Logical Flow Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'flow-relationship',
          type: 'LogicalFlowRelationship',
          name: 'Flow Connection',
          description: 'Connection between data flows',
          sourceId: 'input_flow',
          targetId: 'order_data_flow',
          properties: {
            relationshipType: 'connection'
          }
        }
      );

      const result = await validateArchitecture(architecture);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate Logical Model elements', async () => {
      const { validateElementAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Logical Architecture
      const logicalArchValidation = validateElementAgainstMetaModel({
        id: 'logical-arch-1',
        type: 'LogicalArchitecture',
        name: 'Enterprise Logical Architecture',
        description: 'Logical architecture for enterprise',
        properties: {
          architectureType: 'SOA',
          components: ['service-1', 'service-2'],
          interfaces: ['interface-1'],
          flows: ['flow-1']
        }
      });

      expect(logicalArchValidation.valid).toBe(true);

      // Test Logical Activity
      const logicalActivityValidation = validateElementAgainstMetaModel({
        id: 'logical-activity-1',
        type: 'LogicalActivity',
        name: 'Process Order',
        description: 'Logical activity for processing orders',
        properties: {
          activityType: 'business',
          inputs: ['order'],
          outputs: ['processed_order'],
          performer: 'order_service'
        }
      });

      expect(logicalActivityValidation.valid).toBe(true);

      // Test Logical System
      const logicalSystemValidation = validateElementAgainstMetaModel({
        id: 'logical-system-1',
        type: 'LogicalSystem',
        name: 'Order Management System',
        description: 'Logical system for order management',
        properties: {
          systemType: 'application',
          components: ['order_component'],
          interfaces: ['order_interface'],
          functions: ['process_order', 'validate_order']
        }
      });

      expect(logicalSystemValidation.valid).toBe(true);

      // Test Logical Interface
      const logicalInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-interface-1',
        type: 'LogicalInterface',
        name: 'Order Processing Interface',
        description: 'Interface for order processing',
        properties: {
          interfaceType: 'service',
          protocol: 'REST',
          operations: ['create_order', 'update_order'],
          dataTypes: ['Order', 'OrderResponse']
        }
      });

      expect(logicalInterfaceValidation.valid).toBe(true);

      // Test Logical Flow
      const logicalFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-flow-1',
        type: 'LogicalFlow',
        name: 'Order Data Flow',
        description: 'Flow of order data',
        properties: {
          flowType: 'data',
          source: 'input_service',
          target: 'order_service',
          content: 'order_data'
        }
      });

      expect(logicalFlowValidation.valid).toBe(true);

      // Test Logical Component
      const logicalComponentValidation = validateElementAgainstMetaModel({
        id: 'logical-component-1',
        type: 'LogicalComponent',
        name: 'Order Processor',
        description: 'Component for processing orders',
        properties: {
          componentType: 'business_logic',
          interfaces: ['order_interface'],
          functions: ['process_order'],
          dependencies: ['validation_component']
        }
      });

      expect(logicalComponentValidation.valid).toBe(true);

      // Test Logical Service
      const logicalServiceValidation = validateElementAgainstMetaModel({
        id: 'logical-service-1',
        type: 'LogicalService',
        name: 'Order Service',
        description: 'Service for order management',
        properties: {
          serviceType: 'business',
          serviceLevel: 'gold',
          operations: ['create', 'update', 'delete'],
          contracts: ['sla_gold']
        }
      });

      expect(logicalServiceValidation.valid).toBe(true);

      // Test Logical Data Flow
      const logicalDataFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-data-flow-1',
        type: 'LogicalDataFlow',
        name: 'Customer Data Flow',
        description: 'Flow of customer data',
        properties: {
          dataType: 'customer',
          dataFormat: 'JSON',
          dataSize: '1KB'
        }
      });

      expect(logicalDataFlowValidation.valid).toBe(true);

      // Test Logical Control Flow
      const logicalControlFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-control-flow-1',
        type: 'LogicalControlFlow',
        name: 'Order Validation Control',
        description: 'Control flow for order validation',
        properties: {
          controlType: 'sequential',
          triggerCondition: 'order_received'
        }
      });

      expect(logicalControlFlowValidation.valid).toBe(true);

      // Test Logical Information Flow
      const logicalInfoFlowValidation = validateElementAgainstMetaModel({
        id: 'logical-info-flow-1',
        type: 'LogicalInformationFlow',
        name: 'Order Status Information',
        description: 'Information flow for order status',
        properties: {
          informationType: 'status',
          informationCategory: 'order',
          securityClassification: 'internal'
        }
      });

      expect(logicalInfoFlowValidation.valid).toBe(true);

      // Test Logical Operational Activity
      const logicalOpActivityValidation = validateElementAgainstMetaModel({
        id: 'logical-op-activity-1',
        type: 'LogicalOperationalActivity',
        name: 'Customer Service',
        description: 'Operational activity for customer service',
        properties: {
          businessProcess: 'customer_management',
          lane: 'customer_service',
          milestone: false
        }
      });

      expect(logicalOpActivityValidation.valid).toBe(true);

      // Test Logical System Function
      const logicalSysFunctionValidation = validateElementAgainstMetaModel({
        id: 'logical-sys-function-1',
        type: 'LogicalSystemFunction',
        name: 'Order Validation Function',
        description: 'Function for validating orders',
        properties: {
          functionType: 'validation',
          inputs: ['order'],
          outputs: ['valid_order'],
          performanceRequirements: ['response_time_100ms']
        }
      });

      expect(logicalSysFunctionValidation.valid).toBe(true);

      // Test Logical Node
      const logicalNodeValidation = validateElementAgainstMetaModel({
        id: 'logical-node-1',
        type: 'LogicalNode',
        name: 'Application Server',
        description: 'Logical node for application hosting',
        properties: {
          nodeType: 'server',
          location: 'data_center_1',
          components: ['order_service'],
          connectors: ['network_connector']
        }
      });

      expect(logicalNodeValidation.valid).toBe(true);

      // Test Logical Constraint
      const logicalConstraintValidation = validateElementAgainstMetaModel({
        id: 'logical-constraint-1',
        type: 'LogicalConstraint',
        name: 'Order Processing Time',
        description: 'Constraint on order processing time',
        properties: {
          constraintType: 'performance',
          expression: 'processing_time <= 100ms',
          scope: 'order_service',
          severity: 'critical'
        }
      });

      expect(logicalConstraintValidation.valid).toBe(true);

      // Test Logical Business Rule
      const logicalBusinessRuleValidation = validateElementAgainstMetaModel({
        id: 'logical-business-rule-1',
        type: 'LogicalBusinessRule',
        name: 'Order Validation Rule',
        description: 'Business rule for order validation',
        properties: {
          ruleType: 'validation',
          ruleCategory: 'business',
          enforcementLevel: 'mandatory'
        }
      });

      expect(logicalBusinessRuleValidation.valid).toBe(true);

      // Test Logical Policy
      const logicalPolicyValidation = validateElementAgainstMetaModel({
        id: 'logical-policy-1',
        type: 'LogicalPolicy',
        name: 'Data Retention Policy',
        description: 'Policy for data retention',
        properties: {
          policyType: 'data_management',
          policyDomain: 'enterprise',
          enforcementMechanism: 'automated'
        }
      });

      expect(logicalPolicyValidation.valid).toBe(true);

      // Test Logical Requirement
      const logicalRequirementValidation = validateElementAgainstMetaModel({
        id: 'logical-requirement-1',
        type: 'LogicalRequirement',
        name: 'System Availability',
        description: 'Requirement for system availability',
        properties: {
          requirementType: 'non_functional',
          priority: 'high',
          verificationMethod: 'monitoring'
        }
      });

      expect(logicalRequirementValidation.valid).toBe(true);

      // Test Logical Capability
      const logicalCapabilityValidation = validateElementAgainstMetaModel({
        id: 'logical-capability-1',
        type: 'LogicalCapability',
        name: 'Order Processing Capability',
        description: 'Capability for processing orders',
        properties: {
          capabilityType: 'business',
          capabilityLevel: 'advanced',
          functions: ['process_order', 'validate_order']
        }
      });

      expect(logicalCapabilityValidation.valid).toBe(true);

      // Test Logical Service Interface
      const logicalServiceInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-service-interface-1',
        type: 'LogicalServiceInterface',
        name: 'Order Service Interface',
        description: 'Interface for order service',
        properties: {
          serviceContract: 'order_contract',
          serviceLevel: 'gold'
        }
      });

      expect(logicalServiceInterfaceValidation.valid).toBe(true);

      // Test Logical Data Interface
      const logicalDataInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-data-interface-1',
        type: 'LogicalDataInterface',
        name: 'Customer Data Interface',
        description: 'Interface for customer data',
        properties: {
          dataFormat: 'JSON',
          dataSchema: 'customer_schema'
        }
      });

      expect(logicalDataInterfaceValidation.valid).toBe(true);

      // Test Logical System Interface
      const logicalSystemInterfaceValidation = validateElementAgainstMetaModel({
        id: 'logical-system-interface-1',
        type: 'LogicalSystemInterface',
        name: 'Order System Interface',
        description: 'Interface for order system',
        properties: {
          systemProtocol: 'SOAP',
          systemStandard: 'WS-I'
        }
      });

      expect(logicalSystemInterfaceValidation.valid).toBe(true);

      // Test Logical Network
      const logicalNetworkValidation = validateElementAgainstMetaModel({
        id: 'logical-network-1',
        type: 'LogicalNetwork',
        name: 'Enterprise Network',
        description: 'Logical network for enterprise',
        properties: {
          networkType: 'enterprise',
          topology: 'hierarchical',
          nodes: ['server_1', 'server_2'],
          links: ['link_1', 'link_2']
        }
      });

      expect(logicalNetworkValidation.valid).toBe(true);

      // Test Logical Protocol
      const logicalProtocolValidation = validateElementAgainstMetaModel({
        id: 'logical-protocol-1',
        type: 'LogicalProtocol',
        name: 'REST Protocol',
        description: 'REST protocol definition',
        properties: {
          protocolType: 'application',
          protocolStandard: 'REST',
          messageFormats: ['JSON', 'XML']
        }
      });

      expect(logicalProtocolValidation.valid).toBe(true);

      // Test Logical Message
      const logicalMessageValidation = validateElementAgainstMetaModel({
        id: 'logical-message-1',
        type: 'LogicalMessage',
        name: 'Order Request Message',
        description: 'Message for order requests',
        properties: {
          messageType: 'request',
          messageFormat: 'JSON',
          payload: 'order_data'
        }
      });

      expect(logicalMessageValidation.valid).toBe(true);

      // Test Logical Event
      const logicalEventValidation = validateElementAgainstMetaModel({
        id: 'logical-event-1',
        type: 'LogicalEvent',
        name: 'Order Received Event',
        description: 'Event when order is received',
        properties: {
          eventType: 'business',
          eventSource: 'order_service',
          triggerConditions: ['order_submitted']
        }
      });

      expect(logicalEventValidation.valid).toBe(true);

      // Test Logical State
      const logicalStateValidation = validateElementAgainstMetaModel({
        id: 'logical-state-1',
        type: 'LogicalState',
        name: 'Order Processing State',
        description: 'State for order processing',
        properties: {
          stateType: 'process',
          initialState: false,
          finalState: false
        }
      });

      expect(logicalStateValidation.valid).toBe(true);

      // Test Logical Transition
      const logicalTransitionValidation = validateElementAgainstMetaModel({
        id: 'logical-transition-1',
        type: 'LogicalTransition',
        name: 'Order to Processing',
        description: 'Transition from order to processing',
        properties: {
          transitionType: 'automatic',
          sourceState: 'order_received',
          targetState: 'processing',
          trigger: 'order_validated',
          guard: 'payment_confirmed'
        }
      });

      expect(logicalTransitionValidation.valid).toBe(true);

      // Test Logical Condition
      const logicalConditionValidation = validateElementAgainstMetaModel({
        id: 'logical-condition-1',
        type: 'LogicalCondition',
        name: 'Payment Valid Condition',
        description: 'Condition for payment validation',
        properties: {
          conditionType: 'business',
          conditionExpression: 'payment_amount > 0'
        }
      });

      expect(logicalConditionValidation.valid).toBe(true);

      // Test Logical Action
      const logicalActionValidation = validateElementAgainstMetaModel({
        id: 'logical-action-1',
        type: 'LogicalAction',
        name: 'Process Payment Action',
        description: 'Action for processing payment',
        properties: {
          actionType: 'business',
          actionSequence: 'validate_payment',
          preConditions: ['payment_received'],
          postConditions: ['payment_processed']
        }
      });

      expect(logicalActionValidation.valid).toBe(true);

      // Test Logical Decision
      const logicalDecisionValidation = validateElementAgainstMetaModel({
        id: 'logical-decision-1',
        type: 'LogicalDecision',
        name: 'Payment Method Decision',
        description: 'Decision for payment method',
        properties: {
          decisionType: 'business',
          decisionCriteria: ['payment_amount', 'customer_credit'],
          alternatives: ['credit_card', 'bank_transfer']
        }
      });

      expect(logicalDecisionValidation.valid).toBe(true);

      // Test Logical Merge
      const logicalMergeValidation = validateElementAgainstMetaModel({
        id: 'logical-merge-1',
        type: 'LogicalMerge',
        name: 'Order Processing Merge',
        description: 'Merge point for order processing',
        properties: {
          mergeType: 'synchronization',
          inputFlows: ['validation_flow', 'payment_flow'],
          mergeCondition: 'all_completed'
        }
      });

      expect(logicalMergeValidation.valid).toBe(true);

      // Test Logical Fork
      const logicalForkValidation = validateElementAgainstMetaModel({
        id: 'logical-fork-1',
        type: 'LogicalFork',
        name: 'Order Processing Fork',
        description: 'Fork point for order processing',
        properties: {
          forkType: 'parallel',
          inputFlow: 'order_received',
          outputFlows: ['validation_flow', 'payment_flow']
        }
      });

      expect(logicalForkValidation.valid).toBe(true);

      // Test Logical Join
      const logicalJoinValidation = validateElementAgainstMetaModel({
        id: 'logical-join-1',
        type: 'LogicalJoin',
        name: 'Order Processing Join',
        description: 'Join point for order processing',
        properties: {
          joinType: 'synchronization',
          inputFlows: ['validation_flow', 'payment_flow'],
          joinCondition: 'all_completed'
        }
      });

      expect(logicalJoinValidation.valid).toBe(true);

      // Test Logical Start
      const logicalStartValidation = validateElementAgainstMetaModel({
        id: 'logical-start-1',
        type: 'LogicalStart',
        name: 'Order Process Start',
        description: 'Start of order process',
        properties: {
          startType: 'trigger',
          trigger: 'order_received'
        }
      });

      expect(logicalStartValidation.valid).toBe(true);

      // Test Logical End
      const logicalEndValidation = validateElementAgainstMetaModel({
        id: 'logical-end-1',
        type: 'LogicalEnd',
        name: 'Order Process End',
        description: 'End of order process',
        properties: {
          endType: 'completion',
          terminationCondition: 'order_shipped'
        }
      });

      expect(logicalEndValidation.valid).toBe(true);
    });

    it('should validate Logical Model relationships', async () => {
      const { validateRelationshipAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Logical Activity Relationship
      const logicalActivityRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-activity-rel-1',
        type: 'LogicalActivityRelationship',
        name: 'Order Processing Sequence',
        description: 'Sequence relationship between activities',
        sourceId: 'receive_order',
        targetId: 'validate_order',
        properties: {
          relationshipType: 'sequence',
          sequence: '1'
        }
      });

      expect(logicalActivityRelValidation.valid).toBe(true);

      // Test Logical System Relationship
      const logicalSystemRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-system-rel-1',
        type: 'LogicalSystemRelationship',
        name: 'System Dependency',
        description: 'Dependency between systems',
        sourceId: 'order_system',
        targetId: 'inventory_system',
        properties: {
          relationshipType: 'dependency'
        }
      });

      expect(logicalSystemRelValidation.valid).toBe(true);

      // Test Logical Flow Relationship
      const logicalFlowRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-flow-rel-1',
        type: 'LogicalFlowRelationship',
        name: 'Data Flow Connection',
        description: 'Connection between data flows',
        sourceId: 'input_flow',
        targetId: 'output_flow',
        properties: {
          relationshipType: 'connection'
        }
      });

      expect(logicalFlowRelValidation.valid).toBe(true);

      // Test Logical Architecture Relationship
      const logicalArchRelValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-arch-rel-1',
        type: 'LogicalArchitectureRelationship',
        name: 'Architecture Layer',
        description: 'Layer relationship in architecture',
        sourceId: 'business_layer',
        targetId: 'application_layer',
        properties: {
          relationshipType: 'layer'
        }
      });

      expect(logicalArchRelValidation.valid).toBe(true);

      // Test Logical Sequence Flow
      const logicalSequenceFlowValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-sequence-flow-1',
        type: 'LogicalSequenceFlow',
        name: 'Process Sequence',
        description: 'Sequence flow in process',
        sourceId: 'activity_1',
        targetId: 'activity_2',
        properties: {
          flowType: 'sequential'
        }
      });

      expect(logicalSequenceFlowValidation.valid).toBe(true);

      // Test Logical Message Flow
      const logicalMessageFlowValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-message-flow-1',
        type: 'LogicalMessageFlow',
        name: 'Service Message',
        description: 'Message flow between services',
        sourceId: 'service_1',
        targetId: 'service_2',
        properties: {
          flowType: 'request_response'
        }
      });

      expect(logicalMessageFlowValidation.valid).toBe(true);

      // Test Logical Data Association
      const logicalDataAssociationValidation = validateRelationshipAgainstMetaModel({
        id: 'logical-data-assoc-1',
        type: 'LogicalDataAssociation',
        name: 'Data Association',
        description: 'Association between data elements',
        sourceId: 'customer_data',
        targetId: 'order_data',
        properties: {
          associationType: 'reference'
        }
      });

      expect(logicalDataAssociationValidation.valid).toBe(true);
    });

    it('should validate complex Logical Model architecture', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'logical-model-architecture',
        name: 'Enterprise Logical Architecture',
        description: 'Architecture demonstrating logical model integration',
        author: 'Logical Architect',
        organization: 'Enterprise',
        includeAllViews: true
      });

      // Add Logical Architecture
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'logical-architecture',
          type: 'LogicalArchitecture',
          name: 'Enterprise Logical Architecture',
          description: 'Logical architecture for enterprise systems',
          properties: {
            architectureType: 'SOA',
            components: ['order_service', 'customer_service'],
            interfaces: ['order_interface'],
            flows: ['order_flow']
          }
        }
      );

      // Add Logical System
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'order_system',
          type: 'LogicalSystem',
          name: 'Order Management System',
          description: 'System for managing orders',
          properties: {
            systemType: 'application',
            components: ['order_component'],
            interfaces: ['order_interface'],
            functions: ['process_order']
          }
        }
      );

      // Add Logical Activity
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'process_order_activity',
          type: 'LogicalActivity',
          name: 'Process Order',
          description: 'Activity for processing customer orders',
          properties: {
            activityType: 'business',
            inputs: ['customer_order'],
            outputs: ['processed_order'],
            performer: 'order_system'
          }
        }
      );

      // Add Logical Interface
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'order_interface',
          type: 'LogicalInterface',
          name: 'Order Processing Interface',
          description: 'Interface for order processing',
          properties: {
            interfaceType: 'service',
            protocol: 'REST',
            operations: ['create_order', 'update_order'],
            dataTypes: ['Order', 'OrderResponse']
          }
        }
      );

      // Add Logical Data Flow
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'order_data_flow',
          type: 'LogicalDataFlow',
          name: 'Order Data Flow',
          description: 'Flow of order data',
          properties: {
            dataType: 'order',
            dataFormat: 'JSON',
            dataSize: '2KB'
          }
        }
      );

      // Add Logical System Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'system-relationship',
          type: 'LogicalSystemRelationship',
          name: 'System Dependency',
          description: 'Dependency between order and customer systems',
          sourceId: 'order_system',
          targetId: 'customer_system',
          properties: {
            relationshipType: 'uses'
          }
        }
      );

      // Add Logical Activity Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'activity-relationship',
          type: 'LogicalActivityRelationship',
          name: 'Activity Sequence',
          description: 'Sequence between activities',
          sourceId: 'receive_order',
          targetId: 'process_order_activity',
          properties: {
            relationshipType: 'sequence',
            sequence: '2'
          }
        }
      );

      // Add Logical Flow Relationship
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/SV/product/SV-1`,
        {
          id: 'flow-relationship',
          type: 'LogicalFlowRelationship',
          name: 'Flow Connection',
          description: 'Connection between data flows',
          sourceId: 'input_flow',
          targetId: 'order_data_flow',
          properties: {
            relationshipType: 'connection'
          }
        }
      );

      const result = await validateArchitecture(architecture);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate DM2 Principal Architectural Constructs elements', async () => {
      const { validateElementAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Performer
      const performerValidation = validateElementAgainstMetaModel({
        id: 'performer-1',
        type: 'Performer',
        name: 'Enterprise Architect',
        description: 'Human performer responsible for architecture design',
        properties: {
          performerType: 'human',
          capabilities: ['analysis', 'design'],
          activities: ['requirement_gathering', 'modeling'],
          resources: ['tools', 'documentation']
        }
      });
      expect(performerValidation.valid).toBe(true);

      // Test ResourceFlow
      const resourceFlowValidation = validateElementAgainstMetaModel({
        id: 'resource-flow-1',
        type: 'ResourceFlow',
        name: 'Data Exchange Flow',
        description: 'Flow of data between activities',
        properties: {
          flowType: 'information',
          sourceActivity: 'data_collection',
          targetActivity: 'data_processing',
          resourceType: 'customer_data',
          quantity: '1GB/hour',
          temporalConstraints: ['real-time']
        }
      });
      expect(resourceFlowValidation.valid).toBe(true);

      // Test Rule
      const ruleValidation = validateElementAgainstMetaModel({
        id: 'rule-1',
        type: 'Rule',
        name: 'Data Privacy Regulation',
        description: 'GDPR compliance requirements',
        properties: {
          ruleType: 'regulation',
          authority: 'European Union',
          scope: 'global',
          enforcementLevel: 'mandatory',
          complianceRequirements: ['data_encryption', 'user_consent']
        }
      });
      expect(ruleValidation.valid).toBe(true);

      // Test Goal
      const goalValidation = validateElementAgainstMetaModel({
        id: 'goal-1',
        type: 'Goal',
        name: 'Digital Transformation',
        description: 'Achieve full digital transformation by 2025',
        properties: {
          goalType: 'objective',
          priority: 'high',
          timeframe: '2025',
          measures: ['efficiency_metrics', 'adoption_rate'],
          relatedResources: ['legacy_systems', 'digital_platforms']
        }
      });
      expect(goalValidation.valid).toBe(true);

      // Test Project
      const projectValidation = validateElementAgainstMetaModel({
        id: 'project-1',
        type: 'Project',
        name: 'System Modernization Initiative',
        description: 'Modernize legacy systems to cloud-native architecture',
        properties: {
          projectType: 'transformation',
          startDate: '2024-01-01',
          endDate: '2025-12-31',
          budget: '5000000',
          stakeholders: ['executives', 'it_team', 'users'],
          deliverables: ['new_system', 'migration_plan'],
          goals: ['digital_transformation', 'cost_reduction']
        }
      });
      expect(projectValidation.valid).toBe(true);

      // Test Reification
      const reificationValidation = validateElementAgainstMetaModel({
        id: 'reification-1',
        type: 'Reification',
        name: 'Conceptual to Logical Mapping',
        description: 'Mapping from conceptual model to logical implementation',
        properties: {
          abstractionLevel: 'logical',
          sourceAbstraction: 'conceptual',
          targetAbstraction: 'logical',
          refinementType: 'decomposition',
          traceabilityLinks: ['req-001', 'req-002']
        }
      });
      expect(reificationValidation.valid).toBe(true);
    });

    it('should validate DM2 Supporting Architectural Constructs elements', async () => {
      const { validateElementAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test Measure
      const measureValidation = validateElementAgainstMetaModel({
        id: 'measure-1',
        type: 'Measure',
        name: 'System Response Time',
        description: 'Average response time for system transactions',
        properties: {
          measureType: 'performance',
          unit: 'milliseconds',
          value: 150,
          targetValue: 100,
          threshold: 200,
          measurementMethod: 'automated_monitoring',
          collectionFrequency: 'real-time'
        }
      });
      expect(measureValidation.valid).toBe(true);

      // Test Location
      const locationValidation = validateElementAgainstMetaModel({
        id: 'location-1',
        type: 'Location',
        name: 'Primary Data Center',
        description: 'Main data center facility',
        properties: {
          locationType: 'physical',
          coordinates: '40.7128,-74.0060',
          address: '123 Data Center St, New York, NY',
          logicalReference: 'DC-NYC-01',
          boundaries: ['north_lat', 'south_lat', 'east_lng', 'west_lng'],
          containedLocations: ['server_room_1', 'server_room_2']
        }
      });
      expect(locationValidation.valid).toBe(true);

      // Test Pedigree
      const pedigreeValidation = validateElementAgainstMetaModel({
        id: 'pedigree-1',
        type: 'Pedigree',
        name: 'System Requirements Document',
        description: 'Origin and history of requirements document',
        properties: {
          origin: 'stakeholder_workshop',
          creationDate: '2023-06-15',
          author: 'Requirements Team',
          versionHistory: ['v1.0', 'v1.1', 'v2.0'],
          modificationHistory: ['2023-07-01', '2023-08-15'],
          source: 'stakeholder_interviews',
          reliability: 'high',
          confidence: '95%'
        }
      });
      expect(pedigreeValidation.valid).toBe(true);
    });

    it('should validate DM2 relationships', async () => {
      const { validateRelationshipAgainstMetaModel } = await import('../ontology/dodaf-metamodel');

      // Test PerformerRelationship
      const performerRelValidation = validateRelationshipAgainstMetaModel({
        id: 'performer-rel-1',
        type: 'PerformerRelationship',
        name: 'Architect Reports To Manager',
        description: 'Reporting relationship between architect and manager',
        sourceId: 'architect',
        targetId: 'manager',
        properties: {
          relationshipType: 'reports_to'
        }
      });
      expect(performerRelValidation.valid).toBe(true);

      // Test ResourceFlowRelationship
      const resourceFlowRelValidation = validateRelationshipAgainstMetaModel({
        id: 'resource-flow-rel-1',
        type: 'ResourceFlowRelationship',
        name: 'Data Flow Connection',
        description: 'Connection between data flows',
        sourceId: 'flow-1',
        targetId: 'flow-2',
        properties: {
          relationshipType: 'connects'
        }
      });
      expect(resourceFlowRelValidation.valid).toBe(true);

      // Test RuleRelationship
      const ruleRelValidation = validateRelationshipAgainstMetaModel({
        id: 'rule-rel-1',
        type: 'RuleRelationship',
        name: 'Regulation Governs Process',
        description: 'Regulation governs business process',
        sourceId: 'gdpr-regulation',
        targetId: 'data-processing',
        properties: {
          relationshipType: 'governs'
        }
      });
      expect(ruleRelValidation.valid).toBe(true);

      // Test GoalRelationship
      const goalRelValidation = validateRelationshipAgainstMetaModel({
        id: 'goal-rel-1',
        type: 'GoalRelationship',
        name: 'Project Supports Goal',
        description: 'Project supports strategic goal',
        sourceId: 'modernization-project',
        targetId: 'digital-transformation-goal',
        properties: {
          relationshipType: 'supports'
        }
      });
      expect(goalRelValidation.valid).toBe(true);

      // Test MeasureRelationship
      const measureRelValidation = validateRelationshipAgainstMetaModel({
        id: 'measure-rel-1',
        type: 'MeasureRelationship',
        name: 'KPI Measures Performance',
        description: 'KPI measures system performance',
        sourceId: 'response-time-kpi',
        targetId: 'web-service',
        properties: {
          relationshipType: 'measures'
        }
      });
      expect(measureRelValidation.valid).toBe(true);
    });

    it('should validate complex DM2 architecture', async () => {
      let architecture = createDoDAFArchitecture({
        id: 'dm2-architecture',
        name: 'DM2 Integrated Architecture',
        description: 'Architecture demonstrating DM2 data groups integration',
        author: 'DM2 Architect',
        organization: 'Enterprise',
        includeAllViews: true
      });

      // Add DM2 Principal Architectural Constructs
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'enterprise-architect',
          type: 'Performer',
          name: 'Enterprise Architect',
          description: 'Lead architect for enterprise transformation',
          properties: {
            performerType: 'human',
            capabilities: ['architecture_design', 'governance'],
            activities: ['requirement_analysis', 'solution_design']
          }
        }
      );

      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'data-privacy-regulation',
          type: 'Rule',
          name: 'Data Privacy Regulation',
          description: 'Compliance with data privacy regulations',
          properties: {
            ruleType: 'regulation',
            authority: 'Government',
            enforcementLevel: 'mandatory'
          }
        }
      );

      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'digital-transformation-goal',
          type: 'Goal',
          name: 'Digital Transformation Goal',
          description: 'Achieve digital transformation by 2025',
          properties: {
            goalType: 'strategic',
            priority: 'high',
            timeframe: '2025'
          }
        }
      );

      // Add DM2 Supporting Architectural Constructs
      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'performance-measure',
          type: 'Measure',
          name: 'System Performance Measure',
          description: 'Key performance indicator for system response time',
          properties: {
            measureType: 'performance',
            unit: 'milliseconds',
            targetValue: 100,
            threshold: 200
          }
        }
      );

      architecture = addElementToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'primary-datacenter',
          type: 'Location',
          name: 'Primary Data Center',
          description: 'Main data center facility location',
          properties: {
            locationType: 'physical',
            coordinates: '40.7128,-74.0060',
            address: '123 Tech Street, New York, NY'
          }
        }
      );

      // Add relationships
      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'architect-goal-relationship',
          type: 'PerformerRelationship',
          name: 'Architect Drives Goal',
          description: 'Architect responsible for achieving transformation goal',
          sourceId: 'enterprise-architect',
          targetId: 'digital-transformation-goal',
          properties: {
            relationshipType: 'responsible_for'
          }
        }
      );

      architecture = addRelationshipToProduct(
        architecture,
        `${architecture.id}/view/OV/product/OV-1`,
        {
          id: 'goal-measure-relationship',
          type: 'GoalRelationship',
          name: 'Goal Measured By KPI',
          description: 'Goal achievement measured by performance KPI',
          sourceId: 'digital-transformation-goal',
          targetId: 'performance-measure',
          properties: {
            relationshipType: 'measured_by'
          }
        }
      );

      const result = await validateArchitecture(architecture);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
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
