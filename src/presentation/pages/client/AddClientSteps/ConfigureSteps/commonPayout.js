import React, { useEffect, useState } from "react";
import InputComponent from "../../../../components/input";
import PayinCommissionDetails from "./payinCommissionDetails";
import { CustomInput } from "../../../../components/customInput/CustomInput";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CustomSelectComponenet from "../../../../components/CustomDropdown";

const CommonPayout = ({ serviceProvider, setServiceProviderConfig, setEnableNextButton }) => {
  const serviceProviderName = serviceProvider.split(" / ")[0];
  const [notifyUrl, setNotifyUrl] = useState("");

  const [sid, setSid] = useState("");
  const [vpa, setVpa] = useState("");

  const [debitorAccName, setDebitorAccName] = useState("");
  const [debitorAccNumber, setDebitorAccNumber] = useState("");
  const [debitorAccIfsc, setDebitorAccIfsc] = useState("");

  const [remitterAccName, setRemitterAccName] = useState("");
  const [remitterAccNumber, setRemitterAccNumber] = useState("");
  const [remitterAccIfsc, setRemitterAccIfsc] = useState("");

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

  const [prefundCommissionType, setPrefundCommissionType] = useState("Flat");
  const [prefundFixedCommissionValue, setPrefundFixedCommissionValue] = useState("");
  const [prefundFixedCommissionUnit, setPrefundFixedCommisionUnit] = useState("");
  const [prefundFlatValue, setPrefundFlatValue] = useState("");
  const [prefundFlatUnit, setPrefundFlatUnit] = useState("");
  const [prefundSlabValues, setPrefundSlabValues] = useState([
    { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
  ]);

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

  
  const handlePrefundSlabChange = (index, field, commissionValue) => {
    const newClientSlabValues = [...prefundSlabValues];
    newClientSlabValues[index][field] = commissionValue;
    setPrefundSlabValues(newClientSlabValues);
  };

  const addPrefundSlab = () => {
    setPrefundSlabValues([
      ...prefundSlabValues,
      { slabFloorValue: "", slabCeilValue: "", commissionValue: "", commissionUnit: "" },
    ]);
  };

  const removePrefundSlab = (index) => {
    setPrefundSlabValues(prefundSlabValues.filter((_, i) => i !== index));
  };

  const updateConfig = () => {
    // Service provider details
    let serviceProviderId = serviceProvider.split(" / ")[2];
    let serviceProviderName = serviceProvider.split(" / ")[0];



    // settlement account details
    let accountDetails = {
      debitorAcc: [
        {
          debitorAccName,
          debitorAccNumber,
          debitorAccIfsc,
        },
      ],
      remitterAcc: [
        {
          remitterAccName,
          remitterAccNumber,
          remitterAccIfsc,
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

    let prefundCommissionObject = {};

    if (prefundCommissionType === "Flat") {
      prefundCommissionObject = {
        fixedCommissionValue:prefundFixedCommissionValue,
        fixedCommissionUnit:prefundFixedCommissionUnit,
        commissionType: "flat",
        flatCommission: { commissionValue: prefundFlatValue, commissionUnit: prefundFlatUnit },
      };
    }
    if (prefundCommissionType === "Slab") {
      prefundCommissionObject = {
        fixedCommissionValue:prefundFixedCommissionValue,
        fixedCommissionUnit:prefundFixedCommissionUnit,
        commissionType: "slab",
        slabs: prefundSlabValues.map(
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
      type: "PAYOUT",
      accountDetails: accountDetails,
      commissionDetails: {
        serviceProviderCommission: serviceProviderCommissionObject,
        clientCommission: clientCommissionObject,
        prefundCommission: prefundCommissionObject
      },
    };

    setServiceProviderConfig(config);
  };

  useEffect(() => {
    updateConfig();
  }, [
    notifyUrl,
    remitterAccName,
    remitterAccNumber,
    remitterAccIfsc,
    debitorAccName,
    debitorAccNumber,
    debitorAccIfsc,
    spCommissionType,
    spFlatValue,
    spFlatUnit,
    spSlabValues,
    clientCommissionType,
    clientFlatValue,
    clientFlatUnit,
    prefundCommissionType,
    prefundFlatValue,
    prefundFlatUnit,
    clientSlabValues,
    spFixedCommissionValue,
    spFixedCommissionUnit,
    clientFixedCommissionValue,
    clientFixedCommissionUnit,
    prefundFixedCommissionUnit,
    prefundFixedCommissionValue,
  ]);

  const resetWebhookDetails = () => {
    setNotifyUrl("");
  };

  const resetCredentailsDetails = () =>{
    setSid("");
    setVpa("")
  }
  
  const resetAccountDetails = () => {
    // setSettlementAccName("");
    // setSettlementAccNumber("");
    // setSettlementAccIfsc("");
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
      {serviceProviderName === 'ISERVEU-PAYOUT' ? (
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
      ):(
        <>
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
      <div style={{ fontWeight: "bolder", marginBottom: 20 }}>Account Details:</div>
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>1.Debitor Account Details:
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
      <CustomInput
          type="input"
          value={debitorAccName}
          onChange={(value) => setDebitorAccName(value)}
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
          value={debitorAccNumber}
          onChange={(value) => setDebitorAccNumber(value)}
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
          value={debitorAccIfsc}
          onChange={(value) => setDebitorAccIfsc(value)}
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
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>2.Remitter Account Details:
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
          value={remitterAccName}
          onChange={(value) => setRemitterAccName(value)}
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
          value={remitterAccNumber}
          onChange={(value) => setRemitterAccNumber(value)}
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
          value={remitterAccIfsc}
          onChange={(value) => setRemitterAccIfsc(value)}
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
      <div  style={{marginTop:20}}>
        <PayinCommissionDetails
          title="3. Prefund"
          commissionType={prefundCommissionType}
          setCommissionType={setPrefundCommissionType}
          fixedCommissionValue = {prefundFixedCommissionValue}
          setFixedCommissionValue ={setPrefundFixedCommissionValue}
          fixedCommissionUnit ={prefundFixedCommissionUnit}
          setFixedCommissionUnit ={setPrefundFixedCommisionUnit}
          flatValue={prefundFlatValue}
          setFlatValue={setPrefundFlatValue}
          flatUnit={prefundFlatUnit}
          setFlatUnit={setPrefundFlatUnit}
          slabValues={prefundSlabValues}
          handleSlabChange={handlePrefundSlabChange}
          addSlab={addPrefundSlab}
          removeSlab={removePrefundSlab}
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
      </>
      )}
    </div>
  );
};

export default CommonPayout;
