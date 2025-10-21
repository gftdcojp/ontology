#!/usr/bin/env node

/**
 * Generate JSON-LD Context file for DoDAF 2.0 Ontology
 */

const fs = require('fs');
const path = require('path');

// Import the context from the built distribution
// This is a simple approach - in a production setup you might want to import directly from source
const context = {
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
};

// Write context file to dist folder
const contextPath = path.join(__dirname, '..', 'dist', 'dodaf-context.json');
const contextContent = JSON.stringify(context, null, 2);

fs.writeFileSync(contextPath, contextContent);

console.log(`✅ Generated DoDAF JSON-LD context at: ${contextPath}`);
console.log(`📄 Context file size: ${contextContent.length} characters`);
console.log(`🌐 You can serve this file at: /dist/dodaf-context.json`);
