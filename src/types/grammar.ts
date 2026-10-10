import { DayOfWeek, TimeRange, StartingFrom } from "./units";

// #region Every
export type GrammarEveryday = {
  type: "everyday";
  time: TimeRange | null;
};

export type GrammarEveryHour = {
  type: "everyHour";
  hours: number;
};

export type GrammarEveryDayOfWeek = {
  type: "everyDayOfWeek";
  dayOfWeek: DayOfWeek;
  time: TimeRange | null;
};
export type GrammarEveryNWeeksWithDay = {
  type: "everyNWeeksWithDay";
  dayOfWeek: DayOfWeek;
  weeks: number;
  time: TimeRange | null;
};

export type GrammarEveryRange = (
  | GrammarEveryday
  | GrammarEveryHour
  | GrammarEveryDayOfWeek
  | GrammarEveryNWeeksWithDay
) & {
  startingFrom: StartingFrom | null;
} & {};
// #endregion Every

export type GrammarMonthlyPositions = {
  type: "monthlyPositions";
  days: number[];
  time: TimeRange | null;
};
export type GrammarMonthlyWeekdayPosition = {
  type: "monthlyWeekdayPositions";
  weekday: DayOfWeek[];
  position: number[];
  time: TimeRange | null;
};

export type GrammarDayRange = {
  type: "dayRange";
  start: Date;
  end: Date;
  time: TimeRange | null;
};

export type GrammarDay = {
  type: "day";
  day: Date;
  time: TimeRange | null;
};

export type GrammarRotation = {
  type: "rotation";
  on: number;
  off: number;
  time: TimeRange;
  startingFrom: StartingFrom | null;
};

export type GrammarWeekdays = {
  type: "weekdays";
  time: TimeRange | null;
};

export type GrammarDays = {
  type: "days";
  days: DayOfWeek[];
  time: TimeRange | null;
};
