import { expect, test } from "vitest";
import { parseGrammar } from "../../src/index";
import type { GrammarRotation } from "../../src/types/grammar";
import type { ParseResult } from "../../src/types";

test("command rotation", () => {
  const commandRotation = parseGrammar<GrammarRotation>(
    "Guys work: 2on/2off 06:00 @ 2026-09-02",
  );
  const expectedCommandRotation: ParseResult<GrammarRotation> = {
    success: true,
    data: {
      name: "Guys work",
      pattern: {
        type: "rotation",
        on: 2,
        off: 2,
        time: [
          { hours: 6, minutes: 0 },
          { hours: 7, minutes: 0 },
        ],
        startingFrom: new Date("2026-09-02"),
      },
    },
  };
  expect(commandRotation).toEqual(expectedCommandRotation);
});
