import dotenv from "dotenv";
dotenv.config();
export const backend_url = process.env.BACKEND_URL || "http://localhost:8000/";
