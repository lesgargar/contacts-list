export default function ContactDetail({ icon, description }) {
  return (
    <div className="d-flex  align-items-center">
      <div className="p-1">{icon}</div>
      <div className="p-2">{description}</div>
    </div>
  );
}
