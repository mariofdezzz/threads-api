import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { NumberValueObject } from '@/shared/domain/value-objects/number-value-object.ts'
import { ThreadLikeRegisteredDomainEvent } from '@/thread-likes/domain/thread-like-registered-domain-event.ts'

export class ThreadLike extends AggregateRoot {
  constructor(
    readonly threadId: NumberValueObject,
    readonly userId: NumberValueObject,
  ) {
    super()
  }

  static create(primitives: Primitives<ThreadLike>): ThreadLike {
    const threadLike = ThreadLike.fromPrimitives(primitives)

    threadLike.record(new ThreadLikeRegisteredDomainEvent(threadLike))

    return threadLike
  }

  static fromPrimitives({
    threadId,
    userId,
  }: Primitives<ThreadLike>): ThreadLike {
    return new ThreadLike(
      new NumberValueObject(threadId),
      new NumberValueObject(userId),
    )
  }
}
