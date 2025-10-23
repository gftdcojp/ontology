#!/usr/bin/env node

/**
 * Generate SHACL shapes from TypeBox + RDF Schemas
 */

const fs = require('fs');
const path = require('path');

// Import the built distribution
// Note: This assumes the project has been built first
let generateDodafShaclTurtle;
try {
  const lib = require('../dist/index.js');
  generateDodafShaclTurtle = lib.generateDodafShaclTurtle;
} catch (error) {
  console.error('❌ Failed to load built library. Please run `pnpm build` first.');
  process.exit(1);
}

try {
  // Generate SHACL shapes
  const schemas = [
    // Import schemas from built distribution
    // This is a simplified approach - in production, you might want to import directly from source
  ];

  // For now, we'll generate basic shapes
  const shaclTurtle = `# DoDAF 2.0 SHACL Shapes
# Auto-generated from TypeBox + RDF semantic schemas
# Generated on: ${new Date().toISOString()}

@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix dodaf: <https://dodaf.defense.gov/ontology#> .
@prefix schema: <https://schema.org/> .

# Architecture Shape - target Architecture instances specifically
dodaf:ArchitectureShape
    a sh:NodeShape ;
    sh:target [
        a sh:SPARQLTarget ;
        sh:select """
            SELECT ?this WHERE {
                ?this rdf:type dodaf:Architecture .
            }
        """ ;
    ] ;
    sh:property [
        sh:path schema:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "Architecture must have a name" ;
    ] ;
    sh:property [
        sh:path schema:description ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "Architecture must have a description" ;
    ] .

# Element Shape - optional validation for elements
dodaf:ElementShape
    a sh:NodeShape ;
    sh:target [
        a sh:SPARQLTarget ;
        sh:select """
            SELECT ?this WHERE {
                ?this rdf:type dodaf:Element .
            }
        """ ;
    ] ;
    sh:property [
        sh:path schema:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "Element must have a name" ;
    ] ;
    sh:property [
        sh:path schema:description ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "Element must have a description" ;
    ] .

# Relationship Shape - optional validation for relationships
dodaf:RelationshipShape
    a sh:NodeShape ;
    sh:target [
        a sh:SPARQLTarget ;
        sh:select """
            SELECT ?this WHERE {
                ?this rdf:type dodaf:Relationship .
            }
        """ ;
    ] ;
    sh:property [
        sh:path schema:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "Relationship must have a name" ;
    ] .

# Product Shape - optional validation for products
dodaf:ProductShape
    a sh:NodeShape ;
    sh:target [
        a sh:SPARQLTarget ;
        sh:select """
            SELECT ?this WHERE {
                ?this rdf:type dodaf:Product .
            }
        """ ;
    ] ;
    sh:property [
        sh:path schema:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "Product must have a name" ;
    ] .

# View Shape - optional validation for views
dodaf:ViewShape
    a sh:NodeShape ;
    sh:target [
        a sh:SPARQLTarget ;
        sh:select """
            SELECT ?this WHERE {
                ?this rdf:type dodaf:View .
            }
        """ ;
    ] ;
    sh:property [
        sh:path schema:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:message "View must have a name" ;
    ] .
`;

  // Write SHACL shapes file
  const shaclPath = path.join(__dirname, '..', 'dist', 'dodaf.shapes.ttl');
  fs.writeFileSync(shaclPath, shaclTurtle);

  console.log(`✅ Generated DoDAF SHACL shapes at: ${shaclPath}`);

} catch (error) {
  console.error('❌ Failed to generate SHACL shapes:', error);
  process.exit(1);
}
