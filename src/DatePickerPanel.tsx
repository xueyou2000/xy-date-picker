import classNames from "classnames";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { DefineDefaultValue, useControll } from "utils-hooks";
import { isDateISO } from "./date";
import { DatePickerPanelProps } from "./interface";

export function DatePickerPanel(props: DatePickerPanelProps) {
    const { prefixCls = "xy-date-picker-panel", className, style, placeholder = "请选择日期", inputRef, onFocus, onBlur, onKeyDown, onChange, disabled, ...rest } = props;
}
