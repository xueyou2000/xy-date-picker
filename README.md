| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-date-picker.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-date-picker.svg?style=flat-square)

[![xy-date-picker](https://nodei.co/npm/xy-date-picker.png)](https://npmjs.org/package/xy-date-picker)

# xy-date-picker

日期选择器

## 安装

```bash
# yarn
yarn add xy-date-picker xy-time-picker classnames utils-hooks utils-dom @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome xy-trigger xy-input
```

## 使用例子

```ts
import React from "react";
import ReactDOM from "react-dom";
import { DatePicker, DateRangePicker, YearMonthPicker } from "xy-date-picker";
ReactDOM.render(<DatePicker />, container);
```

## API

### DatePicker

| 属性                  | 说明                             | 类型                               | 默认值            |
| --------------------- | -------------------------------- | ---------------------------------- | ----------------- |
| value                 | 年月日时分秒字符串               | string                             | -                 |
| defaultValue          | 年月日时分秒字符串               | string                             | -                 |
| onChange              | onChange 事件                    | (value: string) => void            | -                 |
| shortcuts             | 快捷方式                         | DatePickerShortcuts[]              | -                 |
| disabled              | 是否禁用                         | boolean                            | `false`           |
| showTime              | 是否可以选择时间                 | boolean                            | `false`           |
| which                 | 面板所处日期                     | Date                               | 今天              |
| onWhichChange         | 面板所处日期更改                 | (date: Date) => void               | -                 |
| min                   | 最小日期, 小于此时间不可选       | Date                               | -                 |
| max                   | 最大日期, 大于此时间不可选       | Date                               | -                 |
| selectionMode         | 面板模式                         | SelectionMode                      | SelectionMode.Day |
| defaultSelectionMode  | 默认面板模式                     | SelectionMode                      | SelectionMode.Day |
| onSelectionModeChange | 面板模式改变事件                 | (mode: SelectionMode) => void      | -                 |
| onYearPicker          | 年选择事件                       | (date: Date) => void               | -                 |
| onMonthPicker         | 月选择事件                       | (date: Date) => void               | -                 |
| onDayPicker           | 日选择事件                       | (date: Date) => void               | -                 |
| onTimePicker          | 时间选择事件                     | (time: string, date: Date) => void | -                 |
| silentTimePicker      | 选择时间是否不触发 onChange 事件 | boolean                            | `false`           |

### YearMonthPicker

| 属性          | 说明                       | 类型                    | 默认值  |
| ------------- | -------------------------- | ----------------------- | ------- |
| value         | 年月日时分秒字符串         | string                  | -       |
| defaultValue  | 年月日时分秒字符串         | string                  | -       |
| onChange      | onChange 事件              | (value: string) => void | -       |
| disabled      | 是否禁用                   | boolean                 | `false` |
| showTime      | 是否可以选择时间           | boolean                 | `false` |
| which         | 面板所处日期               | Date                    | 今天    |
| onWhichChange | 面板所处日期更改           | (date: Date) => void    | -       |
| min           | 最小日期, 小于此时间不可选 | Date                    | -       |
| max           | 最大日期, 大于此时间不可选 | Date                    | -       |

### DateRangePicker

| 属性          | 说明                       | 类型                               | 默认值  |
| ------------- | -------------------------- | ---------------------------------- | ------- |
| value         | 年月日时分秒字符串         | string                             | -       |
| defaultValue  | 年月日时分秒字符串         | string                             | -       |
| onChange      | onChange 事件              | (value: string) => void            | -       |
| disabled      | 是否禁用                   | boolean                            | `false` |
| showTime      | 是否可以选择时间           | boolean                            | `false` |
| which         | 面板所处日期               | Date                               | 今天    |
| onWhichChange | 面板所处日期更改           | (date: Date) => void               | -       |
| min           | 最小日期, 小于此时间不可选 | Date                               | -       |
| max           | 最大日期, 大于此时间不可选 | Date                               | -       |
| onYearPicker  | 年选择事件                 | (date: Date) => void               | -       |
| onMonthPicker | 月选择事件                 | (date: Date) => void               | -       |
| onDayPicker   | 日选择事件                 | (date: Date) => void               | -       |
| onTimePicker  | 时间选择事件               | (time: string, date: Date) => void | -       |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-date-picker is released under the MIT license.
