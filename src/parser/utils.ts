import { Node } from "ohm-js";
import { Time, TimeRange, DayOfWeek } from "../types/units";

export function toInt(value: string): number {
  return parseInt(value, 10);
}

export function getOptionalChild<T>(node: Node): T | null {
  return node && node.numChildren ? node.child(0).eval() : null;
}

export function formatTimeNode(node: Node): Time | null {
  const time = getOptionalChild(node);
  if (!time) return null;
  return time as Time;
}

export function formatTimeRangeNode(node: Node): TimeRange | null {
  const hours = getOptionalChild<TimeRange | Time>(node);
  if (!hours) return null;

  if (Array.isArray(hours)) return hours;

  return [
    hours,
    {
      hours: hours.hours + 1,
      minutes: hours.minutes,
    },
  ];
}
export function toWeekday(s: string): DayOfWeek {
  return s.toLowerCase() as DayOfWeek;
}
