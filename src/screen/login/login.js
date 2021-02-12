import React, { Component } from 'react'
import { Text, StyleSheet, TextInput, View, Image, FlatList, Alert, 
    TouchableOpacity, Dimensions, ImageBackground, Modal ,Linking} from 'react-native'
import { dynamicSize } from '../../utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { applogo, backgroundRight, roundButton, checkbox, uncheckbox, hide, show, call, padlock, backgroundLeft } from '../../assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CardComponent, CardComponent2 } from '../../components/card'
import DefaultState from "./constant"
import AsyncStorage from '@react-native-community/async-storage';
import { validateEmail, validateMobileNo, validatePassword } from '../../utils/validation'
import { Input, Input_Password } from '../../components/customTextInput'
import { CustomButton } from '../../components/button'
import { LinearTextGradient } from 'react-native-text-gradient'
import { connect, } from 'react-redux';
import { SaveTokenAction } from '../../Redux/Action/AuthAction';
import { bindActionCreators } from 'redux';
import Api from '../../api/Api'
import { CountryModal } from "../../commonComponents/CountryModalFilter"
import { Country } from '../../commonComponents/countrycode'
const { width, height } = Dimensions.get('window');
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            logIn: true,
            emailColor: false,
            toggelCheckbox: true,
            email: '',
            emailError: '',
            ////* xxxxxxxxxxxxxxxxxxxxxxxxxx    True for testing purpose**xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx**/
            emailErrorStatus: true,
            newpassword: "",
            newpasswordStatus: false,
            newpasswordError: '',
            confirmPassword: "",
            confirmPasswordStatus: false,
            confirmPasswordError: "",
            SignupemailColor: false,
            Signupemail: '',
            SignupemailError: '',
            SignupemailErrorStatus: '',
            Signuppassword: '',
            SignuppasswordError: '',
            SignuppasswordColor: false,
            Signupphone: '',
            SignupphoneError: '',
            SignupphoneColor: false,
            password: '',
            passwordError: '',
            ////* xxxxxxxxxxxxxxxxxxxxxxxxxx    True for testing purpose**xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx**/
            passwordErrorStatus: true,
            passwordColor: false,
            show: false,
            show2: false,
            code: require('../../assets/countryimages/de.png'),
            checkBoxError: '',
            countryCode: '49',
            ActiveTwoFA: true,
            // require('../../assets/countryimages/in.png')
            // codevisible:true
            country_list: false,
            selectedCode: '49',
            // countryIcon
        }
    }

    componentDidMount() {
        // this.get2FAStatus()
        // this.props.navigation.addListener('focus', () => {
        // this.setState({email:'',password:'',emailError:'',passwordError:'',emailStatus:false,passwordStatus:false,termAndConditionToggle:false})
        // })
        // const initialUrl = await Linking.getInitialURL()
        // if (initialUrl) this.handleLinkingUrl(initialUrl)
        // Linking.addEventListener('url', ({ url }) => {
        //   this.handleLinkingUrl(url)
        // })
    }

    // handleLinkingUrl = url => {
    //     alert("Work is done!")
    //     console.log("Deep Linking==>",url)
    //   }

    Set_value = (item) => {
        console.log("Country Code ====>", item.dialCode)
        this.setState({ country_list: !this.state.country_list, countryCode: item.dialCode, code: item.icon })
    }

    async get2FAStatus() {
        let toogle = await AsyncStorage.getItem('switch').then(resp => {
            if (resp != null) {
                let parsed = JSON.parse(toogle);
                this.setState({ ActiveTwoFA: parsed.ActiveTwoFA })
            }
            console.log("ActiveTwofa==>>", this.state.ActiveTwoFA)
        })
    }

    renderCountry = (item, index) => {
        console.log("data===>", item)
        return (
            <View style={{ alignItems: 'center', }}>
            </View>
        )
    }

    validationLogin = (text, type) => {
        if (type == 'email') {
            this.setState({
                email: text
            })
            this.setState({
                emailError: validateEmail(text).error,
                emailErrorStatus: validateEmail(text).status
            })
            // this.state.emailError = validateEmail(text).error;
            // this.state.emailErrorStatus = validateEmail(text).status;
        }
        else {
            this.setState({
                password: text,
            })
            this.setState({
                passwordError: validatePassword(text).error,
                passwordErrorStatus: validatePassword(text).status
            })
        }
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

    validation = (text, type) => {
        if (type == 'email') {
            this.setState({
                Signupemail: text
            })
            this.state.SignupemailError = validateEmail(text).error;
            this.state.SignupemailErrorStatus = validateEmail(text).status;

        }
        else if (type == 'phoneNumber') {
            this.setState({
                Signupphone: text
            })
            this.state.SignupphoneError = validateMobileNo(text).error;
            this.state.SignupphoneErrorStatus = validateMobileNo(text).status;

        }
        else if (type == 'password') {
            this.setState({
                newpassword: text
            })
            this.state.newpasswordError = validatePassword(text).error;
            this.state.newpasswordStatus = validatePassword(text).status;

        }
        else {
            this.setState({
                confirmPassword: text
            })
            setTimeout(() => {
                if (this.state.newpassword == this.state.confirmPassword) {

                    this.setState({
                        confirmPasswordError: "",
                        confirmPasswordStatus: true
                    })
                }
                else {
                    this.setState({
                        confirmPasswordError: "Password not match",
                        conconfirmPasswordStatus: false
                    })
                }
            }, 200)
        }

    }
    // getDataFromServerWithPost = ({ endPoint, token, req }) => {

    //     return new Promise((resolved, rejected) => {
    //         fetch("http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1617/account/upload-file", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             body: req
    //         })
    //             .then(response => response.json()
    //                 .then(resp => {
    //                     if (resp.status == 200)
    //                         resolved(resp)
    //                     else
    //                         rejected(resp);

    //                 })).catch(err => rejected(err))
    //     })
    // }
    // Profile = () => {
    //     let formdata = new FormData();
    //     formdata.append("file", {
    //         uri: this.state.imageuri,
    //         name: this.state.imagename,
    //         type: this.state.imagetype
    //     })

    //     let data = {
    //         req: formdata,
    //     }

    //     this.getDataFromServerWithPost(data)
    //         .then(resp => {
    //             if (resp.status == 200) {
    //                 this.setState({
    //                     isLoading: false,
    //                     imageUrl: resp.data,
    //                     avatarSource: this.state.avatar
    //                 })

    //             }
    //             else {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert("Please upload image again within the size of 10 MB")
    //                 }, 100)
    //             }
    //         })
    // }
    // signupPress = () => {
    //     if (this.state.firstName != '') {
    //         // if (this.state.address != '') {
    //             // if (this.state.selectedCountry != '') {
    //             //     if (this.state.selectedState != '') {
    //             //         if (this.state.selectedCity != '') {
    //             //             if (this.state.phoneNo != '') {
    //                             if (this.state.firstnameError == '') {
    //                                 if (this.state.middlenameError == '') {
    //                                     if (this.state.lastnameError == '') {
    //                                         if (this.state.addressError == '') {
    //                                             if (this.state.phonenoError == '') {
    //                                                 // this.signup()
    //                                                 this.props.navigation.navigate('dashboard')
    //                                             } else {
    //                                                 this.setState({ phonenoError: '*Enter valid phone number' })
    //                                             }
    //                                         } else {
    //                                             this.setState({ addressError: '*Enter valid address' })
    //                                         }
    //                                     } else {
    //                                         this.setState({ lastnameError: '*Enter valid name' })
    //                                     }
    //                                 } else {
    //                                     this.setState({ middlenameError: '*Enter valid name' })
    //                                 }
    //                             } else {
    //                                 this.setState({ firstnameError: '*Enter valid name' })
    //                             }
    //             //             } else {
    //             //                 this.setState({ phonenoError: '*Enter phone number' })
    //             //             }
    //             //         } else {
    //             //             this.setState({ selectedCityError: '*Please select city' })
    //             //         }
    //             //     } else {
    //             //         this.setState({ selectedStateError: '*Please select state' })
    //             //     }
    //             // } else {
    //             //     this.setState({ selectedCountryError: '*Please select Country' })
    //             // }
    //         // } 
    //         // else {
    //         //     this.setState({ addressError: '*Enter address' })
    //         // }

    //     } else {
    //         this.setState({ firstnameError: '*Enter first name' })
    //     }
    // }

    // signup = () => {
    //     this.setState({
    //         isLoading: true
    //     })
    //     var phoneno = this.state.selectedCode + this.state.phoneNo
    //    let variable = {
    //         "firstName": this.state.firstName + " " + this.state.middleName,
    //         "lastName": this.state.lastName,
    //         // "address": this.state.address,
    //         "country": this.state.selectedCountry,
    //         "imageUrl": this.state.imageUrl,
    //         "email": this.state.email,
    //         "password": this.state.password,
    //         "phoneNo": phoneno,
    //         "dob": this.state.dateofbirth,
    //         "state": this.state.selectedState,
    //         "city": this.state.selectedCity,
    //         "webUrl": "http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1617/"
    //     }

    //     Api('', "account/signup", "POST", variable)
    //         .then(resp => {
    //           console.log("data_signup==>",resp)
    //             if (resp.status == 200) {

    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 if (resp.data.status == 200) {

    //                     setTimeout(() => {
    //                         Alert.alert(
    //                             '',
    //                             "Signup verification link send to your registered email",
    //                             [
    //                                 { text: 'OK', onPress: () => this.props.navigation.navigate("login") },
    //                             ],
    //                             { cancelable: false }
    //                         )
    //                     }, 100)
    //                 }
    //                 else if (resp.data.status == 205) {
    //                     this.setState({
    //                         isLoading: false
    //                     })
    //                     setTimeout(() => {
    //                         alert(resp.data.message)
    //                     }, 100);
    //                 }


    //             }
    //             else if (resp.status == 400) {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert(resp.data.message)
    //                 }, 100);

    //             }
    //             else {
    //                 this.setState({
    //                     isLoading: false
    //                 })
    //                 setTimeout(() => {
    //                     alert(JSON.stringify(resp))
    //                 }, 100);
    //             }
    //         })
    // }

    loginPress() {

        if (this.state.email != "") {
            if (this.state.passwordErrorStatus) {

                if (this.state.toggelCheckbox === false) {

                    this._login();
                    // this.props.navigation.navigate('dashboard')
                }
                else {
                    this.setState({ checkBoxError: "*Please accept Terms & Conditions" })
                }

            }

            else {
                this.setState({ passwordError: "*Please enter password" })
            }
        } else {
            this.setState({ emailError: "*Please enter email id" })
        }
    }
    _login() {

        let data = {
            email: this.state.email,
            password: this.state.password,
            // isChecked: this.state.isChecked
        }
        AsyncStorage.setItem('userCredentials', JSON.stringify(data))

        this._api()

    }

    _api() {
        this.setState({
            isLoading: true
        })
        let variable = {
            "email": this.state.email,
            "password": this.state.password
        }
        AsyncStorage.setItem("variable", JSON.stringify(variable))


        Api('', "auth", "POST", variable)
            .then(resp => {
                console.log("data_login==>", resp)
                if (resp.status == 200) {
                    this.setState({ isLoading: false })
                    this.props.actions.SaveTokenAction(resp.data.data.token)
                    AsyncStorage.setItem("token", resp.data.data.token)
                    AsyncStorage.setItem("2fatype", resp.data.data.TwoFa)
                    this.props.navigation.navigate("Multilanguage", { 'fromDrawer': false })
                    // if (resp.data.data.TwoFa == 'NONE') {
                    //     this.props.navigation.navigate('twoFA')
                    // }
                    // else if (resp.data.data.TwoFa == 'SKIP') {
                    //     this.props.navigation.navigate('logged')
                    // }
                    // else if (resp.data.data.TwoFa == 'GOOGLE') {
                    //     this.props.navigation.navigate('GoogleAuthLogin', { data: '1' })
                    // }
                    // else if (resp.data.data.TwoFa == 'SMS') {
                    //     this.props.navigation.navigate('SMSAuthLogin', { data: '2' })
                    // }
                }

                else if (resp.status == 400) {
                    this.setState({
                        isLoading: false
                    })
                    setTimeout(() => {
                        alert(resp.data.message)
                    }, 100);

                }
                else if (resp.data.responseCode == 1000) {
                    this.setState({
                        isLoading: false
                    })
                    Alert.alert(
                        '',
                        "Please check your internet connection.",
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );

                }
                else {
                    this.setState({
                        isLoading: false
                    })
                    Alert.alert(
                        '',
                        resp.data.message,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                }
            })

    }


    SignupSubmit = async () => {

        if (this.state.SignupemailErrorStatus) {
            if (this.state.SignupphoneErrorStatus) {
                if (this.state.newpasswordStatus) {
                    if (this.state.confirmPasswordStatus) {
                        if (this.state.toggelCheckbox === false) {
                            let SigninDetails =
                            {
                                "email": this.state.Signupemail,
                                "phoneNo": this.state.countrycode + this.state.Signupphone,
                                "countryCode": this.state.countrycode,
                                "password": this.state.newpassword,
                                "pnWithoutCountryCode": this.state.Signupphone,
                                "webUrl": "fullstackblockchain://"
                            }
                            this.props.navigation.navigate('UserInfo', { "FormData": SigninDetails })
                            // alert("Successfull")
                        }
                        else { this.setState({ checkBoxError: "*Please accept Terms & Conditions" }) }
                    }
                    else { this.setState({ confirmPasswordError: '*Please enter confirm password.', confirmPasswordStatus: false, activeconfirmPasswordBorderColor: true }) }
                }
                else { this.setState({ newpasswordError: '*Please enter password.', passwordStatus: false, activepasswordBorderColor: true }) }
            }
            else { this.setState({ SignupphoneError: '*Please enter phone number.', phoneNumberStatus: false, activephoneNumberBorderError: true }) }
        }
        else { this.setState({ SignupemailError: '*Please enter email.', emailStatus: false, activeemailBorderColor: true }) }
    }

    render() {
        return (
            <ImageBackground source={this.state.logIn ? backgroundLeft : backgroundRight}
                resizeMode='stretch'
                style={styles.mainContainer}  >
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraScrollHeight={20}
                    contentContainerStyle={{ flex: 1 }}
                    showsverticalscrollindicator={false}
                    scrollEnabled={true}>
                    <View style={styles.logoView} >
                        <Image source={applogo}
                            resizeMode='stretch'
                            style={styles.logoImage} />
                    </View>
                    <View style={styles.textView} >
                        <TouchableOpacity style={{ right: 28, marginTop: 10 }}
                            onPress={() => this.setState({ logIn: !this.state.logIn, signUp: !this.state.signUp })} >
                            {this.state.logIn ?
                                <LinearTextGradient
                                    style={{ fontWeight: "bold", fontSize: 72 }}
                                    locations={[0, 1]}
                                    colors={['rgb(255,255,255)', "rgb(255,255,255)"]}
                                    start={{ x: 1, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: dynamicSize(34),
                                        textAlign: 'center',
                                        color: 'white'
                                    }} >
                                        Login
                       </Text>
                                </LinearTextGradient>
                                :
                                <LinearTextGradient
                                    style={{ fontWeight: "bold", fontSize: 72 }}
                                    locations={[0, 1]}
                                    colors={['rgb(0,176,155)', "rgb(0,224,176)"]}
                                    start={{ x: 1, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: dynamicSize(34),
                                        color: 'rgb(43,218,172)'
                                    }} >
                                        Login
                       </Text>
                                </LinearTextGradient>

                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={{ left: 25 }}
                            onPress={() => this.setState({ signUp: true, logIn: false })} >
                            <LinearTextGradient
                                style={{ fontWeight: "bold", fontSize: 72 }}
                                locations={[0, 1]}
                                colors={this.state.signUp ? ['white', "white"] : ['rgb(0,176,155)', "rgb(0,224,176)"]}
                                start={{ x: 1, y: 1 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {this.state.signUp == true ?
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: dynamicSize(34),
                                        color: 'white',
                                        textAlign: 'center'
                                    }} >  Sign Up</Text>
                                    :
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: dynamicSize(34),
                                        color: 'rgb(43,218,172)'
                                    }} >  Sign Up</Text>
                                }
                            </LinearTextGradient>

                        </TouchableOpacity>

                    </View>
                    {this.state.logIn ? <View>
                        <CardComponent>
                            <View style={styles.inputView} >
                                <Input
                                    onChangeText={(text) => { this.validationLogin(text, 'email') }}
                                    icon={call}
                                    value={this.state.email}
                                    holder={'Enter email or phone number'}
                                />
                                <View style={{ width: width - dynamicSize(100), alignSelf: 'center', justifyContent: 'flex-start' }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.emailError}</Text>
                                </View>
                            </View>
                            <View style={styles.inputView} >
                                <Input_Password
                                    onChangeText={(text) => { this.validationLogin(text, 'password') }}
                                    icon={padlock}
                                    value={this.state.password}
                                    secureTextEntry={this.state.show ? false : true}
                                    onPressIcon2={() => this.setState({ show: !this.state.show })}
                                    Icon_second={true}
                                    icon_2={this.state.show ? show : hide}
                                    holder={'Enter password'}
                                />
                                <View style={{ width: width - dynamicSize(100), alignSelf: 'center', justifyContent: 'flex-start' }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.passwordError}</Text>
                                </View>
                            </View>
                            <View style={{ width: width - dynamicSize(100), alignItems: 'flex-end', marginVertical: dynamicSize(20) }} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}

                                    style={{ borderBottomWidth: dynamicSize(1), borderBottomColor: 'rgba(187,186,186,0.7)' }} >
                                    <Text style={{ fontSize: dynamicSize(14), color: 'rgba(187,186,186,0.7)' }} >
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.checkboxView} >
                                <View style={styles.checkboxSubView} >
                                    <TouchableOpacity onPress={() => this.setState({ toggelCheckbox: !this.state.toggelCheckbox, checkBoxError: "" })
                                    } style={{ justifyContent: 'center' }} >
                                        <Image source={this.state.toggelCheckbox ? uncheckbox : checkbox} />
                                    </TouchableOpacity>
                                    <View style={{ left: dynamicSize(5), width: dynamicSize(205), flexDirection: 'row', justifyContent: 'space-around' }} >
                                        <Text style={{ fontSize: dynamicSize(14), }} >
                                            {"  I agree to the     "}
                                        </Text>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("TermsAndCondition")}
                                            style={{ borderBottomWidth: dynamicSize(1), borderBottomColor: 'rgb(0,224,176)' }} >
                                            <Text style={{ fontSize: dynamicSize(14), color: 'rgb(0,224,176)' }} >
                                                {"Terms & Conditions"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{ width: width - dynamicSize(100), alignSelf: 'center', justifyContent: 'flex-start' }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.checkBoxError}</Text>
                                </View>
                            </View>

                        </CardComponent>
                        <View style={{ height: dynamicSize(65), width: width - dynamicSize(100), alignSelf: 'center', alignItems: 'center', }} >
                            <CustomButton contain={{ height: dynamicSize(100), width: dynamicSize(185), alignSelf: 'center', }}
                                onPress={() => this.loginPress()}
                                title='LOGIN'
                                textStyle={{ marginTop: hp(-1) }}
                                image={roundButton}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                            height: dynamicSize(170), width: width - dynamicSize(150),
                            alignItems: 'flex-end', alignSelf: 'center'
                        }} >
                            <View>
                                <Text style={{ fontSize: dynamicSize(14), }} >
                                    Not registered yet?
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ logIn: false, signUp: true })} style={{backgroundColor:'red', borderBottomWidth: dynamicSize(1), borderBottomColor: 'rgb(0,224,176)' }} >
                                <Text style={{ fontSize: dynamicSize(14), color: 'rgb(0,224,176)' }} >
                                    Create account
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                        :
                        //+================================Signup-----------------------
                        <View>
                            <CardComponent2 cardViewStyle={{ height: dynamicSize(400) }} >
                                <View style={styles.inputView} >
                                    <Input
                                        onChangeText={(text) => { this.validation(text, 'email') }}
                                        icon={call}
                                        holder={'Enter your email '}
                                    />
                                    <View style={{ width: width - dynamicSize(100), alignSelf: 'center' }}>
                                        <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.SignupemailError}</Text>
                                    </View>
                                </View>
                                <View style={styles.phNumberView} >
                                    <View style={styles.phNumbersubView} >
                                        <TouchableOpacity onPress={() => this.setState({ country_list: true })}
                                            style={{ flexDirection: 'row', borderBottomWidth: (1), borderBottomColor: 'rgb(0,172,153)', width: dynamicSize(50), justifyContent: 'space-between' }} >
                                            <View style={{ justifyContent: 'center' }} >
                                                <Image source={this.state.code} style={{ width: dynamicSize(15), height: dynamicSize(15) }} />
                                            </View>
                                            <View style={{ justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 14, color: 'black' }} >{this.state.countryCode}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: width - dynamicSize(155), borderBottomColor: 'rgb(0,172,153)', borderBottomWidth: 1 }} >
                                            <TextInput
                                                maxLength={14}
                                                onChangeText={(text) => { this.validation(text, 'phoneNumber') }}
                                                keyboardType={'numeric'}
                                                placeholder={"Enter your phone number"}
                                                placeholderTextColor={'lightgrey'} />
                                            <View style={{}}>
                                                <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.SignupphoneError}</Text>
                                            </View>
                                        </View>
                                        {/* <Modal style={{ height: height / 2 }}
                                            animationType="none"
                                            transparent={true}
                                            visible={this.state.codevisible}
                                            >

            <View
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    backgroundColor:'rgba(19,20,50,0.5)', 
                    // opacity: 1
                }}>
                <View style={{
                    height: height / 2,
                    width:width-dynamicSize(60), justifyContent: "center",
                    alignSelf: "center", 
                    alignItems: "center",
                    backgroundColor: 'white', 
                    borderRadius:dynamicSize(25)
                    // paddingVertical: 15,
                    // borderColor: 'rgb(224 ,163, 84)',
                    // borderWidth: 1
                }}>
                    <FlatList
                    data={country_Code}
                    renderItem={({ item, index }) =>this.renderCountry(item, index)}
                    keyExtracter={(index) => { return index }}
                    extraData={this.state}
                    scrollEnabled={true}
                      
                        
                    />
                    <TouchableOpacity
                        style={{ borderRadius: 20, width:dynamicSize(60),  }}>
                       
                            <Text style={{
                                alignSelf: "center",
                                marginVertical: 10,
                                fontWeight: "bold",
                                fontSize: 20,
                                color: 'white'
                            }}>{"Cancel"}</Text>
                    </TouchableOpacity>
                </View>



                </View>
</Modal> */}
                                    </View>
                                </View>
                                <Input_Password
                                    onChangeText={(text) => { this.validation(text, 'password') }}
                                    icon={padlock}
                                    secureTextEntry={this.state.show ? false : true}
                                    onPressIcon2={() => this.setState({ show: !this.state.show })}
                                    Icon_second={true}
                                    icon_2={this.state.show ? show : hide}
                                    holder={'Enter password'}
                                />
                                <View style={{ width: width - dynamicSize(100) }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.newpasswordError}</Text>
                                </View>
                                <Input_Password
                                    onChangeText={(text) => { this.validation(text, 'comfpassword') }}
                                    icon={padlock}
                                    secureTextEntry={this.state.show2 ? false : true}
                                    onPressIcon2={() => this.setState({ show2: !this.state.show2 })}
                                    Icon_second={true}
                                    icon_2={this.state.show2 ? show : hide}
                                    holder={'Confirm your password'}
                                />
                                <View style={{ width: width - dynamicSize(100) }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.confirmPasswordError}</Text>
                                </View>
                                <View style={styles.checkboxView} >
                                    <View style={styles.checkboxSubView} >
                                        <TouchableOpacity onPress={() => this.setState({ toggelCheckbox: !this.state.toggelCheckbox, checkBoxError: "" })
                                        } style={{ justifyContent: 'center' }} >
                                            <Image source={this.state.toggelCheckbox ? uncheckbox : checkbox} />
                                        </TouchableOpacity>
                                        <View style={{ width: dynamicSize(205), flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <Text style={{ fontSize: dynamicSize(14), }} >
                                                {"  I agree to the "}
                                            </Text>
                                            <TouchableOpacity style={{ borderBottomWidth: dynamicSize(1), borderBottomColor: 'rgb(0,224,176)' }} >
                                                <Text style={{ fontSize: dynamicSize(14), color: 'rgb(0,224,176)' }} >
                                                    Terms & Conditions
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ width: width - dynamicSize(100) }}>
                                        <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.checkBoxError}</Text>
                                    </View>
                                </View>
                            </CardComponent2>

                            <View style={{
                                height: dynamicSize(50), width: dynamicSize(100), marginVertical: dynamicSize(20),
                                 alignSelf: 'center', alignItems: 'center',
                            }} >
                                <CustomButton
                                    onPress={() => this.SignupSubmit()}
                                    mainContainer={{height: dynamicSize(50), width: dynamicSize(100),}}
                                    // onPress={() => this.props.navigation.navigate("Multilanguage",{'fromDrawer':false})}
                                    //  onPress={()=>this.props.navigation.navigate("Multilanguage"),{'fromDrawer':false}}
                                    contain={{ height: dynamicSize(100), width: dynamicSize(185), alignSelf: 'center', }}
                                    image={roundButton}
                                    textStyle={{ marginTop: hp(-1) }}
                                    title='SIGN UP' />
                            </View>
                            <View style={{
                                height: dynamicSize(130),
                                flexDirection: 'row', justifyContent: 'space-around', width: width - dynamicSize(200),
                                alignItems: 'flex-end', alignSelf: 'center',
                            }} >
                                <View style={{ fontSize: dynamicSize(14), }} >
                                    <Text style={{ fontSize: dynamicSize(14), }} >
                                        Already registered?
                                 </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ logIn: true, signUp: false })} 
                                style={{ borderBottomWidth: dynamicSize(1), borderBottomColor: 'rgb(0,224,176)' }} >
                                    <Text style={{ fontSize: dynamicSize(14), color: 'rgb(0,224,176)' }} >
                                        Log In
                                 </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }


                    <CountryModal
                        data={Country}
                        visible={this.state.country_list}
                        onPress={(x) => this.Set_value(x)}
                        cancelPress={() => this.setState({ country_list: !this.state.country_list })}
                        cancelModal={() => this.setState({ yearView: false })}
                    />
                </KeyboardAwareScrollView>

            </ImageBackground>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        flex: 1,
        width: width,
        alignSelf: 'center'
    },
    phNumberView: {
        width: width - dynamicSize(100),
        height: dynamicSize(50),
        alignSelf: 'center',
        justifyContent: 'flex-start',

    },
    phNumbersubView: {
        height: dynamicSize(45), flexDirection: 'row', justifyContent: 'space-between'
    },
    logoImage: {
        width: dynamicSize(250),
        height: dynamicSize(100),
        marginBottom: 28

    },
    logoView: {
        alignSelf: 'center',
        width: width - dynamicSize(30),
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: dynamicSize(200),

    },
    mainSubContainer: {
        flex: 1,
        height: height,
        justifyContent: 'center',
        // height:dynamicSize(500),
        width: width
    },
    inputView: {
        // justifyContent:'center',
        // height:dynamicSize(500),
        width: width - dynamicSize(60),
        alignSelf: 'center',
        // backgroundColor:'green',
        justifyContent: 'center'
    },
    mainSub1Container: {
        height: dynamicSize(500),
        // width:dynamicSize(200),
        zIndex: 1
    },
    Text1: {
        color: 'white',
        fontSize: dynamicSize(34),
        fontWeight: 'bold'
    },
    TextView: {
        // backgroundColor:'red',
        alignSelf: 'center',
        height: dynamicSize(80),
        justifyContent: 'center'
    },
    card: {
        height: dynamicSize(500),
        width: dynamicSize(200),
        zIndex: 1, backgroundColor: 'red'
    },
    textView: {
        height: dynamicSize(50),
        top: dynamicSize(20),
        // backgroundColor:'red',
        justifyContent: 'center',
        width: width - dynamicSize(100),
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    text1: {
        fontWeight: 'bold',
        fontSize: dynamicSize(34),
        color: 'white'
    },
    cardView: {
        // backgroundColor:'red',
        width: width - dynamicSize(30),
        height: dynamicSize(300),
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center'
    },
    checkboxView: {
        marginVertical: dynamicSize(0),
        width: width - dynamicSize(100),
        // flexDirection:'row',
        alignSelf: 'center'
    },
    checkboxSubView: {
        width: width - dynamicSize(100),
        flexDirection: 'row',
        alignSelf: 'center'
    }
})
const mapStateToProps = state => {

    return {
        isLoading: state
    }
}


const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ SaveTokenAction }, dispatch) }
}

export default connect(mapStateToProps,
    mapDispatchToProps
)(Login);