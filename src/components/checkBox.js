import React from "react";
import "../css/checkbox.css";

const CheckBox = ({ label, value, onChange, checked }) => {
  return (
    <label className="checkbox">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

export default CheckBox;
