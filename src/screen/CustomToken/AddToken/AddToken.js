import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, TextInput, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '@components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import {
  Calendar, roundButton, searchIcon,
  roundedButton3, ArrowDropDown, back,
  ethIcon,
  homebtn, largeButton, imageAvtar
} from '@assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '@components/button'
import styles from './styles'
import { TEALDARK } from '@utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window")
import { handleValidations } from "./function";
import DefaultState from "./Constant"
export default class AddToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DefaultState
    };
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
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}  >
        <CustomHeader text1={"Add Token Screen"} source1={back} onPress1={() => this.props.navigation.goBack()} />
        <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
          <KeyboardAwareScrollView
            style={styles.main}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={20}
            scrollEnabled={true}>

            <View style={[styles.searchTokenContainer, { marginTop: hp(5) }]}>
              <TextInput
              onChangeText={(text) => this.handlevalidate(text, "address")}
                placeholder="Contract Address*"
                placeholderTextColor="#bfbfbf"
                style={styles.textInputStyle} />
            </View>
            <Text style={styles.errorText}>{this.state.addressError}</Text> 


            <View style={styles.searchTokenContainer}>
              <TextInput
              onChangeText={(text) => this.handlevalidate(text, "name")}
                placeholder="Token Name"
                placeholderTextColor="#bfbfbf"
                style={styles.textInputStyle} />
            </View>
            <Text style={styles.errorText}>{this.state.nameError}</Text> 


            <View style={styles.searchTokenContainer}>
              <TextInput
              onChangeText={(text) => this.handlevalidate(text, "symbol")}
                placeholder="Token Symbol"
                placeholderTextColor="#bfbfbf"
                style={styles.textInputStyle} />

            </View>
         <Text style={styles.errorText}>{this.state.symbolError}</Text> 

            <View style={{ alignSelf: 'center', alignItems: 'center', }} >
              <CustomButton
                onPress={() => { this.props.navigation.navigate('CustomToken')}}
                mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                image={largeButton}
                textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                title='Add Token' />
            </View>

            <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => { this.props.navigation.navigate('CustomToken')}} >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>




          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
