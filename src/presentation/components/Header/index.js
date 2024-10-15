import { Button } from "@mui/material";
import React from "react";
import ButtonComponent from "../button";

const Header = ({
  heading,
  showDownloadButton,
  onClickDownloadButton,
  showAddButton,
  addButtonText,
  onClickAddButton,
  showFilterButton,
  onClickFilterButton,
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 25,
      }}
    >
      <div style={{ fontWeight: "bold" }}>{heading}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>{children}</div>
        {showAddButton && <ButtonComponent label={addButtonText} onClick={onClickAddButton} />}
        {showFilterButton && <ButtonComponent label="Filter" onClick={onClickFilterButton} />}
        {showDownloadButton && <ButtonComponent label="Download" onClick={onClickDownloadButton} />}
      </div>
    </div>
  );
};

export default Header;
