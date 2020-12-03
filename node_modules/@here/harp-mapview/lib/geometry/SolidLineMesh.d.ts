import * as THREE from "three";
/**
 * Mesh formed by extruding a polyline in the shaders. Overrides raycasting behaviour to account for
 * extrusion, see [[SolidLineMaterial]].
 * @internal
 */
export declare class SolidLineMesh extends THREE.Mesh {
    /**
     * Finds the intersections of a ray with a mesh, assuming the mesh is a polyline extruded in
     * the shaders (see [[SolidLineMaterial]]).
     * @param mesh - The mesh whose intersections will be found.
     * @param raycaster - Contains the intersection ray.
     * @param intersections - Array where all intersections found between ray and mesh will
     *                        be pushed.
     */
    static raycast(mesh: THREE.Mesh, raycaster: THREE.Raycaster, intersections: THREE.Intersection[]): void;
    /**
     * Creates an instance of SolidLineMesh.
     * @param geometry - Mesh geometry.
     * @param material - Material(s) to be used by the mesh. They must be instances of
     * [[SolidLineMaterial]].
     */
    constructor(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[]);
    raycast(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void;
}
//# sourceMappingURL=SolidLineMesh.d.ts.map