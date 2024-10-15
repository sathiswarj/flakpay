import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BasicDateTimePicker({ label, onChange, value, styles }) {
  return (
    <div style={{ marginLeft: 10, width: 300, marginRight: 10, marginBottom : 20 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker label={label} onChange={(event) => onChange(event)} value={value} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
