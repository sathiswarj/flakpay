import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    transition: "all 0.3s ease", // Smooth transition for hover, click effects
  },
});

const ButtonComponent = ({ label, onClick, loader }) => {
  const classes = useStyles();
  const [hoverStateEnabled, setHoverStateEnabled] = useState(false);
  const [clickStateEnabled, setClickStateEnabled] = useState(false);

  return (
    <Button
      className={classes.button}
      onMouseEnter={() => setHoverStateEnabled(true)}
      onMouseLeave={() => {
        setHoverStateEnabled(false);
        setClickStateEnabled(false);
      }}
      onMouseDown={() => setClickStateEnabled(true)}
      onMouseUp={() => setClickStateEnabled(false)}
      style={{
        fontWeight: "bold",
        padding: "5px",
        paddingLeft: 10,
        paddingRight: 10,
        cursor: "pointer",
        border: "none",
        borderRadius: clickStateEnabled ? 15 : 5, // Increase border radius on click
        height: 38,
        width: "auto", // Increase width slightly on click
        marginLeft: 20,
        textAlign: "center",
        border: "1px solid green",
        backgroundColor: hoverStateEnabled ? "#1E9A75" : "#64C466",
        color: hoverStateEnabled ? "white" : "black",
        boxShadow: clickStateEnabled
          ? "0 0 10px rgba(33, 172, 131, 0.8)" // Glowing effect on click
          : "none",
        transform: clickStateEnabled ? "scale(1.5)" : "scale(1)", // Slight scale increase on click
        transition: "all 0.3s ease", // Smooth transitions for all changes
      }}
      disabled={loader}
      onClick={onClick}
    >
      {loader ? <CircularProgress size={20} /> : label}
    </Button>
  );
};

export default ButtonComponent;
