import { ImageItem } from "./Image";
/**
 * Mip map generator resizes textures to next bigger power-of-two size by adding padding
 * and creates mip map levels.
 * @internal
 */
export declare class MipMapGenerator {
    /**
     * Gets size of an image padded to the next bigger power-of-two size
     * @param width - Width of image
     * @param height - Height of image
     */
    static getPaddedSize(width: number, height: number): {
        width: number;
        height: number;
    };
    private readonly m_paddingCanvas?;
    private readonly m_paddingContext?;
    private readonly m_resizeCanvas?;
    private readonly m_resizeContext?;
    constructor();
    /**
     * Generate downsampled mip map levels from an image.
     * If the input image is not power-of-two the image is padded to the
     * next bigger power-of-two size.
     * @param image - Input image
     * @returns A list of images with mip maps of the input image
     */
    generateTextureAtlasMipMap(image: ImageItem): ImageData[];
    /**
     * Copy image to a canvas and add padding if necessary.
     * @param image - Input image.
     * @param width - Width of output image
     * @param height - Width of output image
     * @returns Canvas with image and padding.
     */
    private copyImageWithPadding;
    /**
     * Resize an image.
     *
     * Quality of resized image is best when
     * image.width and image.height are even numbers and the image
     * is resized by factor 0.5 or 2.
     * @param image - Input image
     * @param width - Width of output image
     * @param height - Height of output image
     * @return Resized image
     */
    private resizeImage;
}
//# sourceMappingURL=MipMapGenerator.d.ts.map