import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { NextPagingCursorFactory } from '@/shared/domain/criteria/next-paging-cursor-factory.ts'
import { SearchResult } from '@/shared/domain/search-result.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { SqlitePrimitivesFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives-factory.ts'
import { SqliteRepository } from '@/shared/infrastructure/persistence/sqlite/sqlite-repository.ts'
import { ThreadRepository } from '@/threads/domain/thread-repository.ts'
import { Thread } from '@/threads/domain/thread.ts'

export class SqliteThreadRepository extends SqliteRepository<Thread>
  implements ThreadRepository {
  readonly tableName = 'threads'

  async save(user: Thread): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(user)

    await this.create(primitives)
  }

  async find(id: ID): Promise<Thread | null> {
    const thread = await this.get(id)

    if (!thread) return null

    return Thread.fromPrimitives({
      ...thread,
      userId: thread.user_id,
      repliedTo: thread.replied_to,
    })
  }

  async search(criteria?: Criteria): Promise<SearchResult<Thread>> {
    const entries = await this.read(criteria)

    const data = entries.map((primitives) =>
      Thread.fromPrimitives({
        ...primitives,
        userId: primitives.user_id,
        repliedTo: primitives.replied_to,
      })
    )
    const cursor = NextPagingCursorFactory.create(data, criteria?.cursor)

    return {
      data,
      paging: {
        cursor,
      },
    }
  }

  async upsert(user: Thread): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(user)
    await this.update(primitives)
  }

  async remove(id: ID): Promise<void> {
    return await this.delete(id)
  }
}
