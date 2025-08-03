import avatarImg from "../../assets/img/avatarImg.png";
import ContactDetail from "../ContactDetail";
import LocationIcon from "../../assets/icons/location.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import EnvelopeIcon from "../../assets/icons/envelope.svg?react";
import PencilIcon from "../../assets/icons/pencil.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

export default function ContactCard({ contact }) {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const onDelete = async () => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/mycontacts/contacts/${contact.id}`,
      { method: "DELETE" }
    );
    dispatch({ type: "delete_contact", payload: contact.id });
  };

  return (
    <div className="d-flex p-2 border rounded m-3 align-items-center">
      <div className="p-2 col-2">
        <img
          src={avatarImg}
          className="img-fluid rounded-circle"
          height={150}
          width={150}
        />
      </div>
      <div className="p-2 col-8">
        <h3>{contact.name}</h3>
        <ContactDetail
          contactName={contact.name}
          icon={<LocationIcon width={20} height={20} />}
          description={contact.address}
        />
        <ContactDetail
          icon={<PhoneIcon width={20} height={20} />}
          description={contact.phone}
        />
        <ContactDetail
          icon={<EnvelopeIcon width={20} height={20} />}
          description={contact.email}
        />
      </div>
      <div className="p-2 col-2">
        <Link to={`/edit/${contact.id}`}>
          <button className="btn">
            <PencilIcon width={20} height={20} />
          </button>
        </Link>

        <button onClick={onDelete} className="btn">
          <TrashIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
