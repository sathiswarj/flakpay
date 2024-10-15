import React, { useState, useEffect } from "react";

const SimpleCard = ({ label, key, value, width, style, type, isEditing, onChange, scrollable }) => {
  const [editedValue, setEditedValue] = useState(value);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const isValidInput = (label, value) => {
    switch (label.toLowerCase()) {
      case "mobile":
        return value.length <= 10 && /^\d*$/.test(value);

      case "gst details":
        if (value === "") return true;
        if (value.length <= 2 && /^[0-9]+$/.test(value)) {
          return true;
        } else if (value.length > 2 && value.length <= 7 && /^[A-Z]+$/.test(value.slice(2))) {
          return true;
        } else if (value.length > 7 && value.length <= 11 && /^[0-9]+$/.test(value.slice(7))) {
          return true;
        } else if (value.length === 12 && /^[A-Z]+$/.test(value.slice(11))) {
          return true;
        } else if (value.length === 13 && /^[0-9]+$/.test(value.slice(12))) {
          return true;
        } else if (value.length === 14 && /^[A-Z]+$/.test(value.slice(13))) {
          return true;
        } else if (value.length === 15 && /^[A-Z0-9]+$/.test(value.slice(14))) {
          return true;
        }
        return false;

      case "pan details":
        if (value === "") return true;
        if (value.length <= 5 && /^[A-Z]+$/.test(value)) {
          return true;
        } else if (value.length > 5 && value.length <= 9 && /^[0-9]+$/.test(value.slice(5))) {
          return true;
        } else if (value.length === 10 && /^[A-Z]+$/.test(value.slice(9))) {
          return true;
        }
        return false;

      case "email":
        if (value === "") return true;
        if (/^[0-9a-zA-Z.@]+$/.test(value)) {
          return true;
        }
        return false;
      default:
        return true;
    }
  };

  const handleInputChange = (e) => {
    let newValue = e.target.value;

    if (label.toLowerCase() === "email") {
      newValue = newValue.toLowerCase();
    } else if (
      label.toLowerCase() === "company name" ||
      label.toLowerCase() === "address" ||
      label.toLowerCase() === "website url"
    ) {
    } else {
      newValue = newValue.toUpperCase();
    }

    if (isValidInput(label, newValue)) {
      setEditedValue(newValue);
      setError(null);
      onChange(newValue);
    } else {
      setError(getValidationMessage(label));
    }
  };

  const getValidationMessage = (label) => {
    switch (label.toLowerCase()) {
      case "mobile":
        return "Mobile number must be 10 digits";
      case "gst details":
        return "Invalid GST number format";
      case "pan details":
        return "Invalid pan number format";
      case "email":
        return "Invalid email address format";

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        height: 60,
        minWidth: 100,
        width: width ?? 220,
        border: "1px solid lightgrey",
        borderRadius: 10,
        padding: 20,
        margin: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: scrollable ? "scroll" : "hidden",
        ...style,
      }}
    >
      <div style={{ color: "grey", marginBottom: 10 }}>{label}</div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedValue}
            onChange={handleInputChange}
            style={{ fontSize: 20, outline: "none", border: "none", color: "#513f5c" }}
          />
          {error && <div style={{ color: "red", fontSize: 12 }}>{error}</div>}
        </>
      ) : (
        <div style={{ color: "#513f5c", fontSize: 20 }}>
          {type === "amount" ? `₹ ${editedValue}` : editedValue}
        </div>
      )}
    </div>
  );
};

export default SimpleCard;
