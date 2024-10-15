import React, { useEffect, useState } from "react";
import { CustomInput } from "../../../components/customInput/CustomInput";
import ButtonComponent from "../../../components/button";

const RejectReasonModal = ({ onClickRejectRequestPrefund }) => {
  const [reason, setReason] = useState("");

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "scroll",
          justifyContent: "center",
        }}
      >
        <CustomInput
          type="input"
          value={reason}
          onChange={(value) => setReason(value)}
          placeholder="Enter Reason to Reject"
          validator="text"
          isMandatory={true}
          error={"Enter valid Reason"}
          inputStyles={{
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            margin: 15,
          }}
        />
      </div>
      <div style={{ margin: 25 }}>
        <ButtonComponent
          label={"Reject Prefund Request"}
          onClick={() => {
            onClickRejectRequestPrefund(reason);
          }}
        />
      </div>
    </div>
  );
};

export default RejectReasonModal;
