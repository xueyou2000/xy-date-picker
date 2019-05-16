import React from "react";
import { render, fireEvent } from "react-testing-library";
import { DatePickerCombobox, SelectionMode } from "../src";
import { formatDate } from "../src/date";

describe("DatePickerCombobox", () => {
    test("switch selectionMode will change title", () => {
        const onYearPicker = jest.fn();
        const onMonthPicker = jest.fn();
        const onDayPicker = jest.fn();
        const fn = jest.fn();
        const wrapper = render(<DatePickerCombobox onSelectionModeChange={fn} defaultWhich={new Date(2019, 5, 1)} onYearPicker={onYearPicker} onMonthPicker={onMonthPicker} onDayPicker={onDayPicker} />);
        const title = wrapper.container.querySelector(".xy-date-picker-combobox-title");
        expect(title.textContent).toBe("2019年6月");

        // 点击标题
        fireEvent.click(wrapper.getByText("2019年"));
        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toBe(SelectionMode.Year);
        expect(title.textContent).toBe("2010 ~ 2019");

        // 点击标题
        fireEvent.click(wrapper.getByText("2015"));
        expect(onYearPicker).toBeCalled();
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe(SelectionMode.Day);
        expect(title.textContent).toBe("2015年6月");
        fireEvent.click(wrapper.getByText("17"));
        expect(onDayPicker).toBeCalled();

        // 点击标题
        fireEvent.click(wrapper.getByText("6月"));
        expect(fn.mock.calls.length).toBe(3);
        expect(fn.mock.calls[2][0]).toBe(SelectionMode.Month);
        expect(title.textContent).toBe("2015");
        fireEvent.click(wrapper.getByText("十月"));
        expect(onMonthPicker).toBeCalled();
    });

    test("onConfirm", () => {
        const fn = jest.fn();
        const wrapper = render(<DatePickerCombobox defaultWhich={new Date(2019, 5, 1)} onConfirm={fn} />);
        fireEvent.click(wrapper.getByText("17"));
        expect(fn).toBeCalled();

        // 可以选择时间时， 选择日不会触发onConfirm, 只有点击确定按钮才会触发onConfirm
        wrapper.rerender(<DatePickerCombobox showTime={true} defaultWhich={new Date(2019, 5, 1)} onConfirm={fn} />);
        fireEvent.click(wrapper.getByText("18"));
        expect(fn.mock.calls.length).toBe(1);

        fireEvent.click(wrapper.getByText("确定"));
        expect(fn.mock.calls.length).toBe(2);
    });

    test("show time", () => {
        const fn = jest.fn();
        const onChange = jest.fn();
        const wrapper = render(<DatePickerCombobox defaultWhich={new Date(2019, 5, 1)} onTimePicker={fn} onChange={onChange} />);

        // 直接点击日，则默认时分秒用0填充
        fireEvent.click(wrapper.getByText("15"));
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toBe("2019-05-15 00:00:00");

        // 点击 选择时间 按钮
        fireEvent.click(wrapper.getByText("选择时间"));
        // wrapper.container.querySelector('.xy-picker-combobox-show-second');
        // expect(wrapper.getByText(''))
    });
});
