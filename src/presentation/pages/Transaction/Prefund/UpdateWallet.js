import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CustomInput } from "../../../components/customInput/CustomInput";
import ButtonComponent from "../../../components/button";

const UpdateWalletPopup = ({ clientList, onClickActionWallet, onClose }) => {
  const [updatedClientList, setUpdatedClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedUpdateType, setSelectedUpdateType] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    let temp = [];
    clientList.map((item) => {
      temp.push({
        label: item.clientDetails?.clientName,
        value: item.clientId + ":::" + item.clientDetails?.clientName,
      });
    });
    setUpdatedClientList(temp);
    console.log("data -> ", temp);
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
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
          padding: 25,
        }}
      >
        <div style={{ width: "250px" }}>
          <FormControl fullWidth style={{ maxWidth: "250px" }}>
            <InputLabel>Client</InputLabel>
            <Select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
              }}
              label="Client"
            >
              {updatedClientList.map((item) => {
                return (
                  <option
                    style={{
                      padding: 2,
                      display: "flex",
                      marginLeft: 15,
                      fontSize: 12,
                      marginTop: 5,
                      cursor: "pointer",
                    }}
                    value={item.value}
                  >
                    {item.value.split(":::")[1]}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <FormControl fullWidth style={{ maxWidth: "250px", marginLeft: 15, marginRight: 15 }}>
          <InputLabel>Action</InputLabel>
          <Select
            value={selectedUpdateType}
            onChange={(e) => {
              setSelectedUpdateType(e.target.value);
            }}
            label="Client"
          >
            {[{ value: "CREDIT" }, { value: "DEBIT" }].map((item) => {
              return (
                <option
                  style={{
                    padding: 2,
                    display: "flex",
                    marginLeft: 15,
                    fontSize: 12,
                    marginTop: 5,
                    cursor: "pointer",
                  }}
                  value={item.value}
                >
                  {item.value}
                </option>
              );
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
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            marginLeft: 15,
            marginRight: 15,
          }}
        />
      </div>
      <div>
        <ButtonComponent
          label={"Update Wallet"}
          onClick={() => {
            onClickActionWallet(amount, selectedClientId.split(":::")[0], selectedUpdateType);
          }}
        />
      </div>
    </div>
  );
};

export default UpdateWalletPopup;
