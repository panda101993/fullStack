/*********************** React Core Component ****************************/
import React from 'react';
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native';
import { button } from '../assets/icons'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
/************* Icons ******************/
const Button = button

const Buttons = ({ onPress, children, style, state }) => {
  const { buttonStyle, textStyle } = styles;

  return (<TouchableOpacity onPress={!state ? (onPress) : (null)} style={[
    {
      width: wp(85),
      height: hp(8),
      alignSelf: 'center'
    },
    style]}>
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={!state ? ['rgb(229, 161, 61)', 'rgb(203,139,46)', 'rgb(162 ,107 ,21)'] : [Colors.lightGrey, Colors.grey, Colors.lightGrey]}
      style={[buttonStyle, style, { justifyContent: 'center' }]}>

      <Text style={[textStyle, ]}>
        {children}
      </Text>


    </LinearGradient>
  </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: "white",
    fontWeight: '700'
  },

  buttonStyle: {

    // paddingHorizontal:wp
    // 20% of height device screen
    width: wp(85),
    height: hp(8),
    alignSelf: "center",

    borderRadius: 5,
  }
};

export default Buttons;




