import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const DateRangePicker = ({
    startDate, 
    endDate, 
    onStartDateChange, 
    onEndDateChange, 
    selectPeriod, 
    onPeriodChange 
}) => {
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

    const [quickSelect, setQuickSelect] = useState({
        rangeType: 'Last',
        number: "",
        unit: ''
    });
    const handleApply = (rangeType,number,unit) => {
        const now = moment();
        let newStartDate;
        let newEndDate = now.toDate(); 

        if (quickSelect.rangeType === 'Last') {
            newStartDate = now.subtract(number,unit).toDate();
        } else if (quickSelect.rangeType === 'Today') {
            newStartDate = moment().startOf('day').toDate();
        } else if (quickSelect.rangeType === 'This Week') {
            newStartDate = moment().startOf('week').toDate();
        }

        onStartDateChange(newStartDate);  
        onEndDateChange(newEndDate);      
        onPeriodChange(rangeType); 
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    const handleClear = () => {
        onStartDateChange(null);
        onEndDateChange(null);
        setQuickSelect({
            rangeType: 'Last',
            number: "",
            unit: ''
        });
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleQuickSelectChange = (field, value) => {
        setQuickSelect(prev => ({ ...prev, [field]: value }));
    };

    const applyCommonRange = (rangeType,number, unit) => {
        setQuickSelect({ rangeType, number, unit });
        handleApply(rangeType,number,unit);
    };

    
    const openStartDatePicker = () => {
        setIsStartDatePickerOpen(true);
        setIsEndDatePickerOpen(false);
    };

 
    const openEndDatePicker = () => {
        setIsEndDatePickerOpen(true);
        setIsStartDatePickerOpen(false);
    };

    return (
        <div style={{ position: 'relative', width: '500px' }}>
            {/* Date Range with Calendar Icon and Dropdown Arrow */}
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius:5,
                    padding: '8px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height:"37px",
                    backgroundColor:"white"
                }}
            >
                {/* Clickable Calendar Icon and Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleDropdown}>
                    <span style={{ marginRight: '5px' }}>📅</span>
                    <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', fontSize: '10px' }}>▼</span>
                </div>

                {/* Clickable Date Range Text */}
                <div>
                    {startDate && endDate ? (
                        <span>
                            <span onClick={openStartDatePicker} style={{ cursor: 'pointer', color: 'black' }}>
                                {`${moment(startDate).format('MMM D, YYYY  HH:mm:ss A')}`}
                            </span>
                            {" --> "}
                            <span onClick={openEndDatePicker} style={{ cursor: 'pointer', color: 'black' }}>
                                {`${moment(endDate).format('MMM D, YYYY  HH:mm:ss A')}`}
                            </span>
                        </span>
                    ) : (
                        <span>Select Date Range</span>
                    )}
                </div>
            </div>

            {/* Start Date Picker */}
            {isStartDatePickerOpen && (
                 <div style={{ position: 'absolute', top: '50px', left: '50px', zIndex: 10, width: "400px" }}>
                 <DatePicker
                     selected={startDate}
                     onChange={(date) => {
                        onStartDateChange(date);
                        setIsStartDatePickerOpen(false);
                     }}
                     showTimeSelect
                     dateFormat="MMMM d, yyyy h:mm:ss aa" 
                     placeholderText="Select Start Date"
                 />
             </div>
         
            )}

            {/* End Date Picker */}
            {isEndDatePickerOpen && (
                <div style={{ position: 'absolute', top: '50px', left: '230px', zIndex: 10, width: "400px"  }}> {/* Adjust left value to position correctly */}
                <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                        onEndDateChange(date);
                        setIsEndDatePickerOpen(false);
                    }}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm:ss aa" // Include seconds in the format
                    placeholderText="Select End Date"
                />
            </div>
            )}

            {/* Dropdown for Quick Select */}
            {isDropdownOpen && (
                <div style={{
                    marginTop:"5px",
                    width: "350px",
                    border: '1px solid #ccc',
                    borderRadius:"10px",
                    position: 'absolute',
                    background: '#fff',
                    padding: '15px',
                    top: '40px',
                    zIndex: 10
                }}>
                    {/* Quick Select */}
                    <div>
                        <h4>Quick select</h4>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
            <select
                value={quickSelect.rangeType}
                onChange={(e) => handleQuickSelectChange('rangeType', e.target.value)}
                style={{
                    appearance: 'none', 
                    border: 'none',
                    outline: 'none',
                    padding: '8px 10px',
                    width: '100px',
                    borderRadius: '4px',
                    background: '#fff',
                }}
            >
                <option value="Last">Last</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
            </select>
            <span style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: '#aaa',
                fontSize:"10px"
            }}>▼</span>
        </div>
        <input
            type="number"
            value={quickSelect.number}
            onChange={(e) => handleQuickSelectChange('number', e.target.value)}
            style={{ width: '60px',height:"20px", borderRadius: '4px', border: '1px solid #ccc', padding: '5px' }}
        />
                               <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
            <select
                value={quickSelect.unit}
                onChange={(e) => handleQuickSelectChange('unit', e.target.value)}
                style={{
                    appearance: 'none', 
                    border: 'none',
                    outline: 'none',
                    padding: '8px 10px',
                    width: '100px',
                    borderRadius: '4px',
                    background: '#fff',
                }}
            >
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
                <option value="days">days</option>
            </select>
            <span style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: '#aaa',
                fontSize:"10px"
            }}>▼</span>
        </div>
        <button onClick={handleApply} style={{ padding: '5px 10px', borderRadius: '4px', background: 'blue', color: '#fff', border: 'none' }}>
            Apply
        </button>
        <button onClick={handleClear} style={{ padding: '5px 10px', borderRadius: '4px', background: 'red', color: '#fff', border: 'none', marginLeft: '5px' }}>
                                Clear
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 style={{marginBottom:10}}>Commonly used</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ul style={{ listStyleType: 'none', padding: 10, margin: 0, flex: 1 }}>
                                    <li onClick={() => applyCommonRange('Last',15, 'minutes')} style={{ cursor: 'pointer',marginBottom:10 }}>Last 15 minutes</li>
                                    <li onClick={() => applyCommonRange('Last',30, 'minutes')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 30 minutes</li>
                                    <li onClick={() => applyCommonRange('Last',1, 'hours')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 1 hour</li>
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 10, margin: 0, flex: 1 }}>
                                    <li onClick={() => applyCommonRange('Last',24, 'hours')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 24 hours</li>
                                    <li onClick={() => applyCommonRange('Last',7, 'days')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 7 days</li>
                                    <li onClick={() => applyCommonRange('Last',30, 'days')} style={{ cursor: 'pointer',marginBottom:10  }}>Last 30 days</li>
                                </ul>,
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
