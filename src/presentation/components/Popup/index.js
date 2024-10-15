import { Popover } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React, { useState } from "react";
import ButtonComponent from "../button";

const FilterPopup = ({ searchFiledPlaceHolder, onClickSearch, onClickClear }) => {
  const [searchField, setSearchFiled] = useState("");

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          &nbsp; &nbsp;{" "}
          <button
            style={{
              fontWeight: "bold",
              textDecoration: "none",
              padding: "5px",
              color: "white",
              background: "#D07FEE",
              cursor: "pointer",
              border: "none",
              outline: "none",
              borderRadius: 7,
              height: 38,
              width: 100,
              marginLeft: 20,
              textAlign: "center",
            }}
            {...bindTrigger(popupState)}
          >
            Filter
          </button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-start", margin: 20 }}>
              &nbsp; &nbsp;
              <span style={{ marginTop: 5 }}>
                <input
                  value={searchField}
                  onChange={(e) => setSearchFiled(e.target.value)}
                  style={{
                    borderRadius: 3,
                    border: "1px solid grey",
                    margin: 1,
                    outline: "none",
                    padding: 10,
                  }}
                  placeholder={searchFiledPlaceHolder}
                />
                <ButtonComponent
                  label={"Search"}
                  onClick={() => {
                    onClickSearch(searchField);
                  }}
                />
                <ButtonComponent
                  label={"Clear"}
                  onClick={() => {
                    onClickSearch();
                  }}
                />
              </span>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default FilterPopup;
