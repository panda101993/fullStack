import * as React from 'react';
import { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    Button

} from 'react-native';

// import { HomeInActive, HomeActive, WalletActive, 
//          WalletInActive, BuyActive, BuyInActive, 
//          SettingsActive, SettingInActive } from '../../src/assets/icon';
import { homebtn, WalletIcon, HomeActive, HomeInactive, TradeActive, TradeInactive, WalletActive, WalletInactive, ProfileActive, ProfileInactive } from '../assets/icon'
// import { CustomHeader, CustomHeaderHome } from '../commonComponents/CommonHeader'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-community/async-storage";
let { Width, Height } = Dimensions.get('window');
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackProfile = createStackNavigator();
const StackWallet = createStackNavigator();
const HomeStackList= createStackNavigator();

import Login from '../screen/login/login';
import Multilanguage from '../screen/multilanguage/multilanguage'
import UserInfo from '../screen/signup/userInfo'
import FaQrcode from '../screen/signup/faQrcode'
import Home from '../screen/home/home'
import KYC from '../screen/kyc/kyc'
import EditProfile from '../screen/editProfile/editProfile'
import { DrawerContent } from './DrawerContent'
import CustomToken from '../screen/CustomToken/CustomToken'
import AddToken from '../screen/CustomToken/AddToken/AddToken'
import BuySell from '../screen/BuySell/BuySell'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Profile from '../screen/SettingsTabScreens/Settings';
import ChangePassword from '../screen/SettingsTabScreens/Change Password/ChangePassword';
import KYCList from '../screen/SettingsTabScreens/KYCList';
import NativeCurrency from '../screen/SettingsTabScreens/NativeCurrency';
import Security from '../screen/SettingsTabScreens/Security';
import { IconComponent } from '../commonComponents/TabBarComponent';
import wallet from '../screen/WalletTab/wallet';
import Transaction from '../screen/WalletTab/Transaction';
import TermsAndCondition from '../screen/TermsAndPolicy/Terms';
import Anouncement from '../screen/Anouncement/Anouncement'
import AnnouncementItem from '../screen/Anouncement/AnnouncementItem/AnnouncementItem'
import Policy from '../screen/TermsAndPolicy/Policy';
import FAQs from '../screen/home/FAQs/FAQs';
import Support from '../screen/Support/Support';
import BankDetils from '../screen/SettingsTabScreens/BankDetils';
import Tutorial from '../screen/Tutorial/Tutorial';
import TwoFactAuth from '../screen/TwoFactAuth/TwoFactAuth';
import AddBank from '../screen/SettingsTabScreens/AddBank/AddBank';
import Forgot from '../screen/ForgotAndReset/Forgot';
import Reset from '../screen/ForgotAndReset/ResetPassword';
import GoogleAuth from '../screen/SettingsTabScreens/GoogleAuth'
import SMSAuth from '../screen/SettingsTabScreens/SMSAuth/SMSAuth';
import Login2fa from '../screen/login/Login2fa'
import GoogleAuthLogin from '../screen/login/GoogleAuthLogin/GoogleAuthLogin';
import SMSAuthLogin from '../screen/login/SMSAuthLogin/SMSAuthLogin'
import Reviewpurchage from '../screen/BuySell/ReviewPurchage'
import Deposite from '../screen/SettingsTabScreens/Deposite';
import Ticket from '../screen/SettingsTabScreens/Ticket';
const renderHeaderBlank = (params, Back) => {
    return (<View></View>)
}

