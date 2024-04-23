import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userRegisterSchema, userLoginInSchema } from '../schemas/usersSchemas.js';
import { createNewUser, createLogin } from '../controllers/usersControllers.js';
import { authenticate } from '../helpers/authenticate.js';
const authRouter = express.Router();
authRouter.post('/register', validateBody(userRegisterSchema), createNewUser);
authRouter.post('/login', authenticate, validateBody(userLoginInSchema), createLogin);
export default authRouter;
