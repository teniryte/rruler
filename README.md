# rruler

TypeScript library for simple creating, parsing and formatting event RRULE strings.

## Examples

```ts
import { generateRrule } from 'rruler';

let rruleString = generateRrule({
  start: moment(),
  each: 'day',
});

rruleString = generateRrule({
  start: moment(),
  end: moment('15.04.2026', 'DD.MM.YYYY'),
  each: 'year',
});
```

```ts
import { parseRrule } from 'rruler';

const rruleObject = parseRrule(rruleString);
```

```ts
import { formatRrule } from 'rruler';

const rruleLabel = formatRrule(rruleObject || rruleString, 'ru');
```

```ts
import { compileRrule } from 'rruler';

const rruleString = compileRrule({
  frequency: 'MONTH',
  byMonthDay: [1, 15],
});
```
