import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { DateValueObject } from '@/shared/domain/value-objects/date-value-object.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { StringValueObject } from '@/shared/domain/value-objects/string-value-object.ts'

export class Thread extends AggregateRoot {
  constructor(
    readonly id: ID,
    readonly userId: ID,
    readonly text: StringValueObject,
    readonly timestamp: DateValueObject,
    readonly repliedTo?: ID,
  ) {
    super()
  }

  static fromPrimitives({
    id,
    userId,
    text,
    timestamp,
    repliedTo,
  }: Primitives<Thread>): Thread {
    return new Thread(
      new ID(id),
      new ID(userId),
      new StringValueObject(text),
      new DateValueObject(timestamp),
      repliedTo ? new ID(repliedTo) : undefined,
    )
  }
}
