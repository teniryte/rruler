import { rrulestr } from 'rrule';
import { createRrule } from './create-rrule';
import { parseRrule } from './parse-rrule';
import moment from 'moment';
import { RruleFrequencyEnum } from '../types/frequency.enum';
import { RRULE_WEEKDAYS } from '../const/weekdays.const';

export const rruleDateRange = (
  rruleString: string,
  start: Date,
  finish: Date
): any => {
  if (!rruleString || !start) return null;
  try {
    const rrule = parseRrule(rruleString);
    const s = moment(start);
    const f = moment(finish);
    let d = null;
    if (finish) {
      d = f.toDate().getTime() - s.toDate().getTime();
    }
    const now = moment();
    let ss;
    if (rrule.frequency === RruleFrequencyEnum.Yearly) {
      const currentYear = now.year();
      const next = moment({
        year: currentYear,
        month: rrule.byMonth[0] - 1,
        date: rrule.byMonthDay[0],
        hour: s.hour(),
        minute: s.minute(),
        second: 0,
      });

      if (now.isAfter(next)) {
        next.add(1, 'years');
      }
      ss = next;
    } else if (rrule.frequency === RruleFrequencyEnum.Monthly) {
      const currentMonth = now.month();
      const currentYear = now.year();
      const date = rrule.byMonthDay[0];

      let next = moment({
        month: currentMonth,
        year: currentYear,
        hour: s.hour(),
        minute: s.minute(),
      }).date(date);

      if (now.date() > date) {
        next = now.clone().add(1, 'month').date(date);
      }
      ss = next;
    } else if (rrule.frequency === RruleFrequencyEnum.Weekly) {
      const weekday = RRULE_WEEKDAYS.indexOf(rrule.byDay[0].name) + 1;
      const next = now.clone().day(weekday).hour(s.hour()).minute(s.minute());
      if (
        (now.day() >= weekday && now.hours() > s.hours()) ||
        (now.hours() === s.hours() && now.minutes() >= s.minutes())
      ) {
        next.add(7, 'days');
      }
      ss = next;
    } else if (rrule.frequency === RruleFrequencyEnum.Dayly) {
      const targetTime = moment()
        .hours(rrule.byHour[0])
        .minutes(rrule.byMinute[0])
        .seconds(0);

      if (now.isAfter(targetTime)) {
        targetTime.add(1, 'days');
      }
      ss = targetTime;
    }
    return [ss.toDate(), d ? ss.add(d, 'millisecond') : null];
  } catch (err) {
    return null;
  }
  // try {
  //   const r = rrulestr(rruleString);
  //   r.options.dtstart = start;
  //   return [r.after(new Date()), r.after(new Date())];
  //   return [begin, end];
  // } catch (err) {
  //   return null;
  // }
};
