import * as THREE from "three";
/**
 * Use `ColorCache` to reuse a color specified by name and save allocation as well as
 * setup time.
 *
 * Implemented as a singleton. Do not modify colors after getting them from the `ColorCache`.
 */
export declare class ColorCache {
    /**
     * Return instance of `ColorCache`.
     */
    static get instance(): ColorCache;
    private static readonly m_instance;
    private readonly m_map;
    /**
     * Returns the color for the given `colorCode`. This function may reuse a previously generated
     * color, so you cannot modify the contents of the color.
     *
     * @param colorCode - ThreeJS color code or name. You must provide a valid color code or name,
     * as this function does not do any validation.
     */
    getColor(colorCode: string | number): THREE.Color;
    /**
     * Returns the number of elements in the cache.
     */
    get size(): number;
    /**
     * Clears the cache. Only references to the THREE.Color are removed from the cache.
     * Consequently, clearing the cache does not cause any negative visual impact.
     */
    clear(): void;
}
//# sourceMappingURL=ColorCache.d.ts.map