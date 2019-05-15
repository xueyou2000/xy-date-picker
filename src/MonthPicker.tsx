import classNames from "classnames";
import React from "react";
import { YearPickerProps } from "./interface";
import { setMonth } from "./date";
import { ColNum, RowsNum } from "./YearPicker";
import { DatePickerLocal } from "./Locale";

export function MonthPicker(props: YearPickerProps) {
    const { prefixCls = "xy-month-picker", className, value, onPicker, style, min, max } = props;
    const which = props.which ? props.which : value ? value : new Date();

    function selectMonth(month: number) {
        if (onPicker) {
            onPicker(setMonth(which, month));
        }
    }

    function factoryMonthRows() {
        const rows = [];
        let count = 0;

        for (let row = 0; row < RowsNum; ++row) {
            const cols = [];
            for (let col = 0; col < ColNum; ++col) {
                cols.push(createMonthCell(count));
                ++count;
            }
            rows.push(<tr key={row}>{cols}</tr>);
        }

        return rows;
    }

    /**
     *
     * @param month
     */
    function createMonthCell(month: number) {
        const d = setMonth(which, month);
        const disabled = (min && d < min) || (max && d > max);
        const selected = value && value.getMonth() === month;
        const classString = classNames(`${prefixCls}-cell`, { disabled, selected });

        return (
            <td key={month} className={classString}>
                <a
                    className={`${prefixCls}-cell-inner`}
                    onClick={() => {
                        if (!disabled) {
                            selectMonth(month);
                        }
                    }}
                >
                    {DatePickerLocal.months[month]}
                </a>
            </td>
        );
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <table>
                <tbody>{factoryMonthRows()}</tbody>
            </table>
        </div>
    );
}

export default React.memo(MonthPicker);
