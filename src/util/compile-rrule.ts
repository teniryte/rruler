import { map } from 'lodash';
import { RruleInterface } from '../types/rrule.interface';
import { RRULE_PROPERTIES } from '../const/properties.const';

export const compileRrule = (rrule: RruleInterface) => {
  return (
    'RRULE:' +
    map(
      rrule,
      (
        value: RruleInterface[keyof RruleInterface],
        name: keyof RruleInterface
      ) => {
        try {
          if (!value) return null;
          const prop = RRULE_PROPERTIES[name];
          if (!prop) return null;
          return `${prop.key}=${prop.compile(value as never)}`;
        } catch (err) {
          return null;
        }
      }
    )
      .filter((prop) => prop)
      .join(';')
  );
};
