import { RruleFrequencyEnum } from '../types/frequency.enum';
import { RruleGenerateInterface } from '../types/generate.interface';
import { RruleInterface } from '../types/rrule.interface';
import { RruleWeekdayEnum } from '../types/weekday.enum';
import { RruleWeekdayInterface } from '../types/weekday.interface';
import { createRrule } from './create-rrule';
import { parseRrule } from './parse-rrule';
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

const parseRruleIfNeeded = (
  rrule: RruleGenerateInterface | RruleInterface | string
): RruleInterface => {
  if (typeof rrule === 'string') {
    return parseRrule(rrule);
  }
  if ('each' in rrule) {
    return createRrule(rrule as RruleGenerateInterface);
  }
  return rrule as RruleInterface;
};

const formatFrequency = (
  rrule: RruleInterface,
  isShort: boolean,
  addDot: boolean
): string => {
  let text = '';
  let weekdays = (
    rrule.byDay
      ? (!rrule.byDay.find((day) => day.index) ? ' по ' : ', ') +
        formatRruleWeekdays(rrule.byDay, addDot)
      : ''
  ).trim();
  const week = formatWeeks(rrule.byWeekNo);
  let label;

  switch (rrule.frequency) {
    case RruleFrequencyEnum.Dayly:
      text =
        rrule.interval && rrule.interval > 1
          ? `Каждые ${rrule.interval} ${plural(rrule.interval, [
              'день',
              'дня',
              'дней',
            ])}`
          : 'Ежедневно';
      if (rrule.byDay) {
        text = `${weekdays[0].toUpperCase()}${weekdays.slice(1)}`;
      }
      break;
    case RruleFrequencyEnum.Monthly:
      label =
        rrule.interval && rrule.interval > 1
          ? `Каждые ${rrule.interval} ${plural(rrule.interval, [
              'месяц',
              'месяца',
              'месяцев',
            ])}`
          : 'Ежемесячно';
      text = rrule.byDay
        ? `${label}${week ? ` (${week})` : ''}${weekdays && ', '}${weekdays}`
        : rrule.byMonthDay
        ? `${label}, ${formatRruleMonthDays(rrule.byMonthDay)} числа`
        : label;
      break;
    case RruleFrequencyEnum.Weekly:
      label =
        rrule.interval && rrule.interval > 1
          ? `Каждые ${rrule.interval} ${plural(rrule.interval, [
              'неделя',
              'недели',
              'недель',
            ])}`
          : 'Еженедельно';
      text = rrule.byDay ? `${label}${weekdays && ' '}${weekdays}` : label;
      break;
    case RruleFrequencyEnum.Yearly:
      label =
        rrule.interval && rrule.interval > 1
          ? `Каждые ${rrule.interval} ${plural(rrule.interval, [
              'год',
              'года',
              'лет',
            ])}`
          : 'Ежегодно';
      const month = rrule.byMonth
        ? `, ${formatRruleMonths(rrule.byMonth, isShort)}`
        : '';
      const day = rrule.byMonthDay
        ? `, ${formatRruleMonthDays(rrule.byMonthDay)} числа`
        : '';
      text = `${label}${month}${weekdays && ', '}${weekdays}${day}`;
      break;
    default:
      text = ''; // Default case if needed
  }

  return text;
};

export const formatRrule = (
  rrule: RruleGenerateInterface | RruleInterface | string,
  { isShort, addDot }: { addDot: boolean; isShort: boolean } = {
    addDot: false,
    isShort: false,
  }
): string | null => {
  if (!rrule) return null;

  rrule = parseRruleIfNeeded(rrule);
  const time = formatRruleTime(rrule.byHour, rrule.byMinute);
  const frequencyText = formatFrequency(rrule, isShort, addDot);

  return `${frequencyText}${time ? ` в ${time}` : ''}`
    .replace(/\s+/g, ' ')
    .replace(/\s,/g, ',')
    .replace(/,,/g, ',');
};

