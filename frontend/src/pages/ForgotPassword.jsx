import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { serverUrl, loading, setLoading } = useContext(authDataContext);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  // Timer (3 min)
  const [timeLeft, setTimeLeft] = useState(180);

  // Password Strength
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  // ⏱️ Format Time (MM:SS)
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Password Strength
  const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  // Password Validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(password)) {
      return "Password must be 8+ chars, include uppercase, lowercase, number & special character";
    }
    return null;
  };

  // Timer
  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timeLeft]);

  // STEP 1
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        serverUrl + "/api/auth/forgot-password",
        { email }
      );

      setLoading(false);
      toast.success("OTP sent!");
      setStep(2);
      setTimeLeft(res.data.remainingTime || 180);

    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message);
    }
  };

  // OTP INPUT
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    setOtp(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtpArray(newOtp);
    setOtp(paste);
  };

  // STEP 2 VERIFY
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(serverUrl + "/api/auth/verify-otp", {
        email,
        otp,
      });

      setLoading(false);
      toast.success("OTP verified!");
      setStep(3);

    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message);
    }
  };

  // RESEND
  const handleResend = async () => {
    try {
      const res = await axios.post(
        serverUrl + "/api/auth/forgot-password",
        { email }
      );

      setTimeLeft(res.data.remainingTime || 180);
      toast.success("OTP resent!");

    } catch (err) {
      if (err.response?.data?.remainingTime) {
        setTimeLeft(err.response.data.remainingTime);
      }
      toast.error(err.response?.data?.message);
    }
  };

  // STEP 3 RESET
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      toast.error(error);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(serverUrl + "/api/auth/reset-password", {
        email,
        otp,
        password,
      });

      setLoading(false);
      toast.success("Password reset successful!");
      navigate("/login");

    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message);
    }
  };

  return (
  <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-100 to-orange-100">

    <form className="w-[380px] bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-8 flex flex-col gap-5">

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-sm text-gray-500">
          Reset your password in a few steps
        </p>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />

          <button
            onClick={handleSendOTP}
            className="h-11 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <p className="text-center text-sm text-gray-500">
            Enter the 6-digit OTP
          </p>

          <div className="flex justify-center gap-3">
            {otpArray.map((digit, i) => (
              <input
                key={i}
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                className="w-12 h-12 text-lg font-semibold text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              />
            ))}
          </div>

          {/* Timer */}
          <p className="text-center text-sm text-gray-500">
            {timeLeft > 0 ? (
              <span className="text-red-500 font-medium">
                Resend in {formatTime(timeLeft)}
              </span>
            ) : (
              <span
                onClick={handleResend}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Resend OTP
              </span>
            )}
          </p>

          <button
            onClick={handleVerifyOTP}
            className="h-11 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all shadow-md"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordStrength(getPasswordStrength(e.target.value));
              }}
              className="h-11 w-full border border-gray-300 rounded-xl px-4 focus:ring-2 focus:ring-red-400"
            />

            {/* Strength */}
            {password && (
              <div className="mt-2">
                <p
                  className={`text-sm font-medium ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength} Password
                </p>

                <div className="h-2 bg-gray-200 rounded mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength === "Weak"
                        ? "w-1/3 bg-red-500"
                        : passwordStrength === "Medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11 border border-gray-300 rounded-xl px-4 focus:ring-2 focus:ring-red-400"
          />

          <button
            onClick={handleResetPassword}
            className="h-11 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all shadow-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        Remember your password?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>

    </form>
  </div>
);
}

export default ForgotPassword;