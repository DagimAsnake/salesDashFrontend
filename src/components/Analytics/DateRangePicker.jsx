
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
    const handleDateRangeChange = (dates) => {
        const [startDate, endDate] = dates;
        onDateRangeChange({ startDate, endDate });
    };

    return (
        <div className="flex items-center mb-4">
            <label htmlFor="dateRangePicker" className="mr-4 font-medium">
                Date Range:
            </label>
            <DatePicker
                id="dateRangePicker"
                selected={dateRange.startDate}
                onChange={handleDateRangeChange}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                selectsRange
                className="px-4 py-2 border rounded-md"
            />
        </div>
    );
};

export default DateRangePicker;