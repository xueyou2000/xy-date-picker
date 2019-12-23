import classNames from "classnames";
import React from "react";
import { useControll } from "utils-hooks";
import { PickerCombobox } from "xy-time-picker";
import "xy-time-picker/assets/index.css";
import CalendarPicker from "./CalendarPicker";
import { formatDate, setMonth, setYear, timeParse } from "utils-dom";
import { DatePickerComboboxProps } from "./interface";
import MonthPicker from "./MonthPicker";
import { nearYears } from "./Utils";
import YearPicker from "./YearPicker";
import { getLocal } from "./local";

export enum SelectionMode {
    Year,
    Month,
    Day,
    Time,
}

export function DatePickerCombobox(props: DatePickerComboboxProps) {
    const {
        prefixCls = "xy-date-picker-combobox",
        className,
        style,
        onPicker,
        showTime = false,
        onSelectionModeChange,
        onWhichChange,
        onYearPicker,
        onMonthPicker,
        onDayPicker,
        onTimePicker,
        onChange,
        onConfirm,
        silentTimePicker = false,
        ...rest
    } = props;
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
            changeWhich(setYear(which, which.getFullYear() - 1));
        }
    }

    function nextBtnHadnle() {
        if (selectionMode === SelectionMode.Month) {
            changeWhich(setYear(which, which.getFullYear() + 1));
        } else {
            changeWhich(setYear(which, which.getFullYear() + 1));
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
        const d = timeParse(timeStr, new Date(value || which));
        if (silentTimePicker === false) {
            changeValue(d);
        }
        if (onTimePicker) {
            onTimePicker(timeStr, d);
        }
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
                            {which.getFullYear()}
                            {getLocal().DatePicker.year}
                        </a>
                        <a className={`${prefixCls}-title__select`} onClick={switchMonthMode}>
                            {which.getMonth() + 1}
                            {getLocal().DatePicker.month}
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
                title = formatDate(value || which, getLocal().DatePicker.dateFormate);
                break;
        }

        return (
            <div className={`${prefixCls}-header`}>
                <a className={`${prefixCls}-decade-btn ${prefixCls}-year-prev`} onClick={prevBtnHadnle} />
                <a className={`${prefixCls}-decade-btn ${prefixCls}-month-prev`} onClick={prevMonth} />
                <span className={`${prefixCls}-title`}>{title}</span>
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
                        {getLocal().DatePicker.today}
                    </a>
                    <a className="time-picker-btn" onClick={toggleMode}>
                        {selectionMode === SelectionMode.Time ? getLocal().DatePicker.datePlaceholder : getLocal().DatePicker.timePlaceholder}
                    </a>
                    <a className={`${prefixCls}-ok-btn`} onClick={confirmHandle}>
                        {getLocal().DatePicker.confirm}
                    </a>
                </React.Fragment>
            );
        } else {
            return (
                <a className="today-btn" onClick={() => dayPicker(new Date())}>
                    {getLocal().DatePicker.today}
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
