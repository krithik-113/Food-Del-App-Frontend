import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import axios from "axios";
import { StoreContext } from '../../Context/StoreContext';

const LoginPopUp = ({ setShowLogin }) => {
  const {setToken} = useContext(StoreContext)
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password:""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name 
    const value = e.target.value
    setData((prev)=>({...prev,[name]:value}))
  }

  const onLogin = async (e) => {
    e.preventDefault()
    const login = "/api/user/login"
    const register = "/api/user/register"
    let res = ''
    if (currentState === "Login") {
       res = await axios.post(login,data)
    } else {
       res = await axios.post(register, data);
    }

    if (res.data.success) {
      setToken(res.data.token)
      localStorage.setItem("token", res.data.token);
      setShowLogin(false)
    } else {
      alert(res.data.message)
    }
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type='submit'>
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>{" "}
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp