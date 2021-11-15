import React from "react";
import ButtonSpinner from "../reusable/btn-spinner/btn-spinner";

const GradientButton = ({ type, text, size, loading, onClick }) => {
  return (
    <button type={type} className="gradient" onClick={onClick}>
      {loading ? (
        <span className="flex items-center">
          <ButtonSpinner />
        </span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default GradientButton;
