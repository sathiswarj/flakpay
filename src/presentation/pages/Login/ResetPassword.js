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
import logo from "../../../Assets/png/aanamaak_mart_logo.webp";

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
          Reset Password
        </h2>
        <div style={{ textAlign:"left", lineHeight: "3px",marginBottom:"10px" }}>
          <p style={{ color: "white",fontWeight:"bold" }}>New Password</p>
          <div
            style={{
              width: "350px",
              height: "35px",
              borderRadius: "5px",
              border: "1px solid #ABABAB",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              paddingRight: 15,
              backgroundColor:"white"
            }}
          >
            <input
              style={{
                width: "370px",
                height: "32px",
                border: "none",
                outline: "none",
                paddingLeft: 15,
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
                style={{ color: '#85497B' }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => {
                  setShowPassword(true);
                }}
                className="visibilityicon"
                style={{ color: '#85497B' }}
              />
            )}
          </div>
        </div>
       <div style={{ textAlign:"left", lineHeight: "3px",marginBottom:"10px" }}>
        <p style={{ color: "white",fontWeight:"bold" }}>Confirm Password</p>
          <div
            style={{
              width: "350px",
              height: "35px",
              borderRadius: "5px",
              border: "1px solid #ABABAB",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              paddingRight: 15,
              backgroundColor:"white"
            }}
          >
            <input
              style={{
                width: "370px",
                height: "32px",
                border: "none",
                outline: "none",
                paddingLeft: 15,
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
                style={{ color: '#85497B' }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => {
                  setShowConfirmPassword(true);
                }}
                className="visibilityicon"
                style={{ color: '#85497B' }}
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
            background: "white",
            color: "#03A176",
            marginTop: "45px",
            cursor: "pointer",
            fontWeight:"bold",
            fontSize:"15px"
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
