import { parseGrammar } from "./parser";
import * as dateFns from "date-fns";

import { constructFrom } from "date-fns";
import { GrammarPattern } from "./types";
import { GrammarEveryHour } from "./types/grammar";

type Event = {} & { title: string } & (
    | {
        start: Date;
        end: Date;
      }
    | {
        days: {
          start: Date;
          end: Date;
        }[];
      }
    | {
        days: Date[];
      }
  );

export function generateEvents(input: string, year: number): Event[] {
  const parseResult = parseGrammar(input);
  if (!parseResult.success) {
    return [];
  }
  const data = parseResult.data;
  const events: Event[] = [];
  const adapter = adapters[data.pattern.type];
  if (adapter) {
    events.push(adapter(data, year));
  }
  return events;
}
export function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

export function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}

function eachDayOfInterval(interval, filterPredicate) {
  const { start, end } = normalizeInterval(undefined, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);

  let step = 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    if (filterPredicate && !filterPredicate(date)) {
      date.setDate(date.getDate() + step);
      date.setHours(0, 0, 0, 0);
      continue;
    }

    dates.push(constructFrom(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
}

const dayToNumber: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const adapters: Record<
  GrammarPattern["type"],
  (data: any, year: number) => Event
> = {
  everyday: generateEverydayEvents,
  weekdays: generateWeekdaysEvents,
  everyHour: function (
    data: GrammarEveryHour & { name: string },
    year: number,
  ): Event {
    throw new Error("Function not implemented.");
  },
  everyDayOfWeek: function (data: any, year: number): Event {
    throw new Error("Function not implemented.");
  },
  everyNWeeksWithDay: function (data: any, year: number): Event {
    throw new Error("Function not implemented.");
  },
  rotation: function (data: any, year: number): Event {
    throw new Error("Function not implemented.");
  },
  days: function (data: any, year: number): Event {
    const daysAsNumber = data.pattern.days.map((day) => dayToNumber[day]);

    const daysOfInterval: Date[] = eachDayOfInterval(
      {
        start: dateFns.startOfYear(new Date(year, 0, 1)),
        end: dateFns.endOfYear(new Date(year, 11, 31)),
      },
      (d: Date) => {
        return daysAsNumber.includes(d.getDay());
      },
    );

    if (data.pattern.time == null) {
      return {
        title: data.name,
        days: daysOfInterval,
      };
    }

    let days: { start: Date; end: Date }[] = [];
    for (const day of daysOfInterval) {
      const start = dateFns.set(day, data.pattern.time[0]);
      const end = dateFns.set(day, data.pattern.time[1]);
      days.push({ start, end });
    }

    return {
      title: data.name,
      days: days,
    };
  },
};

function generateEverydayEvents(data: any, year: number): Event {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  return {
    title: data.name,
    start: dateFns.startOfYear(start),
    end: dateFns.endOfYear(end),
  };
}

function generateWeekdaysEvents(data: any, year: number): Event {
  const days: Date[] = eachDayOfInterval(
    {
      start: dateFns.startOfYear(new Date(year, 0, 1)),
      end: dateFns.endOfYear(new Date(year, 11, 31)),
    },
    (d: Date) => d.getDay() !== 0 && d.getDay() !== 6,
  );

  return {
    title: data.name,
    days: days,
  };
}
