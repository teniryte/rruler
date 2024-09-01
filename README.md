# rruler

TypeScript library for simple creating, parsing and formatting event RRULE strings.

## Examples

```ts
import { generateRrule } from 'rruler';

const rruleString = generateRrule({
  date: Date.now(),
  each: 'day',
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
