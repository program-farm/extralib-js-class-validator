import {registerDecorator, ValidationOptions} from 'class-validator'
import {isSet} from './is-set'

export type CheckSizeParams = {
  min?: number
  max?: number
}

export function checkSize(value: Set<any>, {min = 0, max = Number.MAX_SAFE_INTEGER}: CheckSizeParams = {}) {
  return typeof value?.size === 'number' && min <= value.size && value.size <= max
}

export function CheckSize(
  {min, max}: CheckSizeParams,
  options?: ValidationOptions,
): (object: any, propertyName) => void {
  return (object: any, propertyName) => {
    registerDecorator({
      name: 'checkSize',
      propertyName,
      target: object.constructor,
      options: {
        message: ({value, object, property, targetName}) =>
          typeof value?.size === 'number' ?
          `Set.size must be ${min} <= Set.size <= ${max}. Got ${value.size}.` : `The value is ${value}. Must be object had size method.`,
        ...options,
      },
      validator: {validate: (v) => checkSize(v, {min, max})},
    })
  }
}
