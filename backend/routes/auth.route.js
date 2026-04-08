import express from "express";
import {
  login,
  logout,
  signUp,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// Forgot Password Flow
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);           
authRouter.post("/reset-password", resetPassword);

export default authRouter;