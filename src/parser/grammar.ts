import { grammar as ohmParseGrammar } from "ohm-js";

export const grammar = ohmParseGrammar(String.raw`
Timefold {

  Statement
    = ScheduelName ":" Pattern

  ScheduelName = (alnum | space)+
  
  Pattern
  	= Rule Modifiers? Exceptions* -- rule
    | Rotations -- rotation
  
  Rule
    = EveryRange StartingFrom? --every
    | "weekdays" Time? -- weekday // Work: weekdays 09:00-17:00
    | DayOfWeek ("," DayOfWeek)* Time? -- days // Gym: Monday,Wednesday,Friday 18:00
    | MonthlyPosition ("," MonthlyPosition)* "monthly" Time? -- monthlyPositions // Rent: 1st, 13th monthly
    | MonthlyPosition DayOfWeek "monthly" Time? -- monthlyWeekdayPositions // Therapy: 2nd Tuesday monthly 17:30
    | MonthlyPosition ("," MonthlyPosition)* DayOfWeek ("," DayOfWeek)* "monthly" Time? -- monthlyWeekdaysPositions // Something: 2nd, 3rd monday,wednesday monthly
    | Day ".." Day Time? -- dayRange // Vacation: 2027-07-12..2027-07-23
    | Day Hour ".." Day Hour -- dayRangeWithHours // Vacation: 2017-02-03 18:01 - 2017-02-17 06:00
    | Day Time? -- day // Car service: 2027-03-15 09:00-12:00
   
 EveryRange
   = "everyday" Time? -- everyday // Work: everyday
    | "every" (digit+ "h")  -- everyHour // Medication: every 8h
    | "every" DayOfWeek Time? -- everyDayOfWeek // Groceries: every Sunday 10:00-11:00
    | "every" digit "week" DayOfWeek Time? -- everyOneWeekWithDay
    | "every" digit+ "weeks" DayOfWeek Time? -- everyNWeeksWithDay // Date night: every 2 weeks Friday 19:00
   
   
 Exceptions
 = "except" Day ("," Day)* -- exceptDays
  
 Rotations
 	= digit+ "on/" digit+ "off" Time StartingFrom? // Night shift: 4on/4off 22:00-06:00 @ 2027-01-04
    
 Modifiers
  = "~ previous business day" // Salary: 25th monthly ~ previous business day
  | "~ next business day" // Salary: 25th monthly ~ next business day
    
   
   // Utils
 Hour = digit digit ":" digit digit
  
 Time = TimeRange | Hour
 
 TimeRange = Hour "-" Hour
 
 DayOfWeek
    = caseInsensitive<"monday">
    | caseInsensitive<"tuesday">
    | caseInsensitive<"wednesday">
    | caseInsensitive<"thursday">
    | caseInsensitive<"friday">
    | caseInsensitive<"saturday">
    | caseInsensitive<"sunday">
    
    
 MonthlyPosition = "1st" | "2nd" | "3rd" | (digit+ "th") -- nthDay
    
 Day = digit digit digit digit "-" digit digit "-" digit digit
      
 StartingFrom  =  "@" Day Hour?
}
`);
