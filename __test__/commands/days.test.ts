import { expect, test } from "vitest";
import { parseGrammar } from "../../src/index";
import type {
  GrammarDays,
  GrammarDayRange,
  GrammarDay,
  GrammarDayRangeWithHours,
} from "../../src/types/grammar";
import type { ParseResult } from "../../src/types";

test("command days", () => {
  const days = parseGrammar<GrammarDays>("Gym: monday");
  const expectedDays: ParseResult<GrammarDays> = {
    success: true,
    data: {
      name: "Gym",
      pattern: {
        type: "days",
        days: ["monday"],
        time: null,
      },
    },
  };
  expect(days).toEqual(expectedDays);

  const daysWithTime = parseGrammar<GrammarDays>(
    "Gym: monday, wednesday, friday 18:00",
  );
  const expectedDaysWithTime: ParseResult<GrammarDays> = {
    success: true,
    data: {
      name: "Gym",
      pattern: {
        type: "days",
        days: ["monday", "wednesday", "friday"],
        time: [
          { hours: 18, minutes: 0 },
          { hours: 19, minutes: 0 },
        ],
      },
    },
  };
  expect(daysWithTime).toEqual(expectedDaysWithTime);
});
test("command day", () => {
  const day = parseGrammar<GrammarDay>("FREE: 2027-03-15");
  const expectedDay: ParseResult<GrammarDay> = {
    success: true,
    data: {
      name: "FREE",
      pattern: {
        type: "day",
        day: new Date("2027-03-15"),
        time: null,
      },
    },
  };
  expect(day).toEqual(expectedDay);

  const dayWithTime = parseGrammar<GrammarDay>(
    "Car service: 2027-03-15 09:00-12:00",
  );
  const expectedDayWithTime: ParseResult<GrammarDay> = {
    success: true,
    data: {
      name: "Car service",
      pattern: {
        type: "day",
        day: new Date("2027-03-15"),
        time: [
          { hours: 9, minutes: 0 },
          { hours: 12, minutes: 0 },
        ],
      },
    },
  };
  expect(dayWithTime).toEqual(expectedDayWithTime);
});
test("command dayRange", () => {
  const dayRange = parseGrammar<GrammarDayRange>(
    "Vacation: 2027-07-12..2027-07-23",
  );
  const expectedDayRange: ParseResult<GrammarDayRange> = {
    success: true,
    data: {
      name: "Vacation",
      pattern: {
        type: "dayRange",
        start: new Date("2027-07-12"),
        end: new Date("2027-07-23"),
        time: null,
      },
    },
  };
  expect(dayRange).toEqual(expectedDayRange);

  const dayRangeWithTime = parseGrammar<GrammarDayRange>(
    "Vacation: 2027-07-12..2027-07-23 08:00-23:00",
  );
  const expectedDayRangeWithTime: ParseResult<GrammarDayRange> = {
    success: true,
    data: {
      name: "Vacation",
      pattern: {
        type: "dayRange",
        start: new Date("2027-07-12"),
        end: new Date("2027-07-23"),
        time: [
          { hours: 8, minutes: 0 },
          { hours: 23, minutes: 0 },
        ],
      },
    },
  };
  expect(dayRangeWithTime).toEqual(expectedDayRangeWithTime);
});

test("command dayRangeWithHours", () => {
  const dayRange = parseGrammar<GrammarDayRangeWithHours>(
    "Vacation: 2027-07-12 08:00 .. 2027-07-23 23:00",
  );
  const expectedDayRange: ParseResult<GrammarDayRangeWithHours> = {
    success: true,
    data: {
      name: "Vacation",
      pattern: {
        type: "dayRangeWithHours",
        start: new Date("2027-07-12 08:00"),
        end: new Date("2027-07-23 23:00"),
      },
    },
  };
  expect(dayRange).toEqual(expectedDayRange);
});
