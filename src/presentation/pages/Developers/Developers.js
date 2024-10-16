import React, { useEffect } from "react";
import DevelopersDownload from "../../../Assets/svg/developersDownload.svg";
import { useState } from "react";
import "./Developers.css";
import payinIntentDocument from "./Payin-v1.1.pdf";
import payoutDocument from "./Payout-v1.0.pdf"
import Header from "../../../presentation/components/Header";
import secureStorage from "../../../utility/secureStorage";
import { useSnackbar } from "notistack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Developers = (clientId) => {
  const { enqueueSnackbar } = useSnackbar();
  const [ClientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [role, setRole] = useState("Admin");

  const [adminTogglePayIn, setadminTogglePayIn] = useState(true);
  const [adminTogglePayOut, setadminTogglePayOut] = useState(false);

  const [showClientId, setShowClientId] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const toggleClientIdVisibility = () => setShowClientId(!showClientId);
  const toggleSecretKeyVisibility = () => setShowSecretKey(!showSecretKey);


  useEffect(() => {
    const role = secureStorage.getItem("role");
    setRole(role);
    const cId = secureStorage.getItem("clientId");
    setClientId(cId);
    const sKey = secureStorage.getItem("secretKey");
    setSecretKey(sKey);
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
          height:"300px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "20px",
          }}
        >
          {role === "Client" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
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
                <p style={{fontWeight:"bold"}}>Client Id:</p>
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
                <p style={{fontWeight:"bold"}}>Secret Key:</p>
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

          <div style={{marginLeft:40,width:"400px",height:"200px"}}>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>API Documentation</p>

            <table style={{ width: "100%",height:"80%", borderCollapse: "collapse",border: "1px solid #ddd" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px", backgroundColor: "#94959a", color: "#48494d",fontSize:"13px" }}>Service Type</th>
                  <th style={{ textAlign: "left", padding: "8px", backgroundColor: "#94959a", color: "#48494d",fontSize:"13px" }}>Download API Docs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "8px" }}>
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
                    />
                    &nbsp; Pay-In
                  </td>
                  <td style={{ padding: "8px" }}>
                    {adminTogglePayIn && (
                      <a href={payinIntentDocument} download style={{ textDecoration: "none" }}>
                        <span style={{ color: "#2645c3", cursor: "pointer" }}>
                          Download <img src={DevelopersDownload} alt="icon" style={{ cursor: "pointer" }} />
                        </span>
                      </a>
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="radio"
                      name="select"
                      value="payOut"
                      id="pay-out"
                      onChange={() => {
                        setadminTogglePayOut(true);
                        setadminTogglePayIn(false);
                      }}
                      style={{ cursor: "pointer", accentColor: "blue" }}
                    />
                    &nbsp; Pay-Out
                  </td>
                  <td style={{ padding: "8px" }}>
                    {adminTogglePayOut && (
                      <a href={payoutDocument} download style={{ textDecoration: "none" }}>
                        <span style={{ color: "#2645c3", cursor: "pointer" }}>
                          Download <img src={DevelopersDownload} alt="icon" style={{ cursor: "pointer" }} />
                        </span>
                      </a>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
