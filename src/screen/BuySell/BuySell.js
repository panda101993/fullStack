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
    applogo, graphBg, cardBgLite,copyIcon,
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
import CardList from './CardList'
export default class BuySell extends Component {
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this)
        this.state = {
            index: 0,
            buySellToggle: true,
            buy: true,
            sell: false,
            value: 0,
            token: '',
            completeBalance: [],
            amountname: 'BTC',
            coinFullName: "BITCOIN",
            coinbalance: '',
            usdamountvalue: '',
            marketPriceInUsd: '',
            coinwalletamount: '',
            buyfee: '',
            sellfee: '',
            USDwallet: false,
            Bank: false,
            wallet: false,
            amounterror: '',
            amountUsderror: '',
            zeroper: true,
            id: '',
            refresh: false,
            data_check: false,
            colorCode1: '',
            buySellModalVisible: false,
            GraphData: [],
            labelData: [],
            graphVerticalData: [ 100,
                                 100,
                                 100,
                                 100,
                                 100,
                                 100,
                                 100,
                                 100 ],
            coinData:{
                high: '',
                low: '',
                open: '',
                volumefrom: ''
            }
        };
    }
    componentDidMount = () => {

        //     AsyncStorage.getItem('token').then(resp => {
        //       this.setState({
        //           token: resp,
        //       })
        //       // this.api()
        //       // this.ethapi()
        //   })
        // this.props.navigation.addListener('focus', () => {
        //     // this.setState({ buySellToggle: this.props.route.params && this.props.route.params.type === "BUY" ? true : false })

        // });

        this.api()
    }

    GraphData = async (completeBalance) => {

        console.log("Loop Started !!!! ===================>")
     let i = 0
        
          while (i<completeBalance.length) {
            console.log("InsideGraphData===>", completeBalance[i])
            if (completeBalance[i].coinShortName !== 'USD' && completeBalance[i].coinShortName !== 'EUR') {
              await this.getCoinGraphData(completeBalance[i].coinShortName).then( (r) => {
                    console.log("Single COin====>",completeBalance[i].coinShortName,r);
                    let allGraphData = this.state.GraphData
                    allGraphData.push({
                        ...r,
                        "coinDetails": {
                           "coinImage":completeBalance[i].coinImage,
                           "coinFullName":completeBalance[i].coinFullName,
                           "coinShortName":completeBalance[i].coinShortName,
                        },

                    })
                    this.setState({GraphData:allGraphData},()=>{i++})
                  });
            }else{
                i++
            }
          }
    console.log("Loop Finished !!!!===================>")
    }

   getCoinGraphData(coinShortName){  
        return new Promise(resolve => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = "";
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


    fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinShortName}&tsym=USD&limit=07&aggregate=3&e=CCCAGG`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log("Results===>", result.Data.Data)
        // var = this.state.GraphData.map(item,index)
        // var arrayGraphData = this.state.GraphData.map(item, index)({key:index,} )
        let labelDataTemp = []
        let graphVerticalDataTemp = []
        _.forEach(result.Data.Data, function (item, index) {
            labelDataTemp.push(moment.unix(item.time).format('DD-MMM'))
            graphVerticalDataTemp.push(Math.trunc(item.high))
            // console.log('date',)
        })
        var length = result.Data.Data.length - 1
        let coinDataTemp = {
            high: '',
            low: '',
            open: '',
            volumefrom: ''
        }
        coinDataTemp.high = result.Data.Data[length].high
        coinDataTemp.low = result.Data.Data[length].low
        coinDataTemp.open = result.Data.Data[length].open
        coinDataTemp.volumefrom = result.Data.Data[length].volumefrom

            console.log("GraphData================>>>>>>", coinShortName)

            resolve({
                "coinData": coinDataTemp,
                "labelData": labelDataTemp,
                "graphVerticalData": graphVerticalDataTemp})
       
    })
    .catch(error => {console.log('error', error)})
})

   }



    api = () => {
        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp,
                coinwalletamount: '',
                usdamountvalue: '',
                USDwallet: false,
                Bank: '',
                completeBalance: [],
                amountname: 'BTC',
                zeroper: true,
                twentyfiveper: false,
                fifty: false,
                seventyfiveper: false,
                hundredper: false,
                value: 0,
            })
        }).then(() => {
            Api(this.state.token, "wallet/wallet/get-all-user-balance-and-coinlist", "GET")
                .then(resp => {
                    if (resp.data.status == 200) {
                        var coin = resp.data.data.coinList
                        var userbal = resp.data.data.userBalance
                        coin.forEach(element => {
                            userbal.forEach((element2, index) => {
                                if (element.coinShortName == element2.instrument) {
                                    userbal[index]['image'] = element.coinImage
                                }
                            });
                        });
                        for (var j = 0; j < coin.length; j++) {
                            var dat = {
                                "colorCode": coin[j].colorCode,
                                "walletBackgroundUrl": coin[j].walletBackgroundUrl,
                                "walletImageUrl": coin[j].walletImageUrl,
                                "walletDotUrl": coin[j].walletDotUrl,
                                "basicBuyFee": coin[j].basicBuyFee,
                                "basicSellFee": coin[j].basicSellFee,
                                "coinFullName": coin[j].coinFullName,
                                "coinImage": coin[j].coinImage,
                                "coinShortName": coin[j].coinShortName,
                                "coinType": coin[j].coinType,
                                "marketPriceInUsd": coin[j].marketPriceInUsd,
                                "takerFee": coin[j].takerFee,
                                "withdrawalAmount": coin[j].withdrawalAmount,
                                "walletBalance": userbal[j].walletBalance,
                                "blockedBalance": userbal[j].blockedBalance,
                                "availableBalance": userbal[j].availableBalance,
                                "coinName": userbal[j].coinName,
                                "inOrderBalance": userbal[j].inOrderBalance,
                                "instrument": userbal[j].instrument,
                                "totalBalance": userbal[j].totalBalance
                            }
                            this.state.completeBalance.push(dat)
                            this.setState({ refresh: !this.state.refresh })

                        }
                        this.setState({
                            amountname: coin[0].coinShortName,
                            coinFullName: coin[0].coinFullName,
                            buyfee: coin[0].basicBuyFee,
                            sellfee: coin[0].basicSellFee,
                            coinbalance: userbal[0].walletBalance,
                            marketPriceInUsd: coin[0].marketPriceInUsd,
                            colorCode1: coin[0].colorCode,
                            availableBalance: userbal[0].availableBalance
                        }, () => console.log("availableBalance????===>", userbal[0].availableBalance))
                        console.log("Complete Balance====>", this.state.completeBalance)

                        let a = coin.map((item, index) => {
                            let i = userbal.findIndex(data => data.coinName.toUpperCase() == item.coinFullName.toUpperCase())
                            if (i >= 0) {
                                return { ...item, ...userbal[i] }
                            }
                            else {
                                alert("Inside  i>>>>")
                                return {
                                }
                            }
                        })
                        this.setState({ completeBalance: a })
                        this.updatecrptoprice("0")
                        this.GraphData(a)
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
        })
    }
    calculateusingslider = (value) => {
        console.log("calculateusingslider===>", typeof (value), value, this.state.availableBalance, this.state.marketPriceInUsd)

        if (value == 0) {
            this.setState({
                zeroper: true,
                twentyfiveper: false,
                fiftyper: false,
                seventyfiveper: false,
                hundredper: false
            })
        }
        if (value == 25) {
            this.setState({
                zeroper: false,
                twentyfiveper: true,
                fiftyper: false,
                seventyfiveper: false,
                hundredper: false
            })
        }
        if (value == 50) {
            this.setState({
                zeroper: false,
                twentyfiveper: false,
                fiftyper: true,
                seventyfiveper: false,
                hundredper: false
            })
        }
        if (value == 75) {
            this.setState({
                zeroper: false,
                twentyfiveper: false,
                fiftyper: false,
                seventyfiveper: true,
                hundredper: false
            })
        }
        if (value == 100) {
            this.setState({
                zeroper: false,
                twentyfiveper: false,
                fiftyper: false,
                seventyfiveper: false,
                hundredper: true
            })
        }
        this.setState({
            coinwalletamount: (this.state.availableBalance * value) / 100,
        }, () => {
            var usddata = this.state.coinwalletamount * this.state.marketPriceInUsd
            console.log("coinwalletamount-->", this.state.availableBalance, typeof (this.state.availableBalance), usddata)

            this.setState({
                usdamountvalue: usddata
            })
        })




    }

    convertintousd = (text) => {
        var usddata = text * this.state.marketPriceInUsd

        var amountregex = /^[0-9]+(\.[0-9]{1,6})?$/
        this.setState({
            coinwalletamount: text,
        })
        if (text != '' && text != '0' && amountregex.test(text)) {
            this.setState({
                amounterror: "",
                usdamountvalue: usddata,
                amountUsderror:""
            })
        }
        else {
            this.setState({ amounterror: "Enter amount" })
        }
    }

    convertintotypecoin = (text) => {
        var coindata = text / (this.state.marketPriceInUsd)
        var amountregex = /^[0-9]+(\.[0-9]{1,6})?$/
        this.setState({
            amountUsderror: "",
            usdamountvalue: text,
            amounterror: "",
        })
        if (text != '' && text != '0' && amountregex.test(text)) {
            this.setState({
                coinwalletamount: coindata,
            })
        }
        else {
            this.setState({ amountUsderror: "Enter amount" })
        }
    }


    reviewbuy = () => {
        if (this.state.coinwalletamount != '' && this.state.amounterror == '') {
            if (this.state.usdamountvalue != '' && this.state.amountUsderror == '') {
                if (this.state.wallet != false || this.state.Bank != false) {
                    if (this.state.wallet) {
                        console.log(
                            "amountname==>", this.state.amountname,
                            "coinwalletamount==>", this.state.coinwalletamount,
                            "marketPriceInUsd==>", this.state.marketPriceInUsd,
                            "buyfee==>", this.state.buyfee,
                            "colorCode1==>", this.state.colorCode1)
                        // this.props.navigation.navigate('Reviewpurchage', {
                        //     "cointype": this.state.amountname, "coincharge": this.state.coinwalletamount,
                        //     "onecoincharge": this.state.marketPriceInUsd, "data": "1", "buyfee": this.state.buyfee, "coinColor": this.state.colorCode1
                        // })
                        setTimeout(() => {
                            var chargestotal = this.state.coinwalletamount * this.state.marketPriceInUsd

                            var buytradingfee = (chargestotal * this.state.buyfeeback) / 100
                            var selltradingfee = (chargestotal * this.state.sellfeeback) / 100
                            var finallbuycoin = (chargestotal - buytradingfee) / this.state.marketPriceInUsd
                            var finallsellcoin = (chargestotal - selltradingfee) / this.state.marketPriceInUsd
                            this.setState({
                                chargestotal: chargestotal,
                                buyfee: buytradingfee,
                                sellfee: selltradingfee,
                                finallbuycoin: parseFloat(finallbuycoin).toFixed(2),
                                finallsellcoin: parseFloat(finallsellcoin).toFixed(2)
                            })
                        }, 500)

                        this.setState({ buySellModalVisible: !this.state.buySellModalVisible })


                    }
                    else {
                        alert("Bank section work is in progress")
                    }
                }
                else {
                    alert("Select payment option")
                }
            }
            else {
                alert("Enter USD amount")
            }
        }
        else {
            alert("Enter " + this.state.amountname + " amount")
        }
    }


    reviewsell = () => {
        if (this.state.coinwalletamount != '' && this.state.amounterror == '') {
            if (this.state.usdamountvalue != '' && this.state.amountUsderror == '') {
                if (this.state.wallet != false || this.state.Bank != false) {
                    if (this.state.wallet) {
                        // this.props.navigation.navigate('Reviewpurchage', { "cointype": this.state.amountname, "coincharge": this.state.coinwalletamount, "onecoincharge": this.state.marketPriceInUsd, "data": "2", "sellfee": this.state.sellfee })
                        setTimeout(() => {
                            var chargestotal = this.state.coinwalletamount * this.state.marketPriceInUsd

                            var buytradingfee = (chargestotal * this.state.buyfeeback) / 100
                            var selltradingfee = (chargestotal * this.state.sellfeeback) / 100
                            var finallbuycoin = (chargestotal - buytradingfee) / this.state.marketPriceInUsd
                            var finallsellcoin = (chargestotal - selltradingfee) / this.state.marketPriceInUsd
                            this.setState({
                                chargestotal: chargestotal,
                                buyfee: buytradingfee,
                                sellfee: selltradingfee,
                                finallbuycoin: parseFloat(finallbuycoin).toFixed(2),
                                finallsellcoin: parseFloat(finallsellcoin).toFixed(2)
                            })
                        }, 500)

                        this.setState({ buySellModalVisible: !this.state.buySellModalVisible })

                    }
                    else {
                        alert("Bank section work is in progress")
                    }
                }
                else {
                    alert("Select payment option")
                }
            }
            else {
                alert("Enter usd amount")
            }
        }
        else {
            alert("Enter " + this.state.amountname + " amount")
        }
    }


    sell = () => {
        let variable = {
            "baseCoin": "USD",
            "execCoin": this.state.amountname,
            "execCoinAmount": this.state.coinwalletamount,
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
                            { text: 'OK', onPress: () => this.setState({ buySellModalVisible: false }) },
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
            "execCoin": this.state.amountname,
            "execCoinAmount": this.state.coinwalletamount,
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
                            { text: 'OK', onPress: () => this.setState({ buySellModalVisible: false }) },
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

    selectcoin = (slideIndex) => {
        console.log("INSIDE SWIPE FUNCTION ===>",slideIndex)
        setTimeout(() => {
            this.setState({
                amountname: this.state.completeBalance[slideIndex].coinShortName,
                coinbalance: this.state.completeBalance[slideIndex].walletBalance,
                coinFullName: this.state.completeBalance[slideIndex].coinFullName,
                coinwalletamount: '',
                usdamountvalue: '',
                USDwallet: false,
                Bank: ''
            }, () => console.log("XXXXXXXXSwipedXXXXXXXXX====>",this.state.completeBalance[slideIndex], this.state.amountname, this.state.coinbalance))

            if (this.state.amountname != 'USD') {
                this.updatecrptoprice(slideIndex)
            }
            else {
                this.setState({
                    marketPriceInUsd: '1'
                })
            }
        }, 200);
    }


    updatecrptoprice = (slideIndex) => {

        Api('', `wallet/coin/update-market-price?coinName=${this.state.amountname}`, "GET")
            .then(resp => {
                if (resp.data.status == 200) {

                    this.setState({
                        isLoading: false,

                    })
                    this.api2(slideIndex)
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

    api2 = (slideIndex) => {
        Api(this.state.token, "wallet/wallet/get-all-user-balance-and-coinlist", "GET")
            .then(resp => {
                if (resp.data.status == 200) {

                    this.setState({
                        isLoading: false,

                        buyfee: this.state.completeBalance[slideIndex].basicBuyFee,
                        sellfee: this.state.completeBalance[slideIndex].basicSellFee,
                        coinbalance: this.state.completeBalance[slideIndex].walletBalance,
                        marketPriceInUsd: resp.data.data.coinList[slideIndex].marketPriceInUsd,
                        colorCode1: resp.data.data.coinList[slideIndex].colorCode,
                        availableBalance: resp.data.data.userBalance[slideIndex].availableBalance,

                    })

                }
                else if (resp.status == 400) {
                    this.setState({
                        isLoading: false,
                        marketPriceInUsd: ''

                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 200);

                }
                else {
                    this.setState({
                        isLoading: false,
                        marketPriceInUsd: ''

                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 201);


                }
            })
    }


    _changeView = (type) => {
        if (type == 'buy') {
            this.setState(
                {
                    buy: true,
                    sell: false,

                }
            )
        }
        else if (type == 'sell') {
            this.setState(
                {
                    buy: false,
                    sell: true,

                }
            )
        }

    }


    submit = () => {

        Api(this.state.token, `p2p-exchange/send-trade-request?amountInRange=${this.state.tradeAmount}&peerToPeerExchangeId=${this.state.data.peerToPeerExchangeId}`, "POST", "")
            // Api(this.state.token, "p2p-exchange/send-trade-request", "POST" ,variables)
            .then(resp => {
                console.log('data===>', resp)
                if (resp.data.status == 200) {
                    alert("successfully done")
                    //  this.setState({packageDetails:resp.data.data.RESULT_LIST})
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,

                        })
                    }, 100);

                }
                else if (resp.status == 400) {

                    setTimeout(() => {
                        this.setState({
                            isLoading: false,

                        })
                    }, 101);
                }
                else {

                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                        })
                    }, 102);
                }
            })
    }
    loginPress = () => {
        if (this.state.tradeAmount != "") {
            this.submit()
        } else {
            this.setState({ tradeAmountError: "*Please enter Amount." })
        }
    }

    validation = (text) => {
        this.setState({
            tradeAmount: text,
            tradeAmountError: ''
        })
    }

    // cardList(item, index) {
    //     return (
    //         <ImageBackground resizeMode="contain" source={cardBgBTC}
    //             style={{ height: hp(27), width: wp(94), justifyContent: 'center' }}>
    //             <View style={{ flexDirection: "column", marginHorizontal: wp(2), marginTop: hp(2) }}>
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Image resizeMode="contain" style={{ width: wp(15), }} source={btcIconBorder} />
    //                     <View style={{ flexDirection: 'column', marginHorizontal: wp(2), width: wp(40) }}>
    //           <Text style={{ color: 'white', fontSize: dynamicSize(20) }}>{item.coinShortName}</Text>
    //           <View style={{ flexDirection: 'row' }}>
    //             <View style={{ flexDirection: 'column' }}>
    //               <Text style={styles.balanceText}>Available Balance</Text>
    //               <Text style={styles.balanceText}>In order Balance</Text>
    //               <Text style={styles.balanceText}>Total Balance</Text>
    //             </View>
    //             <View style={{ flexDirection: 'column' }}>
    //               <Text style={styles.balanceText}>{`  --   ${item.availableBalance}`}</Text>
    //               <Text style={styles.balanceText}>{`  --   ${item.inOrderBalance}`}</Text>
    //               <Text style={styles.balanceText}>{`  --   ${item.totalBalance}`}</Text>
    //             </View>

    //           </View>
    //         </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'row', marginLeft: wp(3) }}>
    //         <TouchableOpacity 
    //         onPress={() => {}}
    //         // onPress={() => { this.setState({ addressmodal: true }) }}
    //         >
    //           <ImageBackground source={sendIcon} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
    //             <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Receive</Text>
    //           </ImageBackground>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => {}}>
    //           <ImageBackground source={sendIcon} style={{ height: hp(7), width: wp(25), justifyContent: 'center' }} resizeMode='contain'>
    //             <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Send</Text>
    //           </ImageBackground>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => { this.props.navigation.navigate('Transaction',{ coinname: item.coinShortName }) }}>
    //           <ImageBackground source={transHistoryIcon} style={{ height: hp(7), width: wp(35), justifyContent: 'center' }} resizeMode='contain'>
    //             <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Txn. History</Text>
    //           </ImageBackground>
    //         </TouchableOpacity>
    //       </View>
    //             </View>
    //         </ImageBackground>
    //     )
    // }

 

    _renderItem({ item }) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
            </View>
        );
    }
    render() {
        const values = [0, 25, 50, 75, 100,]
        const tick = () => <Image source={buySellTick}
            resizeMode='contain'
            style={{
                height: wp('8%'), width: wp('8%'),
                position: 'absolute', alignSelf: 'flex-end', zIndex: 2
            }} />


        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(2),
                    flexDirection: 'row', height: hp(10), width: wp(100), backgroundColor: 'white',
                    marginTop: Platform.OS == 'ios' ? 0 : hp(3)
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={drawerIconGreen} resizeMode="contain" style={{ height: hp(8) }} />
                    </TouchableOpacity>
                    <Image source={applogo} resizeMode="contain" style={{ height: hp(9) }} />
                    <TouchableOpacity>
                        <View style={{ height: hp(8), width: wp(10) }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        scrollEnabled={true}>

                        {/* <ImageBackground source={buSellFlatlistBg} resizeMode="contain" style={{
                            height: hp(40),
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: hp(-8),
                            marginLeft: wp(-0.4),
                            width: wp(130)
                        }}> */}


                        {/* <Carousel
                                ref={(c) => this.carousel = c}
                                data={this.state.completeBalance}
                                renderItem={({ item, index }) => this.cardList(item, index)}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={wp(94)}
                                containerCustomStyle={{ alignSelf: 'center', marginVertical: hp(6) }}
                                inactiveSlideShift={0}
                                // onSnapToItem={(index) => this.setState({ index })}
                                 onSnapToItem={(slideIndex) => this.selectcoin(slideIndex)}
                                scrollInterpolator={scrollInterpolator}
                                slideInterpolatedStyle={animatedStyles}
                                useScrollView={true}
                            /> */}
                        <View style={{ height: hp(77), paddingVertical: hp(2) }}>

                            <Carousel
                                ref={(c) => this.carousel = c}
                                data={this.state.GraphData}
                                renderItem={({ item, index }) =>{
                                let data = {
                                    labels: item.labelData,
                                    datasets: [
                                        {
                                            data: item.graphVerticalData
                                        }
                                    ]
                                }
                                return(
                                    <CardList data={data} item={item} index={index} />
                                )
                                }
                               }
                                sliderWidth={wp(100)}
                                onSnapToItem={(slideIndex) => this.selectcoin(slideIndex)}
                                itemWidth={wp(100)}
                                containerCustomStyle={{
                                    alignSelf: 'center',
                                    top: hp(-2),
                                    //  backgroundColor:'blue'
                                }}

                                activeAnimationType={'spring'}
                                // activeAnimationOptions={{ friction:4,
                                //                           tension:40}}
                              
                                // onSnapToItem={(slideIndex) => this.selectcoin(slideIndex)}
                                inactiveSlideOpacity={0.7}
                                inactiveSlideScale={0.90}
                            />

                        </View>



                        {/* </ImageBackground> */}
                        <View style={{
                            height: hp(12),
                            backgroundColor: "white",
                            bottom: hp(3),
                            width: wp(96), alignSelf: 'center', justifyContent: 'center',
                            shadowColor: 'grey',
                            shadowOffset: { width: 10, height: 10 },
                            shadowRadius: 5,
                            shadowOpacity: 1,
                            elevation: 11,
                            borderRadius: 15
                        }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[TEALDARK, TEALLIGHT]}
                                style={{
                                    height: hp(8), width: wp(94),
                                    borderRadius: 4,
                                    alignSelf: 'center', marginTop: hp(-0.4)
                                }}>
                                <View style={{ flexDirection: 'row', width: wp(94), alignSelf: 'center', justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => this._changeView('buy')}
                                        style={[styles.buySellToggle,

                                        { borderBottomWidth: this.state.buy ? hp(0.5) : 0 }]}>
                                        <Text style={[styles.buySellText,
                                        { marginBottom: this.state.buy ? 0 : hp(0.5) }]}>Buy</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => this._changeView('sell')}
                                        style={[styles.buySellToggle, { borderBottomWidth: this.state.sell ? hp(0.5) : 0 }]}>
                                        <Text style={[styles.buySellText,
                                        { marginBottom: this.state.sell ? 0 : hp(0.5) }]}>Sell</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </View>

                        <View
                            style={styles.tradeTransactionBg}>
                            <Text style={styles.amountText}>Select Amount</Text>




                            <View style={{ width: width - dynamicSize(50), alignSelf: 'center', }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={25}
                                    // trackStyle={{ backgroundColor: '#ffffff', height: dynamicSize(5), width: width - dynamicSize(50) }}
                                    // track={{height:dynamicSize(100)}}
                                    minimumTrackTintColor={TEALDARK}
                                    maximumTrackTintColor={LIGHTGREY}
                                    thumbStyle={{
                                        height: wp('9%'), width: wp('9%'),
                                        borderRadius: 50, backgroundColor: TEALDARK
                                    }}
                                    thumbTintColor={TEALDARK}
                                    value={this.state.value}
                                    onValueChange={(value) => this.calculateusingslider(value)} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - dynamicSize(50), alignSelf: 'center' }}>
                                    <View style={{ width: width / 5, }} >
                                        <TouchableOpacity style={{ width: dynamicSize(40) }}
                                            onPress={() => this.setState({ value: 0, zeroper: true, twentyfiveper: false, fiftyper: false, seventyfiveper: false, hundredper: false })}>
                                            {this.state.zeroper ?
                                                <Text style={{ width: dynamicSize(40), color: TEALDARK }} > 0%</Text>
                                                :
                                                <Text style={{ width: dynamicSize(40), color: TEALDARK }} > 0%</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: width / 5, }}>
                                        <TouchableOpacity style={{ width: dynamicSize(40) }}
                                            onPress={() => this.setState({ value: 25, zeroper: false, twentyfiveper: true, fiftyper: false, seventyfiveper: false, hundredper: false })}>
                                            {this.state.twentyfiveper ?
                                                <Text style={{ width: dynamicSize(40), color: TEALDARK }} > 25%</Text>
                                                :
                                                <Text style={{ width: dynamicSize(40), color: TEALLIGHT }} > 25%</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: width / 5, }} >
                                        <TouchableOpacity style={{ width: dynamicSize(40) }}
                                            onPress={() => this.setState({ value: 50, zeroper: false, twentyfiveper: false, fiftyper: true, seventyfiveper: false, hundredper: false })}>
                                            {this.state.fiftyper ?
                                                <Text style={{ width: dynamicSize(40), color: TEALDARK }} > 50%</Text>
                                                :
                                                <Text style={{ width: dynamicSize(40), color: TEALLIGHT }} > 50%</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: width / 5 }} >
                                        <TouchableOpacity style={{ width: dynamicSize(40) }}
                                            onPress={() => this.setState({ value: 75, zeroper: false, twentyfiveper: false, fiftyper: false, seventyfiveper: true, hundredper: false })}>
                                            {this.state.seventyfiveper ?
                                                <Text style={{ width: dynamicSize(40), color: TEALDARK }} > 75%</Text>
                                                :
                                                <Text style={{ width: dynamicSize(40), color: TEALLIGHT }} > 75%</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: width / 5 }} >
                                        <TouchableOpacity style={{ width: dynamicSize(40) }}
                                            onPress={() => this.setState({ value: 100, zeroper: false, twentyfiveper: false, fiftyper: false, seventyfiveper: false, hundredper: true })}>
                                            {this.state.hundredper ?
                                                <Text style={{ width: dynamicSize(50), color: TEALDARK }} > 100%</Text>
                                                :
                                                <Text style={{ width: dynamicSize(50), color: TEALLIGHT }} > 100%</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>


                            <Text style={styles.amountText}>{`Amount ${this.state.amountname}`}</Text>
                            <View style={[styles.searchTokenContainer]}>
                                <TextInput
                                    onChangeText={(text) => { this.convertintousd(text) }}
                                    keyboardType="numeric"
                                    maxLength={25}
                                    value={this.state.coinwalletamount.toString()}
                                    placeholder=""
                                    placeholderTextColor="#bfbfbf"
                                    style={styles.textInputStyle} />
                            </View>

                            <Text style={{ color: 'red', width: width - dynamicSize(100),marginHorizontal:wp(4) }}>{this.state.amounterror}</Text>
                            <View style={{ flexDirection: 'row', width: wp(90), alignSelf: 'center' }}>
                                <Text style={{ marginVertical: hp(1), fontSize: dynamicSize(17) }}>Amount USD</Text>
                                {/* <TouchableOpacity
                                    onPress={() => { }}
                                    style={{ alignSelf: 'center', marginHorizontal: wp(4) }}>
                                    <Image resizeMode="center" source={buySellConvert}
                                        style={{ height: hp(3), width: wp(6) }} />
                                </TouchableOpacity> */}
                            </View>


                            <View style={[styles.searchTokenContainer]}>
                                <TextInput
                                    keyboardType="numeric"
                                    // onChangeText={(text) => this.handlevalidate(text, "address")}
                                    maxLength={25}
                                    placeholder=""
                                    onChangeText={(text) => { this.convertintotypecoin(text) }}
                                    placeholderTextColor="#bfbfbf"
                                    value={this.state.usdamountvalue.toString()}
                                    style={styles.textInputStyle} />
                            </View>
                            <Text style={{ color: 'red', width: width - dynamicSize(100),marginHorizontal:wp(4) }}>{this.state.amountUsderror}</Text>
                            <Text style={styles.amountText}>Select Your Payment Option</Text>

                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-around', width: wp(92),
                                alignSelf: 'center'
                            }}>
                                <TouchableOpacity onPress={() => this.setState({ wallet: !this.state.wallet, Bank: false })}
                                    style={{ height: hp('21%'), width: wp('45%') }}
                                >{this.state.wallet ? tick() : null}
                                    <ImageBackground source={this.state.wallet ? roundedRectShadow : rondedRectangle}
                                        resizeMode="contain" style={styles.walletBankImgBg}>
                                        <View style={styles.walletBankImgWrapper}>
                                            <Image source={buySellWallet}
                                                resizeMode='contain'
                                                style={styles.walletBankImg} />
                                            <Text style={[styles.textForAvailBal]}>USD Wallet</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ Bank: !this.state.Bank, wallet: false })}
                                    style={{ height: hp('21%'), width: wp('45%') }}
                                >{this.state.Bank ? tick() : null}
                                    <ImageBackground source={this.state.Bank ? roundedRectShadow : rondedRectangle}
                                        resizeMode="contain" style={styles.walletBankImgBg}>
                                        <View style={styles.walletBankImgWrapper}>
                                            <Image source={bankIcon}
                                                resizeMode='contain'
                                                style={styles.walletBankImg} />
                                            <Text style={[styles.textForAvailBal]}>EUR Wallet</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }} >
                                <CustomButton
                                    onPress={() => this.state.buy ? this.reviewbuy() : this.reviewsell()}
                                    mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                                    contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                                    image={largeButton}
                                    textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                                    title='Confirm' />
                            </View>

                        </View>

                        <ModalComponent
                            onPressclosecross={() => this.setState({ buySellModalVisible: !this.state.buySellModalVisible })}
                            // OptionType={this.state.OptionType}
                            modalVisible={this.state.buySellModalVisible}
                            heading={`Market Price ${this.state.marketPriceInUsd}`}
                            body={this.state.buy ?
                                `You have to pay ${this.state.chargestotal} USD for buying ${this.state.coinwalletamount} ${this.state.amountname}. Would you like to continue?`
                                : `You are selling ${this.state.coinwalletamount} ${this.state.amountname} for ${this.state.chargestotal} . Would you like to continue?`}
                            leftButtonText={"OK"}
                            rightButtonText={"CANCEL"}
                            CloseModal={() => this.setState({ buySellModalVisible: !this.state.buySellModalVisible })}
                            onPressLeftButton={() => {
                                //   AsyncStorage.removeItem("Token")
                                this.setState({ buySellModalVisible: !this.state.buySellModalVisible })
                                this.state.buy ? this.buy() : this.sell()
                            }
                            }
                        />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
