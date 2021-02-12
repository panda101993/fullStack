import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList, Alert, Image, TextInput, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TEALDARK, TEALLIGHT, LIGHTGREY } from '@utils/colors';
import { CustomButton } from '@components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '@utils/animations';
import {
    sendIcon,
    btcIconBorder, transHistoryIcon,
    btcIcon, cardBgBTC,
    cardBgETH,
    roundedRectShadow, rondedRectangle, bankIcon,
    buySellConvert, buySellTick, buySellWallet, largeButton,
    applogo, graphBg, cardBgLite,
    drawerIconGreen, tradeFlatlistBg, buSellFlatlistBg,
    notifIconGreen, buySellToggleBg, tradeTransactionBg
} from '@assets/icon'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from "./style";
import Slider from "react-native-slider";
import AsyncStorage from '@react-native-community/async-storage';
import {
    LineChart,
} from "react-native-chart-kit";
import Api from '../../api/Api'
import ModalComponent from '../../commonComponents/BuySellModal';
import _ from 'lodash';
import moment from 'moment'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
const { width, height } = Dimensions.get("window")
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
export default class CardList extends React.PureComponent{
    render(){
      const {data,item,index} = this.props
         return (
             <View style={{
                 width: wp(96), height: hp(66), alignSelf: 'center',
                 backgroundColor: 'white',
                 shadowColor: 'black',
                 shadowOffset: { width: 10, height: 10 },
                 shadowRadius: 5,
                 shadowOpacity: 1,
                 elevation: 11,
                 marginTop: hp(4),
                 borderRadius: 20
             }}>
                 <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp(5) }}>
                     <Image source={{ uri: item.coinDetails.coinImage }} resizeMode="contain" style={{ height: hp(8), width: wp(15), marginRight: wp(2) }} />
                     <Text style={{ fontSize: dynamicSize(20), fontWeight: 'bold', alignSelf: 'center' }}>{`${item.coinDetails.coinFullName}(${item.coinDetails.coinShortName})`}</Text>
                 </View>
 
                 <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                     <LineChart
                         data={data}
                         width={wp(95)} // from react-native
                         height={hp(35)}
                         formatYLabel={(yValue) => `${yValue}`}
                         color
                         yAxisInterval={1} // optional, defaults to 1
                         chartConfig={{
                             backgroundColor: 'white',
                             backgroundGradientFrom: 'white',
                             backgroundGradientTo: 'white',
                             // decimalPlaces: 2, // optional, defaults to 2dp
                             color: (opacity = 1) => `#00b3b3`,
                             labelColor: (opacity = 1) => `grey`,
                             style: {
                                 // borderRadius: 16
                             },
                             propsForDots: {
                                 r: "0",
                                 strokeWidth: "2",
                                 stroke: "#ffa726"
                             },
                             propsForBackgroundLines: {
                                 strokeWidth: 1,
                             },
                             propsForVerticalLabels: {
                                 fontSize: 10
                             },
                             propsForHorizontalLabels: {
                                 fontSize: 10
                             }
                         }}
                         bezier
                         style={{
                             marginTop: hp(1),
                             borderRadius: 16,
                             // marginRight: wp(8),
                             width: wp(95),
                             height: hp(35)
                             // left: wp(-4)
 
                         }}
                     />
 
                 </View>
                 <Text style={styles.coinRateTextMain}>${item.coinData.volumefrom}</Text>
                 <View style={{ marginVertical: hp(1), marginHorizontal: wp(2), flexDirection: 'row', justifyContent: 'space-around' }}>
                     <View style={{ flexDirection: "column" }}>
                         <Text style={styles.coinRateText}>{"Open"}</Text>
                         <Text style={styles.coinRateText2}>${item.coinData.open}</Text>
                     </View>
                     <View style={{ flexDirection: "column" }}>
                         <Text style={styles.coinRateText}>{"High"}</Text>
                         <Text style={styles.coinRateText2}>${item.coinData.high}</Text>
                     </View>
                     <View style={{ flexDirection: "column" }}>
                         <Text style={styles.coinRateText}>{"Low"}</Text>
                         <Text style={styles.coinRateText2}>${item.coinData.low}</Text>
                     </View>
                 </View>
             </View>
         )
     }
 }