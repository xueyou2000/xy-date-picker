import React, { useState } from "react";
import { DatePicker } from "../src";
import "./index.scss";

const date = new Date();
date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);

const b = new Date();
b.setTime(b.getTime() + 3600 * 1000 * 24 * 1);

const shortcuts = [
    {
        text: "今天",
        date: new Date()
    },
    {
        text: "明天",
        date: b
    },
    {
        text: "一周前",
        date: date
    }
];

export default function() {
    return (
        <div className="date-picker-demo">
            <DatePicker shortcuts={shortcuts} onChange={(v) => console.log(v)} />
        </div>
    );
}
