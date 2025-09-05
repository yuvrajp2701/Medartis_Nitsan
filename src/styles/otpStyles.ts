import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const isTablet = width > 600; // Check if the device is a tablet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: isTablet ? 30 : 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: isTablet ? 18 : 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: isTablet ? '50%' : '70%',
    marginBottom: 30,
  },
  otpInput: {
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: isTablet ? 28 : 24,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  resendText: {
    fontSize: isTablet ? 16 : 14,
    color: '#0066cc',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  buttonWrapper: {
    marginTop: 40,
    width: isTablet ? '100%' : '70%',
  },
});

export default styles;
