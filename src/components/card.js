import React from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Platform } from "react-native"
import { dynamicSize } from '../utils/dynamicSize';
import {cardrectangle,signupcard} from '../assets/icon'
const { width, height } = Dimensions.get('window');
export const CardComponent = (props) => {
    return (
    
        <View style={[styles.cardView,props.cardStyle]} >
        <ImageBackground source={cardrectangle} 
     resizeMode='stretch'
      style={[styles.cardView1,props.cardViewStyle]}
      >
           {props.children}
      </ImageBackground>

</View>
    )
}
export const CardComponent2 = (props) => {
    return (
    
        <View style={[styles.cardView,props.cardStyle]} >
        <ImageBackground source={signupcard} 
     resizeMode='stretch'
      style={[styles.cardView1,props.cardViewStyle]}
      >
           {props.children}
      </ImageBackground>

</View>
    )
}
export const CardComponentModal = (props) => {
    return (<View style={[styles.container, props.mainView]}>
        {props.children}
    </View>
    )
}
const styles = StyleSheet.create({
    cardView:{
        // backgroundColor:'red',
        width:width-dynamicSize(30),
        height:dynamicSize(300),
        justifyContent:'flex-start',
        alignSelf:'center',
        alignItems:'center'
    },
    cardView1:{
        height:dynamicSize(400),
        justifyContent:'center',
        alignItems:'center',
        width:width
    },
    container: {
        // height: Platform.OS === 'ios' ? height / 2 - dynamicSize(50) : height / 2 - dynamicSize(20),
        width: width - dynamicSize(50),
        backgroundColor: 'white',
        borderRadius: 10,
        borderBottomColor: 'gray',
        borderColor: '#F3F1F1',
        // shadowOffset: { width: dynamicSize(0), height: dynamicSize(0) },
        // shadowOpacity:0.5,
        // shadowRadius:10,
        elevation: 5,
        borderWidth: 1,
        zIndex:2
    },

})