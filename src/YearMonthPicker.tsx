import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef } from "react";
import { TriggerAction, useControll } from "utils-hooks";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import Trigger from "xy-trigger";
import YearMonthPickerPanel from "./YearMonthPickerPanel";
import { YearMonthPickerProps } from "./interface";
import classNames from "classnames";

const ACTION: TriggerAction[] = ["click"];
const POPUPALIGN = { overflow: { adjust: false, flip: true }, targetOffset: [0, "-100%"] };

export const YearMonthPicker = React.forwardRef((props: YearMonthPickerProps, ref: React.MutableRefObject<any>) => {
    const { prefixCls = "xy-date-picker", className, style, onVisibleChange, onChange, disabled, onBlur, onConfirm, placeholder = "请选择年月", ...rest } = props;
    const [visible, setVisible, isVisibleControll] = useControll(props, "visible", "defaultVisible", false);
    const [inputValue, setInputValue, isControll] = useControll(props, "value", "defaultValue");
    const inputRef = useRef(null);
    const cleanBtnRef = useRef(null);

    const changeValue = useCallback((val: string) => {
        if (!isControll) {
            setInputValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }, []);

    const changeVisible = useCallback((show: boolean, event?: MouseEvent) => {
        const cleanBtn = cleanBtnRef.current as HTMLElement;
        const target = event && (event.target as HTMLElement);
        if (cleanBtn && target && (cleanBtn === target || cleanBtn.contains(target))) {
            return;
        }

        if (!isVisibleControll) {
            setVisible(show);
        }
        if (onVisibleChange) {
            onVisibleChange(show);
        }
    }, []);

    function cleanHandle(e: React.MouseEvent<HTMLElement>) {
        if (inputValue) {
            changeValue(null);
        }
        e.stopPropagation();
    }

    const hide = useCallback(() => {
        changeVisible(false);
    }, []);

    const focus = useCallback(
        (trigger: HTMLElement, popup: HTMLElement) => {
            popup.style.display = "block";
            const input = inputRef.current as HTMLInputElement;
            if (visible && input) {
                input.focus();
            }
            popup.style.display = null;
        },
        [inputRef.current]
    );

    function renderPopup() {
        return <YearMonthPickerPanel {...rest} disabled={disabled} placeholder={placeholder} onBlur={onBlur} inputRef={inputRef} value={inputValue} onChange={changeValue} onConfirm={hide} />;
    }

    return (
        <Trigger prefixCls={prefixCls} onAlign={focus} action={ACTION} visible={visible} onChange={changeVisible} offsetSize={0} popupAlign={POPUPALIGN} placement="bottomLeft" popup={renderPopup()}>
            <Input
                ref={ref}
                className={className}
                placeholder={placeholder}
                value={inputValue}
                disabled={disabled}
                suffix={
                    <span ref={cleanBtnRef} className={classNames(`${prefixCls}-icon`, { "has-value": !!inputValue })} onClick={cleanHandle}>
                        <FontAwesomeIcon icon={inputValue ? faTimesCircle : faCalendarAlt} />
                    </span>
                }
            />
        </Trigger>
    );
});

export default React.memo(YearMonthPicker);
