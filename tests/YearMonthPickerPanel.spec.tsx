import React from "react";
import { render, fireEvent } from "react-testing-library";
import { YearMonthPickerPanel } from "../src";
import { formatDate } from "../src/date";
import { DatePickerLocal } from "../src/Locale";

describe("YearMonthPicker", () => {
    test("render", () => {
        const onConfirm = jest.fn();
        const fn = jest.fn();
        const wrapper = render(<YearMonthPickerPanel defaultWhich={new Date(2019, 4, 1)} onChange={fn} onConfirm={onConfirm} />);

        // 点击年标题，选择年份
        fireEvent.click(wrapper.container.querySelector(".xy-date-picker-combobox-title__select"));
        fireEvent.click(wrapper.getByText("2018"));

        // 选择月份
        fireEvent.click(wrapper.getByText("七月"));

        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("2018-07");
        expect(onConfirm.mock.calls.length).toBe(1);
    });
});
