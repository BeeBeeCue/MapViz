import { TileKey } from "@here/harp-geoutils";
import { TextElementGroup } from "./TextElementGroup";
import { TextElementFilter, TextElementGroupState } from "./TextElementGroupState";
import { TextElementState } from "./TextElementState";
/**
 * Caches the state of text element groups currently rendered as well as the text element states
 * belonging to them, including their fading state and text deduplication information.
 */
export declare class TextElementStateCache {
    private readonly m_referenceMap;
    private m_sortedGroupStates;
    private readonly m_textMap;
    /**
     * Gets the state corresponding to a given text element group or sets a newly created state if
     * not found. It updates the states of the text elements belonging to the group using the
     * specified parameters.
     * @param textElementGroup - The group of which the state will be obtained.
     * @param tileKey - The key of the tile to which the group belongs.
     * @param textElementFilter - Filter used to decide if a text element must be initialized,
     * @see [[TextElementGroupState]] construction.
     * @returns Tuple with the group state as first element and a boolean indicating whether the
     * state was found in cache (`true`) or newly created (`false`) as second element.
     */
    getOrSet(textElementGroup: TextElementGroup, tileKey: TileKey, textElementFilter: TextElementFilter): [TextElementGroupState, boolean];
    get size(): number;
    /**
     * @hidden
     * @returns Size of internal cache for deduplication for debugging purposes.
     */
    get cacheSize(): number;
    /**
     * @returns All text element group states in the cache by group priority.
     */
    get sortedGroupStates(): TextElementGroupState[];
    /**
     * Updates state of all cached groups, discarding those that are not needed anymore.
     * @param time - The current time.
     * @param disableFading - `True` if fading is currently disabled, `false` otherwise.
     * @param findReplacements - `True` to replace each visible unvisited text element with a
     * visited duplicate.
     * @param zoomLevel - Current zoom level.
     * @returns `True` if any textElementGroup was evicted from cache, false otherwise.
     */
    update(time: number, disableFading: boolean, findReplacements: boolean, zoomLevel: number): boolean;
    /**
     * Clears visited state for all text element groups in cache.
     */
    clearVisited(): void;
    clearTextCache(): void;
    /**
     * Clears the whole cache contents.
     */
    clear(): void;
    /**
     * Removes duplicates for a given text element.
     *
     * @param zoomLevel - Current zoom level.
     * @param elementState - State of the text element to deduplicate.
     * @returns True if it's the remaining element after deduplication, false if it's been marked
     * as duplicate.
     */
    deduplicateElement(zoomLevel: number, elementState: TextElementState): boolean;
    /**
     * Replaces a visible unvisited text element with a visited duplicate.
     * @param zoomLevel - Current zoom level.
     * @param elementState - State of the text element to deduplicate.
     * @returns `true` if an item from the cache has been reused and its state has been replaced,
     * `false` otherwise.
     */
    replaceElement(zoomLevel: number, elementState: TextElementState): boolean;
    /**
     * Gets the state corresponding to a given text element group.
     * @param textElementGroup - The group of which the state will be obtained.
     * @returns The group state if cached, otherwise `undefined`.
     */
    private get;
    /**
     * Sets a specified state for a given text element group.
     * @param textElementGroup -  The group of which the state will be set.
     * @param textElementGroupState - The state to set for the group.
     */
    private set;
    private findDuplicate;
}
//# sourceMappingURL=TextElementStateCache.d.ts.map