/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { Text, StyleSheet,  SafeAreaView,View } from 'react-native'
import Login from './src/screen/login/login'
import Navigator from './src/navigation/navigation'
import GeneralStatusBarColor from './src/commonComponents/StatusBAR'
import FingerprintPopup from './src/module/IosModuleBio'
export default class App extends Component {
  render() {
    return (
    //   <SafeAreaView style={{ flex: 1 }}>
    //      <Navigator />
    // </SafeAreaView>
    <SafeAreaView style={{ flex: 1 }}>
        <GeneralStatusBarColor backgroundColor="#ffff"
          barStyle="dark-content" />
        <Navigator />
        {/* <FingerprintPopup/> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({})
