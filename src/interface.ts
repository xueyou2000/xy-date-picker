export interface InputGenericProps {
    /**
     * 输入框占位符
     */
    placeholder?: string;
    /**
     * 禁用
     */
    disabled?: boolean;
    /**
     * 输入框焦点事件
     */
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /**
     * 输入框失去焦点事件
     */
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /**
     * 键盘事件
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

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

export interface DatePickerComboboxProps extends CalendarPickerProps {
    /**
     * 日期
     */
    value?: Date;
    /**
     * 默认日期
     */
    defaultValue?: Date;
    /**
     * 日期改变
     */
    onChange?: (date: Date) => void;
    /**
     * 默认所处日期
     */
    defaultWhich?: Date;
    /**
     * 所处日期更改
     */
    onWhichChange?: (date: Date) => void;
    /**
     * 年选择
     */
    onYearPicker?: (date: Date) => void;
    /**
     * 月选择
     */
    onMonthPicker?: (date: Date) => void;
    /**
     * 日选择
     */
    onDayPicker?: (date: Date) => void;
    /**
     * 确定事件, 用于收起面板
     * @description 当选择模式为日模式时， 选择日会触发， 当可以选择时间时候，点击确定按钮触发
     */
    onConfirm?: Function;
    /**
     * 是否可以选择时间
     */
    showTime?: boolean;
}

type DatePickerComboboxNoValue = Pick<Partial<DatePickerComboboxProps>, Exclude<keyof Partial<DatePickerComboboxProps>, "value">>;
type DatePickerComboboxNoDefaultValue = Pick<Partial<DatePickerComboboxNoValue>, Exclude<keyof Partial<DatePickerComboboxNoValue>, "defaultValue">>;
type DatePickerComboboxNoChange = Pick<Partial<DatePickerComboboxNoDefaultValue>, Exclude<keyof Partial<DatePickerComboboxNoDefaultValue>, "onChange">>;

export interface DatePickerPanelProps extends DatePickerComboboxNoChange, InputGenericProps {
    /**
     * 日期
     * @description 年月日时分秒字符串
     */
    value?: string;
    /**
     * 默认日期
     * @description 年月日时分秒字符串
     */
    defaultValue?: string;
    /**
     * onChange事件
     */
    onChange?: (value: string) => void;
    /**
     * 输入框ref
     */
    inputRef?: React.MutableRefObject<any>;
}
