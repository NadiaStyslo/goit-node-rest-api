// import { createRegister, findUser } from '../services/usersService.js';
import { User } from '../models/users.js';
import HttpError from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import gravatar from 'gravatar';
import { raw } from 'express';
import path from 'path';
import fs from 'fs/promises';

const avatarDir = path.resolve('public', 'avatars');

dotenv.config();
const { SECRET_KEY } = process.env;

export const createNewUser = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const createLogin = ctrlWrapper(async (req, res) => {
  // console.log('Inside createLogin function');
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findOneAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const createCurrent = ctrlWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Not authorized');
  res.json({
    email,
    subscription,
  });
});

export const createLogout = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOneAndUpdate(_id, { token: '' });

  if (!user) throw HttpError(401, 'Not authorized');
  res.status(204).send();
});

export const createAvatar = ctrlWrapper(async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
});
