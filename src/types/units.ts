export type Time = {
  hours: number;
  minutes: number;
};

export type TimeRange = [Time, Time];
export type StartingFrom = Date;
export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
