import { Contact } from '../models/contact.js';

export const listContacts = async (owner) => {
  const data = await Contact.find(owner);
  return data;
};
export const getContactById = async (contactId) => {
  const result = Contact.findOne(contactId);
  return result || null;
};
export const removeContact = async (contactId) => {
  const result = Contact.findOneAndDelete(contactId);

  return result;
};
export const addContact = (data) => {
  const contactAdd = Contact.create(data);
  return contactAdd;
};

export const updateContactId = async (contactId, data) => {
  const updateId = Contact.findOneAndUpdate(contactId, data, { new: true });
  return updateId;
};

export const updateStatusContactId = async (contactId, body) => {
  const { favorite } = body;
  const updateStatus = await Contact.findOneAndUpdate(contactId, { favorite }, { new: true });
  return updateStatus;
};
