import React, { useEffect, useState } from "react";
import PayOutChart from "./payoutChart";
import "./dashBoard.css";
import yellow from "../../../Assets/svg/yellowdowloadIcon.svg";
import blue from "../../../Assets/svg/BluedownloadIcon.svg";
import bluedot from "../../../Assets/svg/bluedot.svg";
import yellowdot from "../../../Assets/svg/yellowdot.svg";
import Header from "../../../presentation/components/Header/index";
import secureStorage from "../../../utility/secureStorage";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";

function PayoutDashboard() {
  const [role, setRole] = useState("");

  const [getSPByClientId, setGetSPByClientId] = useState([]);
  const closeClientPayInGetArgs = (args) => {};
  function clientPayInGetArgs() {}

  const clientFilterGetClientByServiceProvider = () => {};
 
  const clientFilterGetClientByClient = () => {};

  const getClientListById = (clientId) => {
    ApiRequestGet.getClientByClientId(clientId)
      .then((res) => {
        console.log("sp details:123-> ", res);
        if (res.status) {
          setGetSPByClientId(res?.data?.payoutServices);
        } else {
          setGetSPByClientId([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    const cId = secureStorage.getItem("clientId");
    const rl = secureStorage.getItem("role");

    setRole(rl);

    rl === "Client" && getClientListById(cId);
  }, []);
  return (
    <>
      {/* <Header
        closeClientPayInGetArgs={closeClientPayInGetArgs}
        clientPayInGetArgs={clientPayInGetArgs}
        //
        clientFilterGetClientByServiceProvider={
          clientFilterGetClientByServiceProvider
        }
        clientFilterGetClientByClient={clientFilterGetClientByClient}
        hName="Payout"

        //
      /> */}
      <Header heading={"Payout"} />
      <div className="dashboardcenter">
        <div
          style={{
            width: "100%",
            height: "20vh",
            backgroundColor: "#F2F0F0",
            color: "#000000",
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "20px",
          }}
        >
          <div className="container3">
            <div>Total Loaded Amount</div>
            <div className="con4"></div>
            <div className="con_value">
              <img
                style={{ width: "35px", height: "40px" }}
                src={blue}
                alt="yellow"
              />
              <text>₹ {Math.random() * 0}</text>
            </div>
          </div>

          <div className="container1">
            <div>Today Loaded Amount</div>
            <div className="con4"></div>
            <div className="con_value">
              <img
                style={{ width: "35px", height: "40px" }}
                src={blue}
                alt="yellow"
              />
              <text>₹ {Math.random() * 0}</text>
            </div>
          </div>

          <div className="container2">
            <div>Total Disbursement Amount</div>
            <div className="con5"> </div>
            <div className="con_value">
              <img
                style={{ width: "35px", height: "40px" }}
                src={yellow}
                alt="yellow"
              />
              <text>₹ {0}</text>
            </div>
          </div>

          <div className="container3">
            <div>Today Disbursement Amount</div>
            <div className="con5"> </div>
            <div className="con_value">
              <img
                style={{ width: "35px", height: "40px" }}
                src={yellow}
                alt="yellow"
              />
              <text>₹ {Math.random() * 0}</text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "#F2F0F0",
            justifyContent: "flex-end",
            padding: "0px 60px 0px 60px",
            color: "#111111",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/*  */}
            {role === "Client" && (
              <select
                onChange={(e) => {}}
                style={{
                  cursor: "pointer",
                  height: 22,
                  background: "white",
                  color: "#ababab",
                  border: "1px solid #ababab",
                  textTransform: "capitalize",
                  fontSize: 10,
                  borderRadius: 3,
                  fontSize: 15,
                  borderRadius: 5,
                  width: 110,
                  fontWeight: "600",
                  marginRight: 3,
                }}
              >
                <option value="" disabled selected>
                  Payout
                </option>

                {getSPByClientId?.map((e) => (
                  <>
                    <option value={e.serviceProviderId}>
                      {e.serviceProviderName === "FINO"
                        ? "PayOut 1.0"
                        : e.serviceProviderName === "ZYRO"
                        ? "PayOut 2.0"
                        : e.serviceProviderName === "VOUCH"
                        ? "PayOut 3.0"
                        : e.serviceProviderName === "PARB-PAYOUT"
                        ? "PayOut 4.0"
                        : ""}
                    </option>
                  </>
                ))}
              </select>
            )}

            {/*  */}
            <select
              style={{
                height: "22px",
                color: "#ABABAB",

                borderRadius: "5px",
                outline: "none",
                borderColor: "#ABABAB",
                marginRight: "10px",
                fontWeight: "600",
              }}
            >
              <option value="" disabled selected>
                {" "}
                Select year{" "}
              </option>
              <option value="2023">2023</option>
              <option value="2023">2024</option>
            </select>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // marginLeft: "700px",
                gap: "5px",
              }}
            >
              <img src={bluedot} alt=""></img>
              <h5 style={{ color: "#ABABAB", marginRight: "10px" }}>
                Loaded Amount
              </h5>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // marginRight: "70px",
                gap: "5px",
              }}
            >
              <img src={yellowdot} alt=" "></img>
              <h5 style={{ color: "#ABABAB" }}>Disbursement</h5>
            </div>
          </div>
        </div>
        <div className="payin">
          <h5
            style={{
              writingMode: "vertical-rl",
              color: "#111111",
              textOrientation: "sideways",
              marginTop: "150px",
            }}
          >
            Total Volume
          </h5>

          <PayOutChart />
        </div>
      </div>
    </>
  );
}
export default PayoutDashboard;
