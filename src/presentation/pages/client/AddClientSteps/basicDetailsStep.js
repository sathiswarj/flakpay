import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import ButtonComponent from "../../../components/button";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost";
import { CustomInput } from "../../../components/customInput/CustomInput";

const BasicDetailsStep = ({ onClickNextStep, setClientId }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gst, setGST] = useState("");
  const [pan, setPAN] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");


  const onClickAddClient = () => {
   if(!name||!companyName|| !mobileNumber || !email || !address || !gst || !pan ){
    enqueueSnackbar("Please fill out allfields", { variant: "error" });
    return;
   }
   if (mobileNumber.length !== 10) {
    enqueueSnackbar("Please enter a valid 10-digit mobile number.", { variant: "error" });
    return;
  }
    setLoading(true);
    ApiRequestPost.addClient(name, companyName, email, mobileNumber, address, gst, pan,websiteUrl)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Basic Detailes Saved Successfully", {
            variant: "success",
          });
          onClickNextStep();
          setClientId(res.data?.clientId)
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

  return (
    <div
      style={{
        padding: 25,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80%",
      }}
    >
      <div style={{display:"flex",flexWrap:"wrap"}}>
        <CustomInput
          type="input"
          value={name}
          onChange={(value) => setName(value)}
          placeholder="Client name"
          validator="text"
          isMandatory={true}
          error={"Enter valid Name"}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
        <CustomInput
          type = "input"
          value ={companyName}
          onChange={(value)=> setCompanyName(value)}
          placeholder="Company name"
          validator="text"
          isMandatory={true}
          error={"Enter valid Company Name"}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
         />
        
        <CustomInput
          type="input"  
          value={mobileNumber}
          onChange={(value) => setMobileNumber(value)}
          placeholder="Mobile Number"
          validator="mobile"
          isMandatory={true}
          error={"Enter valid Mobile No."}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
        <CustomInput
          type="input"
          value={email}
          onChange={(value) => setEmail(value)}
          placeholder="Email"
          validator="email"
          isMandatory={true}
          error={"Enter valid Name"}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
        <CustomInput
          type="input"
          value={address}
          onChange={(value) => setAddress(value)}
          placeholder="Address"
          validator="address"
          isMandatory={true}
          error={"Enter valid Address"}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
        <CustomInput
          type="input"
          value={gst}
          onChange={(value) => setGST(value)}
          placeholder="GST"
          validator="gst"
          isMandatory={true}
          error={"Enter valid GST No."}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
        <CustomInput
          type="input"
          value={pan}
          onChange={(value) => setPAN(value)}
          placeholder="PAN"
          validator="pan"
          isMandatory={true}
          error={"Enter valid PAN No."}
          inputStyles={{
            width: '280px',
            padding: '10px',
            borderRadius: '4px',
            margin :"10px"
          }}
        />
        <CustomInput
          type="input"
          value={websiteUrl}
          onChange={(value) => setWebsiteUrl(value)}
          placeholder="Website Url"
          validator="text"
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
      <div style={{ display: "flex", justifyContent: "end" }}>
        <ButtonComponent loader={loading} label={"Next"} onClick={onClickAddClient} />
      </div>
    </div>
  );
};

export default BasicDetailsStep;
