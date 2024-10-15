import { connect, useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { SS_REF_HASH_ID, SS_TOKEN } from "../data/local/constants/secureStorageManager";
import { authAction } from "../data/local/redux/action/authAction";
import secureStorage from "../utility/secureStorage";
import { clearLocalStorageTimer } from "../utility/timerToClearStorage";

import SPPayin from "../presentation/pages/serviceProviderList/SPPayin";
import SPPayout from "../presentation/pages/serviceProviderList/SPPayout";
import WalletDetails from "../presentation/pages/serviceProviderList/WalletDetails";
import Dashboard from "../presentation/pages/dashboard/dashBoard";
import PayoutDashboard from "../presentation/pages/dashboard/payoutDashboard";
import Client from "../presentation/pages/client";
import Developers from "../presentation/pages/Developers/Developers";
import PayInTransaction from "../presentation/pages/Transaction/Payin/index";
import PayOut from "../presentation/pages/Transaction/Payout/index";
import ChangePassword from "../presentation/pages/ChangePassword";
import Login from "../presentation/pages/Login/index";
import ForgotPassword from "../presentation/pages/Login/ForgotPassword";
import ResetPassword from "../presentation/pages/Login/ResetPassword";
import PayoutBalance from "../presentation/pages/serviceProviderList/PayoutBalance";
import ServiceProviders from "../presentation/pages/serviceProviders";
import AddClientPage from "../presentation/pages/client/AddClientSteps/home";
import SettlementTransaction from "../presentation/pages/Transaction/SettlementTransactions";
import AddManualSettlement from "../presentation/pages/Transaction/SettlementTransactions/manualSettlement";
import User from "../presentation/pages/user";
import ProfileSection from "../presentation/pages/ProfileSection";

import FundTransfer from "../presentation/pages/fundTransfer";
import WalletTransaction from "../presentation/pages/Transaction/Wallet";
import PrefundTransaction from "../presentation/pages/Transaction/Prefund";

const Router = ({ isAuthenticated, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showResetPassPage, setShowResetPassPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetCode, setResetCode] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const checkAuthenticatedOnReload = () => {
    const token = secureStorage.getItem(SS_TOKEN);
    const hashId = secureStorage.getItem(SS_REF_HASH_ID);
    if (token && hashId) {
      // console.log("Check....")
      dispatch(authAction(true));
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/forgotpassword/" && searchParams.get("code")) {
      setResetCode(searchParams.get("code"));
      setResetEmail(searchParams.get("email"));
      console.log("Reset code -> ", searchParams.get("code"));
      console.log("Path -> ", window.location.pathname);

      setShowResetPassPage(true);
    } else {
      setShowResetPassPage(false);
      checkAuthenticatedOnReload();
    }
  }, []);

  useEffect(() => {
    dispatch(clearLocalStorageTimer(navigate));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Routes>
          {role === "Admin" || role === "Client" ? (
            <>
              <Route path="*" element={<Navigate replace to="/Dashboard" />} />
              <Route exact path="/Dashboard" element={<Dashboard />} />
              <Route exact path="/ServiceProviders" element={<ServiceProviders />} />
              <Route exact path="/User" element={<User />} />
              <Route exact path="/Client" element={<Client />} />
              <Route exact path="/AddClient" element={<AddClientPage />} />
              <Route exact path="/Payintransaction" element={<PayInTransaction />} />
              <Route exact path="/SettlementTransaction" element={<SettlementTransaction />} />
              <Route exact path="/ManualSettlement" element={<AddManualSettlement />} />
              <Route exact path="/WalletTransactions" element={<WalletTransaction />} />
              <Route exact path="/PrefundTransactions" element={<PrefundTransaction />} />
              <Route exact path="/Payouttransactions" element={<PayOut />} />
              <Route exact path="/RevenueTransactions" element={<PayOut />} />
              <Route exact path="/Developers" element={<Developers />} />
              <Route exact path="/Fund Transfer" element={<FundTransfer />} />
              <Route exact path="/ProfileSection" element={<ProfileSection />} />
              <Route exact path="/ChangePassword" element={<ChangePassword />} />
              <Route exact path="/Service-Provider-Payin" element={<SPPayin />} />
              <Route exact path="/Service-Provider-Payout" element={<SPPayout />} />
              <Route exact path="/wallet" element={<WalletDetails />} />
              <Route exact path="/Payout-Balance" element={<PayoutBalance />} />
            </>
          ) : role === "Onboarding" ? (
            <>
              <Route path="*" element={<Navigate replace to="/Client" />} />
              <Route exact path="/Client" element={<Client />} />
              <Route exact path="/AddClient" element={<AddClientPage />} />
              <Route exact path="/ServiceProviders" element={<ServiceProviders />} />
              <Route exact path="/ProfileSection" element={<ProfileSection />} />
              <Route exact path="/ChangePassword" element={<ChangePassword />} />
            </>
          ) : (
            <></>
          )}
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate replace to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    role: state.AuthReducer.role,
  };
};
export default connect(mapStateToProps)(Router);
