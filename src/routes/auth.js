const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignup } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignup(req);

    const {
      password,
      firstName,
      lastName,
      emailId,
      photoUrl,
      skills,
      age,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      photoUrl,
      skills,
      age,
    });

    await user.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = await user.getjwt();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // Required on Vercel (HTTPS)
      sameSite: "none",   // Required for frontend & backend on different domains
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json(user);
  } 
catch (err) {
  console.error("LOGIN ERROR:", err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

  
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.send("Logged out successfully");
});

module.exports = authRouter;
