import { ThreadLikeRegistrar } from '@/thread-likes/application/registrar/thread-like-registrar.ts'
import { eventBus } from '~/container/event/event-bus.ts'
import { threadLikeRepository } from '~/container/repositories/thread-like-repository.ts'

export const threadLikeRegistrar = new ThreadLikeRegistrar(
  threadLikeRepository,
  eventBus,
)
