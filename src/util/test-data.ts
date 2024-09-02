import moment from 'moment';
import {
  RruleEach,
  RruleGenerateInterface,
  RruleMonth,
  RruleWeekday,
} from '../types/generate.interface';

const DATE = moment('02.09.2024 02:53', 'DD.MM.YYYY HH:mm');
export const SIMPLE_TEST: {
  data: RruleGenerateInterface;
  result: string;
  formatted?: string;
}[] = [
  {
    data: {
      each: RruleEach.Day,
      hours: [9, 18],
      weekdays: ['mo', 'tu', 'we', 'th', 'fr'] as any,
    },
    result: 'RRULE:FREQ=DAYLY;BYHOUR=9,18;BYDAY=MO,TU,WE,TH,FR',
    formatted: 'По пн., вт., ср., чт., пт. в 09:00, 18:00',
  },
  {
    data: {
      each: RruleEach.Day,
      interval: 1,
    },
    result: 'RRULE:FREQ=DAYLY;INTERVAL=1',
    formatted: 'Каждый день',
  },
  {
    data: {
      each: RruleEach.Day,
      start: DATE,
    },
    result: 'RRULE:FREQ=DAYLY;BYHOUR=2;BYMINUTE=53',
    formatted: 'Каждый день в 02:53',
  },
  {
    data: {
      each: RruleEach.Day,
      hour: 12,
      minute: 30,
    },
    result: 'RRULE:FREQ=DAYLY;BYHOUR=12;BYMINUTE=30',
    formatted: 'Каждый день в 12:30',
  },
  {
    data: {
      each: RruleEach.Month,
      start: DATE,
    },
    result: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=2',
    formatted: 'Каждый месяц, 2 числа',
  },
  {
    data: {
      each: RruleEach.Month,
      day: 15,
    },
    result: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15',
    formatted: 'Каждый месяц, 15 числа',
  },
  {
    data: {
      each: RruleEach.Month,
      weekday: [2, RruleWeekday.Monday],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=2MO',
    formatted: 'Каждый месяц, 2 пн.',
  },
  {
    data: {
      each: RruleEach.Month,
      days: [1, 15],
    },
    result: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1,15',
    formatted: 'Каждый месяц, 1 и 15 числа',
  },
  {
    data: {
      each: RruleEach.Month,
      weekdays: [RruleWeekday.Monday, RruleWeekday.Friday],
      positions: [1, -1],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=MO,FR;BYSETPOS=1,-1',
    formatted: 'Каждый месяц, пн. и пт.',
  },
  {
    data: {
      each: RruleEach.Month,
      weekday: RruleWeekday.Tuesday,
      count: 5,
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=TU;COUNT=5',
    formatted: 'Каждый месяц по вт.',
  },
  {
    data: {
      each: RruleEach.Month,
      weekday: [3, RruleWeekday.Tuesday],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=3TU',
    formatted: 'Каждый месяц, 3 вт.',
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
    formatted: 'Каждый месяц, 1 пт. и посл. пт.',
  },
  {
    data: {
      each: RruleEach.Month,
      interval: 2,
      weekday: [-1, RruleWeekday.Monday],
    },
    result: 'RRULE:FREQ=MONTHLY;BYDAY=-1MO;INTERVAL=2',
    formatted: 'Каждые 2 месяца, посл. пн.',
  },
  {
    data: {
      each: RruleEach.Week,
      start: DATE,
    },
    result: 'RRULE:FREQ=WEEKLY',
    formatted: 'Каждую неделю',
  },
  {
    data: {
      each: RruleEach.Week,
      weekday: RruleWeekday.Sunday,
    },
    result: 'RRULE:FREQ=WEEKLY;BYDAY=SU',
    formatted: 'Каждую неделю по вс.',
  },
  {
    data: {
      each: RruleEach.Week,
      weekdays: [RruleWeekday.Friday, RruleWeekday.Saturday],
    },
    result: 'RRULE:FREQ=WEEKLY;BYDAY=FR,SA',
    formatted: 'Каждую неделю по пт. и сб.',
  },

  {
    data: {
      each: RruleEach.Year,
      start: DATE,
    },
    result: 'RRULE:FREQ=YEARLY;BYMONTH=9;BYMONTHDAY=2',
    formatted: 'Каждый год, сентябрь, 2 числа',
  },

  {
    data: {
      each: RruleEach.Year,
      months: [RruleMonth.February, RruleMonth.November],
      weekday: [3, RruleWeekday.Wednesday],
    },
    result: 'RRULE:FREQ=YEARLY;BYDAY=3WE;BYMONTH=2,11',
    formatted: 'Каждый год, февраль и ноябрь, 3 ср.',
  },

  {
    data: {
      each: RruleEach.Year,
      month: RruleMonth.March,
      days: [15, 20],
    },
    result: 'RRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=15,20',
    formatted: 'Каждый год, март, 15 и 20 числа',
  },
  {
    data: {
      each: RruleEach.Year,
      month: 12,
      weekdays: ['mo', 'tu', 'we', 'th', 'fr'] as any,
    },
    result: 'RRULE:FREQ=YEARLY;BYDAY=MO,TU,WE,TH,FR;BYMONTH=12',
    formatted: 'Каждый год, декабрь, пн., вт., ср., чт., пт.',
  },

  {
    data: {
      each: RruleEach.Year,
    },
    result: 'RRULE:FREQ=YEARLY',
    formatted: 'Каждый год',
  },
  {
    data: {
      each: RruleEach.Year,
      month: 5,
      day: 15,
    },
    result: 'RRULE:FREQ=YEARLY;BYMONTH=5',
    formatted: 'Каждый год, май',
  },
];
