import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/button";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { enqueueSnackbar } from "notistack";
import CustomSelectComponenet from "../../components/CustomDropdown";
import { CustomInput } from "../../components/customInput/CustomInput";

function AddUserDetails({ onUserAdded }) {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const [roleDropdown, setRoleDropdown] = useState([
    { label: "Onboarding" },
    { label: "Settlement" },
  ]);

  const onClickAddUser = () => {
    if (!userName || !email || !mobileNo || !role) {
      enqueueSnackbar("Please fill out allfields", { variant: "error" });
      return;
    }
    if (mobileNo.length !== 10) {
      enqueueSnackbar("Please enter a valid 10-digit mobile number.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    ApiRequestPost.addUser(userName, email, role)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("User Added Successfully", {
            variant: "success",
          });
          onUserAdded();
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
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        marginBottom: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "70%",
          width: "100%",
          flexWrap: "wrap",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomInput
          type="input"
          value={userName}
          onChange={(value) => setUserName(value)}
          placeholder="Name"
          validator="name"
          isMandatory={true}
          error={"Enter valid Name"}
          inputStyles={{
            width: "350px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
        />
        <CustomInput
          type="input"
          value={email}
          onChange={(value) => setEmail(value)}
          placeholder="Email"
          validator="email"
          error={"Enter valid Email"}
          isMandatory={true}
          inputStyles={{
            width: "350px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
        />
        <CustomInput
          type="input"
          value={mobileNo}
          onChange={(value) => setMobileNo(value)}
          placeholder="Mobile No."
          validator="mobile"
          error={"* Enter Valid Mobile No."}
          isMandatory={true}
          inputStyles={{
            width: "350px",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px",
          }}
        />

        <CustomSelectComponenet
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
          }}
          data={roleDropdown}
          label="Role"
          style={{ width: 370, margin: 10 }}
        />
      </div>

      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          margin: 10,
          padding: 10,
        }}
      >
        <ButtonComponent label={"Submit"} onClick={onClickAddUser} />
      </div>
    </div>
  );
}

export default AddUserDetails;
