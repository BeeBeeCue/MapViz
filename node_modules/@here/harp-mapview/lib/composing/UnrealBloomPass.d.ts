import * as THREE from "three";
import { Pass } from "./Pass";
/**
 * The TS version of ThreeJS's UnrealBloomPass.
 */
export declare class BloomPass extends Pass {
    strength: number;
    radius: number;
    threshold: number;
    resolution: THREE.Vector2;
    private readonly m_renderTargetsHorizontal;
    private readonly m_renderTargetsVertical;
    private readonly m_nMips;
    private readonly m_highPassUniforms;
    private readonly m_materialHighPassFilter;
    private readonly m_separableBlurMaterials;
    private readonly m_materialCopy;
    private readonly m_copyUniforms;
    private readonly m_compositeMaterial;
    private readonly m_camera;
    private readonly m_scene;
    private m_basic;
    private m_quad;
    private readonly m_bloomTintColors;
    private readonly m_renderTargetBright;
    constructor(resolution: THREE.Vector2, strength: number, radius: number, threshold: number);
    dispose(): void;
    /** @override */
    setSize(width: number, height: number): void;
    /** @override */
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, writeBuffer: THREE.WebGLRenderTarget | null, readBuffer: THREE.WebGLRenderTarget): void;
    getSeperableBlurMaterial(kernelRadius: number): THREE.ShaderMaterial;
    getCompositeMaterial(nMips: number): THREE.ShaderMaterial;
}
//# sourceMappingURL=UnrealBloomPass.d.ts.map