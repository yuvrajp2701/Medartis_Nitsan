import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(5),
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveHeight(2),
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: responsiveHeight(3),
  },
  otpInput: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  resendText: {
    fontSize: responsiveFontSize(14),
    color: '#E6B400',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
});

export default styles;
