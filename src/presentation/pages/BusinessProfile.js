import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import secureStorage from "../../utility/secureStorage";

import { ProfileDetailsHeader } from "../../data/local/constants/TableHeaders";
import { ApiRequestGet } from "../../data/network/services/ApiRequestGet";

function BusinessProfile() {
 
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState("");
  const [data, setData] = useState([]);
  const [y, setY] = useState(false);

  const getClientLists = (page, size) => {
    ApiRequestGet.getClientListUpdate(page, size, clientId)
      .then((res) => {
        if (res.status) {
          setData(res.data.clients);
          setY(true);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  };

  useEffect(() => {
    const emailFromLogin = secureStorage.getItem("email");
    setEmail(emailFromLogin);

    const clientIdFromSS = secureStorage.getItem("clientId");
    setClientId(clientIdFromSS);
    getClientLists();
  }, [y]);
  return (
    <>
      <Header heading="Profile" />
      {/* <div
        style={{
          width: "50%",
          height: "400px",
          boxShadow: "1px 2px 3px 4px #c7c7c7",
          backgroundColor: "white",
          borderRadius: "5px",
          margin: "50px 0px 0px 300px",
          border: "1px solid white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bolder", marginTop:"10px",marginBottom:"10px" }}>Basic Details</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
        {ProfileDetailsHeader.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px",
                borderBottom: "1px solid lightgray",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontWeight: "bolder"}}>{item.label}</div>
              <div>{data[0]?.[item.key]}</div>
            </div>
          );
        })}
        </div>
      </div> */}
      
    </>
  );
}

export default BusinessProfile;
