import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userRegisterSchema, userLoginInSchema } from '../schemas/usersSchemas.js';
import { createNewUser, createLogin } from '../controllers/usersControllers.js';

const authRouter = express.Router();
authRouter.post('/register', validateBody(userRegisterSchema), createNewUser);
authRouter.post('/login', validateBody(userLoginInSchema), createLogin);
export default authRouter;
