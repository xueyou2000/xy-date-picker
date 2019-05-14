export interface YearPickerProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 日期
     */
    value?: Date;
    /**
     * 年选择事件
     */
    onPicker?: (d: Date) => void;
    /**
     * 面板所处日期
     */
    which?: Date;
    /**
     * 最小日期
     * @description 小于此时间不可选
     */
    min?: Date;
    /**
     * 最大日期
     * @description 大于此时间不可选
     */
    max?: Date;
}

export interface CalendarPickerProps extends YearPickerProps {
    /**
     * 高亮选中区间
     */
    selectRange?: [Date, Date];
    /**
     * 日期鼠标移入事件
     */
    onDayMouseEnter?: (date: Date) => void;
}
