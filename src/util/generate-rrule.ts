import moment from 'moment';
import { RruleFrequencyEnum } from '../types/frequency.enum';
import { RruleGenerateInterface } from '../types/generate.interface';
import { RruleInterface } from '../types/rrule.interface';
import { RruleWeekdayInterface } from '../types/weekday.interface';
import { RruleWeekdayEnum } from '../types/weekday.enum';
import { RRULE_WEEKDAYS } from '../const/weekdays.const';
import { compileRrule } from './compile-rrule';

export const generateRrule = (data: RruleGenerateInterface): string => {
  if (!data) return null;
  const rrule: RruleInterface = {
    frequency: {
      day: RruleFrequencyEnum.Dayly,
      week: RruleFrequencyEnum.Weekly,
      month: RruleFrequencyEnum.Monthly,
      year: RruleFrequencyEnum.Yearly,
    }[data.each],
  };
  const start = data.start ? moment(data.start) : null;
  const end = data.end ? moment(data.end) : null;
  const hours = data.hour ? [data.hour] : data.hours || null;
  const minutes = data.minute ? [data.minute] : data.minutes || null;
  const seconds = data.second ? [data.second] : data.seconds || null;
  const days = data.day ? [data.day] : data.days || null;
  const weeks = data.week ? [data.week] : data.weeks || null;
  const months = data.month ? [data.month] : data.months || null;
  const wds = data.weekday ? [data.weekday] : data.weekdays || null;
  const positions = data.position ? [data.position] : data.positions || null;
  const weekdays =
    wds?.map(
      (wd): RruleWeekdayInterface =>
        typeof wd === 'string'
          ? { name: wd.toUpperCase() as RruleWeekdayEnum }
          : { name: wd[1].toUpperCase() as RruleWeekdayEnum, index: wd[0] }
    ) ||
    (start
      ? (RRULE_WEEKDAYS[
          start.weekday() - 1
        ] as unknown as RruleWeekdayInterface[])
      : null);
  if (data.each === 'day') {
    if (hours || start) {
      rrule.byHour = hours || [start.hours()];
    }
    if (minutes || start) {
      rrule.byMinute = minutes || [start.minutes()];
    }
  }
  if (data.each === 'month') {
    if (days || start) {
      rrule.byMonthDay = days || [start.date()];
    }
    if (weeks) {
      rrule.byWeekNo = weeks;
    }
  }
  if (wds) {
    rrule.byDay = weekdays;
  }
  if (data.each === 'year') {
    if (months || start) {
      rrule.byMonth = months || [start.month() + 1];
    }
    if (data.days || start) {
      rrule.byMonthDay = days || [start.date()];
    }
  }
  if (data.count) {
    rrule.count = data.count;
  }
  if (data.interval) {
    rrule.interval = data.interval;
  }
  if (end) {
    rrule.until = moment(end);
  }
  if (positions) {
    rrule.bySetPos = positions;
  }
  if (data.weekStart) {
    rrule.weekStart = data.weekStart.toUpperCase() as RruleWeekdayEnum;
  }
  return compileRrule(rrule);
};
