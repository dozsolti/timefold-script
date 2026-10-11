import { expect, test } from "vitest";
import { parseGrammar } from "../../src/index";
import type {
  GrammarMonthlyPositions,
  GrammarMonthlyWeekdayPositions,
} from "../../src/types/grammar";
import type { ParseResult } from "../../src/types";

test("command monthly", () => {
  const monthly1st = parseGrammar<GrammarMonthlyPositions>("Rent: 1st monthly");
  const expectedMonthly1st: ParseResult<GrammarMonthlyPositions> = {
    success: true,
    data: {
      name: "Rent",
      pattern: {
        type: "monthlyPositions",
        days: [1],
        time: null,
      },
    },
  };
  expect(monthly1st).toEqual(expectedMonthly1st);

  const monthlyMultiple = parseGrammar<GrammarMonthlyPositions>(
    "Rent: 1st, 13th monthly",
  );
  const expectedMonthlyMultiple: ParseResult<GrammarMonthlyPositions> = {
    success: true,
    data: {
      name: "Rent",
      pattern: {
        type: "monthlyPositions",
        days: [1, 13],
        time: null,
      },
    },
  };
  expect(monthlyMultiple).toEqual(expectedMonthlyMultiple);

  const monthlyWeekdayPosition = parseGrammar<GrammarMonthlyWeekdayPositions>(
    "Therapy: 2nd Tuesday monthly 17:30",
  );
  const expectedMonthlyWeekdayPosition: ParseResult<GrammarMonthlyWeekdayPositions> =
    {
      success: true,
      data: {
        name: "Therapy",
        pattern: {
          type: "monthlyWeekdayPositions",
          weekday: ["tuesday"],
          position: [2],
          time: [
            { hours: 17, minutes: 30 },
            { hours: 18, minutes: 30 },
          ],
        },
      },
    };
  expect(monthlyWeekdayPosition).toEqual(expectedMonthlyWeekdayPosition);

  const monthlyWeekdaysPositions = parseGrammar<GrammarMonthlyWeekdayPositions>(
    "Something: 2nd, 3rd monday,wednesday monthly",
  );
  const expectedMonthlyWeekdaysPositions: ParseResult<GrammarMonthlyWeekdayPositions> =
    {
      success: true,
      data: {
        name: "Something",
        pattern: {
          type: "monthlyWeekdayPositions",
          weekday: ["monday", "wednesday"],
          position: [2, 3],
          time: null,
        },
      },
    };
  expect(monthlyWeekdaysPositions).toEqual(expectedMonthlyWeekdaysPositions);
});
