import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { Operator } from '@/shared/domain/criteria/filter-operator.ts'
import { Filters } from '@/shared/domain/criteria/filters.ts'
import { PagingCursor } from '@/shared/domain/criteria/paging-cursor.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { threadsRepository } from '~/container/repositories/threads-repository.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/users/:id/threads
export const UserThreadsGetController: Controller<'/v1/users/:id/threads'> =
  async ({
    request,
    params: { id },
  }) => {
    const params = new URL(request.url).searchParams
    const limit = params.get('limit')
    const before = params.get('before')
    const after = params.get('after')

    const criteria = new Criteria(
      Filters.fromValues([{
        field: 'userId',
        operator: Operator.EQUALS,
        value: id,
      }]),
      new PagingCursor(
        before ? new ID(Number(before)) : undefined,
        after ? new ID(Number(after)) : undefined,
        limit ? Number(limit) : undefined,
      ),
    )

    const result = await threadsRepository.search(criteria)

    return Response.json(result)
  }
