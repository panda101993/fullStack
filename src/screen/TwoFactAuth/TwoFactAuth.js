import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, View, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '../../components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '../../components/button'
import { TEALDARK, LIGHTGREY } from '@utils/colors'
import { Calendar, ArrowDropDown, back, largeButton, imageAvtar,applogo } from '@assets/icon'
import styles from './styles'
import { handleValidations } from "./function";
const { width, height } = Dimensions.get("window")
import DefaultState from "./Constant"
import { Picker } from '@react-native-community/picker';
const countryStateCityArr = require('countrycitystatejson')
import AsyncStorage from '@react-native-community/async-storage';
import { connect, } from 'react-redux';
import Api from '../../api/Api'
 class TwoFactAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            email:'',
        }
    }
    // componentDidMount() {
    //     AsyncStorage.getItem('token').then(resp => {
    //         this.setState({
    //             token: resp
    //         })
          
    //     }
    //     )
    //     AsyncStorage.getItem('type').then(resp => {
    //         if (resp == 'GOOGLE') {
    //             setTimeout(() => {
    //                 this.setState({
    //                     changegoogle: false
    //                 })
    //             }, 100)
    //         }
    //         else if (resp == 'SMS') {
    //             setTimeout(() => {
    //                 this.setState({
    //                     changesms: false
    //                 })
    //             }, 100)

    //         }
           
           
    //     }
    //     )
    // }

    // enable_google = () => {

    //     if (this.state.changesms) {

    //         if (this.state.changegoogle) {
              
    //             this.setState({
    //                 isLoading: true
    //             })
    //             Api(this.state.token, "account/google-auth", "GET")
    //                 .then(rep => {
                       
    //                     if (rep.data.status == 200) {
                          
    //                         setTimeout(() => {
    //                             this.setState({
    //                                 secretkey: rep.data.data.secretKey,
    //                                 qrcode: rep.data.data.qrCode,
    //                                 SwitchView: true,
    //                                 isLoading: false,
    //                                 SwitchView1: false,
    //                                 otpcode: ''
                                  
    //                             })
    //                         })
                          
    //                     }
    //                     else if (rep.data.status == 400) {
    //                         this.setState({
    //                             isLoading: false,
    //                             SwitchView1: false,
    //                             otpcode: ''
    //                         })
    //                         setTimeout(() => {
    //                             alert(rep.data.message)
    //                         }, 100);
                           
    //                     }
    //                     else {
    //                         this.setState({
    //                             isLoading: false,
    //                             SwitchView1: false,
    //                             otpcode: ''
    //                         })
    //                         setTimeout(() => {
    //                             alert("Invalid Google Auth.")
    //                         }, 100);

    //                     }
    //                 })
    //         }
    //         else {
    //             this.setState({
    //                 otp: true,
    //                 SwitchView: false
    //             })
    //         }
    //     }
    //     else {
    //         alert("Please disable sms authentication first")
    //     }
    // }


    // enable_sms = () => {


    //     if (this.state.changegoogle) {
     

    //         if (this.state.changesms) {
    //             this.setState({
    //                 isLoading: true
    //             })
    //             Api(this.state.token, "account/send-sms-code", "GET")
    //                 .then(rep => {
    //                   console.log("data_smsAuth==>",rep)
                      
                       
    //                     if (rep.data.status == 200) {
                          
    //                         this.setState({
    //                             SwitchView1: true,
    //                             SwitchView: false,
    //                             isLoading: false,
    //                             otpcode2: ''
    //                         })

    //                     }
    //                     else if (rep.status == 400) {
    //                         this.setState({
                            
    //                             SwitchView: false,
    //                             isLoading: false,
    //                             otpcode2: ''
    //                         })
    //                         setTimeout(() => {
    //                             alert(rep.data.message)
    //                         }, 100);
                          
    //                     }
    //                     else {
    //                         this.setState({
                               
    //                             SwitchView: false,
    //                             isLoading: false,
    //                             otpcode2: ''
    //                         })
    //                         setTimeout(() => {
    //                             alert("Something went wrong.")
    //                         }, 100);
                         
    //                     }
    //                 })
    //         }
    //         else {
    //             this.setState({
    //                 isLoading: true
    //             })
    //             Api(this.state.token, "account/send-sms-code", "GET")
    //                 .then(rep => {
    //                  console.log("data_smsAuth",rep)
    //                     if (rep.data.status == 200) {
                        
                            
    //                         this.setState({
    //                             otp1: true,
    //                             SwitchView1: false,
    //                             isLoading: false
    //                         })
    //                     }
    //                     else if (rep.status == 400) {
    //                         this.setState({
    //                             isLoading: false
    //                         })
    //                         setTimeout(() => {
    //                             alert(rep.data.message)
    //                         }, 100);
                         
    //                     }
    //                     else {
    //                         this.setState({
    //                             isLoading: false
    //                         })
    //                         setTimeout(() => {

    //                             alert("Something went wrong.")
    //                         }, 100);
                          
    //                     }
    //                 })
    //         }

    //     }
    //     else {
    //         alert("Please disable google authentication first")
    //     }
      
    // }
    // verifysms = () => {
    //     this.setState({
    //         isLoading: true
    //     })
    //     if (this.state.otpcode2 != '' || this.state.otpcode2 > 0) {
    //        let variable = {
    //             "code": this.state.otpcode2
    //         }
    //         Api(this.state.token, "account/verify-sms-code", "POST", variable)
    //             .then(rep => {
                 
    //                 if (rep.data.status == 200) {
    //                     AsyncStorage.removeItem("Security")
                       
                     
    //                     this.setState({
    //                         SwitchView1: false,
    //                         changesms: !this.state.changesms,
    //                         isLoading: false
    //                     })
                       

    //                     let google= "SMS"

    //                     AsyncStorage.setItem("Security",google)
                      

    //                     setTimeout(() => {
    //                         Alert.alert(
    //                             '',
    //                             'SMS authentication successfully enable',
    //                             [
    //                                 { text: 'OK' },
    //                             ],

    //                         )
    //                     }, 200)


                    
    //                 }
    //                 else if (rep.status == 400) {
    //                     this.setState({
    //                         isLoading: false
    //                     })
    //                     setTimeout(() => {
    //                         alert(rep.data.message)
    //                     }, 100);
                    
    //                 }
    //                 else {
    //                     this.setState({
    //                         isLoading: false
    //                     })
    //                     setTimeout(() => {
    //                         alert(rep.data.message)
    //                     }, 101);
                     
    //                 }
    //             })
    //     }
    //     else {
    //         this.setState({
    //             isLoading: false,
    //             errorsms: 'Please enter valid OTP.'
    //         })
    //     }

        
    // }

    // verify = () => {
    //     this.setState({
    //         isLoading: true
    //     })
    //     if (this.state.otpcode != '' || this.state.otpcode.length > 0) {
    //        let variable = {
    //             "code": this.state.otpcode,
    //             "secretKey": this.state.secretkey
    //         }

    //         Api(this.state.token, "account/verify-google-code", "POST", variable)
    //             .then(rep => {
                  
    //                 if (rep.data.status == 200) {

    //                     AsyncStorage.removeItem("2fatype")
    //                     AsyncStorage.removeItem("Security")
                   
                        
    //                     this.setState({
    //                         SwitchView: !this.state.SwitchView,
    //                         changegoogle: !this.state.changegoogle,
    //                         isLoading: false
    //                     })
    //                     let google= "GOOGLE"

    //                     AsyncStorage.setItem("Security",google)
                      
    //                     setTimeout(() => {
    //                         Alert.alert(
    //                             '',
    //                             'Google 2FA successfully enable',
    //                             [
    //                                 { text: 'OK' },
    //                             ],

    //                         )
    //                     }, 200)

                     
    //                 }
    //                 else if (rep.status == 400) {
    //                     this.setState({
    //                         isLoading: false
    //                     })
    //                     setTimeout(() => {
    //                         alert(rep.data.message)
    //                     }, 100);
                       
    //                 }
    //                 else {
    //                     this.setState({
    //                         isLoading: false
    //                     })
    //                     setTimeout(() => {
    //                         alert("Invalid Google Auth.")
    //                     }, 100);

                      
    //                 }
    //             })
    //     }
    //     else {
    //         this.setState({
    //             isLoading: false,
    //             error: 'Please enter valid OTP.'
    //         })
    //     }
    // }

    // handleModal1 = () => {
     
    //     this.setState({
    //         isLoading: true
    //     })
    //    let variable = {
    //         "code": this.state.otpcode1
    //     }
    //     Api(this.state.token, "account/twoFa-disable", "POST", variable)
    //         .then(rep => {
               
    //             if (rep.data.status == 200) {
                   
    //                 AsyncStorage.removeItem("type")
    //                 AsyncStorage.removeItem("Security")
    //                 AsyncStorage.removeItem("Google_enable")
    //                 let type = "SKIP"
    //                 AsyncStorage.setItem("2fatype",type)
    //                 this.setState({
    //                     otp: false,
    //                     changegoogle: !this.state.changegoogle,
    //                     isLoading: false
    //                 })
                  
    //                 let google= "SKIP"

    //                 AsyncStorage.setItem("Security",google)
                

    //                 setTimeout(() => {
    //                     Alert.alert(
    //                         '',
    //                         'Google 2FA successfully disable',
    //                         [
    //                             { text: 'OK' },
    //                         ],

    //                     )
    //                 }, 500)


    //             }
    //             else if (rep.status == 400) {
    //                 this.setState({
    //                     otp: false,
                      
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert("Invalid Google Auth.")
    //                 }, 100);
                   
    //             }
    //             else {
    //                 this.setState({
    //                     otp: false,
                      
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {

    //                     alert(rep.data.message)
    //                 }, 100);
                 
    //             }
    //         })

    // }


    // handleModal2 = () => {
      
    //     this.setState({
    //         isLoading: true
    //     })
    //    let variable = {
    //         "code": this.state.otpcode3
    //     }
    //     Api(this.state.token, "account/sms-auth-disable", "POST", variable)
    //         .then(rep => {
              
               
              
    //             if (rep.data.status == 200) {
                   
    //                 AsyncStorage.removeItem("type")
    //                 AsyncStorage.removeItem("Security")
    //                 this.setState({
    //                     otp1: false,
    //                     changesms: !this.state.changesms,
    //                     isLoading: false

    //                 })
    //                 let google="SKIP"
    //                 AsyncStorage.setItem("Security",google)
                  
    //                 setTimeout(() => {
    //                     Alert.alert(
    //                         '',
    //                         'SMS authentication successfully disable',
    //                         [
    //                             { text: 'OK' },
    //                         ],

    //                     )
    //                 }, 500)
    //             }
    //             else if (rep.status == 400) {
    //                 this.setState({
    //                     otp1: false,
                      
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {

    //                     alert(rep.data.message)
    //                 }, 100);
                  
    //             }
    //             else {
    //                 this.setState({
    //                     otp1: false,
                      
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {

    //                     alert("Somrthing went wrong.")
    //                 }, 100);
                  
    //             }
    //         })
    // }

    // change = () => {
    //     this.setState({
    //         SwitchView: false,
    //         SwitchView1: false
    //     })
    // }


    // logout = () => {
    //     Alert.alert(
    //         'Logout',
    //         'Are you sure you want to logout ?',
    //         [
               
    //             {
    //                 text: 'Cancel',
    //                 onPress: () => console.log('Cancel Pressed'),
    //                 style: 'cancel',
    //             },
    //             { text: 'OK', onPress: () => this.logout() },
    //         ],
    //         { cancelable: false },
    //     )
    // }
    componentDidMount(){

        
        this.userCredentials()
     
         // this.props.navigation.addListener('focus', () => {
         // this.setState({email:'',password:'',emailError:'',passwordError:'',emailStatus:false,passwordStatus:false,termAndConditionToggle:false})
         // })
     }
  async userCredentials(){
      await AsyncStorage.getItem('userCredentials').then( resp =>{
         if(resp != null){
             let parsed = JSON.parse(resp);
             this.setState({ email: parsed.email },()=> this.googleAuthApi())
         }
         console.log("user email==>>",this.state.email,this.props.Token)
     })
  }

  googleAuthApi() {
    Api(this.props.Token,`account/google-auth`, "GET")
      .then(async resp => {
        console.log("googleauthresp===>>>", resp)
        switch (resp.status) {
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
            this.setState({ isLoading: false })
            await this.setState({ secretkey: resp.data.data.secretKey })
          
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
            if (this.state.SMSCodeStatus) {

                this.props.navigation.navigate('Tutorial')
            }
            else { this.setState({ SMSCodeError: '*Please enter SMS Code', SMSCodeStatus: false }) }
        }
        else { this.setState({ googleCodeError: '*Please enter Google Authentication Code.', googleCodeStatus: false }) }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}  >
                <CustomHeader text1={"Account Details"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        scrollEnabled={true}>
                        <View style={{ marginVertical: hp(2)}}>
                            <Image resizeMode="contain" source={applogo} 
                            style={{ alignSelf: 'center', height: hp(15), width: wp(60) }} />
                        </View>
                       <View style={{width:wp(100)}}>
                           <Text style={{width:wp(90),textAlign:'center',fontSize:dynamicSize(15)}} >
        {"We have sent code to <phone number>. Please check and enter the code below"}
                           </Text>
                       </View>
                        <View style={[styles.TextInput,{ marginTop: hp(2) }]} >
                            <TextInput
                                value={this.state.googleCode}
                                maxLength={10}
                                onChangeText={(text) => this.handlevalidate(text, "googleCode")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Google Authentication Code'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.googleCodeError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.SMSCode}
                                maxLength={10}
                                onChangeText={(text) => this.handlevalidate(text, "SMSCode")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'SMS Code'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.SMSCodeError}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Didn't Receive</Text>
                        <TouchableOpacity onPress={()=>{}}>
                        <Text style={{borderBottomWidth:1.5,borderBottomColor:'rgb(30,144,255)',color:'rgb(30,144,255)',fontSize:dynamicSize(16)}}>Resend</Text>
                        </TouchableOpacity>
                        </View>
                        
                        <View style={{ alignSelf: 'center', alignItems: 'center',marginTop:hp(20) }} >
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
  )(TwoFactAuth);