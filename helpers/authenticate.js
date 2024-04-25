import HttpError from './HttpError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;
const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'Authoriztion header not found'));
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return next(HttpError(401, 'User not found'));
    }
    if (!user.token) {
      return next(HttpError(401, 'Token invalid'));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

export default authenticate;
