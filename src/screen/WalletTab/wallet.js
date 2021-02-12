import React, { Component } from 'react';
import {
  Clipboard, StyleSheet, Modal, View, Alert, Text,
  Dimensions, ScrollView, FlatList, Image, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, ImageBackground, SafeAreaView, Platform
} from 'react-native';
import {
  sendIcon,
  btcIconBorder, transHistoryIcon,
  btcIcon, cardBgBTC,
  cardBgETH,
  roundedRectShadow, rondedRectangle, bankIcon,
  buySellConvert, buySellTick, buySellWallet, largeButton,roundButton,
  applogo,
  drawerIconGreen,
  notifIconGreen,
  QRCodeIcon,
  copyIcon,
  cardBgLite, buSellFlatlistBg,
  tradeFlatlistBg,
  SideLayer
} from '@assets/icon'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TEALDARK, TEALLIGHT, LIGHTGREY } from '@utils/colors';
import { WalletLayer, homecircle, back, CrossIcon, ProfileLogo } from '../../assets/icon';
import { CardComponentModal } from '../../components/card';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import QRCode from 'react-native-qrcode-svg';
// import QRCode from 'react-native-qrcode';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '@utils/animations';
const { width, height } = Dimensions.get("window")
import Api from '../../api/Api'
import { VictoryPie } from "victory-native";
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
import { CustomButton } from '../../components/button';
import SMSVerifyModal from '../../commonComponents/SMSVerifyModal'
import Transaction from './Components/Transaction'
export default class wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphicData: [
        { y: 10, x: ' ' },
        // { y: 90, x: ' ' },
        // { y: 50, x: ' ' },
        // { y: 20, x: ' ' },
        // { y: 360, x:' ' },
      ],
      completeBalance: [],
      carouselData: [],
      addressmodal: false,
      sendmodal: false,
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',

      Swipee: false,
      token: '',

      isLoading: false,
      data: [],
      name:"",
      walletaddress: "",
      cointype: "",
      amount: "",
      item: null,
      index: null,
      clipboardContent: "",
      qrcode: "",
      otpcode: "",
      otp: false,
      otpcode1: "",
      otpcode2: "",
      otpcode3: "",
      otpFieldOne: '',
      refreshing: false,
      address: "",
      coinripple: false,
      coineos: false,
      secretkey: "",
      tag: "",
      addressname: "",
      tagsend: "",
      withdrawlFee: "",
      marketPriceInUsd: "",
      fee: 0,
      final: 0,
      coinsList: [],
      Userbal: [],
      useData: '',
      variable: '',
      Sms_auth: false,
      IPAddress: "",
      accountBalance: 0,
      buySellModalVisible: false,
      smsOTPError: '',
      smsOTPError2: '',
      sentMailConfirmModal: false
    };
  }

  componentDidMount = () => {

    this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem("token")
      .then(resp => {
          this.setState({
              token: resp,
              isLoading: true
          },()=>
          {
              this.getAccountBalance()  
          });
       })
    });



    AsyncStorage.getItem('IPAddress').then(resp => {
      this.setState({
        IPAddress: resp
      })
    })
    
  };

  CopyClipBoard(item){
    Clipboard.setString(item)
   alert("Copied to clipboard")
    
}

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

              this.setState({ completeBalance: completeBalanceTemp, coinsList: coinsListTemp, refresh: !this.state.refresh });
              console.log("CoinDetails======>", this.state.completeBalance)
              this.updateBalance(coin[j].coinShortName)

            }
            setTimeout(() => {
              this.updateGraphicData()
            }, 1000);

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
            a.forEach((item, index) => {
              if (item.coinShortName !== 'USD' && item.coinShortName !== 'EUR') {
                carouselData.push(item)
              }
            })
            this.setState({ carouselData: carouselData })
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
        let currency = "USD"
        Api(
          this.state.token,
          `wallet/wallet/get-balance-in-usd-or-euro?converterCoin=${currency}`,
          "GET"
        ).then(resp => {
          console.log("data_balance", resp)
          if (resp.data.status == 200) {
            console.log("data_balance", resp)
            this.setState({ accountBalance: resp.data.data }, () => this.api())
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

  updateGraphicData() {
    let tempGraphicData = []
    let sumOfCoinBalance = 0
    this.state.carouselData.forEach((item, index) => {
      console.log("updataing=======================================>", item)
      sumOfCoinBalance = item.availableBalance + sumOfCoinBalance
      tempGraphicData.push({ y: item.availableBalance, x: item.coinShortName })
    })

    let remainingBalance = this.state.accountBalance - sumOfCoinBalance
    //  tempGraphicData.push({y:remainingBalance,x:"USD"})

    this.setState({ graphicData: tempGraphicData }, () => console.log("Pie chart Data===>", tempGraphicData))
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

  onSwipeLeft(gestureState) {
    this.setState({ Swipee: true });
  }

  onSwipeRight(gestureState) {
    this.setState({ Swipee: false });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({ backgroundColor: 'White' });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: 'white' });
        break;
    }
  }




  receieve = (item, index) => {
    this.setState({
      walletaddress: "",
      addresserror: "",
      tagerror: "",
      amounterror: "",
      addressmodal: !this.state.addressmodal
    });

    Api(
      this.state.token,
      `wallet/wallet/get-address?coinName=${item.coinShortName}`,
      "GET"
    ).then(resp => {
      console.log("data_address==>", resp)
      if (resp.data.status == 200) {

        this.setState({
          isLoading: false,
          addressname: resp.data.data.eosAccountName,
          coinDetailName: resp.data.data.coinName,
          walletaddress: resp.data.data.walletAddress
        });
      } else if (resp.status == 400) {
        this.setState({
          isLoading: false
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 100);

      } else {
        this.setState({
          isLoading: false
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 101);


      }
    });

  };


  send = (item, index) => {
    console.log("send======>", item)
    if (item != null && index != null && item.coinShortName !== 'USDT') {
      Api(
        "",
        `wallet/coin/update-market-price?coinName=${item.coinShortName}`,
        "GET"
      ).then(resp => {
        if (resp.data.status == 200) {

          setTimeout(() => {
            this.setState({
              isLoading: false,
              addresserror: "",
              tagerror: "",
              amounterror: "",
              fee: 0,
              final: 0,
              amount: "",
              address: "",
              tagsend: "",
              sendmodal: !this.state.sendmodal
            });
            this.send2(item, index);
          }, 200);
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
    }
    else if (item.coinShortName === 'USDT') {
      this.setState({
        isLoading: false,
        addresserror: "",
        tagerror: "",
        amounterror: "",
        fee: 0,
        final: 0,
        amount: "",
        address: "",
        tagsend: "",
        sendmodal: !this.state.sendmodal
      });
      this.send2(item, index);

    }
    else {
      alert("Something went wrong.")
    }
  };


  send2 = (item, index) => {
    console.log("Send2====>", item)
    Api(
      "",
      `wallet/coin/get-coin-details?coinName=${item.coinShortName}`,
      "GET"
    ).then(resp => {
      if (resp.status == 200) {
        console.log('dataApiForAll====>', resp)
        this.setState({
          isLoading: false,
          coinDetailName: resp.data.data.coinFullName,
          withdrawlFee: resp.data.data.withdrawlFee,
          cointype: resp.data.data.coinShortName,
          marketPriceInUsd: resp.data.data.marketPriceInUsd,
          coinripple: false,
          coineos: false,
          coinstellar: false
        });
      } else if (resp.status == 400) {
        this.setState({
          isLoading: false
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 100);

      } else {
        this.setState({
          isLoading: false
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 101);

      }
    });

  };

  apiwithdrawal = () => {
    var amountregex = /^[0-9]+(\.[0-9]{1,6})?$/;
    var tagregex = /^[0-9]{6,9}?$/;
    if (this.state.coinripple) {
      if (
        this.state.amount != "" &&
        this.state.amount != "0" &&
        amountregex.test(this.state.amount)
      ) {
        if (this.state.address != "") {
          if (
            this.state.tagsend != "" &&
            tagregex.test(this.state.tagsend)
          ) {

            if (this.state.Type_status === "SKIP") {

              alert("Please turn on your 2FA authentication")
            }
            else if (this.state.Type_status === "SMS") {

              this.sms_verification()
            }
            else if (this.state.Type_status === "GOOGLE") {
              this.setState({ otp: true, sendmodal: false })
            }

          } else {
            this.setState({ tagerror: "Enter tag" });
          }
        } else {
          this.setState({
            addresserror: "Enter wallet address"
          });
        }
      } else {
        this.setState({ amounterror: "Enter amount" });
      }
    } else if (this.state.coineos) {
      var addressnameregex = /^[a-z,1-5]{12,12}?$/;
      if (
        this.state.amount != "" &&
        this.state.amount != "0" &&
        amountregex.test(this.state.amount)
      ) {
        if (
          this.state.address != "" &&
          addressnameregex.test(this.state.address)
        ) {
          if (this.state.Type_status === "SKIP") {

            alert("Please turn on your 2FA authentication")
          }
          else if (this.state.Type_status === "SMS") {

            this.sms_verification()
          }
          else if (this.state.Type_status === "GOOGLE") {
            this.setState({ otp: true, sendmodal: false })
          }
        } else {
          this.setState({ tagerror: "Enter address name" });
        }
      } else {
        this.setState({ amounterror: "Enter amount" });
      }
    }

    else {
      if (
        this.state.amount != "" &&
        this.state.amount != "0" &&
        amountregex.test(this.state.amount)
      ) {
        if (this.state.address != "") {
          if (this.state.Type_status === "SKIP" || this.state.Type_status === "NONE") {
            alert("Please turn on your 2FA authentication")
          }
          else if (this.state.Type_status === "SMS") {

            this.sms_verification()
          }
          else if (this.state.Type_status === "GOOGLE") {
            this.setState({ otp: true, sendmodal: false })
          }

        } else {
          this.setState({
            addresserror: "Enter wallet address"
          });
        }
      } else {
        this.setState({ amounterror: "Enter amount" });
      }
    }
  };


  sms_verification = () => {
    this.setState({
      isLoading: true
    })
    Api(this.state.token, "account/send-sms-code", "GET")
      .then(rep => {

        if (rep.status == 200) {

          this.setState({
            isLoading: false
          })
          this.setState({ Sms_auth: true, sendmodal: false })
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


  SMS_verify = () => {

    variable = {
      "code": this.state.otpcode2,
      "ipAddress": this.state.IPAddress,
      "source": "MOBILE"
    }
    Api(this.state.token, "auth/verify-sms", "POST", variable)
      .then(rep => {

        if (rep.data.status == 200) {
          setTimeout(() => {
            this.setState({ Sms_auth: !this.state.Sms_auth })
          }, 100)
          setTimeout(() => {
            Alert.alert(
              "",
              rep.data.message,
              [
                {
                  text: "OK",
                  onPress: () =>
                    this.apiwithdrawal1(),
                  style: "OK"
                }
              ],
              { cancelable: false }
            );
          }, 500)
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

  verify_google_auth() {

    Api(this.state.token, "auth/verify-google", "POST", {
      otp: this.state.otpcode1,
      "ipAddress": this.state.IPAddress,
      "source": "MOBILE"
    }).then(rep => {

      if (rep.data.status == 200) {
        this.setState({
          otp: false
        });

        setTimeout(() => {
          Alert.alert(
            "",
            "Successfully Verified.",
            [
              {
                text: "OK",
                onPress: () =>
                  this.apiwithdrawal1(),
                style: "OK"
              }
            ],
            { cancelable: false }
          );
        }, 100);
      } else if (rep.data.status == 400) {
        setTimeout(() => {
          alert("Please turn on google auth first!");
        }, 100);

      }
      else if (rep.data.status == 401) {
        setTimeout(() => {
          alert("Google authentication code wrong!");
        }, 100);
      }
      else {
        setTimeout(() => {
          alert(rep.data.message);
        }, 100);
      }
    });
  }

  verify_transaction() {

    Api(
      this.state.token,
      "wallet/wallet/approve-withdraw",
      "POST",
      {
        "isWithdraw": true,
        "withdrawToken": this.state.otpcode3
      }
    ).then(resp => {
      console.log("this.verify_transaction====>", resp)
      if (resp.data.status == 200) {
        this.setState({
          sentMailConfirmModal: false
        })
        this.api()
        setTimeout(() => {
          alert(resp.data.message);
        }, 500);
      } else if (resp.status == 400) {
        alert(resp.data.message);
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 200);
      } else {
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 200);
      }
    });
  }


  cancel_transaction() {
   
    Api(
      this.state.token,
      `wallet/wallet/cancel-withdraw?token=${this.state.otpcode3}`,
      "GET"
    ).then(resp => {
      console.log("cancel_transaction====>", resp)
      if (resp.data.status == 200) {
        this.setState({
          sentMailConfirmModal: false
        })
        setTimeout(() => {
          alert(resp.data.message);
        }, 500);
      } else if (resp.status == 400) {
        alert(resp.data.message);
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 200);
      } else {
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          alert(resp.data.message);
        }, 200);
      }
    });
  }



  apiwithdrawal1 = () => {
    console.log("Inside apiwithdrawal1=========>", this.state.cointype)


    if (this.state.cointype === 'USDT') {
      console.log("Inside apiwithdrawal1 this is USDT=========>", this.state.cointype)
      this.setState({
        isLoading: true
      });
      let variable = {
        amount: this.state.amount,
        coinName: this.state.cointype,
        isWithdraw: "false",
        isKycAccepted: this.state.kycStatus,
        // tag: this.state.tagsend,
        toAddress: this.state.address,
        url: "http://182.74.213.163:8765/wallet-transaction-status"
      };

      Api(
        this.state.token,
        "wallet/wallet-type2/withdraw-type3",
        "POST",
        variable
      ).then(resp => {
        if (resp.data.status == 200) {
          this.setState({
            isLoading: false,
            amount: "",
            address: "",
            tagsend: "",
            fee: 0,
            final: 0,
            sentMailConfirmModal: true
          })
          // this.api()
          setTimeout(() => {
            alert(resp.data.message);
          }, 500);
        } else if (resp.status == 400) {
          alert(resp.data.message);
          this.setState({
            isLoading: false,
          });
          setTimeout(() => {
            alert(resp.data.message);
          }, 200);
        } else {
          this.setState({
            isLoading: false,
          });
          setTimeout(() => {
            alert(resp.data.message);
          }, 200);
        }
      });
    } else {
      this.setState({
        isLoading: true
      });
      let variable = {
        amount: this.state.amount,
        coinName: this.state.cointype,
        isWithdraw: "false",
        isKycAccepted: this.state.kycStatus,
        toAddress: this.state.address,
        url: "fullstackblockchain://"
        
      };
      Api(
        this.state.token,
        "wallet/wallet/withdraw",
        "POST",
        variable
      ).then(resp => {
        if (resp.data.status == 200) {
          this.setState({
            isLoading: false,
            amount: "",
            address: "",
            fee: 0,
            final: 0,
            sentMailConfirmModal: true
          });
          this.api();
          setTimeout(() => {
            alert(resp.data.message);
          }, 500);
        } else if (resp.status == 400) {
          this.setState({
            isLoading: false,
          });
          setTimeout(() => {
            alert(resp.data.message);
          }, 200);
        } else {
          this.setState({
            isLoading: false,
          });
          setTimeout(() => {
            alert(resp.data.message);
          }, 201);
        }
      });
    }
  };

  calculate = text => {
    console.log("amountText===>", text)
    this.setState({
      amount: text
    });
    var fee = ((text * this.state.withdrawlFee) / 100).toFixed(4);
    var final =
      text - (fee / this.state.marketPriceInUsd).toFixed(4);
    var amountregex = /^[0-9]+(\.[0-9]{1,6})?$/;

    if (text != "" && text != "0" && amountregex.test(text)) {
      this.setState({
        amounterror: "",
        fee: fee,
        final: final
      });
    } else {
      this.setState({ amounterror: "Enter amount" });
    }
  };
  cardList(item, index) {
    // if (item.coinShortName!=="USD") { 

    // console.log("item=========>Wallet==============>",item)
    return (
      <ImageBackground resizeMode="contain" source={cardBgBTC}
        style={{ height: hp(27), width: wp(94), justifyContent: 'center' }}>
        <View style={{ flexDirection: "column", marginHorizontal: wp(2), marginTop: hp(2) }}>
          <View style={{ flexDirection: 'row' }}>
            <Image resizeMode="contain" style={{ width: wp(15), height: hp(8), alignSelf: 'flex-start' }} source={{ uri: item.coinImage }} />
            <View style={{ flexDirection: 'column', marginHorizontal: wp(2), width: wp(60) }}>
              <Text style={{ color: 'white', fontSize: dynamicSize(20) }}>{item.coinShortName}</Text>
              <View style={{ flexDirection: 'row', height: hp(8) }}>
                <View style={{ flexDirection: 'column', height: hp(8), justifyContent: 'space-around' }}>
                  <Text style={styles.balanceText}>Available Balance</Text>
                  {/* <Text style={styles.balanceText}>In order Balance</Text> */}
                  <Text style={[styles.balanceText, { fontSize: dynamicSize(20) }]}>Total Balance</Text>
                </View>
                <View style={{ flexDirection: 'column', height: hp(8), justifyContent: 'space-around' }}>
                  <Text style={styles.balanceText}>{`  --   ${item.availableBalance}`}</Text>
                  {/* <Text style={styles.balanceText}>{`  --   ${item.inOrderBalance}`}</Text> */}
                  <Text style={styles.balanceText, { fontSize: dynamicSize(18), color: 'white' }}>{`  --   ${item.totalBalance}`}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: wp(3), justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={() => this.receieve(item, index)}
            // onPress={() => { this.setState({ addressmodal: true }) }}
            >
             <ImageBackground source={sendIcon} style={{ height: hp(8), width: wp(40), justifyContent: 'center' }} resizeMode='contain'>
                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Receive</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.send(item, index)}>
              <ImageBackground source={sendIcon} style={{ height: hp(8), width: wp(40), justifyContent: 'center' }} resizeMode='contain'>
                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Send</Text>
              </ImageBackground>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('Transaction',{ coinname: item.coinShortName }) }}>
              <ImageBackground source={transHistoryIcon} style={{ height: hp(7), width: wp(35), justifyContent: 'center' }} resizeMode='contain'>
                <Text style={{ color: TEALDARK, alignSelf: 'center' }}>Txn. History</Text>
              </ImageBackground>
            </TouchableOpacity> */}
          </View>
        </View>
      </ImageBackground>
    )
    //}
    // else{return(null)}
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <SafeAreaView style={{ flex: 1, }}  >
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
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            style={{
              flex: 1 / 1.3,
              backgroundColor: this.state.backgroundColor
            }}
          >
            {this.state.Swipee ?
              <View style={{ height: hp(35), width: wp(30), backgroundColor: 'White', flexDirection: 'row', }}>
                <Image source={SideLayer} style={{ height: hp('35%'), }} resizeMode='contain' />
                <View style={{ height: hp(24), width: wp(25), justifyContent: 'space-around', alignSelf: 'center', marginHorizontal: wp(4) }}>
            <Text style={{ color: "rgb(0,172,153)", fontWeight: 'bold', fontSize: getFontSize(14), }}>{this.state.name}</Text>
                  <View>
                    <Text style={{ fontWeight: '400', fontSize: getFontSize(16) }}>Account</Text>
                    <Text style={{ fontWeight: '600', fontSize: getFontSize(18) }}>Balance</Text>
                    <Text style={{ fontWeight: '600', fontSize: getFontSize(18) }}>{`$${this.state.accountBalance}`}</Text>
                  </View>
                </View>
              </View>
              :
              //  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
              <ImageBackground resizeMode='contain' source={WalletLayer}
                style={{
                  height: hp('33%'), width: wp('95%'),
                  padding: 10,
                  marginLeft: Platform.OS === 'ios' ? wp(0) : wp(-5),
                  alignItems: 'center', justifyContent: 'center'
                }}>
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('EditProfile') }}
                  style={{
                    width: wp(70), marginLeft: wp(10),
                    alignSelf: 'center', justifyContent: 'center',
                  }} >
                  <VictoryPie
                    colorScale={["gold", "orange", "navy", "tomato", "cyan", "tomato", "orange", "gold", "cyan", "navy"]}
                    data={this.state.graphicData}
                    width={250}
                    height={250}
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
                        onClick: () => {
                          alert("Parent")
                        }
                      }
                    }]}
                  />

                  <Image source={ProfileLogo} style={{
                    height: hp(12),
                    marginLeft: Platform.OS === "ios" ? wp(10.2) : wp(11.85),
                    // bottom:hp(9.7),
                    position: 'absolute',
                    // backgroundColor:'red',
                    alignItems: 'center',
                    // alignSelf:,
                    // justifyContent:'center',
                    // left:-12,
                    width: wp(40)
                  }}
                    resizeMode="contain" />
                </TouchableOpacity>
              </ImageBackground>
            }
          </GestureRecognizer>






          <ImageBackground source={buSellFlatlistBg} resizeMode="contain" style={{
            height: hp(40),
            alignSelf: 'center',
            justifyContent: 'center',
            marginBottom: hp(-2),
            marginLeft: wp(-0.4),
            width: wp(130)
          }}>

            {/* <Carousel
            ref={(c) => this.carousel = c}
            data={this.state.completeBalance}
            renderItem={({ item, index }) => this.cardList(item, index)}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={wp(94)}
            containerCustomStyle={{ alignSelf: 'center', marginVertical: hp(6) }}
            inactiveSlideShift={0}
            onSnapToItem={(index) => this.setState({ index })}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          /> */}

            <Carousel
              ref={(c) => this.carousel = c}
              data={this.state.carouselData}
              renderItem={({ item, index }) => this.cardList(item, index)}
              sliderWidth={wp(96)}
              itemWidth={wp(94)}
              containerCustomStyle={{ alignSelf: 'center', marginVertical: hp(6) }}

              activeAnimationType={'spring'}
              // activeAnimationOptions={{ friction:4,
              //                           tension:40}}
              onSnapToItem={(index) => this.setState({ index })}
              // onSnapToItem={(slideIndex) => this.selectcoin(slideIndex)}
              inactiveSlideOpacity={0.7}
              inactiveSlideScale={0.90}
            />
          </ImageBackground>
          <Transaction />
          <View style={{ marginBottom: hp(10) }} />
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.addressmodal}
        >
          <View style={{
            flex: 1,
            width: width,
            // backgroundColor:'red',
            backgroundColor: 'rgba(187, 186 ,186, 0.7)',
            justifyContent: "center",
            alignItems: "center",
          }}>
            <View style={styles.subContainer2}>
              <View
                style={{
                  flexDirection: "row",
                  height: dynamicSize(40),
                  backgroundColor: "white",
                  borderTopLeftRadius: dynamicSize(10)
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    height: dynamicSize(40),
                    width: width - dynamicSize(100),
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginLeft: dynamicSize(60),
                      color: "rgb(40,221,165)",
                      fontSize: getFontSize(18),
                      fontWeight: "700"
                    }}
                  >
                    Receive {this.state.coinDetailName}
                  </Text>
                </View>
                <View style={styles.closeButtons}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        addressmodal: !this.state.addressmodal
                      })
                    }>
                    <Image
                      style={{
                        width: dynamicSize(30),
                        height: dynamicSize(30),
                        resizeMode: "contain",
                        left: 28,
                        top: hp('-2')
                      }}

                      source={CrossIcon}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={styles.subContainerMid}>
                <View
                  style={styles.barcodeview}
                  renderToHardwareTextureAndroid={true}
                >

                  {/* <QRCode
                        //   value={this.state.walletaddress}
                          bgColor="black"
                          fgColor="white"
                        /> */}
                  <QRCode
                    size={Platform.OS=="ios" ? hp(20):hp(17) }
                    color={'rgb(82,204,167)'}
                    backgroundColor={"white"}
                    value={this.state.walletaddress !== "" ? this.state.walletaddress : "null"}
                  />
                </View>

                <View style={{
                  height: hp(5), width: wp(60),
                 
                  marginVertical: hp(2),
                  // borderWidth: 1,
                  // borderColor: TEALDARK,
                  flexDirection: 'row', justifyContent: 'space-around'
                }}>
                  <View style={{
                    alignSelf:'center',
                    flexDirection: 'row',
                    width: wp(50),
                    height: hp(8),
                    justifyContent: 'space-around',
                    top:hp(2),
                    marginHorizontal:wp(4)
                    // backgroundColor:'red'
                  }}>
                    <Text style={{ fontSize: dynamicSize(16),alignSelf:'center',fontWeight:'600'  }}>My wallet address</Text>
                    {/* <Text style={{ fontSize: dynamicSize(12), marginHorizontal: wp(2) }}> {this.state.walletaddress}</Text> */}
                   <TouchableOpacity onPress={() => this.CopyClipBoard(this.state.walletaddress)}>
                    <Image resizeMode='contain'
                    source={copyIcon} style={{ alignSelf: 'center',  height: hp(5),top:hp(2) }} />
                    </TouchableOpacity>
                  </View>
                  

                </View>

                <CustomButton
                  onPress={() => { this.setState({ addressmodal: false }) }}
                  mainContainer={{
                    height: dynamicSize(100),
                    width: wp('20%'), alignSelf: 'center',
                  }}
                  contain={{ height: dynamicSize(120), width: wp('50%'), alignSelf: 'center', }}
                  image={largeButton}
                  textStyle={{ fontSize: getFontSize(20), alignSelf: 'center' }}
                  title='Submit' />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.sendmodal}
        >
          <View style={styles.container1}>
            <View style={{
              width: width - dynamicSize(50),
              // height: height / 1.8,
              backgroundColor: 'rgba(187, 186 ,186, 0.9)',
              borderRadius: dynamicSize(10),
            }}>
              <View
                style={{
                  flexDirection: "row",
                  height: dynamicSize(40),
                  backgroundColor: "white",
                  borderTopLeftRadius: dynamicSize(10)
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    height: dynamicSize(40),
                    width: width - dynamicSize(100),
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginLeft: dynamicSize(50),
                      color: "rgb(40,221,165)",
                      fontSize: getFontSize(18),
                      fontWeight: "700"
                    }}
                  >
                    Send {this.state.coinDetailName}
                  </Text>
                </View>
                <View style={styles.closeButtons}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        sendmodal: !this.state.sendmodal,
                        address: "",
                        amount: "",
                        fee: 0,
                        final: 0
                      })
                    }
                  >
                    <Image
                      style={{
                        width: dynamicSize(30),
                        height: dynamicSize(30),
                        resizeMode: "contain",
                        left: 28,
                        top: hp('-2')
                      }}
                      source={CrossIcon}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.subContainerMid}>



                <TextInput
                  style={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: TEALDARK,
                    width: wp(75), height: hp(7),

                  }}
                  keyboardType="numeric"
                  value={this.state.amount}
                  placeholder="Coin Amount"
                  onChangeText={text => this.calculate(text)}
                />
                <Text
                  style={{
                    color: "red",
                    width: width - dynamicSize(100)
                  }}
                >
                  {this.state.amounterror}
                </Text>
                <TextInput
                  style={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: TEALDARK,
                    width: wp(75), height: hp(7),
                  }}
                  placeholder={this.state.cointype + " address"}

                  value={this.state.address}
                  onChangeText={text =>
                    this.setState({
                      address: text,
                      addresserror: ""
                    })
                  }
                />

                <Text
                  style={{
                    color: "red",
                    width: width - dynamicSize(100)
                  }}
                >
                  {this.state.addresserror}
                </Text>
                <View
                  style={{
                    alignItems: "flex-end",
                    width: width - dynamicSize(100)
                  }}
                >
                  <Text
                    style={{
                      fontSize: dynamicSize(14),
                      color: "gray"
                    }}
                  >
                    fee{" "}
                    <Text style={{ color: "gray", }}>
                      = {this.state.fee}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: dynamicSize(14),
                      color: "gray",
                      marginTop: dynamicSize(10)
                    }}
                  >
                    Final Amount{" "}
                    <Text style={{ color: "gray", }}>
                      = {this.state.final}{" "}
                      {this.state.cointype}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: dynamicSize(14),
                      color: "gray",
                      marginTop: dynamicSize(10)
                    }}
                  >
                    Min. Withdrawal Amount{" "}
                    <Text style={{ color: "gray", }}>
                      = 0.01
                                       </Text>
                  </Text>

                </View>

                <View style={{ alignSelf: 'center', alignItems: 'center', }} >
                  <CustomButton
                    onPress={() => this.apiwithdrawal()}
                    mainContainer={{ height: dynamicSize(150), width: wp('20%'), alignSelf: 'center', }}
                    contain={{ height: dynamicSize(120), width: wp('50%'), alignSelf: 'center', }}
                    image={largeButton}
                    textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                    title='Submit' />
                </View>
              </View>
            </View>
          </View>
        </Modal>




        {/**********************  Verify OTP MOdal **************************************/}



        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.Sms_auth}
        >
          <View style={styles.container1}>
            <View style={{
              width: width - dynamicSize(50),
              // height: height / 1.8,
              backgroundColor: 'rgba(187, 186 ,186, 0.9)',
              borderRadius: dynamicSize(10),
            }}>
              <View
                style={{
                  flexDirection: "row",
                  height: dynamicSize(40),
                  backgroundColor: "white",
                  borderTopLeftRadius: dynamicSize(10)
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    height: dynamicSize(40),
                    width: width - dynamicSize(100),
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginLeft: dynamicSize(50),
                      color: "rgb(40,221,165)",
                      fontSize: getFontSize(18),
                      fontWeight: "700"
                    }}
                  >

                    Enter OTP
                  </Text>
                </View>
                <View style={styles.closeButtons}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        Sms_auth: !this.state.Sms_auth,
                        address: "",
                        amount: "",
                        fee: 0,
                        final: 0,
                        tagsend: ""
                      })}
                  >
                    <Image
                      style={{
                        width: dynamicSize(30),
                        height: dynamicSize(30),
                        resizeMode: "contain",
                        left: 28,
                        top: hp('-2')
                      }}
                      source={CrossIcon}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.subContainerMid}>



                <TextInput
                  style={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: TEALDARK,
                    width: wp(75), height: hp(7),

                  }}
                  keyboardType="numeric"
                  value={this.state.otpcode2}
                  placeholder="Enter OTP"
                  onChangeText={text => { this.setState({ otpcode2: text }) }} />

                <Text
                  style={{
                    color: "red",
                    width: width - dynamicSize(100)
                  }}
                >
                  {this.state.smsOTPError}
                </Text>

                <View style={{ alignSelf: 'center', alignItems: 'center', }} >
                  <CustomButton
                    onPress={() => this.SMS_verify()}
                    mainContainer={{ height: dynamicSize(150), width: wp('20%'), alignSelf: 'center', }}
                    contain={{ height: dynamicSize(120), width: wp('50%'), alignSelf: 'center', }}
                    image={largeButton}
                    textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                    title='Submit' />
                </View>
              </View>
            </View>
          </View>
        </Modal>





        {/**********************  Verify Google Authentication Code **************************************/}



        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.otp}
        >
          <View style={styles.container1}>
            <View style={{
              width: width - dynamicSize(50),
              // height: height / 1.8,
              backgroundColor: 'rgba(187, 186 ,186, 0.9)',
              borderRadius: dynamicSize(10),
            }}>
              <View
                style={{
                  flexDirection: "row",
                  height: dynamicSize(40),
                  backgroundColor: "white",
                  borderTopLeftRadius: dynamicSize(10)
                }}>
                <View
                  style={{
                    alignItems: "center",
                    height: dynamicSize(40),
                    width: width - dynamicSize(100),
                    justifyContent: "center"
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginLeft: dynamicSize(50),
                      color: "rgb(40,221,165)",
                      fontSize: getFontSize(18),
                      fontWeight: "700"
                    }}>
                    Enter Google Authentication Code
                  </Text>
                </View>
                <View style={styles.closeButtons}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        otp: !this.state.otp,
                        address: "",
                        amount: "",
                        fee: 0,
                        final: 0,
                        tagsend: ""
                      })
                    }>
                    <Image
                      style={{
                        width: dynamicSize(30),
                        height: dynamicSize(30),
                        resizeMode: "contain",
                        left: 28,
                        top: hp('-2')
                      }}
                      source={CrossIcon}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.subContainerMid}>
                <TextInput
                  style={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: TEALDARK,
                    width: wp(75), height: hp(7),
                  }}
                  keyboardType="numeric"
                  value={this.state.otpcode1}
                  placeholder="Enter Google Authenctication Code"
                  onChangeText={text => { this.setState({ otpcode1: text }) }} />
                <Text style={{
                  color: "red",
                  width: width - dynamicSize(100)
                }}>
                  {this.state.smsOTPError2}
                </Text>
                <View style={{ alignSelf: 'center', alignItems: 'center', }} >
                  <CustomButton
                    onPress={() => this.verify_google_auth()}
                    mainContainer={{ height: dynamicSize(150), width: wp('20%'), alignSelf: 'center', }}
                    contain={{ height: dynamicSize(120), width: wp('50%'), alignSelf: 'center', }}
                    image={largeButton}
                    textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                    title='Submit' />
                </View>
              </View>
            </View>
          </View>
        </Modal>


        {/**********************  Verify Code Mail For Sent  ***************************/}



        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.sentMailConfirmModal}>

          <View style={styles.container1}>
            <View style={{
              width: width - dynamicSize(50),
              // height: height / 1.8,
              backgroundColor: 'rgba(187, 186 ,186, 0.9)',
              borderRadius: dynamicSize(10),
            }}>
              <View
                style={{
                  flexDirection: "row",
                  height: dynamicSize(40),
                  backgroundColor: "white",
                  borderTopLeftRadius: dynamicSize(10)
                }}>
                <View
                  style={{
                    alignItems: "center",
                    height: dynamicSize(40),
                    width: width - dynamicSize(100),
                    justifyContent: "center"
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginLeft: dynamicSize(50),
                      color: "rgb(40,221,165)",
                      fontSize: getFontSize(18),
                      fontWeight: "700"
                    }}>
                    {""}
                  </Text>
                </View>
                <View style={styles.closeButtons}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        
                        sentMailConfirmModal: false,
                        address: "",
                        amount: "",
                        fee: 0,
                        final: 0,
                        tagsend: ""
                      })
                    }>
                    <Image
                      style={{
                        width: dynamicSize(30),
                        height: dynamicSize(30),
                        resizeMode: "contain",
                        left: 28,
                        top: hp('-2')
                      }}
                      source={CrossIcon}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  // height: dynamicSize(40),
                  width: width - dynamicSize(50),
                  justifyContent: "center",
                  alignSelf: 'center',
                  backgroundColor: 'white'
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    // marginLeft: dynamicSize(50),
                    color: "rgb(40,221,165)",
                    fontSize: getFontSize(18),
                    fontWeight: "700"
                  }}>
                  {"To verify the transaction please enter the code that has been sent to your email."}
                </Text>
              </View>
              <View style={[styles.subContainerMid,{height: height / 2 - dynamicSize(100),}]}>
                <TextInput
                  style={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: TEALDARK,
                    width: wp(75), height: hp(7)
                  }}
                  keyboardType="numeric"
                  value={this.state.otpcode3}
                  placeholder="Enter code"
                  onChangeText={text => { this.setState({ otpcode3: text }) }} />
                <Text style={{
                  color: "red",
                  width: width - dynamicSize(100)
                }}>
                  {this.state.smsOTPError}
                </Text>
                <View style={{width: wp(75), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around' }} >


                  <TouchableOpacity 
                   onPress={() => this.verify_transaction()}
                  >
                  <View style={{ 
                                height: hp(6), 
                            width: wp(32), 
                            borderRadius:10,
                            backgroundColor:"rgb(43,215,172)",
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
                                <Text style={{  
                                    fontWeight:'bold',
                                    fontSize: getFontSize(17),color:'white',textAlign:'center' }}>Submit</Text>
                            </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.cancel_transaction() }
                  >
                  <View style={{ 
                                height: hp(6), 
                            width: wp(32), 
                            borderRadius:10,
                            backgroundColor:"rgb(43,215,172)",
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
                                <Text style={{  
                                    fontWeight:'bold',
                                    fontSize: getFontSize(17),color:'white',textAlign:'center' }}>Cancel</Text>
                            </View>
                  </TouchableOpacity>

                  {/* <CustomButton
                     onPress={() => this.verify_transaction()}
                    mainContainer={{ height: dynamicSize(80), width: wp('20%'), alignSelf: 'center', }}
                    contain={{ height: dynamicSize(120), width: wp('30%'), alignSelf: 'center', }}
                    image={largeButton}
                    textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                    title='Submit' /> */}
                </View>
              </View>
            </View>
          </View>
        </Modal>


      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: width,

    // backgroundColor: '#000000A1',
    justifyContent: "center",
    alignItems: "center",
  },
  // container1: {
  //   flex: 1,
  //   width: width,
  //   // backgroundColor: '#000000A1',
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  barcodeview: {
    width: width / 2,
    height: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    left: 12,

  },
  subContainerMid: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2 - dynamicSize(10),
    width: width - dynamicSize(50),
    backgroundColor: 'white'
  },
  balanceText:
  {
    color: 'white',
    fontSize: dynamicSize(15),
    marginTop: hp(0.8)
  },
  text: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: 'white',
    alignSelf:'center'
  },
}

)