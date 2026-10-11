import type { GrammarPattern } from "./types/grammar";

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

export type { GrammarPattern };
