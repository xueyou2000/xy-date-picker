import React from "react";
import { YearPicker, MonthPicker } from "../src";
import "./index.scss";

export default function() {
    const d = new Date();
    d.setMonth(3);
    return (
        <div className="date-picker-demo">
            <MonthPicker min={d} />
        </div>
    );
}
