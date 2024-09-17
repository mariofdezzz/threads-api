import { threadLikeRegistrar } from '~/container/application/thread-like/thread-like-registrar.ts'
import { APIUseJWT } from '~/container/jwt-middleware.ts'
import { Controller } from '~/controllers/controller.ts'

export const ThreadLikesPutController: Controller<
  '/threads/:id/likes',
  [APIUseJWT]
> = async ({ params, jwt }) => {
  const threadId = params.id
  const userId = jwt.payload.uid

  const threadLike = {
    threadId: Number(threadId),
    userId: Number(userId),
  }

  try {
    await threadLikeRegistrar.registrar(threadLike)
  } catch {
    return Response.json(threadLike, { status: 200 })
  }

  return Response.json(threadLike, { status: 201 })
}
