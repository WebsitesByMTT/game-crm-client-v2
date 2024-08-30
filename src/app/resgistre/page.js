// pages/register.js

"use client";

import { useState } from "react";
import { config } from "@/utils/config";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form"); // or "verify"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${config.server}/api/company/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setStep("verify");
      } else {
        setMessage(data.message || "Failed to request OTP");
      }
    } catch (error) {
      setMessage("Failed to request OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${config.server}/api/company/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, user }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // Handle successful user creation (e.g., redirect to login page)
      } else {
        setMessage(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      setMessage("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">
        {step === "form" ? "Register" : "Verify OTP"}
      </h1>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      {step === "form" ? (
        <form onSubmit={handleRequestOtp}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 text-white bg-blue-500 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Request OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 text-white bg-green-500 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
