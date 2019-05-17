import React from "react";
import { render, fireEvent } from "react-testing-library";
import { DatePickerPanel, SelectionMode } from "../src";
import { formatDate } from "../src/date";
import { YearMonth, YearMonthDay } from "../src/CalendarPicker";

describe("DatePickerPanel", () => {
    test("input date", () => {
        const fn = jest.fn();
        const wrapper = render(<DatePickerPanel placeholder="请输入日期" defaultWhich={new Date(2019, 4, 1)} onChange={fn} />);

        const input = wrapper.getByPlaceholderText("请输入日期") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "2019-05-13" } });
        expect(fn).not.toBeCalled();
        fireEvent.keyDown(input, { keyCode: 13 });
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("2019-05-13");
        expect(wrapper.getByTitle("2019-05-13").classList.contains("selected")).toBeTruthy();
    });

    test("invalid input will be rollback", () => {
        const fn = jest.fn();
        const wrapper = render(<DatePickerPanel placeholder="请输入日期" defaultWhich={new Date(2019, 4, 1)} onChange={fn} />);
        const input = wrapper.getByPlaceholderText("请输入日期") as HTMLInputElement;

        const day_12 = wrapper.getByTitle("2019-05-12");
        fireEvent.click(day_12.querySelector(".xy-calendar-picker-cell-inner"));
        fireEvent.change(input, { target: { value: "2019-0" } });
        fireEvent.keyDown(input, { keyCode: 13 });

        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe("2019-05-12");
    });

    test("picker date", () => {
        const fn = jest.fn();
        const wrapper = render(<DatePickerPanel defaultWhich={new Date(2019, 4, 1)} onChange={fn} />);

        const day_12 = wrapper.getByTitle("2019-05-12");
        fireEvent.click(day_12.querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("2019-05-12");
        expect(day_12.classList.contains("selected")).toBeTruthy();
    });

    test("shortcuts plane", () => {
        const fn = jest.fn();
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 3600 * 1000 * 24 * 1);
        const oneWeekAgo = new Date();
        oneWeekAgo.setTime(oneWeekAgo.getTime() - 3600 * 1000 * 24 * 7);

        const shortcuts = [
            {
                text: "今天",
                date: now
            },
            {
                text: "明天",
                date: tomorrow
            },
            {
                text: "一周前",
                date: oneWeekAgo
            }
        ];

        const wrapper = render(<DatePickerPanel shortcuts={shortcuts} onChange={fn} />);
        const shortcutsBtn = wrapper.container.querySelectorAll(".xy-date-picker-panel-shortcuts-btn");
        expect([].map.call(shortcutsBtn, (btn: HTMLElement) => btn.textContent)).toEqual(["今天", "明天", "一周前"]);

        fireEvent.click(wrapper.getByText("今天"));
        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toBe(formatDate(now, YearMonthDay));

        fireEvent.click(wrapper.getByText("明天"));
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe(formatDate(tomorrow, YearMonthDay));

        fireEvent.click(wrapper.getByText("一周前"));
        expect(fn.mock.calls.length).toBe(3);
        expect(fn.mock.calls[2][0]).toBe(formatDate(oneWeekAgo, YearMonthDay));
    });
});
