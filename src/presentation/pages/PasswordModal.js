import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authAction } from "../../data/local/redux/action/authAction";
import { useSnackbar } from "notistack";
import "./Style.css";
import { ApiRequestPost } from "../../data/network/services/ApiRequestPost";

const customStyles = {
  content: {
    top: "52%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FCFBFB",
    width: 1000,
    height: 400,
    border: "none",
  },
};

function PasswordModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const changePassword = () => {
    setLoading(true);
    ApiRequestPost.changePassword(oldPass, newPass)
      .then((data) => {
        console.log(data);
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
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App" style={{ background: "" }}>
      <button className="password" onClick={()=>setModalOpen(true)}>
        Change Password
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div
          style={{
            width: "600px",
            height: "350px",
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "0px 0px 0px 200px",
            padding: "20px",
            boxShadow: "1px 2px 3px 4px #c7c7c7",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "0px",
            }}
          >
            <div
              style={{
                marginLeft: "10px",
                fontWeight: "bold",
                color: "black",
                textDecorationLine: "none",
              }}
            >
              Change Password
            </div>
            <div
              style={{ marginRight: "0px", cursor: "pointer", color: "grey" }}
              onClick={() => setModalOpen(false)}
            >
              {" "}
              X{" "}
            </div>
          </section>
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              margin: "auto",
              marginTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
                height: "80%",
                backgroundColor: "",
                margin: "15px 0px 0px 30px",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "25px",
                }}
              >
                <label style={{ fontWeight: "bold" }}>Old Password</label>
                <input
                  value={oldPass}
                  onChange={(data) => {
                    setOldPass(data.target.value);
                  }}
                  isError={(data) => {}}
                  type="text"
                  placeholder="Enter old password"
                  style={{
                    height: "30px",
                    border: "2px solid #ababab",
                    borderRadius: 7,
                    marginBottom: 12,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "25px",
                }}
              >
                <label style={{ fontWeight: "bold" }}>New Password</label>
                <input
                  value={newPass}
                  onChange={(data) => {
                    setNewPass(data.target.value);
                  }}
                  isError={(data) => {}}
                  type="email"
                  placeholder="Enter New password"
                  style={{
                    height: "30px",
                    border: "2px solid #ababab",
                    borderRadius: 7,
                    marginBottom: 12,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "25px",
                }}
              >
                <label style={{ fontWeight: "bold" }}>Confirm Password</label>
                <input
                  value={confirmNewPass}
                  onChange={(data) => {
                    setConfirmNewPass(data.target.value);
                  }}
                  isError={(data) => {}}
                  type="text"
                  placeholder="Re-enter New password"
                  style={{
                    height: "30px",
                    border: "2px solid #ababab",
                    borderRadius: 7,
                    marginBottom: 12,
                  }}
                />
              </div>

              <button
                onClick={changePassword}
                style={{
                  backgroundColor:
                    oldPass && newPass && confirmNewPass ? "#2645c3" : "grey",
                  cursor: "pointer",
                  color: "white",
                  height: "40px",
                  borderRadius: "7px",
                  marginBottom: 12,
                  border: "none",
                }}
              >
                Update Password
              </button>
            </div>
          </section>
        </div>
      </Modal>
    </div>
  );
}

export default PasswordModal;
