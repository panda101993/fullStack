import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TEALDARK } from '@utils/colors'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'

export default styles = {
    selected: {
        width: window.width, paddingBottom: wp('2%'),
        flexDirection: 'row',
    },
    buySellToggle: {
        borderBottomColor: 'white',
        height: hp(7.5), width: wp(45),
        justifyContent: 'center'
    },
    buySellText: {
        color: 'white',
        fontSize: dynamicSize(18),
        alignSelf: 'center'
    },
    searchTokenContainer: {
        flexDirection: 'row', width: wp(92),
        height: hp(7), borderRadius: 8, borderWidth: 1,
        borderColor: TEALDARK,
        marginVertical: hp(0.5),
        alignSelf: 'center',
    },
    textInputStyle: {
        marginLeft: wp(2),
        width: wp(80),
        fontSize: dynamicSize(15)
    },
    textForAvailBal: {
        // color: Colors.light,
        fontSize: 15,
    },
}