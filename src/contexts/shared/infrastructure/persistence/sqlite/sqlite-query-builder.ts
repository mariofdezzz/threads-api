import { SqliteQueryBuilderParams } from '@/shared/infrastructure/persistence/sqlite/sqlite-query-builder-params.ts'

export class SqliteQueryBuilder {
  static build({ table, criteria }: SqliteQueryBuilderParams): string {
    const limit = criteria?.cursor.limit
    const cursorBefore = criteria?.cursor.before
    const cursorAfter = criteria?.cursor.after
    const cursor = cursorBefore
      ? `id < ${cursorBefore}`
      : cursorAfter
      ? `id > ${cursorAfter}`
      : ''

    const selectClause = 'SELECT *'
    const fromClause = `FROM ${table}`
    const whereClause = cursor ? `WHERE ${cursor}` : ''
    const orderByClause = cursorBefore ? 'ORDER BY id DESC' : ''
    const limitClause = limit ? `LIMIT ${limit}` : ''

    const query = [
      selectClause,
      fromClause,
      whereClause,
      orderByClause,
      limitClause,
    ]
      .map((clause) => clause.trim())
      .filter((clause) => clause.length > 0)
      .join(' ')

    if (cursorBefore) {
      return `SELECT * FROM (${query}) ORDER BY id ASC`
    }

    return query
  }
}
