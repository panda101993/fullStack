import React, { Component } from "react"
import { TextInput, StyleSheet, TouchableOpacity, Image, View,Text } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors} from '../commomStyle/commonStyle';
export default class GlobalInput extends Component {
    render() {

        return (
            <View>
            <View {...this.props} source={this.props.sourceBg} style={[styles.textField, this.props.style,]}
                resizeMode="stretch">
                {/* <Image
                    style={[styles.fieldIconStyle, this.props.styleIcon]}

                    source={this.props.source}
                // sourceImgRight ={this.props.sourceImgRight}
                /> */}
                <View style={{}}>

                <TextInput
                    style={[styles.textInputStyle, this.props.textFieldStyle,]}
                    name={this.props.name}
                    autoCapitalize='none'
                    keyboardType={this.props.keyboardType}
                    value={this.props.value}
                    placeholderTextColor={this.props.placeholderTextColor}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    underlineColorAndroid="transparent"
                    returnKeyType={this.props.returnKeyType}
                    ref="TextInput"
                    onFocus={this.props.onFocus}
                    autoFocus={this.props.autoFocus}
                    autoCorrect={false}
                    onSubmitEditing={this.props.onSubmitEditing}
                    secureTextEntry={this.props.secureTextEntry}
                    multiline={this.props.multiline}
                    numberOfLines={this.props.numberOfLines}
                    maxLength={this.props.maxLength}
                    onBlur={this.props.onBlur}
                    editable={this.props.editable}
                    selectTextOnFocus={this.props.selectTextOnFocus}
                   
                />
                </View>

            {this.props.image ? <TouchableOpacity onPress={this.props.onPress} style={{ height: hp(4) }}>
                    <Image
                        style={[styles.fieldIconStyle1, this.props.styleIcon]}

                        source={this.props.source1} />
                </TouchableOpacity>  : null }

               
            </View>
            <View 
            style={[styles.ErrorView, this.props.MainContainer]}
            >
           <Text
           numberOfLines={2}
            style={[styles.ErrorText, this.props.ErrorText]}
           >
           {this.props.ErrorText}
           </Text>
          
           </View>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    fieldIconStyle: {
        marginTop: 12,
        marginLeft: 20,
        height: hp('5%'),
        resizeMode: "contain",
        color: 'black',
        backgroundColor:'red'
    },
    textInputStyle: {
        color:Colors.light,
        marginHorizontal: 8,
        // marginVertical:wp(-5),
        width: wp(70),
        height:hp(6),
        justifyContent:'center',
        fontSize: 16
    },
    
    textField: {
        alignSelf: "center",
        flexDirection: "row",
        height: hp(6),
        justifyContent:'center',
        // paddingVertical: wp(3),
        width: wp(85),
        backgroundColor:'rgba(19,20,50,0.6)',
        borderRadius: 5,
        borderWidth: 0.25,
        borderColor: "rgb(149,149,149)",
        
    },
    fieldIconStyle1: {
        alignSelf:'center',
        left:wp(0),
        top: hp(1.5),
        resizeMode: "contain",

    },


    ErrorView:{
        alignSelf:'flex-start',
        marginHorizontal:wp(8),
       //marginVertical:wp(3),
        width: wp("80%"),
         //height: hp("3%"),
        
    },

      ErrorText:{
        color: "red",
        fontSize:10.7
    },
}) 
