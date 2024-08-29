import { NextPagingCursor } from '@/shared/domain/criteria/next-paging-cursor.ts'
import { PagingCursor } from '@/shared/domain/criteria/paging-cursor.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'

export class NextPagingCursorFactory {
  static create<T extends { id: ID }>(
    entries: T[],
    cursor?: PagingCursor,
  ): NextPagingCursor {
    if (!cursor) {
      return {
        before: null,
        after: null,
      }
    }
    const { limit, before, after } = cursor

    const nextBefore = (limit && after) || (
        limit && before &&
        entries.length === limit
      )
      ? entries.at(0)?.id
      : undefined
    const nextAfter = (
        limit && !after?.value
      ) ||
        (
          limit && after &&
          entries.length === limit
        ) || before
      ? entries.at(-1)?.id
      : undefined

    return {
      before: nextBefore ?? null,
      after: nextAfter ?? null,
    }
  }
}
