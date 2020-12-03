import * as THREE from "three";
/**
 * Effect to render bold lines around extruded polygons.
 *
 * Implemented by rendering the mesh geometries with an outline material before rendering them
 * again with their original.
 */
export declare class OutlineEffect {
    private m_renderer;
    enabled: boolean;
    autoClear: boolean;
    domElement: HTMLCanvasElement;
    shadowMap: THREE.WebGLShadowMap;
    private m_defaultThickness;
    private readonly m_defaultColor;
    private readonly m_defaultAlpha;
    private readonly m_defaultKeepAlive;
    private m_ghostExtrudedPolygons;
    private m_cache;
    private readonly m_removeThresholdCount;
    private m_originalMaterials;
    private m_originalOnBeforeRenders;
    private readonly m_shaderIDs;
    private readonly m_uniformsChunk;
    constructor(m_renderer: THREE.WebGLRenderer);
    set thickness(thickness: number);
    set color(color: string);
    set ghostExtrudedPolygons(ghost: boolean);
    clear(color: boolean, depth: boolean, stencil: boolean): void;
    getPixelRatio(): number;
    setPixelRatio(value: number): void;
    getSize(target: THREE.Vector2): THREE.Vector2;
    setSize(width: number, height: number, updateStyle: boolean): void;
    setViewport(x: number, y: number, width: number, height: number): void;
    setScissor(x: number, y: number, width: number, height: number): void;
    setScissorTest(boolean: boolean): void;
    setRenderTarget(renderTarget: THREE.WebGLRenderTarget): void;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
    renderOutline(scene: THREE.Scene, camera: THREE.Camera): void;
    private createInvisibleMaterial;
    private createMaterial;
    private getOutlineMaterialFromCache;
    private getOutlineMaterial;
    private setOutlineMaterial;
    private restoreOriginalMaterial;
    private onBeforeRender;
    private updateUniforms;
    private updateOutlineMaterial;
    private cleanupCache;
}
//# sourceMappingURL=Outline.d.ts.map