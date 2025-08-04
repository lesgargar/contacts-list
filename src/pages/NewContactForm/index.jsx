import { useState } from "react";
import Input from "../../components/Input";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function NewContactForm() {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inputvalue", inputValue);
    if (!inputValue.name.length) {
      alert("por favor asigna un nombre");
    }
    try {
      if (inputValue.name.length) {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/mycontacts/contacts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputValue),
          }
        );

        console.log(response);

        if (inputValue.name.length > 0 && response.status === 201) {
          const newContact = await response.json();
          dispatch({ type: "add_contact", payload: newContact });
          navigate("/");
        } else {
          alert("no se agrego el contacto");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className="p-2 m-2">
      <h1>Add a new Contact </h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="Full name"
          type="text"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.name}
          name="name"
        />
        <Input
          label="Email"
          placeholder="Email"
          type="text"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.email}
          name="email"
        />
        <Input
          label="Phone"
          placeholder="Phone"
          type="number"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.phone}
          name="phone"
        />
        <Input
          label="Address"
          placeholder="Address"
          type="text"
          onChange={(e) => handleOnChange(e)}
          inputValue={inputValue.address}
          name="address"
        />

        <button className="btn btn-primary m-3" type="submit">
          Save
        </button>
        <Link to="/">
          <button className="btn btn-secondary m-3">cancel</button>
        </Link>
      </form>
    </div>
  );
}
