import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'
import { APIUseJWT } from '~/container/jwt-middleware.ts'
import { threadLikeRepository } from '~/container/repositories/thread-like-repository.ts'
import { Controller } from '~/controllers/controller.ts'

export const ThreadLikesDeleteController: Controller<
  '/threads/:id/likes',
  [APIUseJWT]
> = async ({ params, jwt }) => {
  const threadId = params.id
  const userId = jwt.payload.uid

  const threadLike = ThreadLike.fromPrimitives({
    threadId: Number(threadId),
    userId: Number(userId),
  })

  await threadLikeRepository.remove(threadLike)

  return Response.json(threadLike)
}
