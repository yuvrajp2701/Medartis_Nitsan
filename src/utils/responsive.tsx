import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;  // base width for scaling (typical phone width)
const maxWidth = 600;   // max width cap for scaling (tablets won't scale beyond this)

const screenWidth = width > maxWidth ? maxWidth : width;

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
