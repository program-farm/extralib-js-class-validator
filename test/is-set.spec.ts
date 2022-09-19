import { IsSet } from '../src'
import { validateOrReject } from 'class-validator'

const propertyName = 'data' as const

class Foo {
  @IsSet()
  [propertyName]
}

describe('isSet Test', () => {
  test('Test validate(foo)', async () => {
    const foo = new Foo()
    foo.data = null
    validateOrReject(foo)
      .then(() => {
        expect(true).toEqual(false)
      })
      .catch(async (reasons) => {
        expect(reasons[0].constraints.isSet).toEqual(
          `Type of "Foo.${propertyName}" must be "Set". Got null`,
        )
      })

    foo.data = new Set()
    await validateOrReject(foo)
  })
})
