const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(process.env.JWT_SECRET);
    // console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log(decoded);
 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;