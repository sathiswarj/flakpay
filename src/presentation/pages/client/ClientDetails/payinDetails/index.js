import React, { useEffect, useState } from "react";
import ResizeListener from "../../../../../utility/ResizeListener";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateClientDetailsStep from "./updateClientDetails";
import { useSnackbar } from "notistack";
import { ApiRequestPost } from "../../../../../data/network/services/ApiRequestPost";
import ButtonComponent from "../../../../components/button";
import { ApiRequestGet } from "../../../../../data/network/services/ApiRequestGet";
import Close from "@mui/icons-material/Close";
import { MenuItem, Select } from "@mui/material";
import NpstPayin from "../../AddClientSteps/ConfigureSteps/npstPayin";
import AxisPayoutStep from "../../AddClientSteps/ConfigureSteps/axisPayout";
import Kopay from "../../AddClientSteps/ConfigureSteps/kopay";
import UpdatePayoutDetails from "./updatePayoutDetails";
import IserveuPayout from "../../AddClientSteps/ConfigureSteps/iserveuPayout";
import NodalPayin from "../../AddClientSteps/ConfigureSteps/nodalPayin";
import NodalPayout from "../../AddClientSteps/ConfigureSteps/nodalPayout";
import KwicpayPayin from "../../AddClientSteps/ConfigureSteps/kwicpayPayin";
import CommonPayout from "../../AddClientSteps/ConfigureSteps/commonPayout";
import CommonPayin from "../../AddClientSteps/ConfigureSteps/commonPayin";
import ToggleSwitch from "../../../../components/ToggleSwitch";

