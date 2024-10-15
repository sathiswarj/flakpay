
import "../../pages/Transaction/transaction.css";
import Header from "../../../presentation/components/Header/index";

import { useEffect, useState } from "react";

import { enqueueSnackbar } from "notistack";
import "./Style.css";
//

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Payoutbal from "../../../Assets/svg/PayoutBalanceIcon.svg";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";

//

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 220,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

function PayoutBalance() {
  let [page, setPage] = useState(1);
  let [data, setData] = useState([]);

  const [companyName, setCompanyName] = useState("");

  const [payOutserviceProviderDetails, setPayOutServiceProviderdetails] =
    useState([]);
  let [cId, setCId] = useState("");
  // const [y, setY] = useState(false);
  // console.log("990",payOutserviceProviderDetails)
  const [triggerSignal, setTriggerSignal] = useState(false);
  const [y, setY] = useState(false);
  const [balance, setBalance] = useState("");

  const [cPayOutServices, setCPayOutServices] = useState([]);
  const [payOutDetails, setPayOutDetails] = useState([]);

  const [getPageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [oBal, setOverallBalance] = useState("");

  const [fg, setFg] = useState(totalPages - (totalPages - 1));
  const [sg, setSg] = useState(totalPages - (totalPages - 2));
  const [tg, setTg] = useState(totalPages - (totalPages - 3));

  const [selectedSP, setSelectedSP] = useState("");

  //
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setBalance("");
    setOverallBalance("");
  };

  const handleOpen = (arg) => {
    setOpen(true);
    setCId(arg);
    getClientListById(arg);
    setBalance("");
  };
  //

  const getPage = (pages) => {
    setPage(pages);
    setPageNo("");
  };

  const getClientList = (page, size) => {
    ApiRequestGet.getClientListPayout(page, size)
      .then((res) => {
        if (res.status) {
          // setPayOutServiceProviderdetails(res?.data?.clients)

          // console.log("990",payOutserviceProviderDetails)

          // setData(res?.data?.clients.filter(e=>e?.payoutServices.length>0));
          setData(res?.data?.clients);

          setTotalPages(res.data.totalPages);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  };

  const getClientListById = (clientId) => {
    ApiRequestGet.getClientByClientId(clientId)
      .then((res) => {
        if (res.status) {
          setPayOutServiceProviderdetails(
            res?.data?.payoutServices.map((e) => e.serviceProviderName)
          );

          setPayOutDetails(res?.data?.payoutServices);

          setCompanyName(res?.data?.name);

          setY(true);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //gcds-payout-7unique-svc
  const balCheck = (clientId, sProviderName) => {
    setBalance("");
// https://gcds.genniepay.com/gcds-payout-nk-yb-svc/api/v1/transaction/balance-check
    let servicePId = payOutDetails
      ?.filter((e) => e?.serviceProviderName === sProviderName)
      .map((e) =>
        e?.serviceProviderId === "2710d5b0-c571-4131-98ad-abd8dd679e97"
          ? "https://gcds.genniepay.com/gcds-payout-ismart-svc/api/v1/transaction/balance-check"
          : e?.serviceProviderId === "da8ff3df-182d-4838-aec2-352f3a4ad533"
          ? "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check"
          : e?.serviceProviderId === "c8de5587-07ff-42f7-bfd8-9c89fdd77d4c"
          ? "https://gcds.genniepay.com/gcds-payout-paycoon-svc/api/v1/transaction/balance-check"
          : e?.serviceProviderId === "ed3dc4f5-c1a8-4093-9fab-05a72a63de1e"
          ? "https://gcds.genniepay.com/gcds-payout-nk-yb-svc/api/v1/transaction/balance-check"
          : ""
      );

    ApiRequestGet.balanceCheck(clientId, servicePId)

      .then((res) => {
        if (res.status) {
          setBalance(res?.data?.balance);
          console.log("uy76555", balance);
          setY(false);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 7uni
  const bCheck = (clientId, ur = "") => {
    ApiRequestGet.balanceCheckUn(
      clientId,
      "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/wallet/get-balance"
    )

      .then((res) => {
        if (res.status) {
          setBalance(res?.data?.balance);
          // setClientId(clientId)
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //

  const balCheckOverall = (clientId, sProviderName) => {
    setBalance("")
    // console.log("payout detr",payOutDetails)
    // let servicePId = payOutDetails
    //   ?.filter((e) => e?.serviceProviderName === sProviderName)
    //   .map((e) =>
    //     e?.serviceProviderId === "2710d5b0-c571-4131-98ad-abd8dd679e97"
    //       ? "https://gcds.genniepay.com/gcds-payout-ismart-svc/api/v1/transaction/balance-check"
    //       : "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check"
    //   );

    ApiRequestGet.balanceCheck(
      clientId,
      "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check"
    )

      .then((res) => {
        if (res.status) {
          setOverallBalance(res?.data?.balance);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getClientList(page, 10);
  }, [page]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rose",
        // overflow: "scroll",
        lineHeight: "",
      }}
    >
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p
              onClick={() => handleClose()}
              style={{
                cursor: "pointer",
                color: "grey",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              X
            </p>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Balance of <span style={{ color: "blue" }}>{companyName} </span>:
            </Typography>
            <div>
              <select
                id="sel"
                className="servicepro"
                onChange={(e) => {
                  if (e.target.value === "7UNIQUE") {
                    // bCheck(cId);
                    balCheckOverall(cId);
                  } else {
                    setOverallBalance("");
                    balCheck(cId, e.target.value);
                  }
                }}
                style={{ width: 200, cursor: "pointer" }}
              >
                <option value="" disabled selected>
                  Select SP &emsp;&emsp;&emsp;&emsp;&nbsp;
                </option>

                {payOutserviceProviderDetails?.map((e) => (
                  <>
                    <option value={e}>{e}</option>
                  </>
                ))}
              </select>
              {oBal && <p> Balance : {Number(oBal).toFixed(2)}</p>}
        { !oBal&&     <p>Balance : {Number(balance).toFixed(2)}</p>}
            </div>
          </Box>
        </Modal>
        <Header heading={"Pay-Out Balance"} />
      </div>

      <div
        style={{
          width: "96%",
          height: "76vh",
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          // padding: "10px",
          boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
          margin: "0px 0px 0px 18px",
          // backgroundColor:"red",
          overflowX: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            height: "80px",
            borderRadius: "0px",
            border: "None",
          }}
        >
          <tr>
            <th>S.No</th>
            <th>Date & Time</th>
            <th>Client Name</th>

            <th>Check Payout Balance</th>
            {/* <th>Current Balance</th> */}
          </tr>
          {data.map((val, key) => {
            return (
              <>
                <tr key={key}>
                  <td>{(page - 1) * 10 + key + 1}</td>
                  <td>{val.createdAt}</td>
                  <td style={{ fontWeight: "bold" }}>{val.name}</td>

                  <td>
                    <img
                      style={{ cursor: "pointer" }}
                      src={Payoutbal}
                      onClick={() => handleOpen(val.clientId)}
                      alt="bal"
                    />
                    {/* <button style={{cursor:"pointer",color:"white",background:"#2645c3",border:"none",padding:4,borderRadius:3}} >Check Balance</button> */}
                  </td>
                  {/* <td style={{color:"green", fontWeight:"bolder", fontSize:"17px"}}>₹ {balance}</td> */}
                </tr>
              </>
            );
          })}
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // background: "white",
          borderTop: "1px solid #E3E3E3",
          width: "97.3%",
          height: "60px",
          marginLeft: "18px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          borderTop: "none",
          // boxShadow: "1px 1px 6px 1px rgba(128, 128, 128, 0.299)",
        }}
      >
        <span
          style={{
            display: "flex",
            gap: 4,
            marginLeft: 3,
            alignItems: "center",
          }}
        >
          <input
            onChange={(e) => {
              if (
                e.target.value === "0" ||
                e.target.value === "-1" ||
                Number(e.target.value) !== Number(e.target.value)
              ) {
                alert("You typed wrong page no!");
                e.target.value = "";
                setPageNo(1);
              } else {
                setPageNo(e.target.value);
              }
            }}
            style={{
              width: 45,
              border: "2px solid grey",
              borderRadius: 3,
              padding: 2,
            }}
            type="search "
            placeholder="Page.."
          />
          <button
            onClick={() => {
              getPageNo !== "" && totalPages !== 1 && getPage(getPageNo);
            }}
            style={{
              borderRadius: 100,
              color: "white",
              background: "#D07FEE",
              cursor: "pointer",
              border: "none",
              padding: 3,
            }}
          >
            Go
          </button>
          <span style={{ fontSize: 12 }}>
            You are in page :{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>{page}</span>{" "}
          </span>{" "}
          <span style={{ fontSize: 12, marginLeft: 9, color: "red" }}>
            {data.length === 0 && "No data found on this page!"}
          </span>
        </span>

        {data.length > 0 && (
          <div
            style={{
              width: 420,
              display: "flex",
              height: 29,
              gap: 9,
              marginTop: 8,
            }}
          >
            <button
              style={{
                border: "none",
                background: "#D07FEE",
                color: "white",
                width: 55,
                padding: 3,
                cursor: "pointer",
                borderRadius: 23,
                visibility: page > 1 ? "visible" : "hidden",
              }}
              onClick={() => getPage(page - 1)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </button>

            <button
              style={{
                background: getPageNo === fg || fg === page ? "#D07FEE" : "",
                border: "none",
                padding: 3,
                cursor: "pointer",
                width: 22,
                borderRadius: 4,
                color: getPageNo === fg || fg === page ? "white" : "black",
              }}
              onClick={() => getPage(fg)}
            >
              {fg}
            </button>
            {totalPages !== 1 ? (
              <>
                {" "}
                <button
                  style={{
                    background: getPageNo === sg || sg === page ? "#D07FEE" : "",
                    border: "none",
                    padding: 3,
                    cursor: "pointer",
                    width: 22,
                    borderRadius: 4,
                    color: getPageNo === sg || sg === page ? "white" : "black",
                  }}
                  onClick={() => getPage(sg)}
                >
                  {sg}
                </button>
                {totalPages === 2 ? (
                  ""
                ) : (
                  <button
                    style={{
                      background: getPageNo === tg || tg === page ? "#D07FEE" : "",
                      border: "none",
                      padding: 3,
                      cursor: "pointer",
                      width: 22,
                      borderRadius: 4,
                      color:
                        getPageNo === tg || tg === page ? "white" : "black",
                    }}
                    onClick={() => getPage(tg)}
                  >
                    {tg}
                  </button>
                )}
                <span
                  style={{
                    fontWeight: "bold",
                    marginTop: 11,
                    padding: 2,
                    visibility:
                      getPageNo == page || page === page ? "visible" : "hidden",
                  }}
                >
                  ...
                </span>
                <button
                  style={{
                    background:
                      getPageNo == page || page === page ? "#D07FEE" : "",
                    border: "none",
                    padding: 3,
                    width: 39,
                    borderRadius: 4,
                    visibility:
                      getPageNo == page || page === page ? "visible" : "hidden",
                    color:
                      getPageNo == page || page === page ? "white" : "black",
                  }}
                >
                  {page}
                </button>
                <span style={{ fontWeight: "bold", marginTop: 11, padding: 2 }}>
                  .....
                </span>
                <button
                  style={{
                    background:
                      totalPages === sg || totalPages === page ? "#D07FEE" : "",
                    border: "none",
                    padding: 3,
                    cursor: "pointer",
                    width: 39,
                    borderRadius: 4,
                    color:
                      totalPages === sg || totalPages === page
                        ? "white"
                        : "black",
                  }}
                  onClick={() => getPage(totalPages)}
                >
                  {totalPages}
                </button>
                {page === totalPages ? (
                  ""
                ) : (
                  <button
                    style={{
                      border: "none",
                      background: "#D07FEE",
                      color: "white",
                      width: 55,
                      padding: 3,
                      cursor: "pointer",
                      borderRadius: 23,
                      color: "white",
                    }}
                    onClick={() => getPage(page + 1)}
                  >
                    <KeyboardDoubleArrowRightIcon />
                  </button>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default PayoutBalance;
