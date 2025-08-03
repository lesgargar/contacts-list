export const initialStore = () => ({
  contacts: [],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts": //<- set contacts trae la data de la api y la guarda en el store, se usa en home getContacts()
      return { ...store, contacts: action.payload };
    case "add_contact":
      return { ...store, contacts: [...store.contacts, action.payload] };
    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "edit_contact":
      if (!action.payload) return store; //<-previene errores para que no sea undefined
      return {
        ...store,
        contacts: store.contacts.map((theContact) => {
          theContact.id === action.payload.id ? action.payload : theContact;
        }),
      };
    default:
      return store;
  }
}
