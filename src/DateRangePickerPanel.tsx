import classNames from "classnames";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { DefineDefaultValue, useControll } from "utils-hooks";
import { isDateRange, dateRangeSplit, isDateISO, isDateFormat, formatDate, dateParse, isDate, dateRangeParse, incrementMonth, decreaseMonth } from "./date";
import { DateRangePickerPanelProps } from "./interface";
import { YearMonthDay, YearMonth } from "./CalendarPicker";
import DatePickerCombobox, { SelectionMode } from "./DatePickerCombobox";

export function DateRangePickerPanel(props: DateRangePickerPanelProps) {
    const { prefixCls = "xy-date-range-picker-panel", className, style, value, separator = " - ", defaultValue, placeholder = "请选择日期范围", inputRef, onFocus, onBlur, onKeyDown, onChange, disabled, ...rest } = props;
    const isControll = "value" in props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const [inputValue, setInputValue] = useState<string>(isDateRange(valueProps, props.showTime, separator) ? valueProps : "");
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const lastPickerDate = useRef<Date>(null);
    const dateRange = isDateRange(inputValue, props.showTime, separator) || !inputValue ? inputValue : lastRef.current;
    const [selectRange, setSelectRange] = useState<[Date, Date]>(getSelectRange());
    const which = props.which ? props.which : selectRange[0] ? selectRange[0] : new Date();
    const [startWhich, setStartWhich] = useState<Date>(which);
    const [endWhich, setEndWhich] = useState<Date>(incrementMonth(which));
    const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.Day);

    function getSelectRange(range?: string): [Date, Date] {
        const rangeStr = range || dateRange;
        return rangeStr ? dateRangeParse(rangeStr, props.showTime, separator) : [null, null];
    }

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
            setSelectRange(getSelectRange());
        }
    }, [isControll ? props.value : 1]);

    function changeValue(v: string) {
        const val = isDateRange(v, props.showTime, separator) || !v ? v : lastRef.current;
        lastRef.current = val;

        // 切换面板所处日期为上一次选择的
        if (val) {
            const range = getSelectRange(val);
            setStartWhich(range[0]);
            setEndWhich(range[1]);
        }

        if (!isControll) {
            setInputValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }

    function changeHandle(event: React.FocusEvent<HTMLInputElement>) {
        let val = event.target.value;
        if (isDateRange(val, props.showTime, separator)) {
            lastRef.current = val;
        }
        setInputValue(val);
    }

    function blurHandle(event: React.FocusEvent<HTMLInputElement>) {
        let val = event.target.value;
        changeValue(val);
        if (onBlur) {
            onBlur(event);
        }
    }

    function pickerHandle(d: Date) {
        if (lastPickerDate.current === null) {
            lastPickerDate.current = d;
            setSelectRange([d, null]);
        } else if (selectRange[0] !== null && selectRange[1] !== null && lastPickerDate.current) {
            lastPickerDate.current = null;
            changeValue(formate(selectRange));
            if (props.onConfirm) {
                props.onConfirm();
            }
        }
    }

    function formate(dateRange: [Date, Date]) {
        const format = props.showTime ? undefined : YearMonthDay;
        return `${formatDate(dateRange[0], format)}${separator}${formatDate(dateRange[1], format)}`;
    }

    function dayMouseEnter(d: Date) {
        if (lastPickerDate.current !== null) {
            if (d < lastPickerDate.current) {
                setSelectRange([d, lastPickerDate.current]);
            } else {
                setSelectRange([lastPickerDate.current, d]);
            }
        }
    }

    function startWhichHandle(d: Date) {
        if (formatDate(incrementMonth(d), YearMonth) < formatDate(incrementMonth(endWhich), YearMonth)) {
            setStartWhich(d);
        }
    }

    function endWhichHandle(d: Date) {
        if (formatDate(decreaseMonth(d), YearMonth) > formatDate(incrementMonth(startWhich), YearMonth)) {
            setEndWhich(d);
        }
    }

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            // Enter 确定
            case 13:
                blurHandle(event as any);
                if (props.onConfirm) {
                    props.onConfirm();
                }
                event.stopPropagation();
                break;
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }, []);

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className={`${prefixCls}-input-wrap`}>
                <input type="text" ref={inputRef} value={inputValue} placeholder={placeholder} onFocus={onFocus} onBlur={blurHandle} onKeyDown={handleKeyDown} onChange={changeHandle} />
            </div>
            <div className={`${prefixCls}__inner`}>
                <div className={`${prefixCls}__content_left`}>
                    <DatePickerCombobox
                        {...rest}
                        value={selectRange[0]}
                        onDayMouseEnter={dayMouseEnter}
                        selectRange={selectRange}
                        onChange={pickerHandle}
                        which={startWhich}
                        onWhichChange={startWhichHandle}
                        selectionMode={selectionMode}
                        onSelectionModeChange={setSelectionMode}
                    />
                </div>
                <div className={`${prefixCls}__content_right`}>
                    <DatePickerCombobox
                        {...rest}
                        value={selectRange[1]}
                        onDayMouseEnter={dayMouseEnter}
                        selectRange={selectRange}
                        onChange={pickerHandle}
                        which={endWhich}
                        onWhichChange={endWhichHandle}
                        selectionMode={selectionMode}
                        onSelectionModeChange={setSelectionMode}
                    />
                </div>
            </div>
        </div>
    );
}

export default React.memo(DateRangePickerPanel);
