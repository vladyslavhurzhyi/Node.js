const { v4 } = require('uuid');
const fs = require('fs');

const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

//get contacts list
function listContacts() {
    return fs.readFileSync(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        return JSON.parse(data);
    });
}

//get contacts by id
function getContactById(contactId) {
    const data = listContacts();
    const contacts = JSON.parse(data);
    const result = contacts.filter(
        (item) => item.id.toString() === contactId.toString()
    );
    if (!result) {
        return null;
    }

    return result;
}

//remove contacts by id
function removeContact(contactId) {
    const data = listContacts();
    let contacts = JSON.parse(data);
    const removeContact = getContactById(contactId);
    const newList = contacts.filter(
        (item) => item.id.toString() !== contactId.toString()
    );
    if (!newList) {
        return null;
    }
    fs.writeFileSync(contactsPath, JSON.stringify(newList));

    return removeContact;
}

//add new contact in contactsList
function addContact(name, email, phone) {
    const data = listContacts();
    let contacts = JSON.parse(data);
    const newContact = {
        name: `${name}`,
        email: `${email}`,
        phone: `${phone}`,
        id: `${v4()}`,
    };
    contacts.push(newContact);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
