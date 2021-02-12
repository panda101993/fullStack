import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, View, Alert, TextInput, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { CustomHeader } from '../../components/header'
import { getFontSize, dynamicSize } from '@utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CustomButton } from '../../components/button'
import { validateEmail, validateMobileNo, validateName } from '@utils/validation'
import { TEALDARK } from '@utils/colors'
import {
    Calendar, ArrowDropDown, back, largeButton,
    toggelOn, verifiedTick, checkbox, uncheckbox,
    uploadPin, cameraIcon
} from '@assets/icon'
import styles from './styles'
import { handleValidations } from "./function";
const { width, height } = Dimensions.get("window")
import DefaultState from "./Constant"
import { Picker } from '@react-native-community/picker';
import { TabRouter } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
const countryStateCityArr = require('countrycitystatejson')
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage';
import { Drop_Down_Modal } from '../../commonComponents/DropDownModal';
import { Country_list } from '../../commonComponents/Commonlist';
import { CountryModal } from '../../commonComponents/CountryModalFilter';
import { Country } from '../../commonComponents/countrycode'


// import { connect, } from 'react-redux';
export default class KYC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: false,
            country: false,
            state: true,
            city: true,
            countryListModal: false,
            country_list: false,
            toggelCheckbox: false,
            DefaultState,
            countryList: [],
            selectedCountry: "",
            countryStatus: false,
            selectedCountryShortName: "",
            stateList: [],
            stateStatus: true,
            selectedState: "",
            cityList: [],
            cityStatus: true,
            selectedCity: "",
            emailinfo: true,
            kycinfo: false,
            uploadkycinfo: false,
            showView: '',
            isChecked: true,
            isChecked1: true,
            isChecked2: true,
            name: '',
            username: '',
            email: '',
            mobileno: '',
            address: '',
            token: '',

            state: '',
            city: '',
            avatar1: '',
            imageuri1: '',
            imagename1: 'Upload front page of your ID',
            imagename3: 'Upload front page of your ID',
            imageUrl1: '',
            isLoading: false,
            avatar2: '',
            imageuri2: '',
            imagename2: 'Upload back page of your ID ',
            imagename4: 'Upload back page of your ID ',
            imageUrl2: '',
            docIdNumber: '',
            docIdNumber1: '',
            docNameError: '',
            docIdNumberError: '',
            docName1Error: '',
            docIdNumber1Error: '',
            kyc: '',
            rejected: '',
            count: 0,
            docName1: "Select",
            docName: "Select",
            Province1: [
                {
                    "key": "-Select-",
                }, {
                    "key": "Passport",
                },
                {
                    "key": "National Id",

                },
            ],
            toggleState1: false,
            toggleState: false,
            Province: [
                {
                    "key": "-Select-",
                }, {
                    "key": "Selfi",
                },
            ],
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('token').then(resp => {
            this.setState({
                token: resp
            })
            this.AccountDetailsApi()
        }
        )
    }
    AccountDetailsApi() {

        this.setState({ isLoading: true })
        // Api('', "account/my-account", "GET", `Bearer ${this.props.Token}`)
        // Api('', "account/my-account", "GET", `Bearer ${this.props.Token}`)
        Api(this.state.token, "account/my-account", "GET")
            .then(async resp => {
                console.log("resp===>>>", resp)
                // console.warn("resspp==>>", resp)
                switch (resp.status) {
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
                        this.setState({ isLoading: false })
                        this.setState({ name: resp.data.data.firstName })
                        this.setState({ email: resp.data.data.email })
                        this.setState({ dob: resp.data.data.dob })
                        this.setState({ phoneNumber: resp.data.data.pnWithoutCountryCode })
                        this.setState({ countrycode: resp.data.data.countryCode })
                        this.setState({ country: resp.data.data.country })
                        this.setState({ state: resp.data.data.state })
                        this.setState({ city: resp.data.data.city })
                        this.setState({ isLoading: false })

                        this.setState({ nameStatus: resp.data.data.firstName==null ||resp.data.data.firstName=="" ? false :true  , })
                        this.setState({ emailStatus: resp.data.data.email==null ||resp.data.data.email=="" ? false :true  , })
                        // this.setState({ dob: resp.data.data.dob })
                        this.setState({ phoneNumberStatus: resp.data.data.pnWithoutCountryCode==null ||resp.data.data.pnWithoutCountryCode=="" ? false :true  , })
                        this.setState({ countryStatus: resp.data.data.country==null ||resp.data.data.country=="" ? false :true  , })
                        // alert("data found")
                        break;
                        console.log("NMAE==>", this.state.name)
                    }



                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                resp.data.message,
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

    pickSingle = async () => {

        ImagePicker.openPicker({
            width: 500,
            height: 500,
            // cropperCircleOverlay: circular,
            // sortOrder: 'none',
            // compressImageMaxWidth: 1000,
            // compressImageMaxHeight: 1000,
            // compressImageQuality: 1,
            // compressVideoPreset: 'MediumQuality',
            // includeExif: true,
        }).then(image => {
            console.log('received image=============================================>', image);

            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }

            this.setState({ frontimage: imgobj.uri })
            this.setState({ frontimageuri: imgobj.uri })
            this.setState({ frontimagetype: imgobj.mime })
            console.log("imageurll===>>>", imgobj.uri)
            this.firstimage()

        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }

    pickSingle = async (cropit, circular = true, mediaType) => {

        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            // cropperCircleOverlay: circular,
            // sortOrder: 'none',
            // compressImageMaxWidth: 1000,
            // compressImageMaxHeight: 1000,
            // compressImageQuality: 1,
            // compressVideoPreset: 'MediumQuality',
            // includeExif: true,
        }).then(image => {
            console.log('received image=============================================>', image);

            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }

            this.setState({ frontimage: imgobj.uri })
            this.setState({ frontimageuri: imgobj.uri })
            this.setState({ frontimagetype: imgobj.mime })
            console.log("imageurll===>>>", imgobj.uri)
            this.firstimage()

        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }

    firstimage = async () => {
        let data = new FormData();
        data.append("file", {
            uri: this.state.frontimageuri,
            name: 'image.jpg',
            type: this.state.frontimagetype
        })
        console.log("formdata===>>>", data)

        console.warn("formdata===>>>", data)
        this.setState({ isLoading: true })
        fetch('http://182.72.203.244:3023/account/upload-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.state.token}`,

            },
            body: data
        })
            .then(resp => resp.json().then(data => {
                console.log("uploadresp===>>", data)
                console.warn("uploadresp===>>", data)
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




    pickSingle1 = (cropit, circular = true, mediaType) => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            // cropperCircleOverlay: circular,
            // sortOrder: 'none',
            // compressImageMaxWidth: 1000,
            // compressImageMaxHeight: 1000,
            // compressImageQuality: 1,
            // compressVideoPreset: 'MediumQuality',
            // includeExif: true,
        }).then(image => {
            console.log('received image=============================================>', image);

            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }


            this.setState({ backimageuri: imgobj.uri })
            this.setState({ backimagetype: imgobj.mime })
            this.SecondImage()
            console.log("imageurll===>>>", imgobj.uri)


        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }

    SecondImage = () => {
        let data = new FormData();
        data.append("file", {
            uri: this.state.backimageuri,
            name: 'image.jpg',
            type: this.state.backimagetype
        })
        console.log("formdata===>>>", data)
        console.warn("formdata===>>>", data)
        this.setState({ isLoading: true })
        fetch('http://182.72.203.244:3023/account/upload-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.state.token}`,
            },
            body: data
        })
            .then(resp => resp.json().then(data => {
                console.log("uploadresp===>>", data)
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

    Upload = () => {
        var variable = {
            "document": [
                {
                    "docName": this.state.idType,
                    "docIdNumber": this.state.idNumber,
                    "documentNumber": 1,
                    "frontIdUrl": this.state.frontimage,
                    "backIdUrl": this.state.backimageuri,

                },

            ]
        }

        this.setState({ isLoading: true })

        Api(this.state.token, "account/save-kyc-details", "POST", variable)
            .then(async resp => {
                console.log("resp===>>>", resp)
                console.warn("resspp==>>", resp)
                switch (resp.status) {
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

                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                resp.data.message,
                                [
                                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                                ],
                                { cancelable: false },
                            );
                        }, 200);
                        break;
                    }
                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                resp.data.message,
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
    Set_value = (item) => {
        console.log("ITEM", item)
        this.setState({ country_list: !this.state.country_list })
        this.setState({
            country: item.name,
            countryStatus: true,
            countryError: ''
        })
    }

    onClickedUploadImageFrontPage() {
        getImageFromGallary().then(response => {
            this.setState({
                imageResponseFront: response
            });
        });
    }

    onClickedUploadImageForBack() {
        getImageFromGallary().then(response => {
            this.setState({
                imageResponse: response
            });
        });
    }
    Save = () => {
        if (this.state.toggelCheckbox == true)
            if (this.state.docname != '') {
                if (this.state.docIdNo != '') {
                    if (this.state.imageResponseFront != '') {
                        if (this.state.imageResponse != '') {
                            this.Upload();
                        }
                        else {
                            this.setState({ imageResponseError: 'please upload back side image' })
                        }
                    }
                    else {
                        this.setState({ imageResponseFrontError: 'please upload front side image' })
                    }
                }
                else {
                    this.setState({ docIdNoError: 'Please enter doc number' })
                }
            }
            else {
                this.setState({ docnameError: 'please enter type of doc' })
            }
        else {
            alert("Please accept full responsiblity")
        }
    }

    // uploadfirst = () => {
    //     const options ={
    //         quality : 0.01
    //     }
    //     ImagePicker.showImagePicker(options, (response) => {

    //         if (response.didCancel) {
    //          console.log("if=>")
    //         } else if (response.error) {
    //             console.log("if=>")
    //         } else if (response.customButton) {
    //             console.log("if=>")
    //         } else {
    //             const source = { uri: response.uri };
    //             this.setState({
    //                 imageuri1: response.uri,
    //                 imagename1: response.fileName,
    //                 isLoading: false

    //             })

    //             this.setState({
    //                 avatar1: source,
    //             });

    //             this.firstimage()
    //         }
    //     });
    // }
    // uploadfirst1 = () => {
    //     const options ={
    //         quality : 0.01
    //     }
    //     ImagePicker.showImagePicker(options, (response) => {

    //         if (response.didCancel) {
    //           console.log("if")
    //         } else if (response.error) {
    //             console.log("if")
    //         } else if (response.customButton) {
    //             console.log("if")
    //         } else {
    //             const source = { uri: response.uri };
    //             this.setState({
    //                 imageuri3: response.uri,
    //                 imagename3: response.fileName,
    //                 isLoading: false

    //             })

    //             this.setState({
    //                 avatar3: source,
    //             });

    //             this.firstimage1()
    //         }
    //     });
    // }

    // firstimage = () => {
    //     let formdata = new FormData();
    //     formdata.append("file", {
    //         uri: this.state.imageuri1,
    //         name: this.state.imagename1,

    //         type: 'image/jpg'
    //     })

    //     fetch('http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1617/upload-file', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: formdata
    //     })
    //         .then(resp => resp.json().then(data => {

    //             if (data.status == 200) {
    //                 this.setState({
    //                     isLoading: false,
    //                     imageUrl1: data.data
    //                 })

    //             }
    //             else {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert("Please upload image again within the size of 10 MB")
    //                 }, 200)

    //             }
    //         }
    //         )
    //         )
    // }

    // firstimage1 = () => {
    //     let formdata = new FormData();
    //     formdata.append("file", {
    //         uri: this.state.imageuri3,
    //         name: this.state.imagename3,
    //         type: 'image/jpg'
    //     })

    //     fetch('http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1617/upload-file', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: formdata
    //     })
    //         .then(resp => resp.json().then(data => {

    //             if (data.status == 200) {
    //                 this.setState({
    //                     isLoading: false,
    //                     imageUrl3: data.data
    //                 })

    //             }
    //             else {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert("Please upload image again within the size of 10 MB")
    //                 }, 200)

    //             }
    //         }
    //         )
    //         )
    // }

    // uploadsecond = () => {
    //     const options ={
    //         quality : 0.01
    //     }
    //     ImagePicker.showImagePicker(options, (response) => {


    //         if (response.didCancel) {
    //             console.log("if")
    //         } else if (response.error) {
    //             console.log("if")
    //         } else if (response.customButton) {
    //             console.log("if")
    //         } else {
    //             const source = { uri: response.uri };
    //             this.setState({
    //                 imageuri2: response.uri,
    //                 imagename2: response.fileName,
    //                 isLoading: false

    //             })


    //             this.setState({
    //                 avatar2: source,
    //             });

    //             this.secondimage()
    //         }
    //     });
    // }
    // uploadsecond1 = () => {
    //     const options ={
    //         quality : 0.01
    //     }
    //     ImagePicker.showImagePicker(options, (response) => {

    //         if (response.didCancel) {
    //             console.log("if")
    //         } else if (response.error) {
    //             console.log("if")
    //         } else if (response.customButton) {
    //             console.log("if")
    //         } else {
    //             const source = { uri: response.uri };
    //             this.setState({
    //                 imageuri4: response.uri,
    //                 imagename4: response.fileName,
    //                 isLoading: false

    //             })

    //             this.setState({
    //                 avatar4: source,
    //             });

    //             this.secondimage1()
    //         }
    //     });
    // }
    // secondimage = () => {
    //     let formdata = new FormData();
    //     formdata.append("file", {
    //         uri: this.state.imageuri2,
    //         name: this.state.imagename2,
    //         type: 'image/jpg'
    //     })

    //     fetch('http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1617/upload-file', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: formdata
    //     })
    //         .then(resp => resp.json().then(data => {

    //             if (data.status == 200) {
    //                 this.setState({
    //                     isLoading: false,
    //                     imageUrl2: data.data
    //                 })

    //             }
    //             else {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert("Please upload image again within the size of 10 MB")
    //                 }, 200)

    //             }
    //         }
    //         )
    //         )
    // }
    // secondimage1 = () => {
    //     let formdata = new FormData();
    //     formdata.append("file", {
    //         uri: this.state.imageuri4,
    //         name: this.state.imagename4,
    //         type: 'image/jpg'
    //     })

    //     fetch('http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1617/upload-file', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: formdata
    //     })
    //         .then(resp => resp.json().then(data => {

    //             if (data.status == 200) {
    //                 this.setState({
    //                     isLoading: false,
    //                     imageUrl4: data.data
    //                 })

    //             }
    //             else {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert("Please upload image again within the size of 10 MB")
    //                 }, 200)

    //             }
    //         }
    //         )
    //         )
    // }
    //     uploadpress = () => {
    //         if (this.state.docName != '') {
    //             if (this.state.docIdNumber != '') {
    //                 if (this.state.docName1 != '') {
    //                     if (this.state.docIdNumber1 != '') {
    //                         this.upload();
    //                     }
    //                     else {
    //                         this.setState({ docIdNumber1Error: 'Please enter doc number' })
    //                     }
    //                 }
    //                 else {
    //                     this.setState({ docName1Error: 'please enter type of doc' })
    //                 }
    //             }
    //             else {
    //                 this.setState({ docIdNumberError: 'Please enter doc number' })
    //             }
    //         }
    //         else {
    //             this.setState({ docNameError: 'please enter type of doc' })
    //         }
    //     }


    //     logout = () => {
    //         Alert.alert(
    //             'Logout',
    //             'Are you sure you want to logout ?',
    //             [

    //                 {
    //                     text: 'Cancel',
    //                     onPress: () => console.log('Cancel Pressed'),
    //                     style: 'cancel',
    //                 },
    //                 { text: 'OK', onPress: () => this.logout() },
    //             ],
    //             { cancelable: false },
    //         )
    //     }


    //     upload = () => {

    //         var variable = {
    //             "document": [
    //                 {
    //                     "docName": this.state.docName,
    //                     "docIdNumber": this.state.docIdNumber,
    //                     "documentNumber": 1,
    //                     "frontIdUrl": this.state.imageUrl1,
    //                     "backIdUrl": this.state.imageUrl2,
    //                 },
    //                 {
    //                     "docName": this.state.docName1,
    //                     "docIdNumber": this.state.docIdNumber1,
    //                     "documentNumber": 2,
    //                     "frontIdUrl": this.state.imageUrl3,
    //                     "backIdUrl": this.state.imageUrl4,
    //                 }
    //             ]
    //         }

    //         Api(this.state.token, "account/save-kyc-details", "POST", variable)
    //             .then(rep => {


    //                 if (rep.status == 200) {

    //                     Alert.alert(
    //                         "",
    //                         "Kyc successfully upload.",
    //                         [
    //                           {
    //                             text: "OK",
    //                             onPress: () =>this.api()
    //                             ,

    //                             style: "OK"
    //                           }

    //                         ],
    //                         { cancelable: false }
    //                       );

    //                 }
    //                 else if (rep.status == 400) {
    //                     setTimeout(() => {
    //                         alert(rep.data.message)
    //                     }, 100);

    //                 }
    //                 else {
    //                     setTimeout(() => {
    //                         alert(rep.data.message)
    //                     }, 101);

    //                 }
    //             })
    //     }

    //     api = () => {
    //         AsyncStorage.getItem('token').then(resp => {
    //             this.setState({
    //                 token: resp
    //             })


    //             Api(this.state.token, "account/my-account", "GET")
    //                 .then(rep => {


    //                     if (rep.status == 200) {

    //                         setTimeout(() => {
    //                             var name = rep.data.data.firstName + " " + rep.data.data.lastName
    //                             this.setState({
    //                                 kyc: rep.data.data.kyc,

    //                                 email: rep.data.data.email,
    //                                 name: name,
    //                                 username: rep.data.data.firstName,
    //                                 mobileno: rep.data.data.phoneNo,

    //                                 address: rep.data.data.address,
    //                                 state: rep.data.data.state,
    //                                 city: rep.data.data.city,
    //                                 country: rep.data.data.country
    //                             })
    //                             if (this.state.kyc != null) {


    //                                 for (var i = 0; i < rep.data.data.kyc.document.length; i++) {


    //                                     if (rep.data.data.kyc.document[i].documentStatus == 'REJECTED'){

    //                                         this.setState({
    //                                             count:2
    //                                         })

    //                                     }
    // else if(rep.data.data.kyc.document[i].documentStatus == 'ACCEPTED'){
    //     this.setState({
    //         count:1
    //     })

    // }

    //                                 }

    //                             }
    //                         }, 200)


    //                     }
    //                     else if (rep.status == 400) {

    //                         console.log("if")
    //                     }
    //                     else {
    //                         setTimeout(() => {
    //                             alert(rep.data.message)
    //                         }, 100);


    //                     }
    //                 })
    //         }
    //         )

    //     }
    //     _changeView = (type) => {
    //         if (type == 'email') {
    //             this.setState(
    //                 {
    //                     emailinfo: true,
    //                     kycinfo: false,
    //                     uploadkycinfo: false,
    //                 }
    //             )
    //         }
    //         else if (type == 'kyc') {
    //             this.setState(
    //                 {
    //                     emailinfo: false,
    //                     kycinfo: true,
    //                     uploadkycinfo: false,
    //                 }
    //             )
    //         }
    //         else if (type == 'uploadKyc') {
    //             this.setState(
    //                 {
    //                     emailinfo: false,
    //                     kycinfo: false,
    //                     uploadkycinfo: true,
    //                 }
    //             )
    //         }
    //     }
    // componentDidMount() {
    //     this.props.navigation.addListener('focus', () => {
    //         this.setState(DefaultState)
    //         this.setState({ countryList: countryStateCityArr.getCountries()})
    //       });
    // }
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

    pickSingle1 = async (cropit, circular = true, mediaType) => {
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

            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }

            this.setState({ frontimage: imgobj.uri })
            this.setState({ frontimageuri: imgobj.uri })
            this.setState({ frontimagetype: imgobj.mime, frontImageStatus: true, frontImageError: '' })
            console.log("imageurll===>>>", imgobj.uri)
            // this.firstimage()

        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }
    captureSingle1 = async (cropit, circular = true, mediaType) => {
        ImagePicker.openCamera({
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

            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }

            this.setState({ frontimage: imgobj.uri })
            this.setState({ frontimageuri: imgobj.uri })
            this.setState({ frontimagetype: imgobj.mime, frontImageStatus: true, frontImageError: '' })
            console.log("imageurll===>>>", imgobj.uri)
            // this.firstimage()

        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }
    pickSingle2 = (cropit, circular = true, mediaType) => {
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

            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }


            this.setState({ backimageuri: imgobj.uri })
            this.setState({ backimagetype: imgobj.mime, backImageStatus: true, backImageError: '' })
            // this.SecondImage()
            console.log("imageurll===>>>", imgobj.uri)


        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }

    captureSingle2 = (cropit, circular = true, mediaType) => {
        ImagePicker.openCamera({
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
            let imgobj = { uri: image.path, width: image.width, height: image.height, mime: image.mime }
            this.setState({ backimageuri: imgobj.uri })
            this.setState({ backimagetype: imgobj.mime, backImageStatus: true, backImageError: '' })
            // this.SecondImage()
            console.log("imageurll===>>>", imgobj.uri)
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }


    submitHandler() {
        if (this.state.nameStatus) {
            if (this.state.emailStatus) {
                if (this.state.phoneNumberStatus) {
                    if (this.state.countryStatus) {
                        if (this.state.stateStatus) {
                            if (this.state.cityStatus) {
                                if (this.state.toggelCheckbox) {
                                    if (this.state.idTypeStatus) {
                                        if (this.state.idNumberStatus) {
                                            if (this.state.frontImageStatus) {
                                                if (this.state.backImageStatus) {
                                                    // alert('Successfull!')
                                                    this.Upload()
                                                    
                                                }
                                                else { this.setState({ backImageError: '*Please upload back page of ID' }) }
                                            }
                                            else { this.setState({ frontImageError: '*Please upload first page of ID' }) }
                                        }
                                        else { this.setState({ idNumberError: '*Please enter ID no.' }) }
                                    }
                                    else { this.setState({ idTypeError: '*Please enter type of ID' }) }
                                }
                                else { this.setState({ toggelCheckboxError: '*Please accept the terms to proceed' }) }
                            }
                            else { this.setState({ cityError: '*Please Select City' }) }
                        }
                        else { this.setState({ stateError: '*Please Select State' }) }
                    }
                    else { this.setState({ countryError: '*Please Select Country' }) }
                }
                else { this.setState({ phoneNumberError: '*Please enter phone number.', phoneNumberStatus: false }) }
            }
            else { this.setState({ emailError: '*Please enter email.', emailStatus: false }) }
        }
        else { this.setState({ nameError: '*Please enter name.', nameStatus: false }) }
    }

    selectCountryHandler(itemValue) {
        this.setState({ selectedCountry: itemValue.name, selectedCountryShortName: itemValue.shortName, countryListModal: !this.state.countryListModal })
        if (itemValue.name !== "") {
            let tempStateList = countryStateCityArr.getStatesByShort(`${itemValue.shortName}`)
            tempStateList = tempStateList.map((item, index) => {
                return ({ "name": item })
            })
            this.setState({ stateList: tempStateList })

            setTimeout(() => {
                this.setState({ countryStatus: true, countryError: '' }, () => console.log(this.state.stateList))
            }, 500);

        }
        else { this.setState({ stateList: [{ "name": "" }], countryStatus: false }) }


    }
    selectStateHandler(itemValue) {
        this.setState({ selectedState: itemValue.name, stateListModal: false })
        if (itemValue.name !== "") {


            let tempStateList = countryStateCityArr.getCities(this.state.selectedCountryShortName,
                itemValue.name)
            tempStateList = tempStateList.map((item, index) => {
                return ({ "name": item })
            })
            this.setState({ cityList: tempStateList, stateStatus: true, stateError: '', })


            if (countryStateCityArr.getCities(this.state.selectedCountryShortName, itemValue.name).length === 0) {
                this.setState({ cityStatus: true, cityError: '', })
            }
        }
        else {
            this.setState({ stateStatus: false, cityList: [{ "name": "" }] })
        }

    }


    selectCityHandler(itemValue) {
        {
            this.setState({ selectedCity: itemValue.name, cityListModal: !this.state.cityListModal })
            if (itemValue.name !== "") { this.setState({ cityStatus: true, cityError: '', }) }
            else { this.setState({ cityStatus: false }) }
        }
    }

    render() {
        // const {ADDRESS_AREA,SEARCH_LOCATION } = this.props.COMMON_TEXT
        // const {PROFILE_MANAGEMENT,KYC,WE_RESERVE_TIME,USER_TEST_GMAIL,YOUR_EMAIL_TEST} = this.props.KYC

        return (
            <SafeAreaView style={{ flex: 1 }}  >
                <CustomHeader text1={"KYC"} source1={back} onPress1={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView
                        style={styles.main}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                    >
                        <View style={{ marginVertical: hp(1) }}>
                            <Text style={{ fontWeight: 'bold', fontSize: dynamicSize(17) }}>{"PROFILE_MANAGEMENT"}</Text>
                            <Text style={{ fontSize: dynamicSize(15), marginVertical: hp(1.5) }}>User-{this.state.name}</Text>
                        </View>
                        <Text style={styles.redText}>{"WE_RESERVE_TIME"}</Text>
                        <View style={[styles.UnderlineTextWrapper, { width: wp(40), }]}>
                            <Text style={styles.UnderlineText}>Email Verification</Text>
                        </View>
                        <Text style={{
                            fontSize: dynamicSize(15),
                            marginVertical: hp(1.5)
                        }}>Your email-{this.state.email}</Text>
                        <Text style={{
                            fontSize: dynamicSize(15),
                            marginVertical: hp(1.5)
                        }}>To validate your account you have to validate your email address.</Text>
                        <View style={styles.VerifiedButtonContainer}>
                            <Image source={verifiedTick} resizeMode='contain' style={styles.verifiedIconStyle} />
                            <Text style={styles.VerifiedText}>
                                Verified
                       </Text>
                        </View>
                        <Text style={{ fontSize: dynamicSize(15), marginTop: hp(1.5) }}>If you face any issue please contact us at - </Text>
                        <Text style={{ fontSize: dynamicSize(15), color: TEALDARK }}>support@alende.org</Text>
                        <View style={[styles.UnderlineTextWrapper, { marginVertical: hp(3) }]}>
                            <Text style={styles.UnderlineText}>KYC User Information</Text>
                        </View>




                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.name}
                                onChangeText={(text) => this.handlevalidate(text, "name")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Your Name'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.nameError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.email}
                                onChangeText={(text) => this.handlevalidate(text, "email")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter Your Email'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.emailError}</Text>
                        <View style={styles.phNumberView} >
                            <View style={styles.phNumbersubView} >
                                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: (1), borderBottomColor: 'rgb(0,224,176)', width: dynamicSize(50), justifyContent: 'space-between' }} >
                                    {/* <View style={{ justifyContent: 'center' }} >
                                        <Image 
                                        // source={this.state.code}
                                         style={{ width: dynamicSize(15), height: dynamicSize(15) }} />
                                    </View> */}
                                    <View style={{ justifyContent: 'center', }} >
                                        <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }} >{this.state.countrycode}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: width - dynamicSize(100), justifyContent: 'center', borderBottomColor: 'rgb(0,224,176)', borderBottomWidth: 1 }} >
                                    <TextInput style={{ height: dynamicSize(40) }}
                                        value={this.state.phoneNumber}
                                        onChangeText={(text) => this.handlevalidate(text, "phoneNumber")} keyboardType={'numeric'} placeholder={"Enter Your Phone Number"} placeholderTextColor={'#a6a6a6'} />
                                </View>
                            </View>
                            <View style={{}}>
                                <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{""}</Text>
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneNumberError}</Text>
                        {/* *********MODAL*****************/}
                        <TouchableOpacity
                            onPress={() => this.setState({ country_list: !this.state.country_list })}
                            style={[styles.TextInput1]} >
                            <TextInput
                                editable={false}
                                value={this.state.country}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Select country'} />
                            <View

                                style={{ justifyContent: 'center', left: dynamicSize(-10) }} >
                                <Image source={ArrowDropDown} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.errorText}>{this.state.countryError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.state}
                                // onChangeText={(text) => this.handlevalidate(text, "state")}
                                onChangeText={(text) => this.setState({state:text})}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your state'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.stateError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.city}
                                // onChangeText={(text) => this.handlevalidate(text, "city")}
                                onChangeText={(text) => this.setState({city:text})}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter your city'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.cityError}</Text>
                        <View style={styles.checkboxView} >
                            <View style={styles.checkboxSubView} >
                                <TouchableOpacity onPress={() => {
                                    this.setState({ toggelCheckbox: !this.state.toggelCheckbox, toggelCheckboxError: '' })

                                }
                                } style={{ justifyContent: 'center' }} >
                                    <Image
                                        source={this.state.toggelCheckbox ? checkbox : uncheckbox} />
                                </TouchableOpacity>

                                <Text style={{ fontSize: dynamicSize(12), marginHorizontal: wp(3) }} >
                                    I take full responsibility to provide correct information.
                                            </Text>
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.toggelCheckboxError}</Text>

                        <View style={[styles.UnderlineTextWrapper, { marginVertical: hp(3), width: wp(57) }]}>
                            <Text style={[styles.UnderlineText, { fontSize: dynamicSize(19) }]}>Upload KYC Documents</Text>
                        </View>

                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.idType}
                                onChangeText={(text) => this.handlevalidate(text, "idType")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Enter type of ID'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.idTypeError}</Text>
                        <View style={styles.TextInput} >
                            <TextInput
                                value={this.state.idNumber}
                                onChangeText={(text) => this.handlevalidate(text, "idNumber")}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'ID no.'} />
                        </View>
                        <Text style={styles.errorText}>{this.state.idNumberError}</Text>
                        <Text style={{
                            fontSize: dynamicSize(14),
                            marginVertical: hp(1.5),
                        }}>{"Images of your id (front & back) format (.jpg, .jpeg, .png)"}</Text>

                        <View style={[styles.TextInput, { flexDirection: 'row', justifyContent: 'space-between' }]} >
                            <TextInput
                                editable={false}
                                style={{ width: wp(60) }}
                                onChangeText={(text) => this.setState({ name: true })}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Upload first page of your ID'} />
                            <TouchableOpacity
                                onPress={() => this.pickSingle1(true, true)}
                                style={{ alignSelf: 'center', height: hp(3), width: wp(8) }}>
                                <Image source={uploadPin} resizeMode='contain' style={{ alignSelf: 'center', height: hp(3), width: wp(8) }} />
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.errorText}>{this.state.frontImageError}</Text>

                        <View style={styles.IdAreaContainer}>
                            <ImageBackground
                                source={this.state.isLoading ? "" : { uri: this.state.frontimage }}

                                style={{ height: hp(21), width: wp(89), justifyContent: 'flex-end', alignSelf: 'center' }}>

                                <TouchableOpacity
                                    onPress={() => this.captureSingle1(true, true)}
                                    style={{ alignSelf: 'flex-end' }}>
                                    <Image resizeMode='contain' source={cameraIcon}
                                        style={styles.cameraIconStyle} />
                                </TouchableOpacity>

                            </ImageBackground>

                        </View>

                        <View style={[styles.TextInput, { flexDirection: 'row', justifyContent: 'space-between' }]} >
                            <TextInput
                                editable={false}
                                style={{ width: wp(60) }}
                                onChangeText={(text) => this.setState({ name: true })}
                                style={{ fontSize: dynamicSize(14) }} placeholder={'Upload first page of your ID'} />
                            <TouchableOpacity
                                onPress={() => this.pickSingle2(true, true)}
                                style={{ alignSelf: 'center', height: hp(3), width: wp(8) }}>
                                <Image source={uploadPin} resizeMode='contain' style={{ alignSelf: 'center', height: hp(3), width: wp(8) }} />
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.errorText}>{this.state.backImageError}</Text>

                        <View style={styles.IdAreaContainer}>
                            <ImageBackground
                                source={this.state.isLoading ? "" : { uri: this.state.backimageuri }}

                                style={{ height: hp(21), width: wp(89), justifyContent: 'flex-end', alignSelf: 'center' }}>

                                <TouchableOpacity
                                    onPress={() => this.captureSingle2(true, true)}
                                    style={{ alignSelf: 'flex-end' }}>
                                    <Image resizeMode='contain' source={cameraIcon}
                                        style={styles.cameraIconStyle} />
                                </TouchableOpacity>

                            </ImageBackground>

                        </View>

                        <View style={{ alignSelf: 'center', alignItems: 'center', }} >
                            <CustomButton
                                onPress={() => this.submitHandler()}
                                mainContainer={{ height: dynamicSize(150), width, alignSelf: 'center', }}
                                contain={{ height: dynamicSize(120), width, alignSelf: 'center', }}
                                image={largeButton}
                                textStyle={{ fontSize: getFontSize(20), alignSelf: 'center', marginTop: hp(-1) }}
                                title='Save Changes' />
                        </View>

                    </KeyboardAwareScrollView>
                    <CountryModal
                        data={Country}
                        visible={this.state.country_list}
                        onPress={(x) => this.Set_value(x)}
                        cancelPress={() => this.setState({ country_list: !this.state.country_list })}
                        cancelModal={() => this.setState({ yearView: false })}
                    />

                </ScrollView>



            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        KYC: state.reducer.language.KYC,
        COMMON_TEXT: state.reducer.language.COMMON_TEXT,
        // token: state.AuthReducer.Token

    }
}

// export default connect(mapStateToProps)(KYC);
