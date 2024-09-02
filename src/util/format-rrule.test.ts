import { RruleWeekdayEnum } from '../types/weekday.enum';
import { createRrule } from './create-rrule';
import {
  formatRrule,
  formatRruleTime,
  formatRruleWeekdays,
} from './format-rrule';
import { DATE, SIMPLE_TEST } from './test-data';
import { RruleEach } from '../types/generate.interface';

describe('format rrule', () => {
  it('formats simple rrule', () => {
    SIMPLE_TEST.forEach((test) => {
      const rrule = createRrule(test.data);
      const str = formatRrule(rrule!);
      expect(str).toBe(test.formatted);
    });
    expect(1).toBe(1);
  });

  it('formats with data', () => {
    expect(
      formatRrule({
        each: 'year',
        interval: 6,
        months: [7, 4],
        days: [15, 1],
      })
    ).toBe('Каждые 6 лет, апрель и июль, 1 и 15 числа');

    expect(
      formatRrule({
        each: 'year',
        months: [7, 4],
        days: [15, 1],
      })
    ).toBe('Ежегодно, апрель и июль, 1 и 15 числа');

    expect(
      formatRrule({
        each: RruleEach.Day,
        interval: 3,
        start: DATE,
      })
    ).toBe('Каждые 3 дня в 02:53');

    expect(
      formatRrule({
        each: 'day',
        weekdays: ['we', 'fr'],
        start: DATE,
      })
    ).toBe('По ср и пт в 02:53');

    expect(
      formatRrule({
        each: 'month',
        interval: 2,
        weekdays: ['su'],
        start: DATE,
      })
    ).toBe('Каждые 2 месяца, по вс');

    expect(
      formatRrule({
        each: 'month',
        weekday: [-1, 'fr'],
        start: DATE,
      })
    ).toBe('Ежемесячно, посл. пт');

    expect(
      formatRrule({
        each: 'month',
        weekdays: [
          [-2, 'fr'],
          [-1, 'fr'],
        ],
        interval: 2,
      })
    ).toBe('Каждые 2 месяца, предпосл. и посл. пт');
    expect(
      formatRrule({
        each: 'day',
        weekdays: ['we', 'fr'],
        time: 15,
      })
    ).toBe('По ср и пт в 15:00');
    expect(
      formatRrule({
        each: 'month',
        interval: 2,
        weekdays: ['su', 'sa'],
        start: DATE,
        week: 1,
        time: [, '9:15', 18],
      })
    ).toBe('Каждые 2 месяца (первая неделя), по выходным в 09:15 и 18:00');
    expect(
      formatRrule({
        each: 'year',
        interval: 2,
        months: [1],
        start: DATE,
      })
    ).toBe('Каждые 2 года, январь, 2 числа');
  });

  it('formats time', () => {
    expect(formatRruleTime([11, 12])).toBe('11:00 и 12:00');
    expect(formatRruleTime([9, 16], [null, 15])).toBe('09:00 и 16:15');
    expect(formatRruleTime([])).toBe('');
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
    ).toBe('1, 2, посл. и предпосл. пт');
  });
});
