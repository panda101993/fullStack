import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import { getFontSize, dynamicSize } from '../utils/dynamicSize'
const { width, height } = Dimensions.get('window')
import { roundButton } from '../assets/icon'
export const CustomButton = (props) => {
  return (
    <View style={[{  width: width - dynamicSize(30), }, props.mainContainer]}>
      <TouchableOpacity onPress={props.onPress}>
        <ImageBackground resizeMode={'stretch'} style={[styles.container, props.contain]} source={props.image}>
          <Text style={[ styles.text,props.textStyle]}>{props.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}
export const CustomButtonImage = (props) => {
  return (
    <View style={[{ alignItems: 'flex-end', width: width - dynamicSize(40), }, props.mainContainer]}>
      <TouchableOpacity onPress={props.onPress}>
        <ImageBackground style={[styles.container, props.contain]} source={roundButton}>
          <View>
            <Text style={[props.textStyle, styles.text]}>{props.title}</Text>
          </View>
          <View>
            <Image source={props.image} style={{ height: dynamicSize(40), width: dynamicSize(40) }} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: 'white',
    alignSelf:'center'
  },
  container: {
    // height: dynamicSize(),
    // width: dynamicSize(190),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicSize(30),
    flexDirection: 'row',
  },
})