import "../components/css/signup.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API } from "../backend";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 4) {
      setError("Name must be at least 4 characters long");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await axios.post(`${API}/signup`, formData);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/signin");
        }, 400);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError("Username is already taken");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>Sign Up</h2>
        {success ? (
          <p>Redirecting to sign in...</p>
        ) : (
          <>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <button type="submit">Sign Up</button>
              <p>
                Already have an account? <Link to="/signin">Login</Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
