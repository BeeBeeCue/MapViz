import * as THREE from "three";
import { DisplacedBufferAttribute } from "./DisplacedBufferAttribute";
/**
 * @internal
 * Range of displacement values found in a given displacement map.
 */
export interface DisplacementRange {
    min: number;
    max: number;
}
/**
 * @internal
 * Displace a box in a given direction by a specified range. The original box min and max vertices
 * are translated as a result by displacementRange.min and displacementRange.max respectively.
 * @param box - The original box to displace.
 * @param displacementRange - The minimum and maximum displacement values.
 * @param displacementDir - Direction in which the displacement will be applied.
 * @return The displaced box.
 */
export declare function displaceBox(box: THREE.Box3, displacementRange: DisplacementRange, displacementDir: THREE.Vector3): THREE.Box3;
/**
 * @internal
 * BufferGeometry decorator that displaces on the fly the position attribute using a specified
 * displacement map.
 */
export declare class DisplacedBufferGeometry extends THREE.BufferGeometry {
    originalGeometry: THREE.BufferGeometry;
    displacementRange: DisplacementRange;
    private readonly m_displacedPositions;
    private readonly m_originalBoundingBox;
    /**
     * Creates an instance of displaced buffer geometry.
     * @param originalGeometry - The goeometry to be displaced.
     * @param displacementMap - A texture with the displacement values.
     * @param displacementRange - The displacement value range found in the displacement map.
     * @param displacedPositions - Buffer attribute that will be used for displaced positions if
     * provided, otherwise a new buffer attribute will be created.
     */
    constructor(originalGeometry: THREE.BufferGeometry, displacementMap: THREE.DataTexture, displacementRange: DisplacementRange, displacedPositions?: DisplacedBufferAttribute);
    /**
     * Resets the displaced buffer geometry to use new geometry or displacement map.
     * @param geometry - The goeometry to be displaced.
     * @param displacementMap - A texture with the displacement values.
     * @param displacementRange - The displacement value range found in the displacement map.
     */
    reset(geometry: THREE.BufferGeometry, displacementMap: THREE.DataTexture, displacementRange: DisplacementRange): void;
    computeBoundingBox(): void;
    computeBoundingSphere(): void;
    private needsBoundingBoxUpdate;
    private resetBoundingVolumes;
    private resetAttributes;
}
//# sourceMappingURL=DisplacedBufferGeometry.d.ts.map