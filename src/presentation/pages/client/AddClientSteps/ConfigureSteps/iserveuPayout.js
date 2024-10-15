import React, { useEffect, useState } from "react";
import InputComponent from "../../../../components/input";
import PayinCommissionDetails from "./payinCommissionDetails";
import { CustomInput } from "../../../../components/customInput/CustomInput";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CustomSelectComponenet from "../../../../components/CustomDropdown";

const IserveuPayout = ({ serviceProvider, setServiceProviderConfig, setEnableNextButton }) => {
  
  const [notifyUrl, setNotifyUrl] = useState("");


  const updateConfig = () => {
    // Service provider details
    let serviceProviderId = serviceProvider.split(" / ")[2];
    let serviceProviderName = serviceProvider.split(" / ")[0];
    const config = {
      serviceProviderId: serviceProviderId,
      serviceProviderName: serviceProviderName,
      webhookDetails: {
        notifyUrl,
      },
      type: "PAYOUT"
    };

    setServiceProviderConfig(config);
  };

  useEffect(() => {
    updateConfig();
  }, [notifyUrl]);

  const resetWebhookDetails = () => {
    setNotifyUrl("");
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
    </div>
  );
};

export default IserveuPayout;
