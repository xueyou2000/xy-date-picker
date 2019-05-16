import React, { useState } from "react";
import { DatePickerCombobox } from "../src";
import "./index.scss";
import { formatDate } from "../src/date";

export default function() {
    const min = new Date(2019, 3, 1);
    return (
        <div className="date-picker-demo">
            <DatePickerCombobox showTime={true} onChange={(v) => console.log(formatDate(v))} />
        </div>
    );
}
