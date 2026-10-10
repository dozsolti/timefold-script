import { expect, test } from "vitest";
import { parseGrammar } from "../../src/index";
import type { GrammarWeekdays } from "../../src/types/grammar";
import type { ParseResult } from "../../src/types";

test("command weekdays", () => {
  const weekdays = parseGrammar<GrammarWeekdays>("Work:  weekdays");
  const expectedWeekdays: ParseResult<GrammarWeekdays> = {
    success: true,
    data: {
      name: "Work",
      pattern: {
        type: "weekdays",
        time: null,
      },
    },
  };
  expect(weekdays).toEqual(expectedWeekdays);

  const weekdaysWithTime = parseGrammar<GrammarWeekdays>(
    "Work:  weekdays 09:00-17:00",
  );
  const expectedWeekdaysWithTime: ParseResult<GrammarWeekdays> = {
    success: true,
    data: {
      name: "Work",
      pattern: {
        type: "weekdays",
        time: [
          { hours: 9, minutes: 0 },
          { hours: 17, minutes: 0 },
        ],
      },
    },
  };
  expect(weekdaysWithTime).toEqual(expectedWeekdaysWithTime);
});
