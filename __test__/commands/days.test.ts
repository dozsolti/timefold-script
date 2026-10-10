import { expect, test } from "vitest";
import { parseGrammar } from "../../src/index";
import type { GrammarDays } from "../../src/types/grammar";
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
