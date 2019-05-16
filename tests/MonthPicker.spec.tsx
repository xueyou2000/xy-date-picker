import React from "react";
import { render, fireEvent } from "react-testing-library";
import { MonthPicker } from "../src";
import { DatePickerLocal } from "../src/Locale";
import { formatDate } from "../src/date";

describe("MonthPicker", () => {
    test("render", () => {
        const wrapper = render(<MonthPicker which={new Date(2019, 5, 1)} />);
        const months = wrapper.container.querySelectorAll(".xy-month-picker-cell > .xy-month-picker-cell-inner");
        expect([].map.call(months, (year: HTMLElement) => year.innerHTML)).toEqual(DatePickerLocal.months);
    });

    test("selected by value", () => {
        const wrapper = render(<MonthPicker which={new Date(2019, 5, 1)} value={new Date(2019, 5, 1)} />);
        expect(wrapper.getByText("六月").parentElement.classList.contains("selected")).toBeTruthy();
    });

    test("onPicker", () => {
        const fn = jest.fn();
        const wrapper = render(<MonthPicker which={new Date(2019, 5, 1)} value={new Date(2019, 5, 1)} onPicker={fn} />);
        fireEvent.click(wrapper.getByText("一月"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy-MM")).toBe("2019-01");

        fireEvent.click(wrapper.getByText("五月"));
        expect(fn.mock.calls.length).toBe(2);
        expect(formatDate(fn.mock.calls[1][0], "yyyy-MM")).toBe("2019-05");
    });

    test("min", () => {
        const min = new Date(2019, 3, 1);
        const fn = jest.fn();
        const wrapper = render(<MonthPicker min={min} which={new Date(2019, 5, 1)} onPicker={fn} />);

        fireEvent.click(wrapper.getByText("二月"));
        expect(fn.mock.calls.length).toBe(0);
        expect(wrapper.getByText("一月").parentElement.classList.contains("disabled")).toBeTruthy();
        expect(wrapper.getByText("三月").parentElement.classList.contains("disabled")).toBeTruthy();

        fireEvent.click(wrapper.getByText("四月"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy-MM")).toBe("2019-04");
    });

    test("max", () => {
        const max = new Date(2019, 8, 1);
        const fn = jest.fn();
        const wrapper = render(<MonthPicker max={max} which={new Date(2019, 5, 1)} onPicker={fn} />);

        fireEvent.click(wrapper.getByText("十二月"));
        expect(fn.mock.calls.length).toBe(0);
        expect(wrapper.getByText("十月").parentElement.classList.contains("disabled")).toBeTruthy();
        expect(wrapper.getByText("十一月").parentElement.classList.contains("disabled")).toBeTruthy();

        fireEvent.click(wrapper.getByText("四月"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy-MM")).toBe("2019-04");
    });
});
