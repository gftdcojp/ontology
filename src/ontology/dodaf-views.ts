import type { View, Product } from '../types/dodaf';

/**
 * DoDAF 2.0 Standard Views and Products Definition
 * Based on DoD Architecture Framework Version 2.0
 */

// All Views (AV) - Integrated Architecture View
export const AV_PRODUCTS: Omit<Product, 'id' | 'viewId'>[] = [
  {
    number: 'AV-1',
    name: 'Overview and Summary Information',
    description: 'Executive-level summary of the architecture',
    purpose: 'Provide executive-level summary of the architecture',
    elements: [],
    relationships: []
  },
  {
    number: 'AV-2',
    name: 'Integrated Dictionary',
    description: 'Architecture data repository with definitions',
    purpose: 'Define and bound the architecture data',
    elements: [],
    relationships: []
  }
];

// Operational View (OV)
export const OV_PRODUCTS: Omit<Product, 'id' | 'viewId'>[] = [
  {
    number: 'OV-1',
    name: 'High-Level Operational Concept Graphic',
    description: 'High-level graphical and textual description of operational concept',
    purpose: 'Describe the operational concept',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-2',
    name: 'Operational Resource Flow Description',
    description: 'Operational resource flows and operational activities',
    purpose: 'Describe resource flows between operational activities',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-3',
    name: 'Operational Resource Flow Matrix',
    description: 'Tabular description of resource flows',
    purpose: 'Describe resource flows in tabular format',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-4',
    name: 'Organizational Relationships Chart',
    description: 'Organizational structures and relationships',
    purpose: 'Describe organizational structures',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-5a',
    name: 'Operational Activity Decomposition Tree',
    description: 'Hierarchical decomposition of operational activities',
    purpose: 'Decompose operational activities hierarchically',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-5b',
    name: 'Operational Activity Model',
    description: 'Control flows between operational activities',
    purpose: 'Describe control flows and relationships',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-6a',
    name: 'Operational Rules Model',
    description: 'Business rules that constrain operations',
    purpose: 'Describe operational rules and constraints',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-6b',
    name: 'Operational State Transition Description',
    description: 'State transitions of operational activities',
    purpose: 'Describe operational state transitions',
    elements: [],
    relationships: []
  },
  {
    number: 'OV-6c',
    name: 'Operational Event-Trace Description',
    description: 'Event traces through operational activities',
    purpose: 'Describe operational event traces',
    elements: [],
    relationships: []
  }
];

// Systems View (SV)
export const SV_PRODUCTS: Omit<Product, 'id' | 'viewId'>[] = [
  {
    number: 'SV-1',
    name: 'Systems Interface Description',
    description: 'System interfaces and their attributes',
    purpose: 'Describe system interfaces',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-2',
    name: 'Systems Resource Flow Description',
    description: 'System resource flows',
    purpose: 'Describe system resource flows',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-3',
    name: 'Systems-Systems Matrix',
    description: 'Tabular description of system interfaces',
    purpose: 'Describe system interfaces in matrix format',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-4',
    name: 'Systems Functionality Description',
    description: 'Functions performed by systems',
    purpose: 'Describe system functionality',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-5',
    name: 'Operational Activity to Systems Function Traceability Matrix',
    description: 'Traceability between operational activities and system functions',
    purpose: 'Map operational activities to system functions',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-6',
    name: 'Systems Resource Flow Matrix',
    description: 'Tabular description of system resource flows',
    purpose: 'Describe system resource flows in matrix format',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-7',
    name: 'Systems Measures Matrix',
    description: 'System performance measures',
    purpose: 'Describe system performance measures',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-8',
    name: 'Systems Evolution Description',
    description: 'Planned system evolution',
    purpose: 'Describe planned system changes over time',
    elements: [],
    relationships: []
  },
  {
    number: 'SV-9',
    name: 'Systems Technology and Skills Forecast',
    description: 'Technology and skills required',
    purpose: 'Describe technology and skills forecasts',
    elements: [],
    relationships: []
  }
];

// Technical Standards View (TV)
export const TV_PRODUCTS: Omit<Product, 'id' | 'viewId'>[] = [
  {
    number: 'TV-1',
    name: 'Technical Standards Profile',
    description: 'Technical standards applicable to the architecture',
    purpose: 'Identify technical standards',
    elements: [],
    relationships: []
  },
  {
    number: 'TV-2',
    name: 'Technical Standards Forecast',
    description: 'Forecast of technical standards evolution',
    purpose: 'Describe evolution of technical standards',
    elements: [],
    relationships: []
  }
];

// Data and Information View (DIV)
export const DIV_PRODUCTS: Omit<Product, 'id' | 'viewId'>[] = [
  {
    number: 'DIV-1',
    name: 'Conceptual Data Model',
    description: 'Conceptual data model',
    purpose: 'Describe data concepts and their relationships',
    elements: [],
    relationships: []
  },
  {
    number: 'DIV-2',
    name: 'Logical Data Model',
    description: 'Logical data model',
    purpose: 'Describe logical data structures',
    elements: [],
    relationships: []
  },
  {
    number: 'DIV-3',
    name: 'Physical Data Model',
    description: 'Physical data model',
    purpose: 'Describe physical data structures',
    elements: [],
    relationships: []
  }
];

// Standard Views Definition
export const DODAF_VIEWS: Omit<View, 'id' | 'products'>[] = [
  {
    type: 'AV',
    name: 'All Views',
    description: 'Integrated Architecture View',
    purpose: 'Provide overarching architecture information'
  },
  {
    type: 'OV',
    name: 'Operational View',
    description: 'Operational View',
    purpose: 'Describe operational aspects of the architecture'
  },
  {
    type: 'SV',
    name: 'Systems View',
    description: 'Systems View',
    purpose: 'Describe system aspects of the architecture'
  },
  {
    type: 'TV',
    name: 'Technical Standards View',
    description: 'Technical Standards View',
    purpose: 'Describe technical standards aspects'
  },
  {
    type: 'DIV',
    name: 'Data and Information View',
    description: 'Data and Information View',
    purpose: 'Describe data and information aspects'
  }
];

// Helper function to get products for a view type
export function getProductsForView(viewType: string): Omit<Product, 'id' | 'viewId'>[] {
  switch (viewType) {
    case 'AV':
      return AV_PRODUCTS;
    case 'OV':
      return OV_PRODUCTS;
    case 'SV':
      return SV_PRODUCTS;
    case 'TV':
      return TV_PRODUCTS;
    case 'DIV':
      return DIV_PRODUCTS;
    default:
      return [];
  }
}
