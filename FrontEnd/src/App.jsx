import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Deliveries from "./pages/Deliveries";
import Billing from "./pages/Billing";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {token && <Navbar />}  {/* Show navbar only when logged in */}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/Customers" element={token ? <Customers /> : <Navigate to="/" />} />
        <Route path="/Billing" element={token ? <Billing /> : <Navigate to="/" />} />
        <Route path="/Deliveries" element={token ? <Deliveries /> : <Navigate to="/" />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
