import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity,ScrollView,
      View, ImageBackground, Image, Dimensions, FlatList,Clipboard,ToastAndroid } from 'react-native';
import { dynamicSize, getFontSize } from '../../../utils/dynamicSize';
import Api from '../../../api/Api'
// import { CardComponent } from '../component/cardComponent';
import { CustomHeader } from '../../../components/header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { back } from '../../../assets/icon';
import {
    sendIcon,
    btcIconBorder, transHistoryIcon,
    btcIcon, cardBgBTC,
    cardBgETH,
    AlendeSquare,
    Sent,Received,
    roundedRectShadow, rondedRectangle, bankIcon,
    buySellConvert, buySellTick, buySellWallet, largeButton,
    applogo, graphBg, cardBgLite,copyIcon,customToken,
    drawerIconGreen, tradeFlatlistBg, buSellFlatlistBg,
    notifIconGreen, buySellToggleBg, tradeTransactionBg
} from '@assets/icon'
const { width, height } = Dimensions.get('window');
export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            allView:true,
            receivedView: false,
            sentView: false,
            FlatList1: [
                {
                    sNo: '1',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '2',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '3',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '4',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '5',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '6',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '7',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '8',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '9',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '10',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '11',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
                {
                    sNo: '12 ',
                    documentName: "DOC 1",
                    rejectReason: 'Not Approved',
                    status: 'pending'
                },
            ],
            data:[],
            receivedList:[],
            sentList:[],
            value: 0,
            token: '',
            completeBalance: [],
            amountname: 'BTC',
            renderList:[],
            coinbalance: '',
            usdamountvalue: '',
            marketPriceInUsd: '',
            coinwalletamount: '',
            buyfee: '',
            sellfee: '',
            coinname: '',
            time: ''
        }
    }
    componentDidMount = () => {
        this.setState({
            coinname: "BTC"
        })
        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp,
            })
            
            this.transactionHistory(resp)
        })

         

    }
    CopyClipBoard(item){
        Clipboard.setString(item)
       alert("Copied to clipboard")
        
    }


