/**
 * 格式化日期字符串
 * @param t 日期
 * @param format 格式化字符串
 * @example formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
 */
export function formatDate(t: Date, format = "yyyy-MM-dd HH:mm:ss") {
    const tf = function(i: number) {
        return (i < 10 ? "0" : "") + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (token) => {
        switch (token) {
            case "yyyy":
                return tf(t.getFullYear());
            case "MM":
                return tf(t.getMonth() + 1);
            case "mm":
                return tf(t.getMinutes());
            case "dd":
                return tf(t.getDate());
            case "HH":
                return tf(t.getHours());
            case "ss":
                return tf(t.getSeconds());
        }
    });
}

/**
 * 设置年份, 返回新日期
 * @param d
 * @param year
 */
export function setYear(d: Date, year: number) {
    const date = new Date(d);
    date.setFullYear(year);
    return date;
}

/**
 * 设置月份, 返回新日期
 * @param d
 * @param year
 */
export function setMonth(d: Date, month: number) {
    const date = new Date(d);
    date.setMonth(month);
    return date;
}

/**
 * 设置日, 返回新日期
 * @param d
 * @param year
 */
export function setDate(d: Date, day: number) {
    const date = new Date(d);
    date.setDate(day);
    return date;
}

/**
 * 设置年月日, 返回新日期
 * @param d
 * @param year
 */
export function setYearMonthDay(d: Date, other: Date) {
    const date = new Date(d);
    date.setFullYear(other.getFullYear());
    date.setMonth(other.getMonth());
    date.setDate(other.getDate());
    return date;
}
