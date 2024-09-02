import moment from 'moment';
import { RrulePropertiesKeysType } from '../types/properties-names.type';
import { parseWeekday } from '../util/parse-rrule';
import { RruleInterface } from '../types/rrule.interface';
import { RruleFrequencyEnum } from '../types/frequency.enum';
import { RruleWeekdayEnum } from '../types/weekday.enum';

export const RRULE_PROPERTIES: {
  [K in keyof RruleInterface]: {
    key: RrulePropertiesKeysType;
    parse: (val: string) => RruleInterface[K];
    compile: (val: RruleInterface[K]) => string;
  };
} = {
  frequency: {
    key: 'FREQ',
    parse(val: string) {
      return val as RruleFrequencyEnum;
    },
    compile(val) {
      return val as string;
    },
  },
  until: {
    key: 'UNTIL',
    parse(val: string) {
      const date = moment(val, 'YYYYMMDDTHHmmssZ');
      return date;
    },
    compile(val) {
      return val.utc().format('YYYYMMDDTHHmmss') + 'Z';
    },
  },
  count: {
    key: 'COUNT',
    parse(val: string) {
      return +val;
    },
    compile(val) {
      return val + '';
    },
  },
  interval: {
    key: 'INTERVAL',
    parse(val: string) {
      return +val;
    },
    compile(val) {
      return val + '';
    },
  },
  byDay: {
    key: 'BYDAY',
    parse(val: string) {
      return val.split(',').map((val) => parseWeekday(val));
    },
    compile(val) {
      return val.map((item) => `${item.index || ''}${item.name}`).join(',');
    },
  },
  byMonthDay: {
    key: 'BYMONTHDAY',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  byYearDay: {
    key: 'BYYEARDAY',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  byWeekNo: {
    key: 'BYWEEKNO',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  byMonth: {
    key: 'BYMONTH',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  bySetPos: {
    key: 'BYSETPOS',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  byHour: {
    key: 'BYHOUR',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  byMinute: {
    key: 'BYMINUTE',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  bySecond: {
    key: 'BYSECOND',
    parse(val: string) {
      return val.split(',').map((val) => +val);
    },
    compile(val) {
      return val.join(',');
    },
  },
  weekStart: {
    key: 'WKST',
    parse(val: string) {
      return val as RruleWeekdayEnum;
    },
    compile(val) {
      return val;
    },
  },
};

export const RRULE_PROPERTY_KEYS = Object.keys(RRULE_PROPERTIES).map(
  (name: keyof RruleInterface) => RRULE_PROPERTIES[name].key
);
