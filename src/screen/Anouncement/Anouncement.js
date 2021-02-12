import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, TextInput, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '../../components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import {
  Calendar, roundButton, searchIcon,
  roundedButton3, ArrowDropDown, back,
  ethIcon,
  homebtn, largeButton, imageAvtar
} from '@assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import styles from './styles'
import { TEALDARK } from '@utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Anouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  renderdata(item, index) {
    return (
      <TouchableOpacity 
      onPress={()=>this.props.navigation.navigate('AnnouncementItem')}
      style={styles.cardViewStyle}>
        <View>
          <Text style={{fontWeight:'bold',fontSize:dynamicSize(15)}}>Latest Release:</Text>
        </View>
        <View>
          <Text style={{fontSize:dynamicSize(14)}}>
            Latest application has been upgraded . Please update the latest application
                          </Text>
        </View>
        <View style={{alignSelf:"flex-end"}}>
          <Text style={{color:'grey',fontSize:dynamicSize(12)}}>16-March-2020</Text>
        </View>

      </TouchableOpacity>
    )
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
          </KeyboardAwareScrollView>
        </ScrollView>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={({ item, index }) => this.renderdata(item, index)}
          keyExtracter={(index) => { return index }}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    );
  }
}
