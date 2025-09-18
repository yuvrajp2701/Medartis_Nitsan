import { StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  marginTopp: {
    marginTop: 17,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 21,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    marginTop: 38,

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
    color: '#000000ff',
    fontSize: isTablet ? 15 : 10,
    fontWeight: '500',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
    padding: 20,
  },

  noDataText: {
    fontSize: 16,
    color: '#555', // Subtle gray text
    fontWeight: '500',
    textAlign: 'center',
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
    color: '#ffffffbd',
  },
  titleContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    paddingVertical: 5,
    color: '#fff9f9ff',
    // fontWeight: 'bold',
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
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffffff', // light gray background
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 11,
    flex: 1,
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 15,
    color: '#000000ff',
    fontWeight: '400',
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
    paddingBottom: 8,
  },
  videoItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 2,
    elevation: 2,
  },
  thumbnailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: isTablet ? 250 : 150,
    height: isTablet ? 140 : 80,
    borderRadius: 3,
    marginTop: 10,
    marginRight: 12,
  },
  videoTitle: {
    fontSize: isTablet ? 19 : 14,
    fontWeight: '600',
    color: '#000',
  },
  videoDetails: {
    fontSize: isTablet ? 14 : 12,
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
    justifyContent: 'flex-start', // Align horizontally to the left
    alignItems: 'flex-start',     // Align vertically to the top/left corner
    paddingLeft: 0,               // Remove any extra padding
    marginLeft: -85,               // 👈 Push further left (adjust value as needed)
  },


  iconButton: {
    width: 30,              // Equal width
    height: 30,             // Equal height
    borderRadius: 0,        // No rounded corners, perfect square
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartButton: {
    backgroundColor: '#E7C363', // Yellow like in the image
  },

  downloadButton: {
    backgroundColor: '#EDEDED', // Light gray like in the image
  },
  notFavouriteButton: {
    backgroundColor: '#D3D3D3', // Gray background when NOT favorite
  },
  heartIconWrapper: {
    width: 22,             // slightly bigger than icon size
    height: 22,
    borderWidth: 1.5,      // thickness of the border
    borderColor: '#000',   // border color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,      // circle border around the heart
  },

  // Optional: change border color when favorite
  heartIconWrapperFavorite: {
    borderColor: '#FFD700', // yellow border when marked as favorite
  },
  loaderBackground: {
    width: isTablet ? 200 : 160, // 👈 Increase this width to make the rectangle wider
    height: isTablet ? 110 : 90, // Match thumbnail height or slightly bigger
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    zIndex: 1,
  },
playButtonContainer: {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: [{ translateX: -20 }, { translateY: -20 }], // perfectly centered
  zIndex: 2,
  backgroundColor: '#ffffffff', // semi-transparent black
  padding: 5,
  borderRadius: 50,
},
videoSizeContainer: {
  position: 'absolute',
  bottom: 52,
  right: 16,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  paddingVertical: 2,
  paddingHorizontal: 4,
  borderRadius: 2,
},


});

export default styles;
