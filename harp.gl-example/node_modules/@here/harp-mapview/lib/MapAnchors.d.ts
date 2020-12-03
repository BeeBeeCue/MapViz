import { StylePriority } from "@here/harp-datasource-protocol";
import { GeoCoordinates, Projection, Vector3Like } from "@here/harp-geoutils";
import { GeoCoordLike } from "@here/harp-geoutils/lib/coordinates/GeoCoordLike";
import * as THREE from "three";
/**
 * An interface describing [[THREE.Object3D]]s anchored on
 * given {@link @here/harp-geoutils#GeoCoordinates}.
 *
 * @remarkks
 * @example
 * Example:
 * ```typescript
 * const mesh: MapAnchor<THREE.Mesh> = new THREE.Mesh(geometry, material);
 * mesh.anchor = new GeoCoordinates(latitude, longitude, altitude);
 * mapView.mapAnchors.add(mesh);
 * ```
 */
export declare type MapAnchor<T extends THREE.Object3D = THREE.Object3D> = T & {
    /**
     * The position of this [[MapAnchor]] in {@link @here/harp-geoutils#GeoCoordinates}.
     * @deprecated Use [[anchor]] instead.
     */
    geoPosition?: GeoCoordinates;
    /**
     * The anchor of this Object3D in {@link @here/harp-geoutils#GeoCoordinates}
     * or world coordinates.
     */
    anchor?: GeoCoordLike | Vector3Like;
    /**
     * Flag defining if the object may be picked.
     *
     * @note By default all objects are pickable even if this flag is undefined.
     */
    pickable?: boolean;
    /**
     * The styleSet that owns this map object.
     *
     * @remarks
     * This property is used together with [[Theme.priorities]] to compute the render
     * order of this map object.
     */
    styleSet?: string;
    /**
     * The category of this style.
     *
     * @remarks
     * This property is used together with [[Theme.priorities]] to compute the render
     * order of this map object.
     */
    category?: string;
    /**
     * Whether to draw the anchor on top of labels.
     * @defaultValue false
     */
    overlay?: boolean;
};
/**
 * Container holding [[MapAnchor]] objects.
 */
export declare class MapAnchors {
    private m_anchors;
    private m_priorities;
    /**
     * All currently added [[MapAnchor]]s.
     */
    get children(): MapAnchor<THREE.Object3D>[];
    /**
     * Add a [[MapAnchor]].
     * @param mapAnchor [[MapAnchor]] instance to add.
     */
    add(mapAnchor: MapAnchor): void;
    /**
     * Remove a [[MapAnchor]].
     * @param mapAnchor - [[MapAnchor]] instance to remove.
     *
     * @note This method is potentially slow when removing a lot of anchors.
     * [[clear]]ing and [[add]]ing anchors should be considered in that case.
     */
    remove(mapAnchor: MapAnchor): void;
    /**
     * Remove all [[MapAnchor]]s.
     */
    clear(): void;
    setPriorities(priorities: StylePriority[]): void;
    /**
     * Update the map anchors.
     * @param projection - Current projection
     * @param cameraPosition - Current camera position
     * @param rootNode - Node where normal anchors will be inserted.
     * @param overlayRootNode - Node where overlay anchors will be insterted.
     * @param priorities - Optional theme priority list
     *
     * @internal
     * @hidden
     */
    update(projection: Projection, cameraPosition: THREE.Vector3, rootNode: THREE.Object3D, overlayRootNode: THREE.Object3D): void;
}
//# sourceMappingURL=MapAnchors.d.ts.map