import HttpError from './HttpError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';

const { SECRET_KEY } = process.env;
export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'Authoriztion header not found'));
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, 'User not found'));
    }
    if (!user.token) {
      next(HttpError(401, 'Token invalid'));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};
