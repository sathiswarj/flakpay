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
import logo from "../../../Assets/png/aanamaak_mart_logo.webp";

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
          secureStorage.setItem("password", password);
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
      .finally(() => { });
  };
  const getAllServiceProviderlist = () => {
    ApiRequestGet.getAllSp()
      .then((res) => {
        dispatch(addServiceProviderListAction(res?.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });
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
          width:"350px"
        }}
      >
        <h2
          style={{
            marginBottom: '30px',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          Welcome!
        </h2>
        <div
          style={{
            position: 'relative',
            marginBottom: '30px',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              background: 'none',
              border: 'none',
              borderBottom: '2px solid white',
              outline: 'none',
              color: 'white',
            }}
          />
          <label
            style={{
              position: 'absolute',
              left: '0',
              bottom: '10px',
              fontSize: email ? '14px' : '16px',
              color:'white',
              transform: email ? 'translateY(-30px)' : 'none',
              transition: '0.3s',
            }}
          >
            Email
          </label>
        </div>
        <div
          style={{
            position: 'relative',
            marginBottom: '15px',
          }}
        >
          <input
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              background: 'none',
              border: 'none',
              borderBottom: '2px solid white',
              outline: 'none',
              color: 'white',
            }}
          />
          <label
            style={{
              position: 'absolute',
              left: '0',
              bottom: '10px',
              fontSize: password ? '14px' : '16px',
              color:'white',
              transform: password ? 'translateY(-30px)' : 'none',
              transition: '0.3s',
            }}
          >
            Password
          </label>
          <div
            style={{
              position: 'absolute',
              right: '2px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {visible ? (
              <VisibilityIcon
                onClick={() => {
                  setType("text");
                  setVisible(false);
                  setVisibleOff(true);
                }}
                style={{ color: '#85497B' }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => {
                  setType("password");
                  setVisible(true);
                  setVisibleOff(false);
                }}
                style={{ color: '#85497B' }}
              />
            )}
          </div>
        </div>
        <div
          style={{
            textAlign: 'right',
            marginBottom: '30px',
          }}
        >
          <Link to="/ForgotPassword" style={{ textDecoration: "none" }}>
            <p
              style={{
                fontSize: "small",
                fontWeight: "bold",
                textAlign: "right",
                cursor: "pointer",
                textDecoration: "none",
                color: 'white',
              }}
            >
              Forgot Password ?
            </p>
          </Link>
        </div>
        <button
          style={{
            width: '50%',
            padding: '10px',
            fontSize: '16px',
            fontWeight:"bold",
            color: '#39B288',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={onClickLogin}
        >
          Login
        </button>
      </div>
    
    </div>
  );
}

export default Login;
