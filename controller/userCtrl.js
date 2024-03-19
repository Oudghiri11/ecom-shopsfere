const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../Config/jwtToken");

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
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Invalid Informations",
    });
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createUser, loginUserCtrl, getallUser };
