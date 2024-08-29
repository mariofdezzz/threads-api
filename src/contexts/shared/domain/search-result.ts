import { ID } from '@/shared/domain/value-objects/id.ts'

export type SearchResult<T> = {
  data: T[]
  paging: {
    cursor: {
      before: ID | null
      after: ID | null
    }
  }
}
