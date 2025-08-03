export default function Input({
  label,
  placeholder,
  inputValue,
  type,
  onChange,
  name,
}) {
  return (
    <div className="p-2 d-flex flex-column col-9">
      <label>{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        value={inputValue}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}
