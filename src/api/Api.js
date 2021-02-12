// import { checkNetworkConnection } from "./NetworkCheck";

const baseUrl = "http://182.72.203.244:3023/" 


export default function graphQLRequest(token, apiName, apiMethod,variables) {
    // return checkNetworkConnection().then((networkStatus) => {
    //     console.log("Network Status : " + networkStatus);
    //     if (networkStatus) {

            var init = (apiMethod == "GET" ? {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
            } :
                {
                    method: apiMethod,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(variables)
                })
            console.log("api====>", baseUrl + apiName, init);
            console.log("variables", variables);
            return fetch(baseUrl + apiName, init)
                .then(res => res.json()
                    .then(data => {

                        var apiData = {
                            status: res.status,
                            data: data
                        }
                        console.log(`${apiName}_response==>>`, data)
                        // console.log("init   " + init.body + "api Name==>>" + apiName + "API Data ==>" + JSON.stringify(apiData));
                        return apiData;

                    }))
                .catch(err => {
                    return { "data": { "responseCode": 1000, responseMessage: "Server not responding. Please try again after some times." } }
                });



    //     } else {

    //         var init = apiMethod == "GET" ? {
    //             method: "GET",
    //             headers: {
    //                 'Authorization': 'Bearer ' + token,
    //                 'Content-Type': 'application/json',
    //             },
    //         } :
    //             {
    //                 method: apiMethod,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token,
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(variables)
    //             }
    //         console.log("api ", baseUrl + apiName);
    //         console.log("variables", variables);
    //         return fetch(baseUrl + apiName, init)
    //             .then(res => res.json()
    //                 .then(data => {
    //                     var apiData = {
    //                         status: res.status,
    //                         data: data
    //                     }
    //                     console.log(`${apiName}_response==>>`, data)
    //                     //console.log("body   " + init.body + "api Name==>>" + apiName + "API Data ==>" + JSON.stringify(apiData));
    //                     return apiData;

    //                 }))
    //             .catch(err => {
    //                 return { "data": { "responseCode": 1000, responseMessage: "Network unavailable. Please connect to a Wi-Fi or cellular network." } }
    //             });
    //     }
    // },
    //     reject => {
    //         alert("reject: " + reject);
    //     }
    // ).catch((e) => {
    //     //console.log("Errorin Fetching Network status" + e)
    // })

};