import { TileKey } from "@here/harp-geoutils";
import { TextElementGroup } from "./TextElementGroup";
import { TextElementState } from "./TextElementState";
/**
 * Type of functions used to do early rejection of elements during group state creation or update.
 * @param textElementState - The state of the text element to check.
 * @returns `undefined` if element was rejected, otherwise its current view distance.
 */
export declare type TextElementFilter = (textElementState: TextElementState) => number | undefined;
/**
 * `TextElementGroupState` keeps the state of a text element group and each element in it while
 * they're being rendered.
 */
export declare class TextElementGroupState {
    readonly group: TextElementGroup;
    readonly tileKey: TileKey;
    private readonly m_textElementStates;
    private m_visited;
    /**
     * Creates the state for specified group.
     * @param group - The group of which the state will be created.
     * @param tileKey - The key of the tile to which this group belongs.
     * @param filter - Function used to do early rejection. @see [[TextElementFilter]].
     */
    constructor(group: TextElementGroup, tileKey: TileKey, filter: TextElementFilter);
    /**
     * Indicates whether the group has been submitted to the
     * {@link TextElementsRenderer} in the current frame.
     */
    get visited(): boolean;
    set visited(visited: boolean);
    /**
     * @returns the priority of the text elements in the group.
     */
    get priority(): number;
    /**
     * Updates the fading state of all text elements within the group to the specified time.
     * @param time - The time to which the fading state will be updated.
     * @param disableFading - `true` if fading is disabled, `false` otherwise.
     */
    updateFading(time: number, disableFading: boolean): void;
    /**
     * Calls the specified callback for every visible text elements in the group.
     * @param visibleElementsCallback - Functions that will be called for every visible text element
     * in the group.
     */
    traverseVisibleElements(visibleElementsCallback: (e: TextElementState) => void): void;
    /**
     * Updates the states of elements within the group.
     * @param filter - Function used to do early rejection. @see [[TextElementFilter]].
     */
    updateElements(filter: TextElementFilter): void;
    get size(): number;
    /**
     * Returns text element states.
     * @returns Array of element states.
     */
    get textElementStates(): TextElementState[];
}
//# sourceMappingURL=TextElementGroupState.d.ts.map