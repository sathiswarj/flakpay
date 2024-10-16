import { useEffect, useState } from "react";
import "../transaction.css";

import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import * as React from "react";
import Header from "../../../components/Header/index.js";
import { ApiRequestGet } from "../../../../data/network/services/ApiRequestGet.js";
import FilterPopup from "../../../components/Popup/index.js";
import DialogComponent from "../../../components/dialog/index.js";
import TableComponent from "../../../components/Table/index.js";
import {
  PayinTransactionsHeaderAdmin,
  PayinTransactionsHeaderClient,
  PayinTransactionsViewMoreHeader,
} from "../../../../data/local/constants/TableHeaders.js";
import PayinTxnDetailsPopup from "./TxnDetailsPopup.js";
import secureStorage from "../../../../utility/secureStorage.js";
import { CustomFilter } from "../../../components/CustomFilter.js";
import ResizeListener from "../../../../utility/ResizeListener.js";

function PayInTransaction() {
  const navigate = useNavigate();
  const { width, height } = ResizeListener();
  const [role, setRole] = useState("Client");
  const [payinbalance, setPayinBalance] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [showViewMoreDialog, setShowViewMoreDialog] = useState(false);
  const [selectedRowForViewMore, setSelectedRowForViewMore] = useState({});

  const [clientList, setClientList] = useState([]);

  const [startDateFilterValue, setStartDateFilterValue] = useState("");
  const [endDateFilterValue, setEndDateFilterValue] = useState("");
  const [orderIdFilterValue, setOrderIdFilterValue] = useState("");
  const [txnIdFilterValue, setTxnIdFilterValue] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [clientNameFilterValue, setClientNameFilterValue] = useState("");
  const [utrFilterValue, setUtrFilterValue] = useState("");

  const handleStartDateChange = (date) => {
    setStartDateFilterValue(date);
  };

  const handleEndDateChange = (date) => {
    setEndDateFilterValue(date);
  };

  const handlePeriodChange = (period) => {
    console.log("Selected period:", period); // Log or handle the selected period
  };

  const Filterdata = [
    {
      title: "Search by Date Range",
      type: "startDateTimePicker",
      startDate: startDateFilterValue,
      endDate: endDateFilterValue,
      onStartDateChange: handleStartDateChange,
      onEndDateChange: handleEndDateChange,
      onPeriodChange: handlePeriodChange,
      validator: "text",
      placeholder: "Search by Date Range",
      key: "searchByDateRange",
    },

    {
      title: "Search by Client Name",
      type: "select",
      validator: "text",
      placeholder: "Search by Client",
      key: "searchByClient",
      value: clientNameFilterValue,
      options: [{ value: "", label: "Select Client" }, ...clientList],
    },
    {
      title: "Search By Status",
      type: "select",
      validator: "text",
      placeholder: "Search by Status",
      key: "searchByStatus",
      value: statusFilterValue,
      options: [
        { value: "", label: "Search by Status" },
        { value: "INITIATED", label: "INITIATED" },
        { value: "SUCCESS", label: "SUCCESS" },
        { value: "FAILED", label: "FAILED" },
        { value: "PENDING", label: "PENDING" },
        { value: "TAMPERED", label: "TAMPERED" },
        { value: "DUPLICATE", label: "DUPLICATE" },
        { value: "REFUNDED", label: "REFUNDED" },
      ],
    },
    {
      title: "Search By UTR",
      type: "input",
      validator: "text",
      placeholder: "Search by UTR",
      key: "searchByUtr",
      value: utrFilterValue,
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
  ];

  const getAllClientList = async () => {
    ApiRequestGet.getClientListUnique()
      .then((res) => {
        let temp = [];
        res?.data?.map((item) => {
          temp.push({
            label: item.name,
            value: item.clientId,
          });
        });
        console.log("data -> ", temp);
        setClientList(temp);
      })
      .catch((err) => {
        console.log("err -> ", err);
      });
  };

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", "")
      .toUpperCase();
  };

  const getAllTableDataFromApi = (
    page,
    size,
    startDate,
    endDate,
    clientId,
    status,
    utr,
    orderId,
    txnId,
  ) => {
    console.log("Data Client -> ", clientId);
    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";
    ApiRequestGet.getPayinTransactionHistory(
      page,
      size,
      formattedStartDate,
      formattedEndDate,
      clientId,
      status,
      utr,
      orderId,
      txnId,
    )
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
  const selectedStartDate = startDateFilterValue;
  const selectedEndDate = endDateFilterValue;

  const getPayinbalance = () => {
    ApiRequestGet.getClientPayinBalance()
      .then((res) => {
        if (res.success) {
          setPayinBalance(res.data.balance);
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
    setClientNameFilterValue("");
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
  };

  const oncClickDownloaded = () => {
    ApiRequestGet.getPayinTransactionHistoryForDownload(
      startDateFilterValue,
      endDateFilterValue,
      orderIdFilterValue,
      txnIdFilterValue,
      statusFilterValue,
      clientNameFilterValue,
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
    console.log("Data from Filter -> ", data);
    const startDateRange = data[0].startDate;
    const endDateRange = data[0].endDate;

    setStartDateFilterValue(startDateRange);
    setEndDateFilterValue(endDateRange);
    setClientNameFilterValue(data[1].value?.trim());
    setStatusFilterValue(data[2].value?.trim());
    setUtrFilterValue(data[3].value?.trim());
    setOrderIdFilterValue(data[4].value?.trim());
    setTxnIdFilterValue(data[5].value?.trim());

    getAllTableDataFromApi(
      tableCurrentPage,
      tableCurrentPageSize,
      startDateRange,
      endDateRange,
      data[1].value?.trim(),
      data[2].value?.trim(),
      data[3].value?.trim(),
      data[4].value?.trim(),
      data[5].value?.trim(),
    );
    // setOffset(0);
    // setIsFilterApplied(!isFilterApplied);
  };

  useEffect(() => {
    getAllClientList();
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "", "", "");
    let role = secureStorage.getItem("role");
    setRole(role);
    if (role === "Client") getPayinbalance();
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
        heading={`Payin Transaction`}
        showDownloadButton={tableData.length > 0}
        onClickDownloadButton={() => {
          oncClickDownloaded();
        }}
      >
        {role === "Client" && <div>Balance : ₹ {payinbalance}</div>}
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
          headers={PayinTransactionsViewMoreHeader}
          txnData={selectedRowForViewMore}
          onClose={() => {
            setShowViewMoreDialog(false);
          }}
        />
      </DialogComponent>

      
        <div
          style={{
            width: "100%",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            // opacity: openFilter ? 1 : 0,
            transition: "visibility 0.5s, opacity 0.5s linear",
            marginBottom: "20px",
          }}
        >
          <CustomFilter
            show={true}
            data={Filterdata}
            search={(data) => {
              getAllFilters(data);
            }}
            onClickClear={() => {
              clearAllFilterValue();
              
            }}
            passActiveFilters={() => {}}
            showClearIcon={true}
            // passActiveFilters={(data) => {
            //   setLiveFilters(data);
            //   call();
            // }}
          />
        </div>
     
      <TableComponent
        tableHeaders={
          role === "Client" ? PayinTransactionsHeaderClient : PayinTransactionsHeaderAdmin
        }
        tableData={tableData}
        tableTotalPages={tableDataTotalNoOfPages}
        tableCurrentPage={tableCurrentPage}
        tableCurrentPageSize={tableCurrentPageSize}
        onChangeCurrentPage={(page) => {
          setTableCurrentPage(page);
          getAllTableDataFromApi(
            page,
            tableCurrentPageSize,
            startDateFilterValue,
            endDateFilterValue,
            clientNameFilterValue,
            statusFilterValue,
            utrFilterValue,
            orderIdFilterValue,
            txnIdFilterValue,
          );
        }}
        onClickViewMoreButton={(data) => {
          setShowViewMoreDialog(true);
          setSelectedRowForViewMore(data);
        }}
        onChangeCurrentPageSize={(size) => {
          setTableCurrentPageSize(size);
          getAllTableDataFromApi(
            tableCurrentPage,
            size,
            startDateFilterValue,
            endDateFilterValue,
            clientNameFilterValue,
            statusFilterValue,
            utrFilterValue,
            orderIdFilterValue,
            txnIdFilterValue,
          );
        }}
        onClickSwitchButton={(client) => {}}
      />
    </div>
  );
}
export default PayInTransaction;
