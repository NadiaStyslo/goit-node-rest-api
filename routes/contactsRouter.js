import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { isValidId } from '../helpers/isValidid.js';

import {
  createContactSchema,
  updateContactSchema,
  updateStatusContact,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isValidId, getOneContact);

contactsRouter.delete('/:id', isValidId, deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch('/:id/favorite', isValidId, validateBody(updateStatusContact), updateStatus);
export default contactsRouter;
