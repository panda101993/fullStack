

import React, { Component } from 'react';

import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { getFontSize, dynamicSize } from '../../utils/dynamicSize';
import { TEALDARK } from '@utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window');
export default class Login2fa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      visible: true,
      isLoading: false,
      modalVisible: true
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(resp => {
      this.setState({
        token: resp
      })
    }
    )
  }

  skip = () => {
    Api(this.state.token, "account/skip-twoFa", "GET")
      .then(rep => {

        if (rep.status == 200) {

          AsyncStorage.setItem("Security", "SKIP")
          this.setState({
            modalVisible: false
          }, () => this.props.navigation.navigate('logged'))


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

  google_auth = () => {
    this.setState({
      modalVisible: false
    }, () => this.props.navigation.navigate('GoogleAuthLogin', { data: '1' }))
  }

  sms_verification = () => {
    this.setState({
      modalVisible: false
    }, () => this.props.navigation.navigate('SMSAuthLogin', { data: '2' }))
  }




  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType="fade"
          transparent={true}

          visible={this.state.modalVisible}
          onRequestClose={() => {
            //   Alert.alert('Modal has been closed.')
          }}>
          <View style={styles.Container2}>

            {/* <ImageBackground
                      resizeMode='contain'
                      // source={LogoutModalIcon}
                      style={[{
                          alignItems: 'center',
                          // backgroundColor: 'rgb(11, 10, 38)',
                          height: hp("40%"),
                          width: wp('95%'),
                      }]}> */}
            <View style={[{
              flexDirection: 'column', alignItems: 'center',
              borderWidth: 2,
              height: hp(50),
              borderColor: TEALDARK,
              backgroundColor: 'white',
              width: wp('96%'),
            }, , this.props.imagebgstyle]}>

              <Text style={{ color: TEALDARK, fontSize: 25, marginVertical: hp(4) }}>{"Do you want to enable 2FA ?"}</Text>
              {/* <Text style={[{ color: 'black', fontSize: 18, marginTop: hp('3%') }, this.props.bodyStyle]}>{this.props.body}</Text> */}


              <TouchableOpacity onPress={this.skip}
                style={[styles.btnStyle]} >

                <Text style={[styles.textStyle,]}>
                  Skip
                                      </Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={this.google_auth}
                style={[styles.btnStyle]} >

                <Text style={[styles.textStyle,]}>
                  Google Auth
                                      </Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={this.sms_verification}
                style={[styles.btnStyle]} >

                <Text style={[styles.textStyle,]}>
                  SMS Verification
                                      </Text>

              </TouchableOpacity>

            </View>
            {/* </ImageBackground> */}
          </View>
        </Modal>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  mainContainer: {
    // height:height
    // justifyContent: "center",

    // alignItems: "center",


  }, Container2: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    //  height:hp("50%"),
    alignSelf: 'center',
    width: wp("100%"),
    backgroundColor: 'rgb(0, 0, 3)',
    opacity: 0.85,

  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    marginVertical: hp(2),
    marginHorizontal: hp(2),
    backgroundColor: TEALDARK,
    borderRadius: 20,
    width: wp(50),
    paddingVertical: wp(4),
    backgroundColor: TEALDARK,
    borderColor: TEALDARK,
    borderWidth: 2,
    // height: hp('7%'),
  },
  btnStyle2: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    marginVertical: hp(2),
    marginHorizontal: hp(2),

    borderColor: TEALDARK,
    borderWidth: 2,
    borderRadius: 20,
    width: wp('35%'),
    paddingVertical: wp(4),

  },
  textStyle: {
    alignSelf: 'center',
    fontSize: dynamicSize(17),
    color: "white",
    fontWeight: '700'
  },
  buttonStyle: {
    paddingVertical: wp(2),
    // paddingHorizontal:wp
    // 20% of height device screen
    width: wp(85),
    height: hp(8),
    alignSelf: "center",
    borderRadius: 25,
  }

})