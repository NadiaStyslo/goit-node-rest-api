import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userRegisterSchema, userLoginInSchema } from '../schemas/usersSchemas.js';
import {
  createNewUser,
  createLogin,
  createCurrent,
  createLogout,
  createAvatar,
} from '../controllers/usersControllers.js';
import authenticate from '../helpers/authenticate.js';
import { upload } from '../helpers/upload.js';

const authRouter = express.Router();
authRouter.post('/register', validateBody(userRegisterSchema), createNewUser);
authRouter.post('/login', validateBody(userLoginInSchema), createLogin);
authRouter.get('/current', authenticate, createCurrent);
authRouter.post('/logout', authenticate, createLogout);
authRouter.patch('/avatar', authenticate, upload.single('avatar', createAvatar));
export default authRouter;
