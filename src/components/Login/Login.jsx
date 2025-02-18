import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
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
    <div className="my-8 mx-auto max-w-[25rem] border border-blue-200 p-4 rounded-xl">
      <h2 className="font-bold text-2xl text-center">Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="input-field p-1.5 text-sm"
            type="text"
            name="email"
            email="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="input-field text-sm p-1.5"
            type="text"
            name="password"
            email="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <button className="btn-primary w-full py-1 mt-4">Login</button>
        </div>
        <div className="relative mb-4 signup text-center flex items-center">
          <p>
            don't have an account?
            <NavLink
              to={"/signup"}
              className="text-indigo-600 hover:text-indigo-700 transition-all duration-300 ease-in-out mx-2"
            >
              Signup
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
