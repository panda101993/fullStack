import React, { useState, useEffect } from "react"
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Text, StyleSheet, Dimensions, View, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground, Platform } from 'react-native'
import {
    customToken,
    support,
    privacyPolicy,
    termsNCondition,
    faqIcon,
    logoutIcon,
    back,
    sideArrow, drawerHeader
} from '@assets/icon'
import { dynamicSize } from '@utils/dynamicSize';
import { ArrowDropDown } from "../assets/icon";
import ModalComponent from '@commonComponents/logoutModal'
export function DrawerContent(props) {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View style={{ flex: 1, }}>
            <DrawerContentScrollView {...props}>
                <ImageBackground resizeMode={Platform.OS== 'ios'? 'contain':'cover'}
                    style={{
                        width: wp(88),
                        alignSelf: 'center',
                        height: hp(20),
                        marginTop:hp(-6),
                        justifyContent: 'center',
                        // backgroundColor:'green'
                    }}
                    source={drawerHeader} >
                    <View style={{
                        width: wp(70), alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: hp(5),
                        marginTop:hp(-1),
                        
                        // backgroundColor:'red'
                        
                    }}>
                        <TouchableOpacity onPress={()=>props.navigation.closeDrawer()} style={{ alignSelf: 'center',marginLeft:wp(2) }}>
                            <Image source={back} resizeMode="contain"
                                style={[{ height: hp(4), width: wp(8), }]} />
                        </TouchableOpacity>
                        <Text style={{
                                color: "white",
                                textAlign: "center",
                                fontSize: dynamicSize(20),
                                marginTop:Platform.OS =='ios' ? hp(1):hp(0)
                            }}>
                                {"Settings"}
                            </Text>
          
                        <TouchableOpacity onPress={props.onPress2} style={{ alignSelf: 'center' }}>
                            <View
                                style={[{ height: hp(4), width: wp(8) }]} />
                        </TouchableOpacity>
                    </View>

                </ImageBackground>


                <View style={[styles.itemContainer,{marginTop:hp(-2)}]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => props.navigation.navigate("CustomToken")}>
                        <Image resizeMode='contain' source={customToken} style={styles.imageStyle} />
                        <Text style={styles.textWrapper}>Custom Token</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => props.navigation.navigate("Multilanguage",{'fromDrawer':true})}>
                        <Image resizeMode='contain' source={customToken} style={styles.imageStyle} />
                        <Text style={styles.textWrapper}>Language</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        onPress={() => props.navigation.navigate("FAQs")}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image resizeMode='contain' source={faqIcon} style={styles.imageStyle} />
                            <Text style={styles.textWrapper}>FAQs</Text>
                        </View>

                        <Image resizeMode='contain' source={sideArrow}
                            style={{ height: hp(2), alignSelf: 'center', marginHorizontal: wp(4) }} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        onPress={() => props.navigation.navigate("Support")}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image resizeMode='contain' source={support} style={styles.imageStyle} />
                            <Text style={styles.textWrapper}>Support</Text>
                        </View>

                        <Image resizeMode='contain' source={sideArrow}
                            style={{ height: hp(2), alignSelf: 'center', marginHorizontal: wp(4) }} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        onPress={() => props.navigation.navigate("EditProfile")}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image resizeMode='contain' source={support} style={styles.imageStyle} />
                            <Text style={styles.textWrapper}>Profile</Text>
                        </View>

                        <Image resizeMode='contain' source={sideArrow}
                            style={{ height: hp(2), alignSelf: 'center', marginHorizontal: wp(4) }} />
                    </TouchableOpacity>
                </View>


                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        onPress={() => props.navigation.navigate("TermsAndCondition")}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image resizeMode='contain' source={termsNCondition} style={styles.imageStyle} />
                            <Text style={styles.textWrapper}>{"Terms & Conditions"}</Text>
                        </View>

                        <Image resizeMode='contain' source={sideArrow}
                            style={{ height: hp(2), alignSelf: 'center', marginHorizontal: wp(4) }} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        onPress={() => props.navigation.navigate("Policy")}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image resizeMode='contain' source={privacyPolicy} style={styles.imageStyle} />
                            <Text style={styles.textWrapper}>Privacy Policy</Text>
                        </View>

                        <Image resizeMode='contain' source={sideArrow}
                            style={{ height: hp(2), alignSelf: 'center', marginHorizontal: wp(4) }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() =>setModalVisible(!modalVisible)}>
                        <Image resizeMode='contain' source={logoutIcon} style={[styles.imageStyle, { width: wp(6), marginLeft: wp(4.5) }]} />
                        <Text style={styles.textWrapper}>Logout</Text>
                    </TouchableOpacity>
                </View>
                
                <ModalComponent
                onPressclosecross={() => setModalVisible(!modalVisible)}
                // OptionType={this.state.OptionType}
                modalVisible={modalVisible}
                heading={"LOGOUT?"}
                body={"Are you sure you want to logout?"}
                leftButtonText={"YES"}
                rightButtonText={"NO"}
                CloseModal={() => setModalVisible(!modalVisible)}
                onPressLeftButton={() => {
                //   AsyncStorage.removeItem("Token")
                  setModalVisible(!modalVisible)
                  props.navigation.navigate('Login')
                }
                }
              />
            </DrawerContentScrollView>
        </View>
    );
}




const styles = StyleSheet.create({
    textWrapper: {
        alignSelf: "center",
        fontSize: 18, marginHorizontal: wp(2),

    },
    itemContainer: {
        height: hp(7), justifyContent: 'center',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1
    },
    imageStyle: { height: hp(3), alignSelf: 'center', marginLeft: wp(2), width: wp(10) }
})
