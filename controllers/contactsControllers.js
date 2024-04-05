import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from '../services/contactsServices.js';
//const contacts = require('../services/contactsServices.js');

export const getAllContacts = async (req, res, next) => {
  const getListContacts = await listContacts();
  res.json(getListContacts);
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
