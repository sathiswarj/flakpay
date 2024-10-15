import React, { useState } from "react";
import Modal from "react-modal";
import "./Style.css";

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

function AccountModal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div
          style={{
            width: "600px",
            height: "220px",
            backgroundColor: "white",

            borderRadius: "5px",
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
              Account Details
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
              marginTop: "40px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                width: "60%",
                height: "80%",
                backgroundColor: "",
                marginLeft: "30px",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold" }}>Name :</label>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                 <label style={{ fontWeight: "bold", marginRight: "100px" }}>
                  Account No :
                </label>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold" }}>IFSC :</label>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    </div>
  );
}

export default AccountModal;
