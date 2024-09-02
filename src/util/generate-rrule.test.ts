import { rrulePrepareTimes } from './create-rrule';
import { generateRrule } from './generate-rrule';
import { SIMPLE_TEST } from './test-data';

describe('generate rrule', () => {
  it('generates simple rrules', () => {
    SIMPLE_TEST.forEach((test: any) => {
      const result = generateRrule(test.data);
      expect(result).toBe(test.result);
    });
  });
});
