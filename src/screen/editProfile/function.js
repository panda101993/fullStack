
export function handleValidations(text, type) {

    if (type === 'email') {
        let emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})$/i;
        if (text === '') {
            return {
                status: false,
                value: text,
                errorText: '*Please enter email address'
            }
        }
        else if (!emailRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid email address'
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
   
   
    else if (type === 'name') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter name'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid name'
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
    else if (type === 'dob') {
     
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter DOB.'
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
