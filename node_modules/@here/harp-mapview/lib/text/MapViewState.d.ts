import { Env, GeometryKindSet } from "@here/harp-datasource-protocol";
import { Projection } from "@here/harp-geoutils";
import * as THREE from "three";
import { ElevationProvider } from "../ElevationProvider";
import { MapView } from "../MapView";
import { ViewState } from "./ViewState";
/**
 * View state obtained from a MapView instance.
 */
export declare class MapViewState implements ViewState {
    private readonly m_mapView;
    private readonly m_renderedTilesChangeCheck;
    private readonly m_lookAtVector;
    constructor(m_mapView: MapView, m_renderedTilesChangeCheck: () => boolean);
    get worldCenter(): THREE.Vector3;
    get cameraIsMoving(): boolean;
    get maxVisibilityDist(): number;
    get zoomLevel(): number;
    get env(): Env;
    get frameNumber(): number;
    get lookAtVector(): THREE.Vector3;
    get lookAtDistance(): number;
    get isDynamic(): boolean;
    get hiddenGeometryKinds(): GeometryKindSet | undefined;
    get renderedTilesChanged(): boolean;
    get projection(): Projection;
    get elevationProvider(): ElevationProvider | undefined;
}
//# sourceMappingURL=MapViewState.d.ts.map