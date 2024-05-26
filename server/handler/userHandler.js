const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const { sendEmail } = require("../utils/index");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  const { name, emailAddress, password, phone } = req.body;

  try {
    if (!name || !emailAddress || !password || !phone) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters.");
    }

    const userExists = await User.findOne({ emailAddress });

    if (userExists) {
      res.status(400);
      throw new Error("Email already in use.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      emailAddress,
      password: hashedPassword,
      phone,
      verificationToken,
    });

    if (user) {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

      await sendEmail({
        from: process.env.EMAIL_USER,
        to: user.emailAddress,
        subject: "Verify Your Renew Mart Account",
        html: `
            <h1>Dear ${user.name},</h1>
            <p>Thank you for registering at Renew Mart.\n Please click the link below to verify your email address and complete your registration:</p>
            <a href="${verificationUrl}">Verify Your Email</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,</p>
            <p>The Renew Mart Team</p>
          `,
      });

      const { _id, name, emailAddress, phone, isVerified } = user;
      res.status(201).json({
        _id,
        name,
        emailAddress,
        phone,
        isVerified,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await User.findOne({ emailAddress });

  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup");
  }

  if (!user.isVerified) {
    res.status(400);
    throw new Error("Please verify your email before logging in");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email address or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  if (user && passwordIsCorrect) {
    const { _id, name, emailAddress, phone, isVerified } = user;

    res.status(200).json({
      _id,
      name,
      emailAddress,
      phone,
      isVerified,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, emailAddress, phone, isVerified } = user;

    res.status(200).json({
      _id,
      name,
      emailAddress,
      phone,
      isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const verifyAccount = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Invalid verification link");
  }

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).send("Invalid verification link");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.redirect(process.env.FRONTEND_URL);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({
    message: "User deleted successfully",
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout successful" });
});

module.exports = {
  createUser,
  loginUser,
  getUser,
  verifyAccount,
  deleteUser,
  logoutUser,
};
