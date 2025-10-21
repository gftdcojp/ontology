/**
 * DM2 Data Groups Meta Model
 * Based on DoDAF Meta Model 2 (DM2) Data Dictionary
 */

import type { ElementType, RelationshipType } from '../types/dodaf';
import type { MetaModelClass } from './meta-model-types';

// DM2 Principal Architectural Constructs
export const DM2_PRINCIPAL_METAMODEL: Partial<Record<ElementType, MetaModelClass>> = {
  // Performers: Any entity - human, automated, or any aggregation of human and/or automated - that performs an activity and provides a capability.
  Performer: {
    name: 'Performer',
    description: 'Any entity - human, automated, or any aggregation of human and/or automated - that performs an activity and provides a capability',
    properties: [
      {
        name: 'performerType',
        type: 'string',
        required: false,
        description: 'Type of performer (human, automated, hybrid)'
      },
      {
        name: 'capabilities',
        type: 'array',
        required: false,
        description: 'Capabilities provided by this performer'
      },
      {
        name: 'activities',
        type: 'array',
        required: false,
        description: 'Activities performed by this performer'
      },
      {
        name: 'resources',
        type: 'array',
        required: false,
        description: 'Resources used by this performer'
      }
    ],
    constraints: []
  },

  // Resource Flows: The behavioral and structural representation of the interactions between Activities (which are performed by Performers) that is both temporal and results in the flow or exchange of objects such as information, data, materiel, and performers.
  ResourceFlow: {
    name: 'ResourceFlow',
    description: 'The behavioral and structural representation of the interactions between Activities that is both temporal and results in the flow or exchange of objects such as information, data, materiel, and performers',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of resource flow (information, data, materiel, performer)'
      },
      {
        name: 'sourceActivity',
        type: 'string',
        required: false,
        description: 'Source activity of the flow'
      },
      {
        name: 'targetActivity',
        type: 'string',
        required: false,
        description: 'Target activity of the flow'
      },
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: 'Type of resource being transferred'
      },
      {
        name: 'quantity',
        type: 'string',
        required: false,
        description: 'Quantity or volume of the resource flow'
      },
      {
        name: 'temporalConstraints',
        type: 'array',
        required: false,
        description: 'Temporal constraints on the flow'
      }
    ],
    constraints: []
  },

  // Rules: How rules, standards, agreements, constraints, and regulations and are relevant to architectures. A principle or condition that governs behavior; a prescribed guide for conduct or action.
  Rule: {
    name: 'Rule',
    description: 'A principle or condition that governs behavior; a prescribed guide for conduct or action. Rules, standards, agreements, constraints, and regulations relevant to architectures',
    properties: [
      {
        name: 'ruleType',
        type: 'string',
        required: false,
        description: 'Type of rule (standard, agreement, constraint, regulation)'
      },
      {
        name: 'authority',
        type: 'string',
        required: false,
        description: 'Authority that defines the rule'
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: 'Scope of application for the rule'
      },
      {
        name: 'enforcementLevel',
        type: 'string',
        required: false,
        description: 'Level of enforcement (mandatory, recommended, optional)'
      },
      {
        name: 'complianceRequirements',
        type: 'array',
        required: false,
        description: 'Requirements for compliance with the rule'
      }
    ],
    constraints: []
  },

  // Goals: How goals, visions, objectives, and effects relate and bear on architectures. A desired state of a Resource.
  Goal: {
    name: 'Goal',
    description: 'A desired state of a Resource. How goals, visions, objectives, and effects relate and bear on architectures',
    properties: [
      {
        name: 'goalType',
        type: 'string',
        required: false,
        description: 'Type of goal (vision, objective, effect)'
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: 'Priority level of the goal'
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: 'Timeframe for achieving the goal'
      },
      {
        name: 'measures',
        type: 'array',
        required: false,
        description: 'Measures for tracking goal achievement'
      },
      {
        name: 'relatedResources',
        type: 'array',
        required: false,
        description: 'Resources affected by this goal'
      }
    ],
    constraints: []
  },

  // Project: All forms of planned activities that are responsive to visions, goals, and objectives that aim to change the state of some situation. A temporary endeavor undertaken to create Resources or Desired Effects.
  Project: {
    name: 'Project',
    description: 'A temporary endeavor undertaken to create Resources or Desired Effects. All forms of planned activities that are responsive to visions, goals, and objectives that aim to change the state of some situation',
    properties: [
      {
        name: 'projectType',
        type: 'string',
        required: false,
        description: 'Type of project'
      },
      {
        name: 'startDate',
        type: 'date',
        required: false,
        description: 'Project start date'
      },
      {
        name: 'endDate',
        type: 'date',
        required: false,
        description: 'Project end date'
      },
      {
        name: 'budget',
        type: 'string',
        required: false,
        description: 'Project budget'
      },
      {
        name: 'stakeholders',
        type: 'array',
        required: false,
        description: 'Project stakeholders'
      },
      {
        name: 'deliverables',
        type: 'array',
        required: false,
        description: 'Project deliverables'
      },
      {
        name: 'goals',
        type: 'array',
        required: false,
        description: 'Goals this project aims to achieve'
      }
    ],
    constraints: []
  },

  // Reification: The process of reifying or to regard (something abstract) as a material or concrete thing. Reification, in DoDAF 2, is used to introduce the concept of the varying levels of architectural descriptions or refinement and traceability between the levels.
  Reification: {
    name: 'Reification',
    description: 'The process of reifying or to regard something abstract as a material or concrete thing. Used to introduce the concept of varying levels of architectural descriptions or refinement and traceability between the levels',
    properties: [
      {
        name: 'abstractionLevel',
        type: 'string',
        required: false,
        description: 'Level of abstraction (conceptual, logical, physical)'
      },
      {
        name: 'sourceAbstraction',
        type: 'string',
        required: false,
        description: 'Source abstraction level'
      },
      {
        name: 'targetAbstraction',
        type: 'string',
        required: false,
        description: 'Target abstraction level'
      },
      {
        name: 'refinementType',
        type: 'string',
        required: false,
        description: 'Type of refinement or reification'
      },
      {
        name: 'traceabilityLinks',
        type: 'array',
        required: false,
        description: 'Traceability links between abstraction levels'
      }
    ],
    constraints: []
  }
};

