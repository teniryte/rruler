import moment from 'moment';
import {
  RruleEach,
  RruleGenerateInterface,
  RruleMonth,
  RruleWeekday,
} from '../types/generate.interface';

export const DATE = moment('02.09.2024 02:53:00', 'DD.MM.YYYY HH:mm:ss');

export const SIMPLE_TEST: {
  data: RruleGenerateInterface;
  result: string;
  formatted?: string;
}[] = [
  {
    data: {
      each: RruleEach.Day,
      hours: [9, 18],
      weekdays: ['mo', 'tu', 'we', 'th', 'fr'],
    },
    result: 'RRULE:FREQ=DAILY;BYHOUR=9,18;BYDAY=MO,TU,WE,TH,FR',
    formatted: 'По будням в 09:00 и 18:00',
  },
  {
    data: {
      each: RruleEach.Day,
      interval: 1,
    },
    result: 'RRULE:FREQ=DAILY;INTERVAL=1',
    formatted: 'Ежедневно',
  },
  {
    data: {
      each: RruleEach.Day,
      start: DATE,
    },
    result: 'RRULE:FREQ=DAILY;BYHOUR=2;BYMINUTE=53',
    formatted: 'Ежедневно в 02:53',
  },
  {
    data: {
      each: RruleEach.Day,
      hour: 12,
      minute: 30,
    },
    result: 'RRULE:FREQ=DAILY;BYHOUR=12;BYMINUTE=30',
    formatted: 'Ежедневно в 12:30',
  },
  {
    data: {
      each: RruleEach.Month,
      start: DATE,
    },
    result: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=2',
    formatted: 'Ежемесячно, 2 числа',
  },
  {
    data: {
      each: RruleEach.Month,
      day: 15,
    },
    result: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15',
    formatted: 'Ежемесячно, 15 числа',
  },
  {
    data: {
      each: RruleEach.Month,
      weekday: [2, RruleWeekday.Monday],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=2MO',
    formatted: 'Ежемесячно, 2 пн',
  },
  {
    data: {
      each: RruleEach.Month,
      days: [1, 15],
    },
    result: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1,15',
    formatted: 'Ежемесячно, 1 и 15 числа',
  },
  {
    data: {
      each: RruleEach.Month,
      weekdays: [RruleWeekday.Monday, RruleWeekday.Friday],
      positions: [1, -1],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=MO,FR;BYSETPOS=1,-1',
    formatted: 'Ежемесячно, по пн и пт',
  },
  {
    data: {
      each: RruleEach.Month,
      weekday: RruleWeekday.Tuesday,
      count: 5,
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=TU;COUNT=5',
    formatted: 'Ежемесячно, по вт',
  },
  {
    data: {
      each: RruleEach.Month,
      weekday: [3, RruleWeekday.Tuesday],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=3TU',
    formatted: 'Ежемесячно, 3 вт',
  },
  {
    data: {
      each: RruleEach.Month,
      weekdays: [
        [1, RruleWeekday.Friday],
        [-1, RruleWeekday.Friday],
      ],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=1FR,-1FR',
    formatted: 'Ежемесячно, 1 и посл. пт',
  },
  {
    data: {
      each: RruleEach.Month,
      interval: 2,
      weekday: [-1, RruleWeekday.Monday],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=-1MO;INTERVAL=2',
    formatted: 'Каждые 2 месяца, посл. пн',
  },
  {
    data: {
      each: RruleEach.Week,
      start: DATE,
    },
    result: 'RRULE:FREQ=WEEKLY',
    formatted: 'Еженедельно',
  },
  {
    data: {
      each: RruleEach.Week,
      weekday: RruleWeekday.Sunday,
    },
    result: 'RRULE:FREQ=WEEKLY;BYDAY=SU',
    formatted: 'Еженедельно по вс',
  },
  {
    data: {
      each: RruleEach.Week,
      weekdays: [RruleWeekday.Friday, RruleWeekday.Saturday],
    },
    result: 'RRULE:FREQ=WEEKLY;BYDAY=FR,SA',
    formatted: 'Еженедельно по пт и сб',
  },

  {
    data: {
      each: RruleEach.Year,
      start: DATE,
    },
    result: 'RRULE:FREQ=YEARLY;BYMONTH=9;BYMONTHDAY=2',
    formatted: 'Ежегодно, сентябрь, 2 числа',
  },

  {
    data: {
      each: RruleEach.Year,
      months: [RruleMonth.February, RruleMonth.November],
      weekday: [3, RruleWeekday.Wednesday],
    },
    result: 'RRULE:FREQ=YEARLY;BYDAY=3WE;BYMONTH=2,11',
    formatted: 'Ежегодно, февраль и ноябрь, 3 ср',
  },

  {
    data: {
      each: RruleEach.Year,
      month: RruleMonth.March,
      days: [15, 20],
    },
    result: 'RRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=15,20',
    formatted: 'Ежегодно, март, 15 и 20 числа',
  },
  {
    data: {
      each: RruleEach.Year,
      month: 12,
      weekdays: ['mo', 'tu', 'we', 'th', 'fr'],
    },
    result: 'RRULE:FREQ=YEARLY;BYDAY=MO,TU,WE,TH,FR;BYMONTH=12',
    formatted: 'Ежегодно, декабрь, по будням',
  },

  {
    data: {
      each: RruleEach.Year,
    },
    result: 'RRULE:FREQ=YEARLY',
    formatted: 'Ежегодно',
  },
  {
    data: {
      each: RruleEach.Year,
      month: 5,
      day: 15,
    },
    result: 'RRULE:FREQ=YEARLY;BYMONTH=5',
    formatted: 'Ежегодно, май',
  },
];
