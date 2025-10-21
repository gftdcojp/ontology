/**
 * DoDAF 2.0 Logical Meta Model
 * Logical domain elements and relationships
 */

import type { MetaModelClass } from './meta-model-types';

// Logical Model Elements
export const LOGICAL_METAMODEL: Record<string, MetaModelClass> = {
  // Logical Model Elements (詳細統合)
  LogicalArchitecture: {
    name: 'LogicalArchitecture',
    description: 'Logical architecture representing system structure and behavior',
    superClass: 'Element',
    properties: [
      {
        name: 'architectureType',
        type: 'string',
        required: false,
        description: 'Type of logical architecture'
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: 'Logical components in the architecture'
      },
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'Logical interfaces in the architecture'
      },
      {
        name: 'flows',
        type: 'array',
        required: false,
        description: 'Logical flows in the architecture'
      },
      {
        name: 'constraints',
        type: 'array',
        required: false,
        description: 'Logical constraints in the architecture'
      }
    ],
    constraints: []
  },

  LogicalActivity: {
    name: 'LogicalActivity',
    description: 'Logical activity representing a unit of work',
    superClass: 'Element',
    properties: [
      {
        name: 'activityType',
        type: 'string',
        required: false,
        description: 'Type of logical activity'
      },
      {
        name: 'inputs',
        type: 'array',
        required: false,
        description: 'Inputs required for the activity'
      },
      {
        name: 'outputs',
        type: 'array',
        required: false,
        description: 'Outputs produced by the activity'
      },
      {
        name: 'performer',
        type: 'string',
        required: false,
        description: 'Performer of the activity'
      },
      {
        name: 'preConditions',
        type: 'array',
        required: false,
        description: 'Pre-conditions for the activity'
      },
      {
        name: 'postConditions',
        type: 'array',
        required: false,
        description: 'Post-conditions for the activity'
      }
    ],
    constraints: []
  },

  LogicalPerformer: {
    name: 'LogicalPerformer',
    description: 'Logical performer that executes activities',
    superClass: 'Element',
    properties: [
      {
        name: 'performerType',
        type: 'string',
        required: false,
        description: 'Type of logical performer'
      },
      {
        name: 'activities',
        type: 'array',
        required: false,
        description: 'Activities performed by this performer'
      },
      {
        name: 'capabilities',
        type: 'array',
        required: false,
        description: 'Capabilities of the performer'
      },
      {
        name: 'resources',
        type: 'array',
        required: false,
        description: 'Resources used by the performer'
      }
    ],
    constraints: []
  },

  LogicalResource: {
    name: 'LogicalResource',
    description: 'Logical resource used in activities',
    superClass: 'Element',
    properties: [
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: 'Type of logical resource'
      },
      {
        name: 'resourceCategory',
        type: 'string',
        required: false,
        description: 'Category of the resource'
      },
      {
        name: 'consumers',
        type: 'array',
        required: false,
        description: 'Activities that consume this resource'
      },
      {
        name: 'producers',
        type: 'array',
        required: false,
        description: 'Activities that produce this resource'
      }
    ],
    constraints: []
  },

  LogicalSystem: {
    name: 'LogicalSystem',
    description: 'Logical system representing a collection of components',
    superClass: 'Element',
    properties: [
      {
        name: 'systemType',
        type: 'string',
        required: false,
        description: 'Type of logical system'
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: 'Components in the system'
      },
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'Interfaces provided by the system'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions performed by the system'
      }
    ],
    constraints: []
  },

  LogicalInterface: {
    name: 'LogicalInterface',
    description: 'Logical interface defining interaction points',
    superClass: 'Element',
    properties: [
      {
        name: 'interfaceType',
        type: 'string',
        required: false,
        description: 'Type of logical interface'
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: 'Communication protocol'
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: 'Operations provided by the interface'
      },
      {
        name: 'dataTypes',
        type: 'array',
        required: false,
        description: 'Data types exchanged through the interface'
      }
    ],
    constraints: []
  },

  LogicalNode: {
    name: 'LogicalNode',
    description: 'Logical node representing a processing location',
    superClass: 'Element',
    properties: [
      {
        name: 'nodeType',
        type: 'string',
        required: false,
        description: 'Type of logical node'
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: 'Physical or logical location'
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: 'Components hosted by the node'
      },
      {
        name: 'connectors',
        type: 'array',
        required: false,
        description: 'Connectors to other nodes'
      }
    ],
    constraints: []
  },

  LogicalFlow: {
    name: 'LogicalFlow',
    description: 'Logical flow representing data or control flow',
    superClass: 'Element',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of logical flow'
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: 'Source of the flow'
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: 'Target of the flow'
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: 'Content or type of data flowing'
      }
    ],
    constraints: []
  },

  LogicalConstraint: {
    name: 'LogicalConstraint',
    description: 'Logical constraint on system behavior or structure',
    superClass: 'Element',
    properties: [
      {
        name: 'constraintType',
        type: 'string',
        required: false,
        description: 'Type of logical constraint'
      },
      {
        name: 'expression',
        type: 'string',
        required: false,
        description: 'Constraint expression'
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: 'Scope of the constraint'
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: 'Severity level of the constraint'
      }
    ],
    constraints: []
  },

  LogicalComponent: {
    name: 'LogicalComponent',
    description: 'Logical component representing a system part',
    superClass: 'Element',
    properties: [
      {
        name: 'componentType',
        type: 'string',
        required: false,
        description: 'Type of logical component'
      },
      {
        name: 'interfaces',
        type: 'array',
        required: false,
        description: 'Interfaces provided by the component'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions performed by the component'
      },
      {
        name: 'dependencies',
        type: 'array',
        required: false,
        description: 'Dependencies on other components'
      }
    ],
    constraints: []
  },

  LogicalService: {
    name: 'LogicalService',
    description: 'Logical service providing business functionality',
    superClass: 'Element',
    properties: [
      {
        name: 'serviceType',
        type: 'string',
        required: false,
        description: 'Type of logical service'
      },
      {
        name: 'serviceLevel',
        type: 'string',
        required: false,
        description: 'Service level agreement'
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: 'Operations provided by the service'
      },
      {
        name: 'contracts',
        type: 'array',
        required: false,
        description: 'Service contracts'
      }
    ],
    constraints: []
  },

  LogicalDataFlow: {
    name: 'LogicalDataFlow',
    description: 'Logical data flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'dataType',
        type: 'string',
        required: false,
        description: 'Type of data flowing'
      },
      {
        name: 'dataFormat',
        type: 'string',
        required: false,
        description: 'Format of the data'
      },
      {
        name: 'dataSize',
        type: 'string',
        required: false,
        description: 'Size or volume of data'
      }
    ],
    constraints: []
  },

  LogicalControlFlow: {
    name: 'LogicalControlFlow',
    description: 'Logical control flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'controlType',
        type: 'string',
        required: false,
        description: 'Type of control flow'
      },
      {
        name: 'triggerCondition',
        type: 'string',
        required: false,
        description: 'Condition that triggers the flow'
      }
    ],
    constraints: []
  },

  LogicalInformationFlow: {
    name: 'LogicalInformationFlow',
    description: 'Logical information flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'informationType',
        type: 'string',
        required: false,
        description: 'Type of information flowing'
      },
      {
        name: 'informationCategory',
        type: 'string',
        required: false,
        description: 'Category of information'
      },
      {
        name: 'securityClassification',
        type: 'string',
        required: false,
        description: 'Security classification of information'
      }
    ],
    constraints: []
  },

  LogicalPhysicalFlow: {
    name: 'LogicalPhysicalFlow',
    description: 'Logical physical flow between components',
    superClass: 'LogicalFlow',
    properties: [
      {
        name: 'physicalType',
        type: 'string',
        required: false,
        description: 'Type of physical flow'
      },
      {
        name: 'medium',
        type: 'string',
        required: false,
        description: 'Physical medium used for flow'
      },
      {
        name: 'bandwidth',
        type: 'string',
        required: false,
        description: 'Bandwidth requirement'
      }
    ],
    constraints: []
  },

  LogicalOperationalActivity: {
    name: 'LogicalOperationalActivity',
    description: 'Logical operational activity in business processes',
    superClass: 'LogicalActivity',
    properties: [
      {
        name: 'businessProcess',
        type: 'string',
        required: false,
        description: 'Business process this activity belongs to'
      },
      {
        name: 'lane',
        type: 'string',
        required: false,
        description: 'Swim lane or organizational unit'
      },
      {
        name: 'milestone',
        type: 'boolean',
        required: false,
        description: 'Whether this is a milestone activity'
      }
    ],
    constraints: []
  },

  LogicalSystemFunction: {
    name: 'LogicalSystemFunction',
    description: 'Logical system function performed by components',
    superClass: 'Element',
    properties: [
      {
        name: 'functionType',
        type: 'string',
        required: false,
        description: 'Type of system function'
      },
      {
        name: 'inputs',
        type: 'array',
        required: false,
        description: 'Inputs required for the function'
      },
      {
        name: 'outputs',
        type: 'array',
        required: false,
        description: 'Outputs produced by the function'
      },
      {
        name: 'performanceRequirements',
        type: 'array',
        required: false,
        description: 'Performance requirements for the function'
      }
    ],
    constraints: []
  },

  LogicalDataStructure: {
    name: 'LogicalDataStructure',
    description: 'Logical data structure definition',
    superClass: 'Element',
    properties: [
      {
        name: 'structureType',
        type: 'string',
        required: false,
        description: 'Type of data structure'
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: 'Fields in the data structure'
      },
      {
        name: 'relationships',
        type: 'array',
        required: false,
        description: 'Relationships to other data structures'
      }
    ],
    constraints: []
  },

  LogicalBusinessRule: {
    name: 'LogicalBusinessRule',
    description: 'Logical business rule governing system behavior',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'ruleType',
        type: 'string',
        required: false,
        description: 'Type of business rule'
      },
      {
        name: 'ruleCategory',
        type: 'string',
        required: false,
        description: 'Category of business rule'
      },
      {
        name: 'enforcementLevel',
        type: 'string',
        required: false,
        description: 'Level of rule enforcement'
      }
    ],
    constraints: []
  },

  LogicalPolicy: {
    name: 'LogicalPolicy',
    description: 'Logical policy defining system behavior',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'policyType',
        type: 'string',
        required: false,
        description: 'Type of policy'
      },
      {
        name: 'policyDomain',
        type: 'string',
        required: false,
        description: 'Domain of the policy'
      },
      {
        name: 'enforcementMechanism',
        type: 'string',
        required: false,
        description: 'Mechanism for policy enforcement'
      }
    ],
    constraints: []
  },

  LogicalStandard: {
    name: 'LogicalStandard',
    description: 'Logical standard defining requirements',
    superClass: 'Element',
    properties: [
      {
        name: 'standardType',
        type: 'string',
        required: false,
        description: 'Type of standard'
      },
      {
        name: 'standardAuthority',
        type: 'string',
        required: false,
        description: 'Authority defining the standard'
      },
      {
        name: 'complianceRequirements',
        type: 'array',
        required: false,
        description: 'Requirements for compliance'
      }
    ],
    constraints: []
  },

  LogicalRequirement: {
    name: 'LogicalRequirement',
    description: 'Logical requirement for system behavior',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'requirementType',
        type: 'string',
        required: false,
        description: 'Type of requirement'
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: 'Priority level'
      },
      {
        name: 'verificationMethod',
        type: 'string',
        required: false,
        description: 'Method for requirement verification'
      }
    ],
    constraints: []
  },

  LogicalCapability: {
    name: 'LogicalCapability',
    description: 'Logical capability provided by the system',
    superClass: 'Element',
    properties: [
      {
        name: 'capabilityType',
        type: 'string',
        required: false,
        description: 'Type of capability'
      },
      {
        name: 'capabilityLevel',
        type: 'string',
        required: false,
        description: 'Level or maturity of capability'
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: 'Functions that provide this capability'
      }
    ],
    constraints: []
  },

  LogicalServiceInterface: {
    name: 'LogicalServiceInterface',
    description: 'Logical service interface definition',
    superClass: 'LogicalInterface',
    properties: [
      {
        name: 'serviceContract',
        type: 'string',
        required: false,
        description: 'Service contract reference'
      },
      {
        name: 'serviceLevel',
        type: 'string',
        required: false,
        description: 'Service level agreement'
      }
    ],
    constraints: []
  },

  LogicalDataInterface: {
    name: 'LogicalDataInterface',
    description: 'Logical data interface definition',
    superClass: 'LogicalInterface',
    properties: [
      {
        name: 'dataFormat',
        type: 'string',
        required: false,
        description: 'Data format specification'
      },
      {
        name: 'dataSchema',
        type: 'string',
        required: false,
        description: 'Data schema reference'
      }
    ],
    constraints: []
  },

  LogicalSystemInterface: {
    name: 'LogicalSystemInterface',
    description: 'Logical system interface definition',
    superClass: 'LogicalInterface',
    properties: [
      {
        name: 'systemProtocol',
        type: 'string',
        required: false,
        description: 'System communication protocol'
      },
      {
        name: 'systemStandard',
        type: 'string',
        required: false,
        description: 'System interface standard'
      }
    ],
    constraints: []
  },

  LogicalNodeConnector: {
    name: 'LogicalNodeConnector',
    description: 'Logical connector between nodes',
    superClass: 'Element',
    properties: [
      {
        name: 'connectorType',
        type: 'string',
        required: false,
        description: 'Type of connector'
      },
      {
        name: 'sourceNode',
        type: 'string',
        required: false,
        description: 'Source node'
      },
      {
        name: 'targetNode',
        type: 'string',
        required: false,
        description: 'Target node'
      },
      {
        name: 'bandwidth',
        type: 'string',
        required: false,
        description: 'Bandwidth capacity'
      }
    ],
    constraints: []
  },

  LogicalLink: {
    name: 'LogicalLink',
    description: 'Logical communication link',
    superClass: 'Element',
    properties: [
      {
        name: 'linkType',
        type: 'string',
        required: false,
        description: 'Type of link'
      },
      {
        name: 'technology',
        type: 'string',
        required: false,
        description: 'Link technology'
      },
      {
        name: 'capacity',
        type: 'string',
        required: false,
        description: 'Link capacity'
      }
    ],
    constraints: []
  },

  LogicalNetwork: {
    name: 'LogicalNetwork',
    description: 'Logical network structure',
    superClass: 'Element',
    properties: [
      {
        name: 'networkType',
        type: 'string',
        required: false,
        description: 'Type of network'
      },
      {
        name: 'topology',
        type: 'string',
        required: false,
        description: 'Network topology'
      },
      {
        name: 'nodes',
        type: 'array',
        required: false,
        description: 'Nodes in the network'
      },
      {
        name: 'links',
        type: 'array',
        required: false,
        description: 'Links in the network'
      }
    ],
    constraints: []
  },

  LogicalProtocol: {
    name: 'LogicalProtocol',
    description: 'Logical protocol definition',
    superClass: 'Element',
    properties: [
      {
        name: 'protocolType',
        type: 'string',
        required: false,
        description: 'Type of protocol'
      },
      {
        name: 'protocolStandard',
        type: 'string',
        required: false,
        description: 'Protocol standard reference'
      },
      {
        name: 'messageFormats',
        type: 'array',
        required: false,
        description: 'Supported message formats'
      }
    ],
    constraints: []
  },

  LogicalMessage: {
    name: 'LogicalMessage',
    description: 'Logical message definition',
    superClass: 'Element',
    properties: [
      {
        name: 'messageType',
        type: 'string',
        required: false,
        description: 'Type of message'
      },
      {
        name: 'messageFormat',
        type: 'string',
        required: false,
        description: 'Message format specification'
      },
      {
        name: 'payload',
        type: 'string',
        required: false,
        description: 'Message payload structure'
      }
    ],
    constraints: []
  },

  LogicalEvent: {
    name: 'LogicalEvent',
    description: 'Logical event that triggers actions',
    superClass: 'Element',
    properties: [
      {
        name: 'eventType',
        type: 'string',
        required: false,
        description: 'Type of event'
      },
      {
        name: 'eventSource',
        type: 'string',
        required: false,
        description: 'Source of the event'
      },
      {
        name: 'triggerConditions',
        type: 'array',
        required: false,
        description: 'Conditions that trigger the event'
      }
    ],
    constraints: []
  },

  LogicalState: {
    name: 'LogicalState',
    description: 'Logical state of a system or component',
    superClass: 'Element',
    properties: [
      {
        name: 'stateType',
        type: 'string',
        required: false,
        description: 'Type of state'
      },
      {
        name: 'initialState',
        type: 'boolean',
        required: false,
        description: 'Whether this is an initial state'
      },
      {
        name: 'finalState',
        type: 'boolean',
        required: false,
        description: 'Whether this is a final state'
      }
    ],
    constraints: []
  },

  LogicalTransition: {
    name: 'LogicalTransition',
    description: 'Logical transition between states',
    superClass: 'Element',
    properties: [
      {
        name: 'transitionType',
        type: 'string',
        required: false,
        description: 'Type of transition'
      },
      {
        name: 'sourceState',
        type: 'string',
        required: false,
        description: 'Source state'
      },
      {
        name: 'targetState',
        type: 'string',
        required: false,
        description: 'Target state'
      },
      {
        name: 'trigger',
        type: 'string',
        required: false,
        description: 'Trigger for the transition'
      },
      {
        name: 'guard',
        type: 'string',
        required: false,
        description: 'Guard condition for the transition'
      }
    ],
    constraints: []
  },

  LogicalCondition: {
    name: 'LogicalCondition',
    description: 'Logical condition that must be satisfied',
    superClass: 'LogicalConstraint',
    properties: [
      {
        name: 'conditionType',
        type: 'string',
        required: false,
        description: 'Type of condition'
      },
      {
        name: 'conditionExpression',
        type: 'string',
        required: false,
        description: 'Condition expression'
      }
    ],
    constraints: []
  },

  LogicalAction: {
    name: 'LogicalAction',
    description: 'Logical action performed in response to events',
    superClass: 'Element',
    properties: [
      {
        name: 'actionType',
        type: 'string',
        required: false,
        description: 'Type of action'
      },
      {
        name: 'actionSequence',
        type: 'string',
        required: false,
        description: 'Sequence of actions'
      },
      {
        name: 'preConditions',
        type: 'array',
        required: false,
        description: 'Pre-conditions for the action'
      },
      {
        name: 'postConditions',
        type: 'array',
        required: false,
        description: 'Post-conditions for the action'
      }
    ],
    constraints: []
  },

  LogicalDecision: {
    name: 'LogicalDecision',
    description: 'Logical decision point in a process',
    superClass: 'Element',
    properties: [
      {
        name: 'decisionType',
        type: 'string',
        required: false,
        description: 'Type of decision'
      },
      {
        name: 'decisionCriteria',
        type: 'array',
        required: false,
        description: 'Criteria for making the decision'
      },
      {
        name: 'alternatives',
        type: 'array',
        required: false,
        description: 'Alternative outcomes'
      }
    ],
    constraints: []
  },

  LogicalMerge: {
    name: 'LogicalMerge',
    description: 'Logical merge point for multiple flows',
    superClass: 'Element',
    properties: [
      {
        name: 'mergeType',
        type: 'string',
        required: false,
        description: 'Type of merge'
      },
      {
        name: 'inputFlows',
        type: 'array',
        required: false,
        description: 'Input flows to be merged'
      },
      {
        name: 'mergeCondition',
        type: 'string',
        required: false,
        description: 'Condition for merging'
      }
    ],
    constraints: []
  },

  LogicalFork: {
    name: 'LogicalFork',
    description: 'Logical fork point for splitting flows',
    superClass: 'Element',
    properties: [
      {
        name: 'forkType',
        type: 'string',
        required: false,
        description: 'Type of fork'
      },
      {
        name: 'inputFlow',
        type: 'string',
        required: false,
        description: 'Input flow to be forked'
      },
      {
        name: 'outputFlows',
        type: 'array',
        required: false,
        description: 'Output flows after forking'
      }
    ],
    constraints: []
  },

  LogicalJoin: {
    name: 'LogicalJoin',
    description: 'Logical join point for synchronizing flows',
    superClass: 'Element',
    properties: [
      {
        name: 'joinType',
        type: 'string',
        required: false,
        description: 'Type of join'
      },
      {
        name: 'inputFlows',
        type: 'array',
        required: false,
        description: 'Input flows to be joined'
      },
      {
        name: 'joinCondition',
        type: 'string',
        required: false,
        description: 'Condition for joining'
      }
    ],
    constraints: []
  },

  LogicalStart: {
    name: 'LogicalStart',
    description: 'Logical start point of a process',
    superClass: 'Element',
    properties: [
      {
        name: 'startType',
        type: 'string',
        required: false,
        description: 'Type of start'
      },
      {
        name: 'trigger',
        type: 'string',
        required: false,
        description: 'Trigger that starts the process'
      }
    ],
    constraints: []
  },

  LogicalEnd: {
    name: 'LogicalEnd',
    description: 'Logical end point of a process',
    superClass: 'Element',
    properties: [
      {
        name: 'endType',
        type: 'string',
        required: false,
        description: 'Type of end'
      },
      {
        name: 'terminationCondition',
        type: 'string',
        required: false,
        description: 'Condition that terminates the process'
      }
    ],
    constraints: []
  }
};

