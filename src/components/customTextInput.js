import React from 'react';
import { TextInput, Text, View, Image, Platform, Dimensions, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import { getFontSize, dynamicSize } from '../utils/dynamicSize'
const { width, height } = Dimensions.get('window')
export const Input = (props) => {
  // consollog("AShish",props)
  return (
    <View style={[styles.container, props.inputView]}>

      <ImageBackground resizeMode={'stretch'}
        style={{
          width: dynamicSize(280),
          //    height: dynamicSize(60),
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'rgb(0,172,153)',
          borderColor: "rgb(149,149,149)",
        }}  >
        <View
          style={{
            top: Platform.OS === "ios" ? dynamicSize(-5) : dynamicSize(5),
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            //   backgroundColor:'red',
            //   width: dynamicSize(120),

          }}
        >
          <View style={{ justifyContent: 'center' }}  >
            <Image source={props.icon} resizeMode='contain' style={{ width: dynamicSize(20), height: dynamicSize(20),bottom:5 }} />
          </View>

          <TextInput
            {...props}
            style={[styles.textInputStyle, props.textinputsty]}
            autoCapitalize="none"

            placeholder={props.holder}
            placeholderTextColor={'rgba(187,186,186,0.7)'}
            maxLength={props.maxLength}
          // editable={true}
          />
        </View>

      </ImageBackground>

    </View>
  )
}

export const Input_Password = (props) => {
  return (
    <View style={[styles.container, props.inputView]}>

      {/* <View style={{width: width - dynamicSize(130) }} > */}


      <ImageBackground resizeMode={'stretch'}
        style={[{
          width: dynamicSize(280),
          //    height: dynamicSize(60),
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'rgb(0,172,153)',
          borderColor: "rgb(149,149,149)",
        }, props.wrapperStyle]}   >
        <View
          style={{
            top: Platform.OS === "ios" ? dynamicSize(-5) : dynamicSize(5),
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            //  backgroundColor:'red',
            //   width: dynamicSize(120),

          }}
        >
          <View style={{ justifyContent: 'center' }}  >
            <Image source={props.icon} resizeMode='contain' style={{ width: dynamicSize(20), height: dynamicSize(20),bottom:5 }} />
          </View>
          <TextInput
            {...props}
            style={[styles.textInput, props.textinputsty]}
            placeholderTextColor={'rgba(187,186,186,0.7)'}
            autoCapitalize="none"
            placeholder={props.holder}
            maxLength={props.maxLength}
          />
        </View>
        {props.Icon_second ?
          <TouchableOpacity onPress={props.onPressIcon2} style={{ justifyContent: 'center' }}>
            <Image source={props.icon_2} style={{
              height: dynamicSize(12), width: dynamicSize(16), left: 1
            }} resizeMode="stretch" />
          </TouchableOpacity>
          : null
        }
      </ImageBackground>


      {/* </View> */}
    </View>
  )
}

// export const Input1 = (props) => {
//   return (
//     <View style={[styles.container1, props.inputView]}>
//             <ImageBackground resizeMode={'stretch'} 
//       style={{width:width-dynamicSize(50),height:dynamicSize(45),justifyContent:'center'}} source={textInputbackground} >
//      <TextInput
//         {...props}
//         placeholderTextColor={"lightgrey"}
//         style={[styles.textInputStyle1, props.textinputsty, { placeholderTextColor: "white" }]}
//         autoCapitalize="none"
//         placeholder={props.holder}
//       />
//       </ImageBackground>


//     </View>
//   )
// }

// export const InputImage = (props) => {
//   return (
//     <View style={[styles.container, props.inputView]}>
//        <View style={{flexDirection:'row'}} >
//          <Text style={[props.textStyle, styles.text]}>{props.name}</Text>
//       <Text style={{fontSize: getFontSize(18)}}>{props.name_optional}</Text>
//       </View>
//       <TouchableOpacity onPress={props.onPress} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <TextInput
//           {...props}
//           style={[styles.textInputStyle, props.textinputsty]}
//           autoCapitalize="none"
//           placeholder={props.holder}
//           returnKeyType="done"
//         />
//         <Image source={props.image} style={{ width: dynamicSize(20) }} resizeMode='contain' />
//       </TouchableOpacity>
//     </View>
//   )
// }
const styles = StyleSheet.create({
  text: {
    fontSize: getFontSize(16.7),
    fontWeight: '400',
    color: 'white',
  },
  container: {
    width: width - dynamicSize(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: dynamicSize(50),
  },
  container1: {
  },
  textInputStyle: {
    fontSize: getFontSize(14),
    alignSelf: 'center',
    color: 'grey',
    left: dynamicSize(10),
    width: dynamicSize(240),

  },
  textInput: {
    fontSize: getFontSize(14),
    alignSelf: 'center',
    color: 'grey',
    left: dynamicSize(10),
    width: dynamicSize(220),
  },
  textInputStyle1: {
    fontSize: getFontSize(16),
    color: '#686868',
    height: dynamicSize(40),
    width: width - dynamicSize(160),
    marginLeft: dynamicSize(20)
  }
})