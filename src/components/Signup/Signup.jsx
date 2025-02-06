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
    <div className="loginContainer">
      <h2 style={{ textAlign: "center" }}>Create Account!</h2>
      <form className="form" onSubmit={handleCreate}>
        <div className="formControl">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
