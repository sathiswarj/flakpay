
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import * as React from "react";
import Header from "../../../components/Header/index.js";
import { ApiRequestGet } from "../../../../data/network/services/ApiRequestGet.js";
import DialogComponent from "../../../components/dialog/index.js";
import TableComponent from "../../../components/Table/index.js";
import {
  PayoutTransactionsViewMoreHeader,
  PrefundTransactionsHeaderAdmin,
  PrefundTransactionsHeaderClient,
  WalletTransactionsHeaderAdmin,
  WalletTransactionsHeaderClient,
} from "../../../../data/local/constants/TableHeaders.js";
import PayinTxnDetailsPopup from "./TxnDetailsPopup.js";
import secureStorage from "../../../../utility/secureStorage.js";
import { CustomFilter } from "../../../components/CustomFilter.js";
import ResizeListener from "../../../../utility/ResizeListener.js";
import ButtonComponent from "../../../components/button/index.js";
import UpdateWalletPopup from "./UpdateWallet.js";
import { ApiRequestPost } from "../../../../data/network/services/ApiRequestPost.js";

//

function WalletTransaction() {
  const navigate = useNavigate();
  const { width, height } = ResizeListener();
  const [role, setRole] = useState("Client");
  const [payinbalance, setPayinBalance] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [showViewMoreDialog, setShowViewMoreDialog] = useState(false);
  const [showWalletTopupDialog, setShowWalletTopupDialog] = useState(false);
  const [selectedRowForViewMore, setSelectedRowForViewMore] = useState({});

  const [serviceProviderIdFilterValue, setServiceProviderIdFilterValue] = useState("");
  const [clientIdFilterValue, setClientIdFilterValue] = useState("");
  const [iserveUClientList, setIserveUClientList] = useState([]);

  const [dateRangeFilterValue, setDateRangeFilterValue] = useState("");
  const [orderIdFilterValue, setOrderIdFilterValue] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [startDateFilterValue, setStartDateFilterValue] = useState("");
  const [endDateFilterValue, setEndDateFilterValue] = useState("");
  const [clientNameFilterValue, setClientNameFilterValue] = useState("");

  const [clientList, setClientList] = useState([]);

  
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
      startDate: startDateFilterValue, // No curly braces around startDateFilterValue
      endDate: endDateFilterValue, // No curly braces around endDateFilterValue
      onStartDateChange: handleStartDateChange, // Pass function reference directly
      onEndDateChange: handleEndDateChange, // Pass function reference directly
      onPeriodChange: handlePeriodChange, // Pass function reference directly
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
      options: [
        { value: "", label: "Select Client" },
        ...clientList],
    },
    {
      title: "Search By Status",
      type: "select",
      validator: "text",
      placeholder: "Search by Status",
      key: "searchByStatus",
      value: statusFilterValue,
      options: [
        { value: "", label: "Search by Status" }, // You can include an option to view all
        { value: "CREDIT", label: "CREDIT" },
        { value: "DEBIT", label: "DEBIT" },

      ],
    },
    {
      title: "Search by Order Id",
      type: "input",
      validator: "text",
      placeholder: "Search by Order Id",
      key: "searchByOrderId",
      value: orderIdFilterValue,
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
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // For AM/PM format
    });
  };

  const getAllTableDataFromApi = (page, size, startDate, endDate, orderId, clientId , status) => {
    console.log("Data Headers -> ", page, size, startDate, endDate, orderId,clientId, status);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    ApiRequestGet.getPayoutTransactionHistory(
      page,
      size,
      formattedStartDate,
      formattedEndDate,
      orderId,
      clientId,
      status,
      "PREFUND"
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

  const getIserveUPayoutBalance = () => {
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
    setStatusFilterValue("");
    setClientNameFilterValue("");
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
  };

  const oncClickDownloaded = () => {
    ApiRequestGet.getPayinTransactionHistoryForDownload(
      startDateFilterValue,
      endDateFilterValue,
      clientNameFilterValue,
      statusFilterValue,
      orderIdFilterValue
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

  const getAllIserveUClients = () => {
    ApiRequestGet.getIserveUClientList()
      .then((res) => {
        if (res.success) {
          setIserveUClientList(res.data.clients);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const topupWallet = (balance, clientId, txnType) => {
    ApiRequestPost.updateIserveUClientWallet(clientId, balance, txnType)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Wallet Updated Successfully", {
            variant: "success",
          });
          getAllTableDataFromApi(
            tableCurrentPage,
            tableCurrentPageSize,
            startDateFilterValue,
            endDateFilterValue,
            statusFilterValue,
            orderIdFilterValue
          );
          setShowWalletTopupDialog(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };



  const getAllFilters = (data) => {
    const startDateRange = data[0].startDate;
    const endDateRange = data[0].endDate;

    setStartDateFilterValue(startDateRange);
    setEndDateFilterValue(endDateRange);
    setClientNameFilterValue(data[1].value?.trim());
    setStatusFilterValue(data[2].value?.trim());
    setOrderIdFilterValue(data[3].value?.trim());
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
    getAllClientList();
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");

    let role = secureStorage.getItem("role");
    setRole(role);
    if (role === "Client") getIserveUPayoutBalance();
    if (role === "Admin") getAllIserveUClients();
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
        heading={`Wallet Transaction`}
        showDownloadButton={tableData.length > 0}
        onClickDownloadButton={() => {
          oncClickDownloaded();
        }}
      >
        {role === "Admin" && (
          <ButtonComponent
            label={"Topup Wallet"}
            onClick={() => {
              setShowWalletTopupDialog(true);
            }}
          />
        )}
      </Header>

      <DialogComponent
        showPopup={showWalletTopupDialog}
        onClickCloseDialog={() => {
          setShowWalletTopupDialog(false);
        }}
        maxWidth={"xl"}
        heading={"Topup Wallet"}
        dimensions={{ width: width * 0.8 }}
      >
        <UpdateWalletPopup
          clientList={iserveUClientList}
          onClose={() => {
            setShowViewMoreDialog(false);
          }}
          onClickActionWallet={topupWallet}
        />
      </DialogComponent>

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

       
        <div
          style={{
            width: "100%",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            transition: "visibility 0.5s, opacity 0.5s linear",
            marginBottom: "20px",
            backgroundColor: "white",
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
            passActiveFilters={() => { }}
            showClearIcon={true}
          // passActiveFilters={(data) => {
          //   setLiveFilters(data);
          //   call();
          // }}
          />
        </div>
  
      <TableComponent
        tableHeaders={
          role === "Client" ? WalletTransactionsHeaderClient : WalletTransactionsHeaderAdmin
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
        onClickSwitchButton={(client) => { }}
      />
    </div>
  );
}
export default WalletTransaction;
