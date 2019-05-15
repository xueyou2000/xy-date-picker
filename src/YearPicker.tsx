import classNames from "classnames";
import React from "react";
import { YearPickerProps } from "./interface";
import { setYear } from "./date";
import { nearYears } from "./Utils";

// 行数
export const RowsNum: number = 4;
// 列数
export const ColNum: number = 3;

export function YearPicker(props: YearPickerProps) {
    const { prefixCls = "xy-year-picker", className, value, onPicker, style, min, max } = props;
    const which = props.which ? props.which : value ? value : new Date();

    function selectYear(year: number) {
        if (onPicker) {
            onPicker(setYear(which, year));
        }
    }

    function factoryYearRows() {
        const years = nearYears(which);
        const rows = [];
        let count = 0;

        for (let row = 0; row < RowsNum; ++row) {
            const cols = [];
            for (let col = 0; col < ColNum; ++col) {
                cols.push(createYearCell(years[count], count === 0 || count === years.length - 1));
                ++count;
            }
            rows.push(<tr key={row}>{cols}</tr>);
        }

        return rows;
    }

    /**
     *
     * @param year
     * @param notNowCentury 不在这个世纪
     */
    function createYearCell(year: number, notNowCentury = false) {
        const d = setYear(which, year);
        const disabled = (min && d < min) || (max && d > max);
        const selected = value && value.getFullYear() === year;
        const classString = classNames(`${prefixCls}-cell`, { disabled, selected, "not-now-century": notNowCentury });

        return (
            <td key={year} className={classString}>
                <a
                    className={`${prefixCls}-cell-inner`}
                    onClick={() => {
                        if (!disabled) {
                            selectYear(year);
                        }
                    }}
                >
                    {year}
                </a>
            </td>
        );
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <table>
                <tbody>{factoryYearRows()}</tbody>
            </table>
        </div>
    );
}

export default React.memo(YearPicker);
