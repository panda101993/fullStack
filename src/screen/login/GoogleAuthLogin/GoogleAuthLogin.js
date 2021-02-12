import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, Alert, View, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '@components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '@components/button'
import { TEALDARK, LIGHTGREY } from '@utils/colors'
import { Calendar, ArrowDropDown, back, largeButton, imageAvtar, applogo } from '@assets/icon'
import styles from './styles'
import { handleValidations } from "./function";
const { width, height } = Dimensions.get("window")
import DefaultState from "./Constant"
import { Picker } from '@react-native-community/picker';
const countryStateCityArr = require('countrycitystatejson')
import AsyncStorage from '@react-native-community/async-storage';
import { connect, } from 'react-redux';
import Api from '../../../api/Api'
class GoogleAuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DefaultState,
      email: '',
      token: '',
      qrcodeimage: "",
      secretkey: "",
      IPAddress: "",
      TwoFType: "",
      data: '',
    }
  }
  componentDidMount() {


    this.userCredentials()

    // this.props.navigation.addListener('focus', () => {
    // this.setState({email:'',password:'',emailError:'',passwordError:'',emailStatus:false,passwordStatus:false,termAndConditionToggle:false})
    // })
  }
  async userCredentials() {
    AsyncStorage.getItem('IPAddress').then(resp => {

      this.setState({
        IPAddress: resp
      })

    }
    )
    AsyncStorage.getItem('token').then(resp => {
      console.log("token==>", resp)
      this.setState({
        token: resp
      })
      // this.send_otp()
    }
    )
    AsyncStorage.getItem('2fatype').then(resp => {
      //ALERT!!!!!!!! Test purpose remove below line    
      // resp = "NONE"
      this.setState({
        TwoFType: resp
      }, () => { resp == "NONE" ? this.send_otp() : null })
    }
    )
  }


  send_otp = () => {
    console.log("hjdshnfbdjbfgv==>")
    Api(this.state.token, `account/google-auth`, "GET")
      .then(async resp => {
        console.log("resp data==>", resp)
        switch (resp.status) {
          case (900): {
            this.setState({ isLoading: false })

            Alert.alert(
              '',
              "Please check your internet connection.",
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            );

            break;
          }
          case (200): {
            this.setState({
              isLoading: false, qrcodeimage: resp.data.data.qrCode,
              secretkey: resp.data.data.secretKey
            })
            if (resp.data.status == 200) {




            }
            else {
              Alert.alert(
                "",
                resp.data.message,
                [
                  {
                    text: 'OK', onPress: () => {
                      console.log('OK Pressed')


                    }
                  },
                ],
                { cancelable: false },
              );
            }



            break;
          }
          default: {
            this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                resp.data.message,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
            }, 200);

          }
            break;
        }

      })

  }

  verify_OTP = () => {
   

    let variable = {

      "code": this.state.googleCode,
      "secretKey": this.state.secretkey,
      "ipAddress": this.state.IPAddress,
      "source": "MOBILE"
    }
    Api(this.state.token, `account/verify-google-code`, "POST", variable)
      .then(resp => {
        console.log("data==>", resp, "variables", variable)
        switch (resp.status) {
          case (900): {
            this.setState({ isLoading: false })

            Alert.alert(
              '',
              "Please check your internet connection.",
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            );

            break;
          }
          case (200): {
            this.setState({ isLoading: false })
            if (resp.data.status == 200) {

              AsyncStorage.setItem("2fatype", "GOOGLE")
              Alert.alert(
                "",
                resp.data.message,
                [
                  {
                    text: 'OK', onPress: () => {

                      this.props.navigation.navigate('logged')


                    }
                  },
                ],
                { cancelable: false },
              );
              //  


            }
            else {
              Alert.alert(
                "",
                resp.data.message,
                [
                  {
                    text: 'OK', onPress: () => {
                      console.log('OK Pressed')


                    }
                  },
                ],
                { cancelable: false },
              );
            }



            break;
          }
          default: {
            this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                resp.data.message,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
            }, 200);

          }
            break;
        }

      })
  }

  verify_OTP_NEW = async () => {
  
    let variable = {
      "otp": this.state.googleCode,
    }
    Api(this.state.token, `auth/verify-google`, "POST", variable)
      .then(resp => {
        console.log("data==>", resp, "variables", variable)
        switch (resp.status) {
          case (900): {
            this.setState({ isLoading: false })

            Alert.alert(
              '',
              "Please check your internet connection.",
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            );
            break;
          }
            case (200): {
            this.setState({ isLoading: false })
            if (resp.data.status == 200) {
              AsyncStorage.setItem("2fatype", "GOOGLE")
            AsyncStorage.setItem("token", resp.data.data).then(()=>{
              setTimeout(() => {
                this.props.navigation.navigate('logged')
              }, 500);
             
            })
              //  
            }
            else {
              Alert.alert(
                "",
                resp.data.message,
                [
                  {
                    text: 'OK', onPress: () => {
                      console.log('OK Pressed')


                    }
                  },
                ],
                { cancelable: false },
              );
            }



            break;
          }
          default: {
            this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                resp.data.message,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
            }, 200);
          }
            break;
        }
      })
  }

  // otpVerify = () => {
  //   if (this.state.otpFieldOne != "" && this.state.otpFieldTwo != "" && this.state.otpFieldThree != "" && this.state.otpFieldFour != "" && this.state.otpFieldFive != "" && this.state.otpFieldSix != "") {
  //     { this.state.TwoFType == "NONE" ? this.verify_OTP() : this.verify_OTP_NEW() }

  //   }
  //   else {
  //     console.log("bdsfjbdjfb")
  //     this.setState({ otpError: "Please enter OTP." })
  //   }
  // }

  handlevalidate = (text, type) => {
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let activeBorderColor = `active${type}BorderColor`;
    let resp = handleValidations(text, type)

    this.setState({
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
      [activeBorderColor]: !resp.status
    })
  }

  submitHandler() {
    if (this.state.googleCodeStatus) {
      this.state.TwoFType == "NONE" ? this.verify_OTP() : this.verify_OTP_NEW()
    }
    else { this.setState({ googleCodeError: '*Please enter Google Authentication Code.', googleCodeStatus: false }) }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}  >
        <CustomHeader text1={"Google Authentication"} source1={back} onPress1={() => this.props.navigation.goBack()} />
        <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
          <KeyboardAwareScrollView
            style={styles.main}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={20}
            scrollEnabled={true}>




            {this.state.TwoFType == "NONE" ?
              <View>
                <Text style={{
                  color: TEALDARK,
                  alignSelf: 'center',
                  fontSize: dynamicSize(18)
                }}>Google Authentication</Text>

                <Text style={{ width: wp(80), alignSelf: 'center', textAlign: 'center', marginVertical: hp(1) }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
                <View style={styles.textView}  >
                  <Text style={{ textAlign: 'center', fontWeight: '100', fontSize: dynamicSize(22),marginVertical:hp(1) }} >Scan QR Code</Text>
                </View>
                <View style={styles.logoView} >
                  <Image source={{ uri: this.state.qrcodeimage }}
                    resizeMode='contain'
                    style={styles.qrImage} />
                </View>
                <Text style={{ alignSelf:"center" ,fontSize:dynamicSize(17),marginVertical:hp(2)}}>SecretKey :- {this.state.secretkey} </Text> 

              </View>

              :

              <View style={{ marginVertical: hp(2) }}>
                <Image resizeMode="contain" source={applogo}
                  style={{ alignSelf: 'center', height: hp(15), width: wp(60) }} />
              </View>

            }


            <View style={[styles.TextInput, { marginTop: hp(2) }]} >
              <TextInput
                value={this.state.googleCode}
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(text) => this.handlevalidate(text, "googleCode")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Google Authentication Code'} />
            </View>
            <Text style={styles.errorText}>{this.state.googleCodeError}</Text>



            <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: hp(2) }} >
              <CustomButton
                onPress={() => this.submitHandler()}
                mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                image={largeButton}
                textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                title={"Let's Start"} />
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>


      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {

  return {
    Token: state.AuthReducer.Token,
  }
}
export default connect(mapStateToProps,
)(GoogleAuthLogin);