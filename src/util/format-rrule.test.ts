import { RruleWeekdayEnum } from '../types/weekday.enum';
import { createRrule } from './create-rrule';
import {
  formatRrule,
  formatRruleTime,
  formatRruleWeekday,
  formatRruleWeekdays,
} from './format-rrule';
import { SIMPLE_TEST } from './test-data';

describe('format rrule', () => {
  it('formats simple rrule', () => {
    SIMPLE_TEST.forEach((test) => {
      const rrule = createRrule(test.data);
      const str = formatRrule(rrule);
      expect(str).toBe(test.formatted);
    });
    expect(1).toBe(1);
  });

  it('formats time', () => {
    expect(formatRruleTime([11, 12])).toBe('11:00, 12:00');
    expect(formatRruleTime([9, 16], [null, 15])).toBe('09:00, 16:15');
    expect(formatRruleTime([])).toBe('');
    expect(formatRruleTime(null)).toBe('');
  });

  it('formats weekday', () => {
    expect(
      formatRruleWeekdays([
        {
          name: RruleWeekdayEnum.Friday,
          index: 1,
        },
        {
          name: RruleWeekdayEnum.Friday,
          index: 2,
        },
        {
          name: RruleWeekdayEnum.Friday,
          index: -1,
        },
        {
          name: RruleWeekdayEnum.Friday,
          index: -2,
        },
      ])
    ).toBe('1 пт., 2 пт., посл. пт., предпосл. пт.');
  });
});
