import React from "react";
import { DateRangePicker } from "../src";
import "./index.scss";

export default function() {
    return (
        <div className="date-picker-demo">
            <DateRangePicker defaultWhich={new Date(2019, 4, 1)} />
        </div>
    );
}
