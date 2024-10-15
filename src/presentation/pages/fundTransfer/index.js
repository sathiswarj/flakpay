import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { CustomInput } from "../../components/customInput/CustomInput";
import CustomSelectComponenet from "../../components/CustomDropdown";
import ButtonComponent from "../../components/button";
import axios from "axios";

const FundTransfer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [transferMode, setTransferMode] = useState("");
  const [transferModeDropdown, setTransferModeDropdown] = useState([
    { label: "IMPS" },
    { label: "NEFT" },
    { label: "RTGS" },
  ]);

  const onClickPayNow = async () => {
    setLoading(true);
    const orderId = Math.random().toString(36).toUpperCase();
    const industryType = "E-COM";
    const payload = {
      orderId,
      amount : parseFloat(amount),
      transferMode,
      beneDetails: {
        beneBankName: bankName,
        beneAccountNo: accountNo,
        beneIfsc: ifsc,
        beneName: beneficiaryName,
        beneEmail: email,
        benePhone: mobile,
      },
      industryType,
    };
    console.log("payload -> ", payload);
    try {
      const response = await axios.post(
        "https://api.digibizpay.in/fundsweep-payout-iserveu-svc/api/v1/external/payout/ft",
        payload,
        {
          headers: {
            "client-id": "2cbfdf1b-8a11-43a1-9d16-1b2a39ebbf4c",
            "secret-key": "986c6185-e39e-4599-9241-26a27f6c47b6",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Transfer successful!", { variant: "success" });
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message || "An error occurred", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h2>Fund Transfer</h2>
      <div
        style={{
          margin: 25,
          boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
          height: "90%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: 25,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80%",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <CustomInput
              type="input"
              value={beneficiaryName}
              onChange={(value) => setBeneficiaryName(value)}
              placeholder="Beneficiary name"
              validator="name"
              isMandatory={true}
              error={"Enter valid Name"}
              inputStyles={{
                width: "280px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

            <CustomInput
              type="input"
              value={accountNo}
              onChange={(value) => setAccountNo(value)}
              placeholder="Beneficiary Account No"
              validator="accountNumber"
              isMandatory={true}
              error={"Enter valid Account Number"}
              inputStyles={{
                width: "280px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

            <CustomInput
              type="input"
              value={ifsc}
              onChange={(value) => setIfsc(value)}
              placeholder=" Beneficiary IFSC"
              validator="ifscCode"
              isMandatory={true}
              error={"Enter valid IFSC"}
              inputStyles={{
                width: "280px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

            <CustomInput
              type="input"
              value={bankName}
              onChange={(value) => setBankName(value)}
              placeholder="Beneficiary Bank name"
              validator="text"
              isMandatory={true}
              error={"Enter valid Name"}
              inputStyles={{
                width: "280px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

            <CustomInput
              type="input"
              value={mobile}
              onChange={(value) => setMobile(value)}
              placeholder=" Beneficiary Mobile"
              validator="mobile"
              isMandatory={true}
              error={"Enter valid Mobile No."}
              inputStyles={{
                width: "280px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

            <CustomInput
              type="input"
              value={email}
              onChange={(value) => setEmail(value)}
              placeholder="Beneficiary Email"
              validator="email"
              isMandatory={true}
              error={"Enter valid email"}
              inputStyles={{
                width: "280px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

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
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
            />

            <CustomSelectComponenet
              value={transferMode}
              onChange={(event) => {
                setTransferMode(event.target.value);
              }}
              data={transferModeDropdown}
              label="Transfer Mode"
              style={{ width: "300px", marginTop: 10 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <ButtonComponent loader={loading} label={"Pay Now"} onClick={onClickPayNow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;
