import React from "react";
import TextField from "@mui/material/TextField";

const InputComponent = ({ type, value, onChange, placeholder,style,error }) => {
  return (
    <TextField
      id="outlined-basic"
      label={placeholder}
      variant="outlined"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{marginLeft: 10, marginRight: 10,...style}}
      error={!!error}
      helperText={error}
    />
  );
};

export default InputComponent;


