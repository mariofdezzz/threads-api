import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { SqlitePrimitivesFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives-factory.ts'
import { SqliteRepository } from '@/shared/infrastructure/persistence/sqlite/sqlite-repository.ts'
import { UserRepository } from '@/users/domain/user-repository.ts'
import { SearchResult } from '../../shared/domain/search-result.ts'
import { ID } from '../../shared/domain/value-objects/id.ts'
import { User } from '../domain/user.ts'

export class SqliteUserRepository extends SqliteRepository<User>
  implements UserRepository {
  async save(user: User): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(user)

    await this.create(primitives)
  }

  async find(id: ID): Promise<User | null> {
    const user = await this.get(id)

    if (!user) return null

    return User.fromPrimitives({
      ...user,
      profilePictureUrl: user.profile_picture_url,
    })
  }

  async search(criteria?: Criteria): Promise<SearchResult<User>> {
    const entries = await this.read(criteria)

    const data = entries.map((primitives) =>
      User.fromPrimitives({
        ...primitives,
        profilePictureUrl: primitives.profile_picture_url,
      })
    )
    const before = criteria?.cursor.paging ? entries.at(0)?.id : undefined
    const after = criteria?.cursor.paging ? entries.at(-1)?.id : undefined
    const cursor = {
      before: before ? new ID(before) : null,
      after: after ? new ID(after) : null,
    }

    return {
      data,
      paging: {
        cursor,
      },
    }
  }

  async upsert(user: User): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(user)
    await this.update(primitives)
  }

  async remove(id: ID): Promise<void> {
    return await this.delete(id)
  }
}
