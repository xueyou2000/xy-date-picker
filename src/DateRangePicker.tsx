import React from "react";
import "xy-input/assets/index.css";
import DatePicker from "./DatePicker";
import { DateRangePickerPanelProps } from "./interface";
import DateRangePickerPanel from "./DateRangePickerPanel";
import classNames from "classnames";

export const DateRangePicker = React.forwardRef((props: DateRangePickerPanelProps, ref: React.MutableRefObject<any>) => {
    const { placeholder = "请选择日期范围", ...rest } = props;
    return <DatePicker {...rest} placeholder={placeholder} renderTimePickerPanel={DateRangePickerPanel} />;
});

export default React.memo(DateRangePicker);
