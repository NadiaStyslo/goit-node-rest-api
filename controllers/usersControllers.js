// import { createRegister, findUser } from '../services/usersService.js';
import { User } from '../models/users.js';
import HttpError from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;

export const createNewUser = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
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
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
});
async function check(userId) {
  try {
    const user = await User.findById(userId);

    const token = user.token;
    if (token) {
      console.log('token:', token);
    } else {
      console.log('error');
    }
  } catch (error) {
    console.error('error', error);
  }
}
check('6627c13cb8d4ae37fa1ffb76');
