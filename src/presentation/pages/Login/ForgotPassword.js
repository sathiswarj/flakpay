import React from "react";
import "./index.css";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import ResizeListener from "../../../utility/ResizeListener";
import { useNavigate } from "react-router";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { height, width } = ResizeListener();
  const navigate = useNavigate();

  const onClickForgotPassword = () => {
    ApiRequestPost.sendOtpForForgotPassword(email)
      .then((data) => {
        if (data.success) {
          enqueueSnackbar("Reset password link sent to you mail ID", {
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
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._@-]*$/;
    if (emailRegex.test(value)) {
      setEmail(value);
    }
  };

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
          gap: "80px",
        }}
      >
        <div style={{ fontSize: "35px", fontWeight: "bold", marginLeft: "" }}>FORGOT PASSWORD</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ color: "" }}>Email</p>
          <input
            style={{
              width: "400px",
              paddingLeft: 15,
              height: "35px",
              borderRadius: "5px",
              border: "1px solid #ABABAB",
            }}
            type="text"
            placeholder="Enter Email Address"
            onChange={handleEmailChange}
            value={email}
          ></input>
          <div
            onClick={() => navigate("login")}
            style={{
              paddingTop: 10,
              display: "flex",
              alignSelf: "flex-end",
              cursor: "pointer",
              fontSize: "small",
              fontWeight: "bold",
              textAlign: "right",
              textDecoration: "none",
              color: "blue",
            }}
          >
            Remembered the passsword? login here
          </div>
        </div>

        <button
          onClick={() => {
            if (email !== "") {
              onClickForgotPassword();
            } else {
              enqueueSnackbar("Please enter email ID", {
                variant: "error",
              });
            }
          }}
          style={{
            width: "130px",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "black",
            fontWeight: "",
            marginLeft: "140px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
