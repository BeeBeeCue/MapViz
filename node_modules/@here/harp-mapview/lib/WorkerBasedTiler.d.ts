import { GeoJson, ITiler } from "@here/harp-datasource-protocol";
import { TileKey } from "@here/harp-geoutils";
import { ConcurrentWorkerSet } from "./ConcurrentWorkerSet";
/**
 * Tiler based on [[ConcurrentWorkerSet]].
 *
 * Tiles payloads using workers running in separate contexts (also known as `WebWorkers`):
 * - connection establishment,
 * - sends tile requests,
 * - configuration.
 */
export declare class WorkerBasedTiler implements ITiler {
    private readonly workerSet;
    private readonly tilerServiceType;
    private readonly serviceId;
    private m_serviceCreated;
    /**
     * Creates a new `WorkerBasedTiler`.
     *
     * @param workerSet - [[ConcurrentWorkerSet]] this tiler will live in.
     * @param tilerServiceType - Service type identifier.
     */
    constructor(workerSet: ConcurrentWorkerSet, tilerServiceType: string);
    /**
     * Dispose of dedicated tiler services in workers and remove reference to underlying
     * [[ConcurrentWorkerSet]].
     */
    dispose(): void;
    /**
     * Connects to [[WorkerServiceManager]]s in underlying [[ConcurrentWorkerSet]] and creates
     * dedicated [[TilerService]]s in all workers to serve tiling requests.
     */
    connect(): Promise<void>;
    /**
     * Register index in the tiler. Indexes registered in the tiler can be later used to retrieved
     * tiled payloads using `getTile`.
     *
     * @param indexId - Index identifier.
     * @param input - Url to the index payload, or direct GeoJSON.
     */
    registerIndex(indexId: string, input: URL | GeoJson): Promise<void>;
    /**
     * Update index in the tiler. Indexes registered in the tiler can be later used to retrieved
     * tiled payloads using `getTile`.
     *
     * @param indexId - Index identifier.
     * @param input - Url to the index payload, or direct GeoJSON.
     */
    updateIndex(indexId: string, input: URL | GeoJson): Promise<void>;
    /**
     * Retrieves a tile for a previously registered index.
     *
     * @param indexId - Index identifier.
     * @param tileKey - The {@link @here/harp-geoutils#TileKey} that identifies the tile.
     */
    getTile(indexId: string, tileKey: TileKey): Promise<{}>;
}
//# sourceMappingURL=WorkerBasedTiler.d.ts.map