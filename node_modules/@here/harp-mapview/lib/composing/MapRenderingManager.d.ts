import { IBloomEffect, IOutlineEffect, ISepiaEffect, IVignetteEffect } from "@here/harp-datasource-protocol";
import * as THREE from "three";
import { IPassManager } from "./IPassManager";
import { MSAASampling } from "./MSAARenderPass";
/**
 * Interface for the antialias settings passed when instantiating
 * a {@link MapView}, and transferred to
 * the {@link MapRenderingManager} instance.
 *
 * @remarks
 * These parameters can be changed at runtime as opposed to
 * the native WebGL antialiasing.
 */
export interface IMapAntialiasSettings {
    /**
     * Whether the MSAA is enabled or not.
     *
     * @default `false`
     */
    msaaEnabled: boolean;
    /**
     * The sampling level to use for MSAA during continuous rendering.
     *
     * @default `MSAASampling.Level_1`
     */
    dynamicMsaaSamplingLevel?: MSAASampling;
    /**
     * The sampling level to use for MSAA when the rendering stops.
     *
     * @default `MSAASampling.Level_4`
     */
    staticMsaaSamplingLevel?: MSAASampling;
}
/**
 * The `MapRenderingManager` class manages the map rendering (as opposed to text) by dispatching the
 * {@link MapRenderingManager.render} call to a set of internal {@link Pass} instances.
 *
 * @remarks It provides an API to modify some of the rendering
 * processes like the antialiasing behaviour at runtime.
 */
export interface IMapRenderingManager extends IPassManager {
    /**
     * Bloom effect parameters.
     */
    bloom: IBloomEffect;
    /**
     * Outline effect parameters.
     */
    outline: IOutlineEffect;
    /**
     * Vignette effect parameters.
     */
    vignette: IVignetteEffect;
    /**
     * Sepia effect parameters.
     */
    sepia: ISepiaEffect;
    /**
     * Set a `pixelRatio` for dynamic rendering (i.e. during animations). If a value is specified,
     * the `LowResRenderPass` will be employed to used to render the scene into a lower resolution
     * render target, which will then be rendered to the screen.
     */
    lowResPixelRatio?: number;
    /**
     * The level of MSAA sampling while the user interacts. It should be a low level so that the
     * MSAA does not impact the framerate.
     */
    dynamicMsaaSamplingLevel: MSAASampling;
    /**
     * Enable or disable the MSAA. If disabled, `MapRenderingManager` will use the renderer provided
     * in the {@link MapRenderingManager.render} method to render the scene.
     */
    msaaEnabled: boolean;
    /**
     * The higher level of MSAA sampling for a last frame to render, when the camera is static. It
     * can be a high level, providing high quality renders requiring few tens of seconds, since no
     * frame is expected to immediately follow in the requestAnimationFrame. It is still limited by
     * zooming, since zooming is not requestAnimationFrame-based and can lead to stuttering if the
     * render time is too long, except on desktop Mac, where mouse interaction already implements
     * some damping. Higher levels of sampling may lead to noticeable color banding, visible in
     * areas with a slight color gradient, like large areas or the sky background.
     */
    staticMsaaSamplingLevel: MSAASampling;
    /**
     * The method to call to render the map. This method depends on an `isStaticFrame` boolean that
     * notifies the pass manager to switch to a higher level render quality for the last frame.
     *
     * @param renderer - The ThreeJS WebGLRenderer instance to render the map with.
     * @param isStaticFrame - Whether the frame to render is static or dynamic. Selects level of
     * antialiasing.
     * @param time - Optional time argument provided by the requestAnimationFrame, to pass to
     * sub-passes.
     */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, isStaticFrame: boolean, time?: number): void;
    /**
     * Updating the outline rebuilds the outline materials of every outlined mesh.
     *
     * @param options - outline options from the {@link @here/harp-datasource-protocol#Theme}.
     */
    updateOutline(options: {
        thickness: number;
        color: string;
        ghostExtrudedPolygons: boolean;
    }): void;
}
/**
 * The implementation of {@link IMapRenderingManager} to
 * instantiate in {@link MapView} and manage the map
 * rendering.
 */
