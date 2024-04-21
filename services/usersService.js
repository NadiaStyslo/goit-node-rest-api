import { User } from '../models/users.js';

export const createRegister = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};
export const findUser = (filter) => User.findOne(filter);
