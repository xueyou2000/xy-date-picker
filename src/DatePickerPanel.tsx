import classNames from "classnames";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { DefineDefaultValue, useControll } from "utils-hooks";
import { isDateISO, isDateFormat, formatDate, dateParse, isDate } from "./date";
import { DatePickerPanelProps } from "./interface";
import { YearMonthDay } from "./CalendarPicker";
import DatePickerCombobox from "./DatePickerCombobox";

export function DatePickerPanel(props: DatePickerPanelProps) {
    const { prefixCls = "xy-date-picker-panel", value, defaultValue, className, style, placeholder = "请选择日期", inputRef, onFocus, onBlur, onKeyDown, onChange, disabled, shortcuts, ...rest } = props;
    const isControll = "value" in props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const [inputValue, setInputValue] = useState<string>(isDate(valueProps, props.showTime) ? valueProps : "");
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const date = isDate(inputValue, props.showTime) || !inputValue ? inputValue : lastRef.current;

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
        }
    }, [isControll ? props.value : 1]);

    function changeValue(v: string) {
        const val = isDate(v, props.showTime) || !v ? v : lastRef.current;
        lastRef.current = val;

        if (!isControll) {
            setInputValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }

    function changeHandle(event: React.FocusEvent<HTMLInputElement>) {
        let val = event.target.value;
        if (isDate(val, props.showTime)) {
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

    function datePickerHandle(d: Date) {
        var val = formatDate(d, props.showTime ? undefined : YearMonthDay);
        changeValue(val);
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

    function shortcutBtnHandle(date: Date) {
        datePickerHandle(date);
        if (props.onConfirm) {
            props.onConfirm();
        }
    }

    function renderShortcuts() {
        if (shortcuts) {
            return (
                <div className={`${prefixCls}-shortcuts-sidebar`}>
                    {shortcuts.map((shortcut, i) => (
                        <button key={i} className={`${prefixCls}-shortcuts-btn`} onClick={() => shortcutBtnHandle(shortcut.date)}>
                            {shortcut.text}
                        </button>
                    ))}
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div className={classNames(prefixCls, className, { [`${prefixCls}-show-shortcut`]: !!shortcuts })} style={style}>
            <div className={`${prefixCls}-content`}>
                <div className={`${prefixCls}-input-wrap`}>
                    <input type="text" ref={inputRef} value={inputValue} placeholder={placeholder} onFocus={onFocus} onBlur={blurHandle} onKeyDown={handleKeyDown} onChange={changeHandle} />
                </div>
                <DatePickerCombobox {...rest} value={dateParse(date)} onChange={datePickerHandle} />
            </div>
            {renderShortcuts()}
        </div>
    );
}

export default React.memo(DatePickerPanel);
