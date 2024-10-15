import React, { useEffect, useState } from "react";
import InputComponent from "../../../../components/input";
import PayinCommissionDetails from "./payinCommissionDetails";
import { CustomInput } from "../../../../components/customInput/CustomInput";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CustomSelectComponenet from "../../../../components/CustomDropdown";

const CommonPayin = ({ serviceProvider, setServiceProviderConfig, setEnableNextButton }) => {
  const [notifyUrl, setNotifyUrl] = useState("");

  const [sid, setSid] = useState("");
  const [vpa, setVpa] = useState("");

  const [timeWindow, setTimeWindow] = useState("");
  const [timeUnit, setTimeUnit] = useState("");
  const [timeUnitDropdown, setTimeUnitDropdown] = useState([{ label: "hour" }, { label: "min" }]);
  const [settlementAccName, setSettlementAccName] = useState("");
  const [settlementAccNumber, setSettlementAccNumber] = useState("");
  const [settlementAccIfsc, setSettlementAccIfsc] = useState("");

  const [spCommissionType, setSpCommissionType] = useState("Flat");
  const [spFixedCommissionValue, setSpFixedCommissionValue ]= useState("");
  const [spFixedCommissionUnit, setSpFixedCommissionUnit] = useState("");
  const [spFlatValue, setSpFlatValue] = useState("");
  const [spFlatUnit, setSpFlatUnit] = useState("");
  const [unitDropdown, setUnitDropdown] = useState([{ label: "rupees" }, { label: "percentage" }]);
  const [spSlabValues, setSpSlabValues] = useState([
    { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
  ]);

  const [clientCommissionType, setClientCommissionType] = useState("Flat");
  const [clientFixedCommissionValue, setClientFixedCommissionValue] = useState("");
  const [clientFixedCommissionUnit, setClientFixedCommisionUnit] = useState("");
  const [clientFlatValue, setClientFlatValue] = useState("");
  const [clientFlatUnit, setClientFlatUnit] = useState("");
  const [clientSlabValues, setClientSlabValues] = useState([
    { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
  ]);
  const serviceProviderName = serviceProvider.split(" / ")[0];

  const handleSlabChange = (index, field, commissionValue) => {
    const newSlabValues = [...spSlabValues];
    newSlabValues[index][field] = commissionValue;
    setSpSlabValues(newSlabValues);
  };

  const addSlab = () => {
    setSpSlabValues([
      ...spSlabValues,
      { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
    ]);
  };

  const removeSlab = (index) => {
    setSpSlabValues(spSlabValues.filter((_, i) => i !== index));
  };

  const handleClientSlabChange = (index, field, commissionValue) => {
    const newClientSlabValues = [...clientSlabValues];
    newClientSlabValues[index][field] = commissionValue;
    setClientSlabValues(newClientSlabValues);
  };

  const addClientSlab = () => {
    setClientSlabValues([
      ...clientSlabValues,
      { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
    ]);
  };

  const removeClientSlab = (index) => {
    setClientSlabValues(clientSlabValues.filter((_, i) => i !== index));
  };

  const updateConfig = () => {
    // Service provider details
    let serviceProviderId = serviceProvider.split(" / ")[2];
    let serviceProviderName = serviceProvider.split(" / ")[0];



    // settlement account details
    let accountDetails = {
      settlementCycle:{
        timeWindow:timeWindow,
        timeUnit:timeUnit
      },
      settlementAcc: [
        {
          settlementAccName,
          settlementAccNumber,
          settlementAccIfsc,
        },
      ],
    };

    // service provider commission information

    let serviceProviderCommissionObject = {};

    if (spCommissionType === "Flat") {
      serviceProviderCommissionObject = {
        fixedCommissionValue:spFixedCommissionValue,
        fixedCommissionUnit:spFixedCommissionUnit,
        commissionType: "flat",
        flatCommission: { commissionValue: spFlatValue, commissionUnit: spFlatUnit },
      };
    }
    if (spCommissionType === "Slab") {
      serviceProviderCommissionObject = {
        commissionType: "slab",
        fixedCommissionValue:spFixedCommissionValue,
        fixedCommissionUnit:spFixedCommissionUnit,
        slabs: spSlabValues.map(
          ({ slabFloorValue, slabCeilValue, commissionValue, commissionUnit }) => ({
            slabFloorValue,
            slabCeilValue,
            commissionValue,
            commissionUnit,
          })
        ),
      };
    }

    let clientCommissionObject = {};

    if (clientCommissionType === "Flat") {
      clientCommissionObject = {
        fixedCommissionValue:clientFixedCommissionValue,
        fixedCommissionUnit:clientFixedCommissionUnit,
        commissionType: "flat",
        flatCommission: { commissionValue: clientFlatValue, commissionUnit: clientFlatUnit },
      };
    }
    if (clientCommissionType === "Slab") {
      clientCommissionObject = {
        fixedCommissionValue:clientFixedCommissionValue,
        fixedCommissionUnit:clientFixedCommissionUnit,
        commissionType: "slab",
        slabs: clientSlabValues.map(
          ({ slabFloorValue, slabCeilValue, commissionValue, commissionUnit }) => ({
            slabFloorValue,
            slabCeilValue,
            commissionValue,
            commissionUnit,
          })
        ),
      };
    }

    const config = {
      serviceProviderId: serviceProviderId,
      serviceProviderName: serviceProviderName,
      credentials : {
        sid,
        vpa
      },
      webhookDetails: {
        notifyUrl,
      },
      type: "PAYIN",
      accountDetails: accountDetails,
      commissionDetails: {
        serviceProviderCommission: serviceProviderCommissionObject,
        clientCommission: clientCommissionObject,
      },
    };

    setServiceProviderConfig(config);
  };

  useEffect(() => {
    updateConfig();
  }, [
    notifyUrl,
    settlementAccName,
    settlementAccNumber,
    settlementAccIfsc,
    spCommissionType,
    spFlatValue,
    spFlatUnit,
    spSlabValues,
    clientCommissionType,
    clientFlatValue,
    clientFlatUnit,
    clientSlabValues,
    spFixedCommissionValue,
    spFixedCommissionUnit,
    clientFixedCommissionValue,
    clientFixedCommissionUnit,
    sid,
    vpa
  ]);

  const resetWebhookDetails = () => {
    setNotifyUrl("");
  };

  const resetCredentailsDetails = () =>{
    setSid("");
    setVpa("")
  }
  
  const resetAccountDetails = () => {
    setSettlementAccName("");
    setSettlementAccNumber("");
    setSettlementAccIfsc("");
  };
  
  const resetSpCommissionDetails = () => {
    setSpCommissionType("Flat");
    setSpFixedCommissionValue("");
    setSpFixedCommissionUnit("");
    setSpFlatValue("");
    setSpFlatUnit("");
    setSpSlabValues([
      { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
    ]);
  };
  
  const resetClientCommissionDetails = () => {
    setClientCommissionType("Flat");
    setClientFixedCommissionValue("");
    setClientFixedCommisionUnit("");
    setClientFlatValue("");
    setClientFlatUnit("");
    setClientSlabValues([
      { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
    ]);
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: 15 }}>
      <div style={{ marginBottom: 20 }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4>Notify Url:</h4>
          <RestartAltIcon
            onClick={resetWebhookDetails}
            style={{
              marginLeft: 10,
              cursor: 'pointer',
              color: '#007bff',
              fontSize: 20,
            }}
          />
        </div>
        <CustomInput
          type="input"
          value={notifyUrl}
          onChange={(value) => setNotifyUrl(value)}
          placeholder="Notify Url"
          validator="logoUrl"
          isMandatory={true}
          error={"Enter valid Url"}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
      </div>
      {serviceProviderName === 'NPST-PAYIN' && (
        <div>
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>Credentials:
      <RestartAltIcon
            onClick={resetCredentailsDetails}
            style={{
              marginLeft: 10,
              cursor: 'pointer',
              color: '#007bff',
              fontSize: 20,
            }}
          />
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
      <CustomInput
        type="input"
        value={sid}
        onChange={(value) => setSid(value)}
        placeholder="Enter Value"
        validator="text"
        isMandatory={true}
        error={"Enter valid SID"}
        inputStyles={{
          width: '200px',
          padding: '10px',
          borderRadius: '4px',
          margin :"10px"
        }}
      />
      <CustomInput
        type="input"
        value={vpa}
        onChange={(value) => setVpa(value)}
        placeholder="Enter Value"
        validator="text"
        isMandatory={true}
        error={"Enter valid VPA"}
        inputStyles={{
          width: '200px',
          padding: '10px',
          borderRadius: '4px',
          margin :"10px"
        }}
      />
      </div>
      </div>
      )}
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>Settlement Cycle Details:
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
      <CustomInput
        type="input"
        value={timeWindow}
        onChange={(value) => setTimeWindow(value)}
        placeholder="Enter Value"
        validator="number"
        isMandatory={true}
        error={"Enter valid Time"}
        inputStyles={{
          width: "100px",
          padding: "10px",
          borderRadius: "4px",
          margin: "10px",
        }}
      />
       <CustomSelectComponenet
        value={timeUnit}
        onChange={(event) => {
          setTimeUnit(event.target.value);
        }}
        data={timeUnitDropdown}
        label="Unit"
        style={{ width: 100, marginTop: 10 }}
      />
      </div>
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>Settlement Account Details:
      <RestartAltIcon
          onClick={resetAccountDetails}
          style={{
            marginLeft: 10,
            cursor: 'pointer',
            color: '#007bff',
            fontSize: 20,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
     
        <CustomInput
          type="input"
          value={settlementAccName}
          onChange={(value) => setSettlementAccName(value)}
          placeholder="Account Name"
          validator="name"
          isMandatory={true}
          error={"Enter valid Account Name"}
          inputStyles={{
            width: '200px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
   
        <CustomInput
          type="input"
          value={settlementAccNumber}
          onChange={(value) => setSettlementAccNumber(value)}
          placeholder="Account No"
          validator="accountNumber"
          isMandatory={true}
          error={"Enter valid Account Number"}
          inputStyles={{
            width: '200px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
      
         <CustomInput
          type="input"
          value={settlementAccIfsc}
          onChange={(value) => setSettlementAccIfsc(value)}
          placeholder="IFSC"
          validator="ifscCode"
          isMandatory={true}
          error={"Enter valid IFSC"}
          inputStyles={{
            width: '200px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
      </div>
      <div style={{ fontWeight: "bolder", marginBottom: 20 }}>Commission Details:</div>
      <PayinCommissionDetails
        title="1. Service Provider"
        commissionType={spCommissionType}
        setCommissionType={setSpCommissionType}
        fixedCommissionValue = {spFixedCommissionValue}
        setFixedCommissionValue ={setSpFixedCommissionValue}
        fixedCommissionUnit ={spFixedCommissionUnit}
        setFixedCommissionUnit ={setSpFixedCommissionUnit}
        flatValue={spFlatValue}
        setFlatValue={setSpFlatValue}
        flatUnit={spFlatUnit}
        setFlatUnit={setSpFlatUnit}
        slabValues={spSlabValues}
        handleSlabChange={handleSlabChange}
        addSlab={addSlab}
        removeSlab={removeSlab}
        unitDropdown={unitDropdown}
        setUnitDropdown={setUnitDropdown}
        icon={
          <RestartAltIcon
            onClick={resetSpCommissionDetails}
            style={{
              cursor: "pointer",
              color: "#007bff",
              fontSize: 20,
            }}
          />
        }
      />
     
        <div  style={{marginTop:20}}>
        <PayinCommissionDetails
          title="2. Client"
          commissionType={clientCommissionType}
          setCommissionType={setClientCommissionType}
          fixedCommissionValue = {clientFixedCommissionValue}
          setFixedCommissionValue ={setClientFixedCommissionValue}
          fixedCommissionUnit ={clientFixedCommissionUnit}
          setFixedCommissionUnit ={setClientFixedCommisionUnit}
          flatValue={clientFlatValue}
          setFlatValue={setClientFlatValue}
          flatUnit={clientFlatUnit}
          setFlatUnit={setClientFlatUnit}
          slabValues={clientSlabValues}
          handleSlabChange={handleClientSlabChange}
          addSlab={addClientSlab}
          removeSlab={removeClientSlab}
          unitDropdown={unitDropdown}
          setUnitDropdown={setUnitDropdown}
          icon={
            <RestartAltIcon
              onClick={resetClientCommissionDetails}
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontSize: 20,
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default CommonPayin;
