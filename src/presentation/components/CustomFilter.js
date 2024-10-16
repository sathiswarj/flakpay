import { useEffect, useRef, useState } from "react";
import CustomActionIcon from "./CustomActionIcon";
import { CustomInput } from "./customInput/CustomInput";
import "./customInput/input.css";
import ButtonComponent from "./button";

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
        backgroundColor: "transparent",
        borderRadius: "15px",
        opacity: show ? 1 : 0,
        height: show ? 100 : 0,
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
        }}
      >
        <ButtonComponent
          label="Search"
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
         />

        <ButtonComponent
          label="Clear"
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
        />
      </div>

      {/* Fields Section */}
      <div
        style={{
          display: show ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 0,
          gap: 5,
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
