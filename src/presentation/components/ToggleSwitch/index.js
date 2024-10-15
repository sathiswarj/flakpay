import React from "react";
import "./toggle.css";

const ToggleSwitch = ({ checked, disabled, onChange }) => {
  return (
    <div>
      <div className="button r" id="button-3">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          disabled={disabled}
          onClick={onChange}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
