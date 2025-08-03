import { useEffect, useState } from "react";
import Input from "../../components/Input";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditContact() {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    //traemos el contact a editar y su id
    const contactEdit = store.contacts.find(
      (theContact) => theContact.id == id
    );
    //si existe llenamos los inputs con ese contacto
    if (contactEdit) {
      setInputValue(contactEdit);
    }
    //esto se ejecuta cada vez que se llame al id
  }, [id, store.contacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inputvalue", inputValue);

    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/mycontacts/contacts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
      }
    );
    console.log(response);
    if (response.ok) {
      const updateContact = await response.json();
      dispatch({ type: "edit_contact", payload: updateContact });
      navigate("/");
    } else {
      alert("error al editar, intente de nuevo ");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className="p-2 m-2">
      <h1>Edit contact </h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.name}
          name="name"
        />
        <Input
          label="Email"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.email}
          name="email"
        />
        <Input
          label="Phone"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.phone}
          name="phone"
        />
        <Input
          label="Address"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.address}
          name="address"
        />

        <button className="btn btn-primary m-3" type="submit">
          Save Changes
        </button>
        <Link to="/">
          <button className="btn btn-secondary m-3">cancel</button>
        </Link>
      </form>
    </div>
  );
}
