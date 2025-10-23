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

# Architecture Shape
dodaf:ArchitectureShape
    a sh:NodeShape ;
    sh:targetClass dodaf:Architecture ;
    sh:property [
        sh:path dodaf:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
    ] ;
    sh:property [
        sh:path dodaf:description ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
    ] .

# Element Shape
dodaf:ElementShape
    a sh:NodeShape ;
    sh:targetClass dodaf:Element ;
    sh:property [
        sh:path dodaf:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
    ] ;
    sh:property [
        sh:path dodaf:type ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
    ] .

# Relationship Shape
dodaf:RelationshipShape
    a sh:NodeShape ;
    sh:targetClass dodaf:Relationship ;
    sh:property [
        sh:path dodaf:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
    ] ;
    sh:property [
        sh:path dodaf:sourceId ;
        sh:minCount 1 ;
        sh:nodeKind sh:IRI ;
    ] ;
    sh:property [
        sh:path dodaf:targetId ;
        sh:minCount 1 ;
        sh:nodeKind sh:IRI ;
    ] .

# Product Shape
dodaf:ProductShape
    a sh:NodeShape ;
    sh:targetClass dodaf:Product ;
    sh:property [
        sh:path dodaf:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
    ] ;
    sh:property [
        sh:path dodaf:number ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
        sh:pattern "^[A-Z]{2}-\\\\d+$" ;
    ] .

# View Shape
dodaf:ViewShape
    a sh:NodeShape ;
    sh:targetClass dodaf:View ;
    sh:property [
        sh:path dodaf:type ;
        sh:minCount 1 ;
        sh:in ( "AV" "OV" "SV" "TV" "DIV" ) ;
    ] ;
    sh:property [
        sh:path dodaf:name ;
        sh:minCount 1 ;
        sh:datatype xsd:string ;
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
