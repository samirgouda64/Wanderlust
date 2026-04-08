import genToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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

// ================= EMAIL SENDER =================
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Wanderlust | Password Reset OTP",
    html: `
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f6f8;">
      
      <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg, #ff7e5f, #feb47b); padding:20px; text-align:center;">
          <h1 style="color:#ffffff; margin:0; font-size:24px;">
            🌍 Wanderlust
          </h1>
          <p style="color:#fff; margin:5px 0 0; font-size:14px;">
            Explore • Book • Travel
          </p>
        </div>

        <!-- Body -->
        <div style="padding:30px;">
          <p style="font-size:16px; color:#333;">
            Hello <strong>${email}</strong>,
          </p>

          <p style="color:#555; font-size:14px; line-height:1.6;">
            We received a request to reset your Wanderlust account password.  
            Use the OTP below to securely continue:
          </p>

          <!-- OTP Box -->
          <div style="text-align:center; margin:30px 0;">
            <span style="
              font-size:30px;
              letter-spacing:8px;
              font-weight:bold;
              background:linear-gradient(135deg, #ff7e5f, #feb47b);
              color:#ffffff;
              padding:14px 24px;
              border-radius:8px;
              display:inline-block;
            ">
              ${otp}
            </span>
          </div>

          <p style="color:#555; font-size:14px;">
            ⏳ This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p style="color:#777; font-size:13px;">
            🔒 For your security, do not share this OTP with anyone.
          </p>

          <p style="color:#777; font-size:13px;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f9f9f9; padding:15px; text-align:center;">
          <p style="font-size:12px; color:#999; margin:0;">
            © ${new Date().getFullYear()} Wanderlust | Book Smart, Book Safe
          </p>
        </div>

      </div>

    </body>
    `,
  });
};

// ================= STEP 1: SEND OTP =================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);
    user.resetOTP = hashedOTP;
    user.resetOTPExpires = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    await sendOTPEmail(user.email, otp, user);

    res.json({ message: "OTP sent to your email" });
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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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