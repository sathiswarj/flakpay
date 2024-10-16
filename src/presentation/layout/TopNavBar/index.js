import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ResizeListener from "../../../utility/ResizeListener";
import { authAction } from "../../../data/local/redux/action/authAction";
import secureStorage from "../../../utility/secureStorage";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { LogoFinal } from "../../resources/assetsManager";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";

const TopNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width, height } = ResizeListener();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickStateEnabled, setClickStateEnabled] = useState(false);

  const fetchWalletBalance = () => {
    setIsLoading(true);
    ApiRequestGet.getClientPayoutBalance()
      .then((res) => {
        if (res.data.balance) {
          setWalletBalance(res.data.balance);
        }
      })
      .catch((err) => {
        enqueueSnackbar("Error fetching wallet balance", { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    ApiRequestPost.logout()
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Logout Successfully", {
            variant: "success",
          });
          secureStorage.clear();
          navigate("/login");
          dispatch(authAction(false));
        }
      })
      .catch((err) => {})
      .finally((res) => {
        secureStorage.clear();
        navigate("/login");
        dispatch(authAction(false));
      });
  };

  useEffect(() => {
    let email = secureStorage.getItem("email");
    const roleFromStorage = secureStorage.getItem("role");
    if (roleFromStorage) {
      setRole(roleFromStorage);
    }

    let extract = email.charAt(0).toUpperCase();
    setEmail(extract);
    if (roleFromStorage === "Client") {
      fetchWalletBalance();
    }
  }, []);

  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // background: "linear-gradient(to right, #732375, #feb47b)",
        borderBottom: "1px solid grey",
      }}
    >
      <img style={{ width: 150, marginLeft: 20, margin: 10 }} src={LogoFinal} />
      <div style={{ marginRight: 30, display: "flex", alignItems: "center" }}>
        {role === "Client" && (
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 30 }}
          >
            <div
              style={{
                marginRight: 5,
                fontSize: "16px",
                color: "green",
                fontWeight: "bold",
              }}
            >
              Payout Balance: ₹
              {walletBalance !== null ? walletBalance : "Loading..."}
            </div>
            <RefreshIcon
              style={{
                cursor: "pointer",
                color: "blue",
              }}
              onClick={fetchWalletBalance}
            />
          </div>
        )}
        <div
          onMouseDown={() => setClickStateEnabled(true)}
          onMouseUp={() => setClickStateEnabled(false)}
          style={{
            marginRight: 30,
            borderRadius: 50,
            height: 20,
            width: 20,
            backgroundColor: "#64C466",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "1px solid green",
            padding: 10,
            boxShadow: clickStateEnabled
              ? "0 0 10px rgba(33, 172, 131, 0.8)" // Glowing effect on click
              : "none",
          }}
          onClick={() => setShowPopup(!showPopup)}
        >
          {email}
        </div>
      </div>
      {/* {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "30px",
            backgroundColor: "white",
            border: "1px solid grey",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => logout()}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "black",
            }}
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      )} */}
    </div>
  );
};

export default TopNavBar;
