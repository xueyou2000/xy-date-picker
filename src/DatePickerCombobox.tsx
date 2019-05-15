import classNames from "classnames";
import React, { useState } from "react";
import { DatePickerComboboxProps } from "./interface";
import { PickerCombobox } from "xy-time-picker";
import "xy-time-picker/assets/index.css";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";
import CalendarPicker from "./CalendarPicker";
import { useControll } from "utils-hooks";
import { nearYears } from "./Utils";
import { setMonth, setYear, formatDate, timeParse } from "./date";

export enum SelectionMode {
    Year,
    Month,
    Day,
    Time
}

export function DatePickerCombobox(props: DatePickerComboboxProps) {
    const { prefixCls = "xy-date-picker-combobox", className, style, onPicker, showTime = false, onSelectionModeChange, onWhichChange, onYearPicker, onMonthPicker, onDayPicker, onChange, onConfirm, ...rest } = props;
    const [value, setValue, isValueControll] = useControll<Date>(props, "value", "defaultValue");
    const [which, setWhich, isControll] = useControll(props, "which", "defaultWhich", value || new Date());
    const [selectionMode, setSelectionMode, isSelectionModeControll] = useControll<SelectionMode>(props, "selectionMode", "defaultSelectionMode", SelectionMode.Day);
    const classString = classNames(prefixCls, className, `selection-mode-${selectionMode}`, { "show-time": showTime });
    const time = value ? formatDate(value, "HH:mm:ss") : "00:00:00";

    function changeWhich(d: Date) {
        if (!isControll) {
            setWhich(d);
        }
        if (onWhichChange) {
            onWhichChange(d);
        }
    }

    function changeValue(d: Date) {
        if (!isValueControll) {
            setValue(d);
        }
        if (onChange) {
            onChange(d);
        }
    }

    function changeSelectionMode(mode: SelectionMode) {
        if (!isSelectionModeControll) {
            setSelectionMode(mode);
        }
        if (onSelectionModeChange) {
            onSelectionModeChange(mode);
        }
    }

    function prevBtnHadnle() {
        if (selectionMode === SelectionMode.Month) {
            changeWhich(setYear(which, which.getFullYear() - 1));
        } else {
            changeWhich(setYear(which, which.getFullYear() - 10));
        }
    }

    function nextBtnHadnle() {
        if (selectionMode === SelectionMode.Month) {
            changeWhich(setYear(which, which.getFullYear() + 1));
        } else {
            changeWhich(setYear(which, which.getFullYear() + 10));
        }
    }

    function prevMonth() {
        changeWhich(setMonth(which, which.getMonth() - 1));
    }

    function nextMonth() {
        changeWhich(setMonth(which, which.getMonth() + 1));
    }

    function switchYearMode() {
        changeSelectionMode(SelectionMode.Year);
    }

    function switchMonthMode() {
        changeSelectionMode(SelectionMode.Month);
    }

    function switchDayMode() {
        changeSelectionMode(SelectionMode.Day);
    }

    function toggleMode() {
        if (selectionMode === SelectionMode.Time) {
            switchDayMode();
        } else {
            changeSelectionMode(SelectionMode.Time);
        }
    }

    function yearPicker(d: Date) {
        changeWhich(d);
        switchDayMode();
        if (onYearPicker) {
            onYearPicker(d);
        }
    }

    function monthPicker(d: Date) {
        changeWhich(d);
        changeSelectionMode(SelectionMode.Day);
        if (onMonthPicker) {
            onMonthPicker(d);
        }
    }

    function dayPicker(d: Date, isConfirm = false) {
        const date = timeParse(time, d);
        if (onDayPicker) {
            onDayPicker(date);
        }
        changeValue(date);
        if ((showTime === false || isConfirm) && onConfirm) {
            onConfirm();
        }
    }

    function timeChange(timeStr: string) {
        changeValue(timeParse(timeStr, new Date(value || which)));
    }

    function confirmHandle() {
        if (onConfirm && value) {
            onConfirm();
        }
    }

    function renderHeader() {
        let title = null;
        switch (selectionMode) {
            case SelectionMode.Day:
                title = (
                    <React.Fragment>
                        <a className={`${prefixCls}-title__select`} onClick={switchYearMode}>
                            {which.getFullYear()}年
                        </a>
                        <a className={`${prefixCls}-title__select`} onClick={switchMonthMode}>
                            {which.getMonth() + 1}月
                        </a>
                    </React.Fragment>
                );
                break;
            case SelectionMode.Month:
                title = (
                    <a className={`${prefixCls}-title__select`} onClick={switchYearMode}>
                        {which.getFullYear()}
                    </a>
                );
                break;
            case SelectionMode.Year:
                const years = nearYears(which, false);
                title = `${years[0]} ~ ${years[years.length - 1]}`;
                break;
            case SelectionMode.Time:
                title = formatDate(value || which, "yyyy年 MM月 dd日");
                break;
        }

        return (
            <div className={`${prefixCls}-header`}>
                <a className={`${prefixCls}-decade-btn ${prefixCls}-year-prev`} onClick={prevBtnHadnle} />
                <a className={`${prefixCls}-decade-btn ${prefixCls}-month-prev`} onClick={prevMonth} />
                <a className={`${prefixCls}-title`}>{title}</a>
                <a className={`${prefixCls}-decade-btn ${prefixCls}-month-next`} onClick={nextMonth} />
                <a className={`${prefixCls}-decade-btn ${prefixCls}-year-next`} onClick={nextBtnHadnle} />
            </div>
        );
    }

    function renderBody() {
        switch (selectionMode) {
            case SelectionMode.Day:
                return <CalendarPicker {...rest} value={value} which={which} onPicker={dayPicker} />;
            case SelectionMode.Month:
                return <MonthPicker {...rest} value={value} which={which} onPicker={monthPicker} />;
            case SelectionMode.Year:
                return <YearPicker {...rest} value={value} which={which} onPicker={yearPicker} />;
            case SelectionMode.Time:
                return <PickerCombobox value={time} onPicker={timeChange} />;
        }
    }

    function renderFooter() {
        if (showTime) {
            return (
                <React.Fragment>
                    <a className="today-btn" onClick={() => dayPicker(new Date(), true)}>
                        今天
                    </a>
                    <a className="time-picker-btn" onClick={toggleMode}>
                        {selectionMode === SelectionMode.Time ? "选择日期" : "选择时间"}
                    </a>
                    <a className={`${prefixCls}-ok-btn`} onClick={confirmHandle}>
                        确定
                    </a>
                </React.Fragment>
            );
        } else {
            return (
                <a className="today-btn" onClick={() => dayPicker(new Date())}>
                    今天
                </a>
            );
        }
    }

    return (
        <div className={classString} style={style}>
            {renderHeader()}
            <div className={`${prefixCls}-body`}>{renderBody()}</div>
            <div className={`${prefixCls}-footer`}>
                <div className={`${prefixCls}-footer-btns`}>{renderFooter()}</div>
            </div>
        </div>
    );
}

export default React.memo(DatePickerCombobox);
