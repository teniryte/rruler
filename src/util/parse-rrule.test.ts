import { parseRrule } from './parse-rrule';

describe('parse rrule', () => {
  it('parses daily rrule with hours, minutes and count', () => {
    let rrule = parseRrule('RRULE:FREQ=DAILY;BYHOUR=8;BYMINUTE=30;COUNT=10');
    expect(rrule).toEqual({
      frequency: 'DAILY',
      byHour: [8],
      byMinute: [30],
      count: 10,
    });
  });

  it('parses weekly rrule with multi days and until', () => {
    let rrule = parseRrule(
      'RRULE:FREQ=WEEKLY;BYDAY=TU,TH;UNTIL=20241231T235959Z'
    );
    expect(Object.keys(rrule!).length).toEqual(3);
    expect(rrule?.frequency).toBe('WEEKLY');
    expect(rrule?.byDay).toEqual([{ name: 'TU' }, { name: 'TH' }]);
    expect(rrule?.until?.format('DD.MM.YYYY HH:mm:ss')).toEqual(
      '01.01.2025 02:59:59'
    );
  });

  it('parses monthly rrule with last day', () => {
    let rrule = parseRrule('RRULE:FREQ=MONTHLY;BYDAY=-1FR');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byDay: [{ name: 'FR', index: -1 }],
    });
  });

  it('parses yearly rrule with two months and to month days', () => {
    let rrule = parseRrule('RRULE:FREQ=YEARLY;BYMONTH=7,12;BYMONTHDAY=4,25');
    expect(rrule).toEqual({
      frequency: 'YEARLY',
      byMonth: [7, 12],
      byMonthDay: [4, 25],
    });
  });

  it('parses weekly rrule with interval, day and count', () => {
    let rrule = parseRrule('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=SA;COUNT=20');
    expect(rrule).toEqual({
      frequency: 'WEEKLY',
      interval: 2,
      byDay: [{ name: 'SA' }],
      count: 20,
    });
  });

  it('parses monthly rrule with indexed day, hour, minute and count', () => {
    let rrule = parseRrule(
      'RRULE:FREQ=MONTHLY;BYDAY=2TU;BYHOUR=9;BYMINUTE=0;COUNT=6'
    );
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byDay: [{ name: 'TU', index: 2 }],
      byHour: [9],
      byMinute: [0],
      count: 6,
    });
  });

  it('parses monthly rrule with month day and interval', () => {
    let rrule = parseRrule('RRULE:FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=2');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byMonthDay: [15],
      interval: 2,
    });
  });

  it('parses yearly rrule with year days', () => {
    let rrule = parseRrule('RRULE:FREQ=YEARLY;BYYEARDAY=100,150');
    expect(rrule).toEqual({ frequency: 'YEARLY', byYearDay: [100, 150] });
  });

  it('parses yearly rrule with week numbers', () => {
    let rrule = parseRrule('RRULE:FREQ=YEARLY;BYWEEKNO=3,10');
    expect(rrule).toEqual({ frequency: 'YEARLY', byWeekNo: [3, 10] });
  });

  it('parses monthly rrule with week numbers and days', () => {
    let rrule = parseRrule('RRULE:FREQ=MONTHLY;BYWEEKNO=2;BYDAY=MO,TU');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byWeekNo: [2],
      byDay: [{ name: 'MO' }, { name: 'TU' }],
    });
  });

  it('parses without rrule prefix', () => {
    let rrule = parseRrule('FREQ=MONTHLY;BYWEEKNO=2;BYDAY=MO,TU');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byWeekNo: [2],
      byDay: [{ name: 'MO' }, { name: 'TU' }],
    });
  });

  it('ignores unknown properties', () => {
    let rrule = parseRrule('FREQ=MONTHLY;BYWEEKNO=2;BYDAY=MO,TU;UNKNOWN=5');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byWeekNo: [2],
      byDay: [{ name: 'MO' }, { name: 'TU' }],
    });
  });

  it('ignores properties without value', () => {
    let rrule = parseRrule('FREQ=MONTHLY;BYWEEKNO=2;BYDAY;UNKNOWN=5');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byWeekNo: [2],
    });
  });

  it('ignores empty values', () => {
    expect(parseRrule(undefined as any)).toEqual(null);
    expect(parseRrule(null as any)).toEqual(null);
    expect(parseRrule('')).toEqual(null);
    expect(parseRrule('RRULE:')).toEqual(null);
  });

  it('ignores final semicolon', () => {
    let rrule = parseRrule('FREQ=MONTHLY;BYWEEKNO=2;BYDAY;UNKNOWN=5;');
    expect(rrule).toEqual({
      frequency: 'MONTHLY',
      byWeekNo: [2],
    });
  });

  it('ignores random string', () => {
    expect(parseRrule('dh f s hg sd s;')).toEqual(null);
    expect(parseRrule('dh f s hg sd s;  gsd sg')).toEqual(null);
    expect(parseRrule('sgdgd')).toEqual(null);
  });
});
