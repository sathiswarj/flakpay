import React, { useEffect, useState } from "react";
import SimpleCard from "../../../components/cards/index";

const PayinTxnDetailsPopup = ({ headers, txnData, onClose }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        overflow: "scroll",
      }}
    >
      {headers?.map((item) => {
        if (item.key !== "Si.No") {
          return <SimpleCard label={item.label} key={item.key} value={txnData[item.key]} width={item.width} type={item.type} scrollable={item.scrollable}/>;
        }
      })}
    </div>
  );
};

export default PayinTxnDetailsPopup;
