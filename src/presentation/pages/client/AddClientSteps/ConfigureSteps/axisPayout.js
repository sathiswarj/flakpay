import React, { useEffect, useState } from "react";
import InputComponent from "../../../../components/input";

const AxisPayoutStep = ({setEnableNextButton}) => {

    const [notifyUrl, setNotifyUrl] = useState("");
    const [validateUrl, setValidateUrl] = useState("");

    const [debitorAccName, setDebitorAccName] = useState("");
    const [debitorAccNumber, setDebitorAccNumber] = useState("");
    const [debitorAccIfsc, setDebitorAccIfsc] = useState("");

    const [remitterAccName, setRemitterAccName] = useState("");
    const [remitterrAccNumber, setRemitterrAccNumber] = useState("");
    const [remitterAccIfsc, setRemitterAccIfsc] = useState("");

    const [serviceProviderCommissionType, setServiceProviderCommissionType] = useState("");
    const [serviceProviderCommissionValue, setServiceProviderCommissionValue] = useState("");
    const [serviceProviderCommissionUnit, setServiceProviderCommissionUnit] = useState("");


    return (
        <div style={{ display: "flex", flexDirection: "column", paddingTop: 15 }}>
        <div style={{ marginBottom: 20 }}>
        <h4>Web Hook Details:</h4>
        <InputComponent
          type="text"
          value={notifyUrl}
          onChange={(value) => setNotifyUrl(value)}
          placeholder="Notify Url"
          style={{ width: "30%" }}
        />
          <InputComponent
          type="text"
          value={validateUrl}
          onChange={(value) => setValidateUrl(value)}
          placeholder="validate Url"
          style={{ width: "30%" }}
        />
      </div>
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}> Account Details:</div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
        <InputComponent
          type="text"
          value={debitorAccName}
          onChange={(value) => setDebitorAccName(value)}
          placeholder="Debitor Account Name"
        />
        <InputComponent
          type="text"
          value={debitorAccNumber}
          onChange={(value) => setDebitorAccNumber(value)}
          placeholder="Debitor Account No"
        />
        <InputComponent
          type="text"
          value={debitorAccIfsc}
          onChange={(value) => setDebitorAccIfsc(value)}
          placeholder=" Debitor IFSC"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
        <InputComponent
          type="text"
          value={remitterAccName}
          onChange={(value) => setRemitterAccName(value)}
          placeholder="Remitter Account Name"
        />
        <InputComponent
          type="text"
          value={remitterrAccNumber}
          onChange={(value) => setRemitterrAccNumber(value)}
          placeholder="Remitter Account No"
        />
        <InputComponent
          type="text"
          value={remitterAccIfsc}
          onChange={(value) => setRemitterAccIfsc(value)}
          placeholder="Remitter IFSC"
        />
      </div>
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>Commission Details:</div>

       {/* Service Provider Commission */}
       <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>Service Provider Commission:</div>
        <InputComponent
          type="text"
          value={serviceProviderCommissionValue}
          onChange={(value) => setServiceProviderCommissionValue(value)}
          placeholder="Commission Value"
        />
        <select
          value={serviceProviderCommissionType}
          onChange={(e) => setServiceProviderCommissionType(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            width: "100px"
          }}
        >
          <option value="" disabled hidden>Select Type</option>
          <option value="flat">Flat</option>
          <option value="slab">Slab</option>
        </select>
        {serviceProviderCommissionType === "flat" && (
          <select
            value={serviceProviderCommissionUnit}
            onChange={(e) => setServiceProviderCommissionUnit(e.target.value)}
            style={{
              padding: "10px",
              margin: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              width: "100px"
            }}
          >
            <option value="" disabled hidden>Select Unit</option>
            <option value="rupees">Rupees</option>
            <option value="percentage">Percentage</option>
          </select>
        )}
        {serviceProviderCommissionType === "slab" && (
          <div style={{marginTop:10}}>
            {/* Add additional inputs for slab type */}
            <InputComponent
              type="text"
              placeholder="Slab Detail 1"
              // Add appropriate state and handlers
            />
            <InputComponent
              type="text"
              placeholder="Slab Detail 2"
              // Add appropriate state and handlers
            />
          </div>
        )}
      </div>
        </div>
    );
}

export default AxisPayoutStep;
