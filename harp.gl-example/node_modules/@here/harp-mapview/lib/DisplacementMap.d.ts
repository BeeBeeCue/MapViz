import { GeoBox, TileKey } from "@here/harp-geoutils";
export interface DisplacementMap {
    xCountVertices: number;
    yCountVertices: number;
    buffer: Float32Array;
}
export interface TileDisplacementMap {
    tileKey: TileKey;
    texture: THREE.DataTexture;
    displacementMap: DisplacementMap;
    geoBox: GeoBox;
}
//# sourceMappingURL=DisplacementMap.d.ts.map