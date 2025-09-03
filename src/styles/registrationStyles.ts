// src/styles/registrationStyles.ts
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5), // ~20px on 375px width
  },
logo: {
  fontSize: responsiveFontSize(36),
  fontWeight: '300',
  color: '#000',
  fontFamily: 'sans-serif-light',
  marginBottom: responsiveHeight(2),
  alignSelf: 'flex-end',              // Push logo to the right
  paddingRight: responsiveWidth(5),  // Some right padding from screen edge
},

title: {
  fontSize: responsiveFontSize(24),
  fontWeight: '500',
  textAlign: 'center',
  marginBottom: responsiveHeight(2.5),
  color: '#000',
  alignSelf: 'center',                // Center the title horizontally
},

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    fontSize: responsiveFontSize(16),
    marginBottom: responsiveHeight(2),
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(3),
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
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: responsiveHeight(2.5),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(18),
    letterSpacing: 1,
  },
  loginText: {
    textAlign: 'center',
    color: '#888',
    fontSize: responsiveFontSize(14),
  },
  loginLink: {
    color: '#d4aa00', // Yellow-ish
  },
});

export default styles;
