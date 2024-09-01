import moment from 'moment';
import { compileRrule } from './compile-rrule';

describe('compile rrule', () => {
  it('parses daily rrule with hours, minutes and count', () => {
    const str = compileRrule({
      frequency: 'DAILY',
      byHour: [8],
      byMinute: [30],
      count: 10,
    } as any);
    expect(str).toBe('RRULE:FREQ=DAILY;BYHOUR=8;BYMINUTE=30;COUNT=10');
  });

  it('compiles weekly rrule with multi days and until', () => {
    const str = compileRrule({
      frequency: 'WEEKLY',
      byDay: [{ name: 'TU' }, { name: 'TH' }],
      until: moment('31.12.2024 23:59:59', 'DD.MM.YYYY HH:mm:ss'),
    } as any);
    expect(str).toBe('RRULE:FREQ=WEEKLY;BYDAY=TU,TH;UNTIL=20241231T205959Z');
  });

  it('parses monthly rrule with last day', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      byDay: [{ name: 'FR', index: -1 }],
    } as any);
    expect(str).toBe('RRULE:FREQ=MONTHLY;BYDAY=-1FR');
  });

  it('parses yearly rrule with two months and to month days', () => {
    const str = compileRrule({
      frequency: 'YEARLY',
      byMonth: [7, 12],
      byMonthDay: [4, 25],
    } as any);
    expect(str).toBe('RRULE:FREQ=YEARLY;BYMONTH=7,12;BYMONTHDAY=4,25');
  });

  it('parses weekly rrule with interval, day and count', () => {
    const str = compileRrule({
      frequency: 'WEEKLY',
      interval: 2,
      byDay: [{ name: 'SA' }],
      count: 20,
    } as any);
    expect(str).toBe('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=SA;COUNT=20');
  });

  it('parses monthly rrule with indexed day, hour, minute and count', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      byDay: [{ name: 'TU', index: 2 }],
      byHour: [9],
      byMinute: [0],
      count: 6,
    } as any);
    expect(str).toBe(
      'RRULE:FREQ=MONTHLY;BYDAY=2TU;BYHOUR=9;BYMINUTE=0;COUNT=6'
    );
  });

  it('parses monthly rrule with month day and interval', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      byMonthDay: [15],
      interval: 2,
    } as any);
    expect(str).toBe('RRULE:FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=2');
  });

  it('parses yearly rrule with year days', () => {
    const str = compileRrule({
      frequency: 'YEARLY',
      byYearDay: [100, 150],
    } as any);
    expect(str).toBe('RRULE:FREQ=YEARLY;BYYEARDAY=100,150');
  });

  it('parses yearly rrule with week numbers', () => {
    const str = compileRrule({ frequency: 'YEARLY', byWeekNo: [3, 10] } as any);
    expect(str).toBe('RRULE:FREQ=YEARLY;BYWEEKNO=3,10');
  });

  it('parses monthly rrule with week numbers and days', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      byWeekNo: [2],
      byDay: [{ name: 'MO' }, { name: 'TU' }],
    } as any);
    expect(str).toBe('RRULE:FREQ=MONTHLY;BYWEEKNO=2;BYDAY=MO,TU');
  });

  it('ignores unknown properties', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      ghgfjg: 355,
      byWeekNo: [2],
      byDay: [{ name: 'MO' }, { name: 'TU' }],
    } as any);
    expect(str).toBe('RRULE:FREQ=MONTHLY;BYWEEKNO=2;BYDAY=MO,TU');
  });

  it('ignores empty values', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      byWeekNo: null,
      byDay: [{ name: 'MO' }, { name: 'TU' }],
    } as any);
    expect(str).toBe('RRULE:FREQ=MONTHLY;BYDAY=MO,TU');
  });

  it('ignores random values', () => {
    const str = compileRrule({
      frequency: 'MONTHLY',
      byWeekNo: [2],
      byDay: 55,
    } as any);
    expect(str).toBe('RRULE:FREQ=MONTHLY;BYWEEKNO=2');
  });
});
