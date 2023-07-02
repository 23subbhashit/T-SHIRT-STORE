import { API } from "../../backend";

export const getmeToken = (userid, token) => {
    return fetch(`${API}payment/gettoken/${userid}/${token}/`, {
        method: "GET",
    })
    .then((response) => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userid, token, paymentInfo) => {
        const formdata = new FormData()

        for(const name in paymentInfo){
            formdata.append(name,paymentInfo[name])
        }

        return fetch(`${API}payment/process/${userid}/${token}/`, {
            method: "POST",
            body: formdata
        })

        .then((response) => {
            return response.json()
        })
        .catch(err => console.log(err))
}