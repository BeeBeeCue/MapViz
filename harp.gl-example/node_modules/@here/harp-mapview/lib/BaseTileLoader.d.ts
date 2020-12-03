import { TileKey } from "@here/harp-geoutils";
import { DataSource } from "./DataSource";
import { ITileLoader, TileLoaderState } from "./ITileLoader";
/**
 * @internal
 * Base class for tile loaders that provides state handling, request abortion and a load promise.
 */
export declare abstract class BaseTileLoader implements ITileLoader {
    protected dataSource: DataSource;
    protected tileKey: TileKey;
    state: TileLoaderState;
    /**
     * Error object if loading or decoding failed.
     */
    error?: Error;
    protected m_priority: number;
    /**
     * The abort controller notifying the [[DataProvider]] to cancel loading.
     */
    private loadAbortController;
    /**
     * The promise which is resolved when loading and decoding have finished.
     */
    private donePromise?;
    /**
     * The internal function that is called when loading and decoding have finished successfully.
     */
    private resolveDonePromise?;
    /**
     * The internal function that is called when loading and decoding failed.
     */
    private rejectedDonePromise?;
    /**
     * Set up loading of a single [[Tile]].
     *
     * @param dataSource - The [[DataSource]] the tile belongs to.
     * @param tileKey - The quadtree address of a [[Tile]].
     */
    constructor(dataSource: DataSource, tileKey: TileKey);
    /**
     * @override
     */
    get priority(): number;
    /**
     * @override
     */
    set priority(value: number);
    /**
     * @override
     */
    loadAndDecode(): Promise<TileLoaderState>;
    /**
     * @override
     */
    waitSettled(): Promise<TileLoaderState>;
    /**
     * @override
     */
    cancel(): void;
    /**
     * @override
     */
    get isFinished(): boolean;
    /**
     * Called on load cancelation, may be overriden to extend behaviour.
     */
    protected cancelImpl(): void;
    /**
     * Called on tile load.
     *
     * @param abortSignal - Signal emitted to abort loading.
     * @param onDone - Callback that must be called once the loading is done.
     * @param onError - Callback that must be called on loading error.
     */
    protected abstract loadImpl(abortSignal: AbortSignal, onDone: (doneState: TileLoaderState) => void, onError: (error: Error) => void): void;
    /**
     * Start loading. Only call if loading did not start yet.
     */
    private load;
    /**
     * Called when loading and decoding has finished successfully. Resolves loading promise if the
     * state is Ready, otherwise it rejects the promise with the supplied state.
     *
     * @param doneState - The latest state of loading.
     */
    private onDone;
    /**
     * Called when loading or decoding has finished with an error.
     *
     * @param error - Error object describing the failing.
     */
    private onError;
}
//# sourceMappingURL=BaseTileLoader.d.ts.map