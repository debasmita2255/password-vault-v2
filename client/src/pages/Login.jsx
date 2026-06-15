import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import PageTransition from "../components/PageTransition";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setMasterPassword } = useAuth();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", Values, {
        withCredentials: true, // this allows the pvUserToken cookie to be saved
      });
      localStorage.setItem("userLoggedIn", "yes");
      localStorage.setItem("userSalt", Values.email);

      setMasterPassword(Values.password);

      toast.success(res.data.success);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Network/CORS Error";
      toast.error(`Error: ${errorMessage}`);
    }
  };

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

          <form className="flex flex-col gap-5" onSubmit={login}>
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
            <button className="btn-primary mt-2" type="submit">
              Login
            </button>
            <p className="text-center mt-4 text-sm font-medium text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-white hover:text-indigo-300 duration-200 underline underline-offset-4 transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
