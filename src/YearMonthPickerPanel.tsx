import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DefineDefaultValue } from "utils-hooks";
import { YearMonth } from "./CalendarPicker";
import { formatDate, isYearMonth, yearMonthParse } from "./date";
import DatePickerCombobox, { SelectionMode } from "./DatePickerCombobox";
import { YearMonthPickerPanelProps } from "./interface";

export function YearMonthPickerPanel(props?: YearMonthPickerPanelProps) {
    const { prefixCls = "xy-date-picker-panel", value, defaultValue, className, style, placeholder = "请选择年月", inputRef, onFocus, onBlur, onKeyDown, onConfirm, onChange, disabled, ...rest } = props;
    const isControll = "value" in props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const [inputValue, setInputValue] = useState<string>(isYearMonth(valueProps) ? valueProps : "");
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const date = isYearMonth(inputValue) || !inputValue ? inputValue : lastRef.current;
    const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.Month);
    const _which = props.which ? props.which : date ? yearMonthParse(date) : new Date();
    const [which, setwhich] = useState<Date>(_which);

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
        }
    }, [isControll ? props.value : 1]);

    function changeValue(v: string) {
        const val = isYearMonth(v) || !v ? v : lastRef.current;
        lastRef.current = val;

        if (val) {
            setwhich(yearMonthParse(val));
        }

        if (!isControll) {
            setInputValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }

    function changeSelectionMode(mode: SelectionMode) {
        if (mode === SelectionMode.Day) {
            setSelectionMode(SelectionMode.Month);
        } else {
            setSelectionMode(mode);
        }
    }

    function changeHandle(event: React.FocusEvent<HTMLInputElement>) {
        let val = event.target.value;
        if (isYearMonth(val)) {
            lastRef.current = val;
            setwhich(yearMonthParse(val));
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

    function datePickerHandle(d: Date) {
        var val = formatDate(d, YearMonth);
        changeValue(val);
        if (onConfirm) {
            onConfirm();
        }
    }

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            // Enter 确定
            case 13:
                blurHandle(event as any);
                if (onConfirm) {
                    onConfirm();
                }
                event.stopPropagation();
                break;
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }, []);

    return (
        <div className={classNames(prefixCls, className, "year-and-month")} style={style}>
            <div className={`${prefixCls}-content`}>
                <div className={`${prefixCls}-input-wrap`}>
                    <input type="text" ref={inputRef} value={inputValue} placeholder={placeholder} onFocus={onFocus} onBlur={blurHandle} onKeyDown={handleKeyDown} onChange={changeHandle} />
                </div>
                <DatePickerCombobox {...rest} which={which} onWhichChange={setwhich} onMonthPicker={datePickerHandle} selectionMode={selectionMode} onSelectionModeChange={changeSelectionMode} value={yearMonthParse(date)} />
            </div>
        </div>
    );
}

export default React.memo(YearMonthPickerPanel);
