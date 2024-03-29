import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStoragemanager";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/login", {
        username: email,
        password,
      });
      setItem(KEY_ACCESS_TOKEN,result.accessToken);
      navigate('/')
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
            id="email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
            id="password"
          />
          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Do not have an account?<Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