// DM2 Supporting Architectural Constructs
export const DM2_SUPPORTING_METAMODEL: Partial<Record<ElementType, MetaModelClass>> = {
  // Measures: All form of measures (metrics) applicable to architectures including needs satisfaction measures, performance measures, interoperability measures, organizational measures, and resource physical measures (e.g., mass.). The magnitude of some attribute of an individual.
  Measure: {
    name: 'Measure',
    description: 'The magnitude of some attribute of an individual. All forms of measures (metrics) applicable to architectures including needs satisfaction, performance, interoperability, organizational, and resource physical measures',
    properties: [
      {
        name: 'measureType',
        type: 'string',
        required: false,
        description: 'Type of measure (performance, interoperability, organizational, resource)'
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: 'Unit of measurement'
      },
      {
        name: 'value',
        type: 'number',
        required: false,
        description: 'Measured value'
      },
      {
        name: 'targetValue',
        type: 'number',
        required: false,
        description: 'Target value for the measure'
      },
      {
        name: 'threshold',
        type: 'number',
        required: false,
        description: 'Threshold value'
      },
      {
        name: 'measurementMethod',
        type: 'string',
        required: false,
        description: 'Method used for measurement'
      },
      {
        name: 'collectionFrequency',
        type: 'string',
        required: false,
        description: 'Frequency of measurement collection'
      }
    ],
    constraints: []
  },

  // Locations: A point or extent in space that may be referred to physically or logically.
  Location: {
    name: 'Location',
    description: 'A point or extent in space that may be referred to physically or logically',
    properties: [
      {
        name: 'locationType',
        type: 'string',
        required: false,
        description: 'Type of location (physical, logical, geographical)'
      },
      {
        name: 'coordinates',
        type: 'string',
        required: false,
        description: 'Geographical coordinates'
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: 'Physical address'
      },
      {
        name: 'logicalReference',
        type: 'string',
        required: false,
        description: 'Logical reference or identifier'
      },
      {
        name: 'boundaries',
        type: 'array',
        required: false,
        description: 'Boundaries of the location extent'
      },
      {
        name: 'containedLocations',
        type: 'array',
        required: false,
        description: 'Locations contained within this location'
      }
    ],
    constraints: []
  },

  // Pedigree: The origin and the history of something; broadly: background, history.
  Pedigree: {
    name: 'Pedigree',
    description: 'The origin and the history of something; broadly: background, history',
    properties: [
      {
        name: 'origin',
        type: 'string',
        required: false,
        description: 'Origin of the element'
      },
      {
        name: 'creationDate',
        type: 'date',
        required: false,
        description: 'Date of creation'
      },
      {
        name: 'author',
        type: 'string',
        required: false,
        description: 'Author or creator'
      },
      {
        name: 'versionHistory',
        type: 'array',
        required: false,
        description: 'Version history'
      },
      {
        name: 'modificationHistory',
        type: 'array',
        required: false,
        description: 'Modification history'
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: 'Source of the information'
      },
      {
        name: 'reliability',
        type: 'string',
        required: false,
        description: 'Reliability assessment'
      },
      {
        name: 'confidence',
        type: 'string',
        required: false,
        description: 'Confidence level in the information'
      }
    ],
    constraints: []
  }
};

