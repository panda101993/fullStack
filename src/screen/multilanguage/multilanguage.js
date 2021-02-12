import React, { Component } from 'react'
import { Text, StyleSheet,FlatList,SafeAreaView,Dimensions,TouchableOpacity, View, Image, Alert } from 'react-native'
import { CustomHeader } from '../../components/header'
import { dynamicSize } from '../../utils/dynamicSize';
import {english,french,german, back} from '../../assets/icon'
import { heightPercentageToDP } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window")
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

 
export default class Multilanguage extends Component {

constructor(props){
    super(props);
    this.state=
    {
        data: [
            { id:1,name: 'English', img: english },
            { id:2,name: 'French', img: french },
            { id:3,name: 'German', img: german },
            
        ],
        navigationValue:''
    }
}
// componentDidMount(){
// alert('hi')
//     console.log("PROPS",this.props.route.params.fromDrawer)
//     var value = this.props.route.params.fromDrawer
//     this.setState({navigationValue :value })
// }
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            console.log("PROPS",this.props.route.params.fromDrawer)
            var value = this.props.route.params.fromDrawer
            this.setState({ navigationValue: value })
        });

    }
ListData(item, index){
return(
    <TouchableOpacity 
    onPress={()=>{this.state.navigationValue ? this.props.navigation.goBack() : this.props.navigation.navigate("Tutorial")}}
    style={{width:width/3,alignSelf:'center',alignItems:'center',marginVertical:dynamicSize(10)}} >
        <Image source={item.img}/>
        <View style={{height:dynamicSize(30),justifyContent:'center'}} >
            <Text>{item.name}</Text> 
        </View>
       
    </TouchableOpacity>
)
}

    render() {
        return (
            <View style={{flex:1,}} >
                  <CustomHeader text1={"Choose Language"} source1={back } 
                   onPress1={()=>this.props.navigation.goBack()} />
               
                <View style={{
                    backgroundColor: 'white', flex: 1, width, justifyContent: 'center',
                    alignSelf: 'center', alignItems: 'center', marginVertical: hp(.5)
                }} >
                     {/* <Text style={{color:'black'}} > textInComponent </Text> */}
                     <FlatList
                                    data={this.state.data}
                                    numColumns={3}
                                    renderItem={({ item, index }) => this.ListData(item, index)}
                                    keyExtracter={(index) => { return index }}
                                    extraData={this.state}
                                    scrollEnabled={true}
                                />
                </View>
             
            </View>
        )
    }
}

const styles = StyleSheet.create({})
