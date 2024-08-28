import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { ReadResult } from '@/shared/infrastructure/persistence/read-result.ts'
import { SqlitePrimitivesFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives-factory.ts'
import { SqliteRepository } from '@/shared/infrastructure/persistence/sqlite/sqlite-repository.ts'
import { UserRepository } from '@/users/domain/user-repository.ts'
import { ID } from '../../shared/domain/value-objects/id.ts'
import { User } from '../domain/user.ts'

export class SqliteUserRepository extends SqliteRepository<User>
  implements UserRepository {
  async save(user: User): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(user)

    await this.create(primitives)
  }

  async find(id: ID): Promise<User | null> {
    const user = await this.get(id.value)

    if (!user) return null

    return User.fromPrimitives({
      ...user,
      profilePictureUrl: user.profile_picture_url,
    })
  }

  async search(criteria?: Criteria): Promise<ReadResult<User>> {
    const { data, paging } = await this.read(criteria)

    return {
      data: data.map((primitives) =>
        User.fromPrimitives({
          ...primitives,
          profilePictureUrl: primitives.profile_picture_url,
        })
      ),
      paging,
    }
  }

  async upsert(user: User): Promise<void> {
    const primitives = SqlitePrimitivesFactory.create(user)
    await this.update(primitives)
  }

  async remove(id: ID): Promise<void> {
    return await this.delete(id.value)
  }
}
