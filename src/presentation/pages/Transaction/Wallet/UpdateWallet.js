import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CustomInput } from "../../../components/customInput/CustomInput";
import ButtonComponent from "../../../components/button";

const UpdateWalletPopup = ({ clientList, onClickActionWallet, onClose }) => {
  const [updatedClientList, setUpdatedClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedUpdateType, setSelectedUpdateType] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    let temp = [];
    clientList.map((item) => {
      temp.push({
        label: item.name,
        value: item.clientId + ":::" + item.name,
      });
    });
    setUpdatedClientList(temp);
    console.log("data -> ", clientList);
  }, [clientList]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 25,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: 25,
        }}
      >
        <FormControl fullWidth style={{ maxWidth: "250px",  overflow : "scroll" }}>
          <InputLabel>Client</InputLabel>
          <Select
            value={selectedClientId}
            onChange={(e) => {
              setSelectedClientId(e.target.value);
            }}
            label="Client"
          >
            {updatedClientList.map((item) => {
              return <MenuItem style={{display: "block", padding : 5}} value={item.value}>{item.value.split(":::")[1]}</MenuItem>;
            })}
          </Select>
        </FormControl>
        
        <FormControl fullWidth style={{ maxWidth: "250px",  marginLeft: 15,}}>
          <InputLabel>Action</InputLabel>
          <Select
            value={selectedUpdateType}
            onChange={(e) => {
              setSelectedUpdateType(e.target.value);
            }}
            label="Client"
          >
           {[{ value: "CREDIT" }, { value: "DEBIT" }].map((item) => {
              return <MenuItem style={{display: "block", padding : 5}} value={item.value}>{item.value}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <CustomInput
          type="input"
          value={amount}
          onChange={(value) => setAmount(value)}
          placeholder="Enter Amount"
          validator="decimal"
          isMandatory={true}
          error={"Enter valid Amount"}
          inputStyles={{
            width: "250px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            marginLeft: 15,
          }}
        />
        <CustomInput
          type="input"
          value={remarks}
          onChange={(value) => setRemarks(value)}
          placeholder="Enter Remarks"
          validator="text"
          isMandatory={true}
          error={"Enter valid Remarks"}
          inputStyles={{
            width: "250px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            marginLeft: 15,
          }}
        />
      </div>
      <div>
        <ButtonComponent
          label={"Topup Wallet"}
          onClick={() => {
            onClickActionWallet(
              amount,
              selectedClientId.split(":::")[0],
              selectedUpdateType,
              remarks
            );
          }}
        />
      </div>
    </div>
  );
};

export default UpdateWalletPopup;
