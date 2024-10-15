import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

export default function CustomSelectComponenet({ style,label, value, onChange, data,error,disabled}) {
  React.useEffect(() => {
    console.log("data -> ", data);
  }, [data]);
  return (
   
      <FormControl style={{ width: '100%', margin:10, ...style }} error={!!error} >
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}`}
          value={value}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {data?.map((item) => {
            return (
              <MenuItem value={item.label} 
              style={{
                display: "block",
                padding: "5px",
                fontSize: "14px",
                textAlign:"center"
              }}>
                {item.label}
                </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    
  );
}
