import { grammar } from "./grammar";
import {
  GrammarEveryday,
  GrammarEveryHour,
  GrammarEveryDayOfWeek,
  GrammarEveryNWeeksWithDay,
  GrammarWeekdays,
  GrammarDays,
  GrammarRotation,
} from "../types/grammar";
import { StartingFrom, Time } from "../types/units";
import {
  getOptionalChild,
  formatTimeRangeNode,
  toWeekday,
  formatTimeNode,
  toInt,
} from "./utils";
import { MatchResult } from "ohm-js";
import { GrammarPattern, ParseResultData } from "../types";

const semantics = grammar.createSemantics();

semantics.addOperation("eval", {
  Statement: function (scheduelName, _, pattern) {
    return { name: scheduelName.eval(), pattern: pattern.eval() };
  },
  ScheduelName: function (name): any {
    return name.sourceString;
  },
  Pattern_rule: function (a, b, c) {
    return a.eval();
  },
  //#region EveryRange
  Rule_every: function (everyRange, startingFromNode) {
    return {
      startingFrom: getOptionalChild<StartingFrom>(startingFromNode),
      ...everyRange.eval(),
    };
  },
  EveryRange_everyday: function (_everydayText, timeNode): GrammarEveryday {
    return {
      type: "everyday",
      time: formatTimeRangeNode(timeNode),
    };
  },
  EveryRange_everyHour: function (
    _everyText,
    hourNode,
    _hText,
  ): GrammarEveryHour {
    return {
      type: "everyHour",
      hours: toInt(hourNode.children.map((c) => c.sourceString).join("")),
    };
  },
  EveryRange_everyDayOfWeek: function (
    _everyText,
    dayOfWeekNode,
    timeNode,
  ): GrammarEveryDayOfWeek {
    return {
      type: "everyDayOfWeek",
      dayOfWeek: toWeekday(dayOfWeekNode.sourceString),
      time: formatTimeRangeNode(timeNode),
    };
  },
  EveryRange_everyOneWeekWithDay: function (
    _everyText,
    _weekNode,
    _weekTextNode,
    dayOfWeekNode,
    timeNode,
  ): GrammarEveryNWeeksWithDay {
    return {
      type: "everyNWeeksWithDay",
      weeks: 1,
      dayOfWeek: toWeekday(dayOfWeekNode.sourceString),
      time: formatTimeRangeNode(timeNode),
    };
  },
  EveryRange_everyNWeeksWithDay: function (
    _everyText,
    weekNode,
    _weekTextNode,
    dayOfWeekNode,
    timeNode,
  ): GrammarEveryNWeeksWithDay {
    return {
      type: "everyNWeeksWithDay",
      weeks: toInt(weekNode.children.map((c) => c.sourceString).join("")),
      dayOfWeek: toWeekday(dayOfWeekNode.sourceString),
      time: formatTimeRangeNode(timeNode),
    };
  },
  //#endregion EveryRange

  Rule_weekday: function (_weekdaysText, timeNode): GrammarWeekdays {
    return {
      type: "weekdays",
      time: formatTimeRangeNode(timeNode),
    };
  },
  Rule_days: function (
    dayNode,
    _commasNode,
    restDayNode,
    timeNode,
  ): GrammarDays {
    return {
      type: "days",
      days: [dayNode, ...restDayNode.children].map((c) =>
        toWeekday(c.sourceString),
      ),
      time: formatTimeRangeNode(timeNode),
    };
  },

  Pattern_rotation: function (a): GrammarRotation {
    const [
      onNode,
      _onTextNode,
      offNode,
      _offTextNode,
      timeNode,
      startingFromNode,
    ] = a.children;

    return {
      type: "rotation",
      on: toInt(onNode.children.map((c) => c.eval()).join("")),
      off: toInt(offNode.children.map((c) => c.eval()).join("")),
      time: formatTimeRangeNode(timeNode)!,
      startingFrom: getOptionalChild<StartingFrom>(startingFromNode)!,
    };
  },

  //#region Utils
  digit: function (a) {
    return toInt(a.sourceString);
  },
  Day: function (y1, y2, y3, y4, _1, m1, m2, _2, d1, d2) {
    return new Date(
      `${y1.sourceString}${y2.sourceString}${y3.sourceString}${y4.sourceString}-${m1.sourceString}${m2.sourceString}-${d1.sourceString}${d2.sourceString}`,
    );
  },
  Hour: function (h1, h2, _, m1, m2): Time {
    return {
      hours: toInt(`${h1.sourceString}${h2.sourceString}`),
      minutes: toInt(`${m1.sourceString}${m2.sourceString}`),
    };
  },
  TimeRange: function (start, _dash, end) {
    return [start.eval(), end.eval()];
  },

  StartingFrom: function (_at, day, hours) {
    const date: Date = day.eval();
    const timeParts = formatTimeNode(hours);
    if (timeParts) {
      date.setHours(timeParts.hours, timeParts.minutes);
    }
    return date;
  },
  //#endregion Utils
});

export function parseSemantics<T = GrammarPattern>(
  matchResult: MatchResult,
): ParseResultData<T> {
  return semantics(matchResult).eval();
}
