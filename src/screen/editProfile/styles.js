
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@utils/responsive';
import { dynamicSize } from '../../utils/dynamicSize'
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
    TextInput: {
        width: width - dynamicSize(30),
        height: dynamicSize(40),
        //   backgroundColor:'green',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(0,224,176)',
    },
    TextInput1: {
        width: width - dynamicSize(30),
        height: dynamicSize(50),
        // backgroundColor:'green',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderBottomColor: 'rgb(0,224,176)',
    },
    VerifiedButtonContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: TEALDARK,
        alignSelf: "center",
        marginVertical: hp(2),
        flexDirection: 'row',
        height: hp(7),
        width: wp(40),
        justifyContent: 'space-around',
        paddingHorizontal: wp(3)
    },
    VerifiedText: {
        alignSelf: 'center',
        color: 'rgb(81,175,57)',
        fontSize: dynamicSize(20),
        fontWeight: 'bold'
    },
    verifiedIconStyle:
    {
        height: hp(4),
        width: wp(10),
        alignSelf: 'center'
    },
    UnderlineTextWrapper: {
        borderBottomWidth: 1.5, width: wp(48),
        borderBottomColor: TEALDARK, alignSelf: 'center'
    },
    UnderlineText: {
        fontSize: dynamicSize(18),
        color: TEALDARK,
        alignSelf: 'center',
    },
    redText: {
        fontSize: dynamicSize(15),
        color: 'red',
        alignSelf: 'center',
        marginVertical: hp(1.5)
    },
    phNumberView: {
        width: width - dynamicSize(30),
        height: dynamicSize(40),
        //  backgroundColor:'green',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    phNumbersubView: {
        height: dynamicSize(40), flexDirection: 'row', justifyContent: 'space-between'
    },
    checkboxView: {
        marginVertical: dynamicSize(15),
        width: width - dynamicSize(30),
        // flexDirection:'row',



    },
    checkboxSubView: {
        width: width - dynamicSize(30),
        flexDirection: 'row',


    },

    IdAreaContainer: {
        height: hp(22), width: wp(90)
        , alignSelf: 'center',
        borderRadius: 7,
        marginVertical: hp(5),
        borderWidth: 1,
        backgroundColor: '#b3b3b3',
        borderColor: 'rgb(0,224,176)', justifyContent: 'flex-end'
    },

    cameraIconStyle: {
        marginVertical: hp(1), marginHorizontal: wp(4),
        height: hp(4), width: wp(8)
    },
    errorText: {
        color: "red", height: dynamicSize(15),
        fontSize: dynamicSize(12),
    }
}