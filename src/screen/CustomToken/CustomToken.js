import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, TextInput, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '../../components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import {
    Calendar, roundButton, searchIcon,
    roundedButton3, ArrowDropDown, back,
    ethIcon,
    homebtn, largeButton, imageAvtar
} from '@assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '../../components/button'
import styles from './styles'
import { TEALDARK } from '@utils/colors'
import { connect, } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 class CustomToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageDetails: [
                {
                    packageName: 'BITCOIN',
                    coinShortName: 'BNB',
                    coins: '30383.13 USD',
                    image: ethIcon,
                },
                {
                    packageName: 'BITCOIN',
                    coinShortName: 'MKR',
                    coins: '30383.13 USD',
                    image: ethIcon,
                },
                {
                    packageName: 'BITCOIN',
                    coinShortName: 'Token 3',
                    coins: '30383.13 USD',
                    image: ethIcon,
                },
                {
                    packageName: 'BITCOIN',
                    coinShortName: 'ETH',
                    coins: '30383.13 USD',
                    image: ethIcon,
                },
            ],
        };
    }
    renderdata(item, index) {
        return (
            <View style={{ flexDirection: "row", width: wp(92),
                            height: hp(15),
                            borderColor: TEALDARK,
                            borderWidth: 1.5,
                            borderRadius:10,
                            marginVertical:hp(1)}}>
                <View>
                    <Image source={item.image}
                        style={{ width: wp(16),marginVertical:hp(1) }}
                        resizeMode='contain' />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: wp(70) }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between",
                                   marginTop:hp(2),
                                   marginLeft: wp(2)}}>
                        <Text  style={{fontWeight: 'bold',fontSize:dynamicSize(17)}}>{item.coinShortName}</Text>
                        <Text>6707.0499</Text>
                    </View>
                    <View style={{ flexDirection: 'row',marginRight:wp(3) }}>
                        <TouchableOpacity onPress={() => {}}>
                            <ImageBackground source={homebtn} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
                                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Deposit</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <ImageBackground source={homebtn} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
                                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Withdraw</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <ImageBackground source={homebtn} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
                                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>History</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}  >
                <CustomHeader text1={"Custom Token"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        scrollEnabled={true}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddToken')}>
                                <ImageBackground resizeMode="contain" source={roundedButton3}
                                    style={{ height: hp(7.5), width: wp(38), justifyContent: 'center', }}
                                ><Text style={styles.addButtonText}>Add Token</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <View style={styles.dropDownButtonContainer}>
                                <Text style={styles.dropDownText}>Select Token</Text>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={styles.dropDownIconWrapper}>
                                    <Image source={ArrowDropDown} resizeMode='contain' style={styles.dropDownIconStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.searchTokenContainer}>
                            <Image source={searchIcon} resizeMode="contain"
                                style={{ height: hp(5), alignSelf: 'center', marginHorizontal: wp(2) }}
                            />
                            <TextInput
                                placeholder="Search Token"
                                placeholderTextColor="#bfbfbf"
                                style={{ width: wp(80), fontSize: dynamicSize(15) }} />

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: wp(35) }}>
                                <Text style={{ fontWeight: 'bold', fontSize: dynamicSize(17) }}>ETH Address:</Text>
                            </View>
                            <View style={{ width: wp(55) }}>
                                <Text>87x875hjxvvkjh56skiso43lnl_hsj3_xhfjd</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: hp(2) }}>
                            <View style={{ width: wp(35) }}>
                                <Text style={{ fontWeight: 'bold', fontSize: dynamicSize(17) }}>ETH Balance:</Text>
                            </View>
                            <View style={{ width: wp(55) }}>
                                <Text>0.0 ETH</Text>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.packageDetails}
                            renderItem={({ item, index }) => this.renderdata(item, index)}
                            keyExtracter={(index) => { return index }}
                            showsVerticalScrollIndicator={false}
                        />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        KYC: state.reducer.language.CustomToken,
        COMMON_TEXT: state.reducer.language.CustomToken,
        // token: state.AuthReducer.Token

    }
}

export default connect(mapStateToProps)(CustomToken);