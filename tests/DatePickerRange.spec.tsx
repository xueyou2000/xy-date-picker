import React from "react";
import { render, fireEvent } from "react-testing-library";
import { DateRangePickerPanel, SelectionMode } from "../src";
import { formatDate } from "utils-dom";
import { YearMonth, YearMonthDay } from "../src/CalendarPicker";

describe("DateRangePickerPanel", () => {
    test("input date", () => {
        const fn = jest.fn();
        const wrapper = render(<DateRangePickerPanel placeholder="请输入日期范围" defaultWhich={new Date(2019, 4, 1)} onChange={fn} />);

        const input = wrapper.getByPlaceholderText("请输入日期范围") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "2019-05-13 - 2019-05-25" } });
        expect(fn).not.toBeCalled();
        fireEvent.keyDown(input, { keyCode: 13 });
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("2019-05-13 - 2019-05-25");
        expect(wrapper.getByTitle("2019-05-13").classList.contains("selected")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-25").classList.contains("selected")).toBeTruthy();

        expect(wrapper.getByTitle("2019-05-14").classList.contains("in-range")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-24").classList.contains("in-range")).toBeTruthy();
    });

    test("invalid input will be rollback", () => {
        const fn = jest.fn();
        const wrapper = render(<DateRangePickerPanel placeholder="请输入日期范围" defaultWhich={new Date(2019, 4, 1)} onChange={fn} />);
        const input = wrapper.getByPlaceholderText("请输入日期范围") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "2019-05-13 - 2019-05-25" } });
        fireEvent.keyDown(input, { keyCode: 13 });

        fireEvent.change(input, { target: { value: "2019-05-1xasd" } });
        fireEvent.keyDown(input, { keyCode: 13 });

        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe("2019-05-13 - 2019-05-25");
    });

    test("picker date", () => {
        const fn = jest.fn();
        const wrapper = render(<DateRangePickerPanel placeholder="请输入日期范围" defaultWhich={new Date(2019, 4, 1)} onChange={fn} />);

        const startDay = wrapper.getByTitle("2019-05-14");
        fireEvent.click(startDay.querySelector(".xy-calendar-picker-cell-inner"));
        expect(startDay.classList.contains("selected")).toBeTruthy();

        const endDay = wrapper.getByTitle("2019-05-23");
        fireEvent.mouseEnter(endDay.querySelector(".xy-calendar-picker-cell-inner"));
        expect(endDay.classList.contains("selected")).toBeTruthy();

        fireEvent.click(endDay.querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("2019-05-14 - 2019-05-23");
    });
});
