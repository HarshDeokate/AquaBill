import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Deliveries from "./pages/Deliveries";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import { useState } from "react"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/login" element ={<Login/>}></Route>
          </Routes> 
        </main>
      </div>
    </Router>
  );
}

export default App;