# DoDAF 2.0 Ontology TypeBox + JSON-LD

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A TypeScript library that provides type-safe DoDAF 2.0 (Department of Defense Architecture Framework Version 2.0) ontology definitions using [TypeBox](https://github.com/sinclairzx81/typebox) for runtime validation and [JSON-LD](https://json-ld.org/) for semantic web compatibility.

## Features

- **Type-Safe**: Full TypeScript support with compile-time type checking
- **Runtime Validation**: TypeBox-powered validation for DoDAF architecture instances
- **JSON-LD Compatible**: Semantic web integration with JSON-LD context and expansion
- **DoDAF 2.0 Compliant**: Implements all standard views (AV, OV, SV, TV, DIV) and products
- **Meta Model Support**: Comprehensive DoDAF 2.0 meta model with element and relationship types
- **Semantic Validation**: Meta model compliance validation for architecture elements
- **Extensible**: Easy to extend with custom views, products, and elements
- **RDF Support**: Convert to RDF triples for advanced semantic processing

## Installation

```bash
pnpm add @gftdcojp/ai-gftd-ontology-typebox
```

## Quick Start

### Creating a Basic DoDAF Architecture

```typescript
import { createDoDAFArchitecture, validateArchitecture } from '@gftdcojp/ai-gftd-ontology-typebox';

const architecture = createDoDAFArchitecture({
  id: 'my-system-architecture',
  name: 'My System Architecture',
  description: 'Enterprise system architecture description',
  author: 'John Doe',
  organization: 'My Organization'
});

console.log(architecture.name); // "My System Architecture"
console.log(architecture.id); // "my-system-architecture"
```

### Creating Architecture with All Standard Views

```typescript
const fullArchitecture = createDoDAFArchitecture({
  id: 'complete-architecture',
  name: 'Complete DoDAF Architecture',
  description: 'Full DoDAF 2.0 architecture with all views',
  author: 'Jane Smith',
  organization: 'Defense Department',
  includeAllViews: true // Include all 5 standard views
});

// Architecture now contains AV, OV, SV, TV, DIV views with their products
console.log(fullArchitecture.views.length); // 5
```

### JSON-LD Validation

```typescript
import { validateArchitecture } from '@gftdcojp/ai-gftd-ontology-typebox';

const result = await validateArchitecture(architecture);

if (result.valid) {
  console.log('Architecture is valid!');
  // Access normalized JSON-LD
  const normalized = result.normalized;
} else {
  console.log('Validation errors:', result.errors);
}
```

### Working with Views and Products

```typescript
import { addViewToArchitecture, addProductToView, addElementToProduct } from '@gftdcojp/ai-gftd-ontology-typebox';

// Add a custom view
let updatedArchitecture = addViewToArchitecture(architecture, 'OV');

// Add a custom product to Operational View
updatedArchitecture = addProductToView(
  updatedArchitecture,
  `${architecture.id}/view/OV`,
  {
    number: 'OV-7',
    name: 'Custom Operational Product',
    description: 'A custom operational product',
    purpose: 'Custom operational analysis',
    elements: [],
    relationships: []
  }
);

// Add elements to products with meta model types
updatedArchitecture = addElementToProduct(
  updatedArchitecture,
  `${architecture.id}/view/OV/product/OV-7`,
  {
    id: 'operation-alpha',
    type: 'OperationalActivity',
    name: 'Operation Alpha',
    description: 'Primary operational activity',
    properties: {
      priority: 'high',
      estimatedDuration: '2 hours'
    }
  }
);
```

### Meta Model Validation

```typescript
import {
  validateArchitecture,
  validateArchitectureDetailed,
  validateElementAgainstMetaModel,
  ElementType,
  RelationshipType
} from '@gftdcojp/ai-gftd-ontology-typebox';

// Validate entire architecture with meta model compliance
const result = await validateArchitecture(architecture);
if (result.valid) {
  console.log('Architecture is valid and meta model compliant!');
} else {
  console.log('Validation errors:', result.errors);
}

// Get detailed validation report
const report = await validateArchitectureDetailed(architecture);
console.log(`Validated ${report.summary.elementsValidated} elements`);
console.log(`Validated ${report.summary.relationshipsValidated} relationships`);

// Validate individual elements against meta model
const elementValidation = validateElementAgainstMetaModel({
  id: 'activity-1',
  type: 'OperationalActivity',
  name: 'Sample Activity',
  description: 'A sample operational activity',
  properties: { priority: 'high' }
});

console.log('Element validation result:', elementValidation.valid);
```

### JSON-LD Export and RDF Conversion

```typescript
import { exportAsJSONLD, DoDAFJSONLDValidator } from '@gftdcojp/ai-gftd-ontology-typebox';

// Export as JSON-LD string
const jsonldString = exportAsJSONLD(architecture);
console.log(jsonldString);

// Convert to RDF triples
const rdfTriples = await DoDAFJSONLDValidator.toRDF(architecture);
console.log('RDF triples:', rdfTriples);

// Normalize to canonical form
const normalized = await DoDAFJSONLDValidator.normalize(architecture);
console.log('Normalized:', normalized);
```

## DoDAF 2.0 Views and Products

This library implements all standard DoDAF 2.0 views and products:

### All Views (AV)
- **AV-1**: Overview and Summary Information
- **AV-2**: Integrated Dictionary

### Operational View (OV)
- **OV-1**: High-Level Operational Concept Graphic
- **OV-2**: Operational Resource Flow Description
- **OV-3**: Operational Resource Flow Matrix
- **OV-4**: Organizational Relationships Chart
- **OV-5a**: Operational Activity Decomposition Tree
- **OV-5b**: Operational Activity Model
- **OV-6a**: Operational Rules Model
- **OV-6b**: Operational State Transition Description
- **OV-6c**: Operational Event-Trace Description

### Systems View (SV)
- **SV-1**: Systems Interface Description
- **SV-2**: Systems Resource Flow Description
- **SV-3**: Systems-Systems Matrix
- **SV-4**: Systems Functionality Description
- **SV-5**: Operational Activity to Systems Function Traceability Matrix
- **SV-6**: Systems Resource Flow Matrix
- **SV-7**: Systems Measures Matrix
- **SV-8**: Systems Evolution Description
- **SV-9**: Systems Technology and Skills Forecast

### Technical Standards View (TV)
- **TV-1**: Technical Standards Profile
- **TV-2**: Technical Standards Forecast

### Data and Information View (DIV)
- **DIV-1**: Conceptual Data Model
- **DIV-2**: Logical Data Model
- **DIV-3**: Physical Data Model

## API Reference

### Core Functions

- `createDoDAFArchitecture(params)`: Create a new DoDAF architecture instance
- `validateArchitecture(architecture)`: Validate an architecture against DoDAF schema
- `exportAsJSONLD(architecture)`: Export architecture as JSON-LD string

### Builder Functions

- `addViewToArchitecture(architecture, viewType, products?)`: Add a view to architecture
- `addProductToView(architecture, viewId, product)`: Add a product to a view
- `addElementToProduct(architecture, productId, element)`: Add an element to a product
- `addRelationshipToProduct(architecture, productId, relationship)`: Add a relationship to a product

### Types

- `DoDAFArchitecture`: Main architecture interface
- `View`: Architecture view interface
- `Product`: View product interface
- `Element`: Product element interface
- `Relationship`: Element relationship interface

## JSON-LD Context

The library uses a standardized JSON-LD context for DoDAF:

```json
{
  "@context": {
    "@version": 1.1,
    "@base": "https://dodaf.defense.gov/ontology#",
    "dodaf": "https://dodaf.defense.gov/ontology#",
    "id": "@id",
    "type": "@type",
    "name": "https://schema.org/name",
    "description": "https://schema.org/description",
    "purpose": "dodaf:purpose",
    "created": "http://purl.org/dc/terms/created",
    "modified": "http://purl.org/dc/terms/modified",
    "author": "http://purl.org/dc/terms/creator",
    "version": "http://purl.org/dc/terms/hasVersion",
    "status": "dodaf:status",
    "properties": "dodaf:properties",
    "metadata": "dodaf:metadata",
    "elements": "dodaf:elements",
    "relationships": "dodaf:relationships",
    "products": "dodaf:products",
    "views": "dodaf:views",
    "architecture": "dodaf:architecture",
    "organization": "http://xmlns.com/foaf/0.1/organization",
    "classification": "dodaf:classification"
  }
}
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the library
pnpm build

# Type checking
pnpm type-check
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:run
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [TypeBox](https://github.com/sinclairzx81/typebox) - TypeScript runtime type validation
- [JSON-LD](https://json-ld.org/) - JSON for Linking Data
- [DoDAF](https://dodcio.defense.gov/Library/DoD-Architecture-Framework/) - Department of Defense Architecture Framework

## Acknowledgments

- DoD Architecture Framework Version 2.0 specification
- TypeBox for runtime type validation
- JSON-LD community for semantic web standards
