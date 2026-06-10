import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Profile from "../src/pages/Profile";
import FAQs from "../src/pages/FAQs";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (isLoggedIn) {
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/dashboard", { replace: true });
      }
    } else {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;
