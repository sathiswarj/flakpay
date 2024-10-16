import React, { useState } from "react";

const TableViewMoreButton = ({ rowItem, onClickViewMoreButton }) => {
  const [hoverStateEnabled, setHoverStateEnabled] = useState(false);

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 5,
        border: "1px solid grey",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: hoverStateEnabled ? "#135E1A" : "#ffffff",
        color: hoverStateEnabled ? "#FFFFFF" : "#37447A",
      }}
      onMouseEnter={() => {
        setHoverStateEnabled(true);
      }}
      onMouseLeave={() => setHoverStateEnabled(false)}
      onClick={() => onClickViewMoreButton(rowItem)}
    >
      View More
    </div>
  );
};

export default TableViewMoreButton;
