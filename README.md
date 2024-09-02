# rruler

TypeScript library for simple creating, parsing and formatting event RRULE strings.

## Examples

### Generating RRULE string

```ts
import { generateRrule } from 'rruler';
import {
  RruleEach,
  RruleWeekday,
} from 'rruler/dist/esm/types/generate.interface';

const rruleString = generateRrule({
  each: 'day' as RruleEach,
  hours: [9, 18],
  weekdays: ['mo', 'tu', 'we', 'th', 'fr'] as RruleWeekday[],
});

// RRULE:FREQ=DAYLY;BYHOUR=9,18;BYDAY=MO,TU,WE,TH,FR
console.log(rruleString);
```

### Parsing RRULE

```ts
import { parseRrule } from 'rruler';

const rruleObject = parseRrule(rruleString);
```

### Formatting RRULE

```ts
import { formatRrule } from 'rruler';

const rruleLabel = formatRrule(rruleObject || rruleString);
```

```ts
import { compileRrule } from 'rruler';

const rruleString = compileRrule({
  frequency: 'MONTH',
  byMonthDay: [1, 15],
});
```
