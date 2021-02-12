import * as React from 'react';
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../commomStyle/commonStyle';
import { BackIcon} from '../assets/icons';
import { dynamicSize } from '../utils/dynamicSize';



export const CustomHeader = (props) => {
  // console.log("Props-->>",props)
  return (<View style={{backgroundColor:'	rgb(19,20,50)'}}>
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgb(19,20,50)', 'rgb(19,20,50)', 'rgb(19,20,50)',]}
      style={{
        width: window.width, 
        paddingVertical: wp(10),
         flexDirection: 'row',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomColor: Colors.extragrey,
        backgroundColor: Colors.extragrey,
        justifyContent: 'space-between',
         alignItems:'center'
      }}>
      {props.back ?
        <TouchableOpacity onPress={props.goback}  style={{marginHorizontal:wp('2%')}}>
      <Image
       resizeMode='contain'
      source={BackIcon}
      style={{height:hp(5),width:wp(8),}}
      />
      </TouchableOpacity>
      : null }
      <View style={{alignSelf:'center',width:wp('120%'),}} >
      <Text style={[styles.textStyle,props.style]}>
        {props.pageTitle}
      </Text>
      </View>
     
    </LinearGradient>
    </View>
  );
}
export const CustomHeaderHome = (props) => {
  // console.log("Props-->>",props)
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgb(38, 38, 46)', 'rgb(33,32,43)', 'rgb(52, 52, 55)',]}
      style={{
        width: window.width, paddingVertical: wp(10), flexDirection: 'row', borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 5,
        // backgroundColor: 'rgba(32, 32, 31, 0.8)',
        justifyContent:'space-evenly'
      }}>
      <Image
        resizeMode='contain'
      // source={require('./src/assets/icons/hamburger.png')}
      />
      <View style={{alignItems:'center',justifyContent:'center'
      }}>
      <Text style={{
        // fontFamily: 'Roboto-Regular',
        fontSize: 18,

        color: 'rgb(224 ,163, 84)'
      }}>
        {/* Login */}
        {props.pageTitle}
      </Text>
      <Text style={{
        // fontFamily: 'Roboto-light',
        fontSize: 24,

        color: 'rgb(224 ,163, 84)'
      }}>
        {/* Login */}
        {'$'+ props.amountCoin}
      </Text>
      <Text style={{
        // fontFamily: 'Roboto-light',
        fontSize: 14,

        color:Colors.lightGrey
      }}>
        {/* Login */}
        {props.textForPercent}
      </Text>
      <Text style={{
        // fontFamily: 'Roboto-Regular',
        fontSize: 18,

        color: Colors.red
      }}>
        {/* Login */}
        {props.percentAmount}
      </Text>

      </View>
      <Image
        resizeMode='contain'
      // source={require('./src/assets/icons/information.png')}
      />
    </LinearGradient>

  );
}

const styles =StyleSheet.create({

textStyle:{
  // fontFamily: 'Roboto-Regular',
  fontSize: 22,
  color: 'rgb(221,128,17)',
  alignSelf:'center',
  marginRight:wp(40)



}



})