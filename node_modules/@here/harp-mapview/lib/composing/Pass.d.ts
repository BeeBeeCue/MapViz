import * as THREE from "three";
/**
 * The interface for the {@link Pass} class.
 */
export interface IPass {
    /**
     * Whether the {@link Pass} instance is active or not.
     * @default `true`.
     */
    enabled: boolean;
    /**
     * Whether the render method should target a WebGLRenderTarget instance, or the frame buffer.
     * @default `false`.
     */
    renderToScreen: boolean;
    /**
     * The resize method to extend in {@link Pass} implementations.
     *
     * @remarks
     * It resizes the render targets. Call on resize events.
     *
     * @param width - Width to resize to.
     * @param height - Height to resize to.
     */
    setSize(width: number, height: number): void;
    /**
     * The render method to extend in {@link Pass} implementations.
     *
     * @remarks
     * This is the place where the desired
     * effects or render operations are executed.
     *
     * @param renderer - The WebGLRenderer instance in use.
     * @param scene - The scene to render.
     * @param camera - The camera to render the scene through.
     * @param writeBuffer - The optional WebGLRenderTarget instance to write to.
     * @param readBuffer - The optional WebGLRenderTarget instance of a previous pass to write onto.
     * @param delta - The time argument from the requestAnimationFrame.
     */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, writeBuffer: THREE.WebGLRenderTarget | null, readBuffer: THREE.WebGLRenderTarget | null, delta?: number): void;
}
/**
 * The base class to extend for further passes in {@link MapView},
 * like the {@link MSAARenderPass},
 *
 * @remarks
 * `Pass` provides the core logic for both :
 * - render passes (proper scene renders),
 * - and shader passes (quad renders, i.e. effects added on top of the render output as a
 * postprocess).
 *
 * Even some shader passes still actually fall within the render pass category as they need to
 * re-render the scene to then deduce an effect, such as masking, AO, DoF etc. Others just need the
 * previous input image to apply a shader on top of it, as for bloom or NVIDIA's FXAA for example.
 * These only are proper shader passes.
 */
export declare class Pass implements IPass {
    enabled: boolean;
    renderToScreen: boolean;
    setSize(width: number, height: number): void;
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, writeBuffer: THREE.WebGLRenderTarget | null, readBuffer: THREE.WebGLRenderTarget | null, delta?: number): void;
}
/**
 * The pass that does a default normal scene rendering for further post-effects.
 */
export declare class RenderPass extends Pass {
    constructor();
    /** @override */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, writeBuffer: THREE.WebGLRenderTarget | null, readBuffer: THREE.WebGLRenderTarget | null): void;
}
/**
 * The base class to extend for post-effects on the final render (like Vignette, Sepia, color
 * correction...)
 */
export declare class ShaderPass extends Pass {
    private readonly textureID;
    uniforms: {
        [uniform: string]: THREE.IUniform;
    };
    material: THREE.Material;
    fsQuad: FullScreenQuad;
    constructor(shader: THREE.Shader, textureID?: string);
    /** @override */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget, delta?: number): void;
}
declare class FullScreenQuad {
    private m_mesh;
    private readonly m_camera;
    constructor(material: THREE.Material);
    get material(): THREE.Material;
    set material(value: THREE.Material);
    render(renderer: THREE.WebGLRenderer): void;
}
export {};
//# sourceMappingURL=Pass.d.ts.map