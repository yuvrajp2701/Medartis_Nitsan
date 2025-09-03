import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/responsive';

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  title: {
    color: '#fff',
    fontSize: responsiveFontSize(36),
    marginBottom: responsiveHeight(3),
    fontWeight: '400',
    letterSpacing: 1,
    textAlign: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: responsiveFontSize(18),
    marginTop: responsiveHeight(1.5),
    textAlign: 'center',
  },
});
