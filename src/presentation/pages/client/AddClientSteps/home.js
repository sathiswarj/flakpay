import { IconButton, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import BasicDetailsStep from "./basicDetailsStep";
import AddServiceProviderStep from "./configureServiceProvider";
import ButtonComponent from "../../../components/button";
import UploadPdfStep from "./uploadPdfStep";

const AddClientHome = () => {
  const navigate = useNavigate();
  const steps = ["Basic Details", "Configure Service Provider","Confirm"];
  const [clientId, setClientId] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div
        style={{
          margin: 25,
          boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
          height: "90%",
         overflowY: "auto",
        }}
      >
        {activeStep === 0 && (
          <BasicDetailsStep
            setClientId={setClientId}
            onClickNextStep={() => {
              setActiveStep(1);
            }}
          />
        )}
        {activeStep === 1 && (
          <AddServiceProviderStep
            clientId={clientId}
            onClickNextStep={() => {
              setActiveStep(2);
            }}
          />
        )}
        {/* {activeStep === 2 && (
          <UploadPdfStep
            onClickNextStep={() => {
              setActiveStep(3);
            }}
          />
        )} */}
        {activeStep === 2 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              color: "green",
            }}
          >
            Client Created Successfully!!
            <div style={{ marginTop: 50 }}>
              <ButtonComponent
                label={"Go to Client List"}
                onClick={() => {
                  navigate("/Client");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClientHome;