export declare class MapRenderingManager implements IMapRenderingManager {
    bloom: {
        enabled: boolean;
        strength: number;
        radius: number;
        threshold: number;
    };
    outline: {
        enabled: boolean;
        thickness: number;
        color: string;
        ghostExtrudedPolygons: boolean;
        needsUpdate: boolean;
    };
    vignette: {
        enabled: boolean;
        offset: number;
        darkness: number;
    };
    sepia: {
        enabled: boolean;
        amount: number;
    };
    private m_width;
    private m_height;
    private m_outlineEffect?;
    private m_msaaPass;
    private readonly m_renderPass;
    private readonly m_target1;
    private readonly m_target2;
    private m_bloomPass?;
    private m_sepiaPass;
    private m_vignettePass;
    private readonly m_readBuffer;
    private m_dynamicMsaaSamplingLevel;
    private m_staticMsaaSamplingLevel;
    private m_lowResPass;
    /**
     * The constructor of `MapRenderingManager`.
     *
     * @param width - Width of the frame buffer.
     * @param height - Height of the frame buffer.
     * @param lowResPixelRatio - The `pixelRatio` determines the resolution of the internal
     *  `WebGLRenderTarget`. Values between 0.5 and `window.devicePixelRatio` can be tried to give
     * good results. A value of `undefined` disables the low res render pass. The value should not
     * be larger than`window.devicePixelRatio`.
     * @param antialiasSetting - The object defining the demeanor of MSAA.
     */
    constructor(width: number, height: number, lowResPixelRatio: number | undefined, antialiasSettings?: IMapAntialiasSettings | undefined);
    updateOutline(options: {
        thickness: number;
        color: string;
        ghostExtrudedPolygons: boolean;
    }): void;
    /**
     * The method to call to render the map with the `MapRenderingManager` instance. It contains the
     * chain of sub-passes that can transfer the write and read buffers, and other sheer rendering
     * conditions as disabling AA when a high DPI device is in use.
     *
     * @param renderer - The ThreeJS WebGLRenderer instance to render the map with.
     * @param scene - The ThreeJS Scene instance containing the map objects to render.
     * @param camera - The ThreeJS Camera instance to render the scene through.
     * @param isStaticFrame - Whether the frame to render is static or dynamic. Selects level of
     * antialiasing.
     */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, isStaticFrame: boolean): void;
    /**
     * The resize function to call on resize events to resize the render targets. It shall include
     * the resize methods of all the sub-passes used in `MapRenderingManager`.
     *
     * @param width - New width to use.
     * @param height - New height to use.
     */
    setSize(width: number, height: number): void;
    /**
     * The `lowResPixelRatio` determines the resolution of the internal `WebGLRenderTarget`. Values
     * between 0.5 and `window.devicePixelRatio` can be tried to give  good results. A value of
     * `undefined` disables the low res render pass. The value should not be larger than
     * `window.devicePixelRatio`.
     */
    get lowResPixelRatio(): number | undefined;
    set lowResPixelRatio(pixelRatio: number | undefined);
    /**
     * Set the level of sampling while the user interacts.
     *
     * @param samplingLevel - The sampling level.
     */
    set dynamicMsaaSamplingLevel(samplingLevel: MSAASampling);
    /**
     * Return the sampling level defined during continuous rendering.
     */
    get dynamicMsaaSamplingLevel(): MSAASampling;
    /**
     * Enable or disable the MSAA. If disabled, `MapRenderingManager` will use the renderer provided
     * in the {@link MapRenderingManager.render} method to render the scene.
     *
     * @param value - If `true`, MSAA is enabled, disabled otherwise.
     */
    set msaaEnabled(value: boolean);
    /**
     * Return whether the MSAA is enabled.
     */
    get msaaEnabled(): boolean;
    /**
     * Set the sampling level for rendering static frames.
     *
     * @param samplingLevel - The sampling level.
     */
    set staticMsaaSamplingLevel(samplingLevel: MSAASampling);
    /**
     * Return the sampling level defined for rendering static frames.
     */
    get staticMsaaSamplingLevel(): MSAASampling;
}
//# sourceMappingURL=MapRenderingManager.d.ts.map