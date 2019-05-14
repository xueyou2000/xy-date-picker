import { setMonth } from "./date";

/**
 * 获取指定月的天数
 * @param date
 */
export function daysInMonth(date: Date) {
    // Tips: 当 setDate(0) 传入0时，会得到前一个月的最后一天，就不用判断是否闰年了
    const prevMonth = setMonth(date, date.getMonth() - 1);
    prevMonth.setDate(0);
    return prevMonth.getDate();
}
