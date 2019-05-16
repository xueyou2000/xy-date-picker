import React, { useState } from "react";
import { YearPicker } from "../src";
import "./index.scss";

export default function() {
    return (
        <div className="date-picker-demo">
            <YearPicker />
        </div>
    );
}
