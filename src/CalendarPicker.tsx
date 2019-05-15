import classNames from "classnames";
import React from "react";
import { formatDate, setMonth, setYearMonthDay, daysInMonth, decreaseMonth, incrementMonth } from "./date";
import { CalendarPickerProps } from "./interface";
import { DatePickerLocal } from "./Locale";
import { getDates } from "./Utils";

// 行数
const RowsNum: number = 6;
// 列数
const ColNum: number = 7;

// 年月格式化
const YearMonth = "yyyy-MM";
// 年月日格式化
export const YearMonthDay = "yyyy-MM-dd";

export function CalendarPicker(props: CalendarPickerProps) {
    const { prefixCls = "xy-calendar-picker", className, style, value, onPicker, min, max, onDayMouseEnter, selectRange } = props;
    const which = props.which ? props.which : value ? value : new Date();

    function selectDay(date: Date) {
        if (onPicker) {
            onPicker(setYearMonthDay(value || which, date));
        }
    }

    /**
     * 计算日历日期数组
     * @param date
     */
    function calcCalendar() {
        // 上一个月的date集合
        const beforDates = getDates(decreaseMonth(which));
        // 面板所处月的date集合
        const currentDates = getDates(which);
        // 下一个月的date集合
        const afterDates = getDates(incrementMonth(which));

        // 获取当前面板所在月第一天是星期几 0=星期日, 1=星期一
        const week = currentDates[0].getDay();

        // 追加上个月/下个月
        const befors = beforDates.slice(beforDates.length - (week === 0 ? 7 : week - 1));
        const dates = [...befors, ...currentDates, ...afterDates];

        return dates.slice(0, RowsNum * ColNum);
    }

    function factoryRows() {
        const dates = calcCalendar();
        const rows = [];
        let count = 0;

        for (let row = 0; row < RowsNum; ++row) {
            const cols = [];
            for (let col = 0; col < ColNum; ++col) {
                cols.push(createDayCell(dates[count]));
                ++count;
            }
            rows.push(<tr key={row}>{cols}</tr>);
        }

        return rows;
    }

    function createDayCell(date: Date) {
        const dateText = formatDate(date, YearMonthDay);
        const disabled = (min && date < min) || (max && date > max);
        const selected = value && formatDate(value, YearMonthDay) === dateText;
        // 是否当前面板所处月份中
        const currentMonth = formatDate(date, YearMonth) === formatDate(which, YearMonth);
        // 是否在范围选择中
        const inRange = selectRange ? dateText >= formatDate(selectRange[0], YearMonthDay) && dateText <= formatDate(selectRange[1], YearMonthDay) : false;
        const classString = classNames(`${prefixCls}-cell`, {
            disabled,
            selected,
            today: dateText === formatDate(new Date(), YearMonthDay),
            "in-range": inRange && currentMonth,
            "not-current-month": !currentMonth
        });

        return (
            <td key={dateText} title={dateText} className={classString}>
                <a
                    className={`${prefixCls}-cell-inner`}
                    onMouseEnter={() => {
                        if (!disabled && onDayMouseEnter) {
                            onDayMouseEnter(date);
                        }
                    }}
                    onClick={() => {
                        if (!disabled) {
                            selectDay(date);
                        }
                    }}
                >
                    {date.getDate()}
                </a>
            </td>
        );
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <table>
                <thead>
                    <tr>
                        {DatePickerLocal.weeks.map((week) => (
                            <th key={week}>{week}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{factoryRows()}</tbody>
            </table>
        </div>
    );
}

export default React.memo(CalendarPicker);
