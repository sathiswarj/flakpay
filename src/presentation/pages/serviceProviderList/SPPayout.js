
import "../../pages/Transaction/transaction.css";
import Header from "../../../presentation/components/Header/index";
import * as React from "react";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import "./Style.css";
import { convertDateToIST } from "../../../utility/dateModifier";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";


function SPPayout() {
  let [page, setPage] = useState(1);
  let [data, setData] = useState([]);
  let [row, setRow] = useState([]);
  let [utr, setUtr] = useState("");
  let [amt, setAmt] = useState("");
  let [credit, setCredit] = useState("");
  let [debit, setDebit] = useState("");
  let [balance, setBalance] = useState("");

  let [err, setErr] = useState("");

  let [msg, setMsg] = useState("");

  let [overallBalance, setOverallBalance] = useState("");

  let [clientId, setClientId] = useState("");

  const navigate = useNavigate();

  const [triggerSignal, setTriggerSignal] = useState(false);

  const [getPageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedSP, setSelectedSP] = useState("");

  const [fg, setFg] = useState(totalPages - (totalPages - 1));
  const [sg, setSg] = useState(totalPages - (totalPages - 2));
  const [tg, setTg] = useState(totalPages - (totalPages - 3));
  //
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const handleClickOpen = (arg) => {
    setOpen(true);
    setRow(arg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    getPage(1); // Reload data with the new page size
  };

  const getPage = (pages) => {
    getClientList(pages, pageSize);
    setPage(pages);
    setPageNo("");
    setAnchorEl(null);
  };
  const sig = () => {
    setTriggerSignal(!triggerSignal);
  };
  const getClientList = (page, size) => {
    ApiRequestGet.getClientListPayout(page, size)
      .then((res) => {
        console.log("Transaciton data in-> kkl", res);
        if (res.status) {
          // setData(res.data.clients.filter(e=>e?.payoutServices.length>0));
          setData(res.data.clients);

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

  const enableDisableSP = (clientId, selectedSP, status) => {
    console.log("sele", selectedSP);

    ApiRequestPost.updateSPPayout(clientId, selectedSP, status)
      .then((res) => {
        if (res.statusCode) {
          sig();

          enqueueSnackbar(res.status, {
            variant: "success",
          });
          handleClose();
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "payIn-error",
        });
      })
      .finally(() => {});
  };

  //
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setErr("");
    setAmt("");
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const setCltId = (id) => {
    setClientId(id);
    bCheck();
  };

  const op = Boolean(anchorEl);
  const id = op ? "simple-popper" : undefined;

  //
  const addBalanceDebit = () => {
    ApiRequestPost.addBalDebit(clientId, amt, utr)
      .then((res) => {
        if (res.success) {
          bCheck(clientId);
          setAmt("");
          setUtr("");
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          handleClose();
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "payIn-error",
        });
      })
      .finally(() => {});
  };

  const addBalanceCredit = () => {
    ApiRequestPost.addBalCredit(clientId, amt, utr)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          bCheck(clientId);
          setAmt("");
          setUtr("");
          handleClose();
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "payIn-error",
        });
      })
      .finally(() => {});
  };

  // overall

  const balCheckOverall = (clientId, sProviderName) => {
    // console.log("payout detr",payOutDetails)
    // let servicePId = payOutDetails
    //   ?.filter((e) => e?.serviceProviderName === sProviderName)
    //   .map((e) =>
    //     e?.serviceProviderId === "2710d5b0-c571-4131-98ad-abd8dd679e97"
    //       ? "https://gcds.genniepay.com/gcds-payout-ismart-svc/api/v1/transaction/balance-check"
    //       : "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check"
    //   );

    ApiRequestGet.balanceCheck(clientId, "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check")

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

  //
  const bCheck = (clientId, ur = "") => {
    ApiRequestGet.balanceCheckUn(clientId, "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/wallet/get-balance")

      .then((res) => {
        if (res.status) {
          setBalance(res?.data?.balance);
          setClientId(clientId);
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
    getClientList(page, pageSize);
  }, [page, pageSize, triggerSignal]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rose",
        lineHeight: "",
      }}
    >
      {/*popper  */}

      <Popper id={id} open={op} anchorEl={anchorEl}>
        <Box
          sx={{
            border: "1px solid grey",
            borderRadius: 3,
            p: 1,
            bgcolor: "background.paper",
            height: 244,
            width: 235,
          }}
        >
          <span
            onClick={handleClick}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
              color: "grey",
            }}
          >
            <span>x</span>
          </span>
          {err && <p style={{ color: "red", fontSize: 9 }}>{err}</p>}
          <p>
            Overall Bal : <span style={{ fontWeight: "bold" }}>{Number(overallBalance).toFixed(2)}</span>
          </p>
          <p>
            Bal : <span style={{ fontWeight: "bold" }}>{balance}</span>
          </p>
          <span style={{ display: "flex", gap: 2 }}></span>

          <span tyle={{ display: "flex", gap: 2 }}>
            <span>UTR :</span>
            <input
              value={utr}
              type="text"
              onChange={(e) => {
                setUtr(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                outline: "none",
              }}
              placeholder="UTR"
            />
            <p></p>
            <span>AMT :</span>
            <span>
              <input
                value={amt}
                type="text"
                onChange={(e) => {
                  setErr("");
                  if (!Number(e.target.value)) {
                    e.target.value = "";
                  } else {
                    setAmt(e.target.value);
                  }
                }}
                style={{
                  border: "none",
                  borderBottom: "1px solid grey",
                  outline: "none",
                }}
                placeholder="AMT"
              />
              <p></p>
              <span style={{ display: "flex", justifyContent: "flex-start" }}>
                <span>Msg :</span>
                <span>
                  <input
                    value={msg}
                    type="text"
                    onChange={(e) => {
                      setErr("");

                      setMsg(e.target.value);
                    }}
                    style={{
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                    placeholder="Message"
                  />
                </span>
              </span>
            </span>
          </span>
          <p></p>
          <button
            onClick={() => {
              if (amt > balance) {
                setErr("Amount is greater!");
              } else if (!amt || !utr) {
                setErr("All fields are required!");
              } else {
                addBalanceDebit();
              }
            }}
            style={{
              width: 80,
              borderRadius: 4,
              color: "white",
              background: "#4169e1",
              cursor: "pointer",
              border: "none",
              marginLeft: 6,
              padding: 2,
            }}
          >
            Debit
          </button>
          <button
            onClick={() => {
              if (amt > overallBalance) {
                setErr("Amount is greater!");
              } else if (!amt || !utr) {
                setErr("All fields are required!");
              } else {
                addBalanceCredit();
              }
            }}
            style={{
              width: 80,
              borderRadius: 4,
              color: "white",
              background: "#4169e1",
              cursor: "pointer",
              border: "none",
              marginLeft: 6,
              padding: 2,
            }}
          >
            Credit
          </button>
          {/* <button
            onClick={() => addBalance()}
            style={{
              width: 100,
              borderRadius: 4,
              color: "white",
              background: "#4169e1",
              cursor: "pointer",
              border: "none",
              marginLeft: 54,
              marginTop:4,
              padding: 2,
            }}
          >
            Submit
          </button> */}
          <span
            style={{ marginLeft: 2, cursor: "pointer", background: "green", padding: 1.5, color: "white", borderRadius: 3, height: 1 }}
            onClick={() => {
              setAmt("");
              setErr("");
              setMsg("");
              setUtr("");
            }}
          >
            Clear
          </span>
        </Box>
      </Popper>

      {/*  */}
      {/*  */}
      <Dialog
        PaperProps={{
          sx: {
            width: 900,
            maxWidth: 900,
            height: 546,
            padding: "0px 28px 0px 28",
            overflowY: "hidden",
            backgroundColor: "",
            borderRadius: 5,
            padding: 2,
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p
          style={{
            color: "grey",
            marginLeft: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleClose()}
        >
          X
        </p>
        <p style={{ fontWeight: "bold" }}>
          <span style={{ color: "green" }}>Enable</span> / <span style={{ color: "red" }}>Disable</span> Service Provider (Pay-Out) :
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: 34,
            marginTop: 12,
          }}
        >
          <div
            style={{
              background: "",
              borderRight: "2px solid grey",
              paddingRight: 80,
            }}
          >
            <p style={{ color: "grey" }}>
              Select Service Provider of <span style={{ color: "blue", fontWeight: "bold" }}>{row?.name}</span>
            </p>
            <select id="sel" className="servicepro" onChange={(e) => setSelectedSP(e.target.value)} style={{ width: 290, cursor: "pointer" }}>
              <option selected>Select SP &emsp;&emsp;&emsp;&emsp;&nbsp;</option>

              {row?.payoutServices?.map((e) => (
                <>
                  <option value={e.serviceProviderId}>{e.serviceProviderName}</option>
                </>
              ))}
            </select>
            <span style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <button className="enable" onClick={() => enableDisableSP(row.clientId, selectedSP, true)}>
                Enable
              </button>
              <button className="disable" onClick={() => enableDisableSP(row.clientId, selectedSP, false)}>
                Disable
              </button>
            </span>
          </div>

          <div
            style={{
              background: "",
              marginTop: 12,
              color: "grey",
              height: 400,
              marginRight: 80,
            }}
          >
            Current service Providers (Pay-Out) :
            <p
              style={{
                overflow: "hidden",
                background: "",
                overflowY: "scroll",
                height: 350,
              }}
            >
              {row?.payoutServices?.map((e, key) => (
                <p style={{ fontWeight: "bold" }}>{e?.spStatus && e?.serviceProviderName}</p>
              ))}
            </p>
          </div>
        </div>
      </Dialog>

      {/*  */}
      <div>
        <Header heading={"Service Provider Pay-Out"} />
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

            <th>Service Provider</th>
            <th>Current SP</th>

            {/* <th>Add Balance</th> */}
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{(page - 1) * 10 + key + 1}</td>
                <td>{convertDateToIST(val.createdAt)}</td>
                <td>{val.name}</td>

                <td>
                  <button
                    style={{
                      color: "white",
                      background: "#2645c3",
                      borderRadius: 3,
                      border: "none",
                      padding: 6,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      handleClickOpen(val);
                    }}
                  >
                    Enable/Disable SP
                  </button>
                </td>

                <td>
                  {" "}
                  {val?.payoutServices?.map((e) => (
                    <span>
                      {e?.spStatus && e?.serviceProviderName.slice(0, 3)}
                      <span style={{ color: "#FF7F50", fontWeight: 900 }}> {e?.spStatus && e?.serviceProviderName ? "/" : ""} </span>
                    </span>
                  ))}
                </td>

                {/* <td>
                  {val?.payoutServices?.map((e) => (
                    <span>
                      {e?.serviceProviderName === "7UNIQUE" &&e?.spStatus===true? (
                        <>
                          <button
                            style={{
                              background: "grey",
                              cursor: "pointer",
                              border: "none",
                              color: "white",
                              borderRadius: 3,
                              padding: 2,
                            }}
                            aria-describedby={id}
                            type="button"
                            onClick={(e) => {
                              balCheckOverall()
                              // setCltId(val?.clientId);
                              bCheck(val?.clientId,"")
                              handleClick(e);

                            }}
                          >
                            Wallet
                          </button>
                          <sup
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: 22,
                            }}
                          >
                            +
                          </sup>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  ))}
                </td> */}
              </tr>
            );
          })}
        </table>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #E3E3E3",
          width: "97.3%",
          height: "60px",
          marginLeft: "18px",
          marginTop: "5px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
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
              if (e.target.value === "0" || e.target.value === "-1" || Number(e.target.value) !== Number(e.target.value)) {
                alert("You typed wrong page no!");
                e.target.value = "";
                setPageNo(1);
              } else {
                setPageNo(Number(e.target.value));
              }
            }}
            style={{
              width: 45,
              border: "1px solid grey",
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
              borderRadius: 5,
              color: "white",
              background: "#D07FEE",
              cursor: "pointer",
              border: "none",
              padding: 3,
              width: 70,
            }}
          >
            Jump To
          </button>
        </span>
        {/* 
        {data?.length > 0 && ( */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            style={{
              border: "none",
              background: "none",
              color: "black",
              cursor: "pointer",
              borderRadius: 100,
            }}
            onClick={() => getPage(page - 1)}
            disabled={page <= 1}
          >
            <KeyboardDoubleArrowLeftIcon />
          </button>

          <button
            style={{
              border: "none",
              padding: 3,
              cursor: "pointer",
              width: 22,
              borderRadius: 4,
              color: "black",
            }}
            onClick={() => getPage(fg)}
          >
            {fg}
          </button>
          {totalPages !== 1 ? (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  marginTop: 11,
                  padding: 2,
                  visibility: getPageNo == page || page === page ? "visible" : "hidden",
                }}
              >
                ...
              </span>
              <button
                style={{
                  background: getPageNo == page || page === page ? "#D07FEE" : "",
                  border: "none",
                  padding: 3,
                  width: 39,
                  borderRadius: 4,
                  visibility: getPageNo == page || page === page ? "visible" : "hidden",
                  color: getPageNo == page || page === page ? "white" : "black",
                }}
              >
                {page}
              </button>
              <span style={{ fontWeight: "bold", marginTop: 11, padding: 2 }}>...</span>
              <button
                style={{
                  background: totalPages === sg || totalPages === page ? "#D07FEE" : "",
                  border: "none",
                  padding: 3,
                  cursor: "pointer",
                  width: 39,
                  borderRadius: 4,
                  color: totalPages === sg || totalPages === page ? "white" : "black",
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
                    background: "none",
                    color: "black",
                    cursor: "pointer",
                    borderRadius: 100,
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
        {/* )} */}

        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={pageSize}
            onChange={handleChangePageSize}
            style={{
              borderRadius: 3,
              border: "1px solid grey",
              marginRight: 50,
              padding: "3px 8px",
            }}
          >
            {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export default SPPayout;
