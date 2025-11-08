import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-cyan-400">Admin Panel</h1>
      {token && (
        <div className="flex gap-6">
          <Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
          <Link to="/Customers" className="hover:text-cyan-400 transition">Customers</Link>
          {/* <Link to="/settings" className="hover:text-cyan-400 transition">Settings</Link> */}
          <button
            onClick={handleLogout}
            className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold px-3 py-1 rounded-md transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
