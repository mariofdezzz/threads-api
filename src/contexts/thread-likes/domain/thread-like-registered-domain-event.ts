import { DomainEvent } from '@/shared/domain/event/domain-event.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export class ThreadLikeRegisteredDomainEvent extends DomainEvent {
  static eventName = 'thread.like.registered'

  constructor(readonly threadLike: ThreadLike) {
    super(ThreadLikeRegisteredDomainEvent.eventName)
  }
}
