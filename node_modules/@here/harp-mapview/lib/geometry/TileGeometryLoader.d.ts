import { DecodedTile, GeometryKind, GeometryKindSet, Technique } from "@here/harp-datasource-protocol";
import { TaskQueue } from "@here/harp-utils";
import { Tile } from "../Tile";
/**
 * The state the {@link TileGeometryLoader}.
 */
export declare enum TileGeometryLoaderState {
    Initialized = 0,
    CreationQueued = 1,
    CreatingGeometry = 2,
    Finished = 3,
    Canceled = 4,
    Disposed = 5
}
/**
 * Loads the geometry for its {@link Tile}. Loads all geometry in a single step.
 * @internal
 */
export declare class TileGeometryLoader {
    private readonly m_tile;
    private readonly m_taskQueue;
    /**
     * Make sure that all technique have their geometryKind set, either from the theme or their
     * default value.
     *
     * Also gather set of the [[GeometryKind]]s found in the techniques and return it.
     *
     * @param {DecodedTile} decodedTile
     * @returns {GeometryKindSet} The set of kinds used in the decodeTile.
     */
    static prepareAvailableGeometryKinds(decodedTile: DecodedTile): GeometryKindSet;
    /**
     * Make sure that the technique has its geometryKind set, either from the theme or their default
     * value.
     *
     * @param {Technique} technique
     */
    static compileGeometryKind(technique: Technique): GeometryKind | GeometryKindSet;
    private m_decodedTile?;
    private m_availableGeometryKinds;
    private m_enabledKinds;
    private m_disabledKinds;
    private m_priority;
    private m_state;
    private m_finishedPromise;
    private m_resolveFinishedPromise?;
    private m_rejectFinishedPromise?;
    constructor(m_tile: Tile, m_taskQueue: TaskQueue);
    set priority(value: number);
    getPriority(): number;
    /**
     * The {@link Tile} this `TileGeometryLoader` is managing.
     */
    get tile(): Tile;
    /**
     * `True` if a decoded Tile is set
     */
    get hasDecodedTile(): boolean;
    /**
     * `True` if all geometry of the `Tile` has been loaded and the loading process is finished.
     */
    get isFinished(): boolean;
    /**
     * `True` if loader is finished, canceled or disposed.
     */
    get isSettled(): boolean;
    /**
     * Returns a promise resolved when this `TileGeometryLoader` is in
     * `TileGeometryLoaderState.Finished` state, or rejected when it's in
     * `TileGeometryLoaderState.Cancelled` or `TileGeometryLoaderState.Disposed` states.
     */
    waitFinished(): Promise<void>;
    /**
     * Set the {@link @here/harp-datasource-protocol#DecodedTile} of the tile.
     *
     * @remarks
     * Is called after the decoded tile has been loaded, and
     * prepares its content for later processing in the 'updateXXX' methods.
     *
     * @param {DecodedTile} decodedTile The decoded tile with the flat geometry data belonging to
     *      this tile.
     * @returns {DecodedTile} The processed decoded tile.
     */
    setDecodedTile(decodedTile: DecodedTile): DecodedTile;
    /**
     * The kinds of geometry stored in this {@link Tile}.
     */
    get availableGeometryKinds(): GeometryKindSet | undefined;
    /**
     * Start with or continue with loading geometry. Called repeatedly until `isFinished` is `true`.
     */
    update(enabledKinds?: GeometryKindSet, disabledKinds?: GeometryKindSet): void;
    /**
     * Cancel geometry loading.
     */
    cancel(): void;
    /**
     * Dispose of any resources.
     */
    dispose(): void;
    /**
     * Reset the loader to its initial state and cancels any asynchronous work.
     * @remarks
     * This method prepares the loader to reload new geometry. Since the loader does not transition
     * to a final state, the promise returned by {@link TileGeometryLoader.waitFinished} is not
     * settled.
     */
    reset(): void;
    /**
     * Finish geometry loading.
     */
    finish(): void;
    private clear;
    private queueGeometryCreation;
    private createGeometry;
    private addStats;
    /**
     * Stores geometry kinds used to load decoded tile geometry.
     *
     * This values are stored to detect geometry kind changes during loading.
     *
     * @param enabledKinds - Set of geometry kinds to be displayed or undefined.
     * @param disabledKinds - Set of geometry kinds that won't be rendered.
     */
    private setGeometryKinds;
    /**
     * Compare enabled and disabled geometry kinds with currently set.
     *
     * Method compares input sets with recently used geometry kinds in performance wise
     * manner, taking special care of undefined and zero size sets.
     *
     * @param enabledKinds - Set of geometry kinds to be displayed or undefined.
     * @param disabledKinds - Set of geometry kinds that won't be rendered.
     * @return `true` only if sets are logically equal, meaning that undefined and empty sets
     * may result in same geometry (techniques kind) beeing rendered.
     */
    private compareGeometryKinds;
    /**
     * `True` if TileGeometryLoader was canceled
     */
    private get isCanceled();
    /**
     * `True` if TileGeometryLoader was disposed
     */
    private get isDisposed();
}
//# sourceMappingURL=TileGeometryLoader.d.ts.map