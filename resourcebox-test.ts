/**
 * ResourceBox Integration Test
 *
 * Testing @gftdcojp/resourcebox capabilities for DoDAF ontology
 */

import { Onto, Resource, Shape } from '@gftdcojp/resourcebox';

// 1. Define DoDAF ontology namespace
const dodaf = Onto.Namespace({
  prefix: "dodaf",
  uri: "http://dodcio.defense.gov/dodaf20#"
});

// 2. Define basic DoDAF classes
const Resource = Onto.Class({
  iri: dodaf("Resource"),
  label: "Resource",
  comment: "Fundamental DoDAF resource"
});

const View = Onto.Class({
  iri: dodaf("View"),
  label: "View",
  comment: "DoDAF architectural view",
  subClassOf: [Resource]
});

// 3. Define properties
const name = Onto.Property({
  iri: dodaf("name"),
  label: "name",
  domain: [Resource],
  range: [Onto.Datatype.String],
  functional: true
});

const description = Onto.Property({
  iri: dodaf("description"),
  label: "description",
  domain: [Resource],
  range: [Onto.Datatype.String],
  functional: false
});

// 4. Define resource schema using ResourceBox
const DoDAFResource = Resource.Object({
  "@id": Resource.String({ format: "uri", required: true }),
  "@type": Resource.Literal([dodaf("Resource")]),

  name: Resource.String({
    property: name,
    required: true,
    minLength: 1,
    maxLength: 200
  }),

  description: Resource.String({
    property: description,
    optional: true,
    maxLength: 1000
  })
}, {
  class: Resource
});

// 5. Type inference test
type DoDAFResourceType = Resource.Static<typeof DoDAFResource>;

// 6. Define SHACL shape
const DoDAFShape = Shape.fromResource(DoDAFResource, {
  strict: true,
  closed: true
});

// Test data
const testData = {
  "@id": "http://example.org/test-resource",
  "@type": [dodaf("Resource")],
  name: "Test Resource",
  description: "A test resource for ResourceBox integration"
};

console.log("=== ResourceBox Integration Test ===");

// 1. Type validation
console.log("\n1. Type Validation:");
const typeResult = Resource.validate(DoDAFResource, testData);
if (typeResult.ok) {
  console.log("✓ Type validation passed");
  console.log("Validated data:", typeResult.data);
} else {
  console.log("✗ Type validation failed:", typeResult.errors);
}

// 2. Shape validation
console.log("\n2. Shape Validation:");
const shapeResult = Shape.validate(DoDAFShape, testData);
if (shapeResult.ok) {
  console.log("✓ Shape validation passed");
} else {
  console.log("✗ Shape validation failed:", shapeResult.violations);
}

// 3. JSON-LD context generation
console.log("\n3. JSON-LD Context Generation:");
const context = Resource.context(DoDAFResource, {
  includeNamespaces: true,
  namespaces: {
    dodaf: "http://dodcio.defense.gov/dodaf20#"
  }
});
console.log("Generated context:", JSON.stringify(context, null, 2));

// 4. Type inference result
console.log("\n4. Type Inference:");
const inferredType: DoDAFResourceType = testData;
console.log("Inferred type structure:", typeof inferredType, Object.keys(inferredType));

export { dodaf, Resource, View, name, description, DoDAFResource, DoDAFShape };
