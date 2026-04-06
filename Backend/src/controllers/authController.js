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

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax" 
});
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

    const userdata = await User.findById(userId).select("-password");

    res.json(userdata);
  } catch (e) {
    res.status(401).json({
      message: "Something went wrong"
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name,oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    // compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong old password" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.name=name;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (e) {
    res.status(500).json({ message: "Error updating password" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userdetails,
  updatePassword
}
