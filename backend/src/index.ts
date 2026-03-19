import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));
app.use("/auth", authRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});