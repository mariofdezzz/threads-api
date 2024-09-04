import { EventBus } from '@/shared/domain/event/event-bus.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { ThreadLikeRepository } from '@/thread-likes/domain/thread-like-repository.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export class ThreadLikeRegistrar {
  constructor(
    private readonly repository: ThreadLikeRepository,
    private readonly eventBus: EventBus,
  ) {}

  async registrar(primitives: Primitives<ThreadLike>) {
    const threadLike = ThreadLike.create(primitives)

    await this.repository.save(threadLike)
    await this.eventBus.publish(threadLike.pullDomainEvents())
  }
}
