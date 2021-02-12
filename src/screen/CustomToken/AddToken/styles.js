
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@utils/responsive';
import { dynamicSize } from '@utils/dynamicSize'
import { TEALDARK } from '@utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    buttonContainer: {
        justifyContent: 'center',
        marginVertical: hp(2),
    },
    main: {
        flex: 1,
        marginVertical: dynamicSize(15),
        // justifyContent:'center',
        alignSelf: 'center',
        width: width - dynamicSize(30),
        // backgroundColor:'red'
    },
    addButtonText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: dynamicSize(20)
    },
    dropDownButtonContainer: {
        borderWidth: 1,
        borderRadius: 17,
        borderColor: TEALDARK,
        alignSelf: "center",
        flexDirection: 'row',
        height: hp(7.5),
        width: wp(52),
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),

    },
    dropDownText: {
        alignSelf: 'center',
        color: 'grey'

    },
    dropDownIconStyle:
    {
        height: hp(2),
        width: wp(4),
        alignSelf: 'center'
    },
    dropDownIconWrapper: {
        alignSelf: 'center',
        height: hp(4), justifyContent: 'center',
        width: wp(8),
    },
    searchTokenContainer: {
        flexDirection: 'row', width: wp(92),
        height: hp(8), borderRadius: 8, borderWidth: 1,
        borderColor: TEALDARK,
        marginVertical: hp(0.5)
    },
    errorText: {
        color: "red", height: dynamicSize(15),
        fontSize: dynamicSize(12),
    },
    closeButtonText: {
        alignSelf: 'center',
        fontSize: dynamicSize(22),
        fontWeight: 'bold',
        color: TEALDARK
    },

    closeButtonContainer: {
        borderWidth: 1.5, justifyContent: 'center',
        borderRadius: 10,
        width: wp(85),
        marginTop: hp(-6),
        alignSelf: 'center',
        borderColor: TEALDARK,
        height: hp(7)
    },
    textInputStyle: {
        marginLeft: wp(2),
        width: wp(80),
        fontSize: dynamicSize(15)
    }
}