import { GrammarPattern, ParseResult, ParseResultData } from "../types";
import { grammar } from "./grammar";
import { parseSemantics } from "./parser";

export function parseGrammar<T = GrammarPattern>(
  input: string,
): ParseResult<T> {
  const matchResult = grammar.match(input);
  if (matchResult.failed()) {
    return {
      success: false,
      errorMessage: "Failed to parse input. " + matchResult.message,
    };
  }
  return {
    success: true,
    data: parseSemantics(matchResult),
  };
}
