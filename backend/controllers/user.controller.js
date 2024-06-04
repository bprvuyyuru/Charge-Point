import express from "express";
import { User, validateLogin, validateUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

export const getUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: email });

  if (!user) return res.status(400).send("User name or password incorrect");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send("User name or password incorrect");

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600m",
  });
  return res.header("x-auth-token", accessToken).json({
    error: false,
    message: "login success",
    email,
    accessToken,
  });
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isUser = await User.findOne({ email: email });

  if (isUser) return res.status(400).send("User Already exsisted");

  const user = new User({
    firstName,
    lastName,
    fullName: firstName.concat(" ", lastName),
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600m",
  });

  return res.header("x-auth-token", accessToken).json({
    error: false,
    fullName,
    email,
    accessToken,
    message: "registration Successful",
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().sort({ firstName: 1 });
  return res.json({
    error: false,
    users,
  });
};

export default router;
