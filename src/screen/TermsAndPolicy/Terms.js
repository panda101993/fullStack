import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomHeader } from '../../components/header';
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage';
import { back } from '../../assets/icon';
import HTML from 'react-native-render-html';
export default class TermsAndCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: ''
    };
  }
  componentDidMount() {
    this.TermsData()
  }

  TermsData = () => {
    Api(this.state.token, "static/get-static-page-data?pageKey=Terms%20And%20Condition", "GET")
      .then(rep => {

        if (rep.status == 200) {

          this.setState({
            pageData: rep.data.data.pageData,
          })
          this.setState({

            modalVisible: false,
          },

          )
        }
        else if (rep.status == 400) {
          setTimeout(() => {
            alert(rep.data.message)
          }, 100);

        }
        else {
          setTimeout(() => {
            alert(rep.data.message)
          }, 101);

        }
      })
  }


  render() {
    return (
      <View style={styles.container}>

        <CustomHeader text1={"Terms & Conditions"} source1={back} onPress1={() => this.props.navigation.goBack()} />
        <ScrollView style={{ flex: 1, }}>

          <View style={styles.ContainerForText}>
            <HTML html={this.state.pageData} baseFontStyle={styles.termsText}/>
          </View>

        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'white',
  },
  ContainerForText: {
    alignSelf: 'center',
    width: wp('90%'),
    marginVertical: 10,
    justifyContent: 'center',
  },
  termsText: {
    // color: Colors.grey,
    fontSize: 16,
    fontWeight: '700'
  }
})