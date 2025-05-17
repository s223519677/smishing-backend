import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No authentication token, access denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if user still exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user id to request
        req.user = { id: user._id.toString() };
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is invalid" });
    }
};
