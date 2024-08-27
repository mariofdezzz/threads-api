import { UserRepository } from '@/users/domain/user-repository.ts'
import { SqliteUserRepository } from '@/users/infrastructure/sqlite-user-repository.ts'
import { sqliteClient } from '~/container/persistence/sqlite-client.ts'

export const userRepository: UserRepository = new SqliteUserRepository(
  sqliteClient,
)
