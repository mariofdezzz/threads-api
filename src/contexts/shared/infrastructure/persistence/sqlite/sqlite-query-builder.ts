import { camelToSnakeCase } from '@/shared/domain/casing/camel-to-snake-case.ts'
import { Filters } from '@/shared/domain/criteria/filters.ts'
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
    const conditions = [
      this.buildCriteriaFilters(criteria?.filters),
      cursor,
    ].filter((c) => c).join(' AND ')

    const selectClause = 'SELECT *'
    const fromClause = `FROM ${table}`
    const whereClause = conditions ? `WHERE ${conditions}` : ''
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

  private static buildCriteriaFilters(
    { filters }: Filters = { filters: [] },
  ): string {
    const filtersClauses = filters.map(({ field, operator, value }) =>
      `${camelToSnakeCase(String(field))} ${operator.value} ${value}`
    ).join(' AND ')

    return filtersClauses
  }
}
