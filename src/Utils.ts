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
 * 获取当前年份临近的年数组
 * @description 当前这个世纪 2000~2009 前后分别加上上个世纪末尾年和下个世纪开始年， 总共12个
 * @param d
 * @param   containNear 是否包含临近的上个世纪和下个世纪，false则会返回10个
 */
export function nearYears(d: Date, containNear = true) {
    const prefix = (d.getFullYear() + "").slice(0, 3);

    function setPrefixYear(i: number) {
        return setYear(d, parseInt(`${prefix}${i}`, 10)).getFullYear();
    }

    const prevCentury = setPrefixYear(0) - 1;
    const years = containNear ? [prevCentury] : [];
    for (let i = 0; i < 10; ++i) {
        years.push(parseInt(`${prefix}${i}`, 10));
    }
    if (containNear) {
        years.push(setPrefixYear(9) + 1);
    }
    return years;
}
