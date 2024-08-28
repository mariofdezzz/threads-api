import { ID } from '@/shared/domain/value-objects/id.ts'
import { userRepository } from '~/container/repositories/user-repository.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/users/:id
export const UserGetController: Controller<'/v1/users/:id'> = async (
  { params },
) => {
  const id = new ID(params.id)
  const user = await userRepository.find(id)

  if (!user) return new Response('Not Found', { status: 404 })

  return Response.json(user)
}
