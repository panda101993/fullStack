
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@utils/responsive';
import { dynamicSize } from '../../utils/dynamicSize'
import { TEALDARK } from '@utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {


    cardViewStyle:{
        flexDirection: 'column', width: wp(92),
        height: hp(15),
        borderColor: TEALDARK,
        alignSelf: 'center',
        justifyContent:"space-between",
        borderWidth: 1.5,
        borderRadius: 3,
        marginVertical: hp(0.5),
        paddingHorizontal:wp(2),
        paddingVertical:hp(0.4)
      }
}