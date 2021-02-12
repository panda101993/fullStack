import React, { Component } from 'react'
import { Text, StyleSheet, TextInput, View, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal } from 'react-native'
import { dynamicSize } from '../../utils/dynamicSize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { applogo, backgroundRight, roundButton, checkbox, uncheckbox, hide, show, call, padlock, ForgotBG } from '../../assets/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CardComponent, CardComponent2 } from '../../components/card'
// import DefaultState from "../login/constant"
import { validateEmail, validateMobileNo, validatePassword } from '../../utils/validation'
import { Input, Input_Password } from '../../components/customTextInput'
import { CustomButton } from '../../components/button'
import { LinearTextGradient } from 'react-native-text-gradient'
import { handleValidations } from '../SettingsTabScreens/AddBank/function';
// import country_Code from './countryCode'
import Api from '../../api/Api'
const { width, height } = Dimensions.get('window');
export default class Reset extends Component {
    constructor(props) {
        super(props);
        // this.handlevalidate = this.handlevalidate.bind(this)
        this.state = {
            // DefaultState,
            pass:'',
            logIn: true,
            emailColor: false,
            toggelCheckbox: true,
            email: 'aa@aa.ghj',
            emailError: '',
            emailErrorStatus: '',
            newpassword: "",
            newpasswordStatus: false,
            newpasswordError: '',
            confirmPassword: "",
            confirmPasswordStatus: false,
            confirmPasswordError: "",
            newpassword: '',
            newpasswordError: '',
            newpasswordStatus: false,
            confirmPassword: '',
            confirmPasswordStatus: false,
            confirmPasswordError: '',
            passwordColor: false,
            confpasswordColor: false,
            ModalVisible:false,
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
    componentDidMount(){
        // console.log("params",this.props)
    }

    validation = (text, type) => {
        if (type == 'password') {
            this.setState({
                password: text
            })
            this.state.passwordError = validatePassword(text).error;
            this.state.passwordErrorStatus = validatePassword(text).status;

        }
        else {
            this.setState({
                confpassword: text
            })
            setTimeout(() => {
                if (this.state.password == this.state.confpassword) {

                    this.setState({
                        confpasswordError: ""
                    })
                }
                else {
                    this.setState({
                        confpasswordError: "Password not match"
                    })
                }
            }, 200)

        }
    }
    resetPress = () => {

        if (this.state.newpasswordStatus) {
            if (this.state.confirmPasswordStatus ) {  
                        this.reset();     
            }
            else {
                this.setState({ confirmPasswordError: "Please enter confirm password" })
            }
        }
        else {
            this.setState({ newpasswordError: "Please enter password" })
        }
    }

    GoToLogin=()=>{
        // this.setState({ModalVisible:false})
        this.props.navigation.navigate('Login')
    } 

    reset() {
       
        let resetpassword = {
            email:this.props.route.params.UserEmail,
            password: this.state.pass,
        }
        // let token = this.state.token
        Api("", "account/reset-password-mobile-app", "POST", resetpassword)
            .then(async resp => {
               
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
                        if(resp.data.status==200){
                            Alert.alert(
                                '',
                                "Password changed Successfully.",
                                [
                                    { text: 'OK', onPress: () => this.GoToLogin() },
                                ],
                                { cancelable: false },
                            );
                            // this.setState({ModalVisible:!this.state.ModalVisible})
                          
                         
                        }
                       else{
                        Alert.alert(
                            "",
                            resp.data.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        console.log('OK Pressed')
                                        // this.props.navigation.navigate("TwoFactorAuth")

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
 
    validationLogin = (text, type) => {
        if (type == 'email') {
            this.setState({
                email: text
            })
            this.state.emailError = validateEmail(text).error;
            this.state.emailErrorStatus = validateEmail(text).status;
        }
        else {
            this.setState({
                password: text,
                passwordError: ''
            })

        }
    }
    handlevalidate = (text, type) => {
        console.log('type',text,type)
        // let status = `${type}Status`;
        // let errorText = `${type}Error`;
        // let activeBorderColor = `active${type}BorderColor`;
        // let resp = handleValidations(text, type)
        if(type == 'newpassword'){
            this.state.pass = text
        }

        this.setState({
            // [type]: resp.value,
            // [errorText]: resp.errorText,
            // [status]: resp.status,
            // [activeBorderColor]: !resp.status,
            pass : this.state.pass
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
                        confirmPasswordError: ""
                    })
                }
                else {
                    this.setState({
                        confirmPasswordError: "Password not match"
                    })
                }
            }, 200)
        }

    }

    render() {
        return (
            <ImageBackground source={this.state.logIn ? ForgotBG : backgroundRight}
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
                        <TouchableOpacity style={{right:28,marginTop:10,}}
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
                                        textAlign:'center',
                                        color:'white'
                                    }} >
                                        Reset Password
                       </Text>
                                </LinearTextGradient>
                             
                        </TouchableOpacity>

                        

                    </View>
                    {this.state.logIn ? <View style={{height: hp(40), marginVertical: hp(1) }}>
                        <CardComponent
                         cardViewStyle={{ height: hp(40) }}>
                             
                        <View style={styles.inputView} >
                                <Input_Password
                                      onChangeText={(text) => this.handlevalidate(text, "newpassword")}
                                    icon={padlock}
                                    secureTextEntry={this.state.show ? false : true}
                                    onPressIcon2={() => this.setState({ show: !this.state.show })}
                                    Icon_second={true}
                                    icon_2={this.state.show ? show : hide}
                                    holder={'Enter password'}
                                />
                                <View style={{ width: width - dynamicSize(85) }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.passwordError}</Text>
                                </View>
                            </View>
                            <View style={styles.inputView} >
                                <Input_Password
                                   onChangeText={(text) => this.handlevalidate(text, "confirmPassword")}
                                    icon={padlock}
                                    secureTextEntry={this.state.show ? false : true}
                                    onPressIcon2={() => this.setState({ show: !this.state.show })}
                                    Icon_second={true}
                                    icon_2={this.state.show ? show : hide}
                                    holder={'Enter confirm password'}
                                />
                                <View style={{ width: width - dynamicSize(85) }}>
                                    <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.passwordError}</Text>
                                </View>
                            </View>
                            
                         

                        </CardComponent>
                         
                        <View style={{ height: hp(10),width: wp(40), alignSelf: 'center', alignItems: 'center',bottom: hp(8) }} >
                            <CustomButton contain={{ height: dynamicSize(100), width: dynamicSize(285), alignSelf: 'center', }}
                                onPress={() => this.reset()}
                                title='Set New Password'
                                textStyle={{marginTop:hp(-1)}}
                                image={roundButton}
                            />
                        </View>
                       
                    </View>

                        :
                        //+==================================================Signup-----------------------
                        <View>
                            <CardComponent2 cardViewStyle={{ height: dynamicSize(400) }} >
                                <View style={styles.inputView} >
                                    <Input
                                        onChangeText={(text) => { this.validation(text, 'email') }}
                                        icon={call}
                                        holder={'Enter email or phone number'}
                                    />
                                    <View style={{ width: width - dynamicSize(100), alignSelf: 'center' }}>
                                        <Text style={{ color: 'red', fontSize: dynamicSize(10) }}>{this.state.SignupemailError}</Text>
                                    </View>
                                </View>
                                <View style={styles.phNumberView} >
                                    <View style={styles.phNumbersubView} >
                                        <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: (1), borderBottomColor: 'rgb(0,172,153)', width: dynamicSize(50), justifyContent: 'space-between' }} >
                                            <View style={{ justifyContent: 'center' }} >
                                                <Image source={this.state.code} style={{ width: dynamicSize(15), height: dynamicSize(15) }} />
                                            </View>
                                            <View style={{ justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 14, color: 'black' }} >+91</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: width - dynamicSize(155), borderBottomColor: 'rgb(0,172,153)', borderBottomWidth: 1 }} >
                                            <TextInput onChangeText={(text) => { this.validation(text, 'phoneNumber') }} keyboardType={'phone-pad'} placeholder={"Enter your phone number"} placeholderTextColor={'lightgrey'} />
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
                                    icon_2={this.state.show2 ? show2 : hide}
                                    holder={'Enter confirm password'}
                                />
                                
                            
                            </CardComponent2>

                            <View style={{ height: dynamicSize(75), marginVertical: dynamicSize(20), 
                                width: width - dynamicSize(100), alignSelf: 'center', alignItems: 'center', }} >
                                <CustomButton
                                onPress={() => this.props.navigation.navigate("Multilanguage",{'fromDrawer':false})}
                                    //  onPress={()=>this.props.navigation.navigate("Multilanguage"),{'fromDrawer':false}}
                                    contain={{ height: dynamicSize(100), width: dynamicSize(185), alignSelf: 'center', }}
                                    image={roundButton}
                                    textStyle={{marginTop:hp(-1)}}
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
                                <TouchableOpacity onPress={() => this.setState({ logIn: true, signUp: false })} style={{ borderBottomWidth: dynamicSize(1), borderBottomColor: 'rgb(0,224,176)' }} >
                                    <Text style={{ fontSize: dynamicSize(14), color: 'rgb(0,224,176)' }} >
                                        Log In
                                 </Text>
                                </TouchableOpacity>
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
        marginBottom:28
        
    },
    logoView: {
        alignSelf: 'center',
        width: width - dynamicSize(30),
        alignItems: 'center',
        justifyContent:'flex-end',
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
