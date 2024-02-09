import "../components/css/signup.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../backend";

const Signin = () => {
  const initialFormData = {
    name: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState("");
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
      const response = await axios.post(`${API}/signin`, formData);

      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 1 });
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
      setFormData(initialFormData);
    }
  };

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>Sign In</h2>
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
          <button type="submit">Sign In</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
