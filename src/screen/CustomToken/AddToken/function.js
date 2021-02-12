
export function handleValidations(text, type) {

    if (type === 'address') {
        if (text === '') {
            return {
                status: false,
                value: text,
                errorText: '*Please enter contract address'
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
                errorText: '*Please enter token name'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid token name'
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

    else if (type === 'symbol') {

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter token symbol'
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
