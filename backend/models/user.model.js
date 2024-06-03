import Joi from "joi";
import mongoose from "mongoose";

// creating user schema
export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 5, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 5, maxlength: 50 },
    fullName: { type: String },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 250,
      unique: true,
    },
    password: { type: String, required: true, minlength: 5, maxlength: 250 },
    createdOn: { type: Date, default: new Date().getTime() },
  })
);

export const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    fullName: Joi.string(),
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  });
  return schema.validate(user);
};

export const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  });
  return schema.validate(user);
};
