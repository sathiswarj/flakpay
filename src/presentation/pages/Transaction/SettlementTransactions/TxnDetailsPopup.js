import React, { useEffect, useState } from "react";

const PayinTxnDetailsPopup = ({ headers, txnData, onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
        {headers?.map((item) => {
          if (item.key !== "Si.No") {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px",
                  borderBottom: "1px solid lightgray",
                  marginBottom: "10px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{item.label}</div>
                <div>{txnData[item.key]}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PayinTxnDetailsPopup;
