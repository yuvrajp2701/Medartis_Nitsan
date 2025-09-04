import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base reference dimensions
const baseWidth = 375;  // typical phone width (iPhone X)
const maxWidth = 600;   // cap scaling beyond this width for tablets

const screenWidth = width > maxWidth ? maxWidth : width;

// ✅ Detect if the device is a tablet
export const isTablet = Math.min(width, height) >= 600;

export const responsiveFontSize = (size: number) => {
  const scale = screenWidth / baseWidth;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export const responsiveWidth = (percentage: number) => {
  return Math.round((screenWidth * percentage) / 100);
};

export const responsiveHeight = (percentage: number) => {
  return Math.round((height * percentage) / 100);
};
