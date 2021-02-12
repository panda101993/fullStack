import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,View,ScrollView, SafeAreaView, Image } from 'react-native'
import { dynamicSize } from '@utils/dynamicSize'
import {Calendar,applogo,tutorialImage,back,qrCode,largeButton} from '@assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '@components/button'
import { CustomHeader } from '@components/header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TEALDARK } from '@utils/colors'
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get("window")

export default class Tutorial extends Component {

    constructor(props){
        super(props)
        this.state={
          TwoFAtype:'',
             slides:[
                {
                  key: 1,
                  title: 'Import Recent Test Results',
                  text: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  image: tutorialImage,
                  backgroundColor: '#59b2ab',
                },
                {
                  key: 2,
                  title: 'Verify and Validate Status',
                  text: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  image: tutorialImage,
                  backgroundColor: '#febe29',
                },
                {
                  key: 3,
                  title: 'Private and Secure Platform',
                  text: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  image: tutorialImage,
                  backgroundColor: '#22bcb5',
                },
                {
                  key: 4,
                  title: 'Title',
                  text: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  image: tutorialImage,
                  backgroundColor: '#22bcb5',
                }
              ]
        };
    };


    componentDidMount() {
      this.userCredentials()
  
    }
    async userCredentials(){
      AsyncStorage.getItem('2fatype').then(resp => {
        // console.log(resp)
        this.setState({TwoFAtype: resp})
      })
    }
    _renderItem = ({ item }) => {
        return (
          <View style={{height:hp(70),width:wp(80),alignSelf:'center',justifyContent:'center'}}>
            {/* <AppText style={styles.titlstyle}>{item.title}</AppText> */}
            <Image style={{ height: hp(60),width:wp(50),alignSelf:'center'}} resizeMode="contain" source={item.image} />
            <Text style={{alignSelf:'center',
              marginVertical:5,
              fontSize:dynamicSize(14),
              textAlign:'center'
            }}>{item.text}</Text>
          </View>
        );
      }
      handleClick(){
          if (this.state.TwoFAtype == 'NONE') {
                        this.props.navigation.navigate('Login2fa')
                    }
                    else if (this.state.TwoFAtype == 'SKIP') {
                        this.props.navigation.navigate('logged')
                    }
                    else if (this.state.TwoFAtype == 'GOOGLE') {
                        this.props.navigation.navigate('GoogleAuthLogin', { data: '1' })
                    }
                    else if (this.state.TwoFAtype == 'SMS') {
                        this.props.navigation.navigate('SMSAuthLogin', { data: '2' })
                    }
                   
      }
    render() {
        return (
            <SafeAreaView style={{flex:1}} >
                 <ScrollView style={{ flex: 1 }}
                 showsVerticalScrollIndicator={false}
                 backgroundColor="white"
                 >
                <View style={{marginTop:hp(7)}}>
                    <Text style={{color:TEALDARK,
                        fontWeight:'bold',
                        alignSelf:'center',
                        fontSize:dynamicSize(25) }}>
                        About Alende
                    </Text>
                </View>
                <View style={{height:hp(80),width:wp(90),alignSelf:'center',justifyContent:"center"}}>
                <AppIntroSlider
          dotStyle={{ backgroundColor: 'rgb(133, 224, 224)', }}
          activeDotStyle={{ backgroundColor: 'rgb(0, 175, 155)' }}
          renderItem={this._renderItem} nextLabel={false}
          doneLabel={false} data={this.state.slides} />
                </View>
           
                <View style={{alignSelf: 'center', alignItems: 'center', }} >
                            <CustomButton 
                             onPress={()=>this.handleClick()}
                            mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center',}}
                            contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                            textStyle={{  alignSelf: 'center', marginTop: hp(-1) }}
                            image={largeButton} 
                            title='Next' />
                        </View>
                        </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        marginVertical:dynamicSize(15),
        // justifyContent:'center',
        alignSelf:'center',
        width:width-dynamicSize(30),
        // backgroundColor:'red'
    },
    
})
