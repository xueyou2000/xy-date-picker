import React from "react";
import { YearPicker, MonthPicker, CalendarPicker, DatePickerCombobox } from "../src";
import "./index.scss";
import { formatDate } from "../src/date";

export default function() {
    const which = new Date(2290, 1, 5);
    const start = new Date();
    const end = new Date(start);
    end.setDate(25);

    return (
        <div className="date-picker-demo">
            <DatePickerCombobox selectRange={[start, end]} showTime={true} onChange={(d) => console.log("change", formatDate(d))} onConfirm={() => console.log("确定了，关闭")} />
        </div>
    );
}
