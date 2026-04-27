import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(password)) {
      return "Password must be 8+ chars, include uppercase, lowercase, number & special character";
    }
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );

      setLoading(false);
      setUserData(result.data);
      navigate("/");
      toast.success("Signup Successfully");

    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-100 relative">

      {/* Back Button */}
      <div
        className="w-[35px] h-[35px] bg-white shadow-lg cursor-pointer absolute top-[5%] left-[5%] rounded-full flex items-center justify-center hover:scale-110 transition"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[20px] h-[20px] text-red-500" />
      </div>

      {/* Card */}
      <form
        className="max-w-[450px] w-[90%] bg-white p-[40px] rounded-2xl shadow-2xl flex flex-col gap-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-[23px] font-bold text-center text-gray-800">
          Join <span className="text-red-500">Wanderlust</span>
        </h1>

        <p className="text-center text-[13px] text-gray-500">
          Create your account and start travelling ✈️
        </p>

        {/* Username */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-[16px] text-gray-600">Username</label>
          <input
            type="text"
            className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-[16px] text-gray-600">Email</label>
          <input
            type="email"
            className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-[5px] relative">
          <label className="text-[16px] text-gray-600">Password</label>

          <input
            type={show ? "text" : "password"}
            className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
            required
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setPasswordStrength(getPasswordStrength(value));
              setPasswordError(validatePassword(value));
            }}
          />

          {/* Eye Icon */}
          {!show ? (
            <IoMdEye
              className="w-[18px] h-[18px] absolute right-[15px] top-[38px] cursor-pointer text-gray-500"
              onClick={() => setShow(true)}
            />
          ) : (
            <IoMdEyeOff
              className="w-[18px] h-[18px] absolute right-[15px] top-[38px] cursor-pointer text-gray-500"
              onClick={() => setShow(false)}
            />
          )}

          {/* Validation + Strength */}
          {password && (
            <div className="mt-1">
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

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

        {/* Button */}
        <button
          className="h-[38px] bg-gradient-to-r from-red-400 to-pink-500 text-white text-[18px] rounded-lg hover:opacity-90 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;