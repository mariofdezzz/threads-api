import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { userRepository } from '~/container/repositories/user-repository.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/users
export const UsersGetController: Controller<'/v1/users'> = async ({
  request,
}) => {
  const params = new URL(request.url).searchParams
  const limit = params.get('limit')
  const offset = params.get('offset')

  const criteria = new Criteria(
    limit ? Number(limit) : undefined,
    offset ? Number(offset) : undefined,
  )

  const result = await userRepository.search(criteria)

  return Response.json(result)
}
