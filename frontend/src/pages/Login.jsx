import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

function Login() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let {userData, setUserData} = useContext(userDataContext);
  let navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let {loading, setLoading} = useContext(authDataContext);

  const handleLogin = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setUserData(result.data);
      navigate("/");
      // console.log(result);
      toast.success("Login Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
  <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-100 relative">
    
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
      onSubmit={handleLogin}
    >
      <h1 className="text-[23px] font-bold text-center text-gray-800">
        Welcome to <span className="text-red-500">Wanderlust</span>
      </h1>

      <p className="text-center text-[13px] text-gray-500">
        Login to explore beautiful places 🌍
      </p>

      {/* Email */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-[16px] text-gray-600">Email</label>
        <input
          type="email"
          className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-[5px] relative">
        <label className="text-[16px] text-gray-600">Password</label>
        <input
          type={show ? "text" : "password"}
          className="h-[38px] border border-gray-300 rounded-lg px-[15px] focus:outline-none focus:ring-2 focus:ring-red-400"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

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
        {/* Forgot Password */}

        <span
          className="text-red-500 text-[13px] cursor-pointer hover:underline block"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Your Password?
        </span>
      </div>

      {/* Button */}
      <button
        className="h-[38px] bg-gradient-to-r from-red-400 to-pink-500 text-white text-[18px] rounded-lg hover:opacity-90 transition font-semibold"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Footer */}
      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <span
          className="text-red-500 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </form>
  </div>
);

}

export default Login;
