import { SqliteQueryBuilderParams } from '@/shared/infrastructure/persistence/sqlite/sqlite-query-builder-params.ts'

export class SqliteQueryBuilder {
  static build({ table, limit, offset }: SqliteQueryBuilderParams): string {
    const selectClause = 'SELECT *'
    const fromClause = `FROM ${table}`
    const limitClause = limit ? `LIMIT ${limit}` : ''
    const offsetClause = offset ? `OFFSET ${offset}` : ''

    return [
      selectClause,
      fromClause,
      limitClause,
      offsetClause,
    ]
      .map((clause) => clause.trim())
      .join(' ')
  }
}
