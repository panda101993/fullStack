
export function handleValidations(text, type) {

    if (type === 'SMSCode') {
        let emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})$/i;
        if (text === '') {
            return {
                status: false,
                value: text,
                errorText: '*Please enter SMS Code'
            }
        }
        else {
         
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
    else if (type === 'googleCode') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter Google Authentication Code'
            }
        } 
        else {
            return {
                value: text,
                status:true,
                errorText: ''
            }
        }
    }

    else if (type === 'phoneNumber') {
        var numberRegex = /^[1-9][0-9]{9,12}$/;

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter phone number'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid phone number'
            }
           
        }
    
        else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }

}
