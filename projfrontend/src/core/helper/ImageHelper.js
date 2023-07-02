import React from 'react'

const ImageHelper = ({product}) => {
  const imageurl = product ? product.image : `https://avatars.githubusercontent.com/u/43717493?v=4`
  return (
    <div className="rounded border border-success p-22">
      <img src={imageurl}
      style = {{maxHeight:"100%",maxWidth :"100%"}}
      className="mb-3 rounded"
       alt=""/>
    </div>
  )
}
export default ImageHelper