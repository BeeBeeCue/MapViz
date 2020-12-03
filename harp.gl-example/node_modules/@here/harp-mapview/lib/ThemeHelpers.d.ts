import { Light, MagFilter, MinFilter, PixelFormat, TextureDataType, WrappingMode } from "@here/harp-datasource-protocol";
import * as THREE from "three";
/**
 * Returns `three.js` pixel format object basing on a [[PixelFormat]] specified.
 */
export declare function toPixelFormat(format: PixelFormat): THREE.PixelFormat;
/**
 * Returns `three.js` texture data types based on a [[TextureDataType]] specified.
 */
export declare function toTextureDataType(dataType: TextureDataType): THREE.TextureDataType;
/**
 * Returns `three.js` wrapping mode object based on a [[WrappingMode]] specified.
 */
export declare function toWrappingMode(mode: WrappingMode): THREE.Wrapping;
/**
 * Returns `three.js` texture filter object based on a [[MagFilter]] or [[MinFilter]] specified.
 */
export declare function toTextureFilter(filter: MagFilter | MinFilter): THREE.TextureFilter;
/**
 * Create a specific light for lighting the map.
 */
export declare function createLight(lightDescription: Light): THREE.Light;
//# sourceMappingURL=ThemeHelpers.d.ts.map