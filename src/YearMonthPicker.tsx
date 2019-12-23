import React from "react";
import "xy-input/assets/index.css";
import DatePicker from "./DatePicker";
import { YearMonthPickerProps } from "./interface";
import YearMonthPickerPanel from "./YearMonthPickerPanel";
import { getLocal } from "./local";

export const YearMonthPicker = React.forwardRef((props: YearMonthPickerProps, ref: React.MutableRefObject<any>) => {
    const { placeholder = getLocal().DatePicker.yearPlaceholder, ...rest } = props;
    return <DatePicker ref={ref} {...rest} placeholder={placeholder} renderTimePickerPanel={YearMonthPickerPanel} />;
});

export default React.memo(YearMonthPicker);
