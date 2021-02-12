import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Modal,StyleSheet,FlatList,ImageBackground,TextInput,Image,Dimensions } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp}  from 'react-native-responsive-screen'
import {Colors } from '../commomStyle/commonStyle'
import LinearGradient from 'react-native-linear-gradient';
import { Country } from '../screens/SignUp/countrycode'
const { width, height } = Dimensions.get("window");
const CountryModal =(props) =>(

    
            <Modal
            style={{ height: height / 2 }}
            animationType="none"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onRequestClose}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    backgroundColor:'rgba(19,20,50,0.5)', 
                    // opacity: 1
                }}>
                <View style={{
                    height: height / 2,
                    width: wp("70%"), justifyContent: "center",
                    alignSelf: "center", alignItems: "center",
                    backgroundColor: 'white', paddingVertical: 15,
                    borderColor: 'rgb(224 ,163, 84)',
                    borderWidth: 1
                }}>
                    <FlatList
                        data={props.data}
                        onRequestClose={() => console.log("modal has been closeds")}
                        renderItem={({ item, index }) =>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={ () =>props.onPress(item)}
                                    style={{
                                        flexDirection: 'row',
                                        width: wp("70%"),
                                        marginVertical: wp(2)
                                    }}
                                >
                                    <View style={{ marginHorizontal: wp(3), marginVertical: wp(2) }}>
                                        <Image source={item.icon} resizeMode="contain" style={{ width: wp("10%"), height: hp("4%"), }} />
                                    </View>

                                    <View style={{ width: wp("50%"), marginHorizontal: wp(2) }}>
                                        <Text style={{ fontSize: 15 }}>{item.dialCode}</Text>
                                        <Text style={{ fontSize: 15 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => {
                            return <View style={{
                                height: 1,
                                backgroundColor: "grey", width: wp("70%")
                            }} />
                        }}
                        CancelModal={props.CancelModal}
                    />
                    <TouchableOpacity onPress={props.cancelPress}
                        style={{ borderRadius: 20, width: wp("50%") }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgb(100,15,100)', 'rgb(100,15,90)', 'rgb(100,15,90)',]}
                            style={{ justifyContent: 'center', borderRadius: 6 }}>

                            <Text style={{
                                alignSelf: "center",
                                marginVertical: 10,
                                fontWeight: "bold",
                                fontSize: 20,
                                color: 'white'
                            }}>{"Cancel"}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
        
    export {
        CountryModal
    }