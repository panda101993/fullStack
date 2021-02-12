
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Modal,StyleSheet,FlatList,ImageBackground,TextInput,Image } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp}  from 'react-native-responsive-screen'

import {  CrossIcon  } from '../assets/icon';
 import LinearGradient from 'react-native-linear-gradient';
 import {TEALDARK} from '@utils/colors'
export default class  DisableModal extends Component{

constructor(){
    super()
    this.state={
          modalVisible:false,
            code: "",
            codeStatus: false,
            codeError: "",
            activecodeBorderColor: false,
    }

}



render(){
    return(

<Modal
transparent={true}
visible={this.props.modalVisible}

>
<View style={{ alignItems: "center", flex: 1, justifyContent: 'center', backgroundColor: 'black', opacity: 0.8, width: wp("100%"), }}>
    <View
        
        resizeMode='contain'

        style={{
            height: hp("39%"),
                width: wp('72%'),
            backgroundColor: 'white'
        }}>
        <View style={styles.crossView}>
            <TouchableOpacity style={{ marginVertical:wp(-5),marginHorizontal:wp(-5) }} onPress={this.props.modalpress}>
                <Image source={CrossIcon} resizeMode="contain" style={{ width: wp(11.4), height: hp(6.1), alignSelf: 'flex-end' }} />

            </TouchableOpacity>
        </View>
        <Text style={[styles.modaltext]}>
            Enter Code
                 </Text>
        <View style={{
            marginVertical: wp(7),
            borderRadius: 8,
            alignSelf: 'center',
            width: wp("60%"),
            backgroundColor: 'white',
            height: hp(8),
            borderColor: TEALDARK,
            borderWidth: 0.7

        }}>
            <TextInput
                style={{ color: 'black' ,  height: hp(8) ,
                width: wp("60%"),alignContent:"center" , alignSelf: 'center' ,justifyContent:"center"}}
                placeholder="Enter Code"
                
                maxLength={6}
                keyboardType="numeric"
                // placeholderTextColor={Colors.lightGrey}
                onChangeText={this.props.onChangeText}
                 value={this.props.value}
            ></TextInput>
             
             <View
            style={[styles.ModalErrorView, this.props.MainContainer]}
        >
            <Text

                style={[styles.ErrorText, this.props.ErrorText]}
            >
                {this.props.codeError}
            </Text>

        </View>


        </View>
        <TouchableOpacity onPress={this.props.submit} style={{
            width: wp(40),
            height: hp(8), alignSelf: 'center',
        }} >
            <View 
                style={[styles.buttonStyle]}>

                <Text style={[styles.textStyleSubmit]}>
                    Submit
                </Text>


            </View>
        </TouchableOpacity>

    </View>
</View>
</Modal>
)
    }
}

const styles =StyleSheet.create({

    modaltext: {
        //amarginVertical: wp(3),
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center'
    },
    ModalErrorView: {
        alignSelf: 'flex-start',
        //marginTop:wp(7),
        width: wp("80%"),
        //height: hp("5%"),
        marginHorizontal: wp("1%")

    },

    ErrorText: {
        color: "red",
        fontSize: 10.7
    },
    buttonStyle: {
        width: wp(40),
        height: hp(8),
        alignSelf: "center",
        borderRadius: 5,
        marginVertical:wp(5),
        justifyContent:'center',
        backgroundColor:TEALDARK
    },

    textStyleSubmit: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        marginVertical: wp(3)
    },
})