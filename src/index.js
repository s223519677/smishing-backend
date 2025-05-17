import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.config.js";
import authRoute from "./routes/auth.route.js";
import contactRoute from "./routes/contact.route.js";

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount auth routes at /api/auth
app.use("/api/auth", authRoute);

// Mount contact routes at /api/contact
app.use("/api/contact", contactRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
