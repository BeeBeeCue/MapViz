import { Projection } from "@here/harp-geoutils";
import { TileDisplacementMap } from "../DisplacementMap";
import { ElevationProvider } from "../ElevationProvider";
import { TextElement } from "../text/TextElement";
import { Tile } from "../Tile";
/**
 * Overlays a text element on top of elevation data if available.
 *
 * @param textElement - The text element whose geometry will be overlaid.
 * @param elevationProvider -  Used to sample elevation data.
 * @param displacementMap - Elevation data to be sampled.
 * @param projection - Projection from geo to world space.
 */
export declare function overlayTextElement(textElement: TextElement, elevationProvider: ElevationProvider, displacementMap: TileDisplacementMap, projection: Projection): void;
/**
 * Overlays the geometry in the given tile on top of elevation data if available. The tile's
 * elevation may be updated with a more precise range.
 *
 * @param tile - The tile whose geometry will be overlaid.
 */
export declare function overlayOnElevation(tile: Tile): void;
//# sourceMappingURL=overlayOnElevation.d.ts.map