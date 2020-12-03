/**
 * Copyright info attached to data displayed on map. Provided by {@link DataSource} and attached
 * to {@link Tile}s.
 *
 * In most cases, an application should display this information on {@link MapView} to conform with
 * licencing terms of its map data providers.
 *
 * @see {@link CopyrightElementHandler}
 */
export interface CopyrightInfo {
    /**
     * Unique id of the copyright holder.
     *
     * @remarks
     * `id`s should be unique. It is recommended to build them from unique identifiers like
     * registered domain names.
     *
     * Examples:
     *
     *  * `openstreetmap.org` - for data originating from OpenStreetMap project
     *  * `naturalearthdata.com` - for data originating from Natural Earth dataset
     *
     * Note: {@link DataSource} may return {@link CopyrightInfo}
     * with only `id`, thus defining only holder
     * of copyright, however, valid attribution may require proper `label` and `link`.
     *
     * Entries with same `id` are deduplicated by {@link CopyrightInfo.mergeArrays}.
     */
    id: string;
    /**
     * Copyright text to display after the copyright symbol on the map.
     *
     * If undefined, `id` is used as text label.
     * Set it to empty string to not render a copyright info.
     */
    label?: string;
    /**
     * Optional URL pointing to further copyright information.
     */
    link?: string;
    /**
     * Optional, copyright notice year.
     */
    year?: number;
}
export declare namespace CopyrightInfo {
    /**
     * Merge {@link CopyrightInfo} arrays, removing duplicates.
     *
     * `id` and `label` are considered keys in deduplication algorithm.
     *
     * @param sources - non-duplicate elements from this array are added to `target`
     * @returns merge of all copyright infos in `sources`
     */
    function mergeArrays(a: CopyrightInfo[], b?: CopyrightInfo[]): CopyrightInfo[];
    /**
     * Format copyright information to a HTML string that can be displayed in the UI.
     *
     * * Empty list returns empty string.
     * * Entries with empty (but defined) labels are skipped.
     *
     * @param copyrightInfo - Array of copyrights to format.
     */
    function formatAsHtml(copyrightInfo: CopyrightInfo[]): string;
}
//# sourceMappingURL=CopyrightInfo.d.ts.map