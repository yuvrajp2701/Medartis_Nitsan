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
        backgroundColor: '#00000040',
    },
    bottomContainer: {
        backgroundColor: '#fff',
        marginTop: isTablet ? responsiveHeight(27) : responsiveHeight(19),
        borderTopLeftRadius: responsiveWidth(10),
        borderTopRightRadius: responsiveWidth(10),
        overflow: 'hidden',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    card: {
        backgroundColor: '#fff',
        height: responsiveHeight(80),
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
        marginTop: isTablet ? responsiveHeight(-3) : responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        alignSelf: 'flex-start',
        marginLeft: responsiveWidth(5),
    },
    lockIcon: {
        width: isTablet ? responsiveWidth(15) : responsiveWidth(25),
        height: isTablet ? responsiveWidth(15) : responsiveWidth(25),
    },

    /** ✅ NEW — Title styled for line break */
    title: {
        fontSize: isTablet?responsiveFontSize(21):responsiveFontSize(23),
        fontWeight: isTablet?700:900,
        color: '#000',
        lineHeight: isTablet?responsiveHeight(5):responsiveHeight(4),
    },

    /** ✅ NEW — Subtitle under the title */
    subtitle: {
        fontSize: responsiveFontSize(15),
        color: '#999999a9',
        marginTop:isTablet? responsiveHeight(3): responsiveHeight(1),
        marginBottom: responsiveHeight(4),
        paddingHorizontal: responsiveWidth(4),
        lineHeight: isTablet?responsiveHeight(3.5):responsiveHeight(2.5),
    },
    emailText: {
        fontWeight: '600',
        color: '#999',
    },

    /** ✅ NEW — OTP Code Box Styles */
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: responsiveWidth(4),
        marginBottom: responsiveHeight(3),
        width: isTablet?'50%':'90%',
        
    },
    codeBox: {
        width: responsiveWidth(18),
        height: isTablet?responsiveHeight(10):responsiveHeight(7),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: responsiveFontSize(20),
        backgroundColor: '#f4f4f4',
        color: '#000',
    },

    /** ✅ NEW — Resend Timer */
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
    },
    resendText: {
        color: '#999',
        fontSize:isTablet? responsiveFontSize(11): responsiveFontSize(15),
    },
    resendLink: {
        color: '#f5b40084',
        fontSize:isTablet? responsiveFontSize(11): responsiveFontSize(15),
    },

    /** ✅ Existing Button Container */
    curvedContainer: {
        borderRadius: responsiveWidth(4),
        overflow: 'hidden',
        marginHorizontal: responsiveWidth(4),
        width: isTablet ? responsiveWidth(200) : responsiveWidth(80),
    },

    /** ✅ NEW — Help Section */
    helpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:isTablet? responsiveHeight(-7): responsiveHeight(-4),
    },
    helpText: {
        color: '#999',
        fontSize:isTablet? responsiveFontSize(11): responsiveFontSize(15),
    },
    getHelpText: {
        color: '#f5b400b6',
        fontSize:isTablet? responsiveFontSize(11): responsiveFontSize(15),
        marginLeft:isTablet? responsiveWidth(30): responsiveWidth(9.5),
    },

    /** ✅ Removed unused email input styles — keep if reused elsewhere */
});

export default styles;
