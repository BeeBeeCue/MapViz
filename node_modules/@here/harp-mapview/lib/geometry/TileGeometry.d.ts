import { GeometryType } from "@here/harp-datasource-protocol";
import * as THREE from "three";
/**
 * Interface to access lines. Allows read access for some important attributes.
 */
export interface ILineAccessor {
    /**
     * Hint for the original type of geometry.
     */
    geometryType: GeometryType;
    /**
     * Get the color from materials.
     */
    color: THREE.Color | undefined | Array<THREE.Color | undefined>;
    /**
     * Get the width. May have to be reconstructed from triangulated line mesh.
     */
    width: number | undefined;
    /**
     * Render order.
     */
    renderOrder: number;
    /**
     * Helper for function `isLineAccessor`.
     *
     * @returns `true` if it is a line accessor.
     */
    isLineAccessor(): boolean;
    /**
     * Clear the object from the mesh.
     */
    clear(): void;
    /**
     * Get vertices from the object.
     */
    getVertices(): Float32Array | undefined;
}
/**
 * Helper function to check if an accessor is of type `ILineAccessor`.
 *
 * @param arg - `true` if `arg` is `ILineAccessor`.
 * @internal
 */
export declare function isLineAccessor(arg: any): arg is ILineAccessor;
/**
 * Accessor for unspecified 3D objects, like landmarks.
 */
export interface IObject3dAccessor {
    /**
     * Hint for the original type of geometry.
     */
    geometryType: GeometryType;
    /**
     * Get the color from materials.
     */
    color: THREE.Color | undefined | Array<THREE.Color | undefined>;
    /**
     * Render order.
     */
    renderOrder: number;
    /**
     * Helper for function `isObject3dAccessor`.
     *
     * @returns `true` if it is a line accessor.
     */
    isObject3dAccessor(): boolean;
    /**
     * Clear the object from the mesh.
     */
    clear(): void;
    getVertices(): Float32Array | undefined;
}
/**
 * Helper function to check if an accessor is of type `IObject3dAccessor`.
 *
 * @param arg - `true` if `arg` is `IObject3dAccessor`.
 * @internal
 */
export declare function isObject3dAccessor(arg: any): arg is IObject3dAccessor;
/**
 * Basic interface for geometry accessors.
 */
export interface IGeometryAccessor {
    /**
     * Get the number of primitives (vertices of triangles).
     *
     * @returns Number of primitives.
     */
    getCount(): number;
    /**
     * Set range of primitives in this object related to one or more buffers.
     *
     * @param start - Start index in buffers.
     * @param end - End index in buffers (+1).
     */
    setRange(start: number, end: number): void;
}
/**
 * Geometry accessor for both indexed and nonindexed `BufferedGeometry`.
 */
export declare abstract class BufferedGeometryAccessorBase implements IGeometryAccessor {
    readonly object: THREE.Mesh;
    readonly geometryType: GeometryType;
    protected readonly bufferGeometry: THREE.BufferGeometry;
    protected start: number;
    protected end: number;
    protected startCapSize: number;
    protected endCapSize: number;
    protected position: THREE.BufferAttribute;
    protected itemSize: number;
    constructor(object: THREE.Mesh, geometryType: GeometryType, bufferGeometry: THREE.BufferGeometry);
    /**
     * Get the number of accessible geometries in this buffer.
     *
     * @returns Number of primitives in this geometry.
     */
    getCount(): number;
    /**
     * Get `renderOrder` of object.
     *
     * @returns `renderOrder` of the object.
     */
    get renderOrder(): number;
    setRange(start: number, end: number, startCapSize?: number, endCapSize?: number): void;
    /**
     * Get one or more colors from materials.
     */
    get color(): THREE.Color | undefined | Array<THREE.Color | undefined>;
}
/**
 * Abstract base class of an accessor for nonindexed geometry.
 */
export declare abstract class BufferedGeometryAccessor extends BufferedGeometryAccessorBase {
    readonly object: THREE.Mesh;
    readonly geometryType: GeometryType;
    protected readonly bufferGeometry: THREE.BufferGeometry;
    protected stride: number;
    /**
     * Create an object of type `BufferedGeometryAccessor`
     *
     * @param object - mesh object
     * @param geometryType - type of geometry to be used
     * @param bufferGeometry - which buffer geometry to use
     * @param stride - geometry stride length
     */
    constructor(object: THREE.Mesh, geometryType: GeometryType, bufferGeometry: THREE.BufferGeometry, stride: number);
    clear(): void;
    getVertices(): Float32Array | undefined;
    protected checkSetUp(): boolean;
}
/**
 * Accessor for nonindexed line geometry.
 */
export declare class BufferedGeometryLineAccessor extends BufferedGeometryAccessor implements ILineAccessor {
    readonly object: THREE.Mesh;
    readonly geometryType: GeometryType;
    readonly bufferGeometry: THREE.BufferGeometry;
    constructor(object: THREE.Mesh, geometryType: GeometryType, bufferGeometry: THREE.BufferGeometry);
    isLineAccessor(): boolean;
    get width(): number | undefined;
}
/**
 * Accessor for nonindexed unspecified (`Object3D`) geometry.
 */
export declare class BufferedGeometryObject3dAccessor extends BufferedGeometryAccessor implements IObject3dAccessor {
    readonly object: THREE.Mesh;
    readonly geometryType: GeometryType;
    readonly bufferGeometry: THREE.BufferGeometry;
    constructor(object: THREE.Mesh, geometryType: GeometryType, bufferGeometry: THREE.BufferGeometry);
    isObject3dAccessor(): boolean;
    /** @override */
    getVertices(): Float32Array | undefined;
}
/**
 * Abstract base class of indexed geometry.
 */
export declare abstract class IndexedBufferedGeometryAccessor extends BufferedGeometryAccessorBase {
    readonly object: THREE.Mesh;
    readonly geometryType: GeometryType;
    protected readonly bufferGeometry: THREE.BufferGeometry;
    indices: number[];
    /**
     * Creates an abstract class `IndexedBufferedGeometryAccessor`.
     *
     * @param object - mesh to be used
     * @param geometryType - type of geometry
     * @param bufferGeometry - geometry used
     * @param start -
     * @param end -
     */
    constructor(object: THREE.Mesh, geometryType: GeometryType, bufferGeometry: THREE.BufferGeometry, start?: number, end?: number);
    /**
     * Returns number of primitives, which is not known in this base class, so we return the number
     * of indices.
     *
     * @returns The number of indices in the geometry.
     * @override
     */
    getCount(): number;
    protected checkSetUp(): boolean;
}
/**
 * Accessor for lines in an indexed geometry.
 */
export declare class IndexedBufferedGeometryLineAccessor extends IndexedBufferedGeometryAccessor implements ILineAccessor {
    readonly object: THREE.Mesh;
    readonly geometryType: GeometryType;
    readonly bufferGeometry: THREE.BufferGeometry;
    constructor(object: THREE.Mesh, geometryType: GeometryType, bufferGeometry: THREE.BufferGeometry);
    isLineAccessor(): boolean;
    /**
     * Reconstructs line width from triangulated geometry.
     *
     * @returns Line width.
     */
    get width(): number | undefined;
    clear(): void;
    getVertices(): Float32Array | undefined;
}
//# sourceMappingURL=TileGeometry.d.ts.map