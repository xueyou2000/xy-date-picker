import React, { useState } from "react";
import { YearMonthPicker } from "../src";
import "./index.scss";

export default function() {
    return (
        <div className="date-picker-demo">
            <YearMonthPicker onChange={(v) => console.log(v)} />
        </div>
    );
}
