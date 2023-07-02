import React, { useState } from 'react'
import Base from "../core/Base"
import { Link, Navigate } from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper'
import Home from '../core/Home'

const Signin= () => {
    const [values, setValues] = useState({
        name: "",
        email: "subbhashitmukherjee@gmail.com",
        password: "12345",
        error: "",
        success: false,
        didRedirect: false,
        loading: false
    })
    const {name, email, password,error,success, loading, didRedirect} =values;

  const handleChange = (name) => (event) => {
    setValues({...values, error:false, [name]: event.target.value})
  }

  const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, loading: true})
        signin({email, password})
        .then(data => {
          console.log("Data", data);
          if (data.token) {
            
            authenticate(data, () => {
              console.log("Token Added");
              setValues({
                ...values,
                didRedirect: true,
              });
            })
          }else{
            setValues({
              ...values,
              loading: false,
              
            })
            
          }
        })
        .catch((e) => console.log(e));
  }

  const Redirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />
    }
  }

  const loadingMessage = () => {
    return (
        loading && (
          <div className='alert alert-info'><h2>Loading...</h2></div>
        )
    )
  }
    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-success">New account created successfully. Please <Link to="/signin"> login now </Link></div>
            </div>
          </div>
        );
      };
    
      const errorMessage = (data) => {
          return (
          console.log("error")
        )
      };
    
      const SignInForm = () =>{
        return (
          <div className="row">
             <div className="col-md-6 offset-sm-3 text-left">
               <form>
                  <div className="form-group">
                     <label className="text-light">Email</label>
                     <input className="form-control" value={email} type="text" onChange={handleChange("email")}/>
                  </div>
                  <div className="form-group">
                     <label className="text-light">Password</label>
                     <input className="form-control" value={password} type="password" onChange={handleChange("password")}/>
                  </div>
                  <button className="btn btn-success btn-block" onClick={onSubmit}>Login</button>
               </form>
             </div>
          </div>
        )
      }

  return (
    <Base title='Welcome Back' description='Signin Here'>
      {loadingMessage()}
      {SignInForm()}
     <p className='text-center'>{JSON.stringify(values)}</p> 
     {Redirect()}
    </Base>
  );
};

export default Signin;