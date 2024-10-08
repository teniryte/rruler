import moment from 'moment';
import { RruleFrequencyEnum } from '../types/frequency.enum';
import {
  RruleGenerateInterface,
  RruleTimeType,
} from '../types/generate.interface';
import { RruleInterface } from '../types/rrule.interface';
import { RruleWeekdayInterface } from '../types/weekday.interface';
import { RruleWeekdayEnum } from '../types/weekday.enum';
import { RRULE_WEEKDAYS } from '../const/weekdays.const';
import { isArray } from 'lodash';

export const createRrule = (data: RruleGenerateInterface) => {
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
  const days = data.day ? [data.day] : data.days || null;
  const weeks = data.week ? [data.week] : data.weeks || null;
  const months = data.month ? [data.month] : data.months || null;
  const wds = data.weekday ? [data.weekday] : data.weekdays || null;
  const positions = data.position ? [data.position] : data.positions || null;
  let times = rrulePrepareTimes(data.time);
  const weekdays =
    wds?.map(
      (wd): RruleWeekdayInterface =>
        typeof wd === 'string'
          ? { name: wd.toUpperCase() as RruleWeekdayEnum }
          : { name: wd[1].toUpperCase() as RruleWeekdayEnum, index: wd[0] }
    );
  if (times) {
    rrule.byHour = [];
    rrule.byMinute = [];
    times.forEach((time) => {
      rrule.byHour.push(time[0]);
      rrule.byMinute.push(time[1]);
    });
  }
  if (hours) {
    rrule.byHour = hours;
  }
  if (minutes) {
    rrule.byMinute = minutes;
  }
  if (weekdays) {
    rrule.byDay = weekdays;
  }
  if (days) {
    rrule.byMonthDay = days;
  }
  if (weeks) {
    rrule.byWeekNo = weeks;
  }
  if (months) {
    rrule.byMonth = months;
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
  if (data.weeks) {
    rrule.byWeekNo = weeks;
  }
  if (data.each === 'day') {
    if (!rrule.byHour && start) {
      rrule.byHour = [start.hours()];
      rrule.byMinute = [start.minutes()];
    }
  }
  if (data.each === 'week') {
    if (!rrule.byDay && start) {
      rrule.byDay = [{ name: RRULE_WEEKDAYS[start.weekday()] }];
    }
  }
  if (data.each === 'month') {
    if (!rrule.byMonthDay && start) {
      rrule.byMonthDay = [start.date()]
    }
  }
  if (data.each === 'year') {
    if (!rrule.byMonth && start) {
      rrule.byMonth = [start.month() + 1];
    }
    if (!rrule.byMonthDay && start) {
      rrule.byMonthDay = [start.date()];
    }
  }

  return rrule;
};

const numberOrZero = (val: any) => {
  if (typeof val === 'number' && !isNaN(val)) return val;
  return 0;
};

const prepareTime = (val: RruleTimeType | number | string): RruleTimeType => {
  if (typeof val === 'string') {
    if (!isNaN(+val)) {
      val = +val;
    } else {
      const t = val.split(':').map((val) => +val);
      return [t[0], numberOrZero(t[1])];
    }
  }
  if (typeof val === 'number') {
    return [val, 0];
  }
  return [val[0] || 0, numberOrZero(val[1])];
};

export const rrulePrepareTimes = (
  time: RruleGenerateInterface['time']
): RruleTimeType[] => {
  if (!time) return null;

  if (typeof time === 'number') {
    return [prepareTime(time)];
  }

  if (typeof time === 'string') {
    return [prepareTime(time)];
  }

  if (typeof time[0] === undefined || time.length > 2) {
    return time.filter((val) => !!val).map(prepareTime);
  }

  const items = time.filter((val) => !!val);

  if (typeof items[0] === 'number') {
    return [[items[0], numberOrZero(+items[1])]];
  }

  return items.map((item) => {
    if (typeof item === 'string') {
      const t = item.split(':').map((val) => +val);
      return [t[0], numberOrZero(t[1])];
    }
    if (Array.isArray(item)) {
      return item;
    }
  });
};
