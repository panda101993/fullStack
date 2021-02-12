import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, View, TextInput, Alert, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
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
class SMSAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DefaultState,
      email: '',
      data: '',
      otpError: "",
      IPAddress: "",
      TwoFType: "",
      token: '',

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
      this.setState({IPAddress: resp})})
    AsyncStorage.getItem('2fatype').then(resp => {
      this.setState({TwoFType: resp})})
    AsyncStorage.getItem('token').then(resp => {
      this.setState({token: resp},()=>this.send_otp())
      })
  }

  send_otp = () => {

    
      
      Api(this.state.token, `account/send-sms-code`, "GET")
        // Api(this.state.token, `auth/send-sms-code`, "GET" ) 
        .then(async resp => {
          console.log("resp data==>", resp, "token", this.state.token)
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

  verify_OTP = () => {


    let variable = {
      "code": this.state.SMSCode,
      "ipAddress": this.state.IPAddress,
      "source": "MOBILE"
    }
   
      Api(this.state.token, `account/verify-sms-code`, "POST", variable)
        .then(resp => {
          console.log("resp==>", resp)
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
                AsyncStorage.setItem("token", resp.data.data)
                AsyncStorage.setItem("2fatype", "SMS")
                Alert.alert(
                  "",
                  resp.data.message,
                  [
                    {
                      text: 'OK', onPress: () => {

                        this.props.navigation.navigate('Security')
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

    if (this.state.SMSCodeStatus) {
      this.verify_OTP()
      // this.props.navigation.navigate('Tutorial')
    }
    else { this.setState({ SMSCodeError: '*Please enter SMS Code', SMSCodeStatus: false }) }

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}  >
        <CustomHeader text1={"Security"} source1={back} onPress1={() => this.props.navigation.goBack()} />
        <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
          <KeyboardAwareScrollView
            style={styles.main}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={20}
            scrollEnabled={true}>
            <Text style={{color:TEALDARK,
                    alignSelf:'center',
                    fontSize:dynamicSize(20)
                    ,marginVertical:hp(1)
                    }}>SMS Authentication</Text>
            <View style={{ width: wp(100) }}>
              <Text style={{ width: wp(90), textAlign: 'center',marginVertical:hp(2), fontSize: dynamicSize(15) }} >
                {"To activate sms auth, Please enter the code sent on your registered phone number"}
              </Text>
            </View>

            <View style={styles.TextInput} >
              <TextInput
                value={this.state.SMSCode}
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(text) => this.handlevalidate(text, "SMSCode")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Code'} />
            </View>
            <Text style={styles.errorText}>{this.state.SMSCodeError}</Text>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Didn't Receive</Text>
              <TouchableOpacity onPress={() => this.send_otp()}>
                <Text style={{ borderBottomWidth: 1.5, borderBottomColor: 'rgb(30,144,255)', color: 'rgb(30,144,255)', fontSize: dynamicSize(16) }}>Resend</Text>
              </TouchableOpacity>
            </View> */}

            <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: hp(20) }} >
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
)(SMSAuth);