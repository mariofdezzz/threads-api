import { ThreadLikeRepository } from '@/thread-likes/domain/thread-like-repository.ts'
import { SqliteThreadLikeRepository } from '@/thread-likes/infrastructure/sqlite-thread-like-repository.ts'
import { sqliteClient } from '~/container/persistence/sqlite-client.ts'

export const threadLikeRepository: ThreadLikeRepository =
  new SqliteThreadLikeRepository(
    sqliteClient,
  )
