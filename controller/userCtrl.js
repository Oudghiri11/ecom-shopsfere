const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password } = req.body;

    // Vérifier si l'utilisateur existe déjà avec la même adresse e-mail ou le même numéro de mobile
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ firstname, lastname, email, mobile, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
});

module.exports = { createUser, loginUserCtrl };
