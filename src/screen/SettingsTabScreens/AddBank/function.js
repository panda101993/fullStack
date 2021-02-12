
export function handleValidations(text, type) {
          if (type === 'name') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter name.'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid name.'
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
    if (type === 'bankName') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter bank name.'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid bank name.'
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
                errorText: '*Please enter phone number.'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid phone number.'
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
    
    else if (type === 'Amount') {
     
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter amount.'
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
    else if (type === 'accountNumber') {
        var numberRegex = /^[1-9][0-9]{5,20}$/;

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter account number.'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid account number.'
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
    else if (type === 'swiftNumber') {
     
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter swift number.'
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

    else if (type === 'IBANNumber') {
     
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter IBAN number.'
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
}
