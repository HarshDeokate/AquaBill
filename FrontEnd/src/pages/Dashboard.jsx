import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Customers from "./Customers";
import Deliveries from "./Deliveries";
import Billing from "./Billing";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👑</h1>
        <button
          onClick={handleLogout}
          className="bg-cyan-500 px-6 py-2 rounded-full text-gray-900 font-semibold hover:bg-cyan-400 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
