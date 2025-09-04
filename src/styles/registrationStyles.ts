
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
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(5),
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    
  },

  logo: {
    fontSize: responsiveFontSize(36),
    fontWeight: '300',
    color: '#000',
    fontFamily: 'sans-serif-light',
    marginBottom: responsiveHeight(8),
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(5),
  },

  title: {
    fontSize: responsiveFontSize(24),
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: responsiveHeight(3.5),
    color: '#000',
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: responsiveHeight(0.5),
     width: isTablet ? '60%' : '100%',
  },

  label: {
    fontSize: responsiveFontSize(14),
    color: '#767272ff',
    marginBottom: responsiveHeight(0.5),
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.7),
    fontSize: responsiveFontSize(16),
    marginBottom: responsiveHeight(1),
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
  },
  passwordInput: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    paddingVertical: responsiveHeight(1.5),
    color: '#000',
  },
  eyeIcon: {
    paddingHorizontal: responsiveWidth(2),
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: responsiveHeight(1.2),
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: responsiveHeight(2),
    // marginTop: responsiveHeight(-1),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(16),
    letterSpacing: 1,
  },
  loginText: {
    textAlign: 'center',
    color: '#888',
    fontSize: responsiveFontSize(14),
  },
  loginLink: {
    color: '#d4aa00',
  },
});

export default styles;
