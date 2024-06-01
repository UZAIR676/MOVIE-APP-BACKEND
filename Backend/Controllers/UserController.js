import asyncHandler from 'express-async-handler';
import User from  '../Models/Usermodels.js';
import bcrypt from 'bcryptjs';
import generateToken from '../Middlewares/Auth.js';

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, Image } = req.body;

  try {
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      Image,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Respond with user data and token
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      Image: user.Image,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    console.error('Error:', error.message);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

export { registerUser };
