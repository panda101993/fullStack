import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,View, SafeAreaView, Image ,Alert} from 'react-native'
import { dynamicSize } from '../../utils/dynamicSize'
import {Calendar,applogo,back,qrCode,largeButton} from '../../assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '../../components/button'
import { CustomHeader } from '../../components/header'
import { TextInput } from 'react-native-gesture-handler'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Api from '../../api/Api'
const { width, height } = Dimensions.get("window")

export default class FaQrcode extends Component {


    // componentDidMount(){
    // //   this.googleAuthApi()
    // console.log("email==>>",this.props.SigninDetails.email)
    // }
    // CreateAccount() {

    // }
    // forgot() {

    // }
      
    // googleAuthApi() {

    //   ApiRequest('', `account/google-auth-mobile-app?email=${this.props.SigninDetails.email}`, "GET",)
    //     .then(async resp => {
    //       console.log("googleauthresp===>>>", resp)
    //       switch (resp.status) {
    //         case (900): {
    //           this.setState({ isLoading: false })
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
    //           this.setState({ isLoading: false })
    //           await this.setState({ secretkey: resp.data.data.secretKey })
            
    //           break;
    //         }
    //         default: {
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
  



    // Verfifycode(){

    //     let codedetails ={
    //       "code":this.state.google,
    //       "secretKey":this.state.secretkey
    //     }
      
    //       ApiRequest(codedetails, `account/verify-google-code-mobile-app?email=${this.props.SigninDetails.email}`, "POST",`Bearer ${this.props.Token}`)
    //         .then(async resp => {
    //          console.log("verifyhresppp===>>>",resp)
    //           switch (resp.data.status) {
    //             case (900): {
    //               this.setState({ isLoading: false })
    //               setTimeout(() => {
    //                 Alert.alert(
    //                   '',
    //                   "Please check your internet connection",
    //                   [
    //                     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //                   ],
    //                   { cancelable: false },
    //                 );
    //               }, 200);
    //               break;
    //             }
    //             case (200): {
    //           //     this.setState({ isLoading: false })
    //             //this.setState({qrcodeimage:resp.data.data.qrCode})
    //           // 
             
    //               setTimeout(() => {
    //                 Alert.alert(
    //                   "",
    //                   resp.data.message,
    //                   [
    //                     {
    //                       text: 'OK', onPress: () => {
    //                         AsyncStorage.setItem("Token",JSON.stringify(this.props.Token))
    //                         this.props.navigation.navigate('logged')
      
    //                       }
    //                     },
    //                   ],
    //                   { cancelable: false },
    //                 );
      
    //               }, 500);
    //               break;
    //             }
      
    //             default: {
 
    //               setTimeout(() => {
    //                 Alert.alert(
    //                   '',
    //                   resp.data.message,
    //                   [
    //                     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //                   ],
    //                   { cancelable: false },
    //                 );
    //               }, 200);
      
    //             }
    //               break;
    //           }
      
    //         })
    //     }
    constructor(props) {
        super(props);
        this.state = {
          code: "",
          qrcodeimage: "",
          secretkey: "",
          codeStatus: false,
          codeError: "",
        };
      }
      componentDidMount() {
        // console.log("Signindetails===>>", this.props.SigninDetails)
        // console.log("Signindetails===>>", this.props.SigninDetails.email)
        console.log("UserInfo faQrcode===>", this.props.route.params)
        // this.googleAuthApi()
      }
      handlevalidate(text) {
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

      googleAuthApi() {
        Api('', `account/google-auth-mobile-app?email=${this.props.route.params.FormData.email}`, "GET")
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
                this.setState({ qrcodeimage: resp.data.data.qrCode })
                await this.setState({ secretkey: resp.data.data.secretKey })

                // setTimeout(() => {
                //   Alert.alert(
                //     "",
                //     resp.data.message,
                //     [
                //       {
                //         text: 'OK', onPress: () => {
                //           //this.props.navigation.navigate("ResetPassword",{email:this.state.Email})
                //         }
                //       },
                //     ],
                //     { cancelable: false },
                //   );
                // }, 500);
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

      Verfifycode() {

        let codedetails = {
          "code": this.state.code,
          "secretKey": this.state.secretkey
        }
        Api(codedetails, `account/verify-google-code-mobile-app?email=${this.props.route.params.FormData.email}`, "POST")
          .then(async resp => {
            console.log("verifyhresppp===>>>", resp)
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
                //     this.setState({ isLoading: false })
                //this.setState({qrcodeimage:resp.data.data.qrCode})
                // 
                let obj = {
                  ActiveTwoFA: true
                }
                AsyncStorage.setItem('switch', JSON.stringify(obj));
                setTimeout(() => {
                  Alert.alert(
                    "",
                    resp.data.message,
                    [
                      {
                        text: 'OK', onPress: () => {
                          // this.props.navigation.navigate("UserInfo")
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
                    "Please enter valid google authentication code",
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
    
      handlevalidate(text) {
        if (text == "") {
          this.setState({
            codeStatus: false,
            code: text,
            codeError: "Please enter code"
    
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


      Submit() {
        if (this.state.codeStatus) {
          this.Verfifycode()
          //this.props.navigation.navigate('UserInfo')
        }
        else { this.setState({ codeError: '*Please enter code.', codeStatus: false }) }
      }
    render() {
        return (
            <SafeAreaView style={{flex:1}} >
            <CustomHeader text1={"Choose Language"} source1={back} />
            <View style={styles.main} >
            <View style={styles.logoView} >
                        <Image source={applogo}
                            resizeMode='stretch'
                            style={styles.logoImage} />
                    </View>
                    <View style={styles.textView}  >
                        <Text style={{textAlign:'center',fontWeight:'200',fontSize:dynamicSize(22)}} >Scan QR Code</Text>
                    </View>
                    <View style={styles.logoView} >
                        <Image source={{uri : this.state.qrcodeimage}}
                            resizeMode='contain'
                            style={styles.qrImage} />
                    </View>
                    <View style={styles.TextInput} >
                <TextInput
                 value={this.state.code}
                 onChangeText={(text) => this.handlevalidate(text)}
                  style={{fontSize:dynamicSize(14)}} placeholder={'Enter code'} />
              </View>
              <Text style={styles.errorText}>{this.state.codeError}</Text>
              <View style={{alignSelf: 'center', alignItems: 'center', }} >
                            <CustomButton 
                             onPress={()=>this.Submit}
                            mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center',}}
                            contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                            image={largeButton} 
                            title='SIGN UP' />
                        </View>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        marginVertical:dynamicSize(15),
        // justifyContent:'center',
        alignSelf:'center',
        width:width-dynamicSize(30),
        // backgroundColor:'red'
    },
    logoImage: {
        width: dynamicSize(280),
        height: dynamicSize(130)
    },
    qrImage: {
        width: dynamicSize(280),
        height: dynamicSize(180)
    },
    logoView: {
        alignSelf: 'center',
        width: width - dynamicSize(30),
        alignItems: 'center',
        // height: dynamicSize(200),
    },
    TextInput:{
        width:width-dynamicSize(50),
        height:dynamicSize(60),
        alignSelf:'center',
        marginVertical:dynamicSize(15),
        // backgroundColor:'green',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor: 'rgb(0,224,176)',
        },
    textView:{
        width:width-dynamicSize(30),
        alignSelf:'center',
        marginVertical:dynamicSize(30)
    },
    errorText: {
      color: "red", height: dynamicSize(15),
      fontSize: dynamicSize(12),
      marginHorizontal:20
    }
})
