import React from "react";
import "./button.css";

const Button = ({ type, disabled, children }) => {
  return (
    <button type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
