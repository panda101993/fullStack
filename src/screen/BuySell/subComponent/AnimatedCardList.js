import * as React from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity,
    ImageBackground,
    Platform
} from 'react-native';

import { TEALDARK, TEALLIGHT, LIGHTGREY } from '@utils/colors';

import {
    sendIcon,
    btcIconBorder, transHistoryIcon,
    btcIcon, cardBgBTC,
    cardBgETH,
    roundedRectShadow, rondedRectangle, bankIcon,
    buySellConvert, buySellTick, buySellWallet, largeButton,
    applogo, graphBg,
    drawerIconGreen,
    notifIconGreen
} from '@assets/icon'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from "./style";
const { width, height } = Dimensions.get("window")
const SPACING = wp(1);
const ITEM_SIZE = wp(80)
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const packageDetails = [
    {
        packageName: 'BITCOIN (BTC)',
        coinShortName: 'BNB',
        coins: '30383.13 USD',
        image: btcIconBorder,
        bgImage: cardBgBTC
    },
    {
        packageName: 'BITCOIN',
        coinShortName: 'MKR',
        coins: '30383.13 USD',
        image: btcIconBorder,
        bgImage: cardBgETH
    },
    {
        packageName: 'BITCOIN',
        coinShortName: 'Token 3',
        coins: '30383.13 USD',
        image: btcIconBorder,
        bgImage: cardBgBTC
    },
    {
        packageName: 'BITCOIN',
        coinShortName: 'ETH',
        coins: '30383.13 USD',
        image: btcIconBorder,
        bgImage: cardBgETH
    },
]

 export default function AnimatedCardList () {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={packageDetails}
            keyExtractor={(item) => item.key}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}

            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: 'center' }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment='start'
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
                // if (!item.poster) {
                //     return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                // }
// const position = Animated.subtract(index * ITEM_SIZE, scrollX);




                const isDisappearing = -ITEM_SIZE;               
                const isCurrent = width - ITEM_SIZE;
                const isAppearing = width;

                const scale = scrollX.interpolate({
                  inputRange:[0.5, 1, 2],
                  outputRange: [0.5, 1, 0.5],
                  extrapolate: "clamp",
                });



                // const position = Animated.subtract(index * ITEM_SIZE, scrollX);
                // const isDisappearing = -ITEM_SIZE;
               
                // const isCurrent = width - ITEM_SIZE;
                // const isAppearing = width;
                // const translateY = Animated.add(
                //   Animated.add(
                //     scrollX,
                //     scrollX.interpolate({
                //       inputRange: [0, 0.00001 + index * ITEM_SIZE],
                //       outputRange: [0, -index * ITEM_SIZE],
                //       extrapolateRight: "clamp",
                //     })
                //   ),
                //   position.interpolate({
                //     inputRange: [isCurrent, isAppearing],
                //     outputRange: [0, -ITEM_SIZE / 4],
                //     extrapolate: "clamp",
                //   })
                // );
                // const scale = position.interpolate({
                //   inputRange: [isDisappearing, isCurrent, isAppearing],
                //   outputRange: [0.5, 1, 0.5],
                //   extrapolate: "clamp",
                // });


                return (
                   
                        <Animated.View
                            style={{
                                // marginHorizontal: SPACING,
                                // padding: SPACING * 2,
                                alignItems: 'center',
                                // transform: [{ translateY }],
                                transform: [ { scale }],
                                // backgroundColor: 'white',
                                borderRadius: 34,
                                height:hp(40),

                            }}
                        >
                            <ImageBackground resizeMode="contain" source={item.bgImage}
                                style={{ height: hp(30), width: wp(94), justifyContent: 'center' }}>
                                <View style={{ flexDirection: "column", marginHorizontal: wp(2), marginTop: hp(2) }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image resizeMode="contain" style={{ width: wp(15), }} source={item.image} />
                                        <View style={{ flexDirection: 'column', marginHorizontal: wp(2) }}>
                                            <Text style={{ color: 'white', fontSize: dynamicSize(20) }}>{item.packageName}</Text>
                                            <Text style={{ color: 'white', fontSize: dynamicSize(15), marginTop: hp(0.8) }}>Available Balance -- 0</Text>
                                            <Text style={{ color: 'white', fontSize: dynamicSize(15), marginTop: hp(0.8) }}>In order Balance   -- 0</Text>
                                            <Text style={{ color: 'white', fontSize: dynamicSize(15), marginTop: hp(0.8) }}>Total Balance        -- 0</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: wp(3) }}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <ImageBackground source={sendIcon} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
                                                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Receive</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { }}>
                                            <ImageBackground source={sendIcon} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
                                                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Send</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { }}>
                                            <ImageBackground source={transHistoryIcon} style={{ height: hp(7), width: wp(35), justifyContent: 'center' }} resizeMode='contain'>
                                                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Txn. History</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>

                        </Animated.View>
         
                );
            }}
        />
       
    )
}

