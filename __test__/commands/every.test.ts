import { expect, test } from "vitest";
import { parseGrammar } from "../../src/index";
import type { GrammarEveryRange } from "../../src/types/grammar";
import type { ParseResult } from "../../src/types";

test("command everyday", () => {
  const everyday = parseGrammar<GrammarEveryRange>("Fun: everyday");
  const expectedEveryday: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyday",
        startingFrom: null,
        time: null,
      },
    },
  };
  expect(everyday).toEqual(expectedEveryday);

  const everydayHour = parseGrammar<GrammarEveryRange>("Fun: everyday 01:23");
  const expectedEverydayHour: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyday",
        startingFrom: null,
        time: [
          { hours: 1, minutes: 23 },
          { hours: 2, minutes: 23 },
        ],
      },
    },
  };
  expect(everydayHour).toEqual(expectedEverydayHour);

  const everydayStartingFrom = parseGrammar<GrammarEveryRange>(
    "Fun: everyday @ 2012-03-04",
  );
  const expectedEverydayStartingFrom: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyday",
        startingFrom: new Date("2012-03-04"),
        time: null,
      },
    },
  };
  expect(everydayStartingFrom).toEqual(expectedEverydayStartingFrom);

  const everydayHourStartingFrom = parseGrammar<GrammarEveryRange>(
    "Fun: everyday 02:34-05:42 @ 2012-03-04",
  );
  const expectedEverydayHourStartingFrom: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyday",
        startingFrom: new Date("2012-03-04"),
        time: [
          { hours: 2, minutes: 34 },
          { hours: 5, minutes: 42 },
        ],
      },
    },
  };
  expect(everydayHourStartingFrom).toEqual(expectedEverydayHourStartingFrom);

  const everydayHourStartingFromHour = parseGrammar<GrammarEveryRange>(
    "Fun: everyday 02:34-05:42 @ 2012-03-04 15:31",
  );
  const expectedEverydayHourStartingFromHour: ParseResult<GrammarEveryRange> =
    {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyday",
        startingFrom: new Date("2012-03-04 15:31"),
        time: [
          { hours: 2, minutes: 34 },
          { hours: 5, minutes: 42 },
        ],
      },
    },
  };
  expect(everydayHourStartingFromHour).toEqual(
    expectedEverydayHourStartingFromHour,
  );
});

test("command everyHour", () => {
  const everyHour = parseGrammar<GrammarEveryRange>("Fun: every 20h");
  const expectedEveryHour: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyHour",
        startingFrom: null,
        hours: 20,
      },
    },
  };
  expect(everyHour).toEqual(expectedEveryHour);

  const everyHourStartingFrom = parseGrammar<GrammarEveryRange>(
    "Fun: every 1h @ 2012-03-04",
  );
  const expectedEveryHourStartingFrom: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyHour",
        startingFrom: new Date("2012-03-04"),
        hours: 1,
      },
    },
  };
  expect(everyHourStartingFrom).toEqual(expectedEveryHourStartingFrom);

  const everyHourStartingFromHour = parseGrammar<GrammarEveryRange>(
    "Fun: every 17h @ 2012-03-04 15:31",
  );
  const expectedEveryHourStartingFromHour: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyHour",
        startingFrom: new Date("2012-03-04 15:31"),
        hours: 17,
      },
    },
  };
  expect(everyHourStartingFromHour).toEqual(
    expectedEveryHourStartingFromHour,
  );
});

test("command everyDayOfWeek", () => {
  const everyDayOfWeek = parseGrammar<GrammarEveryRange>(
    "Fun: every monday 02:34-05:42",
  );
  const expectedEveryDayOfWeek: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyDayOfWeek",
        dayOfWeek: "monday",
        startingFrom: null,
        time: [
          { hours: 2, minutes: 34 },
          { hours: 5, minutes: 42 },
        ],
      },
    },
  };
  expect(everyDayOfWeek).toEqual(expectedEveryDayOfWeek);

  const everyDayOfWeekStartingFrom = parseGrammar<GrammarEveryRange>(
    "Fun: every monday 02:34-05:42 @ 2012-03-04",
  );
  const expectedEveryDayOfWeekStartingFrom: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyDayOfWeek",
        dayOfWeek: "monday",
        time: [
          { hours: 2, minutes: 34 },
          { hours: 5, minutes: 42 },
        ],
        startingFrom: new Date("2012-03-04"),
      },
    },
  };
  expect(everyDayOfWeekStartingFrom).toEqual(
    expectedEveryDayOfWeekStartingFrom,
  );
});

