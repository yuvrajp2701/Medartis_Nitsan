// Update your styles to accommodate the new title container with the icon
import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from '../utils/responsive';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: isTablet?20:12,
    borderBottomWidth: 1,
    borderColor: '#444',
  },

  topRight: {
    flexDirection: 'row',
    marginRight: isTablet?950:'auto',
  },
titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: isTablet?-20:-10,
},
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  iconSpacing: {
    marginLeft: isTablet?23:16,
    color: '#fff',
  },

  brand: {
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: isTablet?26:18,
    color: '#fff',
  },

  carouselItem: {
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  videoTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  videoType: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
  },

  // Update the section for title and icon
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginVertical: 20,
    marginBottom: -20,
  },

  icon: {
    marginRight: 8, // Space between the icon and the title
    marginTop: -25,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },


  cardList: {
    paddingLeft: 16,
    paddingBottom: 20,
  },

  card: {
    width: 180,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  tagContainer: {
    backgroundColor: '#ffdb58',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  cardTag: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  cardSize: {
    fontSize: 12,
    color: '#555',
  },

  carouselImage: {
    width: width - 40,
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 12,
  },

  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
