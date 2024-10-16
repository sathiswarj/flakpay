import React from "react";
import "./index.css";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import ResizeListener from "../../../utility/ResizeListener";
import { useNavigate } from "react-router";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import logo from "../../../Assets/png/aanamaak_mart_logo.webp";

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
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: "'Poppins', sans-serif",
      justifyContent: 'center', 
      alignItems: 'center',
    }}
    > 
       <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <img
          src={logo}
          alt="Company Logo"
          style={{ width: '250px', height: 'auto' }} 
        />
      </div>
      <div
        style={{
           background: '#03A176',
          padding: '40px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          width:"350px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
          <h2
          style={{
            marginBottom: '30px',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          Forgot password?
        </h2>
        <div
          style={{
            position: 'relative',
            marginBottom: '30px',
          }}
        >
          <input
            style={{
              width: "350px",
              paddingLeft: 15,
              height: "35px",
              borderRadius: "5px",
              border: "1px solid #03A176",
              outline:"#03A176"
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
              cursor: "pointer",
              fontSize: "small",
              fontWeight: "bold",
              textAlign: "right",
              textDecoration: "none",
              color: "white",
            }}
          >
            Remember your passsword? Login here
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
            borderRadius: "10px",
            border: "none",
            background: "white",
            color: "#03A176",
            fontWeight: "bold",
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
