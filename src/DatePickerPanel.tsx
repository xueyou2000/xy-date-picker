import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DefineDefaultValue } from "utils-hooks";
import { YearMonthDay } from "./CalendarPicker";
import { dateParse, formatDate, isDate } from "./date";
import DatePickerCombobox from "./DatePickerCombobox";
import { DatePickerPanelProps } from "./interface";

export function DatePickerPanel(props: DatePickerPanelProps) {
    const { prefixCls = "xy-date-picker-panel", value, defaultValue, className, style, placeholder = "请选择日期", inputRef, onFocus, onBlur, onKeyDown, onChange, disabled, shortcuts, ...rest } = props;
    const isControll = "value" in props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const [inputValue, setInputValue] = useState<string>(isDate(valueProps, props.showTime) ? valueProps : "");
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const date = isDate(inputValue, props.showTime) || !inputValue ? inputValue : lastRef.current;
    const [which, setwhich] = useState<Date>(dateParse(date) || new Date());

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
        }
    }, [isControll ? props.value : 1]);

    function changeValue(v: string) {
        const val = isDate(v, props.showTime) || !v ? v : lastRef.current;
        lastRef.current = val;

        if (val) {
            setwhich(dateParse(val));
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
        if (isDate(val, props.showTime)) {
            lastRef.current = val;
            setwhich(dateParse(val));
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
                <DatePickerCombobox {...rest} which={which} onWhichChange={setwhich} value={dateParse(date)} onChange={datePickerHandle} />
            </div>
            {renderShortcuts()}
        </div>
    );
}

export default React.memo(DatePickerPanel);
