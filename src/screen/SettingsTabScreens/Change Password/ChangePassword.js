import React, { Component } from 'react';
import { Dimensions,Modal, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, KeyboardAvoidingView, ImageBackground, Alert, Platform } from 'react-native';
// import GlobalInput from '../../../commonComponents/GlobalInput';
// import { Crossicon } from '../../../assets/icon'
// import GlobalBtn from "../../../commonComponents/GlobalButton";
import { CustomHeader } from '../../../components/header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
// import { EyeIcon, EyeCloseIcon } from '../../../assets/icon';
import LinearGradient from 'react-native-linear-gradient';
// import Changebox from '../../../assets/icons/changebox.png'
import { handleValidations } from "./function";
// import ApiRequest from "../../../services/webservice"
import Styles from "./Style"
const { width, height } = Dimensions.get("window")
import { drawer,back, largeButton, padlock, show, hide } from '../../../assets/icon';
import { CustomButton } from '../../../components/button';
import { Input_Password } from '../../../components/customTextInput';

import AsyncStorage from "@react-native-community/async-storage";
import Api from '../../../api/Api'
// import { connect } from 'react-redux'
 export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      oldpasswordStatus: false,
      oldpasswordError: '',
      activeoldpasswordBorderColor: false,

      newpassword: "",
      newpasswordStatus: false,
      newpasswordError: '',
      activenewpasswordBorderColor: false,

      confirmPassword: "",
      confirmPasswordStatus: false,
      confirmPasswordError: "",
      activeconfirmPasswordBorderColor: false,
      isLoading: false,

      eyepressed: false,
      eyepressed2: false,
      eyepressed3: false,
      modalVisible: false,
      token:''
    };
  }
  componentDidMount() {
    
    AsyncStorage.getItem('token').then(resp => {
      this.setState({
        token: resp
      })
    }
    )
  }


  ResetApi() {
  let changepasswordDetails = {
        oldPassword: this.state.oldpassword,
        newPassword: this.state.newpassword
    }
    // let token = this.state.token

    Api(this.state.token, "account/change-password", "POST", changepasswordDetails)
        .then(async resp => {
           
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
                    if(resp.data.status==200){
                        Alert.alert(
                            "",
                            resp.data.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                      //  this.props.navigation.goBack()
                                      this.props.navigation.navigate('Login')

                                    }
                                },
                            ],
                            { cancelable: false },
                        );

                    }
                   else{
                    Alert.alert(
                        "",
                        resp.data.message,
                        [
                            {
                                text: 'OK', onPress: () => {
                                    console.log('OK Pressed')
                                    // this.props.navigation.navigate("TwoFactorAuth")

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



handleSubmit() {
  console.log("passwords",this.state.oldpassword,this.state.newpassword,this.state.confirmPassword)
  if (this.state.oldpasswordStatus) {
    if (this.state.newpasswordStatus) {
      if (this.state.confirmPasswordStatus) {

        this.ResetApi()

      } else { this.setState({ confirmPasswordStatus: false, confirmPasswordError: "Please enter confirm password.", activeconfirmPasswordBorderError: true }) }
    }
    else { this.setState({ newpasswordStatus: false, newpasswordError: "Please  enter new password", activenewpasswordBorderColor: true }) }

  }
  else {
    this.setState({ oldpasswordStatus: false, oldpasswordError: "Please  enter old password", activeoldpasswordBorderColor: true })
  }


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



  
  OnEyePress = () => {
    this.setState({ eyepressed: !this.state.eyepressed })
  }

  OnEyePress2 = () => {
    this.setState({ eyepressed2: !this.state.eyepressed2 })
  }
  OnEyePress3 = () => {
    this.setState({ eyepressed3: !this.state.eyepressed3 })
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
     <CustomHeader text1={"Change Password"} source1={back}  onPress1={()=>this.props.navigation.goBack()} />
      
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
          <ScrollView style={{ marginVertical: hp(3) }}>

                    <View style={Styles.TextInput1} >
                        <TextInput maxLength={25}
                         
                          onChangeText={(text) => this.handlevalidate(text, "oldpassword")}
                          value={this.state.oldpassword}
                          secureTextEntry={!this.state.eyepressed}
                        style={{ fontSize: dynamicSize(14),width:Platform.OS=='ios' ? wp(40) : wp(0) }} placeholder={'Old Password'} />
                        <TouchableOpacity 
                         onPress={() => this.OnEyePress()}
                        style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                            <Image source={this.state.eyepressed ? show : hide} 
                            style={{height:hp(4),width:wp(4)}} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.errorText}>{this.state.oldpasswordError}</Text>
                    <View style={Styles.TextInput1} >
                        <TextInput maxLength={25}  
                       onChangeText={(text) => this.handlevalidate(text, "newpassword")}
                       secureTextEntry={!this.state.eyepressed2}
                       value={this.state.newpassword}
                        style={{ fontSize: dynamicSize(14),width:Platform.OS=='ios' ? wp(40) : wp(0) }} placeholder={'New Password'} />
                        <TouchableOpacity
                        onPress={() => this.OnEyePress2()}
                        style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                            <Image source={this.state.eyepressed2 ? show : hide}
                            style={{height:hp(4),width:wp(4)}} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.errorText}>{this.state.newpasswordError}</Text>
                    <View style={Styles.TextInput1} >
                        <TextInput maxLength={25}  
                        onChangeText={(text) => this.handlevalidate(text, "confirmPassword")}
                        value={this.state.confirmPassword} 
                        secureTextEntry={!this.state.eyepressed3}
                        style={{ fontSize: dynamicSize(14),width:Platform.OS=='ios' ? wp(40) : wp(0) }} placeholder={'Confirm New Password'} />
                        <TouchableOpacity
                        onPress={() => this.OnEyePress3()}
                        style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                            <Image  
                            source={this.state.eyepressed3 ? show : hide}
                            style={{height:hp(4),width:wp(4)}} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.errorText}>{this.state.confirmPasswordError}</Text>


            <CustomButton
              onPress={() => this.handleSubmit()}
              mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center',marginTop:hp(20) }}
              contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
              image={largeButton}
              textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
              title='Change Password' />
          </ScrollView>


          {/* //****************** Modal Start  ******************************/}
          <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
            <Modal
              transparent={true}
              visible={this.state.modalVisible}

            >
              <View style={{ alignItems: "center", flex: 1, justifyContent: 'center', backgroundColor: 'black', opacity: 0.9 }}>
                <ImageBackground resizeMode="contain" source={drawer} style={{
                  height: wp(50), width: wp(80),
                  backgroundColor: 'rgb(32,32,41)',
                }}>

                  <View style={Styles.crossView}>
                    <TouchableOpacity style={{ marginVertical: wp(-4), marginHorizontal: wp(-4) }} onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                      <Image source={drawer} resizeMode="contain" style={{ width: wp(11.4), height: hp(6.1), alignSelf: 'flex-end' }} />

                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      { width: wp('90%') },
                      { fontSize: 16 },

                    
                      // { color: Colors.light },
                      { marginHorizontal: wp(4) },
                      { marginVertical: wp(15) }]} >
                    You have successfully changed your </Text>
                  <Text
                    style={[
                      { width: wp('90%') },
                      { fontSize: 16 },
                     
                      // { color: Colors.light },
                      { marginHorizontal: wp(30) },
                      { marginVertical: wp(-15) }]}

                  >password.</Text>
                </ImageBackground>
              </View>
            </Modal>
          </View>

          {/* //****************** Modal End  ******************************/}

        </KeyboardAvoidingView>

      </SafeAreaView>

    )
  }
}

const mapStateToProps = state => {

  return {
    Token: state.AuthReducer.Token
  }
}
// export default connect(mapStateToProps,

// )(ChangePassword);


