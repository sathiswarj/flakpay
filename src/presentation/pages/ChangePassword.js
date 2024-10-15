import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authAction } from "../../data/local/redux/action/authAction";
import { useSnackbar } from "notistack";
import Header from "../components/Header";
import { ApiRequestPost } from "../../data/network/services/ApiRequestPost";
import InputComponent from "../components/input";
import ButtonComponent from "../components/button";
import secureStorage from "../../utility/secureStorage";

function ChangePassword() {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const changePassword = () => {
    ApiRequestPost.changePassword(oldPass, newPass)
      .then((data) => {
        console.log(data);
        const userId = secureStorage.getItem("userId");
        console.log("uSERID :", userId)
        if (data.success) {
          enqueueSnackbar(data.message, {
            variant: "success",
          });
          setOldPass("");
          setNewPass("");
          setConfirmNewPass("");

          dispatch(authAction(true));
          navigate("/dashboard");
        } else {
          enqueueSnackbar(data.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {});
  };
  return (
    <div>
      <div>
        <Header heading="Change Password" />
      </div>
      <div
        style={{
          width: "45%",
          backgroundColor: "white",
          borderRadius: "20px",
          margin: "20px 0px 0px 250px",
          boxShadow: "1px 2px 3px 4px #d9d9d9",
          padding: "20px"
        }}
      >
        <div style={{ fontWeight: "bold"}}> Change Password</div>

        <div style={{
          display: "flex",
          height: "70%",
          width: "100%",
          flexDirection:"column",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "space-around",
        }}>
         <div style={{ width: "70%", marginBottom: "30px" }}>
            <InputComponent
              type="password"
              value={oldPass}
              onChange={(value) => setOldPass(value)}
              placeholder="Enter Old Password"
              style={{ width: "100%", height: "50px" }} // Custom width and height
            />
          </div>
          <div style={{ width: "70%", marginBottom: "30px" }}>
        <InputComponent
          type="password"
          value={newPass}
          onChange={(value) => setNewPass(value)}
          placeholder="Enter New Password"
          style={{ width: "100%", height: "50px" }}
        />
        </div>
        <div style={{ width: "70%", marginBottom: "30px" }}>
        <InputComponent
          type="password"
          value={confirmNewPass}
          onChange={(value) => setConfirmNewPass(value)}
          placeholder="Enter Confirm Password"
          style={{ width: "100%", height: "50px" }}
        />
        </div>
        <ButtonComponent label={"Submit"} onClick={changePassword} />
        </div>

      </div>
    </div>
  );
}

export default ChangePassword;
