import { ID } from '@/shared/domain/value-objects/id.ts'
import { SqlitePrimitivesFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives-factory.ts'
import { SqliteRepository } from '@/shared/infrastructure/persistence/sqlite/sqlite-repository.ts'
import { ThreadLikeRepository } from '@/thread-likes/domain/thread-like-repository.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export class SqliteThreadLikeRepository extends SqliteRepository<ThreadLike>
  implements ThreadLikeRepository {
  readonly tableName = 'likes'

  async save(entity: ThreadLike): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(entity)

    await this.create(primitives)
  }

  async remove(entity: ThreadLike): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(entity)
    const compoundId = Object.fromEntries(
      Object.entries(primitives).map(
        ([key, value]) => [key, new ID(value)],
      ),
    )

    await this.delete(compoundId)
  }

  async updateCount(entity: ThreadLike): Promise<void> {
    const client = await this.client

    client.execute(`
        UPDATE threads
        SET likes = (SELECT COUNT(*)
          FROM likes
          WHERE likes.thread_id = threads.id)
        WHERE id = ${entity.threadId}
      `)
  }
}
