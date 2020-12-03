import { GradientSky } from "@here/harp-datasource-protocol";
import { ProjectionType } from "@here/harp-geoutils";
import { Texture } from "three";
export declare const DEFAULT_TEXTURE_SIZE = 512;
export declare const DEFAULT_MONOMIAL_POWER = 1;
/**
 * Class tha generates a texture containing a linear gradient, to be used with [[SkyBackground]].
 *
 * The gradient is mapped onto a sphere, where `topColor` maps to the top of the upper hemisphere,
 * `bottomColor` to the bottom of the upper hemisphere, and `groundColor` fills the bottom
 *  hemisphere..
 */
export declare class SkyGradientTexture {
    private readonly m_projectionType;
    private readonly m_height;
    private readonly m_width;
    private readonly m_faceCount;
    private readonly m_faces;
    private readonly m_skybox?;
    private readonly m_farClipPlaneDividedVertically?;
    private readonly m_groundPlane?;
    private readonly m_bottomMidFarPoint?;
    private readonly m_topMidFarPoint?;
    private readonly m_horizonPosition?;
    private readonly m_farClipPlaneCorners?;
    /**
     * Constructs a new `SkyGradientTexture`.
     *
     * @param sky - Initial [[GradientSky]] configuration.
     * @param m_projectionType - {@link MapView}'s projection type.
     * @param m_height - Optional height parameter.
     */
    constructor(sky: GradientSky, m_projectionType: ProjectionType, m_height?: number);
    /**
     * Disposes allocated resources.
     */
    dispose(): void;
    /**
     * `SkyGradientTexture`'s texture resource (simple texture or cubemap depending on
     * {@link MapView}'s projection).
     */
    get texture(): Texture;
    /**
     * This method updates the position of the texture depending on the camera frustum.
     *
     * @param camera - The camera used in the map view.
     */
    update(camera: THREE.Camera): void;
    /**
     * Updates the `SkyGradientTexture` with new parameters.
     *
     * @param params - New [[GradientSky]] configuration.
     */
    updateTexture(sky: GradientSky): void;
    private fillTextureData;
    private setHorizonPosition;
    private updateTexturePosition;
}
//# sourceMappingURL=SkyGradientTexture.d.ts.map