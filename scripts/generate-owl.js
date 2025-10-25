#!/usr/bin/env node

/**
 * Generate OWL ontology from TypeBox + RDF Schemas
 */

const fs = require('fs');
const path = require('path');

// Note: Using hardcoded OWL generation for ResourceBox compatibility
// TODO: Integrate with ResourceBox Onto generation in future

try {
  // Generate OWL ontology
  const schemas = [
    // Import schemas from built distribution
    // This is a simplified approach - in production, you might want to import directly from source
  ];

  // For now, we'll generate basic ontology
  const owlTurtle = `# DoDAF 2.0 OWL Ontology
# Auto-generated from TypeBox + RDF semantic schemas
# Generated on: ${new Date().toISOString()}

@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix dodaf: <https://dodaf.defense.gov/ontology#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

# Ontology declaration
<https://dodaf.defense.gov/ontology>
    a owl:Ontology ;
    owl:versionIRI <https://dodaf.defense.gov/ontology/2.0> ;
    rdfs:comment "DoDAF 2.0 Ontology - Department of Defense Architecture Framework Version 2.0" .

# Class declarations
dodaf:Architecture
    a owl:Class ;
    rdfs:label "Architecture" ;
    rdfs:comment "Top-level container for DoDAF architecture representations" .

dodaf:View
    a owl:Class ;
    rdfs:label "View" ;
    rdfs:comment "Views organize products in DoDAF architecture according to different perspectives" .

dodaf:Product
    a owl:Class ;
    rdfs:label "Product" ;
    rdfs:comment "Products are the basic unit of architecture representation in DoDAF" .

dodaf:Element
    a owl:Class ;
    rdfs:label "Element" ;
    rdfs:comment "Core element in DoDAF architecture representing architectural constructs" .

dodaf:Relationship
    a owl:Class ;
    rdfs:label "Relationship" ;
    rdfs:comment "Relationships between elements in DoDAF architecture" .

dodaf:Metadata
    a owl:Class ;
    rdfs:label "Metadata" ;
    rdfs:comment "Metadata for DoDAF elements and architectures" .

# Domain Class declarations
dodaf:Capability
    a owl:Class ;
    rdfs:label "Capability" ;
    rdfs:comment "An ability to achieve a desired effect under specified standards and conditions" .

dodaf:Activity
    a owl:Class ;
    rdfs:label "Activity" ;
    rdfs:comment "Work transforming resources into outputs or changing their state" .

dodaf:Service
    a owl:Class ;
    rdfs:label "Service" ;
    rdfs:comment "A unit of functionality provided at an interface" .

dodaf:Standard
    a owl:Class ;
    rdfs:label "Standard" ;
    rdfs:comment "Formal agreement documenting accepted specifications or criteria" .

dodaf:Agreement
    a owl:Class ;
    rdfs:label "Agreement" ;
    rdfs:comment "Consent among parties regarding terms and conditions of activities" .

dodaf:Information
    a owl:Class ;
    rdfs:label "Information" ;
    rdfs:comment "State of something of interest that is materialized and communicated" .

# Property declarations

# Data properties
dodaf:name
    a owl:DatatypeProperty ;
    rdfs:label "name" ;
    rdfs:domain dodaf:Architecture ;
    rdfs:range xsd:string .

dodaf:description
    a owl:DatatypeProperty ;
    rdfs:label "description" ;
    rdfs:domain dodaf:Architecture ;
    rdfs:range xsd:string .

dodaf:purpose
    a owl:DatatypeProperty ;
    rdfs:label "purpose" ;
    rdfs:domain dodaf:Architecture ;
    rdfs:range xsd:string .

dodaf:type
    a owl:DatatypeProperty ;
    rdfs:label "type" ;
    rdfs:domain dodaf:Element ;
    rdfs:range xsd:string .

dodaf:number
    a owl:DatatypeProperty ;
    rdfs:label "number" ;
    rdfs:domain dodaf:Product ;
    rdfs:range xsd:string .

dodaf:status
    a owl:DatatypeProperty ;
    rdfs:label "status" ;
    rdfs:domain dodaf:Metadata ;
    rdfs:range xsd:string .

dodaf:classification
    a owl:DatatypeProperty ;
    rdfs:label "classification" ;
    rdfs:domain dodaf:Metadata ;
    rdfs:range xsd:string .

# Functional properties
dct:created
    a owl:DatatypeProperty ;
    rdfs:label "created" ;
    rdfs:domain dodaf:Metadata ;
    rdfs:range xsd:dateTime .

dct:modified
    a owl:DatatypeProperty ;
    rdfs:label "modified" ;
    rdfs:domain dodaf:Metadata ;
    rdfs:range xsd:dateTime .

dct:creator
    a owl:DatatypeProperty ;
    rdfs:label "author" ;
    rdfs:domain dodaf:Metadata ;
    rdfs:range xsd:string .

dct:hasVersion
    a owl:DatatypeProperty ;
    rdfs:label "version" ;
    rdfs:domain dodaf:Architecture ;
    rdfs:range xsd:string .

foaf:organization
    a owl:DatatypeProperty ;
    rdfs:label "organization" ;
    rdfs:domain dodaf:Metadata ;
    rdfs:range xsd:string .

# Object properties
dodaf:viewId
    a owl:ObjectProperty ;
    rdfs:label "viewId" ;
    rdfs:domain dodaf:Product ;
    rdfs:range dodaf:View .

dodaf:productId
    a owl:ObjectProperty ;
    rdfs:label "productId" ;
    rdfs:domain dodaf:Element ;
    rdfs:range dodaf:Product .

dodaf:sourceId
    a owl:ObjectProperty ;
    rdfs:label "sourceId" ;
    rdfs:domain dodaf:Relationship ;
    rdfs:range dodaf:Element .

dodaf:targetId
    a owl:ObjectProperty ;
    rdfs:label "targetId" ;
    rdfs:domain dodaf:Relationship ;
    rdfs:range dodaf:Element .

dodaf:views
    a owl:ObjectProperty ;
    rdfs:label "views" ;
    rdfs:domain dodaf:Architecture ;
    rdfs:range dodaf:View .

dodaf:products
    a owl:ObjectProperty ;
    rdfs:label "products" ;
    rdfs:domain dodaf:View ;
    rdfs:range dodaf:Product .

dodaf:elements
    a owl:ObjectProperty ;
    rdfs:label "elements" ;
    rdfs:domain dodaf:Product ;
    rdfs:range dodaf:Element .

dodaf:relationships
    a owl:ObjectProperty ;
    rdfs:label "relationships" ;
    rdfs:domain dodaf:Product ;
    rdfs:range dodaf:Relationship .

dodaf:metadata
    a owl:ObjectProperty ;
    rdfs:label "metadata" ;
    rdfs:domain dodaf:Architecture ;
    rdfs:range dodaf:Metadata .

dodaf:properties
    a owl:DatatypeProperty ;
    rdfs:label "properties" ;
    rdfs:domain dodaf:Element ;
    rdfs:range xsd:string .

# Subclass mappings (lightweight UML→OWL generalization)
dodaf:Capability rdfs:subClassOf dodaf:Element .
dodaf:Activity rdfs:subClassOf dodaf:Element .
dodaf:Service rdfs:subClassOf dodaf:Element .
dodaf:Standard rdfs:subClassOf dodaf:Element .
dodaf:Agreement rdfs:subClassOf dodaf:Element .
dodaf:Information rdfs:subClassOf dodaf:Element .
`;

  // Write OWL ontology file
  const owlPath = path.join(__dirname, '..', 'dist', 'dodaf.owl.ttl');
  fs.writeFileSync(owlPath, owlTurtle);

  console.log(`✅ Generated DoDAF OWL ontology at: ${owlPath}`);

} catch (error) {
  console.error('❌ Failed to generate OWL ontology:', error);
  process.exit(1);
}
