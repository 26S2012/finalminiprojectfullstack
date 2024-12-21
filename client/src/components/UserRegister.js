import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { OwnerSchemaValidation } from "../Validations/OwnerValidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router";

const UserRegister=()=> {
  const{msg} = useSelector((state)=>state.user)
  const [email,setEmail] = useState("")
  const [password,setpassword]= useState("")
  const [cpassword,setcpassword]= useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OwnerSchemaValidation),
  });

  const onSubmit = (data) => {
    const UserData = {
      email: data.email,
      password: data.password
    };
    console.log("Sending UserData:", UserData);
    dispatch(registerUser(UserData));
    navigate("/UserLogin")
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d5da87" }}>
      <div className="card p-4" style={{ borderRadius: "15px", width: "350px" }}>
        <div className="text-center mb-4">
          <h2 style={{ fontFamily: "cursive" }}>PureGreen</h2>
        </div>
        <div className="d-flex justify-content-around mb-3">
          <button className="btn btn-link"><Link to="/UserLogin" >Sign In</Link></button>
          <button className="btn btn-link text-decoration-underline">Sign Up</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              name="email"
              id="email"       
              onChange={(e) => setEmail(e.target.value)}
              {...register("email")}

            />
            <p className="error-text">{errors.email?.message}</p>
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
                    {...register("password")}
              
            />
            <p className="error-text">{errors.password?.message}</p>
            
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="cpassword"
              id="cpassword"
              onChange={(e) => setcpassword(e.target.value)}
                    {...register("cpassword")}
              
            />
            <p className="error-text">{errors.cpassword?.message}</p>
            
          </div>
         
          <button type="submit" className="btn btn-success w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;


