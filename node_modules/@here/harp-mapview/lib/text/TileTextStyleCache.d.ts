import { IndexedTechniqueParams, LineMarkerTechnique, PoiTechnique, TextTechnique } from "@here/harp-datasource-protocol";
import { TextLayoutStyle, TextRenderStyle } from "@here/harp-text-canvas";
import { Tile } from "../Tile";
export declare class TileTextStyleCache {
    private textRenderStyles;
    private textLayoutStyles;
    private readonly tile;
    constructor(tile: Tile);
    clear(): void;
    getRenderStyle(technique: (TextTechnique | PoiTechnique | LineMarkerTechnique) & IndexedTechniqueParams): TextRenderStyle;
    getLayoutStyle(technique: (TextTechnique | PoiTechnique | LineMarkerTechnique) & IndexedTechniqueParams): TextLayoutStyle;
}
//# sourceMappingURL=TileTextStyleCache.d.ts.map