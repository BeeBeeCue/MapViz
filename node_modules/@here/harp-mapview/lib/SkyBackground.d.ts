import { CubemapSky, GradientSky } from "@here/harp-datasource-protocol";
import { ProjectionType } from "@here/harp-geoutils";
import * as THREE from "three";
/**
 * Class that handles {@link MapView}'s sky background.
 */
export declare class SkyBackground {
    private m_sky;
    private m_projectionType;
    private m_skyTexture?;
    /**
     * Constructs a new `SkyBackground`.
     *
     * @param m_sky - Sky configuration parameters.
     * @param m_projectionType - {@link MapView}'s projection type.
     * @param camera - {@link MapView}'s camera.
     */
    constructor(m_sky: GradientSky | CubemapSky, m_projectionType: ProjectionType, camera: THREE.Camera);
    /**
     * Disposes allocated resources.
     */
    dispose(): void;
    /**
     * Sky texture.
     */
    get texture(): THREE.Texture;
    /**
     * This method updates the skybox based on the camera position (needed for some types of sky).
     *
     * @param camera - The camera used in the map view.
     */
    updateCamera(camera: THREE.Camera): void;
    /**
     * Updates the sky texture with new parameters.
     *
     * @param params - New sky configuration parameters.
     * @param projectionType - Which projection is used, this may also change (in which case the
     * textures should be recreated).
     */
    updateTexture(params: GradientSky | CubemapSky, projectionType: ProjectionType): void;
}
//# sourceMappingURL=SkyBackground.d.ts.map