import { userRepository } from '~/container/repositories/user-repository.ts'
import { Controller } from '~/controllers/controller.ts'

// POST /v1/users
export const UsersPostController: Controller<'/v1/users'> = async (
  { request },
) => {
  const { body } = await request.json()

  await userRepository.save(body)

  return Response.json(body)
}