// DM2 Relationship Meta Model
export const DM2_RELATIONSHIP_METAMODEL: Partial<Record<RelationshipType, MetaModelClass>> = {
  // Principal Architectural Constructs Relationships
  PerformerRelationship: {
    name: 'PerformerRelationship',
    description: 'Relationship between performers in the architecture',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of relationship between performers'
      }
    ],
    constraints: []
  },

  ResourceFlowRelationship: {
    name: 'ResourceFlowRelationship',
    description: 'Relationship between resource flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of relationship between resource flows'
      }
    ],
    constraints: []
  },

  RuleRelationship: {
    name: 'RuleRelationship',
    description: 'Relationship between rules and other architectural elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of relationship (governs, constrains, enables)'
      }
    ],
    constraints: []
  },

  GoalRelationship: {
    name: 'GoalRelationship',
    description: 'Relationship between goals and other architectural elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of relationship (supports, achieves, conflicts)'
      }
    ],
    constraints: []
  },

  CapabilityRelationship: {
    name: 'CapabilityRelationship',
    description: 'Relationship between capabilities',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of capability relationship'
      }
    ],
    constraints: []
  },

  ProjectRelationship: {
    name: 'ProjectRelationship',
    description: 'Relationship between projects and other elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of project relationship'
      }
    ],
    constraints: []
  },

  ReificationRelationship: {
    name: 'ReificationRelationship',
    description: 'Relationship representing reification between abstraction levels',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of reification relationship'
      },
      {
        name: 'abstractionLevels',
        type: 'array',
        required: false,
        description: 'Abstraction levels involved'
      }
    ],
    constraints: []
  },

  // Supporting Architectural Constructs Relationships
  MeasureRelationship: {
    name: 'MeasureRelationship',
    description: 'Relationship between measures and measured elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of measure relationship (measures, tracks, evaluates)'
      }
    ],
    constraints: []
  },

  LocationRelationship: {
    name: 'LocationRelationship',
    description: 'Relationship between locations and located elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of location relationship (located_at, contains, borders)'
      }
    ],
    constraints: []
  },

  PedigreeRelationship: {
    name: 'PedigreeRelationship',
    description: 'Relationship between pedigree information and elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of pedigree relationship (created_by, modified_by, sourced_from)'
      }
    ],
    constraints: []
  }
};
