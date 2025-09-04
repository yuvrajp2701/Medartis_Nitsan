
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
  isTablet,
} from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row', // Ensure it's a row container (even if only one child)
    paddingRight: responsiveWidth(0),
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(8),
    paddingTop: responsiveHeight(0),
  },
  LoginscrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(8),
    // paddingTop: responsiveHeight(0),
  },

  logo: {
    fontSize: responsiveFontSize(36),
    fontWeight: '400',
    color: '#000',
    fontFamily: 'sans-serif-light',
    marginBottom: isTablet ? responsiveHeight(10) : responsiveHeight(9),
    marginLeft: 'auto'
  },

  Logintitle: {
    fontSize: responsiveFontSize(24),
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: responsiveHeight(2.5),
    marginTop: isTablet ? responsiveHeight(5) : responsiveHeight(15),
    color: '#000',
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: responsiveHeight(0.2),
    width: isTablet ? '60%' : '100%',
    alignSelf: 'center',

  },

  label: {
    fontSize: responsiveFontSize(15.5),
    color: '#767272ff',
    marginBottom: responsiveHeight(0.5),
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    fontSize: responsiveFontSize(16),
    marginBottom: responsiveHeight(1.4),
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(4),
    marginBottom: responsiveHeight(1.5),
  },

  halfInputGroup: {
    flex: 1,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(2.1),
    paddingVertical: responsiveHeight(0.7),
  },
  passwordInput: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    paddingVertical: responsiveHeight(0),
    color: '#00000083',
  },
  eyeIcon: {
    paddingHorizontal: responsiveWidth(2),
  },
  // button: {
  //   backgroundColor: '#000',
  //   paddingVertical: responsiveHeight(1.2),
  //   alignItems: 'center',
  //   borderRadius: 2,
  //   marginBottom: responsiveHeight(9),
  //   // marginTop: responsiveHeight(-1),
  //   width: isTablet ? '30%' : '100%',
  //   alignSelf: isTablet ? 'center' : 'stretch',
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: responsiveFontSize(16),
  //   letterSpacing: 1,
  // },
  loginContainer1: {
    position: 'absolute',      // Sticks to the bottom
    bottom: isTablet ? responsiveHeight(3) : responsiveHeight(2), // Distance from bottom
    left: isTablet ? responsiveWidth(27) : responsiveWidth(6),   // Distance from left
    flexDirection: 'row',       // Align text and link horizontally
    alignItems: 'center',
  },
  loginContainer: {
    position: 'absolute',      // Sticks to the bottom
    bottom: isTablet ? responsiveHeight(10) : responsiveHeight(2), // Distance from bottom
    left: isTablet ? responsiveWidth(26) : responsiveWidth(6),   // Distance from left
    flexDirection: 'row',       // Align text and link horizontally
    alignItems: 'center',
  },
  loginText: {
    color: '#888',
    fontSize: responsiveFontSize(12),
  },

  loginLink: {
    color: '#d4aa00a0',
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
  },
  forgotText: {
    textAlign: isTablet ? 'center' : 'right',
    color: '#00000093',
    left: isTablet ? responsiveWidth(45) : responsiveWidth(0),
    fontSize: responsiveFontSize(13),
    marginTop: -responsiveHeight(1.9),
    marginBottom: -responsiveHeight(0.9),
  },

  registerText: {
    fontSize: responsiveFontSize(12),
    color: '#888',
  },

  registerLink: {
    fontSize: responsiveFontSize(14),
    color: '#d4aa00a0',
    fontWeight: '500',
  },
  registerContainer: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    left: responsiveWidth(6),
    flexDirection: 'row',
    alignItems: 'center',
  },

  azureContainer: {
    position: 'absolute',
    bottom: isTablet ? responsiveHeight(10) : responsiveHeight(2), // Distance from bottom
    right: isTablet ? responsiveWidth(36) : responsiveWidth(6),  // ⬅️ aligns it to the right
    flexDirection: 'row',
    alignItems: 'center',
  },


});

export default styles;
