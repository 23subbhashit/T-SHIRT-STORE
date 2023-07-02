import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    console.log('ORDER DATA>>>>>>>>>',orderData);
    const formdata = new FormData()

    for(const name in orderData){
            formdata.append(name, orderData[name])
    }

    return fetch(`${API}order/add/${userId}/${token}/`, {

        method: "POST",
        body:formdata
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log("orderHelper.js",err))
}