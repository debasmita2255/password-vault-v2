import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import PageTransition from "../components/PageTransition";
import PasswordInput from "../components/PasswordInput";
import PasswordRequirements from "../components/PasswordRequirements";

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
      toast.success(res.data.success);
      navigate("/login");
    } catch (error) {
      toast.error(
        `Error: ${error.response?.data?.error || "Registration failed"}`,
      );
    }
  };

  const calculateStrength = (password) => {
    return {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  };

  const criteria = calculateStrength(Values.password);
  const isPasswordStrong = Object.values(criteria).every(Boolean);
  return (
    <PageTransition>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="glass-card rounded-[5%] w-[85vw] md:w-[50vw] lg:w-[30vw] p-8">
          <h1 className="text-3xl font-bold text-center w-max mx-auto mb-1 bg-linear-to-r from-white from-30% to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.4)] py-1">
            Password Vault
          </h1>
          <h3 className="text-center font-bold text-gray-400 mb-6">
            A secure storage for your credentials
          </h3>

          <form className="flex flex-col gap-5" onSubmit={register}>
            <input
              type="text"
              required
              placeholder="Username"
              className="input-field"
              name="username"
              value={Values.username}
              onChange={change}
              autoComplete="username"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="input-field"
              name="email"
              value={Values.email}
              onChange={change}
              autoComplete="email"
            />
            <PasswordInput
              name="password"
              value={Values.password}
              onChange={change}
              placeholder="Password"
            />

            <PasswordRequirements criteria={criteria} />

            <button
              className={`btn-primary mt-4 ${!isPasswordStrong ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
              disabled={!isPasswordStrong}
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
    </PageTransition>
  );
};

export default Register;
