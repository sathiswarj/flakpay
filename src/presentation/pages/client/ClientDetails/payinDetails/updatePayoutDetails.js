import React, { useEffect, useState } from "react";
import { CustomInput } from "../../../../components/customInput/CustomInput";
import PayinCommissionDetails from "../../AddClientSteps/ConfigureSteps/payinCommissionDetails";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomSelectComponenet from "../../../../components/CustomDropdown";

const UpdatePayoutDetails = ({ data, handleSaveChanges }) => {
  const [editMode, setEditMode] = useState({
    webhookDetail: false,
    accountDetail: false,
    commissionDetail: false,
    credentialDetails :false
  });
  const [unitDropdown, setUnitDropdown] = useState([{ label: "rupees" }, { label: "percentage" }]);
  console.log("dtatata",data);
  const [notifyUrl, setNotifyUrl] = useState(data.webhookDetails?.notifyUrl);
  const [sid, setSid] = useState(data.credentials?.sid);
  const [vpa, setVpa] = useState(data.credentials?.vpa);
  // const [timeWindow, setTimeWindow] = useState(data.accountDetails?.settlementCycle?.timeWindow);
  // const [timeUnit, setTimeUnit] = useState(data.accountDetails?.settlementCycle?.timeUnit);
  // const [timeUnitDropdown, setTimeUnitDropdown] = useState([{ label: "hour" }, { label: "min" }]);
  // const [settlementAccName, setSettlementAccName] = useState(
  //   data.accountDetails.settlementAcc[0].settlementAccName
  // );
  // const [settlementAccNumber, setSettlementAccNumber] = useState(
  //   data.accountDetails.settlementAcc[0].settlementAccNumber
  // );
  // const [settlementAccIfsc, setSettlementAccIfsc] = useState(
  //   data.accountDetails.settlementAcc[0].settlementAccIfsc
  // );
  const [debitorAccName, setDebitorAccName] = useState(
    data?.accountDetails?.debitorAcc[0]?.debitorAccName
  );
  const [debitorAccNumber, setDebitorAccNumber] = useState(
    data?.accountDetails?.debitorAcc[0]?.debitorAccNumber
  );
  const [debitorAccIfsc, setDebitorAccIfsc] = useState(
    data?.accountDetails?.debitorAcc[0]?.debitorAccIfsc
  );
  const [remitterAccName, setRemitterAccName] = useState(
    data?.accountDetails?.remitterAcc[0]?.remitterAccName
  );
  const [remitterAccNumber, setRemitterAccNumber] = useState(
    data?.accountDetails?.remitterAcc[0]?.remitterAccNumber
  );
  const [remitterAccIfsc, setRemitterAccIfsc] = useState(
    data?.accountDetails?.remitterAcc[0]?.remitterAccIfsc
  );

  const [spCommissionType, setSpCommissionType] = useState(
    data?.commissionDetails?.serviceProviderCommission?.commissionType
  );
  const [spFixedCommissionValue, setSpFixedCommissionValue] = useState(
    data?.commissionDetails?.serviceProviderCommission?.fixedCommissionValue
  );
  const [spFixedCommissionUnit, setSpFixedCommissionUnit] = useState(
    data?.commissionDetails?.serviceProviderCommission?.fixedCommissionUnit
  );
  const [spFlatValue, setSpFlatValue] = useState(
    data?.commissionDetails?.serviceProviderCommission?.flatCommission?.commissionValue || ""
  );
  const [spFlatUnit, setSpFlatUnit] = useState(
    data?.commissionDetails?.serviceProviderCommission?.flatCommission?.commissionUnit || ""
  );
  const [spSlabValues, setSpSlabValues] = useState(
    data?.commissionDetails?.serviceProviderCommission?.slabs || []
  );

  const [clientCommissionType, setClientCommissionType] = useState(
    data?.commissionDetails?.clientCommission?.commissionType
  );
  const [clientFixedCommissionValue, setClientFixedCommissionValue] = useState(
    data?.commissionDetails?.clientCommission?.fixedCommissionValue
  );
  const [clientFixedCommissionUnit, setClientFixedCommisionUnit] = useState(
    data?.commissionDetails?.clientCommission?.fixedCommissionUnit
  );
  const [clientFlatValue, setClientFlatValue] = useState(
    data?.commissionDetails?.clientCommission?.flatCommission?.commissionValue || ""
  );
  const [clientFlatUnit, setClientFlatUnit] = useState(
    data?.commissionDetails?.clientCommission?.flatCommission?.commissionUnit || ""
  );
  const [clientSlabValues, setClientSlabValues] = useState(
    data?.commissionDetails?.clientCommission?.slabs || []
  );

  const [prefundCommissionType, setPrefundCommissionType] = useState(
    data?.commissionDetails?.prefundCommission?.commissionType
  );
  const [prefundFixedCommissionValue, setPrefundFixedCommissionValue] = useState(
    data?.commissionDetails?.prefundCommission?.fixedCommissionValue
  );
  const [prefundFixedCommissionUnit, setPrefundFixedCommisionUnit] = useState(
    data?.commissionDetails?.prefundCommission?.fixedCommissionUnit
  );
  const [prefundFlatValue, setPrefundFlatValue] = useState(
    data?.commissionDetails?.prefundCommission?.flatCommission?.commissionValue || ""
  );
  const [prefundFlatUnit, setPrefundFlatUnit] = useState(
    data?.commissionDetails?.prefundCommission?.flatCommission?.commissionUnit || ""
  );
  const [prefundSlabValues, setPrefundSlabValues] = useState(
    data?.commissionDetails?.prefundCommission?.slabs || []
  );

  const toggleEditMode = (section) => {
    setEditMode((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const saveChanges = () => {
    const updatedServiceProvider = [
      {
        ...data,
        webhookDetails: {
          ...data.webhookDetails,
          notifyUrl,
        },
        credentials :{
          ...data.crendentials,
          sid,vpa,
        },
        accountDetails: {
          ...data.accountDetails,
          // settlementCycle: {
          //   timeWindow: timeWindow,
          //   timeUnit: timeUnit,
          // },
          // settlementAcc: [
          //   {
          //     settlementAccName,
          //     settlementAccNumber,
          //     settlementAccIfsc,
          //   },
          // ],
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
        },
        commissionDetails: {
          ...data.commissionDetails,
          serviceProviderCommission: {
            commissionType: spCommissionType,
            fixedCommissionValue: spFixedCommissionValue,
            fixedCommissionUnit: spFixedCommissionUnit,
            flatCommission: {
              commissionValue: spFlatValue,
              commissionUnit: spFlatUnit,
            },
            slabs: spSlabValues,
          },
          clientCommission: {
            commissionType: clientCommissionType,
            fixedCommissionValue: clientFixedCommissionValue,
            fixedCommissionUnit: clientFixedCommissionUnit,
            flatCommission: {
              commissionValue: clientFlatValue,
              commissionUnit: clientFlatUnit,
            },
            clientCommission: {
              commissionType: clientCommissionType,
              flatCommission: {
                commissionValue: clientFlatValue,
                commissionUnit: clientFlatUnit,
              },
              slabs: clientSlabValues,
            },
          },
          prefundCommission: {
            commissionType: prefundCommissionType,
            fixedCommissionValue: prefundFixedCommissionValue,
            fixedCommissionUnit: prefundFixedCommissionUnit,
            flatCommission: {
              commissionValue: prefundFlatValue,
              commissionUnit: prefundFlatUnit,
            },
            prefundCommission: {
              commissionType: prefundCommissionType,
              flatCommission: {
                commissionValue: prefundFlatValue,
                commissionUnit: prefundFlatUnit,
              },
              slabs: prefundSlabValues,
            },
          },
        },
      },
    ];

    handleSaveChanges(updatedServiceProvider);

    setEditMode({
      webhookDetail: false,
      accountDetail: false,
      commissionDetail: false,
      credentialDetails: false
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: 15 }}>
      {/* Webhook Details */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4>Notify Url:</h4>
          {editMode.webhookDetail ? (
            <>
              <SaveIcon
                onClick={saveChanges}
                style={{ cursor: "pointer", color: "#28a745", fontSize: 20, marginLeft: 10 }}
              />
              <CancelIcon
                onClick={() => toggleEditMode("webhookDetail")}
                style={{ cursor: "pointer", color: "#dc3545", fontSize: 20, marginLeft: 10 }}
              />
            </>
          ) : (
            <EditIcon
              onClick={() => toggleEditMode("webhookDetail")}
              style={{ cursor: "pointer", color: "#007bff", fontSize: 20, marginLeft: 10 }}
            />
          )}
        </div>
        <CustomInput
          type="input"
          value={notifyUrl}
          onChange={(value) => setNotifyUrl(value)}
          placeholder="Notify Url"
          validator="url"
          isMandatory={true}
          error={"Enter valid Url"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.webhookDetail}
        />
      </div>
     
      {/* Account Details */}
      {/* <div style={{ fontWeight: "bolder" }}>
        <h4>
          Settlement Cycle Details:
          {editMode.accountDetail ? (
            <>
              <SaveIcon
                onClick={saveChanges}
                style={{ cursor: "pointer", color: "#28a745", fontSize: 20, marginLeft: 10 }}
              />
              <CancelIcon
                onClick={() => toggleEditMode("accountDetail")}
                style={{ cursor: "pointer", color: "#dc3545", fontSize: 20, marginLeft: 10 }}
              />
            </>
          ) : (
            <EditIcon
              onClick={() => toggleEditMode("accountDetail")}
              style={{ cursor: "pointer", color: "#007bff", fontSize: 20, marginLeft: 10 }}
            />
          )}
        </h4>
      </div> */}
      {/* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 20,
          width: "100%",
        }}
      >
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
          disabled={!editMode.accountDetail}
        />
        <CustomSelectComponenet
          value={timeUnit}
          onChange={(event) => {
            setTimeUnit(event.target.value);
          }}
          data={timeUnitDropdown}
          label="Unit"
          style={{width: 100, marginTop: 10 }}
          disabled={!editMode.accountDetail}
        />
      </div> */}
      <div style={{ fontWeight: "bolder", marginBottom: 10 }}>Account Details:
      {editMode.accountDetail ? (
            <>
              <SaveIcon
                onClick={saveChanges}
                style={{ cursor: "pointer", color: "#28a745", fontSize: 20, marginLeft: 10 }}
              />
              <CancelIcon
                onClick={() => toggleEditMode("accountDetail")}
                style={{ cursor: "pointer", color: "#dc3545", fontSize: 20, marginLeft: 10 }}
              />
            </>
          ) : (
            <EditIcon
              onClick={() => toggleEditMode("accountDetail")}
              style={{ cursor: "pointer", color: "#007bff", fontSize: 20, marginLeft: 10 }}
            />
          )}
      </div>
      <div style={{ fontWeight: "bolder" }}>
        <h4>1.Debitor Account Details:</h4>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 10, width: "100%" }}>
        <CustomInput
          type="input"
          value={debitorAccName}
          onChange={(value) => setDebitorAccName(value)}
          placeholder="Account Name"
          validator="name"
          isMandatory={true}
          error={"Enter valid name"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.accountDetail}
        />
        <CustomInput
          type="input"
          value={debitorAccNumber}
          onChange={(value) => setDebitorAccNumber(value)}
          placeholder="Account Number"
          validator="accountNumber"
          isMandatory={true}
          error={"Enter valid number"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.accountDetail}
        />
        <CustomInput
          type="input"
          value={debitorAccIfsc}
          onChange={(value) => setDebitorAccIfsc(value)}
          placeholder="IFSC Code"
          validator="ifscCode"
          isMandatory={true}
          error={"Enter valid IFSC"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.accountDetail}
        />
      </div>
      <div style={{ fontWeight: "bolder"}}>
        <h4>2.Remitter Account Details: </h4>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 10, width: "100%" }}>
        <CustomInput
          type="input"
          value={remitterAccName}
          onChange={(value) => setRemitterAccName(value)}
          placeholder="Account Name"
          validator="name"
          isMandatory={true}
          error={"Enter valid name"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.accountDetail}
        />
        <CustomInput
          type="input"
          value={remitterAccNumber}
          onChange={(value) => setRemitterAccNumber(value)}
          placeholder="Account Number"
          validator="accountNumber"
          isMandatory={true}
          error={"Enter valid number"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.accountDetail}
        />
        <CustomInput
          type="input"
          value={remitterAccIfsc}
          onChange={(value) => setRemitterAccIfsc(value)}
          placeholder="IFSC Code"
          validator="ifscCode"
          isMandatory={true}
          error={"Enter valid IFSC"}
          inputStyles={{
            width: "280px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={!editMode.accountDetail}
        />
      </div>


      {/* Commission Details */}
      <div style={{ fontWeight: "bolder", marginBottom: 20 }}>
        <h4>
          Commission Details:
          {editMode.commissionDetail ? (
            <>
              <SaveIcon
                onClick={saveChanges}
                style={{ cursor: "pointer", color: "#28a745", fontSize: 20, marginLeft: 10 }}
              />
              <CancelIcon
                onClick={() => toggleEditMode("commissionDetail")}
                style={{ cursor: "pointer", color: "#dc3545", fontSize: 20, marginLeft: 10 }}
              />
            </>
          ) : (
            <EditIcon
              onClick={() => toggleEditMode("commissionDetail")}
              style={{ cursor: "pointer", color: "#007bff", fontSize: 20, marginLeft: 10 }}
            />
          )}
        </h4>
        <div style={{ marginBottom: 20 }}>
          <PayinCommissionDetails
            title="1.Service Provider"
            commissionType={spCommissionType}
            setCommissionType={setSpCommissionType}
            fixedCommissionValue={spFixedCommissionValue}
            setFixedCommissionValue={setSpFixedCommissionValue}
            fixedCommissionUnit={spFixedCommissionUnit}
            setFixedCommissionUnit={setSpFixedCommissionUnit}
            flatValue={spFlatValue}
            setFlatValue={setSpFlatValue}
            flatUnit={spFlatUnit}
            setFlatUnit={setSpFlatUnit}
            slabValues={spSlabValues}
            setSlabValues={setSpSlabValues}
            unitDropdown={unitDropdown}
            setUnitDropdown={setUnitDropdown}
            disabled={!editMode.commissionDetail}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
        <PayinCommissionDetails
          title="2.Client"
          commissionType={clientCommissionType}
          setCommissionType={setClientCommissionType}
          fixedCommissionValue={clientFixedCommissionValue}
          setFixedCommissionValue={setClientFixedCommissionValue}
          fixedCommissionUnit={clientFixedCommissionUnit}
          setFixedCommissionUnit={setClientFixedCommisionUnit}
          flatValue={clientFlatValue}
          setFlatValue={setClientFlatValue}
          flatUnit={clientFlatUnit}
          setFlatUnit={setClientFlatUnit}
          slabValues={clientSlabValues}
          setSlabValues={setClientSlabValues}
          unitDropdown={unitDropdown}
          setUnitDropdown={setUnitDropdown}
          disabled={!editMode.commissionDetail}
        />
        </div>
        <div style={{ marginBottom: 20 }}>
        <PayinCommissionDetails
          title="3.Prefund"
          commissionType={prefundCommissionType}
          setCommissionType={setPrefundCommissionType}
          fixedCommissionValue={prefundFixedCommissionValue}
          setFixedCommissionValue={setPrefundFixedCommissionValue}
          fixedCommissionUnit={prefundFixedCommissionUnit}
          setFixedCommissionUnit={setPrefundFixedCommisionUnit}
          flatValue={prefundFlatValue}
          setFlatValue={setPrefundFlatValue}
          flatUnit={prefundFlatUnit}
          setFlatUnit={setPrefundFlatUnit}
          slabValues={prefundSlabValues}
          setSlabValues={setPrefundSlabValues}
          unitDropdown={unitDropdown}
          setUnitDropdown={setUnitDropdown}
          disabled={!editMode.commissionDetail}
        />
        </div>
      </div>
    </div>
  );
};

export default UpdatePayoutDetails;
