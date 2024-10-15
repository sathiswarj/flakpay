import React, { useEffect, useState } from "react";
import "./index.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ResizeListener from "../../../utility/ResizeListener";
import { startFullScreenLoadingAction, stopFullScreenLoadingAction } from "../../../data/local/redux/action/fullScreenLoadingAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";
import { useLocation, useSearchParams } from 'react-router-dom';
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";

function ResetPassword() {
  const { height, width } = ResizeListener();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [refCode, setRefCode] = useState("");

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onClickResetPassword = async () => {

    if(password !== confirmPassword) {
      console.log("onClickResetPassword")
      enqueueSnackbar("Password and Confirm Password should be same!", {
        variant: "error",
      });
      return
    }

    dispatch(startFullScreenLoadingAction());
    ApiRequestPost.resetPassword(email, refCode, password)
      .then((data) => {
        if (data.success) {
          enqueueSnackbar(data.message, {
            variant: "success",
          });
          navigate("/login");
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
      .finally(() => {
        dispatch(stopFullScreenLoadingAction());
      });
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setEmail(params.get('email'))
    setRefCode(params.get('code'))
  }, [])

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: width > 650 ? "row" : "column",
        flexDirection: "row",
        height: height,
      }}
    >
      <div
        style={{
          width: width > 650 ? "50%" : "100%",
          display: width > 650 ? "flex" : "none",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "150px",
          marginLeft: "170px",
          gap: "10px",
        }}
      >
        <div
          style={{ fontSize: "35px", fontWeight: "bold", marginLeft: "25px" }}
        >
          RESET PASSWORD
        </div>
        <div style={{ marginTop: "50px", lineHeight: "3px" }}>
          <p style={{ color: "" }}>New Password</p>
          <div
            style={{
              width: "400px",
              height: "35px",
              borderRadius: "5px",
              border: "1px solid #ABABAB",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              paddingRight: 15,
            }}
          >
            <input
              style={{
                width: "370px",
                height: "32px",
                border: "none",
                outline: "none",
                paddingLeft: 15,
                backgroundColor: "transparent",
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => {setPassword(e.target.value)}}
            ></input>

            {showPassword ? (
              <VisibilityIcon
                onClick={() => {
                  setShowPassword(false);
                }}
                className="visibilityicon"
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => {
                  setShowPassword(true);
                }}
                className="visibilityicon"
              />
            )}
          </div>
        </div>
        <div style={{ lineHeight: "3px" }}>
          <p>Confirm Password</p>
          <div
            style={{
              width: "400px",
              height: "35px",
              borderRadius: "5px",
              border: "1px solid #ABABAB",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              paddingRight: 15,
            }}
          >
            <input
              style={{
                width: "370px",
                height: "32px",
                border: "none",
                outline: "none",
                paddingLeft: 15,
                backgroundColor: "transparent",
              }}
              onChange={(e) => {setConfirmPassword(e.target.value)}}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Password"
            ></input>

            {showConfirmPassword ? (
              <VisibilityIcon
                onClick={() => {
                  setShowConfirmPassword(false);
                }}
                className="visibilityicon"
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => {
                  setShowConfirmPassword(true);
                }}
                className="visibilityicon"
              />
            )}
          </div>
        </div>
        <button
          style={{
            width: "150px",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "white",
            marginTop: "45px",
            marginLeft: "140px",
            cursor: "pointer",
          }}
          onClick={onClickResetPassword}
        >
          Change password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
