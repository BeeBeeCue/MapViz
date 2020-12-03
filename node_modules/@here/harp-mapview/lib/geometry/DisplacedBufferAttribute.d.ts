import * as THREE from "three";
/**
 * @internal
 * BufferAttribute decorator that displaces on the fly the coordinates in a given attribute using a
 * specified displacement map.
 */
export declare class DisplacedBufferAttribute extends THREE.BufferAttribute {
    originalAttribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
    private m_normals;
    private m_uvs;
    private static readonly MAX_CACHE_SIZE;
    private m_texture?;
    private m_textureWidth;
    private m_textureHeight;
    private readonly m_cache;
    private m_lastBufferIndex?;
    private readonly m_lastPos;
    private readonly m_tmpNormal;
    /**
     * Creates an instance of displaced buffer attribute.
     * @param originalAttribute - The buffer attribute to be displaced
     *                            (e.g. the position attribute).
     * @param m_normals - The normals along which the coordinates will be displaced.
     * @param m_uvs - The uv coordinates to be used to sample the displacement map.
     * @param displacementMap - A texture with the displacement values in 32bit floats.
     */
    constructor(originalAttribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, m_normals: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, m_uvs: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, displacementMap: THREE.DataTexture);
    /**
     * Resets the displaced buffer attribute to use new buffer attributes or displacement map.
     * @param originalAttribute - The buffer attribute to be displaced
     *                            (e.g. the position attribute).
     * @param normals - The normals along which the coordinates will be displaced.
     * @param uvs -  The uv coordinates to be used to sample the displacement map.
     * @param displacementMap - A texture with the displacement values in 32bit floats.
     */
    reset(originalAttribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, normals: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, uvs: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, displacementMap: THREE.DataTexture): void;
    getX(index: number): number;
    getY(index: number): number;
    getZ(index: number): number;
    private resetTexture;
    private getDisplacedCoordinate;
    private displacePosition;
}
//# sourceMappingURL=DisplacedBufferAttribute.d.ts.map