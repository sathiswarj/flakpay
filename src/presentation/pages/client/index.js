import "../../pages/Transaction/transaction.css";
import Header from "../../../presentation/components/Header/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet.js";
import { ClientTableHeader } from "../../../data/local/constants/TableHeaders.js";
import FilterPopup from "../../components/Popup/index.js";
import TableComponent from "../../components/Table/index.js";
import DialogComponent from "../../components/dialog/index.js";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost.js";
import ClientDetailsPopupHome from "./ClientDetails/index.js";
import { CustomFilter } from "../../components/CustomFilter.js";
import Loader from "../../components/loader/loader.js";
import AddClientHome from "./AddClientSteps/home.js";

function Client() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const [addClientActionLoading, setAddClientActionLoading] = useState(false);
  
  const [showViewMoreDialog, setShowViewMoreDialog] = useState(false);
  const [selectedClientForViewMore, setSelectedClientForViewMore] = useState({});

  const [companyNameFilterValue, setCompanyNameFilterValue] = useState("");
  const [emailFilterValue, setEmailFilterValue] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [startDateFilterValue, setStartDateFilterValue] = useState("");
  const [endDateFilterValue, setEndDateFilterValue] = useState("");

  const [serviceProviderIdFilterValue, setServiceProviderIdFilterValue] = useState("");
  const [clientIdFilterValue, setClientIdFilterValue] = useState("");

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
      title: "Search by Company Name",
      type: "input",
      validator: "text",
      placeholder: "Search by Company Name",
      key: "searchByCompanyName",
      value: companyNameFilterValue,
    },
    {
      title: "Search By Email",
      type: "input",
      validator: "text",
      placeholder: "Search by Email",
      key: "searchByEmail",
      value: emailFilterValue,
    },
    {
      title: "Search By Status",
      type: "status",
      validator: "text",
      placeholder: "Search by Status",
      key: "searchByStatus",
      value: statusFilterValue,
    },
  ];

  const createClient = async (client) => {
    setAddClientActionLoading(true);
    ApiRequestPost.addClient(
      client?.name,
      client?.companyName,
      client?.email,
      client?.mobileNumber,
      client?.address,
      client?.gst,
      client?.pan,
    )
      .then((res) => {
        if (res.status) {
          enqueueSnackbar("Client Added Successfully", {
            variant: "success",
          });
          getAllClientsList(tableCurrentPage, tableCurrentPageSize);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setAddClientActionLoading(false);
        setShowAddClientDialog(false);
      });
  };

  const updateClientStatus = async (clientId, status) => {
    ApiRequestPost.updateClientStatus(clientId, status)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          getAllClientsList(tableCurrentPage, tableCurrentPageSize);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setAddClientActionLoading(false);
        setShowAddClientDialog(false);
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
      hour12: true,
    }).replace(',', '').toUpperCase(); 
  };

  const getAllClientsList = (
    page,
    pageSize,
    spId,
    cLId,
    startDate,
    endDate,
    companyName,
    email,
    status,
  ) => {
    console.log("Data Client -> ", cLId);
    const formattedStartDate = startDate ? formatDate(startDate) : '';
    const formattedEndDate = endDate ? formatDate(endDate) : '';
    setLoading(true);
    ApiRequestGet.getClientList(
      page,
      pageSize,
      spId,
      cLId,
      formattedStartDate,
      formattedEndDate,
      companyName,
      email,
      status,
    )
      .then((res) => {
        if (res.status) {
          setTableData(res.data.clients);
          setTableCurrentPage(res.data.currentPageNo);
          setTableDataTotalNoOfPages(res.data.totalPages);
        } else {
          setTableData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setTableData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllFilters = (data) => {
    const startDateRange = data[0].startDate;
    const endDateRange = data[0].endDate;
    const companyName = data[1].value?.trim();
    const email = data[2].value?.trim();
    const status = data[3].value;
    console.log("After Status-->", status);
    if (startDateRange && endDateRange && new Date(startDateRange) > new Date(endDateRange)) {
      enqueueSnackbar("End date cannot be earlier than the start date", { variant: "error" });
      return;
    }

    setStartDateFilterValue(startDateRange);
    setEndDateFilterValue(endDateRange);
    setCompanyNameFilterValue(companyName);
    setEmailFilterValue(email);
    setStatusFilterValue(status);

    getAllClientsList(
      tableCurrentPage,
      tableCurrentPageSize,
      serviceProviderIdFilterValue,
      clientIdFilterValue,
      startDateRange,
      endDateRange,
      companyName,
      email,
      status,
    );
  };

  const clearAllFilterValue = () => {
    setStartDateFilterValue("");
    setEndDateFilterValue("");
    setCompanyNameFilterValue("");
    setEmailFilterValue("");
    setStatusFilterValue("");
    getAllClientsList(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
  };

  const refreshClientList = () => {
    getAllClientsList(
      tableCurrentPage,
      tableCurrentPageSize,
      serviceProviderIdFilterValue,
      clientIdFilterValue,
      startDateFilterValue,
      endDateFilterValue,
      companyNameFilterValue,
      emailFilterValue,
      statusFilterValue,
    );
  };

  useEffect(() => {
    getAllClientsList(tableCurrentPage, tableCurrentPageSize, "", "", "", "");
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
        heading={"Client"}
        showAddButton={true}
        addButtonText={"Add Client"}
        onClickAddButton={() => {
          setShowAddClientDialog(true);
        }}
      >
        {/* <FilterPopup
          searchFiledPlaceHolder={"Client Name"}
          onClickClear={() => {
            getAllClientsList();
          }}
          onClickSearch={(utr) => {
            getAllClientsList(tableCurrentPage, tableCurrentPageSize);
          }}
        /> */}
      </Header>
    
      <DialogComponent
        showPopup={showAddClientDialog}
        onClickCloseDialog={() => {
          setShowAddClientDialog(false);
          navigate('/client')
        }}
        heading={"Add Client"}
      >
        <AddClientHome  onUserAdded={() => {
                setShowAddClientDialog(false); 
                getAllClientsList(); 
            }} />
        </DialogComponent>


      <DialogComponent
        showPopup={showViewMoreDialog}
        onClickCloseDialog={() => {
          setShowViewMoreDialog(false);
        }}
        heading={selectedClientForViewMore.companyName}
      >
        <ClientDetailsPopupHome data={selectedClientForViewMore} refreshData={refreshClientList} />
      </DialogComponent>
      <div
          style={{
            width: "100%",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            // opacity: openFilter ? 1 : 0,
            transition: "visibility 0.5s, opacity 0.5s linear",
            marginBottom:"20px"
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
          showClearIcon={true} />
          </div>
    

      {loading ? (
        <Loader />
      ) : (
        <TableComponent
          tableHeaders={ClientTableHeader}
          tableData={tableData}
          tableTotalPages={tableDataTotalNoOfPages}
          tableCurrentPage={tableCurrentPage}
          tableCurrentPageSize={tableCurrentPageSize}
          onChangeCurrentPage={(page) => {
            setTableCurrentPage(page);
            getAllClientsList(
              page,
              tableCurrentPageSize,
              serviceProviderIdFilterValue,
              clientIdFilterValue,
              startDateFilterValue,
              endDateFilterValue,
              companyNameFilterValue,
              emailFilterValue,
              statusFilterValue,
            );
          }}
          onChangeCurrentPageSize={(size) => {
            setTableCurrentPageSize(size);
            getAllClientsList(
              tableCurrentPage,
              size,
              serviceProviderIdFilterValue,
              clientIdFilterValue,
              startDateFilterValue,
              endDateFilterValue,
              companyNameFilterValue,
              emailFilterValue,
              statusFilterValue,
            );
          }}
          onClickViewMoreButton={(client) => {
            setShowViewMoreDialog(true);
            setSelectedClientForViewMore(client);
          }}
          onClickSwitchButton={(client) => {
            console.log("Check -> ", client.clientId);
            updateClientStatus(client.clientId, !client.status);
          }}
        />
      )}
    </div>
  );
}

export default Client;
