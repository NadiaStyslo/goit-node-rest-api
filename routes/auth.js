import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userRegisterSchema, userLoginInSchema } from '../schemas/usersSchemas.js';
import {
  createNewUser,
  createLogin,
  createCurrent,
  createLogout,
} from '../controllers/usersControllers.js';
import authenticate from '../helpers/authenticate.js';
const authRouter = express.Router();
authRouter.post('/register', validateBody(userRegisterSchema), createNewUser);
authRouter.post('/login', validateBody(userLoginInSchema), createLogin);
authRouter.get('/current', authenticate, createCurrent);
authRouter.post('/logout', authenticate, createLogout);

export default authRouter;
