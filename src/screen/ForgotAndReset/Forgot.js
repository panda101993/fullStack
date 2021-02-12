import React, { Component } from 'react'
import { Alert, Text, StyleSheet, TextInput, View, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal } from 'react-native'
import { dynamicSize } from '../../utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { applogo, backgroundRight, roundButton, checkbox, uncheckbox, hide, show, call, padlock, ForgotBG } from '../../assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CardComponent, CardComponent2 } from '../../components/card'
import DefaultState from "../login/constant"
import { validateEmail, validateMobileNo, validateOTP, validatePassword } from '../../utils/validation'
import { Input, Input_Password } from '../../components/customTextInput'
import { CustomButton } from '../../components/button'
import { LinearTextGradient } from 'react-native-text-gradient'
import Api from '../../api/Api'
// import country_Code from './countryCode'
const { width, height } = Dimensions.get('window');
export default class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            logIn: true,
            emailColor: false,
            toggelCheckbox: true,
            email: '',
            emailError: '',
            codeError:'',
            codeErrorStatus:'',
            emailErrorStatus: '',
            newpassword: "",
            newpasswordStatus: false,
            newpasswordError: '',
            confirmPassword: "",
            confirmPasswordStatus: false,
            confirmPasswordError: "",
            SignupemailColor: false,
            Signupemail: 'aa@aa.ghj',
            SignupemailError: '',
            SignupemailErrorStatus: '',
            Signuppassword: '123333',
            SignuppasswordError: '',
            SignuppasswordColor: false,
            Signupphone: '12333312333',
            SignupphoneError: '',
            SignupphoneColor: false,
            password: '123333',
            passwordError: '',
            passwordColor: false,
            show: false,
            show2: false,
            code: require('../../assets/countryimages/in.png')
            // require('../../assets/countryimages/in.png')
            // codevisible:true
        }
    }

    // onEmailFocus() {
    //     this.setState({ emailColor: true })
    // }
    // onEmailBlur() {
    //     this.setState({ emailColor: false })
    // }

    validation = (text, type) => {
        if (type == 'email') {
            this.setState({
                email: text
            })
            this.state.emailError = validateEmail(text).error;
            this.state.emailErrorStatus = validateEmail(text).status;

        }
    }
    validationCode =(code ,type) =>{
        console.log("COOOODE===>",code)
        if (type == 'code') {
            this.setState({
                codeUsed: code
            })
            this.state.codeError = validateOTP(code).error;
            this.state.codeErrorStatus = validateOTP(code).status;

        }
    }

    forgotPress = () => {
        if (this.state.email != "") {
            if (this.state.emailError == "") {
                this.forgot();

            }
            else {
                this.setState({ emailError: "Please enter valid email id" })
            }
        }
        else {
            this.setState({ emailError: "Please enter email id" })
        }
    }
    SubmitOtp=()=>{
        if (this.state.code != "") {
            if (this.state.codeError == "") {
                this.SubmitOTPForm();

            }
            else {
                this.setState({ emailError: "Please enter valid code" })
            }
        }
        else {
            this.setState({ emailError: "Please enter code" })
        }
    }
    SubmitOTPForm(){
        this.setState({
            isLoading: true
        })
        var variable = {
            "code":this.state.codeUsed
        }
        Api("", `account/verify-sms-code-mobile-app?email=${this.state.email}`, "POST", variable)
            .then(async resp => {
                console.log("signupapiresp====>>>>", resp)
                switch (resp.status) {
                    case (900): {
                        this.setState({ isLoading: false })

                        Alert.alert(
                            '',
                            "Please check your internet connection.",
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );

                        break;
                    }
                    case (200): {
                        this.setState({ isLoading: false })
                        if (resp.data.status == 200) {
                            Alert.alert(
                                "",
                                resp.data.message,
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            // this.setState({ logIn: !this.state.logIn})
                                            this.props.navigation.navigate('Reset',{ "UserEmail": this.state.email })
                                            

                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                            //  


                        }
                        else {
                            Alert.alert(
                                "",
                                resp.data.message,
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            console.log('OK Pressed')


                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                        }



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

    forgot() {
        this.setState({
            isLoading: true
        })
        var variable = {}
        Api("", `account/forget-password/mobiloitApp?email=${this.state.email}`, "GET", variable)
            .then(async resp => {
                console.log("signupapiresp====>>>>", resp)
                switch (resp.status) {
                    case (900): {
                        this.setState({ isLoading: false })

                        Alert.alert(
                            '',
                            "Please check your internet connection.",
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );

                        break;
                    }
                    case (200): {
                        this.setState({ isLoading: false })
                        if (resp.data.status == 200) {
                            Alert.alert(
                                "",
                                resp.data.message,
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            this.setState({ logIn: !this.state.logIn})
                                            // this.props.navigation.navigate('OTP', { "UserEmail": this.state.email })
                                            

                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                            //  


                        }
                        else {
                            Alert.alert(
                                "",
                                resp.data.message,
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            console.log('OK Pressed')


                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                        }



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
    RESEND() {
        this.setState({
            isLoading: true
        })
        var variable = {}
        Api("", `account/forget-password/mobiloitApp?email=${this.state.email}`, "GET", variable)
            .then(async resp => {
                console.log("signupapiresp====>>>>", resp)
                switch (resp.status) {
                    case (900): {
                        this.setState({ isLoading: false })

                        Alert.alert(
                            '',
                            "Please check your internet connection.",
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );

                        break;
                    }
                    case (200): {
                        this.setState({ isLoading: false })
                        if (resp.data.status == 200) {
                            Alert.alert(
                                "",
                                resp.data.message,
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            this.setState({ logIn:false})
                                            // this.props.navigation.navigate('OTP', { "UserEmail": this.state.email })
                                            

                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                            //  


                        }
                        else {
                            Alert.alert(
                                "",
                                resp.data.message,
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            console.log('OK Pressed')


                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                        }



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

    render() {
        return (
            <ImageBackground source={ForgotBG}
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
                        <TouchableOpacity style={{ right: 28, marginTop: 10, }}
                            onPress={() => this.setState({ logIn: !this.state.logIn, signUp: !this.state.signUp })} >

                            <LinearTextGradient
                                style={{ fontWeight: "bold", fontSize: 72 }}
                                locations={[0, 1]}
                                colors={['rgb(255,255,255)', "rgb(255,255,255)"]}
                                start={{ x: 1, y: 1 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: dynamicSize(24),
                                    textAlign: 'center',
                                    color: 'white'
                                }} >
                                    Forgot Password
                       </Text>
                            </LinearTextGradient>

                        </TouchableOpacity>



                    </View>
                    {this.state.logIn ?
                        <View style={{ height: hp(40), marginVertical: hp(1) }}>
                            <CardComponent cardStyle={{}}
                                cardViewStyle={{ height: hp(40) }}>

                                <View style={styles.inputView} >
                                    <Input
                                        onChangeText={(text) => { this.validation(text, 'email') }}
                                        icon={call}
                                        value={this.state.email}
                                        holder={'Enter email or phone number'}
                                    />
                                    <View style={{ width: width - dynamicSize(100), alignSelf: 'center', justifyContent: 'flex-start' }}>
                                        <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.emailError}</Text>
                                    </View>
                                </View>




                            </CardComponent>
                            <View style={{ width: wp(40), height: hp(10), alignSelf: 'center', alignItems: 'center', bottom: hp(8) }} >
                                <CustomButton contain={{ height: dynamicSize(100), width: dynamicSize(185), alignSelf: 'center', }}
                                    onPress={() => this.forgotPress()}
                                    title='Submit'
                                    textStyle={{ marginTop: hp(-1) }}
                                    image={roundButton}
                                />
                            </View>

                        </View>

                        :
                        //+==================================================View Change On Click Submit-----------------------
                        <View style={{ height: hp(40), marginVertical: hp(1) }}>
                            <CardComponent cardStyle={{}}
                                cardViewStyle={{ height: hp(40) , }}>
                                    <View style={{marginVertical:hp(1),alignSelf:'center',width:width-dynamicSize(50),height:hp(8)}}>
                                    <Text style={{textAlign:'center',fontWeight:'500',fontSize:16}}> We have sent code to your email address please check & enter the code below to reset password.  </Text>
                                    </View>
                                        
                                <View style={styles.inputView} >
                                    <Input
                                        maxLength={4}
                                        keyboardType={'number-pad'}
                                        onChangeText={(code) =>  this.validationCode(code, 'code') }
                                        icon={call}
                                        value={this.state.codeUsed}
                                        holder={'Enter code'}
                                    />
                                    <View style={{alignSelf:'flex-end',marginVertical:hp(1),marginHorizontal:wp(5),borderBottomWidth:1,borderBottomColor:'blue'}}>
                                        <TouchableOpacity  onPress={() => this.RESEND()}>
                                        <Text style={{fontSize:18,color:'blue'}}>RESEND</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: width - dynamicSize(100), alignSelf: 'center', justifyContent: 'flex-start' }}>
                                        <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.codeError}</Text>
                                    </View>
                                </View>




                            </CardComponent>
                            <View style={{ width: wp(40), height: hp(10), alignSelf: 'center', alignItems: 'center', bottom: hp(8) }} >
                                <CustomButton contain={{ height: dynamicSize(100), width: dynamicSize(185), alignSelf: 'center', }}
                                    onPress={() => this.SubmitOtp()}
                                    title='Submit'
                                    textStyle={{ marginTop: hp(-1) }}
                                    image={roundButton}
                                />
                            </View>

                        </View>
                    }



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
        alignSelf: 'center',

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
        height: dynamicSize(60),
        top: dynamicSize(40),
        // backgroundColor:'red',
        justifyContent: 'center',
        width: width - dynamicSize(80),
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
