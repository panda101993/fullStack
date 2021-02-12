
export function validateName(name) {
    var nameRegex = /^[a-zA-Z]{2,32}$/i;
    if (name != undefined) {
       
    }
   
    if ((name == "") || (name == undefined) || (name == null)) {

        return { status: false, error: '* Please Enter Name.' };
    }
    else if (!nameRegex.test(name)) {
        return { status: false, error: '* Please Enter Valid Name.' };
    }
    else {
        return { status: true, error: '' };
    }
}
export function validateName1(name) {
    var nameRegex = /^[a-zA-Z]{2,60}$/i;
   
    if ((name == "") || (name == undefined) || (name == null)) {
        return { status: false, error: '* Please Enter Name.' };
    }
    else if (!nameRegex.test(name)) {
        return { status: false, error: '* Please Enter Valid Name.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateUserName(name) {
    var nameRegex = /^[a-zA-Z0-9@_]{3,32}$/i;
    var name = name.trim()
    if (name == "" || name == undefined || name == null) {
        return { status: false, error: '* Please Enter User Name.' };
    }
    else if (!nameRegex.test(name)) {
        return { status: false, error: '* Please Enter Valid User Name.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateNameorEmail(name) {
    var nameRegex = /^[a-zA-Z0-9@.-_ ]{2,30}$/i;


    if (name.charAt(0) == " ") {
        return { status: false, error: '* Name can not start with white space.' };
    }
    else if (name == "" || name == undefined || name == null) {
        return { status: false, error: '* Either your email address  was incorrect.' };
    }
   
    else {
        return { status: true, error: '' };
    }
}

export function validateMessage(message) {
    var messageRegex = /^[0-9 ]{3,256}$/i;
    message = message.trim();

    if (message == "" || message == undefined || message == null) {
        return { status: false, error: '* Please Enter Message.' };
    }
    else if (!messageRegex.test(message)) {
        return { status: false, error: '* Please enter Valid Message.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validatePassword(text) {
   // var passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
     var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    let password = text.trim();

    if (password === "" || password === undefined || password === null)
        return { status: false, error: "* Please enter password." };
    else if (password.length < 8) {
        return { status: false, error: "* Password must be atleast 8 character." };
    }
    //Uncomment this line!!!!! Commented For testing purpose
    //  else if (!passwordRegex.test(password)) {
    //     return { password: false, error: "* Include at least 1 capital letter , digit and special symbol." };
    // }
    else {
        return { status: true, error: '' };
    }
}
export function validateoldPassword(text) {
    // var passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
   
    let password = text.trim();

    if (password === "" || password === undefined || password === null)
        return { status: false, error: "* Please enter old password." };
    // else if (password.length < 8) {
    //     return { status: false, error: "* Password must be atleast 8 character." };
    // }
    // else if (!passwordRegex.test(password)) {
    //     return { password: false, error: "* Include at least 1 capital letter , digit and special symbol." };
    // }
    else {
        return { status: true, error: '' };
    }
}

export function validateEmail(email) {
  
    var emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})$/i
    email = email.trim();

    if (email == "" || email == undefined || email == null) {
        return { status: false, error: '* Please enter email.' };
    }
    else if (!emailRegex.test(email)) {
        return { status: false, error: '* Please enter valid email address.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateMobileNo(mobileNo) {
    var mobileNoRegex = /^[1-9][0-9]{9,13}$/;
    mobileNo = mobileNo.trim();

    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: '* Please enter Phone Number.' }
    }
   
    else if (mobileNo.length < 7) {
        return { status: false, error: '* Mobile no. should contain miniumum 7 digits. ' };
    }
    else if (mobileNo.length > 14) {
        return { status: false, error: '* Mobile no. should contains maximum 14 digits.' }
    }
    else {
        return { status: true, error: '' }
    }
}


export function validateZip(mobileNo) {
    var zipRegex = /^[a-zA-Z0-9/s]{4,8}$/
    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: '* Please enter zip code.' }
    }
    else if (!zipRegex.test(mobileNo)) {
        return { status: false, error: '* Please Enter valid zip code.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateCity(city) {
    var cityRegex = /^[a-zA-Z ]{3,60}$/i


    if (city == "" || city == undefined || city == null) {
        return { status: false, error: '* Please enter city.' }
    }
    else if (!cityRegex.test(city)) {
        return { status: false, error: '* Please enter valid city.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateAddress(address) {
    var addressRegex = /^[a-zA-Z0-9\s,/,-]{3,70}$/;
    address = address.trim();

    if (address == "" || address == undefined || address == null) {
        return { status: false, error: '* Please enter address.' }
    }
    else if (!addressRegex.test(address)) {
        return { status: false, error: '* Please enter valid address.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateDoc(doc) {
    var docRegex = /^[a-zA-Z0-9\s,'-]{3,32}$/;
    doc = doc.trim();
    if (doc == "" || doc == undefined || doc == null) {
        return { status: false, error: '* Please enter document ID.' }
    }
    else if (!docRegex.test(doc)) {
        return { status: false, error: '* Please enter valid document ID.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateMargin(margin) {
    var marginRegex = /^\d+(\.\d{1,5})?$/;


    if (margin == "" || margin == undefined || margin == null) {
        return { status: false, error: '* Please enter margin.' }
    }
    
    else {
        return { status: true, error: '' }
    }
}
export function validateBTCAddress(BTCAddress) {
    var BTCAddressRegex = /^[a-zA-Z0-9]*$/;
    if (BTCAddress == "" || BTCAddress == undefined || BTCAddress == null) {
        return { status: false, error: '* Please enter BTC Address.' }
    }
    else if (!BTCAddressRegex.test(BTCAddress)) {
        return { status: false, error: '* BTC address only accepts alpha numeric value.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateMintransActionLimit(minTransLmt) {
    var minTransLmtRegex = /^\d+(\.\d{1,10})?$/;


    if (minTransLmt == "" || minTransLmt == undefined || minTransLmt == null) {
        return { status: false, error: '* Please enter min transaction limit.' }
    }
    else if (!minTransLmtRegex.test(minTransLmt)) {
        return { status: false, error: '* Please enter valid transaction limit.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateMaxtransActionLimit(maxTransLmt) {
    var maxTransLmtRegex = /^\d+(\.\d{1,10})?$/;


    if (maxTransLmt == "" || maxTransLmt == undefined || maxTransLmt == null) {
        return { status: false, error: '* Please enter max transaction limit.' }
    }
    else if (!maxTransLmtRegex.test(maxTransLmt)) {
        return { status: false, error: '* Please enter valid transaction limit.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateRestrictAmount(restrictAmount) {
    var restrictAmountRegex = /^[0-9]*$/;


    if (restrictAmount == "" || restrictAmount == undefined || restrictAmount == null) {
        return { status: false, error: '* Please enter restrict amount.' }
    }
    else if (!restrictAmountRegex.test(restrictAmount)) {
        return { status: false, error: '* Please enter valid restrict amount.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validatetermTrade(termTrade) {
 
    termTrade = termTrade.trim();


    if (termTrade == "" || termTrade == undefined || termTrade == null) {
        return { status: false, error: '* Please enter terms of trade.' }
    }
   
    else {
        return { status: true, error: '' }
    }
}

export function validateaddTag(addTag) {
 

    if (addTag == "" || addTag == undefined || addTag == null) {
        return { status: false, error: '* Please enter tag.' }
    }

    else {
        return { status: true, error: '' }
    }
}
export function validatesetPaymentWindow(setPaymentWindow) {
    var setPaymentWindowRegex = /^[0-9]{2,3}$/;


    if (setPaymentWindow == "" || setPaymentWindow == undefined || setPaymentWindow == null) {
        return { status: false, error: '* Please enter the set payment.' }
    }
    else if (setPaymentWindow < 30) {
        return { status: false, error: '* Min. set payment is 30.' }
    }
    else {
        return { status: true, error: '' }
    }
}



export function validateOTP(code) {
    var OTPRegex = /^[1-9][0-9]{0,4}$/
    if (code == "" || code == undefined || code == null) {
        return { status: false, error: '* Please enter code.' }
    }
    else if (!OTPRegex.test(code)) {
        return { status: false, error: '* Please Enter valid code.' }
    }
    else {
        return { status: true, error: '' }
    }
}