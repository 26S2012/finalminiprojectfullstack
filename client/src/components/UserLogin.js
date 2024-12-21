import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Features/UserSlice";
import { loginSchemaValidation } from "../Validations/loginValidation";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const { user, msg, isLogin, isSuccess, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    dispatch(login(userData)); // Dispatch login action
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/Catogry"); 
    }
  }, [isLogin, navigate]); // Dependencies to re-run useEffect

  useEffect(() => {
    if (error) {
      alert("Email or Password is incorrect!"); // Display alert if login fails
    }
  }, [error]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#d5da87" }}
    >
      <div className="card p-4" style={{ borderRadius: "15px", width: "350px" }}>
        <div className="text-center mb-4">
          <h2 style={{ fontFamily: "cursive" }}>PureGreen</h2>
        </div>
        <div className="d-flex justify-content-around mb-3">
          <button className="btn btn-link">
            <Link to="/UserLogin">Sign In</Link>
          </button>
          <button className="btn btn-link text-decoration-underline">
            <Link to="/UserRegister">Sign Up</Link>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              {...register("email")}
            />
            <p className="error-text text-danger">{errors.email?.message}</p>
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
              {...register("password")}
            />
            <p className="error-text text-danger">{errors.password?.message}</p>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
