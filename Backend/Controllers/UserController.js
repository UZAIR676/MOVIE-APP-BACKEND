import asyncHandler from 'express-async-handler';
import User from  '../Models/Usermodels.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Middlewares/Auth.js';

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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user in DB
    const user = await User.findOne({ email });
    
    // If user exists, compare password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        Image: user.Image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const updateUserProfile = asyncHandler (async(req,res)=>{
  const { fullName,email,Image} = req.body;
try {
  const user = await User.findById(req.user._id);

  if(user){
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.Image = Image || user.Image;
    const updateUser = await user.save();

    res.json({
      _id : updateUser._id,
      fullName : updateUser.fullName,
      email : updateUser.email,
      Image : updateUser.Image,
      isAdmin : updateUser.isAdmin,

      token : generateToken(updateUser._id),

    });


  }

  else{
    res.status(400);
    throw new Error("user not found ")
  }
  
} catch (error) {
  res.status(400).json({ message: error.message})
}
})


export { registerUser , loginUser, updateUserProfile};
