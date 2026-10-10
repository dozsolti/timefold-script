import {
  GrammarEveryRange,
  GrammarRotation,
  GrammarWeekdays,
  GrammarDays,
} from "./types/grammar";

export type GrammarPattern =
  | GrammarRotation
  | GrammarEveryRange
  | GrammarWeekdays
  | GrammarDays;

export type ParseResultData<T = GrammarPattern> = {
  name: string;
  pattern: T;
};

export type ParseResult<T> =
  | {
      success: true;
      data: ParseResultData<T>;
    }
  | { success: false; errorMessage: string };
