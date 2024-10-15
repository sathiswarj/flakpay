import React, { useEffect, useState } from "react";
import "../dashBoard.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-daterange-picker/dist/css/react-calendar.css";

function DashboardCards({ label, value, backgroundColor, valueColor, highlightColor }) {
  return (
    <div
    className="container1"
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 20,
        backgroundColor: backgroundColor,
        borderRadius : 15,
        padding : 15,
        minWidth: "350px"  
      }}
    >
      <div style={{marginBottom : 30}}>{label}</div>
      <div style={{fontSize : 25, color : valueColor}}>{value}</div>
    </div>
  );
}

export default DashboardCards;
