import moment from 'moment';
import { RrulePropertiesKeysType } from '../types/properties-names.type';
import { parseWeekday } from '../util/parse-rrule';
import { RruleInterface } from '../types/rrule.interface';
import { RruleFrequencyEnum } from '../types/frequency.enum';
import { RruleWeekdayEnum } from '../types/weekday.enum';
import { map } from 'lodash';

export const RRULE_PROPERTIES: {
  [K in keyof RruleInterface]: {
    key: RrulePropertiesKeysType;
    parse: (val: string) => RruleInterface[K];
  };
} = {
  frequency: {
    key: 'FREQ',
    parse(val: string) {
      return val as RruleFrequencyEnum;
    },
  },
  until: {
    key: 'UNTIL',
    parse(val: string) {
      const date = moment(val, 'YYYYMMDDTHHmmssZ');
      return date;
    },
  },
  count: {
    key: 'COUNT',
    parse(val: string) {
      return +val;
    },
  },
  interval: {
    key: 'INTERVAL',
    parse(val: string) {
      return +val;
    },
  },
  byDay: {
    key: 'BYDAY',
    parse(val: string) {
      return val.split(',').map((val) => parseWeekday(val));
    },
  },
  byMonthDay: {
    key: 'BYMONTHDAY',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  byYearDay: {
    key: 'BYYEARDAY',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  byWeekNo: {
    key: 'BYWEEKNO',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  byMonth: {
    key: 'BYMONTH',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  bySetPos: {
    key: 'BYSETPOS',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  byHour: {
    key: 'BYHOUR',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  byMinute: {
    key: 'BYMINUTE',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  bySecond: {
    key: 'BYSECOND',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
  },
  weekStart: {
    key: 'WKST',
    parse(val: string) {
      return val as RruleWeekdayEnum;
    },
  },
};

export const RRULE_PROPERTY_KEYS = map(
  RRULE_PROPERTIES,
  (value, name: keyof RruleInterface) => RRULE_PROPERTIES[name].key
);
