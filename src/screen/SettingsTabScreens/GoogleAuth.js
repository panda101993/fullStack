import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,View, SafeAreaView, Image ,Alert,Clipboard,ScrollView} from 'react-native'
import { dynamicSize } from '@utils/dynamicSize'
import {Calendar,applogo,back,qrCode,largeButton} from '@assets/icon'
import {TEALDARK} from '@utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '@components/button'
import { CustomHeader } from '@components/header'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Api from '../../api/Api'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
import { copyIcon } from '../../assets/icon';
const { width, height } = Dimensions.get("window")

 class GoogleAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
          code: "",
          qrcodeimage: "",
          secretkey: "",
          codeStatus: false,
          codeError: "",
          TwoFType:'',
          IPAddress: "",
          token: '',
        };
      }
      componentDidMount() {
        // console.log("Signindetails===>>", this.props.SigninDetails)
        // console.log("Signindetails===>>", this.props.SigninDetails.email)
        
        this.userCredentials()
      }
      CopyClipBoard(item){
        Clipboard.setString(item)
       alert("Copied to clipboard")
        
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
          }, () =>  this.send_otp()  )
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
  
        "code": this.state.code,
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


      Submit() {
        if (this.state.codeStatus) {
          this.verify_OTP()
          //this.props.navigation.navigate('UserInfo')
        }
        else { this.setState({ codeError: '*Please enter code.', codeStatus: false }) }
      }
    render() {
        return (
            <SafeAreaView style={{flex:1}} >
            <CustomHeader text1={"Security"} source1={back} />
            <ScrollView  showsVerticalScrollIndicator={false}
            style={styles.main} >
                    <Text style={{color:TEALDARK,
                    alignSelf:'center',
                    fontSize:dynamicSize(18)
                    }}>Google Authentication</Text>

                    <Text style={{width:wp(80),alignSelf:'center',textAlign:'center',marginVertical:hp(1)}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  
                    </Text>
                    <View style={styles.textView}  >
                        <Text style={{textAlign:'center',fontWeight:'100',fontSize:dynamicSize(22)}} >Scan QR Code</Text>
                    </View>
                    <View style={styles.logoView} >
                        <Image source={{uri : this.state.qrcodeimage}}
                            resizeMode='contain'
                            style={styles.qrImage} />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{width:wp(80),alignSelf:'center',textAlign:'center',marginVertical:hp(1)}}>
                    {`Google auth key:  ${this.state.secretkey}`}
                    </Text>
                    <TouchableOpacity onPress={() => this.CopyClipBoard(this.state.secretkey)} >
                    <Image resizeMode='contain' style={{ height: hp(6),width:wp(8), }} source={copyIcon}/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.TextInput} >
                <TextInput
                 value={this.state.code}
                 maxLength={6}
                 keyboardType={'numeric'}
                 onChangeText={(text) => this.handlevalidate(text)}
                  style={{fontSize:dynamicSize(14)}} placeholder={'Enter code'} />
              </View>
              <Text style={styles.errorText}>{this.state.codeError}</Text>

              <View style={{alignSelf: 'center', alignItems: 'center', }} >
                            <CustomButton 
                             onPress={()=>this.Submit()}
                            mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center',}}
                            contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                            image={largeButton} 
                            title='Submit' />
                        </View>
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
export default connect(mapStateToProps,null)(GoogleAuth);
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
        width:width-dynamicSize(150),
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
      marginHorizontal:20,
      alignSelf:'center'
    }
})
