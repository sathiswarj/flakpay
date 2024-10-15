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
  PayinTransactionsViewMoreHeader,
  SettlementTransactionsHeaderAdmin,
  SettlementTransactionsHeaderClient,
} from "../../../../data/local/constants/TableHeaders.js";
import PayinTxnDetailsPopup from "./TxnDetailsPopup.js";
import secureStorage from "../../../../utility/secureStorage.js";
import { CustomFilter } from "../../../components/CustomFilter.js";

//

function SettlementTransaction() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Client");
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [showViewMoreDialog, setShowViewMoreDialog] = useState(false);
  const [selectedRowForViewMore, setSelectedRowForViewMore] = useState({});

  const [serviceProviderIdFilterValue, setServiceProviderIdFilterValue] = useState("");
  const [clientIdFilterValue, setClientIdFilterValue] = useState("");

  const [clientList, setClientList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [startDateFilterValue, setStartDateFilterValue] = useState("");
  const [clientNameFilterValue, setClientNameFilterValue] = useState("");
  const [settlementTxnIdFilterValue, setSettlementTxnIdFilterValue] = useState("");
  const [endDateFilterValue, setEndDateFilterValue] = useState("");


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
      options: [{ value: "", label: "Select Client" }, ...clientList],
    },
    {
      title: "Search By SettlementTxnId",
      type: "input",
      validator: "text",
      placeholder: "Search by SettlementTxnId",
      key: "searchBySettlementTxnId",
      value: settlementTxnIdFilterValue,
    },
  ];

  const clearAllFilterValue = () => {
    setStartDateFilterValue("");
    setEndDateFilterValue("");
    setClientNameFilterValue("");
    setSettlementTxnIdFilterValue("");
    getAllTableDataFromApi(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
  };


  const getAllFilters = (data) => {
    const startDateRange = data[0].startDate;
    const endDateRange = data[0].endDate;
    const clientName = data[1].value?.trim();
    const settlementTransactionId = data[2].value?.trim();
    if (startDateRange && endDateRange && new Date(startDateRange) > new Date(endDateRange)) {
      enqueueSnackbar("End date cannot be earlier than the start date", { variant: "error" });
      return;
    }

    setStartDateFilterValue(startDateRange);
    setEndDateFilterValue( endDateRange);
    setClientNameFilterValue(clientName);
    setSettlementTxnIdFilterValue(settlementTransactionId);
    getAllTableDataFromApi(
      tableCurrentPage, 
      tableCurrentPageSize, 
      startDateRange,
      endDateRange,
      clientName,
      settlementTransactionId
    );
  };

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

  const getAllTableDataFromApi = (page, pageSize, startDate,endDate,clientName,
    settlementTransactionId) => {
      const formattedStartDate = startDate ? formatDate(startDate) : '';
      const formattedEndDate = endDate ? formatDate(endDate) : '';
    ApiRequestGet.getSettlementTransactionHistory(page, pageSize, formattedStartDate,formattedEndDate,clientName,settlementTransactionId)
      .then((res) => {
        if (res.status) {
          setTableData(res.data.settlementTransactions);
          setTableCurrentPage(res.data.totalPages);
        } else {
          setTableData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setTableData([]);
      });
  };

  const onClickDownload = () => {
    ApiRequestGet.getSettlemnentsTransactionHistoryForDownload(startDateFilterValue,endDateFilterValue)
      .then((res) => {
        saveAs(res, "settlement-transaction.csv");
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

  useEffect(() => {
    getAllClientList();
    getAllTableDataFromApi(
      tableCurrentPage,
      tableCurrentPageSize,
      startDateFilterValue,
      endDateFilterValue,
      serviceProviderIdFilterValue,
      clientIdFilterValue
    );
    let tempRole = secureStorage.getItem("role");
    setRole(tempRole);
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
        heading={"Settlement Transaction"}
        showAddButton={role === "Admin"}
        addButtonText={"Manual Settlement"}
        onClickAddButton={() => {
          navigate("/ManualSettlement");
        }}
        showFilterButton={true}
        onClickFilterButton={() => {
          setOpenFilter(!openFilter);
        }}
        showDownloadButton={false}
        onClickDownloadButton={onClickDownload}
      ></Header>

      <DialogComponent
        showPopup={showViewMoreDialog}
        onClickCloseDialog={() => {
          setShowViewMoreDialog(false);
        }}
        heading={"Txn Details"}
      >
        <PayinTxnDetailsPopup
          headers={PayinTransactionsViewMoreHeader}
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
          role === "Admin" ? SettlementTransactionsHeaderAdmin : SettlementTransactionsHeaderClient
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
export default SettlementTransaction;
