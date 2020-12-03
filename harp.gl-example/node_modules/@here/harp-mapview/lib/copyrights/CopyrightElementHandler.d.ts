import { MapView } from "../MapView";
import { CopyrightInfo } from "./CopyrightInfo";
/**
 * Helper class that maintains up-to-date {@link MapView} copyright information in DOM element.
 *
 * @example
 *
 *     // HTML snippet
 *     <div id="copyrightNotice" style="position:absolute; right:0; bottom:0; z-index:100"></div>
 *
 *     // JavaScript
 *     const mapView = new MapView({ ... });
 *     CopyrightElementHandler.install("copyrightNotice", mapView);
 */
export declare class CopyrightElementHandler {
    /**
     * Install {@link CopyrightElementHandler} on DOM element and - optionally -
     * attach to a {@link MapView} instance.
     *
     * @param element - HTML DOM element or a HTML DOM element id
     * @param mapView -, optional, [[attach]] to this {@link MapView}
     */
    static install(element: string | HTMLElement, mapView?: MapView): CopyrightElementHandler;
    /**
     * Static copyright info.
     *
     * Use when {@link MapView}'s {@link DataSource}'s do not provide proper copyright information.
     */
    staticInfo: CopyrightInfo[] | undefined;
    private readonly m_defaults;
    private m_element;
    private m_mapViews;
    /**
     * Creates a new `CopyrightElementHandler` that updates the DOM element with the copyright info
     * of the given `mapView`.
     *
     * Note: Generally, the static [[install]] method can be used to create and attach a new
     * `CopyrightElementHandler` to a {@link MapView}
     *
     * @param element - HTML DOM element or a HTML DOM element id
     * @param mapView - optional, [[attach]] to this {@link MapView} instance
     */
    constructor(element: string | HTMLElement, mapView?: MapView);
    /**
     * Destroys this object by removing all event listeners from the attached {@link MapView}s.
     */
    destroy(): void;
    /**
     * Attaches this {@link CopyrightInfo} updates from {@link MapView} instance.
     */
    attach(mapView: MapView): this;
    /**
     * Stop following {@link CopyrightInfo} updates from {@link MapView} instance.
     */
    detach(mapView: MapView): this;
    /**
     * Set {@link CopyrightInfo} defaults to be used in case
     * {@link DataSource} does not provide deatailed
     * copyright information.
     *
     * @remarks
     * The defaults will applied to all undefined `year`, `label` and `link` values in the copyright
     * information retrieved from {@link MapView}.
     */
    setDefaults(defaults: CopyrightInfo[] | undefined): this;
    /**
     * Sets the [[staticInfo]] property.
     *
     * A `CopyrightElementHandler` always displays a deduplicated sum of static copyright info and
     * copyright information obtained from attached {@link MapView}s.
     *
     * This information is used when {@link DataSource}
     * instances of given {@link MapView} do not provide
     * copyright information.
     */
    setStaticCopyightInfo(staticInfo: CopyrightInfo[] | undefined): this;
    /**
     * Update copyright info text in controlled HTML element.
     */
    update: () => void;
}
//# sourceMappingURL=CopyrightElementHandler.d.ts.map