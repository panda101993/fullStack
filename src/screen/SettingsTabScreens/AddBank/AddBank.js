import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, View,Alert, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '@components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '@components/button'
import { TEALDARK, LIGHTGREY } from '@utils/colors'
import { Calendar, ArrowDropDown, back, largeButton, imageAvtar } from '@assets/icon'
import styles from './styles'
import { handleValidations } from "./function";
const { width, height } = Dimensions.get("window")
import DefaultState from "./Constant"
import AsyncStorage from "@react-native-community/async-storage"
import Api from '../../../api/Api'
export default class AddBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
        }
    }
    async componentDidMount() {
      console.log("PARAMS",this.props.route.params.coin)
      this.setState({coinName:this.props.route.params.coin})
        AsyncStorage.getItem('token').then((resp) => {
          if (resp != null) {
          this.setState({ token: resp })
          }
    
    
    
        })
    
        // this.props.navigation.addListener('focus', () => {
        //   this.BankDetailsApi()
    
    
        // })
      }
      AddBankApi() {
    
    
        let BankDetails =
        {
          "accountHolderName": this.state.name,
          "accountNo": this.state.accountNumber,
          "ibanNo": this.state.IBANNumber,
          "contactNo": this.state.phoneNumber,
          "swiftNo": this.state.swiftNumber,
           "bankName":this.state.bankName,
           "amount":this.state.Amount,
           "tokenName": this.state.coinName

        }
    
        console.log("bodyyyyyyyyyyyyyyyyy", BankDetails)
        this.setState({ isLoading: true })
        Api(this.state.token, "wallet/usdEuro-request-from-admin", "POST", BankDetails)
          .then(async resp => {
            console.log("resp.data.token", resp)
            console.log("Token==>>", this.props.Token)
            switch (resp.status) {
              case (900): {
    
    
                Alert.alert(
                  '',
                  "Please check your internet connection",
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );
    
                break;
              }
              case (200): {
    
                if (resp.data.status == 200) {
                  AsyncStorage.setItem("RefreshBankdetails", JSON.stringify(true))
                  Alert.alert(
                    "",
                    resp.data.message,
                    [
                      {
                        text: 'OK', onPress: () => {
                          
                          this.props.navigation.goBack()
    
    
                        }
                      },
                    ],
                    { cancelable: false },
                  );
                }
                else {
                  Alert.alert(
                    '',
                    "Please check your internet connection",
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                  );
                }
    
    
    
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
        // let activeBorderColor = `active${type}BorderColor`;
        let resp = handleValidations(text, type)
    
        this.setState({
          [type]: resp.value,
          [errorText]: resp.errorText,
          [status]: resp.status,
          // [activeBorderColor]: !resp.status
        })
    
      }
    
    
    
      AddBank() {
    console.log("Inside function ==>")
        if (this.state.nameStatus) {
          if (this.state.bankNameStatus) {
          if (this.state.accountNumberStatus) {
            if (this.state.phoneNumberStatus) {
              if (this.state.swiftNumberStatus) {
                if (this.state.IBANNumberStatus) {
                  if (this.state.AmountStatus) {
                    // Amount
                  this.AddBankApi()
                  }
                  else { this.setState({ AmountError: 'Please enter amount', AmountStatus: false }) }
                }
                else { this.setState({ IBANNumberError: 'Please enter iban number', IBANNumberStatus: false }) }
              }
              else { this.setState({ swiftNumberError: 'Please enter swift number', swiftNumberStatus: false }) }
            }
            else { this.setState({ phoneNumberError: 'Please enter contact number', phoneNumberStatus: false }) }
          }
          else { this.setState({ accountNumberError: 'Please enter account number', accountNumberStatus: false }) }
        }
        else { this.setState({ bankNameError: 'Please enter bank name', bankNameStatus: false }) }
      }
      else { this.setState({ nameError: 'Please enter name', nameStatus: false }) }
    
      }
   
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}  >
                <CustomHeader text1={"Withdraw"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        scrollEnabled={true}>

                        <View style={[styles.TextInput, { marginTop: hp(7) }]}>
                            <TextInput
                                maxLength={25}
                                value={this.state.name}
                                onChangeText={(text) => this.handlevalidate(text, "name")}
                                ErrorText={this.state.nameError}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Account Holder Name'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.nameError}</Text>
                        <View style={[styles.TextInput]}>
                            <TextInput
                                maxLength={25}
                                value={this.state.bankName}
                                onChangeText={(text) => this.handlevalidate(text, "bankName")}
                                ErrorText={this.state.bankNameError}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Bank Name'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.bankNameError}</Text>
                        <View style={styles.TextInput}>
                            <TextInput maxLength={25} 
                             value={this.state.accountNumber}
                                onChangeText={(text) => this.handlevalidate(text, "accountNumber")}
                                keyboardType={'numeric'}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Account Number'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.accountNumberError}</Text>
                        <View style={styles.TextInput}>
                            <TextInput maxLength={25} 
                             value={this.state.phoneNumber}
                             keyboardType={'numeric'}
                                onChangeText={(text) => this.handlevalidate(text, "phoneNumber")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Contact Number'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneNumberError}</Text>
                        <View style={styles.TextInput}>
                            <TextInput maxLength={25} 
                             value={this.state.swiftNumber}
                                onChangeText={(text) => this.handlevalidate(text, "swiftNumber")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Swift Number'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.swiftNumberError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput maxLength={25} 
                             value={this.state.IBANNumber}
                                onChangeText={(text) => this.handlevalidate(text, "IBANNumber")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter IBAN Number'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.IBANNumberError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput maxLength={25} 
                            keyboardType={'number-pad'}
                             value={this.state.Amount}
                                onChangeText={(text) => this.handlevalidate(text, "Amount")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Amount'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.AmountError}</Text>
                        <View style={{ alignSelf: 'center', alignItems: 'center',}} >
                            <CustomButton
                                onPress={() => this.AddBank()}
                                mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                                contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                                image={largeButton}
                                textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                                title='Withdraw' />
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

