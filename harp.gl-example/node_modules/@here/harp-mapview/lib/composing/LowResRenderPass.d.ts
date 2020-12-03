import * as THREE from "three";
import { Pass } from "./Pass";
/**
 * The `LowResRenderPass` renders the scene at a lower resolution into an internal
 * `WebGLRenderTarget`, and then copies the result into the frame buffer. The size of the internal
 * buffer is determined by the current frame buffer size multiplied by `pixelRatio`.
 *
 * @note Since no anti-aliasing is applied during dynamic rendering, visual artifacts may be
 * visible.
 */
export declare class LowResRenderPass extends Pass {
    lowResPixelRatio?: number | undefined;
    private m_renderTarget;
    private readonly m_localCamera;
    private readonly m_quadScene;
    private readonly m_quadUniforms;
    private readonly m_quadMaterial;
    private readonly m_quad;
    private m_pixelRatio;
    private m_savedWidth;
    private m_savedHeight;
    /**
     * The constructor for `LowResRenderPass`. It builds an internal scene with a camera looking at
     * a quad.
     *
     * @param lowResPixelRatio - The `pixelRatio` determines the resolution of the internal
     *  `WebGLRenderTarget`. Values between 0.5 and `window.devicePixelRatio` can be tried to give
     * good results. A value of `undefined` disables the low res render pass. The value should not
     * be larger than`window.devicePixelRatio`.
     */
    constructor(lowResPixelRatio?: number | undefined);
    /**
     * Releases all used resources.
     */
    dispose(): void;
    /**
     * If a value is specified, a low resolution render pass is used to render the scene into a
     * low resolution render target, before it is copied to the screen.
     *
     * A value of `undefined` disables the low res render pass. The value should not be larger than
     * `window.devicePixelRatio`.
     *
     * @default `undefined`
     */
    set pixelRatio(ratio: number | undefined);
    get pixelRatio(): number | undefined;
    /**
     * The render function of `LowResRenderPass`. It renders the whole scene into an internal
     * `WebGLRenderTarget` instance with a lower resolution, using the passed in `WebGLRenderer`.
     * The low resolution image is then copied to the `writeBuffer`, which is `undefined` in case it
     * is the screen.
     *
     * @param renderer - The ThreeJS WebGLRenderer instance to render the scene with.
     * @param scene - The ThreeJS Scene instance to render the scene with.
     * @param camera - The ThreeJS Camera instance to render the scene with.
     * @param writeBuffer - A ThreeJS WebGLRenderTarget instance to render the scene to.
     * @param readBuffer - A ThreeJS WebGLRenderTarget instance to render the scene.
     * @override
     */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, writeBuffer: THREE.WebGLRenderTarget | null, readBuffer: THREE.WebGLRenderTarget): void;
    /**
     * Resize the internal render target to match the new size specified. The size of internal
     * buffer depends on the `pixelRatio`.
     *
     * @param width - New width to apply to the render target.
     * @param height - New height to apply to the render target.
     * @override
     */
    setSize(width: number, height: number): void;
}
//# sourceMappingURL=LowResRenderPass.d.ts.map