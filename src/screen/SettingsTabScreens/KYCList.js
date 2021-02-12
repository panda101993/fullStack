
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet,Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { dashboardbg } from '../../../assets/icon'
// import { fontStyle, Colors } from '../../../commomStyle/commonStyle'
import { CustomHeader } from '../../components/header'
import { back ,BtnBg} from '../../assets/icon';
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage';
// import {Loader} from "../../../commonComponents/loader"
// import { connect } from 'react-redux'
const KYCList_DATA = [
    {
        Name: "Nishtha Mishra",
        Date: "02/02/20",
        Rejected_Reason: "Not Approved",
        Document_Name: ['png1', 'png2'],
        Status: 'Pending'
    },
    {
        Name: "Nishtha Mishra",
        Date: "02/02/20",
        Rejected_Reason: "Not Approved",
        Document_Name: ['png1', 'png2'],
        Status: 'Rejected'
    },
]
export default class KYCList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            KycList:"",
            isLoading:false,
            token:''
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('token').then(resp => {
          this.setState({
            token: resp
          })
          this.KycDetailsApi()
        }
        )
      }

    // componentDidMount(){
    //     this.KycDetailsApi()
    //     this.AccountDetailsApi()
    // }
  
    // AccountDetailsApi() {
    //     ApiRequest('', "account/my-account", "GET", `Bearer ${this.props.Token}`)
    //         .then(async resp => {
    //             switch (resp.status) {
    //                 case (200): {
    //                    this.setState({name:resp.data.data.firstName})
    //                     break;
    //                 }
    //                 default: {
    //                     this.setState({ isLoading: false })
    //                 }
    //                     break;
    //             }
    //         })
    // }

    KycDetailsApi() {
        this.setState({isLoading:true})  
      
        Api(this.state.token, "account/get-kyc-details", "GET")
            .then(async resp => {
                console.log("resp===>>>", resp)
                console.warn("resspp==>>",resp)
                switch (resp.data.status) {
                    case (900): {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                "Please check your internet connection",
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        }, 200);
                        break;
                    }
                    case (200): {
                        this.setState({isLoading:false})
                        this.setState({KycList:resp.data.data.document})
                        // setTimeout(() => {
                        //     Alert.alert(
                        //         '',
                        //         resp.data.message,
                        //         [
                        //             { text: 'OK', onPress: () => console.log('OK Pressed') },
                        //         ],
                        //         { cancelable: false },
                        //     );
                        // }, 200);
                       
                        break;
                    }
                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                "undefined",
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        }, 200);

                    }
                        break;
                }

            })
    }

      dateHandler =(dateItem) =>{
          console.log(dateItem)
          let d = new Date(dateItem.split(".")[0]);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const a = d.getDate()
        const b = months[d.getMonth()]
        const c = d.getFullYear()
        const e = a+" "+b+", "+c
        console.log(e)
       
          return( e )
       }

       kycList = (item, index) => {
        return (
            <View style={[styles.CardContainer,{flexDirection:'row'}]}>
            <View>
            {/* <Loader
              visible={this.state.isLoading}></Loader> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View><Text style={[styles.TextStyle, ]}>   {item.Name}   </Text></View>
                           </View>

                <View style={{ flexDirection: 'column', marginTop: hp('2%') }}>
                    <View><Text style={[styles.TextStyle, ]}>   Rejected Reason </Text></View>
                    <View><Text style={[styles.TextStyle, {fontSize:14},{marginHorizontal:wp(1)}]}>   {item.reason==null?"Not rejected yet":item.reason }     </Text></View>
                    <View><Text style={[styles.TextStyle,{marginHorizontal:wp(0)}]}>   Document Name     </Text></View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between',ali:'flex-end' }}>
                    <View style={{left:9}}><Text style={[styles.TextStyle, {fontSize:14},]}> {item.docName}</Text></View>
                                  </View>
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                <View style={{left:50}}><Text style={[{ fontSize: 14,paddingHorizontal:12,marginRight:10, }, ]}> 
                {/* {`Upload Date - ${this.dateHandler(item.updateTime)}`}  */}
                 {`Upload Date - ${item.updateTime.split('T')[0]}`} 
            
                </Text></View>
                    <View style={{ alignSelf: 'flex-end', marginRight:wp(-2), top: hp(4),}}>
                        <ImageBackground resizeMode='contain' source={BtnBg} style={{ height: hp('5%'),width:wp('35%') ,alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={[{ fontSize: 18, textAlign: 'center',color:'white', justifyContent:'center'  },]}>
                            {item.documentStatus} </Text>
                        </ImageBackground>
                    </View>
                </View>

            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1,  }}>
             <CustomHeader text1={"KYC List"} source1={back }  onPress1={()=>this.props.navigation.goBack()} />
                <View style={{ flex: 1, }}>

                        <FlatList
                                data={this.state.KycList}
                                renderItem={({ item, index }) => this.kycList(item, index)}
                                keyExtractor={
                                    (index) => { return index }
                                }
                            />
                </View>
            </SafeAreaView>
        )
    }


}

const mapStateToProps = state => {

    return {
        Token: state.AuthReducer.Token,
    }
}
// export default connect(mapStateToProps,
// )(KYCList);


const styles = StyleSheet.create({

    TextStyle: {
        // color: '#ffff',
        fontSize: 16,
        marginVertical: hp('0.4%')
    },
    CardContainer: {
        marginVertical: hp('2%'),
        marginHorizontal: wp('2%'),
        paddingVertical: hp('2%'),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(42, 210, 170, 1)'
    }
})