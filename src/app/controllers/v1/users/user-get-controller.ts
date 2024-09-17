import { userFinder } from '~/container/application/user/user-finder.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/users/:id
export const UserGetController: Controller<'/v1/users/:id'> = async (
  { params },
) => {
  const id = Number(params.id)
  const user = await userFinder.find(id)

  if (!user) return new Response('Not Found', { status: 404 })

  return Response.json(user)
}
