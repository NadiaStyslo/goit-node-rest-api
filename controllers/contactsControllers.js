import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactId,
  updateStatusContactId,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const getAllContacts = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit } = req.query;
  // console.log(req.query);
  const skip = (page - 1) * limit;
  const getListContacts = await listContacts({ owner }, { skip, limit });
  res.status(200).json(getListContacts);
});

export const getOneContact = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const getOneId = await getContactById({ owner, _id: id });
  if (!getOneId) {
    throw HttpError(404, 'Not found');
  }
  if (getOneId.owner.toString() !== req.user._id.toString()) {
    throw HttpError(403, 'Access forbidden');
  }
  res.json(getOneId);
});

export const deleteContact = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const deleteId = await removeContact({ owner, _id: id });
  if (!deleteId) {
    throw HttpError(404, 'Not Found');
  }
  res.json(deleteId);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await addContact({ ...req.body, owner });
  if (!newContact) throw HttpError(400, 'Failed to create contact');
  res.status(200).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await updateContactId({ owner, _id: id }, req.body);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }
  res.status(201).json(result);
});
export const updateStatus = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await updateStatusContactId(id, { favorite });
  if (!result) {
    return res.status(404).json({ message: 'Not Found' });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(404).json({ error: 'Favorite must be filled: true or false' });
  }
  return res.status(200).json(result);
});
