import React from "react";
import "xy-input/assets/index.css";
import DatePicker from "./DatePicker";
import DateRangePickerPanel from "./DateRangePickerPanel";
import { DateRangePickerPanelProps } from "./interface";
import { getLocal } from "./local";

export const DateRangePicker = React.forwardRef((props: DateRangePickerPanelProps, ref: React.MutableRefObject<any>) => {
    const { placeholder = getLocal().DatePicker.dateRangePlaceholder, ...rest } = props;
    return <DatePicker {...rest} ref={ref} placeholder={placeholder} renderTimePickerPanel={DateRangePickerPanel} />;
});

export default React.memo(DateRangePicker);
