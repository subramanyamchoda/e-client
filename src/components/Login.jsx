import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
const Login = ({ setEmail }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const { email, password } = credentials;
  
    // Hardcoded user authentication (for testing)
    if (email === "kuttyswaraj@gmail.com" && password === "swaraj12") {
      localStorage.setItem("isAuthenticated", "true"); // Store login status
      navigate('/items');
    } else {
      setError("Invalid email or password.");
    }
  
    setLoading(false);
  };
  
  

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 underline">Login</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={credentials.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={credentials.password}
            onChange={handleChange}
          />

          <motion.button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition-transform transform hover:scale-105 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>

          <div className="text-center">
            <Link to="/register" className="text-md text-blue-900">Don't have an account? <u>Register</u></Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
