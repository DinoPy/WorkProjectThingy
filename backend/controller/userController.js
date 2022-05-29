const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// description : Register User
// route POST to /api/users
// access level: PUBLIC

const register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error(
      `Please fill the ${!email ? "email" : !name ? "name" : "password"} field`
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("The email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ name, email, password: hashedPassword });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: name,
      token: genToken(newUser._id),
    });
  }
});

// description : Register User
// route POST to /api/users
// access level: PUBLIC

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill both fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.RSA_KEY, { expiresIn: "14d" });
};

module.exports = {
  register,
  login,
};
