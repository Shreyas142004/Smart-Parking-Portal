import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //reading the token
      token = req.headers.authorization.split(" ")[1];
      //verify token
      console.log("Token:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      console.log("Decoded:", decoded);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: error.message,
    });
  }
};
