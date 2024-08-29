import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { PersistenceRepository } from '@/shared/infrastructure/persistence/persistence-repository.ts'
import { SqlitePrimitives } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives.ts'
import { SqliteQueryBuilder } from '@/shared/infrastructure/persistence/sqlite/sqlite-query-builder.ts'
import type { DB } from 'sqlite'

export class SqliteRepository<
  T extends AggregateRoot,
  U extends Record<string, unknown> = SqlitePrimitives<Primitives<T>>,
> extends PersistenceRepository<U> {
  constructor(protected readonly client: Promise<DB>) {
    super()
  }

  protected async create(entity: U): Promise<U> {
    delete entity.id
    const client = await this.client

    client.execute(
      `INSERT INTO users (${Object.keys(entity).join(', ')}) VALUES (${
        Object.values(
          entity,
        ).join(', ')
      })`,
    )

    return entity // FIXME: id ?
  }

  protected async get(id: ID): Promise<U | null> {
    return (await this.client).queryEntries<U>(
      `SELECT * FROM users WHERE id = ${id}`,
    )[0]
  }

  protected async read(criteria?: Criteria): Promise<U[]> {
    const query = SqliteQueryBuilder.build({
      table: 'users',
      criteria,
    })

    console.log('[QUERY]', query)

    return (await this.client).queryEntries<U>(query)
  }

  protected async update(entity: U): Promise<U> {
    const client = await this.client

    client.execute(
      `UPDATE users SET ${
        Object.entries(entity)
          .map(([key, value]) => `${key} = ${value}`)
          .join(', ')
      } WHERE id = ${entity.id}`,
    )

    return entity
  }

  protected async delete(id: ID): Promise<void> {
    return (await this.client).execute(`DELETE FROM users WHERE id = ${id}`)
  }
}
