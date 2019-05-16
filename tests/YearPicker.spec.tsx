import React from "react";
import { render, fireEvent } from "react-testing-library";
import { YearPicker } from "../src";
import { formatDate } from "../src/date";

describe("YearPicker", () => {
    test("render", () => {
        const wrapper = render(<YearPicker which={new Date(2019, 5, 1)} />);
        const years = wrapper.container.querySelectorAll(".xy-year-picker-cell > .xy-year-picker-cell-inner");
        expect([].map.call(years, (year: HTMLElement) => year.innerHTML)).toEqual(["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"]);

        expect(wrapper.getByText("2009").parentElement.classList.contains("not-now-century")).toBeTruthy();
        expect(wrapper.getByText("2020").parentElement.classList.contains("not-now-century")).toBeTruthy();
    });

    test("selected by value", () => {
        const wrapper = render(<YearPicker which={new Date(2019, 5, 1)} value={new Date(2019, 5, 1)} />);
        expect(wrapper.getByText("2019").parentElement.classList.contains("selected")).toBeTruthy();
    });

    test("onPicker", () => {
        const fn = jest.fn();
        const wrapper = render(<YearPicker which={new Date(2019, 5, 1)} value={new Date(2019, 5, 1)} onPicker={fn} />);
        fireEvent.click(wrapper.getByText("2009"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy")).toBe("2009");

        fireEvent.click(wrapper.getByText("2015"));
        expect(fn.mock.calls.length).toBe(2);
        expect(formatDate(fn.mock.calls[1][0], "yyyy")).toBe("2015");
    });

    test("min", () => {
        const min = new Date(2012, 5, 1);
        const fn = jest.fn();
        const wrapper = render(<YearPicker min={min} which={new Date(2019, 5, 1)} onPicker={fn} />);

        fireEvent.click(wrapper.getByText("2009"));
        expect(fn.mock.calls.length).toBe(0);
        expect(wrapper.getByText("2009").parentElement.classList.contains("disabled")).toBeTruthy();
        expect(wrapper.getByText("2011").parentElement.classList.contains("disabled")).toBeTruthy();

        fireEvent.click(wrapper.getByText("2012"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy")).toBe("2012");
    });

    test("max", () => {
        const max = new Date(2017, 5, 1);
        const fn = jest.fn();
        const wrapper = render(<YearPicker max={max} which={new Date(2019, 5, 1)} onPicker={fn} />);

        fireEvent.click(wrapper.getByText("2018"));
        expect(fn.mock.calls.length).toBe(0);
        expect(wrapper.getByText("2018").parentElement.classList.contains("disabled")).toBeTruthy();
        expect(wrapper.getByText("2020").parentElement.classList.contains("disabled")).toBeTruthy();

        fireEvent.click(wrapper.getByText("2011"));
        expect(fn.mock.calls.length).toBe(1);
        expect(formatDate(fn.mock.calls[0][0], "yyyy")).toBe("2011");
    });
});
