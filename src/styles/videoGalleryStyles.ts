import { StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 23,
    backgroundColor: '#000000ff',
    alignItems: 'center',
  },
  videoSizeBadge: {
  position: 'absolute',
  bottom: 6,
  right: 12,
  backgroundColor: '#000',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 4,
  opacity: 0.8,
},

videoSizeText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: '500',
},

    titleWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backArrow: {
    marginRight: 10,
  },

  brand: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
    topRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    iconSpacing: {
      marginLeft: isTablet ? 30 : 16,
      color: '#fff',
    },
  titleContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#fff9f9ff',
    fontWeight: 'bold',
  },
  filterSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  dropdownContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  dropdownButton: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 200,
    elevation: 2,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  videoItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  thumbnailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  videoDetails: {
  fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
  flexDirection: 'row',
  gap: 10,
  justifyContent: 'center',
},

iconButton: {
    padding: 7,
    borderRadius: 20,
},

heartButton: {
  backgroundColor: '#E7C363', // Yellow like in the image
},

downloadButton: {
  backgroundColor: '#EDEDED', // Light gray like in the image
},

});

export default styles;
