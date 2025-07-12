// src/pages/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

const login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with your own password
    const correctPassword = "dean_meyer";

    if (password === correctPassword) {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="mainContainer">
      <h1 >Admin Login</h1>
      <form onSubmit={handleLogin} className="formAdmin">
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {error && <p >{error}</p>}
        <button type="submit" className="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default login;
