import React from "react";
import "./formControl.scss";
const FormControl = ({ label, defaultValue, onChange, onKeyDown }) => {
  return (
    <div className="form-control">
      {label && <label>{label}</label>}
      <input placeholder="Press Enter to save the changes" type="text" defaultValue={defaultValue} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
};

export default FormControl;
