import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';


export const IconComponent = (props) => {
    return (
        <View style={[styles.ImageView, props.containViewStyle]}>
            <Image
                resizeMode="contain"
                source={props.source}
                style={[props.imgStyle]}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    ImageView: {
        // borderWidth: 2

    }
})