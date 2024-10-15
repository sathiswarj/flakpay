import React, { useEffect, useState } from "react";
import SimpleCard from "../../../components/cards/index";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { FormControl, InputLabel, Select } from "@mui/material";
import ButtonComponent from "../../../components/button";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost";
import { enqueueSnackbar } from "notistack";

const AddPrefundRequestModal = ({ headers, txnData, onClose }) => {
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [utr, setUtr] = useState("");
  const [txnMode, setTxnMode] = useState("");

  const onClickRequestPrefund = () => {
    ApiRequestPost.createPrefundRequest({
      remitterAccNumber: accountNo,
      remitterBankName: bankName,
      utr: utr,
      remitterBankIfscCode: ifsc,
      txnMode: txnMode,
      amount: amount,
    })
      .then((res) => {
        if (res.statusCode == 200) {
          enqueueSnackbar("Prefund Request Created Successfully", {
            variant: "success",
          });
          onClose();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          alignItems: "center",
          flexDirection: "column",
          marginBottom : 20
        }}
      >
        <text style={{ marginBottom: 10, fontWeight: "bold" }}>Prefund Account Details</text>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 10,
            borderRadius: 15,
            border: "1px solid grey",
          }}
        >
          Account Name : Neodigibiz solutions Private Limited <br />
          Bank Name : ICICI Bank <br />
          A/C No. : 614905021364 <br />
          A/C IFSC : ICIC0006149
          <br />
        </div>
        <text style={{ marginTop: 10 }}>Kindly transfer your prefund amount to the above A/C and update the txn details below to raise prefund request.</text>
      </div>
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
          value={amount}
          onChange={(value) => setAmount(value)}
          placeholder="Enter Prefund txn Amount"
          validator="decimal"
          isMandatory={true}
          error={"Enter valid Amount"}
          inputStyles={{
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            margin: 15,
          }}
        />
        <CustomInput
          type="input"
          value={accountNo}
          onChange={(value) => setAccountNo(value)}
          placeholder="Enter Debitter Acc No"
          validator="number"
          isMandatory={true}
          error={"Enter valid Account Number"}
          inputStyles={{
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            margin: 15,
          }}
        />
        <CustomInput
          type="input"
          value={bankName}
          onChange={(value) => setBankName(value)}
          placeholder="Enter Debitter Bank Name"
          validator="text"
          isMandatory={true}
          error={"Enter valid Bank Name"}
          inputStyles={{
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            margin: 15,
          }}
        />
        <CustomInput
          type="input"
          value={ifsc}
          onChange={(value) => setIfsc(value)}
          placeholder="Enter Debitter IFSC"
          validator="ifscCode"
          isMandatory={true}
          error={"Enter valid IFSC"}
          inputStyles={{
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            margin: 15,
          }}
        />
        <CustomInput
          type="input"
          value={utr}
          onChange={(value) => setUtr(value)}
          placeholder="Enter Prefund Txn Utr"
          validator="text"
          isMandatory={true}
          error={"Enter valid Utr"}
          inputStyles={{
            width: "280px",
            height: 35,
            padding: "10px",
            borderRadius: "4px",
            margin: 15,
          }}
        />
        <div style={{ width: "300px", margin: 15 }}>
          <FormControl fullWidth style={{ maxWidth: "300px" }}>
            <InputLabel>Txn Mode</InputLabel>
            <Select
              value={txnMode}
              onChange={(e) => {
                setTxnMode(e.target.value);
              }}
              label="Txn Mode"
            >
              {[{ value: "IMPS" }, { value: "RTGS" }, { value: "NEFT" }].map((item) => {
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
        </div>
      </div>
      <div style={{ margin: 25 }}>
        <ButtonComponent
          label={"Request Prefund"}
          onClick={() => {
            onClickRequestPrefund();
          }}
        />
      </div>
    </div>
  );
};

export default AddPrefundRequestModal;
