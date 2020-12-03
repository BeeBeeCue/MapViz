import * as THREE from "three";
/**
 * @hidden
 */
export declare class SimpleLineCurve extends THREE.LineCurve {
    private m_lengths?;
    constructor(v1: THREE.Vector2, v2: THREE.Vector2);
    getLengths(): number[];
}
/**
 * @hidden
 */
export declare class PathParam {
    readonly path: THREE.Path;
    readonly index: number;
    readonly t: number;
    private m_point;
    constructor(path: THREE.Path, index: number, t: number);
    get curve(): THREE.Curve<THREE.Vector2>;
    get point(): THREE.Vector2;
}
/**
 * @hidden
 */
export declare class SimplePath extends THREE.Path {
    private m_cache?;
    constructor();
    getLengths(): number[];
    getParamAt(t: number): PathParam | null;
}
//# sourceMappingURL=SimplePath.d.ts.map