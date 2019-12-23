import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CalendarPicker } from "../src";
import { formatDate } from "utils-dom";
import Local from "../src/local/zh";

describe("CalendarPicker", () => {
    test("render", () => {
        const wrapper = render(<CalendarPicker which={new Date(2019, 4, 1)} />);

        const ths = wrapper.container.querySelectorAll(".xy-calendar-picker  th");
        expect([].map.call(ths, (th: HTMLElement) => th.innerHTML)).toEqual(Local.DatePicker.weeks);

        const days = wrapper.container.querySelectorAll(".xy-calendar-picker-cell > .xy-calendar-picker-cell-inner");
        expect([].map.call(days, (year: HTMLElement) => year.innerHTML)).toEqual(["29", "30", ...new Array(31).fill(0).map((_, i) => `${i + 1}`), ...new Array(9).fill(0).map((_, i) => `${i + 1}`)]);

        expect(wrapper.getByTitle("2019-04-30").classList.contains("not-current-month")).toBeTruthy();
        expect(wrapper.getByTitle("2019-06-01").classList.contains("not-current-month")).toBeTruthy();
    });

    test("selected by value", () => {
        const wrapper = render(<CalendarPicker which={new Date(2019, 4, 1)} value={new Date(2019, 4, 1)} />);
        expect(wrapper.getByTitle("2019-05-01").classList.contains("selected")).toBeTruthy();
    });

    test("onPicker", () => {
        const fn = jest.fn();
        const wrapper = render(<CalendarPicker which={new Date(2019, 4, 1)} onPicker={fn} />);
        fireEvent.click(wrapper.getByTitle("2019-05-01").querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy-MM-dd")).toBe("2019-05-01");

        fireEvent.click(wrapper.getByTitle("2019-06-08").querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn.mock.calls.length).toBe(2);
        expect(formatDate(fn.mock.calls[1][0], "yyyy-MM-dd")).toBe("2019-06-08");
    });

    test("min", () => {
        const min = new Date(2019, 4, 15);
        const fn = jest.fn();
        const wrapper = render(<CalendarPicker min={min} which={new Date(2019, 4, 1)} onPicker={fn} />);

        fireEvent.click(wrapper.getByTitle("2019-04-30").querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn.mock.calls.length).toBe(0);
        expect(wrapper.getByTitle("2019-04-30").classList.contains("disabled")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-14").classList.contains("disabled")).toBeTruthy();

        fireEvent.click(wrapper.getByTitle("2019-05-15").querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy-MM-dd")).toBe("2019-05-15");
    });

    test("max", () => {
        const max = new Date(2019, 4, 28);
        const fn = jest.fn();
        const wrapper = render(<CalendarPicker max={max} which={new Date(2019, 4, 1)} onPicker={fn} />);

        fireEvent.click(wrapper.getByTitle("2019-05-29").querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn.mock.calls.length).toBe(0);
        expect(wrapper.getByTitle("2019-05-30").classList.contains("disabled")).toBeTruthy();
        expect(wrapper.getByTitle("2019-06-06").classList.contains("disabled")).toBeTruthy();

        fireEvent.click(wrapper.getByTitle("2019-05-15").querySelector(".xy-calendar-picker-cell-inner"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy-MM-dd")).toBe("2019-05-15");
    });

    test("selectRange", () => {
        const wrapper = render(<CalendarPicker selectRange={[new Date(2019, 4, 3), new Date(2019, 4, 8)]} which={new Date(2019, 4, 1)} />);
        expect(wrapper.getByTitle("2019-05-03").classList.contains("selected")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-08").classList.contains("selected")).toBeTruthy();

        expect(wrapper.getByTitle("2019-05-04").classList.contains("in-range")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-05").classList.contains("in-range")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-06").classList.contains("in-range")).toBeTruthy();
        expect(wrapper.getByTitle("2019-05-07").classList.contains("in-range")).toBeTruthy();
    });
});
