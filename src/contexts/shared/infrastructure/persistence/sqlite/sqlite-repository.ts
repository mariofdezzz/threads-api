import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { PersistenceRepository } from '@/shared/infrastructure/persistence/persistence-repository.ts'
import { ReadResult } from '@/shared/infrastructure/persistence/read-result.ts'
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

  protected async get(id: string): Promise<U | null> {
    return (await this.client).queryEntries<U>(
      `SELECT * FROM users WHERE id = ${id}`,
    )[0]
  }

  protected async read(criteria?: Criteria): Promise<ReadResult<U>> {
    const limit = criteria?.limit !== undefined
      ? criteria?.limit + 1
      : undefined
    const query = SqliteQueryBuilder.build({
      table: 'users',
      limit,
      offset: criteria?.offset,
    })

    const entries = (await this.client).queryEntries<U>(query)

    const data = entries.length === limit
      ? entries.slice(0, limit - 1)
      : entries

    const result: ReadResult<U> = {
      data,
      paging: {
        cursors: {
          before: null,
          after: entries.length === limit ? entries.at(-1)?.id as any : null,
        },
      },
    }
    return result
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

  protected async delete(id: string): Promise<void> {
    return (await this.client).execute(`DELETE FROM users WHERE id = ${id}`)
  }
}
