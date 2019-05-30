import React from "react";
import "xy-input/assets/index.css";
import DatePicker from "./DatePicker";
import { YearMonthPickerProps } from "./interface";
import YearMonthPickerPanel from "./YearMonthPickerPanel";

export const YearMonthPicker = React.forwardRef((props: YearMonthPickerProps, ref: React.MutableRefObject<any>) => {
    const { placeholder = "请选择年月", ...rest } = props;
    return <DatePicker ref={ref} {...rest} placeholder={placeholder} renderTimePickerPanel={YearMonthPickerPanel} />;
});

export default React.memo(YearMonthPicker);
