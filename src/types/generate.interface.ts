import { Moment } from 'moment';
import { RruleWeekdayEnum } from './weekday.enum';

export enum RruleWeekday {
  Monday = 'mo',
  Tuesday = 'tu',
  Wednesday = 'we',
  Thursday = 'th',
  Friday = 'fr',
  Saturday = 'sa',
  Sunday = 'su',
}

export type RruleWeekdayType = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su';

export type RruleGenerateWeekdayType =
  | RruleWeekday
  | RruleWeekdayType
  | [number | null, RruleWeekday | RruleWeekdayType];

export enum RruleEach {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum RruleMonth {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

export type RruleTimeType = [number | null, number | null];

type UndefinedArrayType = (number | undefined | string)[];

const t: UndefinedArrayType = [undefined, 1, 2];

export interface RruleGenerateInterface {
  each: 'day' | 'week' | 'month' | 'year';
  start?: Moment;
  end?: Moment;
  weekdays?: RruleGenerateWeekdayType[];
  weekday?: RruleGenerateWeekdayType;
  time?:
    | UndefinedArrayType
    | number
    | RruleTimeType
    | RruleTimeType[]
    | string
    | string[];
  hours?: number[];
  hour?: number;
  minutes?: number[];
  minute?: number;
  seconds?: number[];
  second?: number;
  days?: number[];
  day?: number;
  weeks?: number[];
  week?: number;
  months?: number[];
  month?: number;
  interval?: number;
  count?: number;
  weekStart?: RruleWeekday | RruleWeekdayType;
  positions?: number[];
  position?: number;
}
