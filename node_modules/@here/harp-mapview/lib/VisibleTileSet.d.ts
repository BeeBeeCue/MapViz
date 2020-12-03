import { ViewRanges } from "@here/harp-datasource-protocol/lib/ViewRanges";
import { GeoCoordinates, Projection, TileKey } from "@here/harp-geoutils";
import { TaskQueue } from "@here/harp-utils";
import { ClipPlanesEvaluator } from "./ClipPlanesEvaluator";
import { DataSource } from "./DataSource";
import { ElevationRangeSource } from "./ElevationRangeSource";
import { FrustumIntersection } from "./FrustumIntersection";
import { TileGeometryManager } from "./geometry/TileGeometryManager";
import { Tile } from "./Tile";
/**
 * Way the memory consumption of a tile is computed. Either in number of tiles, or in MegaBytes. If
 * it is in MB, an estimation is used.
 */
export declare enum ResourceComputationType {
    EstimationInMb = 0,
    NumberOfTiles = 1
}
/**
 * Limited set of {@link MapViewOptions} used for {@link VisibleTileSet}.
 */
export interface VisibleTileSetOptions {
    /**
     * The projection of the view.
     */
    projection: Projection;
    /**
     * User-defined camera clipping planes evaluator.
     */
    clipPlanesEvaluator: ClipPlanesEvaluator;
    /**
     * Limit of tiles that can be visible per datasource.
     */
    maxVisibleDataSourceTiles: number;
    /**
     * In addition to the simple frustum culling also do additional checks with [[MapTileCuller]].
     */
    extendedFrustumCulling: boolean;
    /**
     * Missing Typedoc
     */
    tileCacheSize: number;
    /**
     * Missing Typedoc
     */
    resourceComputationType: ResourceComputationType;
    /**
     * Number of levels to go up when searching for fallback tiles.
     */
    quadTreeSearchDistanceUp: number;
    /**
     * Number of levels to go down when searching for fallback tiles.
     */
    quadTreeSearchDistanceDown: number;
    /**
     * Maximal number of new tiles, that can be added to the scene per frame.
     * if set to `0`the limit will be ignored and all available tiles be uploaded.
     * @beta
     * @internal
     * @defaultValue 0
     */
    maxTilesPerFrame: number;
}
/**
 * List of visible tiles for a {@link DataSource}.
 */
export interface DataSourceTileList {
    /**
     * The datasource that was producing the tiles.
     */
    dataSource: DataSource;
    /**
     * The current {@link MapView} zoom level.
     */
    zoomLevel: number;
    /**
     * The storage level of the visibleTiles.
     * Note: renderedTiles might contain tiles from different levels.
     */
    storageLevel: number;
    /**
     * True if all [[visibleTiles]] are loaded.
     */
    allVisibleTileLoaded: boolean;
    /**
     * The number of tiles which are still loading.
     */
    numTilesLoading: number;
    /**
     * List of tiles we want to render (i.e. the tiles computed from the zoom level and view
     * frustum). However some might not be renderable yet (e.g. loading). See [[renderedTiles]] for
     * the actual list of tiles that the user will see.
     */
    visibleTiles: Tile[];
    /**
     * Map of tiles that will be rendered, key is the the combination of tile key and offset, see
     * [[getKeyForTileKeyAndOffset]]. This includes tiles that are not in the [[visibleTiles]]
     * list but that are used as fallbacks b/c they are still in the cache.
     */
    renderedTiles: Map<number, Tile>;
}
/**
 * Manages visible {@link Tile}s for {@link MapView}.
 *
 * Responsible for election of rendered tiles:
 *  - quad-tree traversal
 *  - frustum culling
 *  - sorting tiles by relevance (visible area) to prioritize load
 *  - limiting number of visible tiles
 *  - caching tiles
 *  - searching cache to replace visible but yet empty tiles with already loaded siblings in nearby
 *    zoom levels
 */
