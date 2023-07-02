import React,{useState,useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import {loadCart} from './helper/cartHelper'
import PaymentB  from './PaymentB'
const Cart = ()=> {
  const [reload,setReload] = useState([false])
  const [products,setProducts] = useState([])
  useEffect(()=>{
    setProducts(loadCart())
  },[reload])
  const loadAllProducts = (products) =>{
    return (
    <div>
      {products.map(
        (product,index)=>(
          <Card
          key={index}
          product = {product}
          removeFromCart = {true}
          addtoCart={false}
          reload = {reload}
          setReload = {setReload}
          />
        )
      )}
    </div>
    )
  }
  const loadCheckOut = () =>{
    return (
    <div>
      <h1>
        CheckOut
      </h1>
    </div>
    )
  }
  return (
    <Base title="Cart Page" description="Welcome to checkout">
      <div className="row text-center">
        <div className="col-6">
          {loadAllProducts(products)}
        </div>
        <div className="col-6">
          {products.length>0 ? (
            <PaymentB products={products} setReload={setReload} />
          ) : 
          (
            <h1>Please Login Or Add Something In Cart</h1>
          )}
        </div>
      </div>
    </Base>
  )
}
export default Cart