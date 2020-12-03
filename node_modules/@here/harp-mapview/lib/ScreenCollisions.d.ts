import { Math2D } from "@here/harp-utils";
import * as THREE from "three";
export interface IBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
export declare class CollisionBox extends Math2D.Box implements IBox {
    constructor(box?: Math2D.Box | THREE.Box2 | IBox);
    copy(box: Math2D.Box | THREE.Box2 | IBox): CollisionBox;
    get minX(): number;
    set minX(minX: number);
    get maxX(): number;
    set maxX(maxX: number);
    get minY(): number;
    set minY(minY: number);
    get maxY(): number;
    set maxY(maxY: number);
}
/**
 * Collision box with additional boxes defining tighter bounds for the enclosed feature
 * (e.g.glyph bounds for text).
 */
export declare class DetailedCollisionBox extends CollisionBox {
    readonly detailBoxes: CollisionBox[];
    constructor(box: Math2D.Box | THREE.Box2 | IBox, detailBoxes: CollisionBox[]);
}
export interface LineWithBound extends IBox {
    line: THREE.Line3;
}
export declare function isLineWithBound(box: IBox): box is LineWithBound;
export declare class ScreenCollisions {
    /** The screen bounding box. */
    readonly screenBounds: Math2D.Box;
    /** Tree of allocated bounds. */
    private readonly rtree;
    /**
     * Constructs a new ScreenCollisions object.
     */
    constructor();
    /**
     * Resets the list of allocated screen bounds.
     */
    reset(): void;
    /**
     * Updates the screen bounds that are used to check if bounding boxes are visible.
     *
     * @param width - The width of the container.
     * @param height - The height of the container.
     */
    update(width: number, height: number): void;
    /**
     * Marks the region of the screen intersecting with the given bounding box as allocated.
     *
     * @param bounds - The bounding box in NDC scaled coordinates (i.e. top left is -width/2,
     * -height/2)
     */
    allocate(bounds: Math2D.Box | CollisionBox | DetailedCollisionBox): void;
    /**
     * Inserts the given bounds into the rtree.
     *
     * @param bounds - The bounding boxes (the bounding boxes must be in the space returned from the
     * ScreenProjector.project method).
     */
    allocateIBoxes(bounds: IBox[]): void;
    /**
     * Search for all bounds in the tree intersecting with the given box.
     * @param box - The box used for the search.
     * @returns An array of all IBoxes intersecting with the given box.
     */
    search(box: CollisionBox): IBox[];
    /**
     * Checks if the given bounding box is already allocated.
     *
     * @param bounds - The bounding box in world coordinates.
     */
    isAllocated(bounds: Math2D.Box | CollisionBox): boolean;
    /**
     * Checks if the given screen bounds intersects with the frustum of the active camera.
     *
     * @param bounds - The bounding box in world coordinates.
     */
    isVisible(bounds: Math2D.Box): boolean;
    /**
     * Checks if the given screen bounds is contained within the frustum of the active camera.
     *
     * @param bounds - The bounding box in world coordinates.
     */
    isFullyVisible(bounds: Math2D.Box): boolean;
    /**
     * Test whether a given [[CollisionBox]] intersects with any of the details in the specified
     * [[IBox]]es.
     *
     * @param testBox - The box to test for intersection.
     * @param boxes - The candidate boxes the test box may intersect with. It's assumed that the
     * global bounds of these boxes intersect with the given test box.
     * @returns `true` if any intersection found.
     */
    intersectsDetails(testBox: CollisionBox, boxes: IBox[]): boolean;
    /**
     * Computes the intersection between the supplied CollisionBox and the LineWithBound.
     * @note The [[CollisionBox]] is in Screen Bounds space, whereas the line must be
     * in Screen Coordinate space
     */
    private intersectsLine;
}
/**
 * @hidden
 *
 * Shows requests for screen space during labelling in an HTML canvas, which should be sized like
 * the actual map canvas. It can be placed on top of the map canvas to show exactly which requests
 * for screen space were done.
 *
 * Also logs statistics.
 */
export declare class ScreenCollisionsDebug extends ScreenCollisions {
    /** 2D rendering context. */
    private m_renderContext;
    private m_renderingEnabled;
    private m_numAllocations;
    private m_numSuccessfulTests;
    private m_numFailedTests;
    private m_numSuccessfulVisibilityTests;
    private m_numFailedVisibilityTests;
    /**
     * Constructs a new ScreenCollisions object which renders its state to a 2D canvas.
     */
    constructor(debugCanvas: HTMLCanvasElement);
    /**
     * Resets the list of allocated bounds and clears the debug canvas.
     * @override
     */
    reset(): void;
    /**
     * Updates the screen bounds used to check if bounding boxes are visible.
     *
     * @param width - The width of the container.
     * @param height - The height of the container.
     * @override
     */
    update(width: number, height: number): void;
    /**
     * Marks the region of the screen intersecting with the given bounding box as allocated.
     *
     * @param bounds - the bounding box in world coordinates.
     * @override
     */
    allocate(bounds: Math2D.Box | CollisionBox): void;
    /** @override */
    allocateIBoxes(boundsArray: IBox[]): void;
    /** @override */
    intersectsDetails(testBox: CollisionBox, boxes: IBox[]): boolean;
    /**
     * Checks if the given screen bounds intersects with the frustum of the active camera.
     *
     * @param bounds - The bounding box in world coordinates.
     * @override
     */
    isVisible(bounds: Math2D.Box): boolean;
}
//# sourceMappingURL=ScreenCollisions.d.ts.map