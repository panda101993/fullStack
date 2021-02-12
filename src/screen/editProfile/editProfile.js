import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, View, TextInput,Alert, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '../../components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '../../components/button'
import { TEALDARK, LIGHTGREY } from '@utils/colors'
import { Calendar, ArrowDropDown, back, largeButton, imageAvtar } from '@assets/icon'
import styles from './styles'
import { handleValidations } from "./function";
const { width, height } = Dimensions.get("window")
import DefaultState from "./Constant"
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from "react-native-modal-datetime-picker";
import Api from '../../api/Api'
import ImagePicker from 'react-native-image-crop-picker';
import { CountryModal } from "../../commonComponents/CountryModalFilter"
import { Country } from '../../commonComponents/countrycode'
const countryStateCityArr = require('countrycitystatejson')
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            address: false,
            country: false,
            state: false,
            city: false,
            toggelCheckbox: true,
            countryList: [],
            selectedCountry: "Select Country",
            countryStatus: false,
            selectedCountryShortName: "",
            stateList: [],
            stateStatus: false,
            selectedState: "Select State",
            cityList: [],
            cityStatus: false,
            imageuri:'',
            imageUrl:'',
            selectedCity: "Select City",
            date: "",
            mindate: '',
            token: '',
            selectedCode:'91',
            isDatePickerVisible: false,
            country_list: false,
            countryIcon:require('../../assets/countryimages/in.png'),
            countryListModal:false,
            stateListModal:false,
            cityListModal:false
        }
    }

    componentDidMount() {
      setTimeout(() => {
          this.setState({statestate:"qwerty"})
      }, 2000);
        var d = new Date();
        d.setFullYear(d.getFullYear() - 18);
        var m = new Date();
        m.setFullYear(m.getFullYear() - 100);
        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp,
                date: d,
                mindate: m
            })
            this.api()
        }
        )
    }

    api = () => {
        this.setState({
            isLoading:true
        })
        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp
            })
          Api(this.state.token, "account/my-account", "GET")
                .then(rep => {
                    if (rep.status == 200) {
                        setTimeout(()=>{
                            if(rep.data.data.imageUrl===""||rep.data.data.imageUrl===null){
                                this.setState({    
                                    imageUrl:""
                                    // profileImg:"https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif"
                                })
                            }
                            else {
                                // var tempImg = { uri: rep.data.data.imageUrl }
                                this.setState({
                                    imageUrl: rep.data.data.imageUrl
                                    // profileImg:"https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif"
                                })
                            }
                            this.setState({
                                email: rep.data.data.email,
                                emailStatus: rep.data.data.email==null ||rep.data.data.email=="" ? false :true  ,
                                name: rep.data.data.firstName,
                                nameStatus:rep.data.data.firstName==null ||rep.data.data.firstName=="" ? false :true,
                                phoneNumber: rep.data.data.pnWithoutCountryCode,
                                phoneNumberStatus:rep.data.data.pnWithoutCountryCode==null ||rep.data.data.pnWithoutCountryCode=="" ? false :true,
                                // address: rep.data.data.address,
                                selectedState: rep.data.data.state,
                                stateStatus:rep.data.data.state==null ||rep.data.data.state=="" ? false :true,
                                selectedCity: rep.data.data.city,
                                cityStatus:rep.data.data.city==null ||rep.data.data.city=="" ? false :true,
                                selectedCountry: rep.data.data.country,
                                countryStatus:rep.data.data.country==null ||rep.data.data.country=="" ? false :true,
                                isLoading: false,
                                imageUrl: rep.data.data.imageUrl,
                                dob:rep.data.data.dob,
                                dobStatus:rep.data.data.dob==null ||rep.data.data.dob=="" ? false :true,
                                selectedCode:rep.data.data.countryCode
                            })
                            


                            // let State_array = []
                      
                            // for (var i = 0; i < country.length; i++) {
                            //     if (country[i].name == rep.data.data.country) {
                            //         console.log("data_country==>",rep.data.data.country)
                            //         let d = []
                            //         this.setState({ AllStates: d })
                            //         this.state.AllStates.push({ ...country[i].states })
                            //         Object.keys(country[i].states).map((item, index) => {
                            //             return State_array.push(Object.keys(country[i].states)[index])
                            //         })
                            //     }
                            // }
                         
                            // this.setState({
                            //     state_Array: State_array,
                            // })
                        },500)
                    }
                    else if (rep.status == 400) {
                        this.setState({isLoading:false})
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
        )

    }

    pickSingle =async(cropit, circular=true, mediaType) =>{
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: cropit,
          cropperCircleOverlay: circular,
          sortOrder: 'none',
          compressImageMaxWidth: 1000,
          compressImageMaxHeight: 1000,
          compressImageQuality: 1,
          compressVideoPreset: 'MediumQuality',
          includeExif: true,
        }).then(image => {
          console.log('received image=============================================>', image);
       
         let imgobj =  {uri: image.path, width: image.width, height: image.height, mime: image.mime}

        this.setState({
            imageuri: image.path,
            imagename: 'image.jpg',
            imagetype:image.mime
        })
        // this.setState({frontimageuri:imgobj.uri})
        this.setState({profileImgStatus:true,profileImgError:''})
        console.log("imageurll===>>>",imgobj.uri)
        this.Profile()
        }).catch(e => {
          console.log(e);
          Alert.alert(e.message ? e.message : e);
        });
      }

      Profile =  async () => {
        let data = new FormData();
        data.append("file", {
            uri: this.state.imageuri,
            name: this.state.imagename,
            type: this.state.imagetype
        })  
       console.log("formdata===>>>",data)
       this.setState({isLoading:true})
        fetch('http://182.72.203.244:3023/account/upload-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':  `Bearer ${this.props.Token}`,
            },
            body: data
        })
            .then(resp => resp.json().then(data => {
              console.log("uploadresp===>>",data)
              switch (data.status) {
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
                    this.setState({
                        isLoading:false,
                        imageUrl:data.data,
                    })
                break;
                }


                default: {
                    this.setState({ isLoading: false })
                    setTimeout(() => {
                        Alert.alert(
                            '',
                            data.message,
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );
                    }, 200);

                }
                    break;
            }
            }
            )
            )
    }

      updateProfile = () => {
        this.setState({
            isLoading:true
        })
        var phoneno = this.state.selectedCode + this.state.phoneNumber
        let variable = {
            "firstName": this.state.name,
            "lastName": "",
            "address": "",
            "country": this.state.selectedCountry,
            "state": this.state.selectedState,
            "city": this.state.selectedCity,
            "imageUrl": this.state.imageUrl,
            "phoneNo":phoneno,
            "countryCode":this.state.selectedCode,
            "pnWithoutCountryCode":this.state.phoneNumber ,
            "email":this.state.email,
            "dob":this.state.dob
        }
      
        Api(this.state.token, "account/profile-update", "POST", variable)
            .then(resp => {
             
                if (resp.status == 200) {
                   
                    this.setState({
                        isLoading:false
                    })
                    setTimeout(()=>{
                        Alert.alert(
                            '',
                            "Profile updated successfully. ",
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate("logged") },
                            ],
                            { cancelable: false }
                        )
                    },100)
                    
                }
                else if (resp.status == 400) {
                    this.setState({
                        isLoading:false
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 100);

                }
                else {
                    this.setState({
                        isLoading:false
                    })
                    setTimeout(() => {
                        alert(JSON.stringify(resp))
                    }, 100);
                }
            })
    }

    Set_value = (item) => {
        console.log("Country Code ====>", item.dialCode)
        this.setState({ country_list: !this.state.country_list,selectedCode:item.dialCode,countryIcon:item.icon })
      }

    handleConfirm = (dateYear) => {

        this.setState({ isDatePickerVisible: false, SelectedFullDate: dateYear })
        var date = dateYear.getDate();
        var month = dateYear.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        var year = dateYear.getFullYear();
    
        var dateStr = date + "/" + month + "/" + year;
        this.setState({ dob: dateStr ,dobStatus :true,dobError:'' })
        console.warn("A date has been picked: ", dateStr);
      };


    handlevalidate = (text, type) => {
        let status = `${type}Status`;
        let errorText = `${type}Error`;
        let activeBorderColor = `active${type}BorderColor`;
        let resp = handleValidations(text, type)

        this.setState({
            [type]: resp.value,
            [errorText]: resp.errorText,
            [status]: resp.status,
            [activeBorderColor]: !resp.status
        })
    }

    submitHandler() {
        if (this.state.nameStatus) {
            if (this.state.emailStatus) {
                if (this.state.phoneNumberStatus) {
                    if (this.state.dobStatus) {
                        if (this.state.countryStatus) {
                            // if (this.state.stateStatus) {
                            //     if (this.state.cityStatus) {
                                    this.updateProfile()
                                    //  alert('Successfull!')
                                    //  this.props.navigation.navigate('Profile')
                            //     }
                            //     else { this.setState({ cityError: '*Please Select City' }) }
                            // }
                            // else { this.setState({ stateError: '*Please Select State' }) }
                        }
                        else { this.setState({ countryError: '*Please Select Country' }) }
                    }
                    else { this.setState({ dobError: '*Please enter DOB.'}) }
                }
                else { this.setState({ phoneNumberError: '*Please enter phone number.', phoneNumberStatus: false }) }
            }
            else { this.setState({ emailError: '*Please enter email.', emailStatus: false }) }
        }
        else { this.setState({ nameError: '*Please enter name.', nameStatus: false }) }
    }



