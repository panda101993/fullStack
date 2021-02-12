import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, TextInput, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '@components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import {
    Calendar, roundButton, searchIcon,
    roundedButton3, ArrowDropDown, back,
    ethIcon,announcementImg,
    homebtn, largeButton, imageAvtar
} from '@assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import styles from './styles'
import { TEALDARK } from '@utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class AnnouncementItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}  >
                <CustomHeader text1={"Announcement"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        scrollEnabled={true}>
                        <View style={{marginHorizontal:wp(2),marginTop:hp(3)}}>
                            <View style={{ flexDirection: 'row', 
                            marginVertical:hp(1),
                            justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: 'bold', fontSize: dynamicSize(17) }}>Latest Release :</Text>
                                <Text style={{ color: 'grey', fontSize: dynamicSize(12) }}>16-March-2020</Text>
                            </View>
                            <Image source={announcementImg} 
                            style={{alignSelf:'center',marginVertical:hp(1),}}
                            resizeMode="contain"  />
                            <Text style={{ fontSize: dynamicSize(15),marginVertical:hp(1) }}>
                                Latest application has been upgraded . Please update the latest application
                          </Text>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
