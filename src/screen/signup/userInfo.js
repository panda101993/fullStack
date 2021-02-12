import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, View, FlatList,
  TouchableWithoutFeedback,
  TextInput,Alert, SafeAreaView, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { CustomHeader } from '../../components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { Calendar, ArrowDropDown, back, largeButton,CrossIcon, toggelOn,toggleOff } from '../../assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '../../components/button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CountryModal } from "../../commonComponents/CountryModalFilter"
import { Country } from '../../commonComponents/countrycode'
import { TEALDARK, TEALLIGHT, LIGHTGREY } from '@utils/colors';
import Api from '../../api/Api'
import DateTimePicker from "react-native-modal-datetime-picker";
import { handleValidations } from "./function";
import DefaultState from "./Constant"
const { width, height } = Dimensions.get("window")
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DefaultState,
      countryList: [],
      country_list: false,
      isDatePickerVisible: false,
      formattedDate: "",
      SelectedFullDate: "",
      ActiveTwoFA: false,
      verifyOTPModal:false,
      otpcode1:"",
      smsOTPError1:"",
    }
  }

  componentDidMount() {
    console.log("UserInfo params===>", this.props.route.params)
    var date1 = new Date().getFullYear();
    var data = new Date();
    let finaldate = data.setFullYear(date1 - 10, 11, 31)
    // maxtime = new Date(finaldate)
    //  this.props.navigation.addListener('focus', () => {
    //  this.handletoogle()
    // })
  }

  handletoogle = async () => {
    try {
        let toogle = await AsyncStorage.getItem('switch');
        let parsed = JSON.parse(toogle);
        this.setState({ ActiveTwoFA: parsed.ActiveTwoFA })
    }

    catch (error) {
        // alert("not present");
    }

}

  On2FaClick = async () => {

    if (this.state.ActiveTwoFA == true) {
        this.Removetoggle()
    }
    else {
        this.Savetoggle()
    }
}

Savetoggle() {
  this.props.navigation.navigate("FaQrcode", { ...this.props.route.params })
}


