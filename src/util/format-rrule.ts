import { RruleFrequencyEnum } from '../types/frequency.enum';
import { RruleInterface } from '../types/rrule.interface';
import { RruleWeekdayEnum } from '../types/weekday.enum';
import { RruleWeekdayInterface } from '../types/weekday.interface';
import { plural } from './plural';

const WEEKDAY_TITLES = {
  [RruleWeekdayEnum.Monday]: 'ПН',
  [RruleWeekdayEnum.Tuesday]: 'ВТ',
  [RruleWeekdayEnum.Wednesday]: 'СР',
  [RruleWeekdayEnum.Thursday]: 'ЧТ',
  [RruleWeekdayEnum.Friday]: 'ПТ',
  [RruleWeekdayEnum.Saturday]: 'СБ',
  [RruleWeekdayEnum.Sunday]: 'ВС',
};

const MONTH_TITLES = [
  ,
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const formatRrule = (rrule: RruleInterface, isShort = false) => {
  if (!rrule) return null;
  if (rrule.frequency === RruleFrequencyEnum.Dayly) {
    let label =
      !rrule.interval || rrule.interval === 1
        ? 'Каждый день'
        : `Каждые ${rrule.interval} ${plural(rrule.interval, [
            'день',
            'дня',
            'дней',
          ])}`;
    if (rrule.byDay) {
      label = 'По ' + formatRruleWeekdays(rrule.byDay);
    }
    const time = formatRruleTime(rrule.byHour, rrule.byMinute);
    return `${label}${time ? ` в ${time}` : ''}`;
  }
  if (rrule.frequency === RruleFrequencyEnum.Monthly) {
    let label = 'Каждый месяц';
    if (rrule.interval) {
      label = `Каждые ${rrule.interval} ${plural(rrule.interval, [
        'месяц',
        'месяца',
        'месяцев',
      ])}`;
    }
    if (rrule.byDay) {
      const days = formatRruleWeekdays(rrule.byDay);
      return `${label}${
        rrule.byDay.length === 1 && !rrule.byDay[0].index ? ' по ' : ', '
      }${days}`;
    }
    if (rrule.byMonthDay) {
      const days = formatRruleMonthDays(rrule.byMonthDay);
      return `${label}, ${days}`;
    }
    return label;
  }
  if (rrule.frequency === RruleFrequencyEnum.Weekly) {
    let label = 'Каждую неделю';
    if (rrule.byDay) {
      return `${label} по ${formatRruleWeekdays(rrule.byDay)}`;
    }
    return label;
  }
  if (rrule.frequency === RruleFrequencyEnum.Yearly) {
    let label = 'Каждый год';
    let month = rrule.byMonth
      ? `, ${formatRruleMonths(rrule.byMonth, isShort)}`
      : '';
    let weekdays = rrule.byDay
      ? `${
          rrule.byDay.length === 1 && !rrule.byDay[0].index ? ' по ' : ', '
        }${formatRruleWeekdays(rrule.byDay)}`
      : '';
    let day = rrule.byMonthDay
      ? `, ${formatRruleMonthDays(rrule.byMonthDay)}`
      : '';
    return `${label}${month}${weekdays}${day}`;
  }
};

export const formatRruleMonths = (
  months: number[],
  isShort = false
): string => {
  if (!months || !months.length) return '';
  return months
    .map((month) => formatRruleMonth(month, isShort))
    .join(months.length === 2 ? ' и ' : ', ');
};

export const formatRruleMonth = (month: number, isShort = false): string => {
  let title = MONTH_TITLES[month].toLowerCase();
  if (!title) return '';
  return isShort ? title.slice(0, 3) : title;
};

export const formatRruleMonthDays = (days: number[]): string => {
  if (!days || !days.length) return '';
  if (days.length === 1) {
    return `${days[0]} числа`;
  }
  if (days.length === 2) {
    return days.join(' и ') + ' числа';
  }
  return days.join(', ');
};

export const formatRruleWeekday = (weekday: RruleWeekdayInterface): string => {
  if (!weekday) return '';
  const title = WEEKDAY_TITLES[weekday.name].toLowerCase() + '.';
  let index: number | string = weekday.index;
  if (index === -1) {
    index = 'посл.';
  } else if (index === -2) {
    index = 'предпосл.';
  }
  if (!index) return title;
  return `${index} ${title}`;
};

export const formatRruleWeekdays = (
  weekdays: RruleWeekdayInterface[]
): string => {
  if (!weekdays || !weekdays.length) return '';
  return weekdays
    .map(formatRruleWeekday)
    .join(weekdays.length === 2 ? ' и ' : ', ');
};

export const formatRruleTime = (
  hours: number[],
  minutes?: number[]
): string => {
  if (!hours) return '';
  minutes = minutes || [];
  return hours
    .map(
      (hour, i) =>
        `${hour}`.padStart(2, '0') + ':' + `${minutes[i] || 0}`.padStart(2, '0')
    )
    .join(', ');
};

/*
export const formatRrule = (str: string, start: string | Date) => {
  const date = moment(start);
  const WEEKDAYS = [, 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];


  if (!str) return null;

  if (str.includes('FREQ=MONTHLY')) {

  }
  if (str.includes('FREQ=WEEKLY')) {
    let label = 'Каждую неделю';
    if (str.includes('INTERVAL=')) {
      const interval = +str.split('INTERVAL=')[1].split(';')[0];
      label = `Каждые ${interval} ${plural(interval, [
        'неделя',
        'недели',
        'недель',
      ])}`;
    }
    const byday = str.split('BYDAY=')[1]?.split(';')[0] || null;
    if (!byday) {
      return `${label} по ${WEEKDAY_TITLES[date.weekday()]}`;
    }
    if (byday.split(',').length === 5) return `${label} по будням`;
    if (!byday) return label;
    const weekdays = byday
      .split(',')
      .map((d) => WEEKDAYS.indexOf(d))
      .sort()
      .map((index) => WEEKDAY_TITLES[index]);
    return `${label} по ${weekdays.join(',')}`;
  }
  if (str.includes('FREQ=YEARLY')) {
    let label = 'Каждый год';
    if (str.includes('INTERVAL=')) {
      const interval = +str.split('INTERVAL=')[1].split(';')[0];
      label = `Каждые ${interval} ${plural(interval, ['год', 'года', 'лет'])}`;
    }
    return label;
  }
  return null;
};

*/
