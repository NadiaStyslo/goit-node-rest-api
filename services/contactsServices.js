import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join('db', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};
export const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
};
export const removeContact = async (contactId) => {
  const removeItem = await listContacts();
  const index = removeItem.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = removeItem.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(removeItem, null, 2));
  return result;
};
export const addContact = async (data) => {
  const contactAdd = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contactAdd.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactAdd, null, 2));
  return newContact;
};

export const updateContactId = async (contactId, data) => {
  const updateId = await listContacts();
  const index = updateId.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  updateId[index] = { ...updateId[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(updateId, null, 2));
  return updateId[index];
};
