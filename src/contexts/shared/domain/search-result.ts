import { NextPagingCursor } from '@/shared/domain/criteria/next-paging-cursor.ts'

export type SearchResult<T> = {
  data: T[]
  paging: {
    cursor: NextPagingCursor
  }
}
