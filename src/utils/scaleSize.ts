import { Dimensions, PixelRatio } from "react-native";

// Ukuran referensi desain (biasanya dari Figma atau iPhone X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Skala horizontal berdasarkan lebar layar
 * @param size ukuran asli
 */
export const scale = (size: number): number =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Skala vertikal berdasarkan tinggi layar
 * @param size ukuran asli
 */
export const verticalScale = (size: number): number =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Skala moderat gabungan horizontal + faktor
 * @param size ukuran asli
 * @param factor faktor moderasi (default 0.9 agar tidak terlalu kecil)
 */
export const moderateScale = (size: number, factor = 0.9): number =>
  size + (scale(size) - size) * factor;

/**
 * Skala font, disesuaikan dengan PixelRatio & platform
 * @param size ukuran font asli
 * @param factor faktor moderasi font (default 0.9)
 */
export const scaleFont = (size: number, factor = 0.9): number => {
  const newSize = moderateScale(size, factor);
  const roundedSize = PixelRatio.roundToNearestPixel(newSize);

  return Math.max(Math.round(roundedSize) - 1, 12);
};
