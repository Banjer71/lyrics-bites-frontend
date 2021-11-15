import React from "react";

const Input = ({
  name,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
  field,
}) => (
  <input
    field={field}
    name={name}
    type={type}
    autoComplete={autoComplete}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;
