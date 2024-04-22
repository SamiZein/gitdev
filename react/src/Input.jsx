const Input = ({ type, value, onChange, placeholder, label, disabled }) => {
  return (
    <div>
      {label && <label className="block mb-2 font-semibold text-dark-text-secondary">{label}</label>}
      <input
        type={type}
        className="w-full h-10 px-3 py-2 border rounded bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
