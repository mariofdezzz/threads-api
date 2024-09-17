import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { Filters } from '@/shared/domain/criteria/filters.ts'
import { PagingCursor } from '@/shared/domain/criteria/paging-cursor.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { threadSearcher } from '~/container/application/thread/thread-searcher.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/threads
export const ThreadsGetController: Controller<'/v1/threads'> = async ({
  request,
}) => {
  const params = new URL(request.url).searchParams
  const limit = params.get('limit')
  const before = params.get('before')
  const after = params.get('after')

  const criteria = new Criteria(
    Filters.empty(),
    new PagingCursor(
      before ? new ID(Number(before)) : undefined,
      after ? new ID(Number(after)) : undefined,
      limit ? Number(limit) : undefined,
    ),
  )

  const result = await threadSearcher.search(criteria)

  return Response.json(result)
}