function AuthNavigator({ navigation, route }) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
            <Stack.Screen name="Login2fa" options={{ headerShown: false }} component={Login2fa} />
            <Stack.Screen name="GoogleAuthLogin" options={{ headerShown: false }} component={GoogleAuthLogin} />
            <Stack.Screen name="SMSAuthLogin" options={{ headerShown: false }} component={SMSAuthLogin} />
            <Stack.Screen name="Tutorial" options={{ headerShown: false }} component={Tutorial} />
            <Stack.Screen name="TwoFactAuth" options={{ headerShown: false }} component={TwoFactAuth} />
            <Stack.Screen name="Multilanguage" options={{ headerShown: false }} component={Multilanguage}/>
            <Stack.Screen name="UserInfo" options={{ headerShown: false }} component={UserInfo} />
            <Stack.Screen name="FaQrcode" options={{ headerShown: false }} component={FaQrcode} />
            <Stack.Screen name="GoogleAuth" options={{ headerShown: false }} component={GoogleAuth} />
            <Stack.Screen name="SMSAuth" options={{ headerShown: false }} component={SMSAuth} />
            <Stack.Screen name="AddToken" options={{ headerShown: false }} component={AddToken} />
            <Stack.Screen name="AddBank" options={{ headerShown: false }} component={AddBank} />
            <Stack.Screen name="Anouncement" options={{ headerShown: false }} component={Anouncement} />
            <Stack.Screen name="AnnouncementItem" options={{ headerShown: false }} component={AnnouncementItem} />
            <Stack.Screen name="TermsAndCondition" options={{ headerShown: false }} component={TermsAndCondition} />
            <Stack.Screen name="Forgot" options={{ headerShown: false }} component={Forgot} />
            <Stack.Screen name="Reset" options={{ headerShown: false }} component={Reset} />
            {/* <Stack.Screen name="NativeCurrency" options={{ headerShown: false }} component={NativeCurrency} /> */}
            
            <Stack.Screen name="Reviewpurchage" options={{ headerShown: false }} component={Reviewpurchage} />
            <Stack.Screen name="logged" options={{ headerShown: false }} component={SideDrawer} />
        </Stack.Navigator>
    )
}
function ProfileStack({ navigation, route }) {
    return (
        <StackProfile.Navigator initialRouteName="Profile">
            <StackProfile.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
            <StackProfile.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePassword} />
            <StackProfile.Screen name="KYCList" options={{ headerShown: false }} component={KYCList} />
            <StackProfile.Screen name="NativeCurrency" options={{ headerShown: false }} component={NativeCurrency} />
            <StackProfile.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfile} />
            <StackProfile.Screen name="BankDetils" options={{ headerShown: false }} component={BankDetils} />
            <StackProfile.Screen name="Deposite" options={{ headerShown: false }} component={Deposite} />
            <StackProfile.Screen name="Ticket" options={{ headerShown: false }} component={Ticket} />
            
            <StackProfile.Screen name="Security" options={{ headerShown: false }} component={Security} />
        </StackProfile.Navigator>
    )
}
function WalletStck({ navigation, route }) {
    return (
        <StackWallet.Navigator initialRouteName="wallet">
            <StackWallet.Screen name="wallet" options={{ headerShown: false }} component={wallet} />
            <StackWallet.Screen name="Transaction" options={{ headerShown: false }} component={Transaction} />

        </StackWallet.Navigator>
    )
}
function HomeStack({ navigation, route }) {
    return (
        <HomeStackList.Navigator initialRouteName="Home">
            <HomeStackList.Screen name="Home" options={{ headerShown: false }} component={Home} />
            {/* <HomeStackList.Screen name="NativeCurrency" options={{ headerShown: false }} component={NativeCurrency} /> */}
           

        </HomeStackList.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function SideDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false, }}
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="TabScreen" component={TabNav} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="EditProfile" component={EditProfile} />
            <Drawer.Screen name="CustomToken" component={CustomToken} />
            <Drawer.Screen name="TermsAndCondition" component={TermsAndCondition} />
            <Drawer.Screen name="Policy" component={Policy} />
            <Drawer.Screen name="FAQs" component={FAQs} />
            <Drawer.Screen name="Support" component={Support} />
            <Drawer.Screen name="Multilanguage" component={Multilanguage} />
            <Drawer.Screen name="NativeCurrency" component={NativeCurrency} />

            <Drawer.Screen name="KYC" options={{ headerShown: false }} component={KYC} />
        </Drawer.Navigator>
    )

}


function TabNav() {
    return (


        <Tab.Navigator initialRouteName="HomeScreen"
            screenOptions={({ route }) =>
                ({

                    tabBarIcon: ({ focused, color, size }) => {

                        let iconName;
                        // console.log("route==>", route.name)
                        if (route.name === 'HomeStack') {
                            return <IconComponent
                                containViewStyle={[{ marginTop: focused ? hp(-5) : null }]}
                                imgStyle={[focused ? { width: wp(23), height: hp(12) }
                                    : {
                                        width: wp(10), height: hp(5),
                                        resizeMode: 'contain', alignSelf: 'center'
                                    }]}
                                source={focused ? HomeActive : HomeInactive} />
                        }
                        if (route.name === 'Wallet') {
                            return <IconComponent
                                containViewStyle={[{ marginTop: focused ? hp(-5) : null }]}
                                imgStyle={[focused ? { width: wp(23), height: hp(12) }
                                    : {
                                        width: wp(10), height: hp(5),
                                        resizeMode: 'contain', alignSelf: 'center'
                                    }]}
                                source={focused ? WalletActive : WalletInactive} />
                        }


                        if (route.name === 'Trading') {
                            return <IconComponent
                                containViewStyle={[{ marginTop: focused ? hp(-5) : null }]}
                                imgStyle={[focused ? { width: wp(23), height: hp(12) }
                                    : {
                                        width: wp(10), height: hp(5),
                                        resizeMode: 'contain', alignSelf: 'center'
                                    }]}
                                source={focused ? TradeActive : TradeInactive} />
                        }

                        if (route.name === 'Profile') {
                            return <IconComponent
                                containViewStyle={[{ marginTop: focused ? hp(-5) : null }]}

                                imgStyle={[focused ? { width: wp(23), height: hp(12) }
                                    : {
                                        width: wp(10), height: hp(5),
                                        resizeMode: 'contain', alignSelf: 'center'
                                    }]}
                                source={focused ? ProfileActive : ProfileInactive} />
                        }
                    },
                })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'grey',
                // showIcon: true,
                showLabel: false,
                // showLabel: true,

                style: {
                    // borderTopColor: 'black',
                    // backgroundColor:'rgb(44, 220, 173)',
                    borderTopLeftRadius: 17,
                    borderTopRightRadius: 17,
                    height: hp(10),
                    position: 'absolute',
                }
            }}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="Wallet" component={WalletStck} />
            <Tab.Screen name="Trading" component={BuySell} />
            <Tab.Screen name="Profile" component={ProfileStack} />

        </Tab.Navigator>

    )
}

function AuthToHome() {
    return (
        <NavigationContainer independent={true}>
            <AuthNavigator />
        </NavigationContainer>
    )
}
export default AuthToHome;
