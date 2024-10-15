import React, { useEffect } from "react";

import DevelopersDownload from "../../../Assets/svg/developersDownload.svg";
import { useState } from "react";
import "./Developers.css";
import payinIntentDocument from "./Payin-v1.1.pdf";
import payoutDocument from "./Payout-v1.0.pdf"
import Header from "../../../presentation/components/Header";
import secureStorage from "../../../utility/secureStorage";
import { useSnackbar } from "notistack";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Developers = (clientId) => {
  const { enqueueSnackbar } = useSnackbar();

  const [clientsNamePayOut, setClientsNamePayOut] = useState([]);
  const [sproviders, setAllServiceProviders] = useState([]);

  const [sPPayOut, setAllServiceProvidersPayOut] = useState([]);
  console.log("765i", sPPayOut);
  const [clientsName, setClientsName] = useState([]);

  const [ClientId, setClientId] = useState("");

  const [secretKey, setSecretKey] = useState("");
  const [clientPayoutSP, setClientPayoutSP] = useState([]);

  const [role, setRole] = useState("Admin");

  const [vFile, setVFile] = useState([]);
  const [payOutDoc, setPayOutDocName] = useState("");
  console.log("hjgff665", vFile);

  const [payInUrl, setPayInUrl] = useState("");
  const [payOutUrl, setPayOutUrl] = useState("");

  const [adminTogglePayIn, setadminTogglePayIn] = useState(true);
  const [adminTogglePayOut, setadminTogglePayOut] = useState(false);

  const [clientTogglePayIn, setClientTogglePayIn] = useState(false);
  const [clientTogglePayOut, setClientTogglePayOut] = useState(false);

  const [selectedServiceProviderPayIn, setSelectedServiceProviderPayIn] = useState("");

  const [selectedServiceProviderPayOut, setSelectedServiceProviderPayOut] = useState("");

  const [clientNamePayIn, setClientNamePayIn] = useState("");
  const [clientNamePayOut, setClientNamePayOut] = useState("");
  const [payinCallbackUrl, setPayinCallbackUrl] = useState("");
  const [serviceType, setServiceType] = useState([]);

  const [showClientId, setShowClientId] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const toggleClientIdVisibility = () => setShowClientId(!showClientId);
  const toggleSecretKeyVisibility = () => setShowSecretKey(!showSecretKey);

  const updatePayInCallbackUrl = () => {
    ApiRequestPost.updatePayinCallback(clientNamePayIn, payinCallbackUrl)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar("Callback Updated Successfully", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Callback Updated Successfully", {
          variant: "error",
        });
      });
  };

  const adminPayOutUpdate = () => {
    ApiRequestPost.updatePayOutCallback(clientNamePayOut, payOutUrl)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar("Callback Updated Successfully", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Callback not Updated ", {
          variant: "error",
        });
      });
  };

  const adminPayOutUpdateIsmart = () => {
    ApiRequestPost.updatePayOutCallbackIsmart(clientNamePayOut, payOutUrl)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar("Callback Updated Successfully", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Callback not Updated ", {
          variant: "error",
        });
      });
  };
  // neokred
  const adminPayOutUpdateNeokred = () => {
    ApiRequestPost.updatePayOutCallbackNeo(clientNamePayOut, payOutUrl)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar("Callback Updated Successfully", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Callback not Updated ", {
          variant: "error",
        });
      });
  };

  // adminPayOutUpdatePaycoon
  const adminPayOutUpdatePaycoon = () => {
    ApiRequestPost.updatePayOutCallbackPaycoon(clientNamePayOut, payOutUrl)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar("Callback Updated Successfully", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Callback not Updated ", {
          variant: "error",
        });
      });
  };

  const getAllServiceProviders = () => {
    ApiRequestGet.getAllSp()

      .then((res) => {
        if (res?.success) {
          setAllServiceProviders(res?.data.filter((e) => e.serviceType === "PAYIN"));
          setAllServiceProvidersPayOut(res?.data.filter((e) => e.serviceType === "PAYOUT"));
          setVFile(res?.data.filter((e) => e.serviceProviderName === "VOUCH"));
        } else {
          setAllServiceProviders([]);
        }
      })
      .catch((err) => {
        setAllServiceProviders([]);
      });
  };

  const getClientList = () => {
    ApiRequestGet.getAllClientListDropdown()
      .then((res) => {
        if (res.status) {
          setClientsName(res.data.reverse());
        } else {
          setClientsName([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setClientsName([]);
      });
  };

  const getClientListPayOut = () => {
    ApiRequestGet.getAllClientListDropdownPayOut()
      .then((res) => {
        if (res.status) {
          setClientsNamePayOut(res.data);
        } else {
          setClientsNamePayOut([]);
        }
      })
      .catch((err) => {
        setClientsNamePayOut([]);
      });
  };

  const getClientListById = (cId) => {
    ApiRequestGet.getClientByClientId(cId)
      .then((res) => {
        console.log("sp details:chv-> ", res);
        if (res.status) {
          setServiceType(res?.data);
          setClientPayoutSP(res?.data?.payoutServices);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const role = secureStorage.getItem("role");
    getAllServiceProviders();
    role === "Admin" && getClientList();
    role === "Admin" && getClientListPayOut();

    setRole(role);
    const cId = secureStorage.getItem("clientId");
    setClientId(cId);
    const sKey = secureStorage.getItem("secretKey");
    setSecretKey(sKey);
    role === "Client" && getClientListById(cId);
  }, []);

  return (
    <div style={{ width: "90%", backgroundColor: "" }}>
      <div>
        <Header heading={"Developers"} />
      </div>
      <div
        style={{
          marginRight: 10,
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "18px",
          boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
          margin: "10px 0px 0px 18px",
          lineHeight: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
            // background: "red",
          }}
        >
          {role === "Client" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <div>
                <p style={{ color: "black", fontWeight: "bold" }}>Client Details</p>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <p>Client Id:</p>
                <div
                  style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    padding: "10px",
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  {showClientId ? ClientId : "•••••••••••••••"}
                  {showClientId ? (
                    <VisibilityOffIcon
                      style={{ marginLeft: 10 }}
                      onClick={toggleClientIdVisibility}
                    />
                  ) : (
                    <VisibilityIcon style={{ marginLeft: 10 }} onClick={toggleClientIdVisibility} />
                  )}
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <p>Secret Key:</p>
                <div
                  style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    padding: "10px",
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  {showSecretKey ? secretKey : "•••••••••••••••"}
                  {showSecretKey ? (
                    <VisibilityOffIcon
                      style={{ marginLeft: 10 }}
                      onClick={toggleSecretKeyVisibility}
                    />
                  ) : (
                    <VisibilityIcon
                      style={{ marginLeft: 10 }}
                      onClick={toggleSecretKeyVisibility}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>API Documentation</p>

          <div>
            <p style={{ color: "#b7b9c2" }}>Service type</p>
            {/* <RadioButtons /> */}
            <div className="division" style={{ margin: 0 }}>
              <input
                type="radio"
                name="select"
                value="payIn"
                id="pay-in"
                onChange={() => {
                  setadminTogglePayOut(false);
                  setadminTogglePayIn(true);
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
                  setadminTogglePayOut(true);
                  setadminTogglePayIn(false);
                }}
              ></input>
              Pay-Out
            </div>
          </div>

          {adminTogglePayIn && (
            <div style={{ textDecoration: "none" }}>
              <p style={{ color: "#b7b9c2" }}>API Docs (Pay-In)</p>
              <a href={payinIntentDocument} download style={{ textDecoration: "none" }}>
                <p style={{ color: "#2645c3", cursor: "pointer" }}>
                  Download <img style={{ cursor: "pointer" }} src={DevelopersDownload} alt="icon" />
                </p>
              </a>
            </div>
          )}

          {adminTogglePayOut && (
            <div style={{ textDecoration: "none" }}>
              <p style={{ color: "#b7b9c2" }}>API Docs (Pay-Out)</p>

              <a href={payoutDocument} download style={{ textDecoration: "none" }}>
                <p style={{ color: "#2645c3", cursor: "pointer" }}>
                  Download <img style={{ cursor: "pointer" }} src={DevelopersDownload} alt="icon" />
                </p>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Developers;
