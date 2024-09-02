import { RruleWeekdayEnum } from '../types/weekday.enum';

export const RRULE_WEEKDAYS = Object.values(RruleWeekdayEnum);

export const RRULE_WEEK_WEEKDAYS = [
  RruleWeekdayEnum.Monday,
  RruleWeekdayEnum.Tuesday,
  RruleWeekdayEnum.Wednesday,
  RruleWeekdayEnum.Thursday,
  RruleWeekdayEnum.Friday,
];

export const RRULE_WEEK_WEEKENDS = [
  RruleWeekdayEnum.Saturday,
  RruleWeekdayEnum.Sunday,
];
