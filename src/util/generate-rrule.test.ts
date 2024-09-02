import moment, { weekdays } from 'moment';
import { generateRrule } from './generate-rrule';
import {
  RruleEach,
  RruleGenerateInterface,
  RruleMonth,
  RruleWeekday,
} from '../types/generate.interface';
import { SIMPLE_TEST } from './test-data';

describe('generate rrule', () => {
  it('generates simple rrules', () => {
    SIMPLE_TEST.forEach((test: any) => {
      const result = generateRrule(test.data);
      expect(result).toBe(test.result);
    });
  });
});
