import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      let result = await axios.post(serverUrl + "/api/auth/forgot-password",{email});
      setLoading(false);
      toast.success("OTP sent to your email!");
      setStep(2); // move to OTP input
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(serverUrl + "/api/auth/verify-otp",{ email, otp });
      setLoading(false);
      toast.success("OTP verified!");
      setStep(3); // move to reset password
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      let result = await axios.post(serverUrl + "/api/auth/reset-password",{ email, otp, password });
      setLoading(false);
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-100">
      <form className="max-w-[400px] w-[90%] bg-white p-[30px] rounded-2xl shadow-2xl flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        {step === 1 && (
          <>
            <p className="text-center text-gray-500 text-[14px]">
              Enter your email to receive an OTP.
            </p>
            <input
              type="email"
              placeholder="Email"
              className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOTP}
              className="h-[38px] bg-gradient-to-r from-red-400 to-pink-500 text-white text-[16px] rounded-lg hover:opacity-90 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center text-gray-500 text-[14px]">
              Enter the OTP sent to your email.
            </p>
            <input
              type="text"
              placeholder="OTP"
              className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOTP}
              className="h-[38px] bg-gradient-to-r from-red-400 to-pink-500 text-white text-[16px] rounded-lg hover:opacity-90 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-center text-gray-500 text-[14px]">
              Enter your new password.
            </p>
            <input
              type="password"
              placeholder="New Password"
              className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="h-[38px] bg-gradient-to-r from-red-400 to-pink-500 text-white text-[16px] rounded-lg hover:opacity-90 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <p className="text-center text-gray-600 text-[13px] mt-2">
          Remembered your password?{" "}
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;