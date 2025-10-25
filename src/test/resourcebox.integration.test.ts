/**
 * ResourceBox Integration Test
 *
 * Testing @gftdcojp/resourcebox capabilities for DoDAF ontology
 */

import { describe, it, expect } from 'vitest';
import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';

describe('ResourceBox Integration Test', () => {
  it('should create basic DoDAF ontology with ResourceBox', () => {
    // 1. Define DoDAF ontology namespace
    const dodaf = Onto.Namespace({
      prefix: "dodaf",
      uri: "http://dodcio.defense.gov/dodaf20#"
    });

    // 2. Define basic DoDAF classes
    const ResourceClass = Onto.Class({
      iri: dodaf("Resource"),
      label: "Resource",
      comment: "Fundamental DoDAF resource"
    });

    // 3. Define properties
    const nameProperty = Onto.Property({
      iri: dodaf("name"),
      label: "name",
      domain: [ResourceClass],
      range: [Onto.Datatype.String],
      functional: true
    });

    // 4. Define resource schema using ResourceBox
    const DoDAFResource = Resource.Object({
      "@id": Resource.String({ format: "uri" }),
      "@type": Resource.Literal([dodaf("Resource")]),

      name: Resource.String({
        property: nameProperty,
        minLength: 1,
        maxLength: 200
      }),

      description: Resource.String({
        property: dodaf("description"),
        optional: true,
        maxLength: 1000
      })
    }, {
      class: ResourceClass
    });

    // 5. Type inference test
    type DoDAFResourceType = Resource.Static<typeof DoDAFResource>;

    // Test data
    const testData = {
      "@id": "http://example.org/test-resource",
      "@type": [dodaf("Resource")],
      name: "Test Resource",
      description: "A test resource for ResourceBox integration"
    };

    // 1. Type validation
    const typeResult = Resource.validate(DoDAFResource, testData);
    expect(typeResult.ok).toBe(true);
    if (typeResult.ok) {
      expect(typeResult.data.name).toBe("Test Resource");
    }

    // 2. Type inference result
    const inferredType: DoDAFResourceType = testData;
    expect(inferredType.name).toBe("Test Resource");
    expect(inferredType["@id"]).toBe("http://example.org/test-resource");

    // 3. JSON-LD context generation
    const context = Resource.context(DoDAFResource, {
      includeNamespaces: true,
      namespaces: {
        dodaf: "http://dodcio.defense.gov/dodaf20#"
      }
    });
    expect(context).toHaveProperty("@context");
    expect(context["@context"]).toHaveProperty("dodaf");
  });

  it('should work with SHACL validation', () => {
    const dodaf = Onto.Namespace({
      prefix: "dodaf",
      uri: "http://dodcio.defense.gov/dodaf20#"
    });

    const ResourceClass = Onto.Class({
      iri: dodaf("Resource"),
      label: "Resource"
    });

    const nameProperty = Onto.Property({
      iri: dodaf("name"),
      domain: [ResourceClass],
      range: [Onto.Datatype.String]
    });

    const DoDAFResource = Resource.Object({
      "@id": Resource.String({ format: "uri" }),
      name: Resource.String({ property: nameProperty, minLength: 1 })
    }, {
      class: ResourceClass
    });

    // Define SHACL shape
    const DoDAFShape = Shape.fromResource(DoDAFResource, {
      strict: true,
      closed: true
    });

    const testData = {
      "@id": "http://example.org/test-resource",
      "@type": [dodaf("Resource")],
      name: "Test Resource"
    };

    // Shape validation
    const shapeResult = Shape.validate(DoDAFShape, testData);
    expect(shapeResult.ok).toBe(true);
  });
});
