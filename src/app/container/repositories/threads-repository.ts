import { ThreadRepository } from '@/threads/domain/thread-repository.ts'
import { SqliteThreadRepository } from '@/threads/infrastructure/sqlite-thread-repository.ts'
import { sqliteClient } from '~/container/persistence/sqlite-client.ts'

export const threadsRepository: ThreadRepository = new SqliteThreadRepository(
  sqliteClient,
)
