import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DefineDefaultValue } from "utils-hooks";
import { YearMonth, YearMonthDay } from "./CalendarPicker";
import { dateRangeParse, decreaseMonth, formatDate, incrementMonth, isDateRange, timeParse } from "./date";
import DatePickerCombobox, { SelectionMode } from "./DatePickerCombobox";
import { DateRangePickerPanelProps } from "./interface";

export function DateRangePickerPanel(props: DateRangePickerPanelProps) {
    const { prefixCls = "xy-date-range-picker-panel", className, style, value, separator = " - ", defaultValue, placeholder = "请选择日期范围", inputRef, onFocus, onBlur, onKeyDown, onChange, onConfirm, disabled, ...rest } = props;
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
    const [endWhich, setEndWhich] = useState<Date>(selectRange[1] ? selectRange[1] : incrementMonth(startWhich));
    const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.Day);

    const classString = classNames(prefixCls, className, {
        "hide-start-arrow": formatDate(incrementMonth(startWhich), YearMonth) >= formatDate(endWhich, YearMonth),
        "hide-end-arrow": formatDate(decreaseMonth(endWhich), YearMonth) <= formatDate(startWhich, YearMonth),
        "show-time": props.showTime
    });
    const selected = selectRange[0] !== null && selectRange[1] !== null;
    const startTime = useRef<string>(selectRange[0] !== null ? formatDate(selectRange[0], "HH:mm:ss") : null);
    const endTime = useRef<string>(selectRange[1] !== null ? formatDate(selectRange[1], "HH:mm:ss") : null);

    function getSelectRange(range?: string): [Date, Date] {
        const rangeStr = range === undefined ? dateRange : range;
        return rangeStr ? dateRangeParse(rangeStr, props.showTime, separator) : [null, null];
    }

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
            setSelectRange(getSelectRange(props.value));
        }
    }, [isControll ? props.value : 1]);

    function changeValue(v: string) {
        const val = isDateRange(v, props.showTime, separator) || !v ? v : lastRef.current;
        lastRef.current = val;

        // 切换面板所处日期为上一次选择的
        const range = getSelectRange(val);
        if (range[0] !== null && range[1] !== null) {
            setStartWhich(range[0]);
            setEndWhich(formatDate(range[1], YearMonth) <= formatDate(range[0], YearMonth) ? incrementMonth(range[0]) : range[1]);
        }

        if (!isControll) {
            setSelectRange(range);
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
            // 设置时分秒为当前选择的
            if (startTime.current) {
                d = timeParse(startTime.current, d);
            }
            lastPickerDate.current = d;
            setSelectRange([d, null]);
        } else if (selected && lastPickerDate.current) {
            // const range: [Date, Date] = formatDate(lastPickerDate.current, YearMonthDay) < formatDate(d, YearMonthDay) ? [lastPickerDate.current, d] : [d, lastPickerDate.current];
            lastPickerDate.current = null;
            changeValue(formate(selectRange));
            confirmHandle();
        }
    }

    function formate(dateRange: [Date, Date]) {
        const format = props.showTime ? undefined : YearMonthDay;
        return `${formatDate(dateRange[0], format)}${separator}${formatDate(dateRange[1], format)}`;
    }

    function dayMouseEnter(d: Date) {
        if (lastPickerDate.current !== null) {
            if (d < lastPickerDate.current) {
                // 交换时分秒部分
                if (startTime.current) {
                    d = timeParse(startTime.current, d);
                } else {
                    d = timeParse("00:00:00", d);
                }

                if (endTime.current) {
                    lastPickerDate.current = timeParse(endTime.current, lastPickerDate.current);
                } else {
                    lastPickerDate.current = timeParse("00:00:00", lastPickerDate.current);
                }
                setSelectRange([d, lastPickerDate.current]);
            } else {
                // 设置时分秒为当前选择的
                if (endTime.current) {
                    d = timeParse(endTime.current, d);
                } else {
                    d = timeParse("00:00:00", d);
                }
                setSelectRange([lastPickerDate.current, d]);
            }
        }
    }

    function startWhichHandle(d: Date) {
        if (formatDate(d, YearMonth) < formatDate(endWhich, YearMonth)) {
            setStartWhich(d);
        } else {
            setStartWhich(decreaseMonth(endWhich));
        }
    }

    function endWhichHandle(d: Date) {
        if (formatDate(d, YearMonth) > formatDate(startWhich, YearMonth)) {
            setEndWhich(d);
        } else {
            setEndWhich(incrementMonth(startWhich));
        }
    }

    function startTimePickerHandle(time: string, date: Date) {
        startTime.current = time;
        let end = selectRange[1];
        if (endTime.current) {
            end = timeParse(endTime.current, end);
        }
        changeValue(`${formatDate(date)}${separator}${formatDate(end)}`);
    }

    function endTimePickerHandle(time: string, date: Date) {
        endTime.current = time;
        let start = selectRange[0];
        if (startTime.current) {
            start = timeParse(startTime.current, start);
        }
        changeValue(`${formatDate(selectRange[0])}${separator}${formatDate(date)}`);
    }

    function toggleMode() {
        if (!selected) {
            return;
        }
        if (selectionMode === SelectionMode.Time) {
            setSelectionMode(SelectionMode.Day);
        } else {
            setSelectionMode(SelectionMode.Time);
        }
    }

    function confirmHandle() {
        if (onConfirm) {
            onConfirm();
        }
    }

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            // Enter 确定
            case 13:
                blurHandle(event as any);
                confirmHandle();
                event.stopPropagation();
                break;
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }, []);

    function renderFooter() {
        if (props.showTime) {
            return (
                <React.Fragment>
                    <a className={classNames("time-picker-btn", { disabled: !selected || lastPickerDate.current !== null })} onClick={toggleMode}>
                        {selectionMode === SelectionMode.Time ? "选择日期" : "选择时间"}
                    </a>
                    <a className={`${prefixCls}-ok-btn`} onClick={confirmHandle}>
                        确定
                    </a>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    return (
        <div className={classString} style={style}>
            <div className={`${prefixCls}-input-wrap`}>
                <input type="text" ref={inputRef} value={inputValue} placeholder={placeholder} onFocus={onFocus} onBlur={blurHandle} onKeyDown={handleKeyDown} onChange={changeHandle} />
            </div>
            <div className={`${prefixCls}__inner`}>
                <div className={`${prefixCls}__content_left`}>
                    <DatePickerCombobox
                        {...rest}
                        silentTimePicker={true}
                        value={selectRange[0]}
                        onDayMouseEnter={dayMouseEnter}
                        selectRange={selectRange}
                        onChange={pickerHandle}
                        onTimePicker={startTimePickerHandle}
                        which={startWhich}
                        onWhichChange={startWhichHandle}
                        selectionMode={selectionMode}
                        onSelectionModeChange={setSelectionMode}
                    />
                </div>
                <div className={`${prefixCls}__content_right`}>
                    <DatePickerCombobox
                        {...rest}
                        silentTimePicker={true}
                        value={selectRange[1]}
                        onDayMouseEnter={dayMouseEnter}
                        selectRange={selectRange}
                        onChange={pickerHandle}
                        onTimePicker={endTimePickerHandle}
                        which={endWhich}
                        onWhichChange={endWhichHandle}
                        selectionMode={selectionMode}
                        onSelectionModeChange={setSelectionMode}
                    />
                </div>
            </div>
            <div className={`${prefixCls}-footer`}>
                <div className={`${prefixCls}-footer-btns`}>{renderFooter()}</div>
            </div>
        </div>
    );
}

export default React.memo(DateRangePickerPanel);
