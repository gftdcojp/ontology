/**
 * DoDAF 2.0 Ontology Types
 * Based on DoD Architecture Framework Version 2.0
 */

export type ViewType = 'AV' | 'OV' | 'SV' | 'TV' | 'DIV';

export type ViewName =
  | 'All Views'
  | 'Operational View'
  | 'Systems View'
  | 'Technical Standards View'
  | 'Data and Information View';

export interface View {
  id: string;
  type: ViewType;
  name: ViewName;
  description: string;
  purpose: string;
  products: Product[];
}

export interface Product {
  id: string;
  viewId: string;
  number: string; // e.g., "OV-1", "SV-1"
  name: string;
  description: string;
  purpose: string;
  elements: Element[];
  relationships: Relationship[];
}

export interface Element {
  id: string;
  productId: string;
  type: string;
  name: string;
  description: string;
  properties: Record<string, any>;
  metadata?: ElementMetadata;
}

export interface ElementMetadata {
  created: string;
  modified: string;
  author: string;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

export interface Relationship {
  id: string;
  productId: string;
  type: string;
  name: string;
  description: string;
  sourceId: string;
  targetId: string;
  properties: Record<string, any>;
}

export interface DoDAFArchitecture {
  id: string;
  name: string;
  description: string;
  version: string;
  views: View[];
  metadata: ArchitectureMetadata;
}

export interface ArchitectureMetadata {
  created: string;
  modified: string;
  author: string;
  organization: string;
  classification: string;
  purpose: string;
}
