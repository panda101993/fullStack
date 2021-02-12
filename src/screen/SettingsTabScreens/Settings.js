
import React, { Component } from 'react';
import { Dimensions, View, Text, SafeAreaView, ScrollView, ImageBackground, Image, FlatList, Platform } from 'react-native';
import { CustomHeader, CustomHeaderPro } from '../../components/header';
import {
  ProfileLogo,
  padlock,
  sideArrow,
  drawerIconGreen,
  applogo,
  btcIconBorder,
  profileOptionsBg,
  tradeFlatlistBg,
  settingEditDeleteBg,
  BankDetailsBg,
  roundedButton3,
  PlusIcon,
  NativeCurrncyIcon,
  shield,
  KYCIcon,
  KYCListIcon
} from '../../assets/icon';
// Async Storage
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '@utils/animations';
const { width, height } = Dimensions.get("window")
import ModalComponent from '../../commonComponents/logoutModal';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
import { getFontSize, dynamicSize } from '@utils/dynamicSize'

import { TEALDARK, TEALLIGHT, LIGHTGREY } from '@utils/colors';

const ProfileTopic = [
  {
    Icon: NativeCurrncyIcon,
    title: 'Ticket',
    navigationKey: 'Ticket'
  },
  {
    Icon: padlock,
    title: 'Change Password',
    navigationKey: 'ChangePassword'
  },
  {
    Icon: shield,
    title: 'Security',
    navigationKey: 'Security'
  },
  {
    Icon: NativeCurrncyIcon,
    title: 'Native Currency',
    navigationKey: 'NativeCurrency'
  },

  {
    Icon: KYCIcon,
    title: 'KYC',
    navigationKey: 'KYC'
  },
  {
    Icon: KYCListIcon,
    title: 'KYC List',
    navigationKey: 'KYCList'
  },

];

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency_name: "USD",
      packageDetails: [
        {
          WalletName: 'EUR Wallet',
          coinShortName: 'BNB',
          coins: '30383.13 USD',
          image: btcIconBorder,
          bgImage: BankDetailsBg,
          BalanceAmt: '€8500'
        },
        {
          WalletName: 'USD Wallet',
          coinShortName: 'MKR',
          coins: '30383.13 USD',
          image: btcIconBorder,
          bgImage: BankDetailsBg,
          BalanceAmt: '$8500'
        },

      ],
      currencyShow: '',
      CurrncyNameToShow:'',
      token: '',
      UserBankACData: [],
      bankListLength: 0,
      isEmpty: true,
      selectedIndex: 0,
      modalVisible: false,
      isRefreshing: false,
      index: 0,
      accountBalanceEUR:'0',
      accountBalance:'0'
    };
  }

  componentDidMount() {
    console.log("PROPS", this.props)

    this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('token').then(resp => {
        this.setState({
          token: resp,
          index: 0,
          selectedIndex: 0,
        }, 
        () => {
          setTimeout(() => {
           
            this.getAccountBalance()
          }, 500);
        },
        )
        // ,()=>{
        //   this.getAccountBalanceEUR()
        // }

      })
      AsyncStorage.getItem('CurrencyName').then(resp => {
        this.setState({
          CurrncyNameToShow: resp
        })

      })
    });
  }
  getAccountBalance = () => {

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
              console.log("Settings=>>",resp)
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
                          if (coin[j].coinShortName ==='USD' ){
                            this.setState({accountBalance:userbal[j].totalBalance},()=>{
                              console.log("this.state.accountBalance",this.state.accountBalance)
                            }
                              )
                            
                          }
                          else if(coin[j].coinShortName ==='EUR'){
                            this.setState({accountBalanceEUR:userbal[j].totalBalance},()=>{
                              console.log("this.state.accountBalanceEUR",this.state.accountBalanceEUR)
                            })
                          }
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
                    // this.updatecrptoprice("0")
                    // this.GraphData(a)
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

  // UserBankData = () => {
  //   AsyncStorage.getItem('token').then(resp => {

  //     Api(resp, "account/get-user-account-list", "GET")
  //       .then(rep => {
  //         if (rep.status == 200) {
  //           let arrayTemp = rep.data.data

  //           if (typeof arrayTemp !== "undefined") {
  //             this.setState({ bankListLength: arrayTemp.length })
  //           } else {
  //             this.setState({ bankListLength: 0 })
  //           }
  //           this.setState({ UserBankACData: rep.data.data })
  //           this.setState({
  //             modalVisible: false,
  //           },
  //             console.log("STT==>", rep.data.data, "DATASTT==>", this.state.UserBankACData)
  //           )
  //           this.setState({ isRefreshing: false })
  //         }
  //         else if (rep.status == 400) {
  //           setTimeout(() => {
  //             alert(rep.data.message)
  //           }, 100);

  //         }
  //         else if (rep.status == 201) {
  //           setTimeout(() => {
  //             this.setState({ bankListLength: 0 })
  //             // alert(rep.data.message)
  //           }, 100);

  //         }
  //         else {
  //           setTimeout(() => {
  //             alert(rep.data.message)
  //           }, 101);

  //         }
  //       })
  //   })


  // }
  // deleteBankApi() {
  //   const bankDetailId = this.state.UserBankACData[this.state.selectedIndex].bankDetailId
  //   Api(this.state.token, `account/delete-user-bank-account?bankDetailId=${bankDetailId}`, "DELETE", {})
  //     .then(async resp => {
  //       console.log("deleteespppppp====>>", resp)

  //       switch (resp.status) {
  //         case (900): {
  //           this.setState({ modalVisible: !this.state.modalVisible })
  //           setTimeout(() => {
  //             Alert.alert(
  //               '',
  //               "Please check your internet connection",
  //               [
  //                 { text: 'OK', onPress: () => console.log('OK Pressed') },
  //               ],
  //               { cancelable: false },
  //             );
  //           }, 200);
  //           break;
  //         }
  //         case (200): {
  //           this.setState({ modalVisible: !this.state.modalVisible })
  //           if (resp.data.status == 200) {
  //             // let tempArray = [...this.state.UserBankACData]
  //             // tempArray.splice(this.state.selectedIndex, 1)
  //             // console.log(tempArray)
  //             // this.setState({UserBankACData:tempArray})
  //             this.UserBankData()
  //           }
  //           else {
  //             Alert.alert(
  //               '',
  //               resp.data.message,
  //               [
  //                 { text: 'OK', onPress: () => console.log('OK Pressed') },
  //               ],
  //               { cancelable: false },
  //             );
  //           }
  //           break;
  //         }
  //         default: {
  //           this.setState({ modalVisible: !this.state.modalVisible })
  //           setTimeout(() => {
  //             Alert.alert(
  //               '',
  //               resp.data.message,
  //               [
  //                 { text: 'OK', onPress: () => console.log('OK Pressed') },
  //               ],
  //               { cancelable: false },
  //             );
  //           }, 200);

  //         }
  //           break;
  //       }

  //     })
  // }


  handleRefresh = () => {
    this.setState({

      isRefreshing: true,
    }, () => {
      this.BankDetailsApi()
    });
  };

  // {
  //   this.state.UserBankACData== 'undefined' || this.state.UserBankACData == '' || this.state.UserBankACData== null  
  // ?
  cardList(item, index) {
console.log("ITEEEEMMM===>",item,"SSSSS",this.state.accountBalance, this.state.accountBalanceEUR)

    const addAccountToggle = this.state.index === this.state.bankListLength - 1 ? true : false


    return (
      <View style={{
        flexDirection: 'row', justifyContent: 'center',
        marginLeft: addAccountToggle ? wp(-8) : wp(0),
        width: addAccountToggle ? wp(92) : wp(90),
        alignSelf: 'center',
        marginVertical: Platform.OS == 'ios' ? hp(2.5) : hp(1)
      }}
      >
        <View resizeMode="contain"
          style={{
            height: Platform.OS == 'ios' ? hp(22) : hp(25),
            width: wp(84),
            alignSelf: 'center',
            marginLeft: addAccountToggle ? wp(-6) : wp(0),
            justifyContent: 'flex-start', borderWidth: 3,
            borderColor: 'rgb(0, 153, 135)',
            backgroundColor: 'rgb(0,172,153)',
            borderRadius: 15
          }}>
          <View style={{ padding: 16 }} >
            <Text style={{ fontSize: 36, fontWeight: '900', color: 'white' }} >{item.WalletName}</Text>

            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: hp(4) }} >
              <Text style={{ fontSize: 24, fontWeight: '300', color: 'white' }}>BALANCE</Text>
              <Text style={{ fontSize: 24, fontWeight: '300', color: 'white' }}>{item.WalletName=='EUR Wallet' ? this.state.accountBalanceEUR : this.state.accountBalance } </Text>
            </View>
          </View>
        </View>


      </View>
      // <View style={{
      //   flexDirection: 'row', justifyContent: 'center',
      //   marginLeft: addAccountToggle ? wp(-8) : wp(0),
      //   width: addAccountToggle ? wp(92) : wp(90),
      //   alignSelf:'center',
      //   marginVertical: Platform.OS =='ios'? hp(2.5) : hp(1),
      // }}>
      //   <View resizeMode="contain" 
      //     style={{
      //       height: Platform.OS =='ios'? hp(22) : hp(25), 
      //       width: wp(84),
      //       alignSelf: 'center',
      //       marginLeft: addAccountToggle ? wp(-6) : wp(0),
      //       justifyContent:'flex-start',borderWidth:3,
      //       borderColor:'rgb(0, 153, 135)',
      //       backgroundColor:'rgb(0,172,153)',
      //       borderRadius:15
      //     }}>
      //     <View style={{ flexDirection: "column" }}>
      //       {/* <View style={{ flexDirection: 'row' }}> */}
      //       {/* <Image resizeMode="contain" style={{ width: wp(15), }} source={item.image} /> */}
      //       <View style={{ flexDirection: 'column', marginHorizontal: wp(6),marginVertical:hp(0.8)}}>
      //         {/* <Text style={{ color: 'white', fontSize: dynamicSize(20) }}>{item.packageName}</Text> */}


      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>Account Holder Name </Text>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8), }}> {item.accountHolderName}</Text>
      //         </View>
      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>Account Number</Text>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>{item.accountNo}</Text>
      //         </View>
      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>Contact Number </Text>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>{item.contactNo} </Text>
      //         </View>

      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>Swift Number</Text>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>{item.swiftNo}</Text>
      //         </View>
      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>IBAN Number</Text>
      //           <Text style={{ color: 'white', fontSize: dynamicSize(13), marginTop: hp(0.8) }}>{item.ibanNo}</Text>
      //         </View>

      //       </View>
      //       {/* </View> */}

      //     </View>
      //   </View>
      //   {
      //     (addAccountToggle && index === this.state.index) ||this.state.bankListLength===1 ?
      //       <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
      //         <TouchableOpacity
      //           onPress={() => this.props.navigation.navigate('AddBank')}
      //           style={{ alignSelf: 'center', justifyContent: 'center' }}>
      //           <Image source={PlusIcon}
      //             resizeMode="contain"
      //             style={{ height: hp(8), width: wp(8), marginLeft: wp(2), alignSelf: 'center' }} />
      //         </TouchableOpacity>
      //       </View>

      //       : null
      //   }

      // </View>



    )

  }
  //   :
  //   null
  // }

  ProfilePage = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate(item.navigationKey) }}
        style={{
          flexDirection: 'row',
          width: wp(100),
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderBottomColor: LIGHTGREY,
          borderColor: 'rgb(77,51,0)',
          paddingVertical: hp('1.5%')
        }}
      >
        <View style={{ flex: 1, marginHorizontal: wp(3) }}>
          <Image
            resizeMode='contain'
            source={item.Icon}
            style={{ height: 25, width: 25, }} />
        </View>
        <View style={[{ flex: 4, alignSelf: 'center', marginHorizontal: 12 }, item.title === "Native Currency" ? { marginHorizontal: 18 } : {}]}>
          <Text style={[styles.TextStyle, { marginHorizontal: wp(-10), fontSize: 16 }]} >{item.title}</Text>
        </View>
        {item.title === "Native Currency" ?
          <View style={{ alignSelf: 'center', }}>
            <Text style={[styles.TextStyle,]}>{this.state.CurrncyNameToShow}</Text>
          </View> : null
        }
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: wp(-1) }}>
          <Image source={sideArrow}
            style={{ height: 18, width: 18, }} resizeMode='contain' />
        </View>

      </TouchableOpacity>

    )
  }

  render() {
    // console.log("this.state.UserBankACData=======================================>", this.state.bankListLength)
    let CoinName = this.state.selectedIndex=='0' ? 'EUR' : "USD"
    console.log("CoinName",CoinName)
    const addAccountToggle = this.state.index === this.state.bankListLength - 1 ? true : false


    return (
      <SafeAreaView style={{ flex: 1 }}  >
        {/* <CustomHeader text1={"Profile"} source1={drawer} onPress1={() => this.props.navigation.openDrawer()} /> */}
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
        <ScrollView style={{ flex: 1, marginVertical: hp(1) }} showsverticalscrollindicator={false}>

          {/* <ImageBackground  resizeMode='stretch' source={ProfileLayer} style={{height:hp('25%'),width:wp('50%'),}}> 
      
      
      <View style={{height:hp('25%'),width:wp('100%'),alignItems:'center',justifyContent:'center',}}> 
      
      <TouchableWithoutFeedback>
        <Image source={ProfileLogo} resizeMode='contain' style={{height:hp('15%'),width:wp('100%'),alignSelf:'center'}} >
          </Image>
          </TouchableWithoutFeedback>
        </View>
     
      </ImageBackground> */}
          <ImageBackground source={tradeFlatlistBg} resizeMode="contain" style={{
            height: hp(42),
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginLeft: wp(-0.4),
            width: wp(134),
            marginTop: hp(-5)
          }}>
            <View style={{ height: hp('28%'), flexDirection: 'row', alignSelf: 'center' }}>

              {/* {this.state.bankListLength===0?
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddBank')}
                  style={{ alignSelf: 'center', justifyContent: 'center' }}>
                  <Image source={PlusIcon}
                    resizeMode="contain"
                    style={{ height: hp(8), width: wp(8), marginLeft: wp(2), alignSelf: 'center' }} />
                </TouchableOpacity>
              </View>
              : */}
              <Carousel
                ref={(c) => this.carousel = c}
                data={this.state.packageDetails}
                renderItem={({ item, index }) => this.cardList(item, index)}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={addAccountToggle ? wp(92) : wp(90)}
                containerCustomStyle={{}}
                inactiveSlideShift={0}
                onSnapToItem={(index) => this.setState({ selectedIndex: index, index: index })}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView={true}
                refreshing={this.state.isRefreshing}
                extraData={this.state.isRefreshing}
                onRefresh={() => this.handleRefresh()}
              />
              {/* }
              
              
              */}
            </View>


          </ImageBackground>

          <ImageBackground
            source={settingEditDeleteBg}
            resizeMode="contain"
            style={{
              height: hp(18), width: wp(114.5),
              marginTop: hp(-10),
              alignSelf: 'center', justifyContent: 'center'
            }}>
            <View style={{
              alignSelf: 'center', justifyContent: 'space-evenly', flexDirection: 'row',
              width: wp('90%'), marginVertical: Platform.OS === 'ios' ? hp(0) : hp(2)
            }}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Deposite',{"coin":CoinName}) }}>
                <ImageBackground source={roundedButton3} style={{ height: hp(10), width: wp(30), justifyContent: 'center' }} resizeMode='contain'>
                  <Text style={{ color: 'white', alignSelf: 'center', fontWeight: '900' }}>Deposite</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddBank',{"coin":CoinName}) }}>
                <ImageBackground source={roundedButton3} style={{ height: hp(10), width: wp(30), justifyContent: 'center' }} resizeMode='contain'>
                  <Text style={{ color: 'white', alignSelf: 'center', fontWeight: '900' }}>Withdraw</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <ImageBackground
            source={profileOptionsBg}
            resizeMode="contain"
            style={{
              height: hp(60), width: wp(114.5),
              marginTop: hp(-12),
              zIndex: -1,
              alignSelf: 'center', justifyContent: 'center'
            }}>
            <View style={{
              alignSelf: 'center', justifyContent: 'center',
              marginTop: Platform.OS==='ios'? hp(6):hp(0),
              height: hp(40)
            }}>
              <FlatList
                style={{}}
                data={ProfileTopic}
                renderItem={({ item, index }) => this.ProfilePage(item, index)}
                keyExtracter={
                  (index) => { return index }}
              />

            </View>

          </ImageBackground>
          <View style={{ marginBottom: hp(15) }} />
        </ScrollView>
        {/* <ModalComponent
          onPressclosecross={() => this.setState({ modalVisible: !this.state.modalVisible })}

          modalVisible={this.state.modalVisible}
          heading={"Delete Bank?"}
          body={"Are you sure you want to delete this bank?"}
          leftButtonText={"YES"}
          rightButtonText={"NO"}
          CloseModal={() => this.setState({ modalVisible: !this.state.modalVisible })}
          onPressLeftButton={() => {
            this.deleteBankApi()
          }
          }
        /> */}
      </SafeAreaView>
    )
  }
}
