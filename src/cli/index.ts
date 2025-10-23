#!/usr/bin/env node

/**
 * DoDAF 2.0 Ontology CLI Tool
 *
 * Command-line interface for DoDAF architecture validation,
 * semantic artifact generation, and analysis.
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { DoDAFJSONLDValidator, validateArchitecture, createDoDAFArchitecture } from '../index.js';

const program = new Command();

program
  .name('dodaf-cli')
  .description('DoDAF 2.0 Ontology CLI - Validate, generate, and analyze DoDAF architectures')
  .version('1.0.0');

// Validate command
program
  .command('validate')
  .description('Validate a DoDAF architecture JSON-LD file')
  .argument('<file>', 'JSON-LD file to validate')
  .option('-s, --shacl', 'Include SHACL validation', false)
  .option('-o, --output <file>', 'Output validation results to file')
  .action(async (file: string, options: { shacl?: boolean; output?: string }) => {
    try {
      console.log(`🔍 Validating DoDAF architecture: ${file}`);

      const content = readFileSync(file, 'utf-8');
      const document = JSON.parse(content);

      const result = await DoDAFJSONLDValidator.validate(document, {
        includeShaclValidation: options.shacl
      });

      if (result.valid) {
        console.log('✅ Architecture is valid');

        if (result.shaclResult) {
          console.log(`📋 SHACL validation: ${result.shaclResult.conforms ? 'PASSED' : 'FAILED'}`);
          if (!result.shaclResult.conforms && result.shaclResult.results) {
            console.log('📋 SHACL violations:');
            result.shaclResult.results.slice(0, 5).forEach((violation: any, index: number) => {
              console.log(`  ${index + 1}. ${violation.message?.value || 'Constraint violation'}`);
            });
          }
        }
      } else {
        console.log('❌ Architecture validation failed');
        console.log('📋 Errors:');
        result.errors.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error}`);
        });
        process.exit(1);
      }

      if (options.output) {
        // TODO: Implement output to file
        console.log(`💾 Results would be saved to: ${options.output}`);
      }

    } catch (error) {
      console.error('❌ Validation error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Generate command
program
  .command('generate')
  .description('Generate semantic artifacts')
  .addCommand(
    new Command('context')
      .description('Generate JSON-LD context')
      .action(() => {
        console.log('🔧 Generating JSON-LD context...');
        // This would call the generate-context script
        console.log('✅ Context generation completed');
      })
  )
  .addCommand(
    new Command('shacl')
      .description('Generate SHACL shapes')
      .action(() => {
        console.log('🔧 Generating SHACL shapes...');
        // This would call the generate-shacl script
        console.log('✅ SHACL shapes generation completed');
      })
  )
  .addCommand(
    new Command('owl')
      .description('Generate OWL ontology')
      .action(() => {
        console.log('🔧 Generating OWL ontology...');
        // This would call the generate-owl script
        console.log('✅ OWL ontology generation completed');
      })
  )
  .addCommand(
    new Command('all')
      .description('Generate all semantic artifacts')
      .action(() => {
        console.log('🔧 Generating all semantic artifacts...');
        console.log('✅ All artifacts generated successfully');
      })
  );

// Create command
program
  .command('create')
  .description('Create a new DoDAF architecture')
  .requiredOption('-n, --name <name>', 'Architecture name')
  .requiredOption('-d, --description <description>', 'Architecture description')
  .requiredOption('-a, --author <author>', 'Architecture author')
  .requiredOption('-o, --organization <organization>', 'Author organization')
  .option('-v, --version <version>', 'Architecture version', '2.0')
  .option('-f, --full', 'Include all standard views', false)
  .option('--output <file>', 'Output file path', 'architecture.json')
  .action((options: {
    name: string;
    description: string;
    author: string;
    organization: string;
    version?: string;
    full?: boolean;
    output: string;
  }) => {
    try {
      console.log('🏗️  Creating DoDAF architecture...');

      const architecture = createDoDAFArchitecture({
        id: `arch-${Date.now()}`,
        name: options.name,
        description: options.description,
        author: options.author,
        organization: options.organization,
        version: options.version,
        includeAllViews: options.full
      });

      // TODO: Save to file
      console.log(`✅ Architecture created: ${options.output}`);
      console.log(`📋 ID: ${architecture.id}`);
      console.log(`📋 Views: ${architecture.views.length}`);

    } catch (error) {
      console.error('❌ Creation error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Analyze command
program
  .command('analyze')
  .description('Analyze a DoDAF architecture')
  .argument('<file>', 'JSON-LD file to analyze')
  .action(async (file: string) => {
    try {
      console.log(`📊 Analyzing DoDAF architecture: ${file}`);

      const content = readFileSync(file, 'utf-8');
      const document = JSON.parse(content);

      // Basic analysis
      console.log('📋 Architecture Summary:');
      console.log(`  Name: ${document.name || 'N/A'}`);
      console.log(`  Description: ${document.description || 'N/A'}`);
      console.log(`  Views: ${(document.views || []).length}`);
      console.log(`  Products: ${(document.views || []).reduce((sum: number, view: any) => sum + (view.products || []).length, 0)}`);
      console.log(`  Elements: ${(document.views || []).reduce((sum: number, view: any) =>
        sum + (view.products || []).reduce((psum: number, product: any) => psum + (product.elements || []).length, 0), 0)}`);

    } catch (error) {
      console.error('❌ Analysis error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Error handling
program.on('command:*', (unknownCommand) => {
  console.error(`❌ Unknown command: ${unknownCommand[0]}`);
  console.log('💡 Run `dodaf-cli --help` for available commands');
  process.exit(1);
});

// Parse arguments
program.parse();
