import express from "express";
import dotenv from "dotenv";
import configDB from "./config/dbConfig.js";
dotenv.config();
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

configDB();

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
