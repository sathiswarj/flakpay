import React, { useState } from "react";
import secureStorage from "../../../utility/secureStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authAction, roleAction } from "../../../data/local/redux/action/authAction";
import { statusAction } from "../../../data/local/redux/action/statusAction";
import { useSnackbar } from "notistack";
import ResizeListener from "../../../utility/ResizeListener";
import {
  startFullScreenLoadingAction,
  stopFullScreenLoadingAction,
} from "../../../data/local/redux/action/fullScreenLoadingAction";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./index.css";
import { Link } from "react-router-dom";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import {
  addClientListAction,
  addServiceProviderListAction,
} from "../../../data/local/redux/action/clientActions";

function Login() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { height, width } = ResizeListener();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [visibleoff, setVisibleOff] = useState(false);
  const [type, setType] = useState("password");

  //

  //calling login Api
  const onClickLogin = () => {
    dispatch(startFullScreenLoadingAction());
    setLoading(true);

    ApiRequestPost.login(email, password)
      .then((data) => {
        console.log(data);
        if (data.success) {
          enqueueSnackbar(data.message, {
            variant: "success",
          });

          dispatch(statusAction(false));
          secureStorage.setItem("clientId", data?.data?.clientId);
          secureStorage.setItem("userId", data?.data?.userId);
          secureStorage.setItem("role", data?.data?.role);
          secureStorage.setItem("token", data?.data?.token);
          secureStorage.setItem("refreshToken", data?.data?.refreshToken);
          secureStorage.setItem("email", email);
          secureStorage.setItem("password",password);
          secureStorage.setItem("secretKey", data?.data?.secretKey);
          if (data?.data?.role === "Admin") {
            getAllClientList();
            getAllServiceProviderlist();
          }

          dispatch(roleAction(data?.data?.role));
          dispatch(authAction(true));
          if (data?.data?.role === "Onboarding") navigate("/Client");
          else navigate("/dashboard");
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
        setLoading(false);
      });
    setLoading(false);
  };

  const getAllClientList = () => {
    ApiRequestGet.getAllClientListDropdown()
      .then((res) => {
        dispatch(addClientListAction(res?.data?.clients));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const getAllServiceProviderlist = () => {
    ApiRequestGet.getAllSp()
      .then((res) => {
        dispatch(addServiceProviderListAction(res?.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  // useEffect(() => {
  //   onClickLogin()
  // }, [y]);

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
          background: " linear-gradient(to right, #680e86, #d979f7)",
        }}
      ></div>
      <div
        style={{
          width: width > 650 ? "50%" : "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height,
        }}
      >
        <p
          style={{
            fontWeight: "500",
            fontSize: 40,
            marginBottom: 40,
            color: "#1A202C",
            margin: 0,
          }}
          className="roboto"
        >
          LOGIN
        </p>
        <div style={{ marginTop: "25px", lineHeight: "30px" }}>
          <p style={{ margin: 0, color: "#202020", fontSize: "14px" }}>
            Email <span style={{ color: "#FC3629" }}> * </span>
          </p>
          <input
            onChange={handleEmailChange}
            value={email}
            style={{
              width: "400px",
              height: "35px",
              borderRadius: "7px",
              border: "1px solid #ABABAB",
              outlineStyle: "none",
              paddingLeft: "10px",
            }}
            type="text"
            placeholder="Enter Email Address"
          ></input>
        </div>
        <div
          style={{
            marginTop: "20px",
            lineHeight: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p style={{ margin: 0, color: "#202020", fontSize: "14px" }}>
              Password <span style={{ color: "#FC3629" }}> * </span>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "400px",
                height: "37px",
                borderRadius: "7px",
                border: "1px solid #ABABAB",
                paddingLeft: "10px",
              }}
            >
              <input
                style={{
                  width: "400px",
                  height: "34px",
                  borderRadius: "7px",
                  border: "1px solid #ABABAB",
                  outline: "none",
                  border: "none",
                }}
                onChange={(e) => setPassword(e.target.value)}
                type={type}
                placeholder="Enter Password"
              />

              {visible && (
                <VisibilityIcon
                  onClick={() => {
                    setType("text");
                    setVisible(false);
                    setVisibleOff(true);
                  }}
                />
              )}
              {visibleoff && (
                <VisibilityOffIcon
                  onClick={() => {
                    setType("password");
                    setVisible(true);
                    setVisibleOff(false);
                  }}
                  className="visibilityicon"
                />
              )}
              <div style={{ marginRight: 10 }} />
            </div>
          </div>
          <div style={{ width: "auto", maxWidth: 120 }}>
            <Link to="/ForgotPassword" style={{ textDecoration: "none" }}>
              <p
                style={{
                  fontSize: "small",
                  fontWeight: "bold",
                  textAlign: "right",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "blue",
                }}
              >
                Forgot Password ?
              </p>
            </Link>
          </div>
        </div>
        <button
          style={{
            width: "130px",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            background: " linear-gradient(to right, #9d25c5, #d26cf1)",
            color: "white",
            cursor: "pointer",
            marginLeft: "25px",
            marginTop: "20px",
          }}
          onClick={onClickLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
