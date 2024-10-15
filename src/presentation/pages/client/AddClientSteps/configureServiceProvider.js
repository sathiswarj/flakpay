import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import ButtonComponent from "../../../components/button";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ApiRequestGet } from "../../../../data/network/services/ApiRequestGet";
import NpstPayin from "./ConfigureSteps/npstPayin";
import AxisPayoutStep from "./ConfigureSteps/axisPayout";
import IserveuPayout from "./ConfigureSteps/iserveuPayout";
import NodalPayin from "./ConfigureSteps/nodalPayin";
import NodalPayout from "./ConfigureSteps/nodalPayout";
import KwicpayPayin from "./ConfigureSteps/kwicpayPayin";
import KwicpayPayout from "./ConfigureSteps/kwicpayPayout"
import CommonPayout from "./ConfigureSteps/commonPayout.js";
import CommonPayin from "./ConfigureSteps/commonPayin.js";

const ConfirureServiceProvider = ({ onClickNextStep, clientId }) => {
  const [loading, setLoading] = useState(false);
  const [enableNextButton, setEnableNextButton] = useState(false);
  const [allServicesList, setAllServicesList] = useState([]);
  const [serviceProvider, setServiceProvider] = useState("");

  const [servicecProviderConfig, setServiceProviderConfig] = useState({});

  const getAllServiceProvidersList = () => {
    ApiRequestGet.getAllSp()
      .then((res) => {
        if (res.status) {
          let temp = [];
          temp.push("Choose Service Provider");
          res.data?.map((item) => {
            if (item.status) {
              temp.push(
                item.serviceProviderName + " / " + item.serviceType + " / " + item.serviceProviderId
              );
            }
          });
          setAllServicesList(temp);
        } else {
          setAllServicesList([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setAllServicesList([]);
      });
  };

  const onClickAddServiceConfiguration = () => {
    setLoading(true);
    // const serviceProviderName = serviceProvider.split(" / ")[0];
    ApiRequestPost.addServiceProviderToClient(
      clientId,
      serviceProvider.split(" / ")[1],
      servicecProviderConfig
    )
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Client Added Successfully", {
            variant: "success",
          });
          onClickNextStep(2);
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

  useEffect(() => {
    getAllServiceProvidersList();
  }, []);

  return (
    <div
      style={{
        padding: 25,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90%",
       
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth style={{ maxWidth: "400px" }}>
          <InputLabel>Service Provider</InputLabel>
          <Select
            value={serviceProvider}
            onChange={(e) =>  setServiceProvider(e.target.value)}
            label="Service Provider"
          >
            {allServicesList?.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item === "Choose Service Provider"
                    ? item
                    : item.split(" / ")[0] + " - " + item.split(" / ")[1]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div style={{ height: "80%", width: "100%"}}>
          {serviceProvider.split(" / ")[0] === ("NPST-PAYIN")  ? (
            <CommonPayin
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) :serviceProvider.split(" / ")[0] === "NODAL-PAYIN" ? (
            <CommonPayin
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) : serviceProvider.split(" / ")[0] === "KWICPAY-PAYIN" ? (
            <CommonPayin
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) : serviceProvider.split(" / ")[0] === "VIMOPAY-PAYIN" ? (
            <CommonPayin
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) : serviceProvider.split(" / ")[0] === "ZIPZOP-PAYIN" ? (
            <CommonPayin
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) :serviceProvider.split(" / ")[0] === "IDFC-PAYIN" ? (
            <CommonPayin
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) :serviceProvider.split(" / ")[0] === "NODAL-PAYOUT" ? (
            <CommonPayout
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) : serviceProvider.split(" / ")[0] === "KWICPAY-PAYOUT" ? (
            <CommonPayout
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ) : serviceProvider.split(" / ")[0] === "ISERVEU-PAYOUT" ? (
            <CommonPayout
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ):serviceProvider.split(" / ")[0] === "IDFC-PAYOUT" ? (
            <CommonPayout
              serviceProvider={serviceProvider}
              setServiceProviderConfig={setServiceProviderConfig}
              setEnableNextButton={(val) => setEnableNextButton(val)}
            />
          ):null}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end",padding:20 }}>
        <ButtonComponent
          loader={loading}
          enable={enableNextButton}
          label={"Next"}
          onClick={() => {
            onClickAddServiceConfiguration();
          }}
        />
      </div>
    </div>
  );
};

export default ConfirureServiceProvider;
