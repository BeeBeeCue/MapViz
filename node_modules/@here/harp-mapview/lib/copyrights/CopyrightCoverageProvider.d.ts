import { GeoBox } from "@here/harp-geoutils";
import { ILogger } from "@here/harp-utils";
import { CopyrightInfo } from "./CopyrightInfo";
import { CopyrightProvider } from "./CopyrightProvider";
/**
 * Schema of [Map Tile API copyright
 * endpoint](https://developer.here.com/documentation/map-tile/topics/resource-copyright.html) JSON
 * response.
 */
export interface AreaCopyrightInfo {
    /**
     * Minimum zoom level for the specified copyright label.
     */
    minLevel?: number;
    /**
     * Maximum zoom level for the specified copyright label.
     */
    maxLevel?: number;
    /**
     * Copyright text to display after the copyright symbol on the map.
     */
    label: string;
    /**
     * Verbose copyright text of the label to display by mouse over label or info menu entry.
     */
    alt?: string;
    /**
     * The bounding boxes define areas where specific copyrights are valid. A bounding box is
     * defined by bottom (latitude), left (longitude) and top (latitude), right (longitude).
     *
     * The default copyright has no boxes element and covers all other areas.
     */
    boxes?: Array<[number, number, number, number]>;
}
/**
 * Schema of [Map Tile API copyright
 * endpoint](https://developer.here.com/documentation/map-tile/topics/resource-copyright.html) JSON
 * response.
 */
export interface CopyrightCoverageResponse {
    [scheme: string]: AreaCopyrightInfo[];
}
/**
 * Base class to provide copyrights based on copyright coverage information, defined by geographical
 * bounding boxes and relevant zoom level ranges.
 */
export declare abstract class CopyrightCoverageProvider implements CopyrightProvider {
    /** Logger instance. */
    protected readonly logger: ILogger;
    private m_cachedTreePromise;
    /** Asynchronously retrieves copyright coverage data.
     * @param abortSignal - Optional AbortSignal to cancel the request.
     */
    abstract getCopyrightCoverageData(abortSignal?: AbortSignal): Promise<AreaCopyrightInfo[]>;
    /** @inheritdoc */
    getTree(): Promise<any>;
    /** @inheritdoc */
    getCopyrights(geoBox: GeoBox, level: number): Promise<CopyrightInfo[]>;
    /**
     * Initializes RBush.
     *
     * @param entries - Entries for tree.
     * @returns RBush instance.
     */
    initRBush(entries: AreaCopyrightInfo[]): any;
}
//# sourceMappingURL=CopyrightCoverageProvider.d.ts.map