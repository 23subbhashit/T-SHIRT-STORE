export const addItemToCart = (item,next) => { // next: for providing callback functionality to any user in React
    let cart = []

    if(typeof window !== undefined ){ // To check if it is  BROWSER OR NOT , AS WINDOW OBJECT IS ONLY AVAILABLE IN BROWSERS
        if(localStorage.getItem("cart")){ // FOR CHECKING IF SOME ITEMS ALREADY PRESENT
            cart =  JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item
        });
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }

}
export const loadCart = () => {

    if(typeof window !== undefined ){ // To check if it is  BROWSER OR NOT , AS WINDOW OBJECT IS ONLY AVAILABLE IN BROWSERS
        if(localStorage.getItem("cart")){ // FOR CHECKING IF SOME ITEMS ALREADY PRESENT
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = productId => { // next: for providing callback functionality to any user in React
    let cart = []

    if(typeof window !== undefined ){ // To check if it is  BROWSER OR NOT , AS WINDOW OBJECT IS ONLY AVAILABLE IN BROWSERS
        if(localStorage.getItem("cart")){ // FOR CHECKING IF SOME ITEMS ALREADY PRESENT
            cart =  JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i) => {
                if(product._id === productId){
                    cart.splice(i,1)
                }
        })
        
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    return cart;
}

export const cartEmpty = next =>{
    if(typeof window !== undefined ){ // To check if it is  BROWSER OR NOT , AS WINDOW OBJECT IS ONLY AVAILABLE IN BROWSERS
        if(localStorage.getItem("cart")){ // FOR CHECKING IF SOME ITEMS ALREADY PRESENT
            localStorage.removeItem("cart")
            let cart = []
            localStorage.setItem("cart",JSON.stringify(cart))
            next()
        }
    }
}