import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export const isSet = (value: any) => value instanceof Set

export function IsSet(
  options?: ValidationOptions,
): (object: any, propertyName) => void {
  return (object: any, propertyName) => {
    registerDecorator({
      name: 'isSet',
      propertyName,
      target: object.constructor,
      options: {
        message: ({ value, object, property, targetName }) =>
          `Type of "${object.constructor.name}.${property}" must be "Set". Got ${value}`,
        ...options,
      },
      validator: { validate: isSet },
    })
  }
}
