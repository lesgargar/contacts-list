import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import ContactCard from "../components/ContactCard";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [contactsList, setContactsList] = useState([]);

  useEffect(() => {
    //createAgenda();
    dispatch({ type: "set_contacts", payload: [] }); //<- con esta linea limpiamos antes de traer los contacts y no quede valores previos
    getContacts();
  }, []);
  const createAgenda = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/mycontacts",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();
    console.log("response", responseJSON);
  };
  const getContacts = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/mycontacts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();
    console.log("getContacts", responseJSON);
    //aqui vamos a guardar los datos que traiga en el store global
    dispatch({ type: "set_contacts", payload: responseJSON.contacts });
  };

  return (
    <div className="text-center mt-5">
      <h1>mis contactos</h1>
      {store.contacts &&
        store.contacts.map((contact, index) =>
          contact ? <ContactCard key={contact.id} contact={contact} /> : null
        )}
    </div>
  );
};
