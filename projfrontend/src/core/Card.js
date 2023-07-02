import React,{useState} from 'react'
import ImageHelper from './helper/ImageHelper'
import {Navigate} from 'react-router-dom'
import {addItemToCart,removeItemFromCart} from './helper/cartHelper'
import {isAuthenticated} from '../auth/helper'

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = f => f
}) => {
  const [redirect,setRedirect] = useState(false)
  const cardTitle = product ? product.name : "photo title"
  const cardDescription = product ? product.description : "Default Description"
  const cardPrice = product ? product.price : "Default Price"
  const addToCart = () => {
    if(isAuthenticated()){
      addItemToCart(product,()=>setRedirect(true))
      console.log("Added To Cart")

    }else{
      console.log("Login Please")
    }
  }

  const getAredirect = (redirect) =>{
    if(redirect){
      return <Navigate to="/cart" />
    }
  }

  const showAddToCart = addToCart => {
      return (
        addtoCart && (
          <button
            onClick = {addToCart}
            className = "btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add To Cart
            </button>
        )
      )
  }

  const showRemoveFromCart = removeFromCart =>{
    return removeFromCart && (
      <button
            onClick = {()=>{
              // TODO : Handle this too(
              removeItemFromCart(product._id) //product.id is also fine, but for production we use _id. id and _id both works fine
              setReload(!reload)
              console.log("Product Removed From Cart")
            }}
            className = "btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove From Cart
            </button>
    )
  }
  return (
    <div>
        <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getAredirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
        {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">
            
            {showAddToCart(addToCart)}
          </div>
          <div className="col-12">
          
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}
export default Card;