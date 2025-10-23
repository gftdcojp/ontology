#!/usr/bin/env node

/**
 * Generate JSON-LD Context file for DoDAF 2.0 Ontology
 */

const fs = require('fs');
const path = require('path');

// Generate JSON-LD context
const context = {
  "@version": 1.1,
  "@base": "https://dodaf.defense.gov/ontology#",
  "dodaf": "https://dodaf.defense.gov/ontology#",
  "id": "@id",
  "type": "@type",
  "name": "dodaf:name",
  "description": "dodaf:description",
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
  "classification": "dodaf:classification",
  "viewId": "dodaf:viewId",
  "productId": "dodaf:productId",
  "sourceId": "dodaf:sourceId",
  "targetId": "dodaf:targetId",
  "number": "dodaf:number"
};

// Write context file to dist folder
const contextPath = path.join(__dirname, '..', 'dist', 'dodaf-context.json');
const contextContent = JSON.stringify(context, null, 2);

fs.writeFileSync(contextPath, contextContent);

console.log(`✅ Generated DoDAF JSON-LD context at: ${contextPath}`);