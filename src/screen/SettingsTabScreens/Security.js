
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StatusBar, SafeAreaView, TouchableOpacity, ScrollView,Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
// import { toggelOn,InActiveToggle,dashboardbg} from '../../../assets/icon';
// import { fontStyle, Colors } from '../../../commomStyle/commonStyle'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  AsyncStorage  from "@react-native-community/async-storage";
 import DisableModal from "../../commonComponents/DisableModal"
import { CustomHeader } from '../../components/header'
// import {connect}  from "react-redux"
// import ApiRequest from "../../../services/webservice"
import Api from '../../api/Api'
// import { sub } from 'react-native-reanimated';
import { toggelOn,back,toggleOff} from '../../assets/icon';
export default class Security extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalvisible:false,
          Smsmodalvisible:false,
            GoogleAuthToggle:false,
            SMSAuthToggle:false,
            code: "",
            codeStatus: false,
            codeError: "",
            activecodeBorderColor: false,
            token: '',
      TwoFType: "",
      IPAddress:"",
        };
    }

   componentDidMount(){
       this.props.navigation.addListener('focus',() => {
        this.TwoFTypeStatus()
       })
      this.getUserDetails()
   }


    getUserDetails = async () => {
        try {
          AsyncStorage.getItem('2fatype').then(resp => {
            this.setState({
                TwoFType: resp
              //  TwoFType: "GOOGLE"
            })
            console.log("Securuty PAge 2fa type==>",resp)
      
          }
          )
          AsyncStorage.getItem('IPAddress').then(resp => {
            // alert(resp)
            this.setState({
              IPAddress: resp
            })
      
          }
          )
      
          AsyncStorage.getItem('token').then(resp => {
            // alert(resp)
            this.setState({
            
              token: resp
            })
            
          }
          )
          }
        
        catch (error) {
          // alert("not present");
        }
      
      }


      onGoogleAuthToggle = () => {
   console.log("onGoogleAuthToggle")
        if (this.state.TwoFType == "SKIP") {
         
          this.props.navigation.navigate('GoogleAuth')
        }
        if (this.state.TwoFType == "NONE") {
         
          this.props.navigation.navigate('GoogleAuth')
        }
        else if (this.state.TwoFType == "GOOGLE") {
          this.Removegoogletoggle();
        }
        else if (this.state.TwoFType == "SMS") {
          Alert.alert(
            '',
            "Please remove SMS Auth first",
            [
                { text: 'OK', onPress: () =>  this.RemoveSmstoggle() },
            ],
            { cancelable: false },
        );
          // this.DisableSMS()
          // this.props.navigation.navigate('SecurityGoogle', { data: '1' })
        }
    
      }


      onSMSAuthToggle = () => {

   
        if (this.state.TwoFType == "SKIP") {
          this.props.navigation.navigate('SMSAuth')
        }
        if (this.state.TwoFType == "NONE") {
          this.props.navigation.navigate('SMSAuth')
        }
        else if (this.state.TwoFType == "GOOGLE") {
          Alert.alert(
            '',
            "Please remove Google Auth first",
            [
                { text: 'OK', onPress: () => this.Removegoogletoggle() },
            ],
            { cancelable: false },
        );
    
        }
        else if (this.state.TwoFType == "SMS") {
          this.RemoveSmstoggle()
        }
      }
      
  Removegoogletoggle = () => {
    this.setState({  modalvisible: true })
    // this.send_otp()
    }

    RemoveSmstoggle = () => {
      this.Mobile_otp()
    }; 
  
    Mobile_otp = () => {
      console.log("hjdshnfbdjbfgv==>")
      Api(this.state.token, `auth/send-sms-code`, "GET" )
          .then(async resp => {
         console.log("resp data==>",resp )
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
                        this.setState({  Smsmodalvisible: true })
  
  
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
  
    handlecodevalidate(text) {
      if (text == "") {
        this.setState({
          codeStatus: false,
          code: text,
          codeError: "*Please enter code"
  
        })
  
      }
      else {
  
        this.setState({
          codeStatus: true,
          code: text,
          codeError: ""
        })
      }
  
    }
    Submit = () => {
      if (this.state.codeStatus) {
        this.Disable2FA()
        //this.props.navigation.navigate('Security')
  
      }
      else { this.setState({ codeError: '*Please enter code.', codeStatus: false, activecodeBorderColor: true }) }
  
  
    }
  
    SmsSubmit = () => {
      if (this.state.codeStatus) {
        this.DisableSMS()
        //this.props.navigation.navigate('Security')
  
      }
      else { this.setState({ codeError: 'Please enter code.', codeStatus: false, activecodeBorderColor: true }) }
  
  
    }
  
    Disable2FA = () => {
  
      let codedetails = {
        "code": this.state.code,
        "ipAddress":this.state.IPAddress,
        "source": "MOBILE"
  
      }
    Api(this.state.token,"account/twoFa-disable", "POST" ,codedetails)
        .then(async resp => {
          console.log("disableresppp===>>>", resp ,"details" ,codedetails)
          switch (resp.data.status) {
            case (900): {
              this.setState({ isLoading: false })
              setTimeout(() => {
                Alert.alert(
                  '',
                  "Please check your internet connection",
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );
              }, 200);
              break;
            }
            case (200): {
              
              setTimeout(() => {
                Alert.alert(
                  "",
                  resp.data.message,
                  [
                    {
                      text: 'OK', onPress: () => {
                        this.setState({  modalvisible: false })
                        AsyncStorage.setItem("2fatype", "NONE")
                        this.props.navigation.navigate("Security")
                        this.TwoFTypeStatus()
  
  
                      }
                    },
                  ],
                  { cancelable: false },
                );
  
              }, 500);
              break;
            }
  
  
            default: {
  
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
     
    TwoFTypeStatus = () => {
      AsyncStorage.getItem('2fatype').then(resp => {
  
        this.setState({
            TwoFType: resp
          //  TwoFType: "GOOGLE"
        })
  
      }
      )
    }
  
    DisableSMS() {
  
      let codedetails = {
        "code": this.state.code,
        "ipAddress":this.state.IPAddress,
        "source": "MOBILE"
      }
  
      Api(this.state.token, "account/sms-auth-disable", "POST",codedetails )
        .then(async resp => {
          console.log("disableresppp===>>>", resp ,"code",codedetails)
          switch (resp.data.status) {
            case (900): {
              this.setState({ isLoading: false })
              setTimeout(() => {
                Alert.alert(
                  '',
                  "Please check your internet connection",
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );
              }, 200);
              break;
            }
            case (200): {
              
              setTimeout(() => {
                Alert.alert(
                  "",
                  resp.data.message,
                  [
                    {
                      text: 'OK', onPress: () => {
                        this.setState({ Smsmodalvisible: false })
                        AsyncStorage.setItem("2fatype", "NONE")
                        this.props.navigation.navigate("Security")
                       this.TwoFTypeStatus()
  
                      }
                    },
                  ],
                  { cancelable: false },
                );
  
              }, 500);
              break;
            }
  
  
            default: {
  
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
  
  
    render() {
        return (

            <SafeAreaView style={{ flex: 1,  }}>
               <CustomHeader text1={"Security"} source1={back}  onPress1={()=>this.props.navigation.goBack()} />
             
                <View style={{ flex: 1, }}>
                    <ImageBackground  style={{ flex: 1, }} >
                   <View style={{flexDirection:'row',marginVertical:20}}>
                       <View style={{flexDirection:'column'}}>
                       <View style={{ flexDirection:'row',marginVertical:hp(2),justifyContent:'space-between'}}>
                                 <View style={{flexDirection:'column'}}>
                                   <Text style={[styles.TextStyle, ]}>   Google Auth   </Text>
                                   <Text style={[styles.TextStyle, {fontSize: 12,marginHorizontal:wp('2%')}]}>   Used for withdraw and security modifications   </Text>
                                   </View>
                                   </View>
                                   <View style={{ flexDirection:'row',marginVertical:hp(2),justifyContent:'space-between'}}>
                                 <View style={{flexDirection:'column'}}>
                                   <Text style={[styles.TextStyle, ]}>   SMS Auth  </Text>
                                   <Text style={[styles.TextStyle, {fontSize: 12,marginHorizontal:wp('2%')}]}>  Used for withdraw and security modifications </Text>
                                   </View>  
                                   </View>
                                   </View>
                                   <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                   <View >
                                   <TouchableOpacity onPress={()=>this.onGoogleAuthToggle()}>
                                    <Image source={this.state.TwoFType == "GOOGLE" ? toggelOn  : toggleOff} resizeMode='contain' style={{height:wp('20%'),width :wp('20%'),}}/>
                                    </TouchableOpacity>
                                    </View>
                                    <View>
                                   <TouchableOpacity onPress={()=>{this.onSMSAuthToggle()}}>
                                    <Image source={this.state.TwoFType == "SMS" ? toggelOn  : toggleOff} resizeMode='contain' style={{height:wp('20%'),width :wp('20%'),}}/>
                                    </TouchableOpacity>
                                    </View>
                                    </View>
                                </View>
                                <DisableModal
                                 modalVisible={this.state.modalvisible}
                                 value={this.state.code}
                                 codeError={this.state.codeError}
                                   modalpress={() => this.setState({modalvisible:!this.state.modalvisible})}
                                   submit={()=> this.Submit() } // for  disbale 
                                   onChangeText={(text) => this.handlecodevalidate(text)}
                                 />
                                   
                                   <DisableModal
                                 modalVisible={this.state.Smsmodalvisible}
                                 value={this.state.code}
                                 codeError={this.state.codeError}
                                   modalpress={() => this.setState({Smsmodalvisible:!this.state.Smsmodalvisiblemodalvisible})}
                                   submit={()=> this.SmsSubmitSubmit() } // for  disbale 
                                   onChangeText={(text) => this.handlecodevalidate(text)}
                                 />

                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
}



// const mapStateToProps = state => {

//   return {
//     Token: state.AuthReducer.Token,
//     SigninDetails:state.AuthReducer.Userdetails
//   }
// }
// export default connect(mapStateToProps,

// )(Security);


const styles = StyleSheet.create({

    TextStyle: {
        // color: '#ffff',
        fontSize: 18,
        marginVertical: hp('0.4%')
    },
})
