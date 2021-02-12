// import { Colors } from '../../../commomStyle/commonStyle'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions,Modal, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, KeyboardAvoidingView, ImageBackground, Alert, Platform } from 'react-native';
const { width, height } = Dimensions.get("window")
import { dynamicSize } from '@utils/dynamicSize'
import { TEALDARK } from '@utils/colors'
export default Styles = {
    ErrorView: {

        alignSelf: 'flex-start',
        //marginTop:wp(7),
        width: wp("80%"),
        //height: hp("5%"),
        marginHorizontal: wp("7%")

    },
    errorText: {
        color: "red", height: dynamicSize(15),
        fontSize: dynamicSize(12),
        marginLeft: wp(7),
      },


    TagtextStyle: {
        width: wp(85),
        // color: Colors.light,
        marginHorizontal: wp(7),
        //marginVertical: hp(2.5),
        fontSize: 15,
    },

    textStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: "white",
        fontWeight: '700',
        marginVertical: wp(3)
    },

    buttonStyle: {
        width: wp(85),
        height: hp(8),
        alignSelf: "center",
        borderRadius: 5,

    },
    familyStyle2: {
        fontSize: 12,
        width: wp(50)

    },
    TextInput1: {
        width: Platform.OS == 'ios' ? width - dynamicSize(60):width - dynamicSize(30),
        height: dynamicSize(60),
        // backgroundColor:'green',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomColor: 'rgb(0,224,176)',
        
    },
}