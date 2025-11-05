import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage("Login successful ✅");
    } catch (err) {
        console.log(err.message);
      setMessage("Invalid credentials ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessage("Logged out 👋");
  };

  const handleProtected = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/login", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message + " 🧠");
    } catch (err) {
      setMessage("Unauthorized 🚫");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#1e293b",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2>Login 🔐</h2>

      {!token ? (
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "250px",
          }}
        >
          <input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "none" ,color:"black"}}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "none" ,color:"black" }}
          />
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <>
          <button
            onClick={handleProtected}
            style={{
              background: "#10b981",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Access Protected Route
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
