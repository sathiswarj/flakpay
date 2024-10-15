import { useEffect, useState } from "react";
import "../transaction.css";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import * as React from "react";
import Header from "../../../components/Header/index.js";
import { ApiRequestGet } from "../../../../data/network/services/ApiRequestGet.js";
import DialogComponent from "../../../components/dialog/index.js";
import TableComponent from "../../../components/Table/index.js";
import {
  PayinTransactionsHeaderAdmin,
  PayinTransactionsHeaderClient,
  PayinTransactionsViewMoreHeader,
  PayoutTransactionsHeaderAdmin,
  PayoutTransactionsHeaderClient,
  PayoutTransactionsViewMoreHeader,
} from "../../../../data/local/constants/TableHeaders.js";
import PayinTxnDetailsPopup from "./TxnDetailsPopup.js";
import secureStorage from "../../../../utility/secureStorage.js";
import { CustomFilter } from "../../../components/CustomFilter.js";
import ResizeListener from "../../../../utility/ResizeListener.js";

//

function PayoutTransaction() {
  const navigate = useNavigate();
  const { width, height } = ResizeListener();
  const [role, setRole] = useState("Client");
  const [payoutBalance, setPayoutBalance] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [showViewMoreDialog, setShowViewMoreDialog] = useState(false);
  const [selectedRowForViewMore, setSelectedRowForViewMore] = useState({});

  const [serviceProviderIdFilterValue, setServiceProviderIdFilterValue] = useState("");
  const [clientIdFilterValue, setClientIdFilterValue] = useState("");

  const [openFilter, setOpenFilter] = useState(false);
  
  const [orderIdFilterValue, setOrderIdFilterValue] = useState("");
  const [txnIdFilterValue, setTxnIdFilterValue] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [startDateFilterValue, setStartDateFilterValue] = useState("");
  const [endDateFilterValue, setEndDateFilterValue] = useState("");

  const handleStartDateChange = (date) => {
    setStartDateFilterValue(date);
  };

  const handleEndDateChange = (date) => {
    setEndDateFilterValue(date);
  };

  const handlePeriodChange = (period) => {
    console.log("Selected period:", period); 
  };

  const Filterdata = [
    {
      title: "Search by Date Range",
      type: "startDateTimePicker",
      startDate: startDateFilterValue, // No curly braces around startDateFilterValue
      endDate: endDateFilterValue, // No curly braces around endDateFilterValue
      onStartDateChange: handleStartDateChange, // Pass function reference directly
      onEndDateChange: handleEndDateChange, // Pass function reference directly
      onPeriodChange: handlePeriodChange, // Pass function reference directly
      validator: "text",
      placeholder: "Search by Date Range",
      key: "searchByDateRange"
    },  
    {
      title: "Search by Order Id",
      type: "input",
      validator: "text",
      placeholder: "Search by Order Id",
      key: "searchByOrderId",
      value: orderIdFilterValue,
    },
    {
      title: "Search By Txn Id",
      type: "input",
      validator: "text",
      placeholder: "Search by Txn Id",
      key: "searchByTxnId",
      value: txnIdFilterValue,
    },
    {
      title: "Search By Status",
      type: "input",
      validator: "text",
      placeholder: "Search by Status",
      key: "searchByStatus",
      value: statusFilterValue,
    },
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).replace(',', '').toUpperCase(); 
  };

  const getAllTableDataFromApi = (page, size, startDate, endDate, orderId, txnId, status) => {
    console.log("Data Headers -> ", page, size, startDate, endDate, orderId, txnId, status);
    const formattedStartDate = startDate ? formatDate(startDate) : '';
  const formattedEndDate = endDate ? formatDate(endDate) : '';
    ApiRequestGet.getPayoutTransactionHistory(page, size, formattedStartDate, formattedEndDate, orderId, txnId, status,"PAYOUT")
      .then((res) => {
        if (res.status) {
          setTableData(res.data.transactions);
          console.log("Data from API -> ", res.data.transactions);
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

  const getIserveUPayoutBalance = () => {
    console.log("checking....")
    ApiRequestGet.getClientPayoutBalance()
      .then((res) => {
        if (res.statusCode === 200) {
          setPayoutBalance(res.data.balance);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearAllFilterValue = () => {
    setStartDateFilterValue("");
    setEndDateFilterValue("");
    setOrderIdFilterValue("");
    setTxnIdFilterValue("");
    setStatusFilterValue("");
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
  };

  const oncClickDownloaded = () => {
    ApiRequestGet.getIserveuPayoutTransactionHistoryForDownload(
      startDateFilterValue,
      endDateFilterValue,
      orderIdFilterValue,
      txnIdFilterValue,
      statusFilterValue
    )
      .then((res) => {
        saveAs(res, "payin-transaction.csv");
        enqueueSnackbar("Download Successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  };

  const getAllFilters = (data) => {
    const startDateRange = data[0].startDate;
    const endDateRange = data[0].endDate;

    setStartDateFilterValue(startDateRange);
    setEndDateFilterValue(endDateRange);
    setOrderIdFilterValue(data[1].value?.trim());
    setTxnIdFilterValue(data[2].value?.trim());
    setStatusFilterValue(data[3].value?.trim());
    getAllTableDataFromApi(
      tableCurrentPage,
      tableCurrentPageSize,
      startDateRange,
      endDateRange,
      data[1].value?.trim(),
      data[2].value?.trim(),
      data[3].value?.trim()
    );
    // setOffset(0);
    // setIsFilterApplied(!isFilterApplied);
  };

  useEffect(() => {
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
    let role = secureStorage.getItem("role");
    setRole(role);
    if (role === "Client") getIserveUPayoutBalance();
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
        heading={`Payout Transaction`}
        showFilterButton={true}
        onClickFilterButton={() => {
          setOpenFilter(!openFilter);
        }}
        showDownloadButton={tableData.length > 0}
        onClickDownloadButton={() => {
          oncClickDownloaded();
        }}
        
      >
        {role === "Client" && <div>Balance : ₹ {payoutBalance}</div>}
      </Header>

      <DialogComponent
        showPopup={showViewMoreDialog}
        onClickCloseDialog={() => {
          setShowViewMoreDialog(false);
        }}
        maxWidth={"xl"}
        heading={"Txn Details"}
        dimensions={{ width: width * 0.8 }}
      >
        <PayinTxnDetailsPopup
          headers={PayoutTransactionsViewMoreHeader}
          txnData={selectedRowForViewMore}
          onClose={() => {
            setShowViewMoreDialog(false);
          }}
        />
      </DialogComponent>

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
        tableHeaders={
          role === "Client" ? PayoutTransactionsHeaderClient : PayoutTransactionsHeaderAdmin
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
          setShowViewMoreDialog(true);
          setSelectedRowForViewMore(data);
        }}
        onClickSwitchButton={(client) => {}}
      />
    </div>
  );
}
export default PayoutTransaction;