const ClientPayinServiceDetails = ({ data, refreshData }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [serviceProviderList, setServiceProviderList] = useState(
    data?.payinServices?.services || []
  );
  const [serviceProviderListPayout, setServiceProviderListPayout] = useState(
    data?.payoutServices?.services || []
  );

  console.log("Check Data-->", serviceProviderListPayout);
  const [isChanged, setIsChanged] = useState(false);
  const [showServiceProvider, setShowServiceProvider] = useState(false);
  const [togglePayIn, setTogglePayIn] = useState(true);
  const [togglePayOut, setTogglePayOut] = useState(false);
  const [allPayinSp, setAllPayinSp] = useState([]);
  const [allPayoutSp, setAllPayoutSp] = useState([]);
  const [serviceProvider, setServiceProvider] = useState("");
  const [servicecProviderConfig, setServiceProviderConfig] = useState({});
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const getAllServiceProvidersList = () => {
    ApiRequestGet.getAllSp()
      .then((res) => {
        if (res.status) {
          const payInServices = [];
          const payOutServices = [];

          res.data?.forEach((item) => {
            if (item.status) {
              const serviceProviderInfo =
                item.serviceProviderName +
                " / " +
                item.serviceType +
                " / " +
                item.serviceProviderId;

              if (item.serviceType === "PAYIN") {
                payInServices.push(serviceProviderInfo);
              } else if (item.serviceType === "PAYOUT") {
                payOutServices.push(serviceProviderInfo);
              }
            }
          });

          setAllPayinSp(payInServices);
          setAllPayoutSp(payOutServices);
        } else {
          setAllPayinSp([]);
          setAllPayoutSp([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setAllPayinSp([]);
        setAllPayoutSp([]);
      });
  };


  const handleStatusChange = (serviceProviderId,status) => {
    setServiceProviderList((prevList) =>
      prevList.map((sp) =>
        sp.serviceProviderId === serviceProviderId ? { ...sp, status: status } : sp
      )
    );
    setServiceProviderListPayout((prevList) =>
      prevList.map((sp) =>
        sp.serviceProviderId === serviceProviderId ? { ...sp, status: status } : sp
      )
    );
    const statusUpdatePayload = {
      clientId: data.clientId, 
      serviceProviderId: serviceProviderId,
      status: status
    };
    ApiRequestPost.updateClientSpStatus(statusUpdatePayload)
    .then((res) => {
      if (res.success) {
        enqueueSnackbar("Status updated successfully!", { variant: "success" });
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    })
    .catch((err) => {
      enqueueSnackbar(err.message, { variant: "error" });
    });
  }

  const handleSaveChanges = (updatedServiceProvider) => {
    const updatedDetails = {
      clientId: data.clientId,
      type: "PAYIN",
      serviceProviderList: [updatedServiceProvider],
    };

    ApiRequestPost.updateServiceProviderForClient(data.clientId, "PAYIN", updatedServiceProvider)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Update successful!", { variant: "success" });
          setIsChanged(false);
          if (refreshData) {
            refreshData();
          }
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handlePayoutSaveChanges = (updatedServiceProvider) => {
    const updatedDetails = {
      clientId: data.clientId,
      type: "PAYOUT",
      serviceProviderList: [updatedServiceProvider],
    };

    ApiRequestPost.updateServiceProviderForClient(data.clientId, "PAYOUT", updatedServiceProvider)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Update successful!", { variant: "success" });
          setIsChanged(false);
          if (refreshData) {
            refreshData();
          }
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleAddClick = () => {
    setShowServiceProvider(true);
  };

  const handleCloseClick = () => {
    setShowServiceProvider(false);
    setServiceProvider("");
    setTogglePayIn(true);
    setTogglePayOut(false);
  };

  const onClickAddServiceConfiguration = () => {
    // const serviceProviderName = serviceProvider.split(" / ")[0];
    const serviceType = serviceProvider.split(" / ")[1];
    ApiRequestPost.addServiceProviderToClient(
      data.clientId,
      serviceProvider.split(" / ")[1],
      servicecProviderConfig
    )
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Client Added Successfully", {
            variant: "success",
          });
          // Update the service provider list
          const newServiceProvider = {
            serviceProviderName: serviceProvider.split(" / ")[0],
            serviceType,
            serviceProviderId: res.data.serviceProviderId, // Assume res.data contains the added service provider info
          };

          if (serviceType === "PAYIN") {
            setServiceProviderList((prevList) => [...prevList, newServiceProvider]);
          } else if (serviceType === "PAYOUT") {
            setServiceProviderListPayout((prevList) => [...prevList, newServiceProvider]);
          }

          // Clear the form and close the accordion after successful save
          setShowServiceProvider(false);
          setServiceProvider(""); // Clear the selected service provider
          setTogglePayIn(true); // Reset the toggles
          setTogglePayOut(false);
          setExpandedAccordion(null); // Close the accordion
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
      .finally(() => {});
  };
  useEffect(() => {
    getAllServiceProvidersList();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}>
        {!showServiceProvider && <ButtonComponent label={"Add SP"} onClick={handleAddClick} />}

        {showServiceProvider && (
          <Close style={{ cursor: "pointer", marginLeft: 10 }} onClick={handleCloseClick} />
        )}
      </div>
      {showServiceProvider && (
        <div>
          <p>Service Type</p>
          <div className="division" style={{ margin: 0 }}>
            <input
              type="radio"
              name="select"
              value="payIn"
              id="pay-in"
              onChange={() => {
                setTogglePayOut(false);
                setTogglePayIn(true);
              }}
              defaultChecked
              style={{ cursor: "pointer", accentColor: "blue" }}
            ></input>
            Pay-In &nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <input
              type="radio"
              name="select"
              value="payOut"
              style={{ cursor: "pointer", accentColor: "blue" }}
              onChange={() => {
                setTogglePayOut(true);
                setTogglePayIn(false);
              }}
            ></input>
            Pay-Out
          </div>

          {togglePayIn && (
            <div style={{ margin: 10 }}>
              {/* <ServiceProvider /> */}
              <select
                onChange={(e) => setServiceProvider(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: 5,
                  cursor: "pointer",
                  border: "1px solid #ABABAB",
                }}
              >
                <option>Select Service Provider (Pay-In);</option>

                {allPayinSp.map((item) => (
                  <option className="opt" value={item} key={item}>
                    {item.split(" / ")[0]}
                  </option>
                ))}
              </select>
              <div style={{ height: "80%", width: "100%" }}>
                {serviceProvider.split(" / ")[0].search("NPST-PAYIN") !== -1 ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "NODAL-PAYIN" ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "KWICPAY-PAYIN" ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "VIMOPAY-PAYIN" ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "ZIPZOP-PAYIN" ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "KoPay" ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "IDFC-PAYIN" ? (
                  <CommonPayin
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : null}
              </div>
              {serviceProvider && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ButtonComponent label={"Save"} onClick={onClickAddServiceConfiguration} />
                </div>
              )}
            </div>
          )}
          {togglePayOut && (
            <div style={{ margin: 10 }}>
              <select
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: 5,
                  cursor: "pointer",
                  border: "1px solid #ABABAB",
                }}
              >
                <option value="">Select Service Provider (Pay-Out)</option>

                {allPayoutSp.map((item) => (
                  <option className="opt" value={item} key={item}>
                    {item.split(" / ")[0]}
                  </option>
                ))}
              </select>
              <div style={{ height: "80%", width: "100%" }}>
                {serviceProvider.split(" / ")[0] === "AXIS-PAYOUT" ? (
                  <AxisPayoutStep
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={() => {}}
                    setEnableNextButton={(val) => val}
                  />
                ) : serviceProvider.split(" / ")[0] === "NODAL-PAYOUT" ? (
                  <CommonPayout
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "KWICPAY-PAYOUT" ? (
                  <CommonPayout
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : serviceProvider.split(" / ")[0] === "ISERVEU-PAYOUT" ? (
                  <CommonPayout
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                )  : serviceProvider.split(" / ")[0] === "IDFC-PAYOUT" ? (
                  <CommonPayout
                    serviceProvider={serviceProvider}
                    setServiceProviderConfig={setServiceProviderConfig}
                  />
                ) : null}
              </div>
              {serviceProvider && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ButtonComponent label={"Save"} onClick={onClickAddServiceConfiguration} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {serviceProviderList.map((item, key) => (
        <div style={{ display: "flex", flexWrap: "wrap", height: "auto" }}>
          <Accordion
            key={item.serviceProviderId}
            elevation={1}
            style={{ padding: 10, marginBottom: 20 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${key + 1}-content`}
              id={`panel${key + 1}-header`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {item?.serviceProviderName}
              </div>
              <ToggleSwitch checked={item.status} onChange={() => handleStatusChange(item.serviceProviderId, !item.status)} />
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                <UpdateClientDetailsStep data={item} handleSaveChanges={handleSaveChanges} />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}

      {serviceProviderListPayout.map((item, key) => (
        <div style={{ display: "flex", flexWrap: "wrap", height: "auto" }}>
          <Accordion
            key={item.serviceProviderId}
            elevation={1}
            style={{ padding: 10, marginBottom: 10, width: "800px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${key + 1}-content`}
              id={`panel${key + 1}-header`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {item?.serviceProviderName}
              </div>
              <ToggleSwitch checked={item.status} onChange={() => handleStatusChange(item.serviceProviderId, !item.status)} />
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ maxHeight: "300px", width: 760, overflow: "auto" }}>
                <UpdatePayoutDetails data={item} handleSaveChanges={handlePayoutSaveChanges} />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ClientPayinServiceDetails;
