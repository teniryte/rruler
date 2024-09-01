import { Moment } from 'moment';
import { RruleFrequencyEnum } from './frequency.enum';
import { RruleWeekdayEnum } from './weekday.enum';
import { RruleWeekdayInterface } from './weekday.interface';

export interface RruleInterface {
  frequency: RruleFrequencyEnum;
  until?: Moment;
  count?: number;
  interval?: number;
  byDay?: RruleWeekdayInterface[];
  byMonthDay?: number[];
  byYearDay?: number[];
  byWeekNo?: number[];
  byMonth?: number[];
  bySetPos?: number[];
  byHour?: number[];
  byMinute?: number[];
  bySecond?: number[];
  weekStart?: RruleWeekdayEnum;
}

export type RruleKeysType = keyof RruleInterface;
