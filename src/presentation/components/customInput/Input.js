import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { SearchIcon } from "../../resources/assetsManager";
import { SIDEBAR_COLOR } from "../../resources/colorsManager";
import "./input.css";
import { validate } from "./validator";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  DateTimeField,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import DateRangePicker from "../../components/DateRangePicker";

const Input = ({
  title,
  styles,
  value,
  placeholder,
  onChange,
  validator,
  errorMsgText,
  type,
  options,
  showBadge,
  showErrorMsg,
  isSpaceRequired = false,
  setNamesError,
  disabled,
  maxLength,
  onPressEnter,
  autoFocus,
  isPassword,
  isSvgIconRequired,
  imageUpload,
  isOtpField = false,
  dataTestId = "input",
  maxDate,
  filterFocus,
  dropdownImage,
  dropdownStyle,
  addMoney = false,
  onKeyPress,
  onMouseEnter,
  tabIndex,
  inputcomponentStyles,
  isRightIconRequired = false,
  rightIcon,
  isMandatory = false,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  selectPeriod,
  onPeriodChange,
}) => {
  const [focus, setFocus] = useState(false);
  const wrapperRef = useRef(null);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [startDateFilterValue, setStartDateFilterValue] = useState("");
  const [endDateFilterValue, setEndDateFilterValue] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const [quickSelect, setQuickSelect] = useState({
    rangeType: "Last",
    number: "",
    unit: "",
  });
  const handleApply = (rangeType, number, unit) => {
    const now = moment();
    let newStartDate;
    let newEndDate = now.toDate();

    if (quickSelect.rangeType === "Last") {
      newStartDate = now.subtract(number, unit).toDate();
    } else if (quickSelect.rangeType === "Today") {
      newStartDate = moment().startOf("day").toDate();
    } else if (quickSelect.rangeType === "This Week") {
      newStartDate = moment().startOf("week").toDate();
    }

    onStartDateChange(newStartDate);
    onEndDateChange(newEndDate);
    onPeriodChange(rangeType);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleQuickSelectChange = (field, value) => {
    setQuickSelect((prev) => ({ ...prev, [field]: value }));
  };

  const applyCommonRange = (rangeType, number, unit) => {
    setQuickSelect({ rangeType, number, unit });
    handleApply(rangeType, number, unit);
  };

  const openStartDatePicker = () => {
    setIsStartDatePickerOpen(true);
    setIsEndDatePickerOpen(false);
  };

  const openEndDatePicker = () => {
    setIsEndDatePickerOpen(true);
    setIsStartDatePickerOpen(false);
  };

  const handleChangeRaw = (date) => {
    console.log("Date-->", date.target.value);
    date.target.value = moment(date).format("DD/MM/YYYY");
  };

  const dateTimePickerStyle = {
    position: "relative",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: "rgb(242, 242, 242)",
    width: "300px",
    "& .MuiOutlinedInput-root": {
      borderColor: "transparent",
      width: "100%",
    },
    "& .MuiInputBase-input": {
      padding: "10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px black",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px black",
    },
    "& .MuiInputAdornment-root": {
      position: "absolute",
      left: 190,
    },
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDateRange(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  switch (type) {
    case "input":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: 250,
              border: validationError ? "1px solid red" : "0.01px solid lightgrey",
              paddingLeft: 20,

              fontSize: 20,
              alignItems: "center",
              overflow: "hidden",
              ...styles,
            }}
          >
            {validator === "amount1" && <p style={{ margin: 0 }}>₹</p>}
            {validator === "amount" && <p style={{ margin: 0 }}>₹</p>}
            {/* {title && <p style={{ color: "#000", marginBottom: 0 }}>{title}</p>} */}
            <input
              autoComplete={"off"}
              tabIndex={tabIndex}
              id="inputelement"
              onKeyPress={onKeyPress}
              className="latoRegular"
              data-testid={dataTestId}
              onClick={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && onPressEnter) {
                  onPressEnter();
                }
              }}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                width: "100%",
                // width: "80%",
                // width: "100%",
                height: "100%",

                ...inputcomponentStyles,
              }}
              type={isPassword || isOtpField ? "password" : type === "email" ? "email" : "text"}
              disabled={disabled}
              maxLength={maxLength}
              value={value}
              placeholder={placeholder}
              onChange={(event) => {
                let validateResult = validate(
                  validator,
                  event.target.value,
                  onChange,
                  setNamesError,
                  isSpaceRequired,
                );
                console.log("vaidation result -> ", validateResult);
                if (validateResult) setValidationError(false);
                else setValidationError(true);
              }}
              autoCorrect="off"
              autoFocus={autoFocus}
            />
            {isRightIconRequired && rightIcon}
          </div>
          <div style={{ color: "red", fontSize: 10, marginLeft: 15 }}>
            {validationError ? errorMsgText : ""}
          </div>
        </div>
      );

    case "modalInput":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: filterFocus
              ? "0.1px solid white"
              : showErrorMsg
                ? "1px solid red"
                : "0.1px solid white",
            fontSize: 20,
            alignItems: "center",
            overflow: "hidden",
            ...styles,
          }}
        >
          <p
            style={{
              margin: 0,
              width: "250px",
              color: "#636363",
              fontSize: 15,
            }}
          >
            {title}
            {isMandatory && <span style={{ color: "#F68080" }}> *</span>}
          </p>
          <input
            autoComplete={"off"}
            tabIndex={tabIndex}
            id="inputelement"
            onKeyPress={onKeyPress}
            className="latoRegular"
            data-testid={dataTestId}
            onClick={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && onPressEnter) {
                onPressEnter();
              }
            }}
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "#F4F4F6",
              width: "80%",
              height: "100%",
              paddingLeft: 20,
              borderRadius: 5,
              ...inputcomponentStyles,
            }}
            type={isPassword || isOtpField ? "password" : type === "email" ? "email" : "text"}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
              validate(validator, event.target.value, onChange, setNamesError, isSpaceRequired);
            }}
            autoCorrect="off"
            autoFocus={autoFocus}
          />
          {isRightIconRequired && rightIcon}
        </div>
      );
    case "login":
      return (
        <form style={{ width: "100%" }} autoComplete="off">
          <input
            autoComplete="new-password"
            id="inputelement"
            className="latoRegular"
            onKeyPress={onKeyPress}
            data-testid={dataTestId}
            onClick={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && onPressEnter) {
                onPressEnter();
              }
            }}
            style={{
              border: filterFocus
                ? "0.1px solid white"
                : focus
                  ? "0.1px solid lightgrey"
                  : showErrorMsg
                    ? "1px solid red"
                    : "0.1px solid white",
              padding: 0,
              paddingLeft: 20,
              fontSize: 20,
              minWidth: 280,
              maxWidth: 400,
              marginLeft: 10,
              marginRight: 10,
              ...styles,
              backgroundColor: "transparent",
            }}
            type={isPassword || isOtpField ? "password" : type === "email" ? "email" : "text"}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
              validate(validator, event.target.value, onChange, setNamesError, isSpaceRequired);
            }}
            autoCorrect="off"
            autoFocus={true}
          />
        </form>
      );
    case "select":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: 200,

              border: validationError ? "1px solid red" : "0.01px solid lightgrey",
              padding: "5px",

              fontSize: 20,
              alignItems: "center",
              overflow: "hidden",
              // paddingLeft:'10px',

              ...styles,
            }}
          >
            <select
              disabled={disabled}
              id="inputelement"
              value={value === "" ? "select" : value}
              placeholder={placeholder}
              onChange={(event) => {
                onChange(event.target.value);
              }}
              data-testid={dataTestId}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
                fontSize: 20,

                ...styles,
              }}
              onMouseEnter={onMouseEnter}
            >
              {/* <option value="" disabled>
                {placeholder || "Select Status"}
              </option> */}
              {options &&
                options.map((option, index) => {
                  return (
                    <option
                      key={index}
                      className="title"
                      style={{
                        backgroundColor: "white",
                      }}
                      value={addMoney ? option.value : option.value}
                    >
                      {option.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div style={{ color: "red", fontSize: 10, marginLeft: 15 }}>
            {validationError ? errorMsgText : ""}
          </div>
        </div>
      );

    case "dateRange":
      return (
        <div ref={wrapperRef} style={{}}>
          <input
            style={{
              border: filterFocus
                ? "0.1px solid white"
                : focus
                  ? "1px solid black"
                  : showBadge
                    ? "1px solid #3F6AD8"
                    : showErrorMsg
                      ? "1px solid red"
                      : "0px solid white",
              position: "relative",

              marginLeft: 15,

              fontSize: 16,
              ...styles,
              // backgroundColor: "white",
            }}
            onChange={() => {}}
            value={value}
            placeholder={placeholder}
            onClick={(e) => {
              setOpenDateRange(!openDateRange);
              console.log("event", e);
            }}
            autoFocus={autoFocus}
          />

          {openDateRange && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                borderRadius: 5,
                zindex: 21,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                // bottom: 310,
              }}
              className="dateRange dateRangeDiv"
            >
              <DateRangePicker
                onSelect={(date) => {
                  onChange(date.start.format("DD/MM/YYYY") + "-" + date.end.format("DD/MM/YYYY"));

                  setOpenDateRange(!openDateRange);
                }}
                singleDateRange={true}
              />
            </div>
          )}
        </div>
      );
    // case "startDateTimePicker":
    //   return (
    //     <div ref={wrapperRef} style={{ marginLeft: 10, marginBottom: 6 }}>
    //       <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ borderColor: "teal" }}>
    //         <DemoContainer
    //           components={["DateTimePicker", "DateTimePicker", "DateTimePicker"]}
    //           sx={{ borderColor: "teal",width: "75%", overflow: "hidden",  }}
    //         >
    //           <DateTimePicker
    //             sx={{
    //               position: "relative",
    //               zIndex: 20,
    //               boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    //               backgroundColor: "rgb(242, 242, 242)",
    //               width: '300px',

    //               "& .MuiOutlinedInput-root": {
    //                 // borderRadius: 8,
    //                 borderColor: "transparent",
    //               },
    //               "& .MuiOutlinedInput-notchedOutline": {
    //                 border: "1px black",
    //                 // borderRadius: 8,
    //               },
    //               "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    //                 border: "1px black",
    //                 // borderRadius: 8,
    //               },
    //               "& .MuiInputAdornment-root": {
    //                 position: "absolute",
    //                 left: 190, // Align icon to the left
    //               },
    //               // "& .MuiOutlinedInput-input": {
    //               //   paddingLeft: "40px", // Adjust input padding to avoid overlap with the icon
    //               // },
    //             }}
    //             label="Start Date"
    //             value={dayjs(value)}
    //             maxDate={dayjs()}
    //             onChange={(newValue) => {
    //               const formattedDate = newValue.format("DD MMM YYYY :mm:ss");
    //               setStartDateFilterValue(newValue.$d);
    //               onChange(formattedDate);
    //             }}
    //             views={["year", "month", "day", "hours", "minutes", "seconds"]}
    //             format="DD/MM/YYYY hh:mm:ss"
    //             renderInput={(params) => <TextField {...params} />}
    //           />
    //         </DemoContainer>
    //       </LocalizationProvider>
    //     </div>
    //   );

    // case "endDateTimePicker":
    //   return (
    //     <div
    //       ref={wrapperRef}
    //       style={{ marginLeft: 10, borderColor: "teal", boxSizing: "border-box", marginBottom: 6 }}
    //     >
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DemoContainer components={["DateTimePicker"]} sx={{width: "80%", overflow: "hidden",marginLeft:-5}}>
    //           <DateTimePicker
    //             sx={{
    //               position: "relative",

    //               zindex: 21,
    //               // borderRadius: 2,

    //               boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    //               backgroundColor: "rgb(242, 242, 242)",
    //               width: "325px",
    //               "& .MuiOutlinedInput-root": {
    //                 // borderRadius: 4,
    //                 borderColor: "transparent",
    //               },
    //               "& .MuiOutlinedInput-notchedOutline": {
    //                 border: "black",
    //               },
    //               "& .MuiInputAdornment-root": {
    //                 position: "absolute",
    //                 left: 190, // Align icon to the left
    //               },
    //             }}
    //             label="End Date"
    //             views={["year", "month", "day", "hours", "minutes", "seconds"]}
    //             format="DD/MM/YYYY hh:mm:ss"
    //             minDate={startDateFilterValue ? dayjs(startDateFilterValue) : null}
    //             maxDate={dayjs()}
    //             onChange={(newValue) => {
    //               const formattedDate = newValue.format("DD MMM YYYY hh:mm:ss");
    //               setEndDateFilterValue(newValue.$d);
    //               onChange(formattedDate);
    //             }}
    //             value={dayjs(value)}
    //             renderInput={(params) => <TextField {...params} />}
    //           />
    //         </DemoContainer>
    //       </LocalizationProvider>
    //     </div>
    //   );

    case "startDateTimePicker":
      return (
        // <div style={{ position: 'relative', width: '500px' }}>
        //     {/* Date Range with Calendar Icon and Dropdown Arrow */}
        //     <div
        //         style={{
        //             border: '1px solid #ccc',
        //             borderRadius:5,
        //             padding: '8px 10px',
        //             display: 'flex',
        //             justifyContent: 'space-between',
        //             alignItems: 'center',
        //             height:"37px",
        //         }}
        //     >
        //         {/* Clickable Calendar Icon and Arrow */}
        //         <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleDropdown}>
        //             <span style={{ marginRight: '5px' }}>📅</span>
        //             <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', fontSize: '10px' }}>▼</span>
        //         </div>

        //         {/* Clickable Date Range Text */}
        //         <div>
        //             {startDate && endDate ? (
        //                 <span>
        //                     <span onClick={openStartDatePicker} style={{ cursor: 'pointer', color: 'black' }}>
        //                         {`${moment(startDate).format('MMM D, YYYY @ HH:mm')}`}
        //                     </span>
        //                     {" --> "}
        //                     <span onClick={openEndDatePicker} style={{ cursor: 'pointer', color: 'black' }}>
        //                         {`${moment(endDate).format('MMM D, YYYY @ HH:mm')}`}
        //                     </span>
        //                 </span>
        //             ) : (
        //                 <span>Select Date Range</span>
        //             )}
        //         </div>
        //     </div>

        //     {/* Start Date Picker */}
        //     {isStartDatePickerOpen && (
        //          <div style={{ position: 'absolute', top: '50px', left: '50px', zIndex: 10, width: "400px" }}>
        //          <DatePicker
        //              selected={startDate}
        //              onChange={(date) => {
        //                 onStartDateChange(date);
        //                 setIsStartDatePickerOpen(false);
        //              }}
        //              showTimeSelect
        //              dateFormat="MMMM d, yyyy h:mm:ss aa"
        //              placeholderText="Select Start Date"
        //          />
        //      </div>

        //     )}

        //     {/* End Date Picker */}
        //     {isEndDatePickerOpen && (
        //         <div style={{ position: 'absolute', top: '50px', left: '230px', zIndex: 10, width: "400px"  }}> {/* Adjust left value to position correctly */}
        //         <DatePicker
        //             selected={endDate}
        //             onChange={(date) => {
        //                 onEndDateChange(date);
        //                 setIsEndDatePickerOpen(false);
        //             }}
        //             showTimeSelect
        //             dateFormat="MMMM d, yyyy h:mm:ss aa" // Include seconds in the format
        //             placeholderText="Select End Date"
        //         />
        //     </div>
        //     )}

        //     {/* Dropdown for Quick Select */}
        //     {isDropdownOpen && (
        //         <div style={{
        //             marginTop:"5px",
        //             width: "350px",
        //             border: '1px solid #ccc',
        //             borderRadius:"10px",
        //             position: 'absolute',
        //             background: '#fff',
        //             padding: '15px',
        //             top: '40px',
        //             zIndex: 10
        //         }}>
        //             {/* Quick Select */}
        //             <div>
        //                 <h4>Quick select</h4>
        //                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        //                 <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
        //     <select
        //         value={quickSelect.rangeType}
        //         onChange={(e) => handleQuickSelectChange('rangeType', e.target.value)}
        //         style={{
        //             appearance: 'none',
        //             border: 'none',
        //             outline: 'none',
        //             padding: '8px 10px',
        //             width: '100px',
        //             borderRadius: '4px',
        //             background: '#fff',
        //         }}
        //     >
        //         <option value="Last">Last</option>
        //         <option value="Today">Today</option>
        //         <option value="This Week">This Week</option>
        //     </select>
        //     <span style={{
        //         position: 'absolute',
        //         right: '10px',
        //         top: '50%',
        //         transform: 'translateY(-50%)',
        //         pointerEvents: 'none',
        //         color: '#aaa',
        //         fontSize:"10px"
        //     }}>▼</span>
        // </div>
        // <input
        //     type="number"
        //     value={quickSelect.number}
        //     onChange={(e) => handleQuickSelectChange('number', e.target.value)}
        //     style={{ width: '60px',height:"20px", borderRadius: '4px', border: '1px solid #ccc', padding: '5px' }}
        // />
        //                        <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
        //     <select
        //         value={quickSelect.unit}
        //         onChange={(e) => handleQuickSelectChange('unit', e.target.value)}
        //         style={{
        //             appearance: 'none',
        //             border: 'none',
        //             outline: 'none',
        //             padding: '8px 10px',
        //             width: '100px',
        //             borderRadius: '4px',
        //             background: '#fff',
        //         }}
        //     >
        //         <option value="minutes">minutes</option>
        //         <option value="hours">hours</option>
        //         <option value="days">days</option>
        //     </select>
        //     <span style={{
        //         position: 'absolute',
        //         right: '10px',
        //         top: '50%',
        //         transform: 'translateY(-50%)',
        //         pointerEvents: 'none',
        //         color: '#aaa',
        //         fontSize:"10px"
        //     }}>▼</span>
        // </div>
        // <button onClick={handleApply} style={{ padding: '5px 10px', borderRadius: '4px', background: 'blue', color: '#fff', border: 'none' }}>
        //     Apply
        // </button>
        //                 </div>
        //             </div>
        //             <div>
        //                 <h4 style={{marginBottom:10}}>Commonly used</h4>
        //                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        //                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        //                         <ul style={{ listStyleType: 'none', padding: 10, margin: 0, flex: 1 }}>
        //                             <li onClick={() => applyCommonRange('Last',15, 'minutes')} style={{ cursor: 'pointer',marginBottom:10 }}>Last 15 minutes</li>
        //                             <li onClick={() => applyCommonRange('Last',30, 'minutes')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 30 minutes</li>
        //                             <li onClick={() => applyCommonRange('Last',1, 'hours')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 1 hour</li>
        //                         </ul>
        //                         <ul style={{ listStyleType: 'none', padding: 10, margin: 0, flex: 1 }}>
        //                             <li onClick={() => applyCommonRange('Last',24, 'hours')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 24 hours</li>
        //                             <li onClick={() => applyCommonRange('Last',7, 'days')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 7 days</li>
        //                             <li onClick={() => applyCommonRange('Last',30, 'days')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 30 days</li>
        //                         </ul>,
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        // </div>
        <div>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            selectPeriod={selectPeriod} // Handle selected period (Last 30 min, etc.)
            onPeriodChange={onPeriodChange} // Handle when user selects a quick range
          />
        </div>
      );

    case "search":
      return (
        <div style={{ position: "relative" }}>
          <div
            style={{
              padding: "5px 20px",
              border: `1.5px solid ${SIDEBAR_COLOR}`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img style={{ width: 20 }} src={SearchIcon} />
            <input
              value={value}
              onChange={(text) => onChange(text.target.value)}
              style={{
                backgroundColor: "#fff",
                height: 35,
                minWidth: 300,
                width: "100%",
                border: "0",
                outline: "none",
                paddingLeft: 10,
                borderRadius: 4,
                fontSize: 12,
                // color: INPUT_TITLE_COLOR,
                ...inputcomponentStyles,
              }}
              placeholder={placeholder}
            />
            {/* {value.length > 0 && (
              <img
                onClick={() => onChange("")}
                style={{ width: 12, cursor: "pointer" }}
                src={BlackClear}
              />
            )} */}
          </div>

          {/* {value !== "" && dropdownData?.length !== 0 && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                top: 75,
                backgroundColor: BG_COLOR,
                borderRadius: 10,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              {dropdownData.map((item) => (
                <p
                  onClick={() => onDropdownClick(item)}
                  style={{
                    padding: "15px 0px",
                    color: "black",
                    borderBottom: "1px solid #fff",
                    width: "100%",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {item.title}
                </p>
              ))}
            </div>
          )} */}
        </div>
      );

    case "date":
      return (
        <div
          style={{
            border: showErrorMsg ? "1px solid red" : "1px solid lightgrey",
            borderRadius: 5,
            fontSize: 12,
            color: "black",
            height: 38,
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            position: "relative",
            justifyContent: "center",
            alignSelf: "center",
            minWidth: 180,
            paddingLeft: isSvgIconRequired ? 50 : 10,
          }}
        >
          <DatePicker
            // customInput={() => {
            //   return (
            //     <input
            //       placeholder={placeholder}
            //       value={value}
            //       onChange={onChange}
            //     />
            //   );
            // }}
            selected={value}
            showYearDropdown
            yearDropdownItemNumber={150}
            scrollableYearDropdown
            maxDate={
              maxDate === "" || maxDate === undefined || Object.keys(maxDate).length === 0
                ? new Date()
                : new Date(maxDate.year, maxDate.month, maxDate.day)
            }
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder}
            className="title"
            onChange={(date) => {
              onChange(date);
            }}
            onChangeRaw={(e) => handleChangeRaw(e)}
          />
        </div>
      );

    case "textarea":
      return (
        <div
          id="inputelement"
          style={{
            paddingTop: 5,
            display: "flex",
            flexDirection: "column",
            width: imageUpload ? "100%" : "auto",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignitems: "center",
            }}
          >
            <textarea
              data-testid={dataTestId}
              className="title"
              style={{
                border: focus
                  ? "1px solid black"
                  : showBadge
                    ? "1px solid #3F6AD8"
                    : showErrorMsg
                      ? "1px solid red"
                      : "1px solid lightgrey",
                minWidth: "100%",
                ...styles,
                borderRadius: 5,
                fontSize: 12,
                color: "black",
                resize: "none",
                paddingLeft: isSvgIconRequired ? 50 : 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              value={value}
              placeholder={placeholder}
              onChange={(event) => {
                const reg = /^[a-zA-Z0-9., ]+$/;
                const value = event.target.value;
                if (reg.test(value)) onChange(event.target.value);
                if (value === "") onChange("");
              }}
            />
          </div>
        </div>
      );

    default:
      return (
        <input
          id="inputelement"
          data-testid={dataTestId}
          style={{
            ...styles,
          }}
          onKeyPress={onKeyPress}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            let val = event.target.value;
            if (validator === "") {
              onChange(val);
            }
          }}
        />
      );
  }
};

export default Input;
