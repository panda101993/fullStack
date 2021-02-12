import React , { useState, useEffect }  from 'react'
import { Text, TextInput, View, TouchableOpacity, Modal,FlatList,Image,Dimensions } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp}  from 'react-native-responsive-screen'
import { TEALDARK } from '@utils/colors';
// import {fontStyle} from '@Assets/commonFont/commonFont'
const GREY_TEXT="rgb(149, 150, 149)"

const { width, height } = Dimensions.get("window");
const CountryModal =(props) =>{ 
    const [inputText,setInputText] = useState("")
    const [countryList, setCountryList] = useState(props.data)
    const [countryListUnfiltered, setCountryListUnfiltered] = useState(props.data)
    const [searchresultstatus, setSearchresultstatus] = useState(false)
    const [showFilter,setShowFilter] = useState(true)
     useEffect(()=>{
         if(props.type==="state"){
            setCountryList(props.data)
            setShowFilter(false)
         }
         else if(props.type==="city"){
            setCountryList(props.data)
            setShowFilter(false)
         }
     })
    function handleFilter(text){
        setInputText(text)
        setSearchresultstatus(false)
        if(text!==""){
        let searchedCountryList = countryListUnfiltered.filter(item=>(item.name.toLowerCase().includes(text.toLowerCase()))?item:null)
        setCountryList(searchedCountryList)
        if(searchedCountryList.length===0){
            setSearchresultstatus(true)
        }
        }else{
            setCountryList(countryListUnfiltered)
        }
       }
       return(
            <Modal
            style={{ height: height / 2 }}
            animationType="none"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onRequestClose}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    opacity: 0.8
                }}>
                <View style={{
                    height: height / 2,
                    width: wp("70%"), justifyContent: "center",
                    alignSelf: "center", alignItems: "center",
                    backgroundColor: 'white', paddingVertical: 15,
                    borderWidth: 1
                }}>
                   {showFilter&&<TextInput 
                     value = {inputText}
                      onChangeText={(text)=>{handleFilter(text)}}
                     placeholder={"Search Country"} style={{height:hp(5),width:wp(50),borderWidth:1,textAlign:'center'}}
                      placeholderTextColor={GREY_TEXT}
                    />
                   } 
                    <FlatList
                        data={countryList}
                        onRequestClose={() => console.log("modal has been closed")}
                        renderItem={({ item, index }) =>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={ () =>
                                {
                                    setInputText('')
                                    setCountryList(countryListUnfiltered)
                                    props.onPress(item)
                                }
                                }
                                    style={{
                                        flexDirection: 'row',
                                        width: wp("70%"),
                                        marginVertical: wp(2)
                                    }}
                                >
                                    <View style={{ marginHorizontal: wp(3), marginVertical: wp(2) }}>
                                        <Image source={item.icon} resizeMode="contain" style={{ width: wp("10%"), height: hp("4%"), }} />
                                    </View>

                                    <View style={{ width: wp("50%"), marginHorizontal: wp(2) }}>
                                        <Text style={{ fontSize: 15 }}>{item.dialCode}</Text>
                                        <Text style={{ fontSize: 15 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => {
                            return <View style={{
                                height: 1,
                                backgroundColor: "grey", width: wp("70%")
                            }} />
                        }}
                        CancelModal={props.CancelModal}
                    />
                    <TouchableOpacity onPress={props.cancelPress}
                        style={{ borderRadius: 20, width: wp("50%"),backgroundColor:TEALDARK }}>
                      

                            <Text style={{
                                alignSelf: "center",
                                marginVertical: 10,
                                // fontFamily:fontStyle.light,
                                fontSize: 20,
                                color: 'white'
                            }}>{"Cancel"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
       
    )
                        }
    export {
        CountryModal
    }