import React from 'react';
import { View, StatusBar,Platform,StyleSheet } from 'react-native';
// import styles from './styles/GeneralStatusBarColorStyles';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
export default GeneralStatusBarColor;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
        },
        statusBar:{
           
        }
})