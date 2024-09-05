import { EventBus } from '@/shared/domain/event/event-bus.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { ThreadLikeRepository } from '@/thread-likes/domain/thread-like-repository.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export class ThreadLikeRemover {
  constructor(
    readonly repository: ThreadLikeRepository,
    readonly eventBus: EventBus,
  ) {}

  async remove(primitives: Primitives<ThreadLike>): Promise<void> {
    const threadLike = ThreadLike.remove(primitives)

    await this.repository.remove(threadLike)
    await this.eventBus.publish(threadLike.pullDomainEvents())
  }
}