test("command everyOneWeekWithDay", () => {
  const everyOneWeekWithDay = parseGrammar<GrammarEveryRange>(
    "Fun: every 1 week tuesday",
  );
  const expectedEveryOneWeekWithDay: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyNWeeksWithDay",
        dayOfWeek: "tuesday",
        weeks: 1,
        time: null,
        startingFrom: null,
      },
    },
  };
  expect(everyOneWeekWithDay).toEqual(expectedEveryOneWeekWithDay);

  const everyNWeeksWithDay = parseGrammar<GrammarEveryRange>(
    "Fun: every 1 week friday 18:37",
  );
  const expectedEveryNWeeksWithDay: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyNWeeksWithDay",
        dayOfWeek: "friday",
        weeks: 1,
        time: [
          { hours: 18, minutes: 37 },
          { hours: 19, minutes: 37 },
        ],
        startingFrom: null,
      },
    },
  };
  expect(everyNWeeksWithDay).toEqual(expectedEveryNWeeksWithDay);

  const everyNWeeksWithDayStartingFrom = parseGrammar<GrammarEveryRange>(
    "Fun: every 1 week wednesday 10:00-19:21 @ 2012-03-04 15:00",
  );
  const expectedEveryNWeeksWithDayStartingFrom: ParseResult<GrammarEveryRange> =
    {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyNWeeksWithDay",
        dayOfWeek: "wednesday",
        weeks: 1,
        time: [
          { hours: 10, minutes: 0 },
          { hours: 19, minutes: 21 },
        ],
        startingFrom: new Date("2012-03-04 15:00"),
      },
    },
  };
  expect(everyNWeeksWithDayStartingFrom).toEqual(
    expectedEveryNWeeksWithDayStartingFrom,
  );
});

test("command everyNWeeksWithDay", () => {
  const everyOneWeekWithDay = parseGrammar<GrammarEveryRange>(
    "Fun: every 2 weeks tuesday",
  );
  const expectedEveryOneWeekWithDay: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyNWeeksWithDay",
        dayOfWeek: "tuesday",
        weeks: 2,
        time: null,
        startingFrom: null,
      },
    },
  };
  expect(everyOneWeekWithDay).toEqual(expectedEveryOneWeekWithDay);

  const everyNWeeksWithDay = parseGrammar<GrammarEveryRange>(
    "Fun: every 3 weeks friday 18:37",
  );
  const expectedEveryNWeeksWithDay: ParseResult<GrammarEveryRange> = {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyNWeeksWithDay",
        dayOfWeek: "friday",
        weeks: 3,
        time: [
          { hours: 18, minutes: 37 },
          { hours: 19, minutes: 37 },
        ],
        startingFrom: null,
      },
    },
  };
  expect(everyNWeeksWithDay).toEqual(expectedEveryNWeeksWithDay);

  const everyNWeeksWithDayStartingFrom = parseGrammar<GrammarEveryRange>(
    "Fun: every 4 weeks wednesday 10:00-19:21 @ 2012-03-04 15:00",
  );
  const expectedEveryNWeeksWithDayStartingFrom: ParseResult<GrammarEveryRange> =
    {
    success: true,
    data: {
      name: "Fun",
      pattern: {
        type: "everyNWeeksWithDay",
        dayOfWeek: "wednesday",
        weeks: 4,
        time: [
          { hours: 10, minutes: 0 },
          { hours: 19, minutes: 21 },
        ],
        startingFrom: new Date("2012-03-04 15:00"),
      },
    },
  };
  expect(everyNWeeksWithDayStartingFrom).toEqual(
    expectedEveryNWeeksWithDayStartingFrom,
  );
});
