import { EventBus } from '@/shared/domain/event/event-bus.ts'
import { ThreadLikeRepository } from '@/thread-likes/domain/thread-like-repository.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export class ThreadLikeCountUpdater {
  constructor(
    readonly repository: ThreadLikeRepository,
    readonly eventBus: EventBus,
  ) {}

  async update(threadLike: ThreadLike): Promise<void> {
    await this.repository.updateCount(threadLike)
    await this.eventBus.publish(threadLike.pullDomainEvents())
  }
}
