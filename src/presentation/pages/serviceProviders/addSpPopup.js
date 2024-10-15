import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonComponent from "../../components/button";
import { CustomInput } from "../../components/customInput/CustomInput";
import { enqueueSnackbar } from "notistack";
import CustomSelectComponenet from "../../components/CustomDropdown";

const AddServiceProviderPopup = ({ onClickAddSp, loading, onClickClose }) => {
  const [serviceProviderName, setServiceProviderName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [spTypeDropdown, setSpTypeDropdown] = useState([
    { label: "PAYIN" },
    { label: "PAYOUT" },
  ]);
 
  const onClickAddButton = () => {
    if(!serviceProviderName||!serviceType ){
      enqueueSnackbar("Please fill out allfields", { variant: "error" });
      return;
     }
      onClickAddSp(serviceProviderName, serviceType);
    
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        marginBottom : 40
      }}
    >
      <div
        style={{
          display: "flex",
          height: "70%",
          width: "100%",
          flexWrap: "wrap",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomInput
          type = "input"
          value ={serviceProviderName}
          onChange={(value)=> setServiceProviderName(value)}
          placeholder="Service Provider Name"
          validator="text"
          isMandatory={true}
          error={"Enter valid Name"}
          inputStyles={{
            width:"350px",
            height:"35px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
         />
         <CustomSelectComponenet
        value={serviceType}
        onChange={(event) => setServiceType(event.target.value)}
        data={spTypeDropdown}
        label="Service Type"
        style={{ width: 350,height:40,marginTop:0 }}
      />
      {/* <CustomInput
          type = "input"
          value ={serviceType}
          onChange={(value)=> setServiceType(value)}
          placeholder="Service Type"
          validator="text"
          isMandatory={true}
          error={"Enter valid Type"}
          inputStyles={{
            width:"350px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
         />
        */}
      </div>
      <div
        style={{
          height: "30%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin : 20
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <ButtonComponent label="Add" onClick={onClickAddButton} />
        )}
      </div>
    </div>
  );
};

export default AddServiceProviderPopup;
