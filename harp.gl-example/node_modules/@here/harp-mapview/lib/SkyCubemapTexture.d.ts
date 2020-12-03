import { CubemapSky } from "@here/harp-datasource-protocol";
import { Texture } from "three";
/**
 * Number of faces that form a [[SkyCubemapTexture]].
 */
export declare const SKY_CUBEMAP_FACE_COUNT = 6;
/**
 * Maps the faceId to the expected position in the threejs faces array.
 */
export declare enum SkyCubemapFaceId {
    "positiveX" = 0,
    "negativeX" = 1,
    "positiveY" = 2,
    "negativeY" = 3,
    "positiveZ" = 4,
    "negativeZ" = 5
}
/**
 * Class that handles loading all 6 faces of a [[CubeTexture]], to be used with [[SkyBackground]].
 */
export declare class SkyCubemapTexture {
    private m_skybox;
    /**
     * Constructs a new `SkyCubemapTexture`.
     *
     * @param sky - Initial [[CubemapSky]] configuration.
     */
    constructor(sky: CubemapSky);
    /**
     * Disposes allocated resources.
     */
    dispose(): void;
    /**
     * `SkyCubemapTexture`'s texture resource.
     */
    get texture(): Texture;
    /**
     * Updates the `SkyCubemapTexture` with new parameters.
     *
     * @param params - New [[CubemapSky]] configuration.
     */
    updateTexture(sky: CubemapSky): void;
    private createCubemapFaceArray;
}
//# sourceMappingURL=SkyCubemapTexture.d.ts.map