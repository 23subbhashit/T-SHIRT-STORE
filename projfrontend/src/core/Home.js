import React, { useState, useEffect } from "react";

import { getProducts } from "./helper/coreapicalls";
import Base from './Base'
import Card from './Card'
import "../styles.css"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(data);
        } else {
          setProducts(data);
        }
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to T-shirt Store">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={product}/>
            </div>
          );
        })}
      </div>
    </Base>
  );
}