selectCountryHandler(itemValue){
    this.setState({ selectedCountry: itemValue.name, selectedCountryShortName: itemValue.shortName,countryListModal: !this.state.countryListModal })
        if (itemValue.name !== ""){
           let tempStateList= countryStateCityArr.getStatesByShort(`${itemValue.shortName}`)
           tempStateList=  tempStateList.map((item,index)=>{
                  return({"name":item})
              })
            this.setState({ stateList: tempStateList })

            setTimeout(() => {
                this.setState({ countryStatus: true, countryError: '' },()=>console.log(this.state.stateList))
            }, 500);
            
        }
        else {this.setState({ stateList: [{"name":""}], countryStatus: false })}


    }
    selectStateHandler(itemValue){
            this.setState({ selectedState: itemValue.name,stateListModal:false })
            if ( itemValue.name !== "") {
                

                     let tempStateList= countryStateCityArr.getCities(this.state.selectedCountryShortName,
                        itemValue.name)
                     tempStateList=  tempStateList.map((item,index)=>{
                            return({"name":item})
                        })
                        this.setState({ cityList: tempStateList,stateStatus: true, stateError: '', })


                 if(countryStateCityArr.getCities(this.state.selectedCountryShortName, itemValue.name).length===0){
                    this.setState({ cityStatus: true, cityError: '', })
                 }
            }
            else {
                this.setState({ stateStatus: false, cityList: [{"name":""}] })
            }
            
    }


    selectCityHandler(itemValue){
        {
            this.setState({ selectedCity: itemValue.name,cityListModal: !this.state.cityListModal })
            if (itemValue.name !== "") { this.setState({ cityStatus: true, cityError: '', }) }
            else { this.setState({ cityStatus: false }) }
        }
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}  >
                <CustomHeader text1={"Account Details"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }} showsverticalscrollindicator={false}>
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        scrollEnabled={true}>
                        <TouchableOpacity
                        onPress={() =>this.pickSingle(true,true)}
                        style={{ marginVertical: hp(2),height: hp(13), width: wp(30),alignSelf:'center'}}>
                            <Image resizeMode="contain" 
                            source={this.state.imageUrl===""||this.state.imageUrl===null?imageAvtar:{uri:this.state.imageUrl}}
                             style={{ alignSelf: 'center', height: hp(18),
                             borderRadius:200,
                             width: wp(40) }} />
                        </TouchableOpacity>
                        <View style={[styles.TextInput, { marginTop: hp(2) }]} >
                            <TextInput
                                maxLength={30}
                                value={this.state.name}
                                onChangeText={(text) => this.handlevalidate(text, "name")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Your Name'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.nameError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput maxLength={40} 
                             value={this.state.email}
                                onChangeText={(text) => this.handlevalidate(text, "email")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Your Email'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.emailError}</Text>
                        <View style={styles.phNumberView} >
                            <View style={styles.phNumbersubView} >
                                <TouchableOpacity 
                                
                                onPress={() => this.setState({ country_list: !this.state.country_list })}
                                style={{ flexDirection: 'row', borderBottomWidth: (1), borderBottomColor: 'rgb(0,224,176)', width: dynamicSize(50), justifyContent: 'space-between' }} >
                                    <View style={{ justifyContent: 'center' }} >
                                        <Image source={this.state.countryIcon} style={{ width: dynamicSize(15), height: dynamicSize(15) }} />
                                    </View>
                                    <View style={{ justifyContent: 'center' }} >
                                     <Text style={{ fontSize: 14, color: 'black' }} >{`${this.state.selectedCode}`}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: width - dynamicSize(100), justifyContent: 'center', borderBottomColor: 'rgb(0,224,176)', borderBottomWidth: 1 }} >
                                    <TextInput maxLength={25} style={{ height: dynamicSize(40) }}
                                     value={this.state.phoneNumber}
                                        onChangeText={(text) => this.handlevalidate(text, "phoneNumber")} keyboardType="numeric" placeholder={"Enter Your Phone Number"} />
                                </View>
                            </View>
                            <View style={{}}>
                                <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{""}</Text>
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneNumberError}</Text>
                        <View style={[styles.TextInput1, { height: dynamicSize(40) }]} >
                            <TextInput maxLength={25}
                                value={this.state.dob}
                                onChangeText={(text) => this.handlevalidate(text, "dob")}
                                keyboardType="numeric"
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your DOB'} />
                            <TouchableOpacity 
                             onPress={() => this.setState({ isDatePickerVisible: true })}
                            style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                                
                                <ImageBackground style={{ height: hp(3), width: wp(6) }} source={Calendar} resizeMode='contain' >
                  <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                  />
                </ImageBackground>
                         </TouchableOpacity>
                        </View>
                        <Text style={styles.errorText}>{this.state.dobError}</Text>

                        <View style={[styles.TextInput1, { height: dynamicSize(50) }]}>
                            <TextInput 
                               editable={false}
                            value={this.state.selectedCountry}
                            maxLength={25} style={{ fontSize: dynamicSize(14) }} placeholder={'Select country'}/>
                        <TouchableOpacity

                        onPress={()=>this.setState({countryListModal:!this.state.countryListModal})}
                        style={{ justifyContent: 'center', left: dynamicSize(-10)}}>
                        
                            <Image source={ArrowDropDown} resizeMode='contain' />
                        </TouchableOpacity>
                        </View>
                        <Text style={styles.errorText}>{this.state.countryError}</Text>

                      {this.state.countryStatus&&
                        <View style={styles.TextInput1} >
                            <TextInput 
                               editable={false}
                             value={this.state.selectedState}
                            maxLength={25} style={{ fontSize: dynamicSize(14) }} placeholder={'Select State'} />
                        <TouchableOpacity 
                         onPress={()=>this.setState({stateListModal:!this.state.stateListModal})}
                        style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                            <Image source={ArrowDropDown} resizeMode='contain' />
                        </TouchableOpacity>

                        </View>
                      }
                         <Text style={styles.errorText}>{this.state.stateError}</Text>
                      {this.state.statestate&&<View style={styles.TextInput1} >
                            <TextInput maxLength={25} 
                            editable={false}
                              value={this.state.selectedCity}
                            style={{ fontSize: dynamicSize(14) }} placeholder={'Select City'} />
                        <TouchableOpacity 
                         onPress={()=>this.setState({cityListModal:!this.state.cityListModal})}
                        
                        style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                            <Image source={ArrowDropDown} resizeMode='contain' />
                        </TouchableOpacity>
                        </View>

                      }

                        <Text style={styles.errorText}>{this.state.cityError}</Text>

                        <View style={{ alignSelf: 'center', alignItems: 'center', }} >
                            <CustomButton
                                onPress={() => this.submitHandler()}
                                mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                                contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                                image={largeButton}
                                textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                                title='Save' />
                        </View>

                    </KeyboardAwareScrollView>
                </ScrollView>
                <CountryModal
                    data={Country}
                    visible={this.state.country_list}
                    onPress={(x) => this.Set_value(x)}
                    cancelPress={() => this.setState({ country_list: !this.state.country_list })}
                    cancelModal={() => this.setState({ yearView: false })}
                />

                <CountryModal
                    data={countryStateCityArr.getCountries()}
                    visible={this.state.countryListModal}
                    onPress={(x) => this.selectCountryHandler(x)}
                    cancelPress={() => this.setState({ countryListModal: !this.state.countryListModal })}
                    cancelModal={() => this.setState({ yearView: false })}
                />
                <CountryModal
                    data={this.state.stateList}
                    type="state"
                    visible={this.state.stateListModal}
                    onPress={(x) => this.selectStateHandler(x)}
                    cancelPress={() => this.setState({ stateListModal: !this.state.stateListModal })}
                    cancelModal={() => this.setState({ yearView: false })}
                />

                <CountryModal
                    data={this.state.cityList}
                    type="city"
                    visible={this.state.cityListModal}
                    onPress={(x) => this.selectCityHandler(x)}
                    cancelPress={() => this.setState({ cityListModal: !this.state.cityListModal })}
                    cancelModal={() => this.setState({ yearView: false })}
                />


            </SafeAreaView>
        )
    }
}

