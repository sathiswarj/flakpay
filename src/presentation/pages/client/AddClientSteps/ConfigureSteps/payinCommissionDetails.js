import React from "react";
import InputComponent from "../../../../components/input";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSelectComponenet from "../../../../components/CustomDropdown";
import { CustomInput } from "../../../../components/customInput/CustomInput";

const PayinCommissionDetails = ({
  title,
  commissionType,
  setCommissionType,
  fixedCommissionValue,
  setFixedCommissionValue,
  fixedCommissionUnit,
  setFixedCommissionUnit,
  flatValue,
  setFlatValue,
  flatUnit,
  setFlatUnit,
  slabValues,
  handleSlabChange,
  addSlab,
  removeSlab,
  unitDropdown,
  disabled,
  setUnitDropdown,
  icon,
}) => (
  <div>
    <div style={{ marginBottom: 10, fontWeight: "bold" }}>{title} Commission:
    {icon && (
        <span style={{ marginLeft: 10 }}>
          {icon}
        </span>
      )}
    </div>
    <div style={{ marginBottom: 10 }}>Fixed Commission:</div>
    <div style={{ display: "flex", flexDirection: "row", marginLeft: 50, marginBottom: 10 }}>
      <CustomInput
        type="input"
        value={fixedCommissionValue}
        onChange={(value) => setFixedCommissionValue(value)}
        placeholder="Enter Value"
        validator="decimal"
        isMandatory={true}
        error={"Enter valid Amount"}
        inputStyles={{
          width: "100px",
          padding: "10px",
          borderRadius: "4px",
          margin: "10px",
        }}
        disabled={disabled}
      />
      <CustomSelectComponenet
        value={fixedCommissionUnit}
        onChange={(event) => {
          setFixedCommissionUnit(event.target.value);
        }}
        data={unitDropdown}
        label="Unit"
        style={{ width: 100, marginTop: 10 }}
        disabled={disabled}
      />
    </div>
    <div style={{ marginBottom: 10 }}>Transaction Commission:</div>
    <div style={{ marginLeft: 50, marginBottom: 10 }}>
      <label>
        <input
          type="radio"
          value="Flat"
          checked={commissionType === "Flat"}
          onChange={() => setCommissionType("Flat")}
        />
        Flat
      </label>
      <label style={{ marginLeft: 20 }}>
        <input
          type="radio"
          value="Slab"
          checked={commissionType === "Slab"}
          onChange={() => setCommissionType("Slab")}
        />
        Slab
      </label>
    </div>
    {commissionType === "Flat" && (
      <div style={{ display: "flex", flexDirection: "row", marginLeft: 50 }}>
        <CustomInput
          type="input"
          value={flatValue}
          onChange={(value) => setFlatValue(value)}
          placeholder="Enter Value"
          validator="decimal"
          isMandatory={true}
          error={"Enter valid Amount"}
          inputStyles={{
            width: "100px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
          disabled={disabled}
        />
        <CustomSelectComponenet
          value={flatUnit}
          onChange={(event) => {
            setFlatUnit(event.target.value);
          }}
          data={unitDropdown}
          label="Unit"
          style={{ width: 100, marginTop: 10 }}
          disabled={disabled}
        />
      </div>
    )}
    {commissionType === "Slab" && (
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 50, marginTop: 10 }}>
        {slabValues.map((slab, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
            <CustomInput
              type="input"
              value={slab.floor}
              onChange={(value) => handleSlabChange(index, "slabFloorValue", value)}
              placeholder="Floor Value"
              validator="decimal"
              isMandatory={true}
              error={"Enter valid Floor"}
              inputStyles={{
                width: "150px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
              disabled={disabled}
            />
            <CustomInput
              type="input"
              value={slab.ceil}
              onChange={(value) => handleSlabChange(index, "slabCeilValue", value)}
              placeholder="Ceiling Value"
              validator="decimal"
              isMandatory={true}
              error={"Enter valid Ceil"}
              inputStyles={{
                width: "150px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
              disabled={disabled}
            />

            <CustomInput
              type="input"
              value={slab.value}
              onChange={(value) => handleSlabChange(index, "commissionValue", value)}
              placeholder="Enter Value"
              validator="decimal"
              isMandatory={true}
              error={"Enter valid Value"}
              inputStyles={{
                width: "150px",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px",
              }}
              disabled={disabled}
            />
            <CustomSelectComponenet
              value={slab.unit}
              onChange={(e) => handleSlabChange(index, "commissionUnit", e.target.value)}
              data={unitDropdown}
              label="Unit"
              style={{ width: 100, marginTop: 10 }}
              disabled={disabled}
            />
            <IconButton onClick={addSlab} color="primary">
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => removeSlab(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PayinCommissionDetails;
