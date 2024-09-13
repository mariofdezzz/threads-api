import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { camelToSnakeCase } from '@/shared/domain/casing/camel-to-snake-case.ts'
import { SqliteClientFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-client-factory.ts'
import { DB } from 'sqlite'

export class SqliteMockClient {
  private constructor(readonly client: Promise<DB>) {}

  static async build(): Promise<SqliteMockClient> {
    const client = SqliteClientFactory.createClient('test', {
      database: ':memory:',
    })
    const mock = new SqliteMockClient(client)

    await mock.init()

    return mock
  }

  async insert(table: string, entity: AggregateRoot) {
    const client = await this.client
    const primitives = entity.toPrimitives()

    const statement = `INSERT INTO ${table} (${
      Object.keys(primitives)
        .map((k) => `${camelToSnakeCase(k)}`)
        .join(', ')
    }) VALUES (${
      Object.values(primitives)
        .map((v) =>
          v instanceof Date
            ? `'${v.toISOString().replace('T', ' ').split('.')[0]}'`
            : typeof v === 'string'
            ? `'${v}'`
            : v
        )
        .join(', ')
    })`
    console.log(statement)

    client.execute(statement)
  }

  private async init() {
    const client = await this.client

    client.execute(`
      CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        timestamp DATETIME NOT NULL,
        likes INTEGER NOT NULL,
        replies INTEGER NOT NULL,
        replied_to INTEGER
      )
    `)
  }
}
