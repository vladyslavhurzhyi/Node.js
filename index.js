const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require('./contacts');

const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = JSON.parse(listContacts());
            console.table(allContacts);
            break;

        case 'get':
            const contById = getContactById(id);
            if (!contById) {
                console.log(`Contact with id ${id} not found`);
                return new Error(`Contact with id ${id} not found`);
            }
            console.log(contById);
            break;

        case 'add':
            const newContact = addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const removeContactById = removeContact(id);
            if (!removeContactById) {
                return new Error(`Contact with id ${id} not found`);
            }
            console.log(removeContactById);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
