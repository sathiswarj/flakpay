import React, { useEffect, useState } from "react";
import Header from "../../../presentation/components/Header/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-daterange-picker/dist/css/react-calendar.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import secureStorage from "../../../utility/secureStorage";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import DashboardCards from "./componenets/dashboardCards";
import ButtonComponent from "../../components/button";
import { CustomInput } from "../../components/customInput/CustomInput";
import CustomSelectComponenet from "../../components/CustomDropdown";
import DateRangePicker from "../../components/DateRangePicker";

function Dashboard() {
  const [dashboard, setDashboard] = useState("PAYIN");
  const [role, setRole] = useState("Client");
  const [payinSPList, setPayinSPList] = useState([]);
  const [payoutSPList, setPayoutSPList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedPayoutSP, setSelectedPayoutSP] = useState("");

  const [loading, setLoading] = useState(false);
  const [payinSuccessVolume, setPayinSuccessVolume] = useState("");
  const [payinFailedVolume, setPayinFailedVolume] = useState("");
  const [payinInitiatedVolume, setPayinInitiatedVolume] = useState("");
  const [payinSuccessCount, setPayinSuccessCount] = useState("");
  const [payinFailedCount, setPayinFailedCount] = useState("");
  const [payinInitiatedCount, setPayinInitiatedCount] = useState("");
  const [payoutSuccessVolume, setPayoutSuccessVolume] = useState("");
  const [payoutFailedVolume, setPayoutFailedVolume] = useState("");
  const [payoutInitiatedVolume, setPayoutInitiatedVolume] = useState("");
  const [payoutSuccessCount, setPayoutSuccessCount] = useState("");
  const [payoutFailedCount, setPayoutFailedCount] = useState("");
  const [payoutInitiatedCount, setPayoutInitiatedCount] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectPeriod, setSelectPeriod] = useState("");
  const [selectPeriodDropdown, setSelectPeriodDropdown] = useState([
    { label: "YESTERDAY" },
    { label: "LAST WEEK" },
    { label: "THIS WEEK" },
    { label: "LAST MONTH" },
    { label: "THIS MONTH" },
  ]);

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

  const getMetaDataForPayin = async (clientId = "",startDate,endDate) => {
    console.log("check --> ", clientId);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    setLoading(true);
    ApiRequestGet.getPayinMeta(clientId,formattedStartDate,formattedEndDate)
      .then((res) => {
        setPayinInitiatedVolume(res.data.initiatedVolume);
        setPayinSuccessVolume(res.data.successVolume);
        setPayinFailedVolume(res.data.failedVolume);

        setPayinInitiatedCount(res.data.initiatedCount);
        setPayinSuccessCount(res.data.successCount);
        setPayinFailedCount(res.data.failedCount);
      })
      .catch((err) => {
        console.log("err -> ", err);
      })
      .finally(() => setLoading(false));
  };

  const getMetaDataForPayout = async (clientId = "") => {
    console.log("check --> ", clientId);
    setLoading(true);
    ApiRequestGet.getPayoutMeta(clientId)
      .then((res) => {
        setPayoutInitiatedVolume(res.data.initiatedVolume);
        setPayoutSuccessVolume(res.data.successVolume);
        setPayoutFailedVolume(res.data.failedVolume);

        setPayoutInitiatedCount(res.data.initiatedCount);
        setPayoutSuccessCount(res.data.successCount);
        setPayoutFailedCount(res.data.failedCount);
      })
      .catch((err) => {
        console.log("err -> ", err);
      })
      .finally(() => setLoading(false));
  };

  const getAllClientList = async () => {
    ApiRequestGet.getClientListUnique()
      .then((res) => {
        let temp = [];
        res?.data?.map((item) => {
          temp.push({
            label: item.name,
            value: item.clientId + ":::" + item.name,
          });
        });
        console.log("data -> ", temp);
        setClientList(temp);
      })
      .catch((err) => {
        console.log("err -> ", err);
      });
  };

  const getAllPayoutSPList = async () => {
    ApiRequestGet.getAllPayoutSp()
      .then((res) => {
        let temp = res.data.map((item) => ({
          label: item.serviceProviderName,
          value: item.serviceProviderId + ":::" + item.serviceProviderName,
        }));
        setPayoutSPList(temp);
      })
      .catch((err) => {
        console.log("err -> ", err);
      });
  };

  const calculateSuccessRate = (successCount, initiatedCount) => {
    if (!successCount || !initiatedCount || initiatedCount === 0) {
      return "";  
    }
    return ((initiatedCount / successCount) * 100).toFixed(2) + "%"; 
  };

  useEffect(() => {
    getAllClientList();
    getAllPayoutSPList();
    const roleFromSS = secureStorage.getItem("role");
    setRole(roleFromSS);
  }, []);

  return (
    <>
      <Header heading={"Dashboard"} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <FormControl fullWidth style={{ maxWidth: "100px" }}>
          <InputLabel>Dashboard</InputLabel>
          <Select
            value={dashboard}
            onChange={(e) => setDashboard(e.target.value)}
            label="Dashboard"
          >
            <MenuItem value={"PAYIN"}>PAYIN</MenuItem>
            <MenuItem value={"PAYOUT"}>PAYOUT</MenuItem>
          </Select>
        </FormControl>
        {/* <DateRangePicker /> */}
        {/* 
        {dashboard === "PAYOUT" && role === "Admin" && (
          <div style={{ marginLeft: 15, width: "250px" }}>
            <FormControl fullWidth style={{ maxWidth: "250px" }}>
              <InputLabel>Payout Service Provider</InputLabel>
              <Select
                value={selectedPayoutSP}
                onChange={(e) => setSelectedPayoutSP(e.target.value)}
                label="Payout Service Provider"
              >
                {payoutSPList.map((item) => {
                  return <MenuItem value={item.value}>{item.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        )} */}

        {role === "Admin" && (
          <div style={{ marginLeft: 15, width: "250px" }}>
            <FormControl fullWidth style={{ maxWidth: "250px" }}>
              <InputLabel>Client</InputLabel>
              <Select
                value={selectedClientId}
                onChange={(e) => {
                  setSelectedClientId(e.target.value);
                  if (dashboard === "PAYIN") {
                    getMetaDataForPayin(e.target.value.split(":::")[0]);
                  } else if (dashboard === "PAYOUT") {
                    getMetaDataForPayout(e.target.value.split(":::")[0]);
                  }
                }}
                label="Client"
              >
                {clientList.map((item) => {
                  return <MenuItem value={item.value}>{item.value.split(":::")[1]}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        )}

        {/* <CustomInput
          type="startDateTimePicker"
          value={startDate}
          onChange={(value) => setStartDate(value)}
          placeholder="Start Date"
        />  

        <CustomInput
          type="endDateTimePicker"
          value={endDate}
          onChange={(value) => setEndDate(value)}
          placeholder="End Date"
        /> 

        
        <CustomSelectComponenet 
        value={selectPeriod}
        onChange={(event) => setSelectPeriod(event.target.value)}
        data={selectPeriodDropdown}
        label="Service Type"
        style={{ width: 250,height:40,marginTop:0 }}
        /> */}
 <div style={{ marginLeft: 15 }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(date) => setStartDate(date)}  
        onEndDateChange={(date) => setEndDate(date)}      
        selectPeriod={selectPeriod}                      // Handle selected period (Last 30 min, etc.)
        onPeriodChange={(rangeType) => setSelectPeriod(rangeType)} // Handle when user selects a quick range
      />
</div>
        <ButtonComponent
          loader={loading}
          label={"Load Data"}
          onClick={() =>
            dashboard === "PAYIN"
              ? getMetaDataForPayin(selectedClientId.split(":::")[0],startDate,endDate)
              : getMetaDataForPayout(
                  selectedClientId.split(":::")[0],
                  startDate,
                  endDate,
                  // selectedPayoutSP.split(":::")[0]
                )
          }
        />
        <ButtonComponent
          loader={loading}
          label={"Reset"}
          onClick={() => {
            setSelectedClientId("");
            setStartDate("");
            setEndDate("");
            setSelectedPayoutSP("");
            setDashboard("PAYIN");
            setPayinInitiatedVolume("");
            setPayinSuccessVolume("");
            setPayinFailedVolume("");
            setPayinInitiatedCount("");
            setPayinSuccessCount("");
            setPayinFailedCount("");
            setPayoutInitiatedVolume("");
            setPayoutSuccessVolume("");
            setPayoutFailedVolume("");
            setPayoutInitiatedCount("");
            setPayoutSuccessCount("");
            setPayoutFailedCount("");
          }}
        />
      </div>

      {dashboard === "PAYIN" || dashboard === "PAYOUT" ? (
        <>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"20px",maxWidth:"1400px"}}>
            <DashboardCards
              label={"Total Initiated Volume"}
              value={"₹ " + (dashboard === "PAYIN" ? payinInitiatedVolume : payoutInitiatedVolume)}
              valueColor={"grey"}
              backgroundColor={"lightgrey"}
            />
            <DashboardCards
              label={"Total Success Volume"}
              value={"₹ " + (dashboard === "PAYIN" ? payinSuccessVolume : payoutSuccessVolume)}
              valueColor={"green"}
              backgroundColor={"lightgreen"}
            />
            <DashboardCards
              label={"Total Failed Volume"}
              value={"₹ " + (dashboard === "PAYIN" ? payinFailedVolume : payoutFailedVolume)}
              valueColor={"red"}
              backgroundColor={"pink"}
            />
          
           <DashboardCards
              label={"Total Initiated Count"}
              value={dashboard === "PAYIN" ? payinInitiatedCount : payoutInitiatedCount}
              valueColor={"grey"}
              backgroundColor={"lightgrey"}
            />
            <DashboardCards
              label={"Total Success Count"}
              value={dashboard === "PAYIN" ? payinSuccessCount : payoutSuccessCount}
              valueColor={"green"}
              backgroundColor={"lightgreen"}
            />
            <DashboardCards
              label={"Total Failed Count"}
              value={dashboard === "PAYIN" ? payinFailedCount : payoutFailedCount}
              valueColor={"red"}
              backgroundColor={"pink"}
            />

          <div style={{ gridColumn : "1/span 3"}}></div>
          <DashboardCards
              label={"Success Rate"}
              value={
                dashboard === "PAYIN" ? calculateSuccessRate(payinInitiatedCount, payinSuccessCount) : ""}
              valueColor={"blue"}
              backgroundColor={"lightblue"}
            />
          </div>
          </div>
        </>
      ) : (
        <div></div>
      )}

      {/* <div className="dashboardcenter">
        <div
          style={{
            width: "100%",
            height: "20vh",
            backgroundColor: "#F2F0F0",
            color: "#000000",
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "20px",
          }}
        >
          {role === "Admin" && (
            <div className="container1">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>Custom Collected Amt</div> &nbsp; &nbsp;&nbsp;
                <div>
                  <div
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    📆
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 13,
                          fontWeight: "bold",
                          color: "#2645c3",
                          cursor: "default",
                          display: !dateRange ? "none" : "",
                        }}
                      >
                        {dateRange.split("-").join(" To ")}
                      </p>

                      <div>
                        <DateRangePicker
                          onSelect={(date) => {
                            setDateRange("");
                            onChange(
                              date.start.format("YYYY/MM/DD") + "-" + date.end.format("YYYY/MM/DD")
                            );
                          }}
                          singleDateRange={true}
                        />
                      </div>
                      {hr && min && sec && hr2 && min2 && sec2 && (
                        <p
                          style={{
                            display: "block",
                            fontWeight: "bold",
                            color: "blue",
                          }}
                        >
                          {hr}:{min}:{sec} to {hr2}:{min2}:{sec2}
                        </p>
                      )}

                      <div
                        style={{
                          display: "flex",
                          gap: 3,
                          margin: 5,
                          alignItems: "center",
                        }}
                      >
                        <select
                          size="2"
                          style={{ padding: 2, borderRadius: 2 }}
                          onChange={(e) => setHour(e.target.value)}
                        >
                          <option>Hr</option>
                          {Array.from(Array(24).keys()).map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </select>
                        <select
                          size="2"
                          style={{ padding: 2, borderRadius: 2 }}
                          onChange={(e) => setMinute(e.target.value)}
                        >
                          <option>Min</option>
                          {Array.from(Array(60).keys()).map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </select>
                        <select
                          size="2"
                          style={{ padding: 2, borderRadius: 2 }}
                          onChange={(e) => setSec(e.target.value)}
                        >
                          <option>Sec</option>
                          {Array.from(Array(60).keys()).map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </select>
                        to
                        <select
                          size="2"
                          style={{ padding: 2, borderRadius: 2 }}
                          onChange={(e) => setHour2(e.target.value)}
                        >
                          <option>Hr</option>
                          {Array.from(Array(24).keys()).map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </select>
                        <select
                          size="2"
                          style={{ padding: 2, borderRadius: 2 }}
                          onChange={(e) => setMinute2(e.target.value)}
                        >
                          <option>Min</option>
                          {Array.from(Array(60).keys()).map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </select>
                        <select
                          size="2"
                          style={{ padding: 2, borderRadius: 2 }}
                          onChange={(e) => setSec2(e.target.value)}
                        >
                          <option>Sec</option>
                          {Array.from(Array(60).keys()).map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </select>
                      </div>
                      {
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 9,
                            gap: "10px",
                          }}
                        >
                          {hr && min && sec && hr2 && min2 && sec2 && (
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                background: "blue",
                                fontWeight: "bold",
                                color: "white",
                                cursor: "pointer",
                                borderRadius: "5px",
                                padding: 6,
                                border: "none",
                              }}
                              onClick={() => {
                                getMetaDataCustom(cId, dateRange, sp);
                                handleClose();
                              }}
                            >
                              View
                            </button>
                          )}
                          <button
                            style={{
                              backgroundColor: "green",
                              borderRadius: "5px",
                              color: "white",
                              fontWeight: "bold",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setDateRange("");
                              setHour("");
                              setMinute("");
                              setSec("");
                              setHour2("");
                              setMinute2("");
                              setSec2("");
                              setTotal("");
                            }}
                          >
                            Clear
                          </button>
                        </span>
                      }
                    </Box>
                  </Modal>
                </div>
              </div>
              <div className="con1"></div>
              <div className="con_value">
                <img style={{ width: "35px", height: "40px" }} src={yellow} alt="yellow" />
                <div style={{ fontSize: "20px" }}>₹ {total}</div>
              </div>
            </div>
          )}
          <div className="container2">
            <div>Collected this month</div>
            <div className="con2"></div>
            <div className="con_value">
              <img style={{ width: "35px", height: "40px" }} src={blue} alt="blue" />
              <text style={{ fontSize: "20px" }}>₹ {last30}</text>
            </div>
          </div>
          <div className="container3">
            <div>Collected this week</div>
            <div className="con3"></div>
            <div className="con_value">
              <img style={{ width: "35px", height: "40px" }} src={red} alt="blue" />
              <text style={{ fontSize: "20px" }}>₹ {last7}</text>
            </div>
          </div>

          <div className="container1">
            <div>Today Collected Amount</div>
            <div className="con1"></div>
            <div className="con_value">
              <img style={{ width: "35px", height: "40px" }} src={yellow} alt="yellow" />
              <div style={{ fontSize: "20px" }}>₹ {today}</div>
            </div>
          </div>
        </div>
        <div style={{ gap: "9px", display: "flex", marginTop: "10px" }}>
          <button
            style={{ marginLeft: "550px" }}
            className="graph_button"
            onClick={() => {
              getMetaData();
            }}
          >
            Data view
          </button>
          <button
            onClick={() => {
              getMetaGraphs();
            }}
            className="graph_button"
          >
            Chart view
          </button>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "#F2F0F0",
            justifyContent: "space-evenly",
            padding: "0px 0px",
            color: "#111111",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           
          </div>
        </div>
        <div className="payin">
          {graphData.length > 0 && (
            <h5
              style={{
                writingMode: "vertical-rl",
                textOrientation: "sideways",
              }}
            >
              success volume (₹)
            </h5>
          )}

          {graphData.length > 0 && <PayinChart graphData={graphData} />}
        </div>
        {graphData.length > 0 && (
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Month & Year wise
          </h5>
        )}
      </div> */}
    </>
  );
}

export default Dashboard;