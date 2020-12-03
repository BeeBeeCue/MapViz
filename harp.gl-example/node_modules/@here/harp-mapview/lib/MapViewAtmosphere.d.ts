import { Theme } from "@here/harp-datasource-protocol";
import { Projection } from "@here/harp-geoutils";
import * as THREE from "three";
import { MapAnchors } from "./MapAnchors";
/**
 * Atmosphere effect variants.
 */
declare enum AtmosphereVariant {
    Ground = 1,
    Sky = 2,
    SkyAndGround = 3
}
/**
 * Atmosphere shader variants.
 */
declare enum AtmosphereShadingVariant {
    ScatteringShader = 0,
    SimpleColor = 1,
    Wireframe = 2
}
/**
 * Lists light modes.
 */
export declare enum AtmosphereLightMode {
    LightOverhead = 0,
    LightDynamic = 1
}
/**
 * Class that provides {@link MapView}'s atmospheric scattering effect.
 */
export declare class MapViewAtmosphere {
    private readonly m_mapAnchors;
    private readonly m_sceneCamera;
    private readonly m_projection;
    private readonly m_rendererCapabilities;
    private readonly m_updateCallback?;
    private readonly m_atmosphereVariant;
    private readonly m_materialVariant;
    /**
     * User data name attribute assigned to created mesh.
     */
    static SkyAtmosphereUserName: string;
    /**
     * User data name attribute assigned to created mesh.
     */
    static GroundAtmosphereUserName: string;
    /**
     * Check if map anchors have already atmosphere effect added.
     *
     * @param mapAnchors - MapAnchors to check.
     */
    static isPresent(mapAnchors: MapAnchors): boolean;
    private m_enabled;
    private m_skyGeometry?;
    private m_skyMaterial?;
    private m_skyMesh?;
    private m_groundGeometry?;
    private m_groundMaterial?;
    private m_groundMesh?;
    private readonly m_clipPlanesEvaluator;
    private readonly m_lightDirection;
    /**
     * Creates and adds `Atmosphere` effects to the scene.
     *
     * @note Currently works only with globe projection.
     *
     * @param m_mapAnchors - The {@link MapAnchors} instance where the effect will be added.
     * @param m_sceneCamera - The camera used to render entire scene.
     * @param m_projection - The geo-projection used to transform geo coordinates to
     *                       cartesian space.
     * @param m_rendererCapabilities The capabilities of the WebGL renderer.
     * @param m_updateCallback - The optional callback to that should be called whenever atmosphere
     * configuration changes, may be used to inform related components (`MapView`) to redraw.
     * @param m_atmosphereVariant - The optional atmosphere configuration variant enum
     * [[AtmosphereVariant]], which denotes where the atmosphere scattering effect should be
     * applied, it may be ground or sky atmosphere only or most realistic for both, which is
     * chosen by default.
     * @param m_materialVariant - The optional material variant to be used, mainly for
     * testing and tweaking purposes.
     */
    constructor(m_mapAnchors: MapAnchors, m_sceneCamera: THREE.Camera, m_projection: Projection, m_rendererCapabilities: THREE.WebGLCapabilities, m_updateCallback?: (() => void) | undefined, m_atmosphereVariant?: AtmosphereVariant, m_materialVariant?: AtmosphereShadingVariant);
    get skyMesh(): THREE.Mesh | undefined;
    get groundMesh(): THREE.Mesh | undefined;
    /**
     * Allows to enable/disable the atmosphere effect, regardless of the theme settings.
     *
     * Use this method to change the setup in runtime without defining corresponding theme setup.
     *
     * @param enable - A boolean that specifies whether the atmosphere should be enabled or
     *                 disabled.
     */
    set enabled(enable: boolean);
    /**
     * Returns the current atmosphere status, enabled or disabled.
     */
    get enabled(): boolean;
    set lightMode(lightMode: AtmosphereLightMode);
    /**
     * Disposes allocated resources.
     */
    dispose(): void;
    /**
     * Sets the atmosphere depending on the
     * {@link @here/harp-datasource-protocol#Theme} instance provided.
     *
     * This function is called when a theme is loaded. Atmosphere is added only if the theme
     * contains a atmosphere definition with a:
     * - `color` property, used to set the atmosphere color.
     *
     * @param theme - A {@link @here/harp-datasource-protocol#Theme} instance.
     */
    reset(theme: Theme): void;
    private get disposed();
    /**
     * Handles atmosphere effect adding.
     */
    private addToMapAnchors;
    /**
     * Handles atmosphere effect removal.
     */
    private removeFromMapAnchors;
    private createSkyGeometry;
    private createGroundGeometry;
    private setupSkyForRendering;
    private setupGroundForRendering;
    private overrideClipPlanes;
    private revertClipPlanes;
}
export {};
//# sourceMappingURL=MapViewAtmosphere.d.ts.map