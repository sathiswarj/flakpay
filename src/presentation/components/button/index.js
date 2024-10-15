import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

const ButtonComponent = ({ label, onClick, loader }) => {
  const classes = useStyles();
  const [hoverStateEnabled, setHoverStateEnabled] = useState(false);
  return (
    <Button
      className={classes.button}
      onMouseEnter={() => {
        setHoverStateEnabled(true);
      }}
      onMouseLeave={() => setHoverStateEnabled(false)}
      style={{
        fontWeight: "bold",
        padding: "5px",
        paddingLeft: 10,
        paddingRight: 10,
        cursor: "pointer",
        border: "none",
        borderRadius: 7,
        height: 38,
        width: "auto",
        marginLeft: 20,
        textAlign: "center",
        border: "1px solid grey",
        backgroundColor: hoverStateEnabled ? "#AEBDFA" : "#ffffff",
        color: hoverStateEnabled ? "#37447A" : "#37447A",
      }}
      disabled={loader}
      onClick={onClick}
    >
      {loader ? <CircularProgress size={20} /> : label}
    </Button>
  );
};

export default ButtonComponent;
