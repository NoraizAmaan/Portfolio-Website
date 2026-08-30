import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any local host origin during development
    if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    const msg = "The CORS policy for this site does not allow access from the specified Origin.";
    return callback(new Error(msg), false);
  },
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});

// Contact Route
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Please fill in all required fields (name, email, subject, message)." 
    });
  }

  // Check email credentials
  const emailUser = process.env.EMAIL_USER;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const receiverEmail = process.env.RECEIVER_EMAIL || "noraizamaan150303@gmail.com";

  if (!emailUser || !clientId || !clientSecret || !refreshToken) {
    console.log("=========================================");
    console.log("⚠️ OAUTH CREDENTIALS NOT CONFIGURED IN RENDER/ENVIRONMENT");
    console.log("Showing simulated contact submission:");
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message:\n${message}`);
    console.log("=========================================");
    
    // Simulate successful save/transmission in local development
    return res.status(200).json({ 
      success: true, 
      message: "Contact form submitted successfully (Simulated mode: check backend logs)." 
    });
  }

  try {
    // 1. Get a fresh access token from Google using the refresh token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error("Failed to refresh token:", tokenData);
      throw new Error("Failed to get authorization token from Google.");
    }

    const accessToken = tokenData.access_token;

    // 2. Construct the MIME message
    const boundary = "boundary_portfolio_contact";
    const rawMessage = [
      `From: "${name}" <${emailUser}>`,
      `To: ${receiverEmail}`,
      `Reply-To: ${email}`,
      `Subject: Portfolio Contact: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset="UTF-8"`,
      ``,
      `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">`,
      `  <h2 style="color: #4f46e5; border-bottom: 2px solid #eef2f6; padding-bottom: 10px; margin-top: 0;">New Contact Message Received</h2>`,
      `  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">`,
      `    <tr><td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>`,
      `    <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>`,
      `    <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${subject}</td></tr>`,
      `  </table>`,
      `  <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #4f46e5; margin-top: 15px;">`,
      `    <h4 style="margin: 0 0 10px 0; color: #4b5563;">Message:</h4>`,
      `    <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1f2937;">${message}</p>`,
      `  </div>`,
      `  <p style="font-size: 11px; color: #9ca3af; margin-top: 30px; border-top: 1px solid #eef2f6; padding-top: 10px; text-align: center;">Sent from Noraiz Amaan's Portfolio contact backend.</p>`,
      `</div>`
    ].join("\r\n");

    // Base64url encode the MIME message
    const base64SafeMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 3. Send email using Gmail REST API over HTTPS
    const sendResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: base64SafeMessage }),
    });

    if (!sendResponse.ok) {
      const sendError = await sendResponse.json();
      console.error("Gmail API Send Error:", sendError);
      throw new Error("Failed to send message via Gmail API.");
    }
    
    return res.status(200).json({ 
      success: true, 
      message: "Your message has been sent successfully!" 
    });
  } catch (error) {
    console.error("Gmail API error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again later." 
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Contact server listening on port ${PORT}`);
  console.log(`👉 API Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});
