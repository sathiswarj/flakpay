import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import Slide from "@mui/material/Slide";
import ResizeListener from "../../../utility/ResizeListener";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const DialogComponent = ({ showPopup, onClickCloseDialog, maxWidth, heading, children }) => {
  const { width, height } = ResizeListener();
  return (
    <Dialog
      PaperProps={{
        sx: {
          overflowX: "auto",
          borderRadius: 15,
          width: width * 0.8,
        },
        style: {
          borderRadius: 15,
          width: width * 0.8,
        },
      }}
      maxWidth={maxWidth ?? "md"}
      TransitionComponent={Transition}
      keepMounted
      open={showPopup}
      onClose={onClickCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 15,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          // background: "linear-gradient(to right, #732375, #feb47b)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <div style={{ fontWeight: "bold", color : '#37447A' }}>{heading}</div>
          <CloseIcon onClick={onClickCloseDialog} style={{ cursor: "pointer", color: '#37447A' }} />
        </div>
      </div>
      {children}
    </Dialog>
  );
};

export default DialogComponent;