export const formatWeeks = (weeks: RruleInterface['byWeekNo']) => {
  if (!weeks || !weeks.length) return '';
  return rruleJoinItems(
    weeks.map((week) => {
      if (week === 1) {
        return 'первая неделя';
      }
      if (week === -1) {
        return 'последняя неделя';
      }
      if (week === -1) {
        return 'предпоследняя неделя';
      }
      return `${week} неделя`;
    })
  );
};

export const formatRruleMonths = (
  months: number[],
  isShort = false
): string => {
  if (!months || !months.length) return '';
  return rruleJoinItems(
    months
      .sort((a, b) => a - b)
      .map((month) => formatRruleMonth(month, isShort))
  );
};

export const formatRruleMonth = (month: number, isShort = false): string => {
  let title = MONTH_TITLES[month].toLowerCase();
  if (!title) return '';
  return isShort ? title.slice(0, 3) : title;
};

export const formatRruleMonthDays = (days: number[]): string => {
  if (!days || !days.length) return '';
  days = days.sort();
  if (days.length === 1) {
    return `${days[0]}`;
  }
  if (days.length === 2) {
    return rruleJoinItems(days);
  }
  return days.join(', ');
};

export const formatRruleWeekday = (
  weekday: RruleWeekdayInterface,
  addDot = false
): string => {
  if (!weekday) return '';
  const title =
    WEEKDAY_TITLES[weekday.name].toLowerCase() + (addDot ? '.' : '');
  let index: number | string = weekday.index;
  if (index === -1) {
    index = 'посл.';
  } else if (index === -2) {
    index = 'предпосл.';
  }
  if (!index) return title;
  return `${index} ${title}`;
};

function allElementsSame<T>(arr: T[]) {
  return new Set(arr).size === 1;
}

const sortWeekdays = (weekdays: RruleWeekdayInterface[]) => {
  const keys = Object.keys(WEEKDAY_TITLES);
  return weekdays.sort((a, b) => keys.indexOf(a.name) - keys.indexOf(b.name));
};

export const formatRruleWeekdays = (
  weekdays: RruleWeekdayInterface[],
  addDot = false
): string => {
  if (!weekdays || !weekdays.length) return '';
  weekdays = sortWeekdays(weekdays);
  if (
    weekdays.length === 5 &&
    weekdays.map((day) => day.name).join('-') === 'MO-TU-WE-TH-FR'
  ) {
    return 'будням';
  }
  if (
    weekdays.length === 2 &&
    weekdays.map((day) => day.name).join('-') === 'SA-SU'
  ) {
    return 'выходным';
  }
  if (allElementsSame(weekdays.map((day) => day.name))) {
    const title = formatRruleWeekday(weekdays[0], addDot).split(' ').pop();
    const indices = weekdays
      .map((day) => {
        const t = formatRruleWeekday(day, addDot).split(' ');
        t.pop();
        return t[0];
      })
      .filter((val) => !!val);
    return `${rruleJoinItems(indices)} ${title}`;
  }
  return rruleJoinItems(weekdays.map((val) => formatRruleWeekday(val, addDot)));
};

export const formatRruleTime = (
  hours: (number | null)[],
  minutes?: (number | null)[]
): string => {
  if (!hours) return '';
  minutes = minutes || [];
  const result = rruleJoinItems(
    hours.map(
      (hour, i) =>
        `${hour}`.padStart(2, '0') + ':' + `${minutes[i] || 0}`.padStart(2, '0')
    )
  );
  return result;
};

export const rruleJoinItems = (vals: any[]): string => {
  if (!vals || vals.length === 0) return '';
  let result = '';
  vals.forEach((val, i) => {
    result +=
      i === vals.length - 1
        ? val
        : `${val}${i === vals.length - 2 ? ' и ' : ', '}`;
  });
  return result;
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
