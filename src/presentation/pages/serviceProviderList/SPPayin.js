
import "../../pages/Transaction/transaction.css";
import Header from "../../../presentation/components/Header/index";

import { useEffect, useState } from "react";

import { enqueueSnackbar } from "notistack";

import Dialog from "@mui/material/Dialog";

import "./Style.css";
import { convertDateToIST } from "../../../utility/dateModifier";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";

function SPPayin() {
  let [page, setPage] = useState(1);
  let [data, setData] = useState([]);
  let [row, setRow] = useState([]);

  const [getPageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedSP, setSelectedSP] = useState("");

  const [fg, setFg] = useState(totalPages - (totalPages - 1));
  const [sg, setSg] = useState(totalPages - (totalPages - 2));
  const [tg, setTg] = useState(totalPages - (totalPages - 3));

  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const handleClickOpen = (arg) => {
    setOpen(true);
    setRow(arg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    getPage(1); // Reload data with the new page size
  };

  const getPage = (pages) => {
    getClientList(pages, pageSize);
    setPage(pages);
    setPageNo("");
  };

  const getClientList = (page, size) => {
    ApiRequestGet.getClientListPayIn(page, size)
      .then((res) => {
        if (res.status) {
          setData(res.data.clients.filter((e) => e.payinServices.length > 0));
          //  setData(res.data.clients);

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

    ApiRequestPost.updateSP(clientId, selectedSP, status)
      .then((res) => {
        if (res.success) {
          getClientList(page, 10);

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

  useEffect(() => {
    getClientList(page, pageSize);
  }, [page, pageSize]);
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
          <span style={{ color: "green" }}>Enable</span> / <span style={{ color: "red" }}>Disable</span> Service Provider (Pay-In) :
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
              Select Service Provider of <span style={{ color: "blue", fontWeight: "bold" }}>{row?.email}</span>
            </p>
            <select id="sel" className="servicepro" onChange={(e) => setSelectedSP(e.target.value)} style={{ width: 290, cursor: "pointer" }}>
              <option selected>Select SP &emsp;&emsp;&emsp;&emsp;&nbsp;</option>

              {row?.payinServices?.map((e) => (
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
            Current service Providers (Pay-In) :
            <p
              style={{
                overflow: "hidden",
                background: "",
                overflowY: "scroll",
                height: 350,
              }}
            >
              {row?.payinServices?.map((e, key) => (
                <p style={{ fontWeight: "bold" }}>{e?.spStatus && e?.serviceProviderName}</p>
              ))}
            </p>
          </div>
        </div>
      </Dialog>

      {/*  */}
      <div>
        <Header heading={"Service Provider Pay-In"} />
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
            {/* <th>Action</th> */}
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
                  {val?.payinServices.map((e) => (
                    <span>
                      {e.spStatus && e.serviceProviderName.slice(0, 3)}
                      <span style={{ color: "#FF7F50", fontWeight: 900 }}> {e.spStatus && e.serviceProviderName ? "/" : ""} </span>
                    </span>
                  ))}
                </td>
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
export default SPPayin;
