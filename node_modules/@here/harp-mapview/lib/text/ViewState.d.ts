import { Env, GeometryKindSet } from "@here/harp-datasource-protocol";
import { Projection } from "@here/harp-geoutils";
import { ElevationProvider } from "../ElevationProvider";
/**
 * State parameters of a view that are required by the text renderer.
 */
export interface ViewState {
    worldCenter: THREE.Vector3;
    cameraIsMoving: boolean;
    maxVisibilityDist: number;
    zoomLevel: number;
    env: Env;
    frameNumber: number;
    lookAtVector: THREE.Vector3;
    lookAtDistance: number;
    isDynamic: boolean;
    hiddenGeometryKinds?: GeometryKindSet;
    renderedTilesChanged: boolean;
    projection: Projection;
    elevationProvider?: ElevationProvider;
}
//# sourceMappingURL=ViewState.d.ts.map