import { Projection, TileKey, TilingScheme } from "@here/harp-geoutils";
import * as THREE from "three";
import { DataSource } from "./DataSource";
import { ElevationRange, ElevationRangeSource } from "./ElevationRangeSource";
import { MapView } from "./MapView";
/**
 * Represents a unique TileKey and the area it takes up on screen.
 *
 * Note, in certain tiling projections, it is possible to have an offset, which represents a tile
 * which has fully wrapped around, hence this defaults to 0 to simplify usage for projections which
 * don't require it.
 */
export declare class TileKeyEntry {
    tileKey: TileKey;
    area: number;
    offset: number;
    elevationRange?: ElevationRange | undefined;
    distance: number;
    constructor(tileKey: TileKey, area: number, offset?: number, elevationRange?: ElevationRange | undefined, distance?: number);
}
/**
 * Map tile keys to TileKeyEntry.
 * Keys are a combination of morton code and tile offset,
 * see [[TileOffsetUtils.getKeyForTileKeyAndOffset]].
 */
declare type TileKeyEntries = Map<number, TileKeyEntry>;
/**
 * Map zoom level to map of visible tile key entries
 */
declare type ZoomLevelTileKeyMap = Map<number, TileKeyEntries>;
/**
 * Result of frustum intersection
 */
interface IntersectionResult {
    /**
     * Tiles intersected by the frustum per zoom level.
     */
    readonly tileKeyEntries: ZoomLevelTileKeyMap;
    /**
     * True if the intersection was calculated using precise elevation data, false if it's an
     * approximation.
     */
    calculationFinal: boolean;
}
/**
 * Computes the tiles intersected by the frustum defined by the current camera setup.
 */
export declare class FrustumIntersection {
    private readonly m_camera;
    readonly mapView: MapView;
    private readonly m_extendedFrustumCulling;
    private readonly m_tileWrappingEnabled;
    private readonly m_enableMixedLod;
    private readonly m_tilePixelSize;
    private readonly m_frustum;
    private readonly m_viewProjectionMatrix;
    private readonly m_mapTileCuller;
    private m_rootTileKeys;
    private readonly m_tileKeyEntries;
    constructor(m_camera: THREE.PerspectiveCamera, mapView: MapView, m_extendedFrustumCulling: boolean, m_tileWrappingEnabled: boolean, m_enableMixedLod: boolean, m_tilePixelSize?: number);
    /**
     * Return camera used for generating frustum.
     */
    get camera(): THREE.PerspectiveCamera;
    /**
     * Return projection used to convert geo coordinates to world coordinates.
     */
    get projection(): Projection;
    /**
     * Updates the frustum to match the current camera setup.
     */
    updateFrustum(projectionMatrixOverride?: THREE.Matrix4): void;
    /**
     * Computes the tiles intersected by the updated frustum, see [[updateFrustum]].
     *
     * @param tilingScheme - The tiling scheme used to generate the tiles.
     * @param elevationRangeSource - Source of elevation range data if any.
     * @param zoomLevels - A list of zoom levels to render.
     * @param dataSources - A list of data sources to render.
     * @returns The computation result, see [[FrustumIntersection.Result]].
     */
    compute(tilingScheme: TilingScheme, elevationRangeSource: ElevationRangeSource | undefined, zoomLevels: number[], dataSources: DataSource[]): IntersectionResult;
    private getTileKeyEntry;
    /**
     * Estimate screen space area of tile and distance to center of tile
     * @param tileBounds - The bounding volume of a tile
     * @return Area estimate and distance to tile center in clip space
     */
    private computeTileAreaAndDistance;
    /**
     * Create a list of root nodes to test against the frustum. The root nodes each start at level 0
     * and have an offset (see {@link Tile}) based on:
     * - the current position [[worldCenter]].
     * - the height of the camera above the world.
     * - the field of view of the camera (the maximum value between the horizontal / vertical
     *   values)
     * - the tilt of the camera (because we see more tiles when tilted).
     *
     * @param worldCenter - The center of the camera in world space.
     */
    private computeRequiredInitialRootTileKeys;
}
export {};
//# sourceMappingURL=FrustumIntersection.d.ts.map