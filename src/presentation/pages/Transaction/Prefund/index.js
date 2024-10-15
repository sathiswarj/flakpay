import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ApiRequestGet } from "../../../../data/network/services/ApiRequestGet.js";
import DialogComponent from "../../../components/dialog/index.js";
import TableComponent from "../../../components/Table/index.js";
import {
  PrefundRequestTransactionsheadersAdmin,
  PrefundRequestTransactionsheadersClient,
} from "../../../../data/local/constants/TableHeaders.js";
import secureStorage from "../../../../utility/secureStorage.js";
import { CustomFilter } from "../../../components/CustomFilter.js";
import ButtonComponent from "../../../components/button/index.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddPrefundRequestModal from "./addPrefundModal.js";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost.js";
import { enqueueSnackbar } from "notistack";
import RejectReasonModal from "./rejectReasonPopup.js";
import {
  startFullScreenLoadingAction,
  stopFullScreenLoadingAction,
} from "../../../../data/local/redux/action/fullScreenLoadingAction.js";
import Header from "../../../components/Header/index.js";
//

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PrefundTransaction() {
  const [value, setValue] = useState(0);
  const [role, setRole] = useState("Client");
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [showManulaPrefundTxnViewMoreDialog, setShowManulaPrefundTxnViewMoreDialog] =
    useState(false);
  const [selectedRowForManulaPrefundTxnViewMore, setSelectedRowForManulaPrefundTxnViewMore] =
    useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [dateRangeFilterValue, setDateRangeFilterValue] = useState("");

  const [showAddPredundRequestModal, setShowAddPrefundRequestModal] = useState(false);
  const [showRejectReasonPrefundRequestModal, setShowRejectReasonPrefundRequestModal] =
    useState(false);

  const [currentActionTxn, setCurrentActionTxn] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(0);
  }, []);

  const onActionPrefundRequestTxn = (txnRecord, action, reason = "") => {
    dispatch(startFullScreenLoadingAction());
    ApiRequestPost.approveRejectPrefundRequest({
      status: action === "Approve" ? "Approved" : action === "Reject" ? "Rejected" : "",
      prefundTransactionId: txnRecord.prefundTransactionId,
      reason: reason,
      amount: txnRecord.amount,
      clientId : txnRecord.clientId
    })
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Prefund Request Actioned Successfully", {
            variant: "success",
          });
          getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(stopFullScreenLoadingAction());
      });
  };

  const Filterdata = [
    {
      title: "Search by Date Range",
      type: "dateRange",
      validator: "text",
      placeholder: "Search by Date Range",
      key: "searchByDateRange",
      value: dateRangeFilterValue,
    },
  ];

  const getAllTableDataFromApi = (page, size, dateRange, orderId, txnId, status) => {
    console.log("Data Headers -> ", page, size, dateRange, orderId, txnId, status);
    ApiRequestGet.getPrefundRequestTransactionHistory(page, size, dateRange)
      .then((res) => {
        if (res.status) {
          setTableData(res.data.prefundTransactions);
          console.log("Data from API -> ", res.data.prefundTransactions);
          setTableCurrentPage(res.data.currentPageNo);
          setTableDataTotalNoOfPages(res.data.totalPages);
        } else {
          setTableData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setTableData([]);
      });
  };

  const clearAllFilterValue = () => {
    setDateRangeFilterValue("");
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
  };

  const getAllFilters = (data) => {
    setDateRangeFilterValue(data[0].value?.trim());
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, data[0].value?.trim());
    // setOffset(0);
    // setIsFilterApplied(!isFilterApplied);
  };

  useEffect(() => {
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");

    let role = secureStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rose",
      }}
    >
        <Header
        heading={`Prefund Transaction`}
      />
      <Box
        sx={{ paddingTop: 1, paddingLeft: 2, paddingRight: 2, height: "100%", overflow: "auto" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab
              label="Manual Prefund Txns"
              {...a11yProps(0)}
              style={{ marginRight: 15, textTransform: "none" }}
            />
            <Tab
              label="Ecollect Txns"
              {...a11yProps(1)}
              style={{ marginRight: 15, textTransform: "none" }}
            />
          </Tabs>
          {value === 0 && role === "Client" && (
            <div>
              <ButtonComponent
                label={"Filter"}
                onClick={() => {
                  setOpenFilter(true);
                }}
              />
              <ButtonComponent
                label={"Add Prefund"}
                onClick={() => {
                  setShowAddPrefundRequestModal(true);
                }}
              />
            </div>
          )}
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            {openFilter && (
              <div
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  opacity: openFilter ? 1 : 0,
                  transition: "visibility 0.5s, opacity 0.5s linear",
                  marginTop: "20px",
                  backgroundColor: "white",
                }}
              >
                <CustomFilter
                  show={openFilter}
                  data={Filterdata}
                  search={(data) => {
                    getAllFilters(data);
                  }}
                  onClickClear={() => {
                    clearAllFilterValue();
                    setOpenFilter(false);
                  }}
                  passActiveFilters={() => {}}
                  showClearIcon={true}
                  // passActiveFilters={(data) => {
                  //   setLiveFilters(data);
                  //   call();
                  // }}
                />
              </div>
            )}
            <TableComponent
              minusWidth={50}
              tableHeaders={
                role === "Client"
                  ? PrefundRequestTransactionsheadersClient
                  : PrefundRequestTransactionsheadersAdmin
              }
              tableData={tableData}
              tableTotalPages={tableDataTotalNoOfPages}
              tableCurrentPage={tableCurrentPage}
              tableCurrentPageSize={tableCurrentPageSize}
              onChangeCurrentPage={(page) => {
                setTableCurrentPage(page);
                getAllTableDataFromApi(page, tableCurrentPageSize);
              }}
              onChangeCurrentPageSize={(size) => {
                setTableCurrentPageSize(size);
                getAllTableDataFromApi(tableCurrentPage, size);
              }}
              onClickViewMoreButton={(data) => {
                setShowManulaPrefundTxnViewMoreDialog(true);
                setSelectedRowForManulaPrefundTxnViewMore(data);
              }}
              onActionPrefundRequestTxn={(record, action) => {
                if (action === "Reject") {
                  setCurrentActionTxn(record);
                  setShowRejectReasonPrefundRequestModal(true);
                  return;
                }
                onActionPrefundRequestTxn(record, action);
              }}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Coming Soon!
        </CustomTabPanel>
      </Box>

      <DialogComponent
        showPopup={showAddPredundRequestModal}
        onClickCloseDialog={() => {
          setShowAddPrefundRequestModal(false);
        }}
        heading={"Add Prefund Request"}
      >
        {showAddPredundRequestModal && (
          <AddPrefundRequestModal
            onClose={() => {
              getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
              setShowAddPrefundRequestModal(false);
            }}
          />
        )}
      </DialogComponent>
      <DialogComponent
        showPopup={showRejectReasonPrefundRequestModal}
        onClickCloseDialog={() => {
          setShowRejectReasonPrefundRequestModal(false);
        }}
        heading={"Reject Reason"}
      >
        {showRejectReasonPrefundRequestModal && (
          <RejectReasonModal
            onClickRejectRequestPrefund={(reason) => {
              onActionPrefundRequestTxn(currentActionTxn, "Reject", reason);
              setShowRejectReasonPrefundRequestModal(false);
            }}
          />
        )}
      </DialogComponent>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default PrefundTransaction;
