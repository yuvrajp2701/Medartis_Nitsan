// src/styles/AccountSettingsStyles.ts
import { StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

const AccountSettingsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  containerPadding: { padding: isTablet ? 50 : 20 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingHorizontal: isTablet ? 40 : 20,
    paddingVertical: isTablet ? 30 : 25,
    borderBottomWidth: 1,
    borderColor: '#444',
    justifyContent: 'space-between',
  },

  titleWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backArrow: {
    marginRight: 10,
  },

  title: {
    fontSize: isTablet ? 26 : 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSpacing: {
    marginLeft: isTablet ? 30 : 16,
    color: '#fff',
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: isTablet ? 27 : 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: -5,
  },
  email: {
    fontSize: isTablet ? 19 : 16,
    color: '#555',
    marginVertical: 10,
  },
  mobile: {
    fontSize: isTablet ? 19 : 16,
    color: '#555',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#68686828',
    paddingVertical: isTablet ? 10 : 8,
    paddingHorizontal: isTablet ? 29 : 25,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: '#000',
    fontSize: isTablet ? 17 : 15,
    paddingVertical: 4,
  },

  preferencesSection: { marginBottom: 0 },
  sectionTitle: {
    fontSize: isTablet ? 25 : 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },

  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 55,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: isTablet ? 20 : 17,
    color: '#333',
    marginLeft: 10,
  },
  preferenceValue: {
    fontSize: isTablet ? 18 : 16,
    color: '#555',
    marginRight: 5,
  },
  iconSpacingLeft: {
    marginRight: 10,
  },

  supportSection: { marginTop: -10 },
  supportText: {
    fontSize: isTablet ? 19 : 16,
    color: '#000',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountSettingsStyles;
