import { HorizontalAlignment, TextLayoutStyle, TextPlacement, VerticalAlignment } from "@here/harp-text-canvas";
/**
 * Layout state of the text part of the `TextElement`.
 *
 * Used mainly for multi-anchor placement algorithm.
 * @hidden
 */
export declare class LayoutState {
    private m_hAlign;
    private m_vAlign;
    constructor(placement: TextPlacement);
    /**
     * Set layout based on theme style defined and optional text placement.
     *
     * @param placement - The optional new anchor placement.
     */
    set textPlacement(placement: TextPlacement);
    /**
     * Acquire current placement setup.
     *
     * Function returns alternative or base placement depending on layout state.
     *
     * @returns The current anchor placement.
     */
    get textPlacement(): TextPlacement;
    /**
     * Reset existing `LayoutState` to contain values from style/theme layout.
     */
    reset(layoutStyle: TextLayoutStyle): void;
    get horizontalAlignment(): HorizontalAlignment;
    get verticalAlignment(): VerticalAlignment;
}
//# sourceMappingURL=LayoutState.d.ts.map