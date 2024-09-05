import { DomainEventSubscriber } from '@/shared/domain/event/domain-event-suscriber.ts'
import { DomainEvent } from '@/shared/domain/event/domain-event.ts'
import { UpdateThreadLikeCountOnLikeRegistered } from '@/thread-likes/application/updater/thread-like-count-update-on-like-delete.ts'
import { ThreadLikeCountUpdater } from '@/thread-likes/application/updater/thread-like-count-updater.ts'
import { eventBus } from '~/container/event/event-bus.ts'
import { threadLikeRepository } from '~/container/repositories/thread-like-repository.ts'
import { UpdateThreadLikeCountOnLikeRemove } from '../../../contexts/thread-likes/application/updater/thread-like-count-update-on-like-registered.ts'

const updateThreadLikeCountOnLikeRegistered =
  new UpdateThreadLikeCountOnLikeRegistered(
    new ThreadLikeCountUpdater(
      threadLikeRepository,
      eventBus,
    ),
  )

const updateThreadLikeCountOnLikeDelete = new UpdateThreadLikeCountOnLikeRemove(
  new ThreadLikeCountUpdater(
    threadLikeRepository,
    eventBus,
  ),
)

export const domainEventSubscribers: DomainEventSubscriber<DomainEvent>[] = [
  updateThreadLikeCountOnLikeRegistered,
  updateThreadLikeCountOnLikeDelete,
]
