/**
 * State of fading.
 */
export declare enum FadingState {
    Undefined = 0,
    FadingIn = 1,
    FadedIn = 2,
    FadingOut = -1,
    FadedOut = -2
}
/**
 * Time to fade in/fade out the labels in milliseconds.
 */
export declare const DEFAULT_FADE_TIME = 800;
/**
 * State of rendering of the icon and text part of the `TextElement`. Mainly for fading the elements
 * in and out, to compute the opacity.
 *
 * @hidden
 */
export declare class RenderState {
    fadeTime: number;
    /**
     * Current fading value [0..1]
     */
    value: number;
    /**
     * Timestamp the fading started.
     */
    startTime: number;
    /**
     * Computed opacity depending on value.
     */
    opacity: number;
    private m_state;
    /**
     * Create a `RenderState`.
     *
     * @param fadeTime - The duration of the fading in milliseconds.
     */
    constructor(fadeTime?: number);
    /**
     * Reset existing `RenderState` to appear like a fresh state.
     */
    reset(): void;
    /**
     * @returns `true` if element state is `FadingState.Undefined`.
     */
    isUndefined(): boolean;
    /**
     * @returns `true` if element is either fading in or fading out.
     */
    isFading(): boolean;
    /**
     * @returns `true` if element is fading in.
     */
    isFadingIn(): boolean;
    /**
     * @returns `true` if element is fading out.
     */
    isFadingOut(): boolean;
    /**
     * @returns `true` if element is done with fading in.
     */
    isFadedIn(): boolean;
    /**
     * @returns `true` if element is done with fading out.
     */
    isFadedOut(): boolean;
    /**
     * @returns `true` if state is neither faded out nor undefined and the opacity is larger
     * than 0.
     */
    isVisible(): boolean;
    /**
     * Updates the state to [[FadingState.FadingIn]].
     * If previous state is [[FadingState.FadingIn]] or [[FadingState.FadedIn]] it remains
     * unchanged.
     *
     * @param time - Current time.
     * @param disableFading - Optional flag to disable fading.
     */
    startFadeIn(time: number, disableFading?: boolean): void;
    /**
     * Updates the state to [[FadingState.FadingOut]].
     * If previous state is [[FadingState.FadingOut]], [[FadingState.FadedOut]] or
     * [[FadingState.Undefined]] it remains unchanged.
     *
     * @param time - Current time.
     */
    startFadeOut(time: number): void;
    /**
     * Updates opacity to current time, changing the state to [[FadingState.FadedOut]] or
     * [[FadingState.FadedIn]] when the opacity becomes 0 or 1 respectively.
     * It does nothing if [[isFading]] !== `true`.
     *
     * @param time - Current time.
     * @param disableFading - `true` if fading is disabled, `false` otherwise.
     */
    updateFading(time: number, disableFading: boolean): void;
}
//# sourceMappingURL=RenderState.d.ts.map