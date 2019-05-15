import React, { useState } from "react";
import { DatePickerPanel, SelectionMode } from "../src";
import "./index.scss";

export default function() {
    const [mode, setMode] = useState<SelectionMode>(SelectionMode.Day);

    return (
        <div className="date-picker-demo">
            <button onClick={() => setMode(SelectionMode.Time)}>选择时间</button>
            <DatePickerPanel selectionMode={mode} onSelectionModeChange={setMode} />

            <DatePickerPanel selectionMode={mode} onSelectionModeChange={setMode} />
        </div>
    );
}
