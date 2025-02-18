import React, { useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <div className="my-8 mx-auto max-w-[25rem] border border-blue-200 p-4 rounded-xl">
      <h2 className="font-bold text-2xl text-center">Create Account!</h2>
      <form className="" onSubmit={handleCreate} autoComplete="off">
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="input-field text-sm p-1.5"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="input-field text-sm p-1.5"
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="input-field text-sm p-1.5"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="btn-primary w-full py-1 mt-4">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;