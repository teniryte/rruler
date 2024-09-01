import {
  RRULE_PROPERTIES,
  RRULE_PROPERTY_KEYS,
} from '../const/properties.const';
import { RRULE_WEEKDAYS } from '../const/weekdays.const';
import { RruleInterface } from '../types/rrule.interface';
import { RrulePropertiesKeysType } from '../types/properties-names.type';
import { RruleWeekdayEnum } from '../types/weekday.enum';
import { RruleWeekdayInterface } from '../types/weekday.interface';

export const parseRrule = async (rruleString: string) => {
  const str = rruleString?.replace('RRULE:', '');
  if (!str) return null;
  const rrule = parseRruleProperties(str);
  if (!rrule.frequency) return null;
  return rrule;
};

export const parseRruleProperties = (rruleString: string): RruleInterface => {
  const data: any = {};
  const vals = rruleString.split(';');
  vals.forEach((val) => {
    const prop = parseProp(val);
    if (!prop) return;
    data[prop.name] = prop.value;
  });
  return data as RruleInterface;
};

export const parseProp = (val: string) => {
  const parts = val.split('=') as [RrulePropertiesKeysType, string];
  if (parts.length !== 2 || !RRULE_PROPERTY_KEYS.includes(parts[0])) {
    return null;
  }
  const item = getPropertyByKey(parts[0]);
  if (!item) return null;
  return {
    name: item.name,
    value: item.parse(parts[1]),
  };
};

export const getPropertyByKey = (key: RrulePropertiesKeysType) => {
  const names = Object.keys(
    RRULE_PROPERTIES
  ) as unknown as (keyof RruleInterface)[];
  for (const name of names) {
    const item = RRULE_PROPERTIES[name];
    if (item.key === key) {
      return { ...item, name };
    }
  }
  return null;
};

export const parseWeekday = (value: string): RruleWeekdayInterface => {
  const name = value.slice(-2) as RruleWeekdayEnum;
  if (!RRULE_WEEKDAYS.includes(name)) return null;
  const result: RruleWeekdayInterface = {
    name,
  };
  if (value.length > 2) {
    result.index = +value.slice(0, -2);
  }
  return result;
};
