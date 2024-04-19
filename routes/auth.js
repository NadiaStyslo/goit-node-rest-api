import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userRegisterSchema, userLoginInSchema } from '../schemas/usersSchemas.js';
import { createNewUser } from '../controllers/usersControllers.js';

const authRouter = express.Router();
authRouter.post('/register', validateBody(userRegisterSchema), createNewUser);

export default authRouter;
