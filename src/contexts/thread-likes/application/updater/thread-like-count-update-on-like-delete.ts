import { DomainEventSubscriber } from '@/shared/domain/event/domain-event-suscriber.ts'
import { ThreadLikeCountUpdater } from '@/thread-likes/application/updater/thread-like-count-updater.ts'
import { ThreadLikeRegisteredDomainEvent } from '@/thread-likes/domain/thread-like-registered-domain-event.ts'
import { DomainEventName } from '../../../shared/domain/event/domain-event-name.ts'

export class UpdateThreadLikeCountOnLikeRegistered
  implements DomainEventSubscriber<ThreadLikeRegisteredDomainEvent> {
  constructor(
    readonly threadLikeCountUpdater: ThreadLikeCountUpdater,
  ) {}

  async on(domainEvent: ThreadLikeRegisteredDomainEvent): Promise<void> {
    await this.threadLikeCountUpdater.update(domainEvent.threadLike)
  }

  subscribedTo(): DomainEventName<ThreadLikeRegisteredDomainEvent>[] {
    return [ThreadLikeRegisteredDomainEvent]
  }
}
