import React from "react";
import { YearPicker, MonthPicker, CalendarPicker } from "../src";
import "./index.scss";

export default function() {
    const d = new Date();
    d.setDate(3);

    const end = new Date();
    end.setDate(27);

    return (
        <div className="date-picker-demo">
            <CalendarPicker selectRange={[d, end]} />
        </div>
    );
}
