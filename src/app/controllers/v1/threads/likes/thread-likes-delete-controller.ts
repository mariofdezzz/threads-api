import { threadLikeRemover } from '~/container/application/thread-like/thread-like-remover.ts'
import { APIUseJWT } from '~/container/jwt-middleware.ts'
import { Controller } from '~/controllers/controller.ts'

export const ThreadLikesDeleteController: Controller<
  '/threads/:id/likes',
  [APIUseJWT]
> = async ({ params, jwt }) => {
  const threadId = params.id
  const userId = jwt.payload.uid

  const threadLike = {
    threadId: Number(threadId),
    userId: Number(userId),
  }

  await threadLikeRemover.remove(threadLike)

  return Response.json(threadLike)
}
