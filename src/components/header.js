import React, { } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Platform
} from 'react-native'
import {headerImage,HeaderShadow} from '../assets/icon'
import { dynamicSize } from '../utils/dynamicSize';
const { width, height } = Dimensions.get("window")
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const CustomHeader = (props) => {
    return (
        <SafeAreaView style={{
        
        alignSelf:'center',
        height:hp(12.5),
        marginTop: Platform.OS =='ios' ? 0 : hp(4)
        }} >
            <ImageBackground 
            resizeMode= {Platform.OS == "ios" ? 'contain': 'cover' }
            style={{
                width:wp(118),
            alignSelf:'center',
            height:hp(22)
            ,marginTop:hp(-5),
            marginLeft:wp(-1),
            justifyContent:'center',
            
            }}
            source={HeaderShadow} >
                <View style={{width:wp(90),alignSelf:'center',
                flexDirection:'row',
                justifyContent:'space-between',
                // backgroundColor:'red',
                height:hp(5)}}>
                <TouchableOpacity onPress={props.onPress1} style={{alignSelf:'center'}}>
                   <Image  source={props.source1} resizeMode="contain" 
                   style={[{height:hp(4),width:wp(8),marginTop: Platform.OS == 'ios' ? hp(-2): 0}]}/>
               </TouchableOpacity>

               <View>
                   <Text style={[styles.head_text1,props.textColor]}>
                   {props.text1}
                   </Text>
               </View>
               <TouchableOpacity onPress={props.onPress2} style={{alignSelf:'center'}}>
               <Image source={props.source2} resizeMode="contain" 
                   style={[{height:hp(4),width:wp(8)}]}/>
               </TouchableOpacity>
                </View>
              
            </ImageBackground>
        </SafeAreaView>
    )
}
export const CustomHeader_Dashboard = (props) => {
    return (
        <SafeAreaView  >
            <ImageBackground style={styles.container}>
                <View style={styles.head_wrapper}>
                    <Text style={[props.textColor, styles.head_text1]}>{props.text1}</Text>
                </View>
                <View style={{ position: 'absolute', left: dynamicSize(10), height: height / 10, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn}
                        onPress={props.onPress1}
                        {...props}
                    >
                        <Image
                            source={props.source1}
                            {...props}
                            style={styles.img}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute',justifyContent:'center',right: dynamicSize(0), height: height / 8.5, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn}
                        onPress={props.onPress2}
                        {...props}
                    >
                        <Image
                            source={props.source2}
                            {...props}
                            style={styles._img1}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
export const CustomHeader1 = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.container1}>
                <View style={styles.head_wrapper}>
                    <Text style={[styles.head_text2, props.textColor]}>{props.text1}</Text>
                </View>
                <View
                    style={{ position: 'absolute', left: dynamicSize(10), height: height / 10, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn1}
                        onPress={props.onPress1}
                        {...props}
                    >
                        <Image
                            source={props.source1}
                            {...props}
                            style={[styles.img_1, props.design]}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', right: dynamicSize(20), height: height / 10, justifyContent: 'center', }}>
                    <TouchableOpacity style={styles.btn1}
                        onPress={props.onPress2}
                        {...props}
                    >
                        <Image
                            source={props.source2}
                            {...props}
                            style={styles.img1_1}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
export const CustomHeader2 = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.container1}>
                <View style={styles.head_wrapper}>
                    <Text style={[styles.head_text2, props.textColor]}>{props.text1}</Text>
                </View>
                <View style={{ position: 'absolute', left: dynamicSize(10), height: height / 10, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn3}
                        onPress={props.onPress1}
                        {...props}
                    >
                        <Image
                            source={props.source1}
                            {...props}
                            style={styles.img_3}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', right: dynamicSize(20), height: height / 10, justifyContent: 'center', }}>
                    <TouchableOpacity style={styles.btn1}
                        onPress={props.onPress2}
                        {...props}
                    >
                        <Image
                        resizeMode='contain'
                            source={props.source2}
                            {...props}
                            style={styles.img1_1}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
export const CustomHeaderPro = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.container1}>
                <View style={styles.head_wrapper}>
                    <Text style={[styles.head_text2, props.textColor]}>{props.text1}</Text>
                </View>
                <View style={{ position: 'absolute', left: dynamicSize(10), height: height / 10, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn3}
                        onPress={props.onPress1}
                        {...props}
                    >
                        <Image
                            source={props.source1}
                            {...props}
                            style={styles.img_3}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', right: dynamicSize(20), height: height / 10, justifyContent: 'center', }}>
                    <TouchableOpacity style={styles.btn1}
                        onPress={props.onPress2}
                        {...props}
                    >
                        <Image
                        resizeMode='contain'
                            source={props.source2}
                            {...props}
                            style={styles.img1_1}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width:width,
        height: height / 10,
        // backgroundColor: "rgb(0,224,176)"
    },

    container1: {
        width: width,
        height: height / 10,
        backgroundColor: "transparent"
    },
    header_wrapper: {
        backgroundColor: "white",
        height: dynamicSize(80),
        flexDirection: "row",
    },
    btn: {
        height: dynamicSize(30),
        width: dynamicSize(35),
        marginHorizontal: dynamicSize(2),
    },
    btn1: {
        height: dynamicSize(50),
        width: dynamicSize(25),
        justifyContent:'center',
        marginHorizontal: dynamicSize(2),
    },
    btn3: {
        height: dynamicSize(30),
        width: dynamicSize(25),
        marginHorizontal: dynamicSize(2),
    },
    img: {
        width: dynamicSize(30),
        height: dynamicSize(25),

    },
    img_1: {
        width: dynamicSize(35),
        height: dynamicSize(52),
    },
    img_3: {
        width: dynamicSize(35),
        height: dynamicSize(30),
    },
    img1: {
        width: dynamicSize(30),
        height: dynamicSize(30),
    },
    _img1: {
        width: dynamicSize(20),
        height: dynamicSize(20),
    },
    img1_1: {
        width: dynamicSize(30),
        height: dynamicSize(30),
        top: dynamicSize(12)
    },
    head_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
    },
    head_text1: {
        color: "white",
        textAlign: "center",
        fontSize: dynamicSize(20),
        fontWeight: "bold"
    },
    head_text2: {
        color: "black",
        textAlign: "center",
        fontSize: dynamicSize(20),
        fontWeight: "bold"
    },

})




