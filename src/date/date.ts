import { isTime } from "./time";

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
 * 验证日期字符串格式
 * @description 例如: 2018-03-26
 * @param date 日期字符串
 */
export function isDateFormat(date: string): boolean {
    if (!date) {
        return false;
    }
    var status = true;
    var regexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    var matches = regexp.exec(date);
    if (matches == null) {
        return false;
    }
    var matches3 = parseInt(matches[3]);
    if (matches3 <= 0 || matches3 > 12) {
        return false;
    }
    var matches4 = parseInt(matches[4]);
    if (!matches) {
        status = false;
    }
    if (status && matches4 > 31) {
        status = false;
    }
    if (status && matches3 == 2 && matches4 > 28) {
        status = false;
    }
    if (status && (matches3 == 1 || matches3 == 3 || matches3 == 5 || matches3 == 7 || matches3 == 8 || matches3 == 10 || matches3 == 12) && matches4 > 31) {
        status = false;
    }
    return status;
}

/**
 * 验证日期字符串格式
 * @description 例如: 2018-03-26 10:32:33
 * @param date 日期字符串
 */
export function isDateISO(date: string): boolean {
    if (!date) {
        return false;
    }
    var status = true;
    var regexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) ((\d{1,2}):(\d{1,2}):(\d{1,2}))$/;
    var matches = regexp.exec(date);
    if (matches == null) {
        return false;
    }
    var matches3 = parseInt(matches[3]);
    if (matches3 <= 0 || matches3 > 12) {
        return false;
    }
    var matches4 = parseInt(matches[4]);
    if (!matches) {
        status = false;
    }
    if (status && matches4 > 31) {
        status = false;
    }
    if (status && matches3 == 2 && matches4 > 28) {
        status = false;
    }
    if (status && (matches3 == 1 || matches3 == 3 || matches3 == 5 || matches3 == 7 || matches3 == 8 || matches3 == 10 || matches3 == 12) && matches4 > 31) {
        status = false;
    }
    if (status && !isTime(matches[5])) {
        status = false;
    }
    return status;
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
 * 累加月份, 返回新日期
 * @param d
 */
export function incrementMonth(d: Date) {
    const date = new Date(d);
    const month = date.getMonth();
    let prevDate: Date;
    switch (month) {
        case 11:
            // 往后翻一年
            prevDate = setYear(date, date.getFullYear() + 1);
            prevDate.setMonth(0);
            break;
        default:
            prevDate = setMonth(date, month + 1);
    }
    return prevDate;
}

/**
 * 累减月份, 返回新日期
 * @param d
 */
export function decreaseMonth(d: Date) {
    const date = new Date(d);
    const month = date.getMonth();
    let prevDate: Date;
    switch (month) {
        case 0:
            // 往前翻一年
            prevDate = setYear(date, date.getFullYear() - 1);
            prevDate.setMonth(11);
            break;
        default:
            prevDate = setMonth(date, month - 1);
    }
    return prevDate;
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
