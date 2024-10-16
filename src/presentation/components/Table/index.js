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
import Chip from "@mui/material/Chip";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getStatusColor = (status) => {
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
    case "DUPLICATE":
      return "#B22222";
    case "REFUNDED":
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
  const { width } = ResizeListener();
  const classes = useStyles();

  useEffect(() => {
    console.log("check -> ", tableTotalPages, tableCurrentPage, tableCurrentPageSize);
  }, [tableTotalPages, tableCurrentPage, tableCurrentPageSize]);

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
                {tableHeaders?.map((val, key) => (
                  <TableCell style={{ minWidth: val.width ? val.width : "auto", backgroundColor:"#64C466", color:"white" }} key={key}>
                    {val.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {tableData.length >= 1 ? (
              <TableBody style={{ width: "100%" }}>
                {tableData?.map((rowItem, key) => (
                  <TableRow
                    key={rowItem.key}
                    style={{
                      backgroundColor: key % 2 === 0 ? "transparent" : "#64C466",
                    }}
                  >
                    {tableHeaders.map((item, rowKey) => {
                      const textColor = key % 2 === 0 ? "#000000" : "#FFFFFF"; 

                      if (item.type === "date") {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto", color: textColor }}
                            align="left"
                            key={rowKey}
                          >
                            {convertDateToIST(rowItem[item.key])}
                          </TableCell>
                        );
                      } else if (item.type === "sino" && showPagination) {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto", color: textColor }}
                            align="left"
                            key={rowKey}
                          >
                            {(tableCurrentPage - 1) * tableCurrentPageSize + key + 1}
                          </TableCell>
                        );
                      } else if (item.type === "sino" && !showPagination) {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto", color: textColor }}
                            align="left"
                            key={rowKey}
                          >
                            {key + 1}
                          </TableCell>
                        );
                      } else if (item.type === "payment-status") {
                        return (
                          <TableCell
                            align="left"
                            style={{
                              minWidth: item.width ? item.width : "auto",
                              color: rowItem[item.key] === "Credited" ? "green" : "red",
                              fontWeight: "bold",
                            }}
                            key={rowKey}
                          >
                            {rowItem[item.key]}
                          </TableCell>
                        );
                      } else if (item.type === "txnStatus") {
                        return (
                          <TableCell
                            align="left"
                            style={{
                              minWidth: item.width ? item.width : "auto",
                              color: getStatusColor(rowItem[item.key]),
                              fontWeight: "bold",
                            }}
                            key={rowKey}
                          >
                            {rowItem[item.key]}
                          </TableCell>
                        );
                      } else if (item.type === "status") {
                        return (
                          <TableCell
                            align="left"
                            style={{
                              minWidth: item.width ? item.width : "auto",
                            }}
                            key={rowKey}
                          >
                            <Chip
                              label={rowItem[item.key] === true ? "Active" : "Inactive"}
                              color={rowItem[item.key] === true ? "success" : "error"}
                              size="small"
                            />
                          </TableCell>
                        );
                      } else if (item.type === "amount") {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto", color: textColor }}
                            align="left"
                            key={rowKey}
                          >
                            {"₹ " + rowItem[item.key]}
                          </TableCell>
                        );
                      } else if (item.type === "toggle") {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            <ToggleSwitch
                              checked={rowItem.status}
                              onChange={() => onClickSwitchButton(rowItem)}
                            />
                          </TableCell>
                        );
                      } else if (item.type === "more") {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            <TableViewMoreButton
                              onClickViewMoreButton={onClickViewMoreButton}
                              rowItem={rowItem}
                            />
                          </TableCell>
                        );
                      } else if (item.type === "iserveuTxnType") {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            {rowItem[item.key] === "CREDIT" || rowItem[item.key] === "DEBIT"
                              ? "WALLET TXN"
                              : "PAYOUT TXN"}
                          </TableCell>
                        );
                      } else if (item.type === "prefundAction") {
                        return (
                          <TableCell
                            style={{ minWidth: item.width ? item.width : "auto" }}
                            align="left"
                            key={rowKey}
                          >
                            <div style={{ display: "flex" }}>
                              <CheckIcon
                                style={{
                                  color: rowItem.status === "Initiated" ? "green" : "lightgrey",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (rowItem.status === "Initiated")
                                    onActionPrefundRequestTxn(rowItem, "Approve");
                                }}
                              />
                              <ClearIcon
                                style={{
                                  color: rowItem.status === "Initiated" ? "red" : "lightgrey",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (rowItem.status === "Initiated")
                                    onActionPrefundRequestTxn(rowItem, "Reject");
                                }}
                              />
                            </div>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell style={{ width: 2000, color: textColor }} align="left" key={rowKey}>
                            {rowItem[item.key]}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={tableHeaders.length}>
                    No Data Found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
      {showPagination && (
        <PaginationComponent
          totalPages={tableTotalPages}
          currentPage={tableCurrentPage}
          pageSize={tableCurrentPageSize}
          onChangeCurrentPage={onChangeCurrentPage}
          onChangeCurrentPageSize={onChangeCurrentPageSize}
        />
      )}
    </div>
  );
};

export default TableComponent;
