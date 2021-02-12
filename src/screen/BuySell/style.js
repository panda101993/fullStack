import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TEALDARK } from '@utils/colors'
import { Dimensions } from 'react-native';
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
const { width, height } = Dimensions.get("window")
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
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
         color: TEALDARK,
        fontSize: 15,
    },
    tradeTransactionBg: {
        marginTop: hp(2),
        marginBottom: hp(15),
        height: hp(96), width: wp(96),
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: hp(6),
        // marginTop: hp(-4),
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 11,
        borderRadius:20
       
    },
    amountText: {
        marginVertical: hp(2),
        fontSize: dynamicSize(17),
        width: wp(90),
        alignSelf: 'center'
    },
    coinRateText: {
        fontSize: dynamicSize(17),
        color: 'grey',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    coinRateText2:
    {
        fontSize: dynamicSize(18),
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    coinRateTextMain: {
        fontSize: dynamicSize(18),
        marginTop: hp(-1),
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    walletBankImgBg:{
        height: hp('22%'),
        marginVertical: hp(-1.5), marginHorizontal: wp(0.5),
        width: wp('46%')
    },
    walletBankImgWrapper:
    { justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 25 },
    walletBankImg:
    { height: wp('12%'), 
      width: wp('12%'), 
      marginVertical: wp('4%') },






    //Courousal module

    carouselContainer: {
        alignSelf: 'center',
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
    },
    itemLabel: {
        color: 'white',
        fontSize: 24
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    //Courousal  Card View
    balanceText:{ color: 'white', fontSize: dynamicSize(15), marginTop: hp(0.8) }
}