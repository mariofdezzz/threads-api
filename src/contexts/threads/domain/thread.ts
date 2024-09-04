import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { DateValueObject } from '@/shared/domain/value-objects/date-value-object.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { NumberValueObject } from '@/shared/domain/value-objects/number-value-object.ts'
import { StringValueObject } from '@/shared/domain/value-objects/string-value-object.ts'

export class Thread extends AggregateRoot {
  constructor(
    readonly id: ID,
    readonly userId: ID,
    readonly text: StringValueObject,
    readonly timestamp: DateValueObject,
    readonly likes: NumberValueObject,
    readonly replies: NumberValueObject,
    readonly repliedTo?: ID,
  ) {
    super()
  }

  static fromPrimitives({
    id,
    userId,
    text,
    timestamp,
    likes,
    replies,
    repliedTo,
  }: Primitives<Thread>): Thread {
    return new Thread(
      new ID(id),
      new ID(userId),
      new StringValueObject(text),
      new DateValueObject(timestamp),
      new NumberValueObject(likes),
      new NumberValueObject(replies),
      repliedTo ? new ID(repliedTo) : undefined,
    )
  }
}
