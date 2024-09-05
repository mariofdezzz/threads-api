import { DomainEvent } from '@/shared/domain/event/domain-event.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export class ThreadLikeRemoveDomainEvent extends DomainEvent {
  static eventName = 'thread.like.remove'

  constructor(readonly threadLike: ThreadLike) {
    super(ThreadLikeRemoveDomainEvent.eventName)
  }
}
