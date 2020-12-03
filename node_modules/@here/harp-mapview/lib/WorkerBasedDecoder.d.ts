import { DecodedTile, DecoderOptions, ITileDecoder, OptionsMap, RequestController, TileInfo } from "@here/harp-datasource-protocol";
import { Projection, TileKey } from "@here/harp-geoutils";
import { ConcurrentWorkerSet } from "./ConcurrentWorkerSet";
/**
 * Decoder based on [[ConcurrentWorkerSet]].
 *
 * Decodes tiles using workers running in separate contexts (also known as `WebWorkers`):
 * - connection establishment,
 * - sends decode requests,
 * - configuration.
 */
export declare class WorkerBasedDecoder implements ITileDecoder {
    private readonly workerSet;
    private readonly decoderServiceType;
    private readonly serviceId;
    private m_serviceCreated;
    /**
     * Creates a new `WorkerBasedDecoder`.
     *
     * @param workerSet - [[ConcurrentWorkerSet]] this tiler will live in.
     * @param decoderServiceType - Service type identifier.
     */
    constructor(workerSet: ConcurrentWorkerSet, decoderServiceType: string);
    /**
     * Dispose of dedicated tile decoder services in workers and remove reference to underlying
     * [[ConcurrentWorkerSet]].
     */
    dispose(): void;
    /**
     * Connects to [[WorkerServiceManager]]s in underlying [[ConcurrentWorkerSet]] and creates
     * dedicated [[TileDecoderService]]s in all workers to serve decode requests.
     */
    connect(): Promise<void>;
    /**
     * Get {@link Tile} from tile decoder service in worker.
     *
     * @remarks
     * Invokes {@link @here/harp-datasource-protocol#DecodeTileRequest} on
     * [[TileDecoderService]] running in worker pool.
     */
    decodeTile(data: ArrayBufferLike, tileKey: TileKey, projection: Projection, requestController?: RequestController): Promise<DecodedTile>;
    /**
     * Get {@link @here/harp-datasource-protocol#TileInfo} from tile decoder service in worker.
     *
     * @remarks
     * Invokes {@link @here/harp-datasource-protocol#TileInfoRequest}
     * on [[TileDecoderService]] running in worker pool.
     */
    getTileInfo(data: ArrayBufferLike, tileKey: TileKey, projection: Projection, requestController?: RequestController): Promise<TileInfo | undefined>;
    /**
     * Configure tile decoder service in workers.
     *
     * @remarks
     * Broadcasts {@link @here/harp-datasource-protocol#ConfigurationMessage}
     * to all [[TileDecoderService]]s running in worker pool.
     *
     * @param options - Options that will be applied to the styles
     * @param customOptions -   new options, undefined options are not changed
     */
    configure(options?: DecoderOptions, customOptions?: OptionsMap): void;
    /**
     * The number of workers started for this decoder. The value is `undefined` until the workers
     * have been created.
     */
    get workerCount(): number | undefined;
}
//# sourceMappingURL=WorkerBasedDecoder.d.ts.map