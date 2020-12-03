import * as THREE from "three";
export interface RequestHeaders {
    [field: string]: string;
}
/**
 * A texture loader that supports request headers(e.g. for Authorization)
 */
export declare class TextureLoader {
    private readonly m_textureLoader;
    /**
     * Load an image from url and create a texture
     * @param url - URL to the image
     * @param requestHeaders - Optional request headers to load image(e.g. Authorization)
     * @param abortSignal - Optional AbortSignal to cancel the load.
     * @param crossOrigin - Enable/disable CORS
     */
    load(url: string, requestHeaders?: RequestHeaders | undefined, abortSignal?: AbortSignal, crossOrigin?: boolean): Promise<THREE.Texture>;
    private loadWithThreeLoader;
}
//# sourceMappingURL=TextureLoader.d.ts.map