import dotenv from "dotenv";
dotenv.config();
import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export const sendOTPEmail = async (email, otp) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  try {
    await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.SMTP_USER,
        name: "Wanderlust Support",
      },
      to: [{ email }],
      subject: "Wanderlust | Password Reset OTP",
      textContent: `Hello ${email},
        Your OTP for password reset is: ${otp} This OTP is valid for 10 minutes.
        If you did not request this, please ignore this email.- Wanderlust Team`,
      htmlContent: `<body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f6f8;">
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
  } catch (error) {
    console.error("API Error:", error.response?.body || error);
  }
};