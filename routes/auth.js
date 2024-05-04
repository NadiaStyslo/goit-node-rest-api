import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userRegisterSchema, userLoginInSchema, userEmailSchema } from '../schemas/usersSchemas.js';
import {
  createNewUser,
  verifyEmail,
  createLogin,
  createCurrent,
  createLogout,
  createAvatar,
  resedVarifyEmail,
} from '../controllers/usersControllers.js';
import authenticate from '../helpers/authenticate.js';
import { upload } from '../helpers/upload.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(userRegisterSchema), createNewUser);
authRouter.get('/verify/:verificationToken', verifyEmail);
authRouter.post('/verify', validateBody(userEmailSchema), resedVarifyEmail);
authRouter.post('/login', validateBody(userLoginInSchema), createLogin);
authRouter.get('/current', authenticate, createCurrent);
authRouter.post('/logout', authenticate, createLogout);
authRouter.patch('/avatars', authenticate, upload.single('avatar'), createAvatar);
export default authRouter;
