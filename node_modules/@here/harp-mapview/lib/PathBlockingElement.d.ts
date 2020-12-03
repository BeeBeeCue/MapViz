import { Vector3Like } from "@here/harp-geoutils";
import * as THREE from "three";
/**
 * This path in world coordinates is projected to screen space and blocks all other labels.
 *
 * It could be used for example:
 * - Border rejects labels.
 * - Route blocks street labels from being rendered underneath.
 *
 * Could potentially be expanded in future to have a priority, however for now, this isn't required.
 */
export declare class PathBlockingElement {
    readonly points: Vector3Like[];
    /**
     * Note, [[screenSpaceLines]] is only used as a performance improvement and contains no
     * useful information. They are used to contain the screen space coordinates of the
     * points. By allocating the space here, we avoid per frame allocations, see
     * [[TextElementsRenderer.prepopulateScreenWithBlockingElements]].
     */
    readonly screenSpaceLines: THREE.Line3[];
    /**
     * Constructs a path from a list of points.
     * Pre allocates the [[screenSpaceLines]] used to render.
     * @param points - Points in world coordinates.
     */
    constructor(points: Vector3Like[]);
}
//# sourceMappingURL=PathBlockingElement.d.ts.map