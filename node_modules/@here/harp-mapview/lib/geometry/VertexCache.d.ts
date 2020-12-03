import { Vector3Like } from "@here/harp-geoutils";
/**
 * Compact vertex LRU Cache for on the fly temporary mesh transformations.
 * @internal
 */
export declare class VertexCache {
    readonly maxVertexCount: number;
    private m_cache;
    private m_vertexCount;
    private m_oldestIdx;
    private m_newestIdx;
    /**
     * Creates a new cache with the specified maximum size.
     * @param maxVertexCount - The maximum number of vertices the cache will store.
     */
    constructor(maxVertexCount: number);
    /**
     * Clears the vertex cache.
     */
    clear(): void;
    /**
     * Gets a vertex from cache.
     * @param vertexId - The id of the vertex to get.
     * @param vertex - The vertex coordinates will be set here if found.
     * @returns whether the vertex was found on cache.
     */
    get(vertexId: number, vertex: Vector3Like): boolean;
    /**
     * Sets a vertex in cache. It's assumed there's no vertex with the same id already in cache.
     * @param vertexId - The vertex id.
     * @param vertex - The vertex coordinates.
     */
    set(vertexId: number, vertex: Vector3Like): void;
    private find;
    private promoteEntry;
    private getOlderIdx;
    private setOlderIdx;
    private getNewerIdx;
    private setNewerIdx;
    private getVertex;
    private setVertex;
}
//# sourceMappingURL=VertexCache.d.ts.map