transactionHistory(token){

    Api(token, `wallet/wallet/get-all-transaction-history`, "GET")
            .then(resp => {
                console.log("Transaction History ===>",resp)
                if (resp.data.status == 200) {
                    
                     this.setState({
                        isLoading: false,
                        data: resp.data.data
                    })
                  let receivedList = resp.data.data.filter((item,index)=>{
                      return item.txnType==='DEPOSITE'
                   })
                   let sentList = resp.data.data.filter((item,index)=>{
                    return item.txnType==="WITHDRAW"
                 })
                 this.setState({receivedList:receivedList,sentList:sentList},()=>this.allView())
                   
                 console.log("receivedList===>",receivedList) 
                 console.log("sentList===>",sentList) 
                }
                else {
                    this.setState({
                        isLoading: false,
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 200);
                }
            })
}



    allView = () => {
        this.setState({
            allView:true,
            sentView: false,
            isLoading: true,
            receivedView: false,
            renderList:this.state.data
        })
    }

    //  copyToClipboard (item)  {
    //     Clipboard.setString(item)
    //   }

    sentView = () => {
        this.setState({
            sentView: true,
            isLoading: true,
            receivedView: false,
            allView:false,
            renderList:this.state.sentList
        })
    }

    receivedView = () => {
        this.setState({
            allView:false,
            receivedView: true,
            isLoading: true,
            sentView: false,
            renderList:this.state.receivedList
        })
    }


    renderdata = (item, index) => {
        console.log("ITEM",item)
        var d = `${item.txnTime}`
            d = d.split("T")
            d=d[0].split("-")
            let monthIndex=d[1]
            if(d[1].charAt(0)==0) monthIndex=d[1].charAt(1)
            //   console.log("date===>",monthIndex)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
         const dateConverted =  d[2]+ " " + months[monthIndex-1] + ", " + d[0]
        // console.log("date fom api",item.txnTime,"date converted===>",dateConverted)
              const receiveSent = item.txnType==='WITHDRAW'?"Sent":"Received"
              const receiveSentIcon = item.txnType==='WITHDRAW'?Sent:Received
              const statusIcon = item.status==='CONFIRM'?btcIcon:AlendeSquare
              const status = item.status==='CONFIRM'?'Confirmed':'Pending'
              const units = item.txnType==='WITHDRAW'?`-${item.units}`:`+${item.units}`
          return (
              <View style={{
                  marginVertical: hp(1),
                  width: wp(90), alignSelf: "center",
                  backgroundColor: 'white',
                  borderRadius: wp(2),
                  shadowColor: 'black',
                  shadowOffset: { width: 2, height: 2 },
                  shadowRadius: 5,
                  shadowOpacity: 1,
                  elevation: 9,

              }}>
                  <View style={{ padding: 8,flexDirection:'row',justifyContent:'space-around' }}>
                      {/* <Text style={{ fontWeight: 'bold' }}>
                          Latest Release:
                         </Text> */}
                         <View style={{width:wp(80/6),alignSelf:'center'}}>
                         <Text style={{width:wp(80/6),alignSelf:'center',textAlign:"center",fontWeight: 'bold'}}>{d[2]}</Text>
                         <Text style={{width:wp(80/6),alignSelf:'center',color:'grey',textAlign:"center",fontWeight: 'bold'}}>{months[monthIndex-1]}</Text>
                         </View>
                         <View style={{width:wp(80/6),alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                         <Image style={{height:hp(4),width:wp(10)}} source={receiveSentIcon}  resizeMode="contain"/>
                         <Text style={{width:wp(80/6),fontSize:10,alignSelf:'center',color:'grey',textAlign:"center"}}>{receiveSent}</Text>
                         </View>
                         <View style={{width:wp(80/6),alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                         <Image style={{height:hp(4),width:wp(10)}} source={statusIcon}  resizeMode="contain"/>
                         <Text style={{width:wp(80/6),fontSize:10,alignSelf:'center',color:'grey',textAlign:"center"}}>{status}</Text>
                         </View>
                         <View style={{width:wp(80/6),alignSelf:'center',alignItems:'space-between',justifyContent:'center'}}>
                         <Text style={{width:wp(80/6),fontSize:12,fontWeight:'bold',alignSelf:'center',marginVertical:hp(1),
                         color: item.txnType==='WITHDRAW'?'red':'rgb(43,215,172)',
                         textAlign:"center"}}>{units}</Text>
                         <Text style={{width:wp(80/6),fontSize:10,alignSelf:'center',color:'grey',textAlign:"center"}}>{"Amount"}</Text>
                         </View>
                         <View style={{width:wp(80/6),alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                          <Text style={{
                              width: wp(80 / 6), fontSize: 20, alignSelf: 'center',
                              color: 'black', fontWeight: 'bold',
                              textAlign: "center"
                          }}>{item.coinType}</Text>
                         <Text style={{width:wp(80/6),fontSize:10,alignSelf:'center',color:'grey',textAlign:"center"}}>{"Token"}</Text>
                         </View>
                         <View style={{width:wp(80/6),alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                         <TouchableOpacity onPress={() => this.CopyClipBoard(item.txnHash)}>
                         <Image style={{height:hp(4),width:wp(10)}} source={copyIcon}  resizeMode="contain"/>
                         </TouchableOpacity>
                         <Text style={{width:wp(80/6),fontSize:10,alignSelf:'center',color:'grey',textAlign:"center"}}>{"Copy hash"}</Text>
                         </View>
                  </View>
              </View>
          )}

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: dynamicSize(5), }}>
                    <TouchableOpacity style={{}} 
                    onPress={() => this.allView()}
                    >
                        {this.state.allView ?
                            <View style={{ 
                                height: hp(6), 
                            width: wp(32), 
                            borderRadius:10,
                            backgroundColor:"rgb(43,215,172)",
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
                                <Text style={{  
                                    fontWeight:'bold',
                                    fontSize: getFontSize(17),color:'white',textAlign:'center' }}>All</Text>
                            </View>
                            :
                            <View style={{ 
                                height: hp(6),
                              width: wp(32),
                              borderRadius:10,
                              backgroundColor:"white",
                              borderColor:'rgb(43,215,172)',
                              borderWidth:2,
                              justifyContent: 'center',
                              alignItems: 'center' }}>
                                <Text style={{ fontSize: getFontSize(16),
                                    textAlign:'center',
                                    color:'rgb(43,215,172)' }}>All</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} 
                    onPress={() => this.receivedView()}
                    >
                        {this.state.receivedView ?
                            <View style={{ 
                                height: hp(6), 
                            width: wp(32), 
                            borderRadius:10,
                            backgroundColor:"rgb(43,215,172)",
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
                                <Text style={{  
                                    fontWeight:'bold',
                                    fontSize: getFontSize(17),color:'white',textAlign:'center' }}>Received</Text>
                            </View>
                            :
                            <View style={{ 
                                height: hp(6),
                              width: wp(32),
                              borderRadius:10,
                              backgroundColor:"white",
                              borderColor:'rgb(43,215,172)',
                              borderWidth:2,
                              justifyContent: 'center',
                              alignItems: 'center' }}>
                                <Text style={{ fontSize: getFontSize(16),
                                    textAlign:'center',
                                    color:'rgb(43,215,172)' }}>Received</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => this.sentView()}>
                        {this.state.sentView ?
                             <View style={{ 
                                height: hp(6), 
                            width: wp(32), 
                            borderRadius:10,
                            backgroundColor:"rgb(43,215,172)",
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
                                <Text style={{  
                                    fontWeight:'bold',
                                    fontSize: getFontSize(17),color:'white',textAlign:'center' }}>Sent</Text>
                            </View>
                            :
                            <View style={{ 
                                height: hp(6),
                              width: wp(32),
                              borderRadius:10,
                              backgroundColor:"white",
                              borderColor:'rgb(43,215,172)',
                              borderWidth:2,
                              justifyContent: 'center',
                              alignItems: 'center' }}>
                                <Text style={{ fontSize: getFontSize(16),
                                    textAlign:'center',
                                    color:'rgb(43,215,172)' }}>Sent</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    
                    </View>

                    <FlatList
                            data={this.state.renderList}
                            renderItem={({ item, index }) => this.renderdata(item, index)}
                            keyExtracter={(index) => { return index }}
                            refreshing={this.state.refreshing}
                            nestedScrollEnabled
                            onRefresh={this._handleRefresh}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                        />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: height / 4.5,
        width: width,
        position: "relative"
    },
    headingText: {
        textAlign: 'center',
        paddingVertical: dynamicSize(10),
        fontSize: getFontSize(12),
        fontWeight: '600',
        color: '#ffffff'
    },
    flatListText: {
        textAlign: 'center',
        paddingVertical: dynamicSize(10),
        fontSize: getFontSize(12),
        fontWeight: '400',
        color: '#000000'
    },

});
