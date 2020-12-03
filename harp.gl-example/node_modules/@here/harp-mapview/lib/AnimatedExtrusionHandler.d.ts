import { MapEnv, Technique } from "@here/harp-datasource-protocol";
import { ExtrusionFeature } from "@here/harp-materials";
import { MapView } from "./MapView";
import { Tile } from "./Tile";
/**
 * Animation states for extrusion effect
 */
export declare enum AnimatedExtrusionState {
    None = 0,
    Started = 1,
    Finished = 2
}
/**
 * Handles animated extrusion effect of the buildings in {@link MapView}.
 */
export declare class AnimatedExtrusionHandler {
    private readonly m_mapView;
    /**
     * Animate the extrusion of the buildings if set to `true`.
     */
    enabled: boolean;
    /**
     * Duration of the building's extrusion in milliseconds
     */
    duration: number;
    private m_minZoomLevel;
    private m_forceEnabled;
    private readonly m_dataSourceMap;
    private m_state;
    private m_startTime;
    /**
     * Creates an {@link AnimatedExtrusionHandler} in {@link MapView}.
     *
     * @param m_mapView - Instance of {@link MapView} on which the animation will run.
     */
    constructor(m_mapView: MapView);
    /**
     * Returns whether the extrusion animation is force enabled or not.
     */
    get forceEnabled(): boolean;
    /**
     * If `forceEnabled` is set to `true` then `animateExtrusion` and `animateExtrusionDuration`
     * values from [[extrudedPolygonTechnique]] will be ignored and
     * `AnimatedExtrusionHandler.enabled` with `AnimatedExtrusionHandler.duration` will be used
     */
    set forceEnabled(force: boolean);
    /**
     * Gets min zoom level at which extruded animation is enabled.
     */
    get minZoomLevel(): number;
    /**
     * Sets the extrusion animation properties obtained from a given technique.
     * @internal
     * @param technique - The technique where the extrusion animation properties are defined.
     * @param env - The environment used to evaluate technique properties.
     * @returns True if the technique has animation enabled (or animation is forced), false
     * otherwise.
     */
    setAnimationProperties(technique: Technique, env: MapEnv): boolean;
    /**
     * Updates the extrusion animation for every frame.
     * @internal
     */
    update(zoomLevel: number): void;
    /**
     * Adds a tile to be animated.
     * @internal
     * @param tile - The tile to be animated.
     * @param materials - Extruded materials belonging to the tile.
     */
    add(tile: Tile, materials: ExtrusionFeature[]): void;
    /**
     * Is `true` if there's any extrusion animation ongoing.
     */
    get isAnimating(): boolean;
    private getTileMap;
    private getOrCreateTileMap;
    private skipAnimation;
    private wasAnyAncestorAnimated;
    private wasAnyDescendantAnimated;
    private removeTile;
    private animateExtrusion;
    private resetAnimation;
    private setExtrusionRatio;
    private setTileExtrusionRatio;
}
//# sourceMappingURL=AnimatedExtrusionHandler.d.ts.map