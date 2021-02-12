import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableOpacity, ScrollView,
    Clipboard, View, ImageBackground, Image, Dimensions, FlatList
} from 'react-native';
import { dynamicSize, getFontSize } from '../../utils/dynamicSize';
import Api from '../../api/Api'
// import { CardComponent } from '../component/cardComponent';
import { CustomHeader } from '../../components/header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { back } from '../../assets/icon';
const { width, height } = Dimensions.get('window');
const dateConverted = '', t2 = ''
export default class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            withdrawView: true,
            depositeView: false,
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
            data: [{
                Date: "12/12/2020",
                Amount: '15151512',
                Txn: '212121545454545454', status: 'aprove'
            }],
            value: 0,
            token: '',
            completeBalance: [],
            amountname: 'BTC',
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
        console.log(this.props.route.params)
        // this.setState({
        //     coinname: this.props.route.params.coinname
        // })

        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp,
            })
            this.withdrawView()
        }
        )
    }
    renderItems = (item) => {
        console.log("renderItems===>", item)
        var d = `${item.creationTime}`
        d = d.split("T")
        d = d[0].split("-")
        let monthIndex = d[1]
        // if(d[1].charAt(0)==0) monthIndex=d[1].charAt(1)
        console.log("date===>", monthIndex)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateConverted = d[2] + " " + months[monthIndex - 1] + ", " + d[0]

        var t = `${item.creationTime}`
        t = t.split("T")
        let t2 = `${t[1]}`
        t2 = t2.substring(0, 8)

        return (
            <View style={{ flexDirection: 'row', alignSelf: 'center', borderWidth: 0.1, borderColor: "rgba(184,184,187,0.4)", justifyContent: 'center' }} >
                <View style={{ justifyContent: 'center', width: width / 3, borderWidth: dynamicSize(0.5), borderColor: "rgba(184,184,187,0.4)", }} >
                    <Text style={{ textAlign: 'center' }}>
                        {dateConverted}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                        {t2}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', width: width / 3, borderWidth: dynamicSize(0.5), borderColor: "rgba(184,184,187,0.4)", }} >
                    <Text style={{ textAlign: 'center', }}>

                        {item.amount}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', width: width / 2, borderWidth: dynamicSize(0.5), borderColor: "rgba(184,184,187,0.4)", }} >
                    <Text style={{ textAlign: 'center', }}>
                        {item.accountNo}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', width: width / 4, borderWidth: dynamicSize(0.5), borderColor: "rgba(184,184,187,0.4)", }} >
                    <Text style={{ textAlign: 'center', }}>
                        {item.status}
                    </Text>
                </View>
            </View>
            // <View style={{
            //     flexDirection: 'row', paddingVertical: dynamicSize(10),
            //     width: width - dynamicSize(30), alignSelf: "center"
            // }}>
            //     <Text style={{ width: width / 2 - dynamicSize(80), marginLeft: dynamicSize(5), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: 'black' }}>{time[0]}</Text>
            //     <Text style={{ width: dynamicSize(50), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: 'black' }}>{item.item.units}</Text>
            //     {item.item.txnHash == null ?
            //         <TouchableOpacity onPress={() => Clipboard.setString(item.item.txnHash)} >
            //             <Text style={{ width: width / 2 - dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: 'black' }}>N/A</Text>
            //         </TouchableOpacity>
            //         :
            //         <TouchableOpacity onPress={() => Clipboard.setString(item.item.txnHash)} >
            //             <Text style={{ width: width / 2 - dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: 'black' }}>{item.item.txnHash}</Text>
            //         </TouchableOpacity>
            //     }
            //     <Text style={{ width: dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: 'red' }}>{item.item.status}</Text>
            // </View>
        )
    }

    withdrawView = () => {
        this.setState({
            withdrawView: true,
            isLoading: true,
            depositeView: false
        })
        Api(this.state.token, `wallet/user/get-usdEuro-request-api`, "GET")
            .then(resp => {
                if (resp.data.status == 200) {
                    this.setState({
                        isLoading: false,
                        data: resp.data.data
                    })
                    console.log("DATA===>",this.state.data)
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
    depositeView = () => {

        this.setState({
            depositeView: true,
            isLoading: true,
            withdrawView: false
        })
        if (this.state.coinname == 'ETH' || this.state.coinname == 'XRP' || this.state.coinname == 'OMG' || this.state.coinname == 'XLM') {
            Api(this.state.token, `wallet/wallet-type2/get-deposits?page=0&pageSize=100&coinName=${this.state.coinname}`, "GET")
                .then(resp => {
                    if (resp.data.status == 200) {
                        console.log("depositView===>", resp.data.data.resultlist)
                        this.setState({
                            data: resp.data.data.resultlist
                        })
                        //
                        this.ethapi()
                    }
                    else if (resp.status == 400) {
                        this.setState({
                            isLoading: false,

                        })
                        setTimeout(() => {
                            alert(resp.data.message)
                        }, 200);
                    }
                    else {
                        this.setState({
                            isLoading: false,
                        })
                        setTimeout(() => {
                            alert(resp.data.message)
                        }, 201);
                    }
                })
        }
        else {
            Api(this.state.token, `wallet/wallet/get-deposits?page=0&pageSize=100&coinName=${this.state.coinname}`, "GET")
                .then(resp => {
                    if (resp.data.status == 200) {
                        this.setState({
                            isLoading: false,
                            data: resp.data.data.resultlist
                        })
                    }
                    else if (resp.status == 400) {
                        this.setState({
                            isLoading: false,
                        })
                        setTimeout(() => {
                            alert(resp.data.message)
                        }, 200);
                    }
                    else {
                        this.setState({
                            isLoading: false,
                        })
                        setTimeout(() => {
                            alert(resp.data.message)
                        }, 201);
                    }
                })
        }
    }


    ethapi = () => {
        Api(this.state.token, `wallet/wallet-type2/get-async-transfer?coinName=${this.state.coinname}`, "GET")
            .then(resp => {
                console.log("eth REsponse====>", resp)
                if (resp.data.status == 200) {

                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                        })
                    }, 100);
                }
                else if (resp.status == 400) {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                        })
                    }, 101);
                }
                else {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                        })
                    }, 102);
                }
            })
    }

    renderdata = ({ item, index }) => {
        return (
            <View style={{
                height: height / 4.5,
                width: width - dynamicSize(80),
                borderRadius: dynamicSize(5),
                justifyContent: 'center',
                alignItems: 'center',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 0.5, shadowRadius: dynamicSize(5),
                elevation: 5, shadowColor: item.colorCode
            }}>
                <ImageBackground
                    source={{ uri: item.walletBackgroundUrl }}
                    style={{
                        borderRadius: dynamicSize(10),
                        height: height / 4,
                        width: width - dynamicSize(100),
                        overflow: 'hidden', zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <View >
                        <View style={{ width: width - dynamicSize(100), marginTop: dynamicSize(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: item.coinImage }} style={{ height: dynamicSize(45), width: dynamicSize(45), marginLeft: dynamicSize(5) }} />
                                <Text style={{
                                    fontSize: getFontSize(18),
                                    fontWeight: '800',
                                    marginLeft: dynamicSize(10),
                                    color: item.colorCode
                                }}>{item.coinFullName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: getFontSize(12), }}> {item.coinShortName}</Text>
                                <Image source={{ uri: item.walletImageUrl }} style={{ height: dynamicSize(22), width: dynamicSize(24), marginLeft: dynamicSize(5) }} />
                                <Image source={{ uri: item.walletDotUrl }} style={{ height: dynamicSize(8.5), width: dynamicSize(9), marginLeft: dynamicSize(5) }} />
                            </View>
                        </View>
                        <Text style={{ marginLeft: dynamicSize(10), marginTop: dynamicSize(2), fontSize: getFontSize(14) }}>Available Balance - {item.walletBalance}</Text>
                        <Text style={{
                            marginLeft: dynamicSize(10),
                            marginTop: dynamicSize(10)
                        }}>Total Balance - {item.walletBalance}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }


    render() {
        return (
            <View style={{ flex: 1, }}>

                <CustomHeader text1={"Ticket History"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: dynamicSize(5), }}>

                    <TouchableOpacity style={{}}
                        onPress={() => this.withdrawView()}
                    >
                        {this.state.withdrawView ?
                            <View style={{ height: dynamicSize(60), width: width / 2, backgroundColor: "rgb(43,215,172)", borderBottomColor: "white", borderBottomWidth: wp('1%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: getFontSize(16), color: 'white' }}>Withdraw History</Text>
                            </View>
                            :
                            <View style={{ height: dynamicSize(60), width: width / 2, backgroundColor: "rgb(43,215,172)", borderBottomColor: "white", borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: getFontSize(16), color: 'white' }}>Withdraw History</Text>
                            </View>
                        }

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.depositeView()}
                    >
                        {this.state.depositeView ?
                            <View style={{ height: dynamicSize(60), width: width / 2, backgroundColor: "rgb(43,215,172)", justifyContent: 'center', alignItems: 'center', borderBottomColor: "white", borderBottomWidth: 2, }}>
                                <Text style={{ fontSize: getFontSize(16), color: 'white' }}>Deposit History</Text>
                            </View>
                            :
                            <View style={{ height: dynamicSize(60), width: width / 2, backgroundColor: "rgb(43,215,172)", justifyContent: 'center', alignItems: 'center', borderBottomColor: "white", borderBottomWidth: 2, }}>
                                <Text style={{ fontSize: getFontSize(16), color: 'white' }}>Deposit History</Text>
                            </View>
                        }

                    </TouchableOpacity>
                </View> */}

                {this.state.withdrawView ?
                    <View style={{ flex: 6, marginVertical: dynamicSize(10) }}>
                        <ScrollView horizontal={true} style={{ flex: 1, }}  >
                            <View style={{ flexDirection: 'column' }} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 3, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Date
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 3, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Amount
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 2, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                           Acc No.
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 4, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Status
                                    </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row', alignSelf: 'center'
                                }}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.data}
                                        renderItem={({ item, index }) => this.renderItems(item)}
                                        extraData={this.state}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        {/* <View style={{ alignSelf: 'center', position: "absolute", zIndex: 12, }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: width - dynamicSize(38),
                                borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                height: height / 18,
                                backgroundColor: "rgb(11,14,44)"
                            }}>
                                <Text style={{ width: width / 2 - dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: "rgb(221,128,17)" }}> Date </Text>
                                <Text style={{ width: dynamicSize(50), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: "rgb(221,128,17)" }}>Amount</Text>
                                <Text style={{ width: width / 2 - dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: "rgb(221,128,17)" }}> Txn.hash </Text>
                                <Text style={{ width: dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: "rgb(221,128,17)" }}> Status </Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: "center", paddingVertical: dynamicSize(35), zIndex: 10 }}>
                            <CardComponent style={{
                                height: height / 1.5,
                                width: width - dynamicSize(30),
                                marginVertical: dynamicSize(35),
                                paddingVertical: dynamicSize(35)
                            }} mainView={{ borderRadius: 0, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}  >
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.data}
                                    renderItem={(item) => this.renderItems(item)}
                                    extraData={this.state}
                                />
                            </CardComponent>
                        </View> */}
                    </View>
                    : null
                }

                {this.state.depositeView ?
                    <View style={{ flex: 6, marginVertical: dynamicSize(10) }}>
                        <ScrollView horizontal={true} style={{ flex: 1, }}  >
                            <View style={{ flexDirection: 'column' }} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 3, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Date
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 3, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Amount
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 2, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Txn.hash
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: "rgb(43,215,172)", textAlign: 'center', height: dynamicSize(50), width: width / 4, borderWidth: dynamicSize(0.25), borderColor: "rgba(184,184,187,0.4)", fontWeight: '600' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                                            Status
                                    </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.data}
                                        renderItem={(item) => this.renderItems(item)}
                                        extraData={this.state}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        {/* <View style={{ alignSelf: 'center', position: "absolute", zIndex: 2, }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: width - dynamicSize(38),
                                borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                height: height / 18,
                                backgroundColor: '#2e242c'
                            }}>
                                <Text style={{ width: width / 2 - dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: '#ffffff' }}> Date </Text>
                                <Text style={{ width: dynamicSize(50), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: '#ffffff' }}>Amount</Text>
                                <Text style={{ width: width / 2 - dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: '#ffffff' }}> Txn.hash </Text>
                                <Text style={{ width: dynamicSize(80), textAlign: 'center', fontSize: getFontSize(12), fontWeight: '600', color: '#ffffff' }}> Status </Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: "center", paddingVertical: dynamicSize(35) }}>
                            <CardComponent style={{
                                height: height / 1.5,
                                width: width - dynamicSize(30),
                                marginVertical: dynamicSize(35),
                                paddingVertical: dynamicSize(35),
                                backgroundColor:'rgb(19,22,51)'
                            }} mainView={{ borderRadius: 0, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}  >
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.data}
                                    renderItem={(item) => this.renderItems(item)}
                                    extraData={this.state}
                                />
                            </CardComponent>
                        </View> */}
                    </View>
                    : null
                }
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
