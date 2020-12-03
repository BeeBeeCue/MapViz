import * as THREE from "three";
import { DisplacedBufferGeometry, DisplacementRange } from "./DisplacedBufferGeometry";
/**
 * Mesh with geometry modified by a displacement map. Overrides raycasting behaviour to apply
 * displacement map before intersection test.
 * @internal
 */
export declare class DisplacedMesh extends THREE.Mesh {
    private readonly m_getDisplacementRange;
    private readonly m_raycastStrategy?;
    private static displacedPositions?;
    private static getDisplacedPositionAttribute;
    displacedGeometry?: DisplacedBufferGeometry;
    /**
     * Creates an instance of displaced mesh.
     * @param geometry - Original geometry to displace.
     * @param material - Material(s) to be used by the mesh. All must have the same
     *                   displacement map.
     * @param m_getDisplacementRange - Displacement values range getter.
     * @param [m_raycastStrategy] Function that will be used to find ray intersections. If not
     * provided, THREE.Mesh's raycast will be used.
     */
    constructor(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], m_getDisplacementRange: () => DisplacementRange, m_raycastStrategy?: ((mesh: THREE.Mesh, raycaster: THREE.Raycaster, intersects: THREE.Intersection[]) => void) | undefined);
    raycast(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void;
    private get firstMaterial();
}
//# sourceMappingURL=DisplacedMesh.d.ts.map