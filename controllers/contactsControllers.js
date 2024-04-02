import contactsService from '../services/contactsServices.js';
const contacts = require('../services/contactsServices.js');

export const getAllContacts =
  ('/',
  async (req, res, next) => {
    const result = await contacts.listContacts();
    res.json(result);
  });

export const getOneContact =
  ('/:contactId',
  async (req, res, next) => {
    const result = await contacts.getContactById();
  });

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
