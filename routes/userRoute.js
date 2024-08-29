import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../middlewares/authMiddelware.js";

router.post("/register", async (req, res) => {
  // Add your code to register a user
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res
        .status(200)
        .send({ message: "Email já cadastrado!", success: false });
    }

    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    const newuser = new User(req.body);

    await newuser.save();

    res
      .status(200)
      .send({ message: "Usuário criado com sucesso!", success: true });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Falha ao registrar o usuário!",
      success: false,
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  // Add your code to login
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "Usuário não encontrado!", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Senha incorreta!", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "Login efetuado com sucesso!",
        success: true,
        data: token,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Falha ao realizar login!",
      success: false,
      error,
    });
  }
});

router.post("/get-user-info-by-id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(200)
        .send({ message: "Usuário não encontrado!", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Falha ao obter dados do usuário!",
      success: false,
      error,
    });
  }
});

export default router;
