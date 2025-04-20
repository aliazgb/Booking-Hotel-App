import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("test.app@gmail.com");
  const [password, setPassword] = useState("1234");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailDomain = email.split("@")[1];
    if (emailDomain !== "gmail.com" && emailDomain !== "yahoo.com") {
      toast.error("Email must be a gmail.com or yahoo.com address");
      return;
    }

    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="my-8 mx-auto max-w-[25rem] p-4 rounded-xl bg-gradient-to-br from-gray-300/30 to-gray-300 shadow-2xl">
      <h2 className="font-bold text-2xl text-center">Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <div className="relative">
            <input
              className="input-fieldd p-1.5 text-sm pl-10 pr-3"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 border-r-2 border-gray-500 pr-1">
              <MdOutlineMail />
            </span>
          </div>
        </div>

        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="password">Password</label>
          <input
            className="input-fieldd p-1.5 text-sm pl-10 pr-3"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute left-3 top-[73%] transform -translate-y-1/2 text-gray-500 border-r-2 border-gray-500 pr-1">
            <FiLock />
          </span>
        </div>

        <div className="relative mb-4">
          <button className="btn-primary w-full py-1 mt-4">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
