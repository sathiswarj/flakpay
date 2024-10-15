import React from "react";
import { getRandomDarkColor } from "../../../utility/colors";

const Card = ({ label, value }) => {
  return (
    <div
      style={{
        height: 60,
        minWidth : 200,
        // boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
        border : "1px solid lightgrey",
        borderRadius : 10,
        padding: 20,
        margin: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ color: "grey", marginBottom: 10 }}>{label}</div>
      <div style={{ color: "#513f5c", fontSize : 20 }}>{value}</div>
    </div>
  );
};

export default Card;
