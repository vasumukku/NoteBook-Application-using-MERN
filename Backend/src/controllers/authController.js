const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, } = req.body;
  
    // check existing user
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } 
    

    // hash password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({ 
      name,
      email,
      password: hashedPassword
    });
   
    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
 

const loginUser = async (req, res) => {
  try {
     
    const { email, password } = req.body;
    
    
    const user = await User.findOne({ email });
   
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }
   
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token",token);
    res.json({
      message: "Login Successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}; 


const userdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const userdata = await User.findById(userId);

    res.json(userdata);
  } catch (e) {
    res.status(401).json({
      message: "Something went wrong"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userdetails
}
