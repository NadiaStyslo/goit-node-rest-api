import { Contact } from '../models/contact.js';

export const listContacts = async () => {
  const data = await Contact.find();
  return data;
};
export const getContactById = async (contactId) => {
  const result = Contact.findById(contactId);
  return result || null;
};
export const removeContact = async (contactId) => {
  const result = Contact.findByIdAndDelete(contactId);

  return result;
};
export const addContact = async (data) => {
  const contactAdd = Contact.create(data);
  return contactAdd;
};

export const updateContactId = async (contactId, data) => {
  const updateId = Contact.findByIdAndUpdate(contactId, data, { new: true });
  return updateId;
};

export const updateStatusContactId = async (contactId, data) => {
  const { favorite } = body;
  const updateStatus = Contact.findByIdAndUpdate(contactId, data, { favorite: true });
  return updateStatus;
};
