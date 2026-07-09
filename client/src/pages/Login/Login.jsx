import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", loginData);
      

      alert(response.data.message);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Save JWT Token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Redirect to Dashboard
      navigate("/dashboard");

    }
    catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>Ticket Management System</h1>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;