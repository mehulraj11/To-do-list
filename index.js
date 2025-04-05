// Clear console
console.clear();

// Built-in & external modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";



// Custom modules
import taskRouter from "./routes/taskRoutes.js";

// App setup
const server = express();
const PORT = 1000;

// Database connection
const main = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/task"); // ✅ Fixed: double slashes `//` to single
        console.log("✅ Database connected");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1); // optional: exits if DB fails
    }
};
main();

// Middleware
server.use(express.static("dist"))
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Routes
server.use("/", taskRouter);

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
