import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomHeader } from '../../components/header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Searchicon } from '../../../assets/icon'
// import { fontStyle, Colors } from '../../../commomStyle/commonStyle';
import AsyncStorage from "@react-native-community/async-storage"
import { back, drawer, searchIcon2 } from '../../assets/icon';

const Currencies = [
  {
    id: 0,
    Name: 'Chinese Yuan',
    Sub_Name: 'CNY'
  },
  {
    id: 1,
    Name: 'Euro',
    Sub_Name: 'Eur'
  },
  {
    id: 2,
    Name: 'Japanese Yen',
    Sub_Name: 'JPY'
  },
  {
    id: 3,
    Name: 'Russian Ruble',
    Sub_Name: 'RUB'
  },
  {
    id: 4,
    Name: 'United State Dollar ',
    Sub_Name: 'USD'
  },
  {
    id: 5,
    Name: 'British Pound Sterling ',
    Sub_Name: 'BPS'
  },
  {
    id: 6,
    Name: 'Chinese Yuan',
    Sub_Name: 'CNY'
  },
  {
    id: 7,
    Name: 'Chinese Yuan',
    Sub_Name: 'CNY'
  },
  {
    id: 8,
    Name: 'Chinese Yuan',
    Sub_Name: 'CNY'
  },
  {
    id: 9,
    Name: 'British Pound Sterling ',
    Sub_Name: 'BPS'
  },

];



const DATA = [
  {
    id: 0,
    Name: 'United State Dollar ',
    Sub_Name: 'USD'
  },
  {
    id: 1,
    Name: 'Euro',
    Sub_Name: 'Eur'
  },
];





export default class NativeCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Currencies: [

        {
          id: 0,
          Name: 'Euro',
          Sub_Name: 'Eur'
        },
        {
          id: 1,
          Name: 'United State Dollar ',
          Sub_Name: 'USD'
        },

      ],
      isRefresh: false,
      CurrName:''

    };
  }

  SearchCurrencies = (text) => {

    let Serched_list =
      DATA.filter(item => (item.Name.toLowerCase().includes(text.toLowerCase())) ? item : null)
    console.log("Serched_list=>>>", Serched_list)

    this.setState({ isRefresh: !this.state.isRefresh })
    this.setState({ Currencies: Serched_list })


  }
  OnSuccessNav=  (item,index) =>{
    AsyncStorage.setItem('CurrencyName', (item.Sub_Name))
       this.props.navigation.navigate("Profile"), { item: item.Sub_Name }
        }
  

  Currencies = (item, index) => {
    return (
      <View style={styles.item}>

        <TouchableOpacity onPress={() => 
          this.OnSuccessNav(item)
            }>

          <Text style={[styles.TextStyle]} >{item.Name}</Text>
          <Text style={[styles.TextStyle2]} >{item.Sub_Name}</Text>
        </TouchableOpacity>

      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1, }}>
        <StatusBar Color='rgba(42, 210, 170, 1)' />
        <SafeAreaView style={{
          flex: 1,
          // backgroundColor: 'rgba(42, 210, 170, 1)'
        }}
        >
          <CustomHeader text1={"Select Currency"} source1={back} onPress1={() => this.props.navigation.goBack()} />
          <View style={{ backgroundColor: 'white' }}>
            <View style={styles.backgroundStyle}>
              <Image source={searchIcon2} style={styles.iconstyle} />
              <TextInput
                autoCorrect={false}
                style={styles.textInputStyle}
                placeholder="Search Currency"
                maxLength={30}
                // placeholderTextColor={Colors.lightGrey}
                onChangeText={(text) => this.SearchCurrencies(text)}
              />
            </View>
          </View>
          <FlatList
            data={this.state.Currencies}
            renderItem={({ item, index }) => this.Currencies(item, index)}
            extraData={this.state.isRefresh}
            keyExtracter={
              (index) => { return index }}
          />
        </SafeAreaView>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  backgroundStyle: {
    flexDirection: 'row',
    alignSelf: "center",
    height: hp(5.5),
    marginVertical: wp(5),
    paddingVertical: wp(7),
    width: wp(85),
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.2,
    // borderColor: Colors.light,
  },
  iconstyle: {
    width: 24,
    height: 24,
    marginHorizontal: 15,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  textInputStyle: {
    alignSelf: 'center',
    height: hp(10),
    width: wp('80%'),
    fontSize: 16
  },
  item: {
    margin: 1,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderTopColor: 'grey',
    backgroundColor: 'white'

  },
  textField: {
    alignSelf: "center",
    height: hp(5.5),
    marginVertical: wp(10),
    paddingVertical: wp(7),
    width: wp(85),
    backgroundColor: 'rgb(39,38,46)',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  TextStyle: {
    color: 'black',
    fontSize: 15,
    marginHorizontal: wp(5),
    marginVertical: wp(2)

  },
  TextStyle2: {
    // color: Colors.lightGrey,
    fontSize: 15,
    marginHorizontal: wp(5),
    marginBottom: wp(2),
    marginVertical: wp(-1)


  },
})