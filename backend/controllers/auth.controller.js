import genToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "../utils/sendOTPEmail.js";

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User is already exist" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await User.create({ name, email, password: hashPassword });

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signUp error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email }).populate("listing", "title image1 image2 image3 description rent category city landMark");
    if (!user) {
      return res.status(400).json({ message: "User is not exist" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect Password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};

// ================= STEP 1: SEND OTP =================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);

    user.resetOTP = hashedOTP;
    user.resetOTPExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    sendOTPEmail(user.email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= STEP 2: VERIFY OTP =================
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.resetOTP) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const isMatch = await bcrypt.compare(otp, user.resetOTP);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.resetOTPExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= STEP 3: RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.resetOTP) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const isMatch = await bcrypt.compare(otp, user.resetOTP);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.resetOTPExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear OTP
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};