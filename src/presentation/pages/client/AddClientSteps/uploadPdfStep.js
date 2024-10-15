import React, { useState } from "react";
import { IconButton, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComponent from "../../../components/button";

const UploadPdfStep = ({ onClickNextStep }) => {
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    const errorMessage = validateFile(file);

    if (errorMessage) {
      setErrors({
        ...errors,
        [fileType]: errorMessage,
      });
      setFiles({
        ...files,
        [fileType]: null,
      });
    } else {
      setErrors({
        ...errors,
        [fileType]: null,
      });
      setFiles({
        ...files,
        [fileType]: file,
      });
    }
  };

  const handleFileRemove = (fileType) => {
    const newFiles = { ...files };
    const newErrors = { ...errors };
    delete newFiles[fileType];
    delete newErrors[fileType];
    setFiles(newFiles);
    setErrors(newErrors);
  };

  const validateFile = (file) => {
    if (!file) return "No file selected";
    if (file.type !== "application/pdf") return "File type must be PDF";
    if (file.size > 5 * 1024 * 1024) return "File size exceeds 5MB";
    return null;
  };

  const renderFileInput = (label, fileType) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 20, }}>
      <Typography style={{ width: "40%", fontWeight:"bold" }}>{label}</Typography>
      <div style={{ display: "flex", alignItems: "center", width: "70%" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => handleFileChange(e, fileType)}
        style={{ display: "none" }}
        id={`file-input-${fileType}`}
      />
      <label htmlFor={`file-input-${fileType}`} >
        <Button
          variant="contained"
          component="span"
          style={{width:200}}
        >
           {files[fileType]
          ? `${files[fileType].name.slice(0, 10)}`
          : "Choose File"}
        </Button>
      </label>
      {files[fileType] && (
        <IconButton
          color="secondary"
          onClick={() => handleFileRemove(fileType)}
        >
          <CloseIcon />
        </IconButton>
      )}
    </div>
      {errors[fileType] && (
        <Typography color="error" style={{ marginLeft: 10 }}>
          {errors[fileType]}
        </Typography>
      )}
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",padding: 20,marginRight:60, }}>
      {renderFileInput("Upload Signed SLA * :", "sla")}
      {renderFileInput("Upload PAN card * :", "panCard")}
      {renderFileInput("Upload GST certificate * :", "gstCertificate")}
      {renderFileInput("Upload Incorporation certificate * :", "incorporationCertificate")}
      {renderFileInput("Upload NDA certificate * :", "ndaCertificate")}
      {renderFileInput("Upload cancelled Cheque * :", "cancelledCheque")}
      {renderFileInput("Upload KYC of the signing authority * :", "kycAuthority")}
      {renderFileInput("Upload Memorandum of Association * :", "memorandumAssociation")}
      {renderFileInput("Upload Article of Association * :", "articleAssociation")}
      {renderFileInput("Upload Merchant Approval Form * :", "merchantApprovalForm")}
      <div style={{ display: "flex", justifyContent: "end", marginTop: 20 }}>
        <ButtonComponent
          label={"Next"}
          onClick={onClickNextStep}
          
        />
      </div>
    </div>
  );
};

export default UploadPdfStep;
