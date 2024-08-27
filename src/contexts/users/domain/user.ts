import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { StringValueObject } from '@/shared/domain/value-objects/string-value-object.ts'

export class User extends AggregateRoot {
  constructor(
    readonly id: ID,
    readonly name: ID,
    readonly profilePictureUrl: StringValueObject,
    readonly biography: StringValueObject,
  ) {
    super()
  }

  static fromPrimitives({
    id,
    name,
    profilePictureUrl,
    biography,
  }: Primitives<User>): User {
    return new User(
      new ID(id),
      new ID(name),
      new StringValueObject(profilePictureUrl),
      new StringValueObject(biography),
    )
  }
}
