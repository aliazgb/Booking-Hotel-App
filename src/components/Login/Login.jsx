import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, name } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            email="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            email="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <NavLink to={"/signup"} className={"register"}>Register</NavLink>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
