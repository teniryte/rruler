import { rrulestr } from 'rrule';

export const rruleDateRange = (rruleString: string, start: Date) => {
  if (!rruleString || !start) return null;
  try {
    const r = rrulestr(rruleString);
    r.options.dtstart = start;
    return [r.after(new Date()), r.after(new Date())];
  } catch (err) {
    return null;
  }
};
