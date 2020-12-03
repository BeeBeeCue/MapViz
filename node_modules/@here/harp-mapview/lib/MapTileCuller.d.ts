import * as THREE from "three";
/**
 * Second step tile culling: Do additional check for intersection of box and frustum by checking if
 * the frustum is outside any plane of the tiles `bbox` (oriented, not AABB). It's in the inverse of
 * the standard frustum test, which excludes many cases where the large terrain tiles straddle the
 * planes of the frustum.
 *
 * @see http://www.iquilezles.org/www/articles/frustumcorrect/frustumcorrect.htm
 */
export declare class MapTileCuller {
    private readonly m_camera;
    private m_globalFrustumMin;
    private m_globalFrustumMax;
    private readonly m_frustumCorners;
    /**
     * Constructs a `MapTileCuller`.
     *
     * @param m_camera - A `THREE.Camera`.
     */
    constructor(m_camera: THREE.Camera);
    /**
     * Sets up culling and computes frustum corners. You mus call this function before the culling
     * starts.
     */
    setup(): void;
    /**
     * Checks if the tile's bounding box intersects with the current view's frustum.
     *
     * @param tileBounds - The bounding box for the tile.
     */
    frustumIntersectsTileBox(tileBounds: THREE.Box3): boolean;
    /**
     * Returns the eight corners of the frustum.
     */
    private getFrustumCorners;
}
//# sourceMappingURL=MapTileCuller.d.ts.map