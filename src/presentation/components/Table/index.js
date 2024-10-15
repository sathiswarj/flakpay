import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@mui/material/Switch";
import { convertDateToIST } from "../../../utility/dateModifier";
import PaginationComponent from "../Pagination/Pagination";
import ResizeListener from "../../../utility/ResizeListener";
import ToggleSwitch from "../ToggleSwitch";
import TableViewMoreButton from "./tableViewMoreButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getStatusColor = (status) => {
  console.log("Status check-->",status);
  
  switch (status) {
    case "INITIATED":
      return "black";
    case "SUCCESS":
      return "#28A745";
    case "FAILED":
      return "#DC3545";
    case "PENDING":
      return "#FF7F50";
    case "TAMPERED":
      return "#8B4513";
    case "DUPLICATE ":
        return "#B22222";
    case "REFUNDED ":
          return "#6B8E23";
    default:
      return "black";
  }
};

const TableComponent = ({
  tableHeaders,
  tableData,
  tableTotalPages,
  tableCurrentPage,
  tableCurrentPageSize,
  onChangeCurrentPage,
  onChangeCurrentPageSize,
  onClickViewMoreButton,
  onClickSwitchButton,
  showPagination = true,
  minusWidth = 0,
  onActionPrefundRequestTxn,
}) => {
  const { width, height } = ResizeListener();
  const classes = useStyles();

  useEffect(() => {
    console.log("check -> ", tableTotalPages, tableCurrentPage, tableCurrentPageSize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "space-between",
        paddingLeft: minusWidth === 0 ? 20 : 0,
        width: width - 250 - minusWidth,
      }}
    >
      <div
        style={{
          width: width - 250 - minusWidth,
          overflowY: "scroll",
          backgroundColor: "#FFFFFF",
          borderRadius: 5,
          boxShadow: "1px 1px 6px 4px rgba(128, 128, 128, 0.299)",
          overflowX: "hidden",
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders?.map((val, key) => {
                  return (
                    <TableCell style={{ minWidth: val.width ? val.width : "auto" }}>
                      {" "}
                      {val.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            {tableData.length >= 1 ? (
              <TableBody style={{ width: "100%" }}>
                {tableData?.map((rowItem, key) => {
                  return (
                    <TableRow
                      key={rowItem.key}
                      style={{
                        backgroundColor: key % 2 === 0 ? "transparent" : "rgba(236, 204, 229, 0.2)",
                        color: "#37447A",
                      }}
                    >
                      {tableHeaders.map((item, rowKey) => {
                        return item.type === "date" ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                          >
                            {convertDateToIST(rowItem[item["key"]])}
                          </TableCell>
                        ) : item.type === "sino" && showPagination ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                          >
                            {(tableCurrentPage - 1) * tableCurrentPageSize + key + 1}
                          </TableCell>
                        ) : item.type === "sino" && !showPagination ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                          >
                            {key + 1}
                          </TableCell>
                        ) : item.type === "payment-status" ? (
                          <TableCell
                            align="left"
                            style={{
                              minWidth: item.width ? item?.width : "auto",
                              color: rowItem[item["key"]] === "Credited" ? "green" : "red",
                              fontWeight: "bold",
                            }}
                          >
                            {rowItem[item["key"]]}
                          </TableCell>
                        ) : item.type === "txnStatus" ? (
                          <TableCell
                          align="left"
                          style={{
                            minWidth: item.width ? item?.width : "auto",
                            color: getStatusColor(rowItem[item.key]), 
                            fontWeight: "bold",
                          }}
                          >
                          {rowItem[item.key]}
                          </TableCell>
                      ): item.type === "status" ? (
                          <TableCell
                            align="left"
                            style={{
                              minWidth: item.width ? item?.width : "auto",
                              color: rowItem[item["key"]] == true ? "green" : "red",
                              fontWeight: "bold",
                            }}
                          >
                            {rowItem[item["key"]] === true ? "Active" : "Inactive"}
                          </TableCell>
                        ) : item.type === "amount" ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                          >
                            {"₹ " + rowItem[item["key"]]}
                          </TableCell>
                        ) : item.type === "toggle" ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                          >
                            <ToggleSwitch
                              checked={rowItem["status"]}
                              onChange={(event) => {
                                onClickSwitchButton(rowItem);
                              }}
                            />
                          </TableCell>
                        ) : item.type === "more" ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            <TableViewMoreButton
                              onClickViewMoreButton={onClickViewMoreButton}
                              rowItem={rowItem}
                            />
                          </TableCell>
                        ) : item.type === "iserveuTxnType" ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            {rowItem[item.key] === "CREDIT" || rowItem[item.key] === "DEBIT"
                              ? "WALLET TXN"
                              : "PAYOUT TXN"}
                          </TableCell>
                        ) : item.type === "prefundAction" ? (
                          <TableCell
                            style={{ minWidth: item.width ? item?.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            {/* {rowItem["status"] === "Initiated" ? "WALLET TXN" : "PAYOUT TXN"} */}
                            <div style={{ display: "flex" }}>
                              <CheckIcon
                                style={{
                                  color: rowItem["status"] === "Initiated" ? "green" : "lightgrey",
                                  cursor : 'pointer'
                                }}
                                onClick={() => {
                                  if (rowItem["status"] === "Initiated")
                                    onActionPrefundRequestTxn(rowItem, "Approve");
                                }}
                              />
                              <ClearIcon
                                style={{
                                  color: rowItem["status"] === "Initiated" ? "red" : "lightgrey",
                                  cursor : 'pointer'
                                }}
                                onClick={() => {
                                  if (rowItem["status"] === "Initiated")
                                    onActionPrefundRequestTxn(rowItem, "Reject");
                                }}
                              />
                            </div>
                          </TableCell>
                        ) : (
                          <TableCell style={{ width: 2000 }} align="left" key={rowKey}>
                            {rowItem[item.key]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "400px",
                }}
              ></div>
            )}
          </Table>
        </TableContainer>
      </div>
      {showPagination && (
        <PaginationComponent
          currentPage={tableCurrentPage}
          totalPages={tableTotalPages}
          currentPageSize={tableCurrentPageSize}
          onChangeCurrentPage={onChangeCurrentPage}
          onChangeCurrentPageSize={onChangeCurrentPageSize}
        />
      )}
    </div>
  );
};

export default TableComponent;
