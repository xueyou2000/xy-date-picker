import React, { useState } from "react";
import { DatePicker } from "../src";
import { formatDate, dateParse } from "utils-dom";
import "./index.scss";
import { YearMonthDay } from "../src/CalendarPicker";

export default function() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(null);

    return (
        <div className="date-picker-demo">
            <p>起始日期</p>
            <DatePicker max={end} onChange={(v) => setStart(dateParse(v))} />
            <p>结束日期</p>
            <DatePicker min={start} onChange={(v) => setEnd(dateParse(v))} />
        </div>
    );
}
