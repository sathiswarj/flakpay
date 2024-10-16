import React from "react";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import secureStorage from "../../../utility/secureStorage";
import { ProfileDetailsHeader } from "../../../data/local/constants/TableHeaders";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import Card from "./card";

function ProfileSection() {
  const [data, setData] = useState([]);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const getClientLists = (clientId) => {
    ApiRequestGet.getClientByClientId(clientId)
      .then((res) => {
        console.log("Data -> ", res);
        if (res.status) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  };

  useEffect(() => {
    const clientIdFromSS = secureStorage.getItem("clientId");
    getClientLists(clientIdFromSS);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        border: "1px solid #ccc", // Border box styling
        padding: "20px", // Add some padding inside the border
        borderRadius: "8px", // Optional: border radius for rounded corners
      }}
    >
      <Header heading="Profile" />
      
    

      {/* Cards Section - Two cards in a row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {ProfileDetailsHeader.map((item) => {
          return (
            <div
              key={item.key}
              style={{
                flex: "1 1 calc(45% - 10px)", // Each card takes up 45% width minus the gap
                maxWidth: "450px", // Set a maximum width for the cards
                marginBottom: "10px", // Add some margin for spacing between rows
              }}
            >
              <Card label={item.label} value={data[item.key]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileSection;
