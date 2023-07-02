import React ,{useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {signup} from '../auth/helper'
const Signup = ()=>{
  const [values, setvalues] = useState({
    name : "",
    email : "",
    password : "",
    error : "",
    success : false
  });
  const {name,email,password,error,success} = values;

  //Higher order function for all variables
  const handleChange = (name) => (event) =>{
    setvalues({...values,error:false,[name]:event.target.value})
  }

  const successMessege = () =>{
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
          style = {{display: success ?"":"none"}}
          className = "alert alert-success"
          >
            New User Created Successfully. Please<Link to="signin">Login now</Link>
          </div>
        </div>
      </div>
    )
  }

  const errorMessege = () =>{
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
          style = {{display: error ?"":"none"}}
          className = "alert alert-danger"
          >
            Check all fields again
          </div>
        </div>
      </div>
    )
  }
  const onSubmit = (event)=>{
      event.preventDefault();
      setvalues({...values,error:false})
      signup({name,email,password})
      .then(data =>{
        console.log("DATA",data)
        if(data.email===email){
          setvalues({
            ...values,
            name : "",
            email : "",
            password : "",
            error : "",
            success : true
          })
        }else{
          setvalues({
            ...values,
            error : true,
            success : false
          })
        }

      })
      .catch(err=>console.log(err))
  }
  const SignUpForm = ()=>{
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input 
              className = "form-control"
              value = {name}
              onChange = {handleChange("name")}
              type = "text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input 
              className = "form-control"
              value = {email}
              onChange = {handleChange("email")}
              type = "text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input 
              className = "form-control"
              value = {password}
              onChange = {handleChange("password")}
              type = "password"
              />
              <br/>
              <button 
              onClick = {onSubmit}
              className="btn btn-success btn-block"
              >Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <Base title="SignUp Page" description="SignUp for T-SHIRT store user">
      {successMessege()}
      {errorMessege()}
      {SignUpForm()}
      <p className="text-white text-center">
        {JSON.stringify(values)}
      </p>
    </Base>
  )
}
export default Signup