// Logical relationship types
export const LOGICAL_RELATIONSHIP_METAMODEL: Record<string, MetaModelClass> = {
  LogicalArchitectureRelationship: {
    name: 'LogicalArchitectureRelationship',
    description: 'Relationship between logical architecture elements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of logical architecture relationship'
      }
    ],
    constraints: []
  },

  LogicalActivityRelationship: {
    name: 'LogicalActivityRelationship',
    description: 'Relationship between logical activities',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of activity relationship'
      },
      {
        name: 'sequence',
        type: 'string',
        required: false,
        description: 'Sequence relationship'
      }
    ],
    constraints: []
  },

  LogicalPerformerRelationship: {
    name: 'LogicalPerformerRelationship',
    description: 'Relationship between logical performers',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of performer relationship'
      }
    ],
    constraints: []
  },

  LogicalResourceRelationship: {
    name: 'LogicalResourceRelationship',
    description: 'Relationship between logical resources',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of resource relationship'
      }
    ],
    constraints: []
  },

  LogicalSystemRelationship: {
    name: 'LogicalSystemRelationship',
    description: 'Relationship between logical systems',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of system relationship'
      }
    ],
    constraints: []
  },

  LogicalInterfaceRelationship: {
    name: 'LogicalInterfaceRelationship',
    description: 'Relationship between logical interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of interface relationship'
      }
    ],
    constraints: []
  },

  LogicalNodeRelationship: {
    name: 'LogicalNodeRelationship',
    description: 'Relationship between logical nodes',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of node relationship'
      }
    ],
    constraints: []
  },

  LogicalFlowRelationship: {
    name: 'LogicalFlowRelationship',
    description: 'Relationship between logical flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of flow relationship'
      }
    ],
    constraints: []
  },

  LogicalConstraintRelationship: {
    name: 'LogicalConstraintRelationship',
    description: 'Relationship between logical constraints',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of constraint relationship'
      }
    ],
    constraints: []
  },

  LogicalComponentRelationship: {
    name: 'LogicalComponentRelationship',
    description: 'Relationship between logical components',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of component relationship'
      }
    ],
    constraints: []
  },

  LogicalServiceRelationship: {
    name: 'LogicalServiceRelationship',
    description: 'Relationship between logical services',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of service relationship'
      }
    ],
    constraints: []
  },

  LogicalDataFlowRelationship: {
    name: 'LogicalDataFlowRelationship',
    description: 'Relationship between logical data flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data flow relationship'
      }
    ],
    constraints: []
  },

  LogicalControlFlowRelationship: {
    name: 'LogicalControlFlowRelationship',
    description: 'Relationship between logical control flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of control flow relationship'
      }
    ],
    constraints: []
  },

  LogicalInformationFlowRelationship: {
    name: 'LogicalInformationFlowRelationship',
    description: 'Relationship between logical information flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of information flow relationship'
      }
    ],
    constraints: []
  },

  LogicalPhysicalFlowRelationship: {
    name: 'LogicalPhysicalFlowRelationship',
    description: 'Relationship between logical physical flows',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of physical flow relationship'
      }
    ],
    constraints: []
  },

  LogicalOperationalActivityRelationship: {
    name: 'LogicalOperationalActivityRelationship',
    description: 'Relationship between logical operational activities',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of operational activity relationship'
      }
    ],
    constraints: []
  },

  LogicalSystemFunctionRelationship: {
    name: 'LogicalSystemFunctionRelationship',
    description: 'Relationship between logical system functions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of system function relationship'
      }
    ],
    constraints: []
  },

  LogicalDataStructureRelationship: {
    name: 'LogicalDataStructureRelationship',
    description: 'Relationship between logical data structures',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data structure relationship'
      }
    ],
    constraints: []
  },

  LogicalBusinessRuleRelationship: {
    name: 'LogicalBusinessRuleRelationship',
    description: 'Relationship between logical business rules',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of business rule relationship'
      }
    ],
    constraints: []
  },

  LogicalPolicyRelationship: {
    name: 'LogicalPolicyRelationship',
    description: 'Relationship between logical policies',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of policy relationship'
      }
    ],
    constraints: []
  },

  LogicalStandardRelationship: {
    name: 'LogicalStandardRelationship',
    description: 'Relationship between logical standards',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of standard relationship'
      }
    ],
    constraints: []
  },

  LogicalRequirementRelationship: {
    name: 'LogicalRequirementRelationship',
    description: 'Relationship between logical requirements',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of requirement relationship'
      }
    ],
    constraints: []
  },

  LogicalCapabilityRelationship: {
    name: 'LogicalCapabilityRelationship',
    description: 'Relationship between logical capabilities',
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

  LogicalServiceInterfaceRelationship: {
    name: 'LogicalServiceInterfaceRelationship',
    description: 'Relationship between logical service interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of service interface relationship'
      }
    ],
    constraints: []
  },

  LogicalDataInterfaceRelationship: {
    name: 'LogicalDataInterfaceRelationship',
    description: 'Relationship between logical data interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of data interface relationship'
      }
    ],
    constraints: []
  },

  LogicalSystemInterfaceRelationship: {
    name: 'LogicalSystemInterfaceRelationship',
    description: 'Relationship between logical system interfaces',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of system interface relationship'
      }
    ],
    constraints: []
  },

  LogicalNodeConnectorRelationship: {
    name: 'LogicalNodeConnectorRelationship',
    description: 'Relationship between logical node connectors',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of node connector relationship'
      }
    ],
    constraints: []
  },

  LogicalLinkRelationship: {
    name: 'LogicalLinkRelationship',
    description: 'Relationship between logical links',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of link relationship'
      }
    ],
    constraints: []
  },

  LogicalNetworkRelationship: {
    name: 'LogicalNetworkRelationship',
    description: 'Relationship between logical networks',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of network relationship'
      }
    ],
    constraints: []
  },

  LogicalProtocolRelationship: {
    name: 'LogicalProtocolRelationship',
    description: 'Relationship between logical protocols',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of protocol relationship'
      }
    ],
    constraints: []
  },

  LogicalMessageRelationship: {
    name: 'LogicalMessageRelationship',
    description: 'Relationship between logical messages',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of message relationship'
      }
    ],
    constraints: []
  },

  LogicalEventRelationship: {
    name: 'LogicalEventRelationship',
    description: 'Relationship between logical events',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of event relationship'
      }
    ],
    constraints: []
  },

  LogicalStateRelationship: {
    name: 'LogicalStateRelationship',
    description: 'Relationship between logical states',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of state relationship'
      }
    ],
    constraints: []
  },

  LogicalTransitionRelationship: {
    name: 'LogicalTransitionRelationship',
    description: 'Relationship between logical transitions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of transition relationship'
      }
    ],
    constraints: []
  },

  LogicalConditionRelationship: {
    name: 'LogicalConditionRelationship',
    description: 'Relationship between logical conditions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of condition relationship'
      }
    ],
    constraints: []
  },

  LogicalActionRelationship: {
    name: 'LogicalActionRelationship',
    description: 'Relationship between logical actions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of action relationship'
      }
    ],
    constraints: []
  },

  LogicalDecisionRelationship: {
    name: 'LogicalDecisionRelationship',
    description: 'Relationship between logical decisions',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of decision relationship'
      }
    ],
    constraints: []
  },

  LogicalMergeRelationship: {
    name: 'LogicalMergeRelationship',
    description: 'Relationship between logical merges',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of merge relationship'
      }
    ],
    constraints: []
  },

  LogicalForkRelationship: {
    name: 'LogicalForkRelationship',
    description: 'Relationship between logical forks',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of fork relationship'
      }
    ],
    constraints: []
  },

  LogicalJoinRelationship: {
    name: 'LogicalJoinRelationship',
    description: 'Relationship between logical joins',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of join relationship'
      }
    ],
    constraints: []
  },

  LogicalStartRelationship: {
    name: 'LogicalStartRelationship',
    description: 'Relationship between logical starts',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of start relationship'
      }
    ],
    constraints: []
  },

  LogicalEndRelationship: {
    name: 'LogicalEndRelationship',
    description: 'Relationship between logical ends',
    properties: [
      {
        name: 'relationshipType',
        type: 'string',
        required: false,
        description: 'Type of end relationship'
      }
    ],
    constraints: []
  },

  LogicalSequenceFlow: {
    name: 'LogicalSequenceFlow',
    description: 'Sequence flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of sequence flow'
      }
    ],
    constraints: []
  },

  LogicalMessageFlow: {
    name: 'LogicalMessageFlow',
    description: 'Message flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of message flow'
      }
    ],
    constraints: []
  },

  LogicalObjectFlow: {
    name: 'LogicalObjectFlow',
    description: 'Object flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of object flow'
      }
    ],
    constraints: []
  },

  LogicalExceptionFlow: {
    name: 'LogicalExceptionFlow',
    description: 'Exception flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of exception flow'
      }
    ],
    constraints: []
  },

  LogicalCompensationFlow: {
    name: 'LogicalCompensationFlow',
    description: 'Compensation flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of compensation flow'
      }
    ],
    constraints: []
  },

  LogicalCancelFlow: {
    name: 'LogicalCancelFlow',
    description: 'Cancel flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of cancel flow'
      }
    ],
    constraints: []
  },

  LogicalTimerFlow: {
    name: 'LogicalTimerFlow',
    description: 'Timer flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of timer flow'
      }
    ],
    constraints: []
  },

  LogicalSignalFlow: {
    name: 'LogicalSignalFlow',
    description: 'Signal flow between logical elements',
    properties: [
      {
        name: 'flowType',
        type: 'string',
        required: false,
        description: 'Type of signal flow'
      }
    ],
    constraints: []
  },

  LogicalDataAssociation: {
    name: 'LogicalDataAssociation',
    description: 'Data association between logical elements',
    properties: [
      {
        name: 'associationType',
        type: 'string',
        required: false,
        description: 'Type of data association'
      }
    ],
    constraints: []
  }
};
