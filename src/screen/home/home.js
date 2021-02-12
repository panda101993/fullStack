import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, Dimensions, ImageBackground, Image, FlatList, TouchableOpacity, Platform, SafeAreaView, Animated, ScrollView,
} from 'react-native';
// import { CardComponent } from '../component/cardComponent'
import { dynamicSize, getFontSize } from '../../utils/dynamicSize';
import {
    btcIcon, homecircle, notification, Homeheader, dashboardgraph_up,
    dashboardgraph_down, drawer, profile_img, neoIcon, down_arrow, bitcoin, etheriumcoin,
    bitBuyButton, ethBuyButton, neoBuyButton, down, arrowAutoShape, liteCoin,
    ShadedBackGround, sideIcon, homebtn, background, HomeRectangle, Redarrow,
    ProfileLogo,
    HomeShape, drawerIconGreen, applogoWhite
} from '../../assets/icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomHeader_Dashboard } from '../../components/header';
// import GeneralStatusBarColor from '../../commonComponents/StatusBAR';
// import {CustomHeader_dashboard } from '../component/customHeader'
// import Loader from '../component/Loader'
// import { COIN, COIN_ICON } from '../utils/utilsJson';
const { width, height } = Dimensions.get('window');
const HEADER_EXPANDED_HEIGHT = hp('56%')
const HEADER_COLLAPSED_HEIGHT = 1
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { TEALDARK } from '../../utils/colors';
import Api from '../../api/Api'
import { VictoryPie } from "victory-native";
import AsyncStorage from '@react-native-community/async-storage';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            marketPriceInUsd: '',
            dashboardgraph:[
                {
                    coinPair: 'BHT/USDT',
                    balance: '221.28',
                    low: '-$9,040.86',
                    pluse: '-3.48%'
                },
                {
                    coinPair: 'ETH/USDT',
                    balance: '9,040.86',
                    low: '-$9,040.86',
                    pluse: '+21.13%'
                },
                {
                    coinPair: 'BHT/USDT',
                    balance: '221.28',
                    low: '-$9,040.86',
                    pluse: '-3.48%'
                },
                {
                    coinPair: 'BHT/USDT',
                    balance: '9,040.86',
                    low: '-$9,040.86',
                    pluse: '+21.13%'
                },
            ],
      notificationList: [],
      token: '',
      bitCoinPrice: '',
      lastWeek: '$ 125.50',
      isLoading: false,
      newdata: [],
      coin_Data: "",
      Coin_Price: '',
      refreshing: false,
      scrollY: new Animated.Value(0),
      Swipee: false,
      gestureName: 'none',
      backgroundColor: '#fff',
      completeBalance: [],
      carouselData : [],
      coinsList: [],
      name:"",
      Userbal: [],
      useData: '',
      accountBalance:0,
        }
    }

    componentDidMount = () => {
        //  http://182.72.203.244:3023/notification/get-notification-data
        // AsyncStorage.getItem('token').then(resp => {
        //     this.setState({
        //         token: resp,
        //     })        
        //     this.api()
        //     AsyncStorage.getItem("Sms_enable")
        //         .then(async resp1 => {
        //             this.setState({
        //                 Sms_key: resp1,
        //             }, () => console.log("Did_mount=====>", this.state.Sms_key));
        //         })
        //     AsyncStorage.getItem("Google_enable")
        //         .then(async resp2 => {
        //             this.setState({ google_key: resp2 })
        //         })
        // }
        // )

         this.props.navigation.addListener('focus', () => {
          AsyncStorage.getItem("token")
          .then(resp => {
              this.setState({
                  token: resp,
                  isLoading: true
              },()=>
              {
                  this.getNotification(resp)
                  this.getAccountBalance()
                 
              });
           })
        });
    }

    getAccountBalance = () => {
        AsyncStorage.getItem("token")
          .then(resp => {
            this.setState({
              token: resp,
              isLoading: true
            });
          })
          .then(() => {
            //Select USD or EUR
           let currency ="USD"
            Api(
              this.state.token,
              `wallet/wallet/get-balance-in-usd-or-euro?converterCoin=${currency}`,
              "GET"
            ).then(resp => {
              console.log("data_balance",resp)
              if (resp.data.status == 200) {
                console.log("data_balance",resp)
                this.setState({accountBalance:resp.data.data},()=>this.api())
              } else if (resp.status == 400) {
                this.setState({
                  isLoading: false
                });
                setTimeout(() => {
                  alert(resp.data.message);
                }, 200);
              } else {
                this.setState({
                  isLoading: false
                });
                setTimeout(() => {
                  alert(resp.data.message);
                }, 201);
              }
            });
          });
      };
      api = () => {
        AsyncStorage.getItem("token")
          .then(resp => {
            this.setState({
              token: resp,
              completeBalance: [],
              Userbal: [],
              isLoading: true
            });
          })
          .then(() => {
            Api(
              this.state.token,
              "wallet/wallet/get-all-user-balance-and-coinlist",
              "GET"
            ).then(resp => {
              console.log("data_balance", resp)
              if (resp.data.status == 200) {
                this.Kyc()
                AsyncStorage.getItem("Security")
                  .then(async data => {
                    await this.setState({ google_key: data })
                  })
                var coin = resp.data.data.coinList;
                var userbal = resp.data.data.userBalance;
                for (var i = 0; i < userbal.length; i++) {
                  var user = {
                    availableBalance: userbal[i].availableBalance,
                    coinName: userbal[i].coinName,
                    inOrderBalance: userbal[i].inOrderBalance,
                    instrument: userbal[i].instrument,
                    totalBalance: userbal[i].totalBalance
                  };
                  this.state.Userbal.push(user);
                }
                for (var j = 0; j < coin.length; j++) {
                  var dat = {
                    colorCode: coin[j].colorCode,
                    walletBackgroundUrl: coin[j].walletBackgroundUrl,
                    walletImageUrl: coin[j].walletImageUrl,
                    walletDotUrl: coin[j].walletDotUrl,
                    basicBuyFee: coin[j].basicBuyFee,
                    basicSellFee: coin[j].basicSellFee,
                    coinFullName: coin[j].coinFullName,
                    coinImage: coin[j].coinImage,
                    coinShortName: coin[j].coinShortName,
                    coinType: coin[j].coinType,
                    marketPriceInUsd: coin[j].marketPriceInUsd,
                    takerFee: coin[j].takerFee,
                    withdrawalAmount: coin[j].withdrawalAmount,
                    walletBalance: userbal[j].walletBalance,
                    blockedBalance: userbal[j].blockedBalance,
                    availableBalance: userbal[j].availableBalance,
                    coinName: userbal[j].coinName,
                    inOrderBalance: userbal[j].inOrderBalance,
                    instrument: userbal[j].instrument,
                    totalBalance: userbal[j].totalBalance
                  };
                  let coinsListTemp = this.state.coinsList
              coinsListTemp.push(coin[j].coinShortName);
              let completeBalanceTemp = this.state.completeBalance
              completeBalanceTemp.push(dat);

              this.setState({completeBalance:completeBalanceTemp,coinsList:coinsListTemp, refresh: !this.state.refresh });
              console.log("CoinDetails======>", this.state.completeBalance)
              this.updateBalance(coin[j].coinShortName)
                }
                
                
                this.setState({
                  isLoading: false
                });
                let a = coin.map((item, index) => {
                  let k = userbal.findIndex(data => data.coinName.toUpperCase() == item.coinFullName.toUpperCase())
                  if (k >= 0) {
                    return { ...item, ...userbal[k] }
                  }
                  else {
                    alert("Coin Name is not same !")
                    return {
                    }
                  }
                })
                this.setState({ completeBalance: a })
                let carouselData = []
               a.forEach((item,index)=>{
              if(item.coinShortName!=='USD'&&item.coinShortName!=='EUR'){
                carouselData.push(item)
              }
            })
            this.setState({carouselData:carouselData})
            setTimeout(() => {
              this.updateGraphicData()
            }, 1000);
                } else if (resp.status == 400) {
                this.setState({
                  isLoading: false
                });
                setTimeout(() => {
                  alert(resp.data.message);
                }, 200);
              } else {
                this.setState({
                  isLoading: false
                });
                setTimeout(() => {
                  alert(resp.data.message);
                }, 201);
              }
            });
          });
      };



      updateBalance(coinShortName){
        if(coinShortName!=='USD'&&coinShortName!=='EUR'){
          Api(this.state.token, `wallet/wallet/get-address?coinName=${coinShortName}`, "GET")
          .then(rep => {
            console.log("wallet/wallet/get-address?coinName=ETH", rep)
            if (rep.status == 200) {
              if(coinShortName==='ETH'){
                this.updateBalanceSyncETH()
              }
              else{
                this.updateBalanceGetDeposits(coinShortName)
              }
              
            }
            else if (rep.status == 400) {
              this.setState({
                isLoading: false
              })
              setTimeout(() => {
                alert(rep.data.message)
              }, 100);
            }
            else {
              this.setState({
                isLoading: false
              })
              setTimeout(() => {
                alert(rep.data.message)
              }, 101);
            }
          })
        }
       
      }

      updateBalanceSyncETH(){
    
        Api(this.state.token, "wallet/wallet-type2/get-async-transfer?coinName=ETH", "GET")
        .then(rep => {
          console.log("wallet/wallet-type2/get-async-transfer?coinName=ETH", rep)
          if (rep.status == 200) {
            this.updateBalanceGetDeposits('ETH')
          }
          else if (rep.status == 400) {
            this.setState({
              isLoading: false
            })
            setTimeout(() => {
              alert(rep.data.message)
            }, 100);
          }
          else {
            this.setState({
              isLoading: false
            })
            setTimeout(() => {
              alert(rep.data.message)
            }, 101);
          }
        })
      }

      updateBalanceGetDeposits(coinShortName){
        let apiEndPoint = ""
        if(coinShortName==='ETH'||coinShortName==='USDT'){
          apiEndPoint = `wallet/wallet-type2/get-deposits?coinName=${coinShortName}&page=0&pageSize=10`
        }else{
          apiEndPoint = `wallet/wallet/get-deposits?coinName=${coinShortName}&page=0&pageSize=10` 
        }
      Api(this.state.token, apiEndPoint, "GET")
          .then(rep => {
            console.log("apiEndPoint==>",apiEndPoint, rep)
            if (rep.status == 200) {
              this.updateBalanceGetWithdraw(coinShortName)
            }
            else if (rep.status == 400) {
              this.setState({
                isLoading: false
              })
              setTimeout(() => {
                alert(rep.data.message)
              }, 100);
            }
            else {
              this.setState({
                isLoading: false
              })
              setTimeout(() => {
                alert(rep.data.message)
              }, 101);
            }
          })
    }

    updateBalanceGetWithdraw(coinShortName){
      let apiEndPoint = `wallet/wallet/get-withdrawlist?coinName=${coinShortName}&page=0&pageSize=10`
    Api(this.state.token, apiEndPoint, "GET")
        .then(rep => {
          console.log("apiEndPoint==>",apiEndPoint, rep)
          if (rep.status == 200) {

          }
          else if (rep.status == 400) {
            this.setState({
              isLoading: false
            })
            setTimeout(() => {
              alert(rep.data.message)
            }, 100);
          }
          else {
            this.setState({
              isLoading: false
            })
            setTimeout(() => {
              alert(rep.data.message)
            }, 101);
          }
        })
  }

      Kyc = () => {
        AsyncStorage.getItem("token")
          .then(resp => {
            this.setState({
              token: resp,    
            });
          })
          .then(() => {
            Api(this.state.token, "account/my-account", "GET")
              .then(rep => {
                console.log("data_myaccount", rep)
                if (rep.status == 200) {
    
                  this.setState({ Type_status: rep.data.data.twoFaType,name:rep.data.data.firstName })
                  if (rep.data.data.kyc == null) {
                    this.setState({
                      kycStatus: false,
                    })
                  }
                  else if (rep.data.data.kyc.kycStatus == "PENDING") {
                    this.setState({
                      kycStatus: false
                    })
                  }
                  else if (rep.data.data.kyc.kycStatus == "ACCEPTED") {
                    this.setState({
                      kycStatus: true,
                    })
                  }
                }
                else if (rep.status == 400) {
                  this.setState({
                    isLoading: false
                  })
                  setTimeout(() => {
                    alert(rep.data.message)
                  }, 100);
                }
                else {
                  this.setState({
                    isLoading: false
                  })
                  setTimeout(() => {
                    alert(rep.data.message)
                  }, 101);
                }
              })
          })
      }
      updateGraphicData(){
        let tempGraphicData = []
        let sumOfCoinBalance = 0 
        this.state.carouselData.forEach((item,index)=>{
           console.log("updataing=======================================>",item)
           sumOfCoinBalance=item.availableBalance+sumOfCoinBalance
             tempGraphicData.push({y:item.availableBalance,x:item.coinShortName})
           })
           let remainingBalance= this.state.accountBalance - sumOfCoinBalance
            //  tempGraphicData.push({y:remainingBalance,x:"USD"})
           this.setState({graphicData:tempGraphicData},() => console.log("Pie chart Data===>",tempGraphicData))
       }
    getNotification = (resp) => {       
        console.log("tokens",resp)    
        Api( resp,
                    `notification/get-notification-data`,
                    "GET"
                ).then(resp => {
                    if (resp.data.status == 1618) {
                        console.log("data_balance 1618", resp)
                        this.setState({
                            notificationList: resp.data.data,
                            isLoading: false
                        });
                    }
                    else if (resp.status == 400) {
                        this.setState({
                            isLoading: false
                        });
                        setTimeout(() => {
                            alert(resp.data.message);
                        }, 200);
                    }
                    else {
                        this.setState({
                            isLoading: false
                        });
                        setTimeout(() => {
                            alert(resp.data.message);
                        }, 201);
                    }
                })
    };

    
    
     



    Header_renderdata = (item, index) => {
        console.log("data==", item)
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("MarketInfo")} style={{}}>
                {/* <TouchableOpacity style={{ backgroundColor:'red',width:dynamicSize(100),alignSelf:'center'}} > */}
                <ImageBackground source={item.coinPair === "BHT/USDT" ? dashboardgraph_up : dashboardgraph_down}
                    resizeMode='stretch'
                    style={{ height: dynamicSize(72), width: dynamicSize(160), margin: dynamicSize(10), alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dynamicSize(150), alignSelf: 'center', marginVertical: dynamicSize(5) }} >
                        <View>
                            <Text style={{ color: 'rgb(255,255,255)', fontSize: dynamicSize(10) }} >
                                {item.coinPair}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: item.coinPair === "BHT/USDT" ? 'rgb(14,185,156)' : "rgb(240,44,44)", fontSize: dynamicSize(10) }} >
                                {item.pluse}
                            </Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', marginVertical: dynamicSize(10), width: dynamicSize(150), alignSelf: 'center' }} >
                        <Text style={{ color: item.coinPair === "BHT/USDT" ? 'rgb(14,185,156)' : "rgb(240,44,44)", fontSize: dynamicSize(10) }} >
                            {item.balance}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', marginVertical: dynamicSize(0), width: dynamicSize(150), alignSelf: 'center' }} >
                        <Text style={{ color: item.coinPair === "BHT/USDT" ? 'rgb(14,185,156)' : "rgb(240,44,44)", fontSize: dynamicSize(10) }} >
                            {item.low}</Text>
                    </View>
                </ImageBackground>
                {/* </TouchableOpacity> */}
            </TouchableOpacity>
        )
    }

   async dateHandler(dateItem) {
        const d = new Date(dateItem);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const a = await d.getDate()
        const b = await months[d.getMonth()]
        const c = await d.getFullYear()
        const e = a + " " + b + ", " + c
        // console.log(e)
        return (e)
    }
    renderdata = (item, index) => {
      var d = `${item.createdAt}`
          d = d.split("T")
          d=d[0].split("-")
          let monthIndex=d[1]
          if(d[1].charAt(0)==0) monthIndex=d[1].charAt(1)
            console.log("date===>",monthIndex)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       const dateConverted =  d[2]+ " " + months[monthIndex-1] + ", " + d[0]
      // console.log("date fom api",item.createdAt,"date converted===>",dateConverted)
   
        return (
            <View style={{
                marginVertical: hp(1),
                width: wp(90), alignSelf: "center",
                backgroundColor: 'white',
                borderRadius: wp(2),
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 5,
                shadowOpacity: 1,
                elevation: 9,
                top:Platform.OS=='android' ?hp(1):0

            }}>
                <View style={{ padding: 8 }}>
                    {/* <Text style={{ fontWeight: 'bold' }}>
                        Latest Release:
                       </Text> */}
                    <Text style={{width:wp(86),alignSelf:'center',textAlign:"justify",fontWeight: 'bold'}}>{item.message}</Text>

                    <Text style={{ alignSelf: 'flex-end' }}>{dateConverted} </Text>
                </View>
            </View>
        )}


    getDataBuySell = (item, index, type) => {
        if (type == 'buy') {
            this.props.navigation.navigate('BuySellscreen', { greet: 'buy', "data": this.state.data, id: index, "router": "dashBoard" })
        } else {
            this.props.navigation.navigate('BuySellscreen', { greet: 'sell', "data": this.state.data, id: index, "router": "dashBoard" })
        }
    }

    onSwipeUp(gestureState) {
        this.setState({ Swipee: true });
    }

    onSwipeDown(gestureState) {
        this.setState({ Swipee: false });
    }
    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({ backgroundColor: 'White' });
                break;
            case SWIPE_DOWN:
                this.setState({ backgroundColor: 'white' });
                break;
        }
    }

    render() {
        // const headerHeight = this.state.scrollY.interpolate({
        //     inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        //     outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        //     extrapolate: 'clamp'
        // })
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar backgroundColor="rgb(0,172,153)"
                    barStyle="light-content" />
                <View style={{
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(2),
                    flexDirection: 'row', height: hp(10), width: wp(100),
                     backgroundColor: "rgb(0,172,153)",
                    marginTop: Platform.OS == 'ios' ? 0 : hp(3)
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={drawer} resizeMode="contain" style={{ height: hp(10) }} />
                    </TouchableOpacity>
                    <Image source={applogoWhite} resizeMode='contain' style={{ height: hp(10),width:wp(40) }} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Anouncement")}>
                        <View style={{ height: hp(8), width: wp(10) }} />
                    </TouchableOpacity>
                </View>
            {/* <View style={{
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
            </View> */}
                {/* <Animated.View style={{height: headerHeight,}}> */}
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction, state)}
                    onSwipeUp={(state) => this.onSwipeUp(state)}
                    onSwipeDown={(state) => this.onSwipeDown(state)}
                    config={config}
                    style={{
                        flex: 1,
                        //  backgroundColor: this.state.backgroundColor
                    }}>
                    {this.state.Swipee ?

                        <View style={{ height: hp(10), width: wp(100),  backgroundColor: "rgb(0,172,153)", borderBottomLeftRadius: 400, borderBottomRightRadius: 400 }}></View>
                        :
                        <View style={styles.container}>
                            <ImageBackground source={HomeShape} resizeMode={'cover'} style={{ width, height: hp(62) }} >
                                <View style={{ width: width - dynamicSize(30), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center',top:Platform.OS=='ios' ? 0 :hp(2) }} >
                                    {/* <View style={{ alignSelf: 'center', alignItems: 'flex-end', justifyContent: 'center', height: dynamicSize(40), margin: dynamicSize(5) }} >
                                        <View >
                                            <Text style={{ fontSize: dynamicSize(16), color: 'white', fontWeight: 'bold' }} >AVT</Text>
                                        </View>
                                        <Text style={{ textAlign: 'right', color: 'rgb(52,221,191)', fontWeight: 'bold' }} >EUR 11,327</Text>
                                    </View>
                                    <View style={{ alignSelf: 'center', borderRadius: dynamicSize(100), top: hp(5) }} >
                                        <Image source={homecircle} />
                                    </View>
                                    <View style={{ height: dynamicSize(200), flexDirection: 'column', width: dynamicSize(80), alignSelf: 'center', alignItems: 'flex-end', justifyContent: 'space-between', }} >
                                        <View style={{ width: wp(40), height: hp(8), }} >
                                            <Text style={{ fontSize: dynamicSize(16), color: 'white', fontWeight: 'bold' }} >BTC</Text>
                                            <Text style={{ color: 'rgb(52,221,191)', fontWeight: 'bold' }} >EUR 11,327</Text>
                                        </View>
                                        <View>
                                            <View >
                                                <Text style={{ fontSize: dynamicSize(16), color: 'white', fontWeight: 'bold' }} >ETH</Text>
                                            </View>
                                            <Text style={{ textAlign: 'right', color: 'rgb(52,221,191)', fontWeight: 'bold' }} >EUR 11,32</Text>
                                        </View>
                                        <View>
                                            <View >
                                                <Text style={{ fontSize: dynamicSize(16), color: 'white', fontWeight: 'bold' }} >{''}</Text>
                                            </View>
                                            <Text style={{ textAlign: 'right', }} >{''}</Text>
                                        </View>
                                        <View>
                                            <View >
                                                <Text style={{ fontSize: dynamicSize(16), color: 'white', fontWeight: 'bold' }} >{''}</Text>
                                            </View>
                                            <Text style={{ textAlign: 'right', }} >{''}</Text>
                                        </View>
                                    </View> */}


                      <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('EditProfile') }}
                        style={{
                          width: wp(70),
                          marginTop: hp(2),
                          alignSelf: 'center', justifyContent: 'center'
                        }} >
                        <VictoryPie
                          colorScale={["gold", "orange", "navy", "tomato", "cyan", "tomato", "orange", "gold", "cyan", "navy"]}
                          data={this.state.graphicData}
                          width={wp(70)}
                          height={hp(37)}
                          padAngle={({ datum }) => 1}
                          innerRadius={50}
                          labels={({ datum }) => ` ${datum.x}`}
                          labelPlacement={({ index }) => "parallel"}
                          style={{
                            labels: {
                              fill: 'white', fontSize: 16, padding: 10,
                            },
                          }}
                  events={[{
                    target: "parent",
                  eventHandlers: {
                  onClick: () => { alert("Parent")
                  }
                }
              }]}
                />
                <Image source={ProfileLogo} style={{height:hp(12),
                   marginLeft:wp(20),
                //   bottom:hp(9.7),
                  position: 'absolute',
                  // backgroundColor:'red',
                  width:wp(30)}} resizeMode="contain"/>
              </TouchableOpacity>
                                </View>
                                <View style={{ top: hp(0), height: hp(15), width: wp(90), alignSelf: 'center', marginHorizontal: wp(4) }}>
                                    <View>
                                        <Text style={{ fontWeight: '400', fontSize: getFontSize(16), color: 'white' }}>Account</Text>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: hp(1) }}>
                                            <Text style={{ fontWeight: '600', fontSize: getFontSize(18), color: 'white' }}>BALANCE</Text>
                                            <Text style={{ fontWeight: '600', fontSize: getFontSize(18), color: 'white' }}>{`$${this.state.accountBalance}`}</Text>
                                        </View>
                                    </View>
                    <Text style={{ top: hp(0), color: "white", fontWeight: 'bold', fontSize: getFontSize(14), }}>{this.state.name}</Text>
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("NativeCurrency")}>
                                        <Text style={{ top: hp(2), color: "white", fontWeight: 'bold', fontSize: getFontSize(14), alignSelf: 'center' }}>CHOOSE CURRENCY</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </ImageBackground>
                            <View style={{
                                height: hp(80),
                                marginBottom: Platform.OS == 'ios' ? this.state.Swipee ? hp(-10) : hp(-60) : this.state.Swipee ? hp(0) : hp(-50)
                            }}>
                                <FlatList
                                    data={this.state.notificationList}
                                    renderItem={({ item, index }) => this.renderdata(item, index)}
                                    keyExtracter={(index) => { return index }}
                                    refreshing={this.state.refreshing}
                                    nestedScrollEnabled
                                    onRefresh={this._handleRefresh}
                                    showsVerticalScrollIndicator={false}
                                    extraData={this.state}
                                    scrollEnabled={this.state.Swipee}
                                />
                            </View>
                        </View>
                    }
                </GestureRecognizer>
                    {
                           this.state.Swipee ? <View style={{
                           height: hp(80),
                           marginBottom: Platform.OS == 'ios' ? this.state.Swipee ? hp(-10) : hp(-60) : this.state.Swipee ? hp(0) : hp(-50)
                    }}>
                        <FlatList
                            data={this.state.notificationList}
                            renderItem={({ item, index }) => this.renderdata(item, index)}
                            keyExtracter={(index) => { return index }}
                            refreshing={this.state.refreshing}
                            nestedScrollEnabled
                            onRefresh={this._handleRefresh}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            scrollEnabled={this.state.Swipee}
                        />
                    </View> : null
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    //     container1:{
    // backgroundColor:'#33691e'
    //     },

    // container2:{
    //     backgroundColor:'red'
    //         },


    container: {
        flex: 1,
        // backgroundColor: 'rgb(11,14,44)',
    },
    trueColor: {
        color: "red"
    },
    falseColor: {
        color: "black"
    },
    cardOfFlatlist: {
        marginLeft: dynamicSize(10),
        borderRadius: dynamicSize(10),
        borderColor: "lightgrey",
        borderWidth: 0.5,

        alignItems: "center",
        paddingVertical: dynamicSize(5),
        marginVertical: dynamicSize(7.5)
    },
    selectedCardOfFlatlist: {
        marginLeft: dynamicSize(10),
        borderRadius: dynamicSize(10),
        borderColor: "blue",
        backgroundColor: 'red',
        borderWidth: 0.5,

        alignItems: "center",
        paddingVertical: dynamicSize(5),
        marginVertical: dynamicSize(7.5)
    },

    //card component
    buyStyle: {
        width: wp(25),
        height: wp(10),
    },
    textStyle6: {
        alignSelf: 'center',
        marginVertical: wp(3),
        color: 'rgb(114,225,99)'
    },
    sellStyle: {
        width: wp(25),
        height: wp(10),

    },
    textStyle7: {
        alignSelf: 'center',
        marginVertical: wp(3),
        color: "red"
    },
    textCoin: {
        color: "black",
        fontSize: 17,
        marginVertical: wp(6),

    },
    textCoinFullName: {
        color: "grey",
        marginVertical: wp(-5)

    },
    textCoinValue: {
        color: "black",
        fontSize: 17,
        marginVertical: wp(5)

    },
    textCoinValue1: {
        color: "black",
        fontWeight: '200',
        fontSize: 15,
    },
    totalValueChange: {
        marginHorizontal: wp(3),
        color: "red",
    },
});