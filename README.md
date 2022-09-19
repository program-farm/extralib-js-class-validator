# Extra Library on class-validator.js

## Installation

```shell
npm install @program-farm/extralib-js-class-validator class-validator
```

## Example

```typescript
import {IsSet} from '@program-farm/is-set'
import {validate} from 'class-validator'

class C {
  @IsSet()
  data: Set<any>
}

async function main() {
  const c = new C()
  c.data = new Set([1, 2, 3])
  await validate(c)
}
```