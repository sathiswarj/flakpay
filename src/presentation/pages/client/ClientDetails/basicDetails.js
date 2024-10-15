import React, { useState, useEffect, useCallback } from "react";
import SimpleCard from "../../../components/cards";
import ResizeListener from "../../../../utility/ResizeListener";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost";
import ButtonComponent from "../../../components/button";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { enqueueSnackbar } from "notistack";

const ClientBasicDetails = ({ data, headers, refreshData }) => {
  const { height } = ResizeListener();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleValueChange = useCallback((key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
    setIsDirty(true);
  }, []);

  const handleSaveClick = () => {
    console.log("Payload being sent to API:", formData);
    // Ensure we send all data including unchanged fields
    const { companyName, mobileNumber, address, pan, gst, email, websiteUrl } = formData;
    const clientId = data.clientId;
    if (mobileNumber.length !== 10) {
      enqueueSnackbar("Please enter a valid 10-digit mobile number.", { variant: "error" });
      return;
    }

    // API request to update client details
    ApiRequestPost.updateClientBasicDetails(
      clientId,
      companyName,
      mobileNumber,
      address,
      pan,
      gst,
      email,
      websiteUrl
    )
      .then((response) => {
        console.log("Data updated successfully");
        setIsEditing(false);
        setIsDirty(false);
        if (refreshData) {
          refreshData();
        }
      })
      .catch((error) => {
        console.error("Error updating data", error);
        alert("Failed to update data. Please try again.");
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: height * 0.6, overflowY: "auto" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10, marginRight: 10 }}>
        {isDirty && isEditing && (
          <IconButton onClick={handleSaveClick} style={{ color: "blue" }}>
            <SaveIcon />
          </IconButton>
        )}
        {isEditing && (
          <IconButton onClick={() => setIsEditing(false)} style={{ color: "blue" }}>
            <CancelIcon />
          </IconButton>
        )}
        {!isEditing && (
          <IconButton onClick={() => setIsEditing(true)} style={{ color: "blue" }}>
            <EditIcon />
          </IconButton>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {headers?.map((item) => (
          <SimpleCard
            key={item.key}
            label={item.label}
            value={formData[item.key]}
            type={item.type}
            style={{ width: 300 }}
            isEditing={isEditing}
            onChange={(value) => handleValueChange(item.key, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientBasicDetails;
