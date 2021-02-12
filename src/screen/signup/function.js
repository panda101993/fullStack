
export function handleValidations(text, type) {


   
   
   if (type === 'name') {
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

    else if (type === 'zipCode') {
        var numberRegex = /^[a-zA-Z0-9/s]{4,9}$/;

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter zip code.'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid zip code.'
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

    else if (type === 'city') {
        var nameRegex = /^[a-zA-Z ]{3,60}$/i;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter city'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid city'
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
    else if (type === 'state') {
        var nameRegex = /^[a-zA-Z ]{3,60}$/i;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter state'
            }
        } 
   
        else if (!nameRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid state'
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
    else if (type === 'address') {
        var nameRegex =  /^[a-zA-Z0-9\s,/,-]{3,70}$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter address'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid address'
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
    // else if (type === 'dob') {
    //     var nameRegex =  /^[a-zA-Z0-9\s,/,-]{3,70}$/;
    //     if (text === '') {
    //         return {
    //             value: text,
    //             status: false,
    //             errorText: '*Please enter dob'
    //         }
    //     } 
   
    //     // else if (!nameRegex.test(text)) {
         
    //     //     return {
    //     //         status: false,
    //     //         value: text,
    //     //         errorText:'*Please enter valid address'
    //     //     }
           
    //     // }
    //     else {
    //         return {
    //             value: text,
    //             status:true,
    //             errorText: ''
    //         }
    //     }
    // }

}
