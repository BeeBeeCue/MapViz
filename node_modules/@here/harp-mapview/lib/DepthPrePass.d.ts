import { Env, ExtrudedPolygonTechnique } from "@here/harp-datasource-protocol";
import * as THREE from "three";
/**
 * Bitmask used for the depth pre-pass to prevent multiple fragments in the same screen position
 * from rendering color.
 * @internal
 */
export declare const DEPTH_PRE_PASS_STENCIL_MASK = 1;
/**
 * Check if technique requires (and not disables) use of depth prepass.
 *
 * @remarks
 * Depth prepass is enabled if correct opacity is specified (in range `(0,1)`) _and_ not explicitly
 * disabled by `enableDepthPrePass` option.
 *
 * @param technique - `BaseStandardTechnique` instance to be checked
 * @param env - {@link @here/harp-datasource-protocol#Env} instance used
 *              to evaluate {@link @here/harp-datasource-protocol#Expr}
 *              based properties of `Technique`
 *
 * @internal
 */
export declare function isRenderDepthPrePassEnabled(technique: ExtrudedPolygonTechnique, env: Env): boolean;
/**
 * Property identifying a material that is being used as a DepthPrePass material.
 */
export interface DepthPrePassProperties {
    /**
     * This material is a special depth prepass material.
     */
    isDepthPrepassMaterial?: true;
}
/**
 * Creates material for depth prepass.
 *
 * @remarks
 * Creates material that writes only to the z-buffer. Updates the original material instance, to
 * support depth prepass.
 *
 * @param baseMaterial - The base material of mesh that is updated to work with depth prepass
 *     and then used. This parameter is a template for depth prepass material that is returned.
 * @returns depth prepass material, which is a clone of `baseMaterial` with the adapted settings.
 *
 * @internal
 */
export declare function createDepthPrePassMaterial(baseMaterial: THREE.Material): THREE.Material;
/**
 * Checks if a given object is a depth prepass mesh.
 *
 * @param object - The object to check whether it's a depth prepass mesh.
 * @returns `true` if the object is a depth prepass mesh, `false` otherwise.
 *
 * @internal
 */
export declare function isDepthPrePassMesh(object: THREE.Object3D): boolean;
/**
 * Clones a given mesh to render it in the depth prepass with another material.
 *
 * @remarks
 * Both the original
 * and depth prepass meshes, when rendered in the correct order, create the proper depth prepass
 * effect. The original mesh material is slightly modified by [[createDepthPrePassMaterial]] to
 * support the depth prepass. This method is usable only if the material of this mesh has an
 * opacity value in the range `(0,1)`.
 *
 * The DepthPrePass object is created wis a slightly smaller `renderOrder` as the original mesh
 * to ensure that it's rendered first.
 *
 * @param mesh - original mesh
 * @returns `Mesh` depth pre pass
 *
 * @internal
 */
export declare function createDepthPrePassMesh(mesh: THREE.Mesh): THREE.Mesh;
/**
 * Sets up all the needed stencil logic needed for the depth pre-pass.
 *
 * @remarks
 * This logic is in place to avoid z-fighting artifacts that can appear in geometries that have
 * coplanar triangles inside the same mesh.
 *
 * @param depthMesh - Mesh created by `createDepthPrePassMesh`.
 * @param colorMesh - Original mesh.
 * @internal
 */
export declare function setDepthPrePassStencil(depthMesh: THREE.Mesh, colorMesh: THREE.Mesh): void;
//# sourceMappingURL=DepthPrePass.d.ts.map