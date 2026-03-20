import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(express.json()); // ✅ MUST BE FIRST

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use("/api/auth", authRoutes); // ✅ matches frontend

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});