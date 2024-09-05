import { ThreadLikeRemover } from '@/thread-likes/application/remover/thread-like-remover.ts'
import { eventBus } from '~/container/event/event-bus.ts'
import { threadLikeRepository } from '~/container/repositories/thread-like-repository.ts'

export const threadLikeRemover = new ThreadLikeRemover(
  threadLikeRepository,
  eventBus,
)
