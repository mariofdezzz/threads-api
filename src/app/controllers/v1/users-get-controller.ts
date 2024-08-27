import { userRepository } from '~/container/repositories/user-repository.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/users
export const UsersGetController: Controller<'/v1/users'> = async () => {
  const users = await userRepository.search()

  return Response.json({
    data: users,
    paging: {
      cursors: {
        before: null,
        after: null,
      },
    },
  })
}
