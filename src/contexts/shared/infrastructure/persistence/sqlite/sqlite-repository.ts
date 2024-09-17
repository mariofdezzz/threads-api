import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { PersistenceRepository } from '@/shared/infrastructure/persistence/persistence-repository.ts'
import { SqlitePrimitives } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives.ts'
import { SqliteQueryBuilder } from '@/shared/infrastructure/persistence/sqlite/sqlite-query-builder.ts'
import type { DB } from 'sqlite'
import { logger } from '~/container/logger.ts'

export abstract class SqliteRepository<
  T extends AggregateRoot,
  U extends Record<string, unknown> = SqlitePrimitives<Primitives<T>>,
> extends PersistenceRepository<U> {
  abstract readonly tableName: string

  constructor(protected readonly client: Promise<DB>) {
    super()
  }

  protected async create(entity: U): Promise<U> {
    delete entity.id
    const client = await this.client

    client.execute(
      `INSERT INTO ${this.tableName} (${
        Object.keys(entity).join(', ')
      }) VALUES (${
        Object.values(
          entity,
        ).join(', ')
      })`,
    )

    return entity // FIXME: id ?
  }

  protected async get(id: ID): Promise<U | null> {
    return (await this.client).queryEntries<U>(
      `SELECT * FROM ${this.tableName} WHERE id = ${id}`,
    )[0]
  }

  protected async read(criteria?: Criteria): Promise<U[]> {
    const query = SqliteQueryBuilder.build({
      table: this.tableName,
      criteria,
    })

    logger.debug('[QUERY]', query)

    return (await this.client).queryEntries<U>(query)
  }

  protected async update(entity: U): Promise<U> {
    const client = await this.client

    client.execute(
      `UPDATE ${this.tableName} SET ${
        Object.entries(entity)
          .map(([key, value]) => `${key} = ${value}`)
          .join(', ')
      } WHERE id = ${entity.id}`,
    )

    return entity
  }

  protected async delete(id: ID | Record<string, ID>): Promise<void> {
    if (id instanceof ID) {
      return (await this.client).execute(
        `DELETE FROM ${this.tableName} WHERE id = ${id}`,
      )
    }

    return (await this.client).execute(
      `DELETE FROM ${this.tableName} WHERE ${
        Object.entries(id).map(([key, value]) => `${key} = ${value}`).join(
          ' AND ',
        )
      }`,
    )
  }
}
