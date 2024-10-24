import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
 

function DashboardCards({ label, value, backgroundColor, valueColor, icon }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) return;  

    let startValue = 0;
    const duration = 1000;  
    const incrementTime = 100; 
    const totalIncrements = duration / incrementTime; 
    const increment = Math.ceil(value / totalIncrements);  

  
    const countUp = setInterval(() => {
      startValue += increment;
      if (startValue >= value) {
        setDisplayValue(value);
        clearInterval(countUp);
      } else {
        setDisplayValue(startValue);
      }
    }, incrementTime);

    return () => clearInterval(countUp);
  }, [value]); 

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      style={{
        margin: 20,
        backgroundColor,
        borderRadius: 15,
        padding: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 500, fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: "18px" }}>
          {label}
        </span>
        <div className="icon-section" style={{marginTop:10, fontSize:"14px"}}>
        {icon}
        </div>
      </div>
      <div
        className="value"
        style={{
          fontSize: 24,
          color: valueColor,
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          transition: "opacity 0.3s ease-in-out", 
          opacity: displayValue > 0 ? 1 : 0,  
        }}
      >
        {label === "Success Rate" ? (
          displayValue ? `${displayValue.toFixed(2)}%` : ""
        ) : label === "Total Initiated Volume" || label === "Total Success Volume" || label === "Total Failed Volume" ? (
          displayValue ? `₹ ${displayValue}` : ""
        ) : (
          displayValue
        )}
      </div>
    </Grid>
  );
}

export default DashboardCards;
