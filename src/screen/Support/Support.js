import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { CustomHeader } from '../../components/header';
import { back, largeButton } from '../../assets/icon';
import { CustomButton } from '../../components/button';
import { dynamicSize, getFontSize } from '../../utils/dynamicSize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window")
import AsyncStorage from "@react-native-community/async-storage";
import Api from '../../api/Api'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { handleValidations } from "../signup/function";

export default class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      description: '',
      nameStatus:true,
      LastStatus:true,
      DescStatus:true
      
    };
  }

  handlevalidate(text) {
    
    this.setState({ firstName: text })
  }
  handlevalidatelast(text) {
    this.setState({ lastName: text })
  } 
  handlevalidatedesc(text) {
     this.setState({ description: text })
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

  Submit = () => {
    console.log("okk")
    let dataToSend = {
      "description": this.state.description,

      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    }

    Api(this.state.token, "static/submit-support-ticket", "POST", dataToSend)

      .then(rep => {

        if (rep.status == 200) {
          this.setState({
            modalVisible: false
          }, () => this.props.navigation.navigate('HomeStack'))


        }
        else if (rep.status == 400) {
          setTimeout(() => {
            alert(rep.data.message)
          }, 100);

        }
        else {
          setTimeout(() => {
            alert(rep.data.message)
          }, 101);

        }
      })
  }
  OnSubmit= () => {
    if (this.state.nameStatus) {
      if (this.state.LastStatus) {
        if (this.state.DescStatus) {
          this.Submit()
        }
        
          else { this.setState({ DescError: 'Please add description.', DescStatus: false,  }) }
          }
        else { this.setState({ LastError: 'Please enter last name.', LastStatus: false,  }) }
    }
    else { this.setState({ nameError: 'Please enter name.', nameStatus: false,  }) }

  }

  render() {

    return (
      <View style={styles.container}>

        <CustomHeader text1={"Support"} source1={back} onPress1={() => this.props.navigation.goBack()} />
        <KeyboardAwareScrollView  >
          <View style={{ marginVertical: hp(2) }}>

            <View style={Styles.TextInput1} >
              <TextInput maxLength={25}
                // style={{ marginHorizontal: 8 }}
                // onChange={this.firstName}
                onChangeText={(text) => this.handlevalidate(text, "name")}

                style={{ fontSize: dynamicSize(14), width: wp(80), height: hp(6) }} placeholder={'Enter First Name '} />
          
            </View>
            <Text style={[styles.errorText,{left:wp(4)}]}>{this.state.nameError}</Text>
            <View style={[Styles.TextInput1]} >
              <TextInput maxLength={25}
                //  onChange={this.lastName}
                onChangeText={(text) => this.handlevalidatelast(text, "name")}
                style={{ fontSize: dynamicSize(14),width: wp(80), height: hp(6) }} placeholder={'Last Name'} />
            </View>
            <Text style={[styles.errorText,{left:wp(4)}]}>{this.state.LastError}</Text>
            <View style={Styles.TextInputDes} >
              <TextInput
                multiline={true}

                onChangeText={(text) => this.handlevalidatedesc(text, "description")}
                style={{ fontSize: dynamicSize(14) ,width: wp(80),bottom:Platform.OS=='ios'?0:50}} placeholder={'Description'} />
            
            </View>
            <Text style={[styles.errorText,{left:wp(4)}]}>{this.state.DescError}</Text>
            <CustomButton
              onPress={() => { this.OnSubmit() }}
              mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', marginTop: hp(20) }}
              contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
              image={largeButton}
              textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
              title='Submit' />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  TextInput1: {
    width: width - dynamicSize(30),
    height: dynamicSize(60),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: 'rgb(0,224,176)',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: hp(1),
    marginHorizontal: wp(1),
    padding: 12,
    // backgroundColor:'red'
  },
  TextInputDes: {
    width: width - dynamicSize(30),
    height: dynamicSize(150),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: 'rgb(0,224,176)',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: hp(1),
    padding: 12,



  },
  errorText: {
    color: "red", height: dynamicSize(15),
    fontSize: dynamicSize(12),
  
  },
})
