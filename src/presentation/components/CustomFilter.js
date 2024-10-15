import { useEffect, useRef, useState } from "react";
import CustomActionIcon from "./CustomActionIcon";
import { CustomInput } from "./customInput/CustomInput";
import "./customInput/input.css";

export const CustomFilter = ({ data, search, Component, show, mobileFilter, onClickClear }) => {
  const [filterData, setFilterData] = useState([]);
  const filterRef = useRef();

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event?.target)) {
      // setToggleFilterMenus(false);
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside());
    };
  }, [filterRef]);

  const CustomSearchField = ({
    label,
    placeholder,
    options,
    type,
    index,
    value,
    validator,
    labelStyles,
    inputStyles,
    containerStyles,
    dropdownImage,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onPeriodChange,
  }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (val) => {
      let temp = filterData;
      temp[index].value = val;
      setLocalValue(val);
      setFilterData([...temp]); // Use spread operator to trigger re-render
    };

    if (type === "status") {
      return (
        <div key={index + placeholder} style={{}}>
          <select
            value={localValue === true ? "Active" : localValue === false ? "Inactive" : ""}
            onChange={(e) => {
              const selectedValue =
                e.target.value === "Active" ? true : e.target.value === "Inactive" ? false : null;
              handleChange(selectedValue);
            }}
            style={{
              ...inputStyles,
              width: 150,
              minWidth: 200,
              maxWidth: 170,
              margin: "0px 0px 0px 5px",
              paddingLeft: "10px",
              height: 52,
              outline: "none",
              marginLeft: !mobileFilter && "10px",
              fontSize: "14px",
              border: " 1px solid rgb(203 203 203)",
            }}
          >
            <option value="">Search by Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      );
    }

    return (
      <div key={index + placeholder} style={{}}>
        <CustomInput
          // autoFocus={focused}
          type={type}
          validator={validator}
          value={localValue}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onPeriodChange={onPeriodChange}
          onChange={(val) => {
            let temp = filterData;
            temp[index].value = val;
            setLocalValue(val);
            setFilterData(temp);
          }}
          label={label}
          placeholder={placeholder}
          options={options}
          containerStyles={containerStyles}
          inputStyles={inputStyles}
          labelStyles={labelStyles}
          dropdownImage={dropdownImage}
          onPressEnter={() => search(filterData)}
          onMouseEnter={() => {
            // setFocused(false);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const clearAllFields = () => {
    let temp = filterData.map((item) => {
      item.startDate ="";
      item.endDate="";
      item.value = ""; // Clear each field's value
      return item;
    });
    setFilterData([...temp]); // Trigger re-render
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: show ? 10 : 0,
        backgroundColor: "#FFFFFF",
        borderRadius: "15px",
        opacity: show ? 1 : 0,
        height: show ? 150 : 0,
        transition: "visibility 0.5s, opacity 0.5s linear , height 0.5s",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: show ? "flex" : "none",
          flexDirection: "row",
          justifyContent: "flex-end", // Align icons to the right
          gap: 10,
          padding: 10,
          marginBottom: 0,
        }}
      >
        <CustomActionIcon
          onClick={() => {
            console.log("Filter Data--->", filterData);
            filterData &&
              filterData.map((item) => {
                if (item.type === "dateRange" && item.value && item.value.length < 12) {
                  item.value = "";
                }
              });
            const isFilterApplied = filterData.every((item) => item.value === "");
            if (!isFilterApplied) search(filterData);
          }}
          showToolTip={false}
          style={{ marginRight: 10 }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "5px",
              backgroundColor: "#3783FB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Search"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6666 18.6666H19.6133L19.24 18.3066C20.84 16.44 21.6666 13.8933 21.2133 11.1866C20.5866 7.47998 17.4933 4.51998 13.76 4.06665C8.11998 3.37331 3.37331 8.11998 4.06665 13.76C4.51998 17.4933 7.47998 20.5866 11.1866 21.2133C13.8933 21.6666 16.44 20.84 18.3066 19.24L18.6666 19.6133V20.6666L24.3333 26.3333C24.88 26.88 25.7733 26.88 26.32 26.3333C26.8666 25.7866 26.8666 24.8933 26.32 24.3466L20.6666 18.6666ZM12.6666 18.6666C9.34665 18.6666 6.66665 15.9866 6.66665 12.6666C6.66665 9.34665 9.34665 6.66665 12.6666 6.66665C15.9866 6.66665 18.6666 9.34665 18.6666 12.6666C18.6666 15.9866 15.9866 18.6666 12.6666 18.6666Z"
                fill="white"
              />
            </svg>
          </div>
        </CustomActionIcon>

        {/* Clear Icon */}
        <CustomActionIcon
          onClick={() => {
            clearAllFields(); // Call the function to clear all fields
          }}
          showToolTip={false}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "5px",
              backgroundColor: "#3783FB", // Use a different color to differentiate the clear icon
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Clear"
          >
            {/* SVG for Clear Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              width="18"
              height="18"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11L7.5 22.5a2.121 2.121 0 01-3-3L14.5 8m4.5-4.5L18 6M2 22h12"
              />
            </svg>
          </div>
        </CustomActionIcon>

        <CustomActionIcon
          showToolTip={false}
          onClick={() => {
            let shouldSearch = false;
            filterData &&
              filterData.map((item, index) => {
                if (item.value) {
                  filterData[index].value = "";
                  shouldSearch = true;
                }
              });
            if (shouldSearch) search(filterData);
            onClickClear();
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "5px",
              backgroundColor: "#3783FB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.775 5.2342C16.4175 4.8767 15.84 4.8767 15.4825 5.2342L11 9.70753L6.51753 5.22503C6.16003 4.86753 5.58253 4.86753 5.22503 5.22503C4.86753 5.58253 4.86753 6.16003 5.22503 6.51753L9.70753 11L5.22503 15.4825C4.86753 15.84 4.86753 16.4175 5.22503 16.775C5.58253 17.1325 6.16003 17.1325 6.51753 16.775L11 12.2925L15.4825 16.775C15.84 17.1325 16.4175 17.1325 16.775 16.775C17.1325 16.4175 17.1325 15.84 16.775 15.4825L12.2925 11L16.775 6.51753C17.1234 6.1692 17.1234 5.58253 16.775 5.2342Z"
                fill="white"
              />
            </svg>
          </div>
        </CustomActionIcon>
      </div>

      {/* Fields Section */}
      <div
        style={{
          display: show ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 0,
          marginLeft: 0,
          // gap: 5,
        }}
      >
        {data &&
          data.map((item, index) => (
            <CustomSearchField
              key={index}
              startDate={item.startDate}
              endDate={item.endDate}
              onStartDateChange={item.onStartDateChange}
              onEndDateChange={item.onEndDateChange}
              onPeriodChange={item.onPeriodChange}
              placeholder={item.placeholder}
              value={item.value}
              type={item.type}
              labelStyles={{ fontSize: 12 }}
              validator={item.validator}
              index={index}
              options={item.options}
              containerStyles={{
                ...item.containerStyles,
              }}
              autoFocus={item.type !== "select" ? true : ""}
              dropdownImage={item.dropdownImage}
              inputStyles={
                item.inputStyles
                  ? item.inputStyles
                  : {
                      width: 150,
                      minWidth: 180,
                      maxWidth: 170,
                      margin: "0px 0px 0px 5px",
                      paddingLeft: "10px",
                      height: item.type === "input" ? 45 : 45,
                      backgroundColor: "#F2F2F2",
                      borderRadius: "0px",
                      marginLeft: !mobileFilter && "10px",
                      fontSize: "14px",
                    }
              }
            />
          ))}
      </div>
    </div>
  );
};
