import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground,
    TouchableOpacity,Modal, AsyncStorage, Alert, Image, ScrollView} from 'react-native';
// import { CardComponent } from '../component/cardComponent'
import { dynamicSize, getFontSize } from '@utils/dynamicSize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from '@components/button';
import {TEALDARK} from '@utils/colors'
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
// import { walletBackground, bellicon, lineIcon, bankWireCircle, walletIconCircle, instantly } from '../assets/icons'
// import { CustomHeader1 } from '../component/customHeader'
import Api from '../../api/Api'
const { width, height } = Dimensions.get('window');
export default class ReviewPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cointype: '',
            coincharges: '',
            onecoincharge: '',
            data: '',
            token: '',
            buyfee: '',
            sellfee: '',
            buyfeeback: '',
            sellfeeback: '',
            chargestotal: '',
            finallbuycoin: '',
            finallsellcoin: '',
            coinColor: ''
        }
    }
    componentDidMount = () => {
       
        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp,
                buyfeeback: this.props.navigation.state.params.buyfee,
                sellfeeback: this.props.navigation.state.params.sellfee,
                cointype: this.props.navigation.state.params.cointype,
                coincharges: this.props.navigation.state.params.coincharge,
                onecoincharge: this.props.navigation.state.params.onecoincharge,
                data: this.props.navigation.state.params.data,
                coinColor: this.props.navigation.state.params.coinColor
            })
        })
        setTimeout(() => {
            var chargestotal = this.state.coincharges * this.state.onecoincharge
        
            var buytradingfee = (chargestotal * this.state.buyfeeback) / 100
            var selltradingfee = (chargestotal * this.state.sellfeeback) / 100
            var finallbuycoin = (chargestotal - buytradingfee) / this.state.onecoincharge
            var finallsellcoin = (chargestotal - selltradingfee) / this.state.onecoincharge
            this.setState({
                chargestotal: chargestotal,
                buyfee: buytradingfee,
                sellfee: selltradingfee,
                finallbuycoin: parseFloat(finallbuycoin).toFixed(2),
                finallsellcoin: parseFloat(finallsellcoin).toFixed(2)
            })
        }, 500)
    }

    findinterest = () => {

    }

    sell = () => {
       let variable = {
            "baseCoin": "USD",
            "execCoin": this.state.cointype,
            "execCoinAmount": this.state.coincharges,
            "paymentMethod": "WALLET"
        }
       
        Api(this.state.token, "wallet/basic-exchange/place-sell-order", "POST", variable)
            .then(resp => {
                if (resp.data.status == 200) {
                   
                    this.setState({
                        isLoading: false,
                    })
                    Alert.alert(
                        resp.data.message,
                        "",
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate("BuySellscreen") },
                        ],
                        { cancelable: false },
                    );
                }
                else if (resp.status == 400) {
                    this.setState({
                        isLoading: false,
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 200);
                  
                }
                else {
                    this.setState({
                        isLoading: false,
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 201);

                  
                }
            })
    }

    buy = () => {
        let variable = {
            "baseCoin": "USD",
            "execCoin": this.state.cointype,
            "execCoinAmount": this.state.coincharges,
            "paymentMethod": "WALLET"
        }
      
        Api(this.state.token, "wallet/basic-exchange/place-buy-order", "POST", variable)
            .then(resp => {
                if (resp.data.status == 200) {
                  
                    this.setState({
                        isLoading: false,
                    })
                    Alert.alert(
                        resp.data.message,
                        "",
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate("BuySellscreen") },
                        ],
                        { cancelable: false },
                    );
                }
                else if (resp.status == 400) {
                    this.setState({
                        isLoading: false,
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 200);
                 
                }
                else {
                    this.setState({
                        isLoading: false,
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 201);

                   
                }
            })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
            <Modal
                animationType="fade"
                transparent={true}
  
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    //   Alert.alert('Modal has been closed.')
                }}>
                <View style={styles.Container2}>
  
                    {/* <ImageBackground
                        resizeMode='contain'
                        // source={LogoutModalIcon}
                        style={[{
                            alignItems: 'center',
                            // backgroundColor: 'rgb(11, 10, 38)',
                            height: hp("40%"),
                            width: wp('95%'),
                        }]}> */}
                        <View style={[{ flexDirection: 'column', alignItems: 'center',
                        borderWidth:2,
                        height:hp(50),
                        borderColor:TEALDARK,
                        backgroundColor:'white',
                            width: wp('96%'), }, , this.props.imagebgstyle]}>
  
                            <Text style={{ color: TEALDARK, fontSize: 25, marginVertical: hp(4) }}>{"Do you want to enable 2FA ?"}</Text>
                            {/* <Text style={[{ color: 'black', fontSize: 18, marginTop: hp('3%') }, this.props.bodyStyle]}>{this.props.body}</Text> */}
                           
                           
                                <TouchableOpacity onPress={this.props.navigation.goBack()}
                                style={[styles.btnStyle]} >
                                   
                                        <Text style={[styles.textStyle,]}>
                                            Skip
                                        </Text>
                                   
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.google_auth}
                                style={[styles.btnStyle]} >
                                   
                                        <Text style={[styles.textStyle,]}>
                                            Google Auth
                                        </Text>
                                   
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.sms_verification}
                                style={[styles.btnStyle]} >
                                   
                                        <Text style={[styles.textStyle,]}>
                                            SMS Verification
                                        </Text>
                                   
                                </TouchableOpacity>
                              
                        </View>
                    {/* </ImageBackground> */}
                </View>
            </Modal>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      // height:height
      // justifyContent: "center",
    
      // alignItems: "center",
    
    
    }, Container2: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      //  height:hp("50%"),
      alignSelf: 'center',
      width: wp("100%"),
      backgroundColor: 'rgb(0, 0, 3)',
      opacity: 0.85,
    
    },
    btnStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      marginVertical: hp(2),
      marginHorizontal: hp(2),
      backgroundColor:TEALDARK,
      borderRadius:20,
      width: wp(50),
      paddingVertical: wp(4),
      backgroundColor:TEALDARK,
      borderColor:TEALDARK,
      borderWidth:2,
      // height: hp('7%'),
    },
    btnStyle2: {
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      marginVertical: hp(2),
      marginHorizontal: hp(2),
    
      borderColor:TEALDARK,
      borderWidth:2,
      borderRadius:20,
      width: wp('35%'),
      paddingVertical: wp(4),
    
    },
    textStyle: {
      alignSelf: 'center',
      fontSize: dynamicSize(17),
      color: "white",
      fontWeight: '700'
    },
    buttonStyle: {
      paddingVertical: wp(2),
      // paddingHorizontal:wp
      // 20% of height device screen
      width: wp(85),
      height: hp(8),
      alignSelf: "center",
      borderRadius: 25,
    }
    
    })

