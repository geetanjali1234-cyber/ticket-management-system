import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../utils/axiosConfig";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all the fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert(response.data.message);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "User",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <h1>Ticket Management System</h1>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;