Removetoggle = async () => {
  try {
      await AsyncStorage.removeItem('switch');
      await this.setState({ ActiveTwoFA: !this.state.ActiveTwoFA })
  } catch (error) {
      // Error removing
  }
};

    SignupApi() {

      let CompleteSignupdetails ={
          ...this.props.route.params.FormData,
          "firstName": this.state.name,
          "dob": this.state.SelectedFullDate,
          "country": this.state.country,
          "state": this.state.state,
          "city": this.state.city,
           }
      console.log("CompleteSignupdetails====>", CompleteSignupdetails)
      this.setState({ isLoading: true })
      Api("", 'account/signup', "POST", CompleteSignupdetails)
          .then(async resp => {
              console.log("signupapiresp====>>>>", resp)
              switch (resp.status) {
                  case (1000): {
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

                                        this.setState({verifyOTPModal:true})
                                        
                                      }
                                  },
                              ],
                              { cancelable: false },
                          );
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

verify_emailOTP() {

  Api("",`account/verify-user?token=${this.state.otpcode1}`, "GET")
  .then(async resp => {
      console.log("verify-user?token===>>>>", resp)
      switch (resp.status) {
          case (1000): {
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

                                this.setState({
                                  verifyOTPModal: false
                                });
                                this.props.navigation.navigate('Login')
                                
                              }
                          },
                      ],
                      { cancelable: false },
                  );
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

  SignUp = () => {
    if (this.state.nameStatus) {
        if (this.state.dobStatus) {
          if (this.state.addressStatus) {
            if (this.state.countryStatus) {
                if (this.state.stateStatus) {
                    if (this.state.cityStatus) {
                        if (this.state.zipCodeStatus) {
                          // alert("data!")
                          // this.props.navigation.navigate("TwoFactorAuth")
                           this.SignupApi()
                         
                          
                      }
                      else { this.setState({ zipCodeError: 'Please enter Zip Code.', zipCodeStatus: false, activezipCodeBorderColor: true }) }
                    }
                    else { this.setState({ cityError: 'Please enter city.', cityStatus: false, activecityBorderColor: true }) }
                }
                else { this.setState({ stateError: 'Please enter state.', stateStatus: false, activestateBorderColor: true }) }
            }
            else { this.setState({ countryError: 'Please select country.', countryStatus: false, activecountryBorderColor: true }) }
          }
          else { this.setState({ addressError: 'Please select address.', addressStatus: false, activeaddressBorderColor: true }) }
          }
        else { this.setState({ dobError: 'Please select dob.', dobStatus: false, activedobBorderError: true }) }
    }
    else { this.setState({ nameError: 'Please enter name.', nameStatus: false, activenameBorderColor: true }) }
}

  Set_value = (item) => {
    this.setState({ country_list: !this.state.country_list })
    this.setState({
      country: item.name,
      countryStatus: true,
      countryError: ''
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

  handleConfirm = (dateYear) => {

    this.setState({ isDatePickerVisible: false, SelectedFullDate: dateYear })
    var date = dateYear.getDate();
    var month = dateYear.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = dateYear.getFullYear();

    var dateStr = date + "/" + month + "/" + year;
    this.setState({ dob: dateStr ,dobStatus :true,dobError:'' })
    console.warn("A date has been picked: ", dateStr);
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <CustomHeader text1={"User Information"}
        onPress1={()=>this.props.navigation.goBack()}
        source1={back} />
        <View style={styles.Mobiloittemain} >
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={20}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}>
            <View style={styles.TextInput} >
              <TextInput
                value={this.state.name}
                onChangeText={(text) => this.handlevalidate(text, "name")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your name'} />
            </View>
            <Text style={styles.errorText}>{this.state.nameError}</Text>
            <TouchableOpacity
             onPress={() => this.setState({ isDatePickerVisible: true })}
            style={styles.TextInput1} >
              <TextInput
                value={this.state.dob}
                editable={false}
                onChangeText={(text) => this.handlevalidate(text, "dob")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your DOB'} />
              <View
               
                style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                <ImageBackground style={{ height: hp(3), width: wp(10) }} source={Calendar} resizeMode='contain' >
                  <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                  />
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={styles.errorText}>{this.state.dobError}</Text>
            <View style={styles.TextInput} >
              <TextInput
                value={this.state.address}
                onChangeText={(text) => this.handlevalidate(text, "address")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your address'} />
            </View>
            <Text style={styles.errorText}>{this.state.addressError}</Text>
            <TouchableOpacity 
              onPress={() => this.setState({ country_list: !this.state.country_list })}
            style={styles.TextInput1} >
              <TextInput
                editable={false}
                value={this.state.country}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Select country'} />
              <View
              
                style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                <Image source={ArrowDropDown} resizeMode='contain' />
              </View>
            </TouchableOpacity>
            <Text style={styles.errorText}>{this.state.countryError}</Text>
            <View style={styles.TextInput} >
              <TextInput
                value={this.state.state}
                onChangeText={(text) => this.handlevalidate(text, "state")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your state'} />
            </View>
            <Text style={styles.errorText}>{this.state.stateError}</Text>
            <View style={styles.TextInput} >
              <TextInput
                value={this.state.city}
                onChangeText={(text) => this.handlevalidate(text, "city")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your city'} />
            </View>
            <Text style={styles.errorText}>{this.state.cityError}</Text>
            <View style={styles.TextInput} >
              <TextInput
                value={this.state.zipCode}
                onChangeText={(text) => this.handlevalidate(text, "zipCode")}
                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your zip postal code'} />
            </View>
            <Text style={styles.errorText}>{this.state.zipCodeError}</Text>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dynamicSize(100), height: dynamicSize(60) }} >
              <View style={{ justifyContent: 'center' }} >
                <Text style={{ fontSize: dynamicSize(20), fontWeight: 'bold' }} >2FA</Text>
              </View>
              <TouchableOpacity 
              onPress={this.On2FaClick}
              style={{ justifyContent: 'center' ,marginHorizontal:wp(2)}} >
                <Image source={this.state.ActiveTwoFA?toggelOn:toggleOff} />
              </TouchableOpacity>
            </View> */}

            <View style={{ alignSelf: 'center', alignItems: 'center', }} >
              <CustomButton
                onPress={this.SignUp }
                mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                image={largeButton}
                title='SIGN UP' />
            </View>

          </KeyboardAwareScrollView>
        </View>
        <CountryModal
          data={Country}
          visible={this.state.country_list}
          onPress={(x) => this.Set_value(x)}
          cancelPress={() => this.setState({ country_list: !this.state.country_list })}
          cancelModal={() => this.setState({ yearView: false })}
        />










 {/**********************  Verify OTP Email Code **************************************/}



 <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.verifyOTPModal}
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
                    height: dynamicSize(45),
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
                     OTP has been sent to your registered email.
                  </Text>
                </View>
                <View style={styles.closeButtons}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        verifyOTPModal: false,
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
                  placeholder="Enter OTP"
                  onChangeText={text => { this.setState({ otpcode1: text }) }} />
                <Text style={{
                  color: "red",
                  width: width - dynamicSize(100)
                }}>
                  {this.state.smsOTPError1}
                </Text>
                <View style={{ alignSelf: 'center', alignItems: 'center', }} >
                  <CustomButton
                    onPress={() => this.verify_emailOTP()}
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











      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  Mobiloittemain: {
    flex: 1,
    marginVertical: dynamicSize(15),
    // justifyContent:'center',
    alignSelf: 'center',
    width: width - dynamicSize(30),
    // backgroundColor:'red'
  },
  TextInput: {
    width: width - dynamicSize(30),
    height: dynamicSize(60),
    // backgroundColor:'green',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(0,224,176)',
  },
  TextInput1: {
    width: width - dynamicSize(30),
    height: dynamicSize(60),
    // backgroundColor:'green',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: 'rgb(0,224,176)',
  },
  errorText: {
    color: "red", height: dynamicSize(15),
    fontSize: dynamicSize(12),
  },
  container1: {
    flex: 1,
    width: width,

    // backgroundColor: '#000000A1',
    justifyContent: "center",
    alignItems: "center",
  }, subContainerMid: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2 - dynamicSize(10),
    width: width - dynamicSize(50),
    backgroundColor: 'white'
  },

})
