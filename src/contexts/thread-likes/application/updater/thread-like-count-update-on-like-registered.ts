import { DomainEventSubscriber } from '@/shared/domain/event/domain-event-suscriber.ts'
import { ThreadLikeCountUpdater } from '@/thread-likes/application/updater/thread-like-count-updater.ts'
import { ThreadLikeRemoveDomainEvent } from '@/thread-likes/domain/thread-like-delete-domain-event.ts'
import { DomainEventName } from '../../../shared/domain/event/domain-event-name.ts'

export class UpdateThreadLikeCountOnLikeRemove
  implements DomainEventSubscriber<ThreadLikeRemoveDomainEvent> {
  constructor(
    readonly threadLikeCountUpdater: ThreadLikeCountUpdater,
  ) {}

  async on(domainEvent: ThreadLikeRemoveDomainEvent): Promise<void> {
    await this.threadLikeCountUpdater.update(domainEvent.threadLike)
  }

  subscribedTo(): DomainEventName<ThreadLikeRemoveDomainEvent>[] {
    return [ThreadLikeRemoveDomainEvent]
  }
}
