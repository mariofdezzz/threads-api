import { SqliteRepository } from '@/shared/infrastructure/persistence/sqlite/sqlite-repository.ts'
import { SqliteUser } from '@/users/domain/sqlite-user.ts'
import { UserRepository } from '@/users/domain/user-repository.ts'
import { ID } from '../../shared/domain/value-objects/id.ts'
import { User } from '../domain/user.ts'

export class SqliteUserRepository extends SqliteRepository<SqliteUser>
  implements UserRepository {
  save(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  find(id: ID): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async search(): Promise<User[]> {
    const result = await this.read()

    return result.map((primitives) =>
      User.fromPrimitives({
        ...primitives,
        profilePictureUrl: primitives.profile_picture_url,
      })
    )
  }

  upsert(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  remove(id: ID): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
