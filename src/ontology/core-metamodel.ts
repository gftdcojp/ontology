/**
 * DoDAF DM2 Core Meta Model
 * Foundation concepts from DoDAF DM2 ontology
 */

import type { MetaModelClass } from './meta-model-types';

// Core DoDAF DM2 Foundation Concepts
export const CORE_METAMODEL: Record<string, MetaModelClass> = {
  // Basic ontological foundations
  Thing: {
    name: 'Thing',
    description: 'The union of Individual, Type, and tuple.',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  Individual: {
    name: 'Individual',
    description: 'A Thing that has spatio-temporal extent. Note - this may be something that existed in the past, exists now, or may exist in some future possible world.',
    superClass: 'Thing',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  Type: {
    name: 'Type',
    description: 'A set (or class) of Things. Note1: Types are identified by their members (i.e. all the things of that type). Note2: The IDEAS Foundation is a higher-order ontology, so Types may have members that are also Types.',
    superClass: 'Thing',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Tuple and relationship concepts
  Tuple: {
    name: 'tuple',
    description: 'A relationship between two or more things. Note: Tuples are identified by their places (i.e. the ends of the relationship).',
    superClass: 'Thing',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  Couple: {
    name: 'couple',
    description: 'An ordered relationship (tuple) between two Things, i.e., that has two place positions.',
    superClass: 'tuple',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Type hierarchy concepts
  IndividualType: {
    name: 'IndividualType',
    description: 'The powertype of Individual.',
    superClass: 'Type',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  CoupleType: {
    name: 'CoupleType',
    description: 'A couple in which the places are taken by Types only.',
    superClass: 'TupleType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  TupleType: {
    name: 'TupleType',
    description: 'The powertype of tuple that provides the stereotype for tuples of Types.',
    superClass: 'Type',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Property concepts
  Property: {
    name: 'Property',
    description: 'An IndividualType whose members all exhibit a common trait or feature. Often the Individuals are states having a property (the state of being 18 degrees centigrade), where this property can be a CategoricalProperty (qv.) or a DispositionalProperty (qv.).',
    superClass: 'IndividualType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  PropertyType: {
    name: 'PropertyType',
    description: 'The Powertype of Property.',
    superClass: 'IndividualTypeType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  IndividualTypeType: {
    name: 'IndividualTypeType',
    description: 'A PlaceableType that is the Powertype of IndividualType',
    superClass: 'Type',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  Powertype: {
    name: 'Powertype',
    description: 'A Type that is the is the set (i.e., Type) of all subsets (i.e., subTypes) that can be taken over the some Type.',
    superClass: 'Type',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Whole-part relationships
  WholePartType: {
    name: 'WholePartType',
    description: 'A coupleType that asserts one Type (the part) has members that have a whole-part relation with a member of the other Type (whole).',
    superClass: 'CoupleType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Time-related concepts
  TemporalWholePartType: {
    name: 'TemporalWholePartType',
    description: 'A couple between two Individual Types where for each member of the whole set, there is a corresponding member of the part set for which a wholePart relationship exists, and conversely',
    superClass: 'WholePartType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  TemporalBoundaryType: {
    name: 'TemporalBoundaryType',
    description: 'The start and end times for the Individual members of a Type.',
    superClass: 'TemporalWholePartType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Measurement concepts
  Measure: {
    name: 'Measure',
    description: 'The magnitude of some attribute of an individual.',
    superClass: 'Property',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  MeasureType: {
    name: 'MeasureType',
    description: 'A category of Measures',
    superClass: 'IndividualTypeType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  PhysicalMeasure: {
    name: 'PhysicalMeasure',
    description: 'A category of measures of spatio-temporal extent of an Individual such as length, mass, energy, velocity, …',
    superClass: 'Measure',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  PhysicalMeasureType: {
    name: 'PhysicalMeasureType',
    description: 'The Powertype of PhysicalMeasure.',
    superClass: 'MeasureType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Representation concepts
  SignType: {
    name: 'SignType',
    description: 'An IndividualType that is the Powertype of Sign.',
    superClass: 'IndividualType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  Sign: {
    name: 'Sign',
    description: 'An Individual that signifies a Thing.',
    superClass: 'Individual',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  SignTypeType: {
    name: 'SignTypeType',
    description: 'The Powertype of SignType.',
    superClass: 'IndividualTypeType',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  },

  // Root class
  EARootClass: {
    name: 'EARootClass',
    description: 'EARootClass class',
    properties: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Human-readable name'
      }
    ],
    constraints: []
  }
};

// Core relationship types
export const CORE_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
  Association: {
    name: 'Association',
    description: 'A general association between elements',
    properties: [],
    constraints: []
  },

  Aggregation: {
    name: 'Aggregation',
    description: 'A whole-part relationship',
    properties: [
      {
        name: 'multiplicity',
        type: 'string',
        required: false,
        description: 'Multiplicity of the aggregation'
      }
    ],
    constraints: []
  },

  Composition: {
    name: 'Composition',
    description: 'Strong whole-part relationship',
    properties: [],
    constraints: []
  },

  Generalization: {
    name: 'Generalization',
    description: 'Inheritance relationship',
    properties: [],
    constraints: []
  },

  Dependency: {
    name: 'Dependency',
    description: 'Dependency relationship',
    properties: [],
    constraints: []
  },

  Realization: {
    name: 'Realization',
    description: 'Realization relationship',
    properties: [],
    constraints: []
  }
};
