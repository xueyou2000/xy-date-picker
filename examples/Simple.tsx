import React from "react";
import { DatePickerPanel } from "../src";
import "./index.scss";
import { formatDate } from "../src/date";

export default function() {
    const which = new Date(2290, 1, 5);
    const start = new Date();
    const end = new Date(start);
    end.setDate(25);

    return (
        <div className="date-picker-demo">
            <DatePickerPanel selectRange={[start, end]} onChange={(d) => console.log("change", d)} onConfirm={() => console.log("确定了，关闭")} />
        </div>
    );
}
