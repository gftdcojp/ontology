/**
 * ResourceBox Resource Schemas for DoDAF 2.0
 * Base IRI: https://dodaf.defense.gov/ontology#
 *
 * Merkle DAG: node=rb-canon-resources, depends: rb-canon-ontology
 */

import { Resource } from "@gftdcojp/resourcebox";
import {
  dodaf,
  Architecture,
  View,
  Product,
  Element as ElementClass,
  Relationship as RelationshipClass,
  Metadata as MetadataClass,
  name,
  description,
  created,
  modified,
  author,
  version,
  status,
  Capability,
  Activity,
  Service as ServiceClass,
  Standard as StandardClass,
  Agreement as AgreementClass,
  Information as InformationClass,
} from "./dodaf-ontology.rb";

export const ElementResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Element")]),

  name: Resource.String({ property: name, minLength: 1, maxLength: 200 }),
  description: Resource.String({ property: description, optional: true, maxLength: 1000 }),
}, {
  class: ElementClass,
});

export const ProductResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Product")]),

  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, {
  class: Product,
});

export const ViewResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("View")]),

  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, {
  class: View,
});

export const RelationshipResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Relationship")]),

  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, {
  class: RelationshipClass,
});

export const MetadataResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Metadata")]),

  created: Resource.String({ property: created, format: "date-time" }),
  modified: Resource.String({ property: modified, format: "date-time" }),
  author: Resource.String({ property: author }),
  version: Resource.String({ property: version }),
  status: Resource.String({ property: status }),
}, {
  class: MetadataClass,
});

// Domain resources
export const CapabilityResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Capability")]),
  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, { class: Capability });

export const ActivityResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Activity")]),
  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, { class: Activity });

export const ServiceResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Service")]),
  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, { class: ServiceClass });

export const StandardResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Standard")]),
  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, { class: StandardClass });

export const AgreementResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Agreement")]),
  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, { class: AgreementClass });

export const InformationResource = Resource.Object({
  "@id": Resource.String({ format: "uri" }),
  "@type": Resource.Literal([dodaf("Information")]),
  name: Resource.String({ property: name, minLength: 1 }),
  description: Resource.String({ property: description, optional: true }),
}, { class: InformationClass });

export const DODAF_RESOURCES = {
  ElementResource,
  ProductResource,
  ViewResource,
  RelationshipResource,
  MetadataResource,
  CapabilityResource,
  ActivityResource,
  ServiceResource,
  StandardResource,
  AgreementResource,
  InformationResource,
};


