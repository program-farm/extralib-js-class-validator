import {validateOrReject} from 'class-validator'
import {CheckSize} from '../src/check-size'

const propertyName = 'data' as const

class Foo {
  @CheckSize({min: 1, max: 4})
  [propertyName]: Set<any>
}

describe('checkSize Test', () => {
  test('Test validate(foo) - Pass cases', async () => {
    const foo = new Foo()
    foo.data = new Set([1])
    await validateOrReject(foo)
    foo.data = new Set([1, 2])
    await validateOrReject(foo)
    foo.data = new Set([1, 2, 3])
    await validateOrReject(foo)
    foo.data = new Set([1, 2, 3, 4])
    await validateOrReject(foo)
  })

  test('Test validate(foo) - Error case 1', async () => {
    const foo = new Foo()
    foo.data = null
    await validateOrReject(foo)
      .then(() => {
        expect(true).toEqual(false)
      })
      .catch(async (reasons) => {
        expect(reasons[0].constraints.checkSize).toEqual(
          `The value is null. Must be object had size method.`,
        )
        expect(reasons[0].constraints.checkSize).toEqual(
          `The value is ${foo.data}. Must be object had size method.`,
        )
      })
  })

  test('Test validate(foo) - Error case 2', async () => {
    const foo = new Foo()
    foo.data = new Set()
    await validateOrReject(foo).then((v) => {
      expect(true).toEqual(false)
    })
      .catch((reasons) => {
        expect(reasons[0].constraints.checkSize).toEqual(
          `Set.size must be 1 <= Set.size <= 4. Got 0.`,
        )
      })
  })
  test('Test validate(foo) - Error case 3', async () => {
    const foo = new Foo()
    foo.data = new Set([1, 2, 3, 4, 5])
    await validateOrReject(foo).then((v) => {
      expect(true).toEqual(false)
    })
      .catch((reasons) => {
        expect(reasons[0].constraints.checkSize).toEqual(
          `Set.size must be 1 <= Set.size <= 4. Got 5.`,
        )
      })
  })
})
