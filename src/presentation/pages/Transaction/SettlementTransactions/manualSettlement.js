import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import InputComponent from "../../../components/input";
import CustomSelectComponent from "../../../components/CustomDropdown/index";
import BasicDateTimePicker from "../../../components/DateTimePicker/dateTimePIcker";
import ButtonComponent from "../../../components/button";
import { connect } from "react-redux";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost";
import { enqueueSnackbar } from "notistack";
import { CustomInput } from "../../../components/customInput/CustomInput";

const AddManualSettlement = ({ clientList, serviceProviderList }) => {
  const navigate = useNavigate();

  const [settlementFromDateTime, setSettlementFromDateTIme] = useState("");
  const [settlementToDateTime, setSettlementToDateTIme] = useState("");
  const [totalTxnCount, setTotalTxnCount] = useState("");
  const [totalSuccessVolume, setTotalSuccessVolume] = useState("");
  const [totalSettlementVolume, setTotalSettlementVolume] = useState("");
  const [totalCommissionVolume, setTotalCommissionVolume] = useState("");
  const [clientListDropdown, setClientListDropdown] = useState([]);
  const [serviceProviderListDropdown, setServiceProviderListDropdown] = useState([]);
  const [transferModeDropdown, setTransferModeDropDown] = useState([
    { label: "IMPS" },
    { label: "NEFT" },
    { label: "RTGS" },
  ]);
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [serviceProviderName, setServiceProviderName] = useState("");
  const [serviceProviderId, setServiceProviderId] = useState("");
  const [transferMode, setTransferMode] = useState("");
  const [settlementAccountName, setSettlementAccountName] = useState("");
  const [settlementAccountNo, setSettlementAccountNo] = useState("");
  const [settlementAccountIfsc, setSettlementAccountIfsc] = useState("");
  const [utr, setUtr] = useState("");

  const [loading, setLoading] = useState(false);

  const onClickCreateSettlement = () => {
    setLoading(true);
    ApiRequestPost.createManualSettlementRecord({
      settlementFromDateTime,
      settlementToDateTime,
      totalTxnCount,
      totalSuccessVolume,
      totalSettlementVolume,
      totalCommissionVolume,
      clientName,
      clientId,
      serviceProviderName,
      serviceProviderId,
      transferMode,
      settlementAccountName,
      settlementAccountNo,
      settlementAccountIfsc,
      utr,
    })
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Manual Settlemetn Record Created Successfully", {
            variant: "success",
          });
          clearForm();
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearForm = () => {
    setSettlementFromDateTIme("");
    setSettlementToDateTIme("");
    setTotalTxnCount("");
    setTotalSuccessVolume("");
    setTotalSettlementVolume("");
    setTotalCommissionVolume("");
    setClientListDropdown("");
    setServiceProviderListDropdown("");
    setTransferModeDropDown("");
    setClientName("");
    setClientId("");
    setServiceProviderName("");
    setServiceProviderId("");
    setTransferMode("");
    setSettlementAccountName("");
    setSettlementAccountNo("");
    setSettlementAccountIfsc("");
    setUtr("");
  };

  useEffect(() => {
    let temp = [];

    if (clientList.length > 0) {
      clientList?.map((item) => {
        temp.push({ label: item.companyName, id: item.clientId });
      });
    }
    console.log("check -> ", temp);
    setClientListDropdown(temp);
  }, [clientList]);

  useEffect(() => {
    let temp = [];

    if (serviceProviderList.length > 0) {
      serviceProviderList?.map((item) => {
        temp.push({ label: item.serviceProviderName, id: item.serviceProviderId });
      });
    }
    console.log("check -> ", temp);
    setServiceProviderListDropdown(temp);
  }, [serviceProviderList]);

  const getClientId = (name) => {
    const client = clientListDropdown?.filter((item) => item.label === name);
    console.log("client name -> ", client[0]?.id);
    setClientId(client[0]?.id);
  };

  const getServiceProviderId = (name) => {
    const serviceProvider = serviceProviderListDropdown?.filter((item) => item.label === name);
    console.log("serviceProvider name -> ", serviceProvider[0]?.id);
    setServiceProviderId(serviceProvider[0]?.id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex" }}>
        <IconButton
          onClick={() => navigate("/SettlementTransaction")}
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ marginRight: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <h2>Manual Settlement</h2>
      </div>

      <div
        style={{
          margin: 25,
          boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            margin: 25,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <BasicDateTimePicker
            label={"Settlement From DateTime"}
            // value={settlementFromDateTime}
            onChange={(event) => {
              setSettlementFromDateTIme(new Date(event));
            }}
          />
          <BasicDateTimePicker
            label={"Settlement To DateTime"}
            // value={settlementToDateTime}
            onChange={(event) => {
              setSettlementToDateTIme(new Date(event));
            }}
          />
          {/* <InputComponent
            type="text"
            value={totalTxnCount}
            onChange={(value) => setTotalTxnCount(value)}
            placeholder="Total Txn Count"
            style={{ marginBottom: 20, marginTop: 10, width: 300 }}
          /> */}
          <CustomInput
            type="input"
            value={totalTxnCount}
            onChange={(value) => setTotalTxnCount(value)}
            placeholder="Total Txn Count"
            validator="number"
            isMandatory={true}
            error={"Enter valid Count"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
          <CustomInput
            type="input"
            value={totalSuccessVolume}
            onChange={(value) => setTotalSuccessVolume(value)}
            placeholder="Total Success Amount"
            validator="amount"
            isMandatory={true}
            error={"Enter valid Amount"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
      
          <CustomInput
            type="input"
            value={totalSettlementVolume}
            onChange={(value) => setTotalSettlementVolume(value)}
            placeholder="Total Settlement Amount"
            validator="amount"
            isMandatory={true}
            error={"Enter valid Amount"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
     
           <CustomInput
            type="input"
            value={totalCommissionVolume}
            onChange={(value) => setTotalCommissionVolume(value)}
            placeholder="Total Commission Amount"
            validator="amount"
            isMandatory={true}
            error={"Enter valid Amount"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
          <CustomSelectComponent
            value={clientName}
            onChange={(event) => {
              setClientName(event.target.value);
              getClientId(event.target.value);
            }}
            data={clientListDropdown}
            label="Client Name"
            style={{ marginBottom: 20, marginTop: 10, width: 300 }}
          />
          <CustomSelectComponent
            value={serviceProviderName}
            onChange={(event) => {
              setServiceProviderName(event.target.value);
              getServiceProviderId(event.target.value);
            }}
            data={serviceProviderListDropdown}
            label="Service Provider Name"
            style={{ marginBottom: 20, marginTop: 10, width: 300 }}
          />
          <CustomSelectComponent
            value={transferMode}
            onChange={(event) => {
              setTransferMode(event.target.value);
            }}
            data={transferModeDropdown}
            label="Transfer Mode"
            style={{ marginBottom: 20, marginTop: 10, width: 300 }}
          />
      
           <CustomInput
            type="input"
            value={settlementAccountName}
            onChange={(value) => setSettlementAccountName(value)}
            placeholder="Settlement Account Name"
            validator="name"
            isMandatory={true}
            error={"Enter valid Account Name"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
     
          <CustomInput
            type="input"
            value={settlementAccountNo}
            onChange={(value) => setSettlementAccountNo(value)}
            placeholder="Settlement Account No"
            validator="accountNumber"
            isMandatory={true}
            error={"Enter valid Account Number"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
       
           <CustomInput
            type="input"
            value={settlementAccountIfsc}
            onChange={(value) => setSettlementAccountIfsc(value)}
            placeholder="Settlement Account IFSC"
            validator="ifscCode"
            isMandatory={true}
            error={"Enter valid Account IFSC"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
  
           <CustomInput
            type="input"
            value={utr}
            onChange={(value) => setUtr(value)}
            placeholder="UTR"
            validator="text"
            isMandatory={true}
            error={"Enter valid UTR"}
            inputStyles={{
              width:"280px",
              height:"34px",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{marginBottom:20}}>
          <ButtonComponent
            label={"Manual Settlement"}
            onClick={onClickCreateSettlement}
            loader={loading}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    clientList: state.clientReducer.clientList,
    serviceProviderList: state.clientReducer.serviceProviderList,
  };
};

export default connect(mapStateToProps)(AddManualSettlement);
