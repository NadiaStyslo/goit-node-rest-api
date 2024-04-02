const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}
async function getContactById(contactId) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const removeItem = await listContacts();
  const index = removeItem.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = removeItem.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(removeItem, null, 2));
  return result;
}
async function addContact(name, email, phone) {
  const contactAdd = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactAdd.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactAdd, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
