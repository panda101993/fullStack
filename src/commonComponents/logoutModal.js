import React, { useState, Component } from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Alert,
    StyleSheet,
    TextInput,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {dynamicSize, getFontSize} from '@utils/dynamicSize';
const {width, height} = Dimensions.get('window');
import {TEALDARK} from '@utils/colors'
import { color } from 'react-native-reanimated';

export default class ModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    BackToLogin() {

        alert("alert")
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Modal
                    animationType="fade"
                    transparent={true}

                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        //   Alert.alert('Modal has been closed.')
                    }}>
                    <View style={styles.Container2}>

                        {/* <ImageBackground
                            resizeMode='contain'
                            // source={LogoutModalIcon}
                            style={[{
                                alignItems: 'center',
                                // backgroundColor: 'rgb(11, 10, 38)',
                                height: hp("40%"),
                                width: wp('95%'),
                            }]}> */}
                            <View style={[{ flexDirection: 'column', alignItems: 'center',
                            borderWidth:2,
                            borderColor:TEALDARK,
                            backgroundColor:'white',
                                width: wp('96%'), }, , this.props.imagebgstyle]}>

                                <Text style={{ color: TEALDARK, fontSize: 25, marginTop: hp('4%') }}>{this.props.heading}</Text>
                                <Text style={[{ color: 'black', fontSize: 18, marginTop: hp('3%') }, this.props.bodyStyle]}>{this.props.body}</Text>
                                {this.props.body2 ? <Text style={[{ color: 'white' }, this.props.bodyStyle2]}>{this.props.body2}</Text> : null}
                                <View style={[{ flexDirection: 'row', marginTop: hp('2%') }, this.props.styleButtons]}>
                                    <TouchableOpacity onPress={this.props.onPressLeftButton}
                                    style={[styles.btnStyle]} >
                                       
                                            <Text style={[styles.textStyle,]}>
                                                {this.props.leftButtonText}
                                            </Text>
                                       
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btnStyle2]} onPress={this.props.CloseModal} >
                                        <Text style={[styles.textStyle,{color:TEALDARK}]}>
                                            {this.props.rightButtonText}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        {/* </ImageBackground> */}
                    </View>
                </Modal>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        // height:height
        // justifyContent: "center",

        // alignItems: "center",


    }, Container2: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        //  height:hp("50%"),
        alignSelf: 'center',
        width: wp("100%"),
        backgroundColor: 'rgb(0, 0, 3)',
        opacity: 0.85,
    },
    btnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        marginVertical: hp(2),
        marginHorizontal: hp(2),
        backgroundColor:TEALDARK,
        borderRadius:20,
        width: wp('35%'),
        paddingVertical: wp(4),
        backgroundColor:TEALDARK,
        borderColor:TEALDARK,
        borderWidth:2,
        // height: hp('7%'),
    },
    btnStyle2: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        marginVertical: hp(2),
        marginHorizontal: hp(2),

        borderColor:TEALDARK,
        borderWidth:2,
        borderRadius:20,
        width: wp('35%'),
        paddingVertical: wp(4),

    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: "white",
        fontWeight: '700'
    },
    buttonStyle: {
        paddingVertical: wp(2),
        // paddingHorizontal:wp
        // 20% of height device screen
        width: wp(85),
        height: hp(8),
        alignSelf: "center",
        borderRadius: 25,
    }

})