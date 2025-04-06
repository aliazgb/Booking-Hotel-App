import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { createAccount } = useAuth();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      toast.error("Email must be from Gmail or Yahoo!");
      return;
    }

    createAccount(name, email, password);
    toast.success("Account created successfully!");

    setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: { email, password },
      });
    }, 1500);
  };

  return (
    <div
      className="my-8 mx-auto max-w-[25rem] p-4 rounded-xl
      bg-gradient-to-br from-gray-300/30 to-gray-300 shadow-2xl "
    >
      <h2 className="font-bold text-2xl text-center">Create Account!</h2>
      <form className="" onSubmit={handleCreate} autoComplete="off">
        <div className="relative mb-4 ">
          <label className="block mb-1" htmlFor="name">
            Name
          </label>
          <div className="relative">
            <input
              className="input-fieldd p-1.5 text-sm pl-10 pr-3"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 border-r-2 border-gray-500 pr-1 ">
              <FaRegUser />
            </span>
          </div>
        </div>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
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
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 border-r-2 border-gray-500 pr-1 ">
              <MdOutlineMail />
            </span>
          </div>
        </div>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="input-fieldd p-1.5 text-sm pl-10 pr-3"
            type="password"
            name="password"
            email="email"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute left-3 top-[73%] transform -translate-y-1/2 text-gray-500 border-r-2 border-gray-500 pr-1 ">
            <FiLock />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn-primary w-full py-1 mt-4">Create</button>
        </div>
      </form>
      <p className="mt-8">
        Already have an account?
        <NavLink
          to={"/login"}
          className="text-indigo-600 hover:text-indigo-700 transition-all duration-300 ease-in-out mx-2"
        >
          Login here
        </NavLink>
      </p>
    </div>
  );
}

export default Signup;