export declare class VisibleTileSet {
    private readonly m_frustumIntersection;
    private readonly m_tileGeometryManager;
    options: VisibleTileSetOptions;
    private readonly m_taskQueue;
    dataSourceTileList: DataSourceTileList[];
    allVisibleTilesLoaded: boolean;
    private readonly m_cameraOverride;
    private readonly m_dataSourceCache;
    private m_viewRange;
    private readonly m_coveringMap;
    private m_resourceComputationType;
    constructor(m_frustumIntersection: FrustumIntersection, m_tileGeometryManager: TileGeometryManager, options: VisibleTileSetOptions, m_taskQueue: TaskQueue);
    /**
     * Returns cache size.
     */
    getDataSourceCacheSize(): number;
    /**
     * Sets cache size.
     *
     * @param size - cache size
     * @param computationType - Optional value specifying the way a {@link Tile}s cache usage is
     *      computed, either based on size in MB (mega bytes) or in number of tiles. Defaults to
     *      `ResourceComputationType.EstimationInMb`.
     */
    setDataSourceCacheSize(size: number, computationType?: ResourceComputationType): void;
    /**
     * Retrieves maximum number of visible tiles.
     */
    getNumberOfVisibleTiles(): number;
    /**
     * Sets maximum number of visible tiles.
     *
     * @param size - size of visible tiles array
     */
    setNumberOfVisibleTiles(size: number): void;
    /**
     * Gets the maximum number of tiles that can be added to the scene per frame
     * @beta
     * @internal
     */
    get maxTilesPerFrame(): number;
    /**
     * Gets the maximum number of tiles that can be added to the scene per frame
     * @beta
     * @internal
     * @param value
     */
    set maxTilesPerFrame(value: number);
    /**
     * The way the cache usage is computed, either based on size in MB (mega bytes) or in number of
     * tiles.
     */
    get resourceComputationType(): ResourceComputationType;
    /**
     * Sets the way tile cache is managing its elements.
     *
     * Cache may be either keeping number of elements stored or the memory consumed by them.
     *
     * @param computationType - Type of algorith used in cache for checking full saturation,
     * may be counting number of elements or memory consumed by them.
     */
    set resourceComputationType(computationType: ResourceComputationType);
    /**
     * Evaluate frustum near/far clip planes and visibility ranges.
     */
    updateClipPlanes(maxElevation?: number, minElevation?: number): ViewRanges;
    /**
     * Calculates a new set of visible tiles.
     * @param storageLevel - The camera storage level, see {@link MapView.storageLevel}.
     * @param zoomLevel - The camera zoom level.
     * @param dataSources - The data sources for which the visible tiles will be calculated.
     * @param elevationRangeSource - Source of elevation range data if any.
     * @returns view ranges and their status since last update (changed or not).
     */
    updateRenderList(storageLevel: number, zoomLevel: number, dataSources: DataSource[], frameNumber: number, elevationRangeSource?: ElevationRangeSource): {
        viewRanges: ViewRanges;
        viewRangesChanged: boolean;
    };
    /**
     * Gets the tile corresponding to the given data source, key and offset, creating it if
     * necessary.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param tileKey - The key identifying the tile.
     * @param offset - Tile offset.
     * @param frameNumber - Frame in which the tile was requested
     * @return The tile if it was found or created, undefined otherwise.
     */
    getTile(dataSource: DataSource, tileKey: TileKey, offset: number, frameNumber: number): Tile | undefined;
    /**
     * Gets the tile corresponding to the given data source, key and offset from the cache.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param tileKey - The key identifying the tile.
     * @param offset - Tile offset.
     * @param frameNumber - Frame in which the tile was requested
     * @return The tile if found in cache, undefined otherwise.
     */
    getCachedTile(dataSource: DataSource, tileKey: TileKey, offset: number, frameNumber: number): Tile | undefined;
    /**
     * Gets the tile corresponding to the given data source, key and offset from the rendered tiles.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param tileKey - The key identifying the tile.
     * @param offset - Tile offset.
     * @return The tile if found among the rendered tiles, undefined otherwise.
     */
    getRenderedTile(dataSource: DataSource, tileKey: TileKey, offset?: number): Tile | undefined;
    /**
     * Gets the tile corresponding to the given data source and location from the rendered tiles.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param geoPoint - The geolocation included within the tile.
     * @return The tile if found among the rendered tiles, undefined otherwise.
     */
    getRenderedTileAtLocation(dataSource: DataSource, geoPoint: GeoCoordinates, offset?: number): Tile | undefined;
    /**
     * Removes all internal bookkeeping entries and cache related to specified datasource.
     *
     * Called by {@link MapView} when {@link DataSource} has been removed from {@link MapView}.
     */
    removeDataSource(dataSource: DataSource): void;
    /**
     * Clear the tile cache.
     *
     * Remove the {@link Tile} objects created by cacheable {@link DataSource}.
     * If a {@link DataSource} name is
     * provided, this method restricts the eviction
     * the {@link DataSource} with the given name.
     *
     * @param dataSourceName - The name of the {@link DataSource}.
     * @param filter Optional tile filter
     */
    clearTileCache(dataSource?: DataSource, filter?: (tile: Tile) => boolean): void;
    /**
     * Visit each tile in visible, rendered, and cached sets.
     *
     *  * Visible and temporarily rendered tiles will be marked for update and retained.
     *  * Cached but not rendered/visible will be evicted.
     *
     * @param dataSource - If passed, only the tiles from this {@link DataSource} instance
     *      are processed. If `undefined`, tiles from all {@link DataSource}s are processed.
     * @param filter Optional tile filter
     */
    markTilesDirty(dataSource?: DataSource, filter?: (tile: Tile) => boolean): void;
    /**
     * Dispose tiles that are marked for removal by {@link @here/harp-lrucache#LRUCache} algorithm.
     */
    disposePendingTiles(): void;
    /**
     * Process callback function [[fun]] with each visible tile in set.
     *
     * @param fun - The callback function to be called.
     */
    forEachVisibleTile(fun: (tile: Tile) => void): void;
    /**
     * Process callback function [[fun]] with each tile in the cache.
     *
     * Optional [[dataSource]] parameter limits processing to the tiles that belongs to
     * DataSource passed in.
     *
     * @param fun - The callback function to be called.
     * @param dataSource - The optional DataSource reference for tiles selection.
     */
    forEachCachedTile(fun: (tile: Tile) => void, dataSource?: DataSource): void;
    /**
     * Dispose a `Tile` from cache, 'dispose()' is also called on the tile to free its resources.
     */
    disposeTile(tile: Tile): void;
    private processVisibleTiles;
    private processDelayTileRendering;
    /**
     * Skips rendering of tiles that are overlapped. The overlapping {@link Tile} comes from a
     * {@link DataSource} which is fully covering, i.e. there it is fully opaque.
     **/
    private skipOverlappedTiles;
    private getSearchDirection;
    /**
     * Populates the list of tiles to render, see "renderedTiles". Tiles that are loaded and which
     * are an exact match are added straight to the list, tiles that are still loading are replaced
     * with tiles in the cache that are either a parent or child of the requested tile. This helps
     * to prevent flickering when zooming in / out. The distance to search is based on the options
     * [[quadTreeSearchDistanceDown]] and [[quadTreeSearchDistanceUp]].
     *
     * Each {@link DataSource} can also switch this behaviour on / off using the
     * [[allowOverlappingTiles]] flag.
     *
     */
    private populateRenderedTiles;
    private findDown;
    /**
     * Returns true if a tile was found in the cache which is a parent
     * @param tileKeyCode - Morton code of the current tile that should be searched for.
     * @param dataZoomLevel - The current data zoom level of tiles that are to be displayed.
     * @param renderedTiles - The list of tiles that are shown to the user.
     * @param checkedTiles - Used to map a given code to a boolean which tells us if an ancestor is
     * displayed or not.
     * @param dataSource - The provider of tiles.
     * @returns Whether a parent tile exists.
     */
    private findUp;
    private getTileImpl;
    private addToTaskQueue;
    private markDataSourceTilesDirty;
    private getVisibleTileKeysForDataSources;
}
//# sourceMappingURL=VisibleTileSet.d.ts.map