import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  isTablet,
} from '../utils/responsive';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '30%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000040', // dark overlay
    },

    /** Keeps the bottom area white even if the card is lifted upward */
    bottomContainer: {
        backgroundColor: '#fff',
        marginTop: isTablet ? responsiveHeight(27) : responsiveHeight(25),
        borderTopLeftRadius: responsiveWidth(10),  // curve on the left
        borderTopRightRadius: responsiveWidth(10), // curve on the right
        overflow: 'hidden', // ensures children don't overflow beyond the curve
    },


    /** Card content */
    card: {
        backgroundColor: '#fff',
        height: responsiveHeight(80), // lift the card upward responsively
        borderTopLeftRadius: responsiveWidth(5),
        borderTopRightRadius: responsiveWidth(5),
        padding: isTablet ? responsiveWidth(11) : responsiveWidth(6),
        alignItems: 'center',
    },

    backButton: {
        position: 'absolute',
        top: responsiveHeight(5),
        left: responsiveWidth(4),
        padding: responsiveWidth(2),
    },

    iconContainer: {
        marginTop: isTablet ? responsiveHeight(0) : responsiveHeight(1.3),
        marginBottom: responsiveHeight(0.7),
        alignSelf: 'flex-start', // move it to the left
        marginLeft: responsiveWidth(5), // add spacing from the screen's edge
    },

    // title: {
    //     fontSize: responsiveFontSize(22),
    //     fontWeight: '600',
    //     color: '#000',
    //     textAlign: 'center',
    //     marginBottom: responsiveHeight(1),
    // },

    subtitle: {
        fontSize: isTablet?responsiveFontSize(13):responsiveFontSize(15.5),
        color: '#666666bd',
        textAlign: 'left',
        marginTop: responsiveHeight(-1.3),
        marginBottom: responsiveHeight(5),
        lineHeight: responsiveFontSize(18),
        paddingHorizontal: responsiveWidth(4),

    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cfcfcf60',
        borderRadius: responsiveWidth(2),
        width: isTablet ? '50%' : '90%',
        marginBottom: responsiveHeight(2),
        paddingHorizontal: isTablet?responsiveWidth(7):responsiveWidth(3),
        backgroundColor: '#cfcfcf60',
    },

    inputIcon: {
        marginRight: responsiveWidth(2),
    },

    input: {
        flex: 1,
        height: isTablet?responsiveHeight(7):responsiveHeight(4.5),
        fontSize: responsiveFontSize(16),
        color: '#979797ff',
    },

    resetButton: {
        backgroundColor: '#000',
        paddingVertical: responsiveHeight(1.8),
        borderRadius: responsiveWidth(2),
        width: '100%',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
    },

    resetButtonText: {
        color: '#fff',
        fontSize: responsiveFontSize(16),
        fontWeight: '600',
        letterSpacing: 1,
    },
    lockIcon: {
        width: isTablet ? responsiveWidth(15) : responsiveWidth(25),  // Adjust based on design
        height: isTablet ? responsiveWidth(15) : responsiveWidth(25),
    },

    note: {
        fontSize: isTablet?responsiveFontSize(10):responsiveFontSize(14),
        color: '#777',
        textAlign: 'left',
        marginTop: responsiveHeight(-6.5),
        marginBottom: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
    },

    backToLogin: {
        marginTop: responsiveHeight(1),
    },

    backToLoginText: {
        color: '#E6B400',
        fontSize: responsiveFontSize(15),
        textAlign: 'center',
    },
    scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
},

    curvedContainer: {
        borderRadius: responsiveWidth(4),  // Slight curve
        overflow: 'hidden',                // Ensures button stays inside the curve
        marginHorizontal: responsiveWidth(4), // ✅ Adds space on left & right
        width: isTablet?responsiveWidth(200):responsiveWidth(90),
    },


});
export default styles;