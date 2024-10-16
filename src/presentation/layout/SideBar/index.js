import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutIcon from "@mui/icons-material/Logout"; // Add Logout Icon
import {
  adminSideBarData,
  clientSideBarData,
  onboardingSideBarData,
  settlementSideBarData,
} from "../NavData";
import secureStorage from "../../../utility/secureStorage";
import styles from "./sidenav.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { enqueueSnackbar } from "notistack"; // Snackbar for notifications
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { useDispatch } from "react-redux";
import { authAction } from "../../../data/local/redux/action/authAction";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [navData, setNavData] = useState(adminSideBarData);
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after logout
  const dispatch = useDispatch(); // For managing auth state

  const toggleOpen = () => {
    setOpen(!open);
  };

  // Logout Functionality
  const logout = () => {
    ApiRequestPost.logout()
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Logout Successfully", { variant: "success" });
          secureStorage.clear();
          navigate("/login");
          dispatch(authAction(false));
        }
      })
      .catch(() => {
        enqueueSnackbar("Logout Failed", { variant: "error" });
      })
      .finally(() => {
        secureStorage.clear();
        navigate("/login");
        dispatch(authAction(false));
      });
  };

  useEffect(() => {
    const role = secureStorage.getItem("role");
    setNavData(
      role === "Admin"
        ? adminSideBarData
        : role === "Client"
        ? clientSideBarData
        : role === "Onboarding"
        ? onboardingSideBarData
        : role === "Settlement"
        ? settlementSideBarData
        : []
    );
    setSelectedItem(0);
  }, []);

  const getSelectedIndex = (pathName) => {
    navData.forEach((item) => {
      if (item.link === pathName) {
        setSelectedItem(item.id);
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.link === pathName) {
            setSelectedItem(child.id);
          }
        });
      }
    });
  };

  const handleClick = (id) => {
    setSelectedItem(id);
    if (navData[id]?.children) {
      setOpenDropdowns((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  useEffect(() => {
    getSelectedIndex(location.pathname);
  }, [location]);

  const isChildSelected = (children) => {
    return children?.some((child) => child.id === selectedItem);
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        {/* Add toggle button if needed */}
      </div>

      {/* Sidebar Navigation Items */}
      {navData.map((item) => (
        <div key={item.id}>
          <NavLink
            to={item.link}
            onClick={() => handleClick(item.id)}
            style={{
              textDecoration: "none",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              width: open ? "180px" : "50px",
              padding: 5,
              margin: 10,
              borderRadius: 5,
              background:
                selectedItem === item.id || isChildSelected(item.children)
                  ? "#64C466"
                  : "transparent",
            }}
            className={`${styles.navLink} ${
              selectedItem === item.id || isChildSelected(item.children)
                ? "active"
                : ""
            }`}
          >
            <i>{item.icon}</i>
            {open && (
              <>
                <span className={styles.linkText}>{item.text}</span>
                {item.children && (
                  <i
                    className={`${styles.fadeIcon} ${
                      openDropdowns[item.id] ? styles.open : styles.closed
                    }`}
                    style={{ marginLeft: "auto" }}
                  >
                    {openDropdowns[item.id] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </i>
                )}
              </>
            )}
          </NavLink>

          {item.children && (
            <div
              className={`${styles.dropdownContainer} ${
                openDropdowns[item.id] ? styles.dropdownOpen : ""
              }`}
            >
              {item.children.map((child) => (
                <NavLink
                  key={child.id}
                  to={child.link}
                  onClick={() => handleClick(child.id)}
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    width: open ? "150px" : "50px",
                    padding: 12,
                    marginLeft: open ? "30px" : "5px",
                    borderRadius: 5,
                    background:
                      selectedItem === child.id ? "#449046" : "transparent",
                    justifyContent: open ? " " : "left",
                  }}
                  className={`${styles.navLink} ${
                    selectedItem === child.id ? "active" : ""
                  }`}
                >
                  <i>{child.icon}</i>
                  {open && (
                    <span className={styles.linkText}>{child.text}</span>
                  )}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Add Logout Button at the Bottom of Sidebar */}
      <div style={{ marginTop: "auto" }}>
        <NavLink
          onClick={logout} // Attach logout function
          style={{
            textDecoration: "none",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            width: open ? "180px" : "50px",
            padding: 5,
            margin: 10,
            borderRadius: 5,
            background: "transparent",
            cursor: "pointer",
          }}
          className={styles.navLink}
        >
          <LogoutIcon style={{ marginRight: 10 }} />
          {open && <span className={styles.linkText}>Log out</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
