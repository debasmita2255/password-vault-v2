import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", Values);
      alert(res.data.success);
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || "Registration failed"}`);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="glass-card w-[85vw] md:w-[50vw] lg:w-[30vw] p-8">
        <h1 className="text-3xl font-bold text-center mb-1 bg-linear-to-r from-white from-30% to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.4)] py-1">
          Password Vault
        </h1>
        <h3 className="text-center font-semibold text-gray-300 mb-6">
          A secure storage for your credentials
        </h3>

        <form className="flex flex-col gap-5" onSubmit={register}>
          <input
            type="text"
            required
            placeholder="Username"
            className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full outline-none focus:border-white/60 focus:bg-white/20 transition-all"
            name="username"
            value={Values.username}
            onChange={change}
            autoComplete="username"
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full outline-none focus:border-white/60 focus:bg-white/20 transition-all"
            name="email"
            value={Values.email}
            onChange={change}
            autoComplete="email"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full outline-none focus:border-white/60 focus:bg-white/20 transition-all"
            name="password"
            value={Values.password}
            onChange={change}
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="bg-white/90 text-indigo-800 font-bold py-3 mt-4 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Register
          </button>
          <p className="text-center mt-4 text-sm font-medium text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:text-indigo-300 duration-200 underline underline-offset-4 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
