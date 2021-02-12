import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Modal,StyleSheet,FlatList,ImageBackground,TextInput,Image } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp}  from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient';
// import { LogoutModalIcon } from '../assets/icon'
import {  Colors } from '../commomStyle/commonStyle'

import Styles from '../screens/SignUp/SignupStyle'
export default class  CheckModal extends Component{

    constructor(){
super()
this.state={
  modalVisible:false
}

    }

render(){
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
        }}>
        <View style={Styles.Container2}>
            <ImageBackground
                resizeMode='contain'
                // source={LogoutModalIcon}
                style={[{
                    alignItems: 'center',
                    backgroundColor: 'black',
                    height: hp("42%"),
                    width: wp('92%'),
                },]}>
                <Text style={{ color: Colors.golden, fontSize: 25, marginTop: hp('8%') }}>Alert!</Text>
                <Text style={[{ color: 'white', fontSize: 17, marginTop: hp('3%'), marginLeft: wp('1%') }]}>Please tick check box.</Text>
                <TouchableOpacity style={{ marginVertical: wp(4) }} onPress={this.props.onPress}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgb(229, 161, 61)', 'rgb(203,139,46)', 'rgb(162 ,107 ,21)',]}
                        style={[Styles.buttonStyle, Styles.btnStyle]}>
                        <Text style={[Styles.textStyle,]}>
                            OK</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    </Modal>
    )
}


}