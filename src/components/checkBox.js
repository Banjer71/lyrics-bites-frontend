import React from "react";

const CheckBox = ({ label, value, onChange, checked }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      {label}
    </label>
  );
};

export default CheckBox;
