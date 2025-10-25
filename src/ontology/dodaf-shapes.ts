/**
 * ResourceBox-derived SHACL shapes for DoDAF 2.0
 *
 * Merkle DAG: node=rb-canon-shapes, depends: rb-canon-resources
 */

import { Shape } from "@gftdcojp/resourcebox";
import {
  ElementResource,
  ProductResource,
  ViewResource,
  RelationshipResource,
  MetadataResource,
} from "./dodaf-resources";

export const ElementShape = Shape.fromResource(ElementResource, { strict: true, closed: true });
export const ProductShape = Shape.fromResource(ProductResource, { strict: true, closed: true });
export const ViewShape = Shape.fromResource(ViewResource, { strict: true, closed: true });
export const RelationshipShape = Shape.fromResource(RelationshipResource, { strict: true, closed: true });
export const MetadataShape = Shape.fromResource(MetadataResource, { strict: true, closed: true });

export const DODAF_SHAPES = {
  ElementShape,
  ProductShape,
  ViewShape,
  RelationshipShape,
  MetadataShape,
};


