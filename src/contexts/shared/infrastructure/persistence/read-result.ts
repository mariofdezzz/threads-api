import { ID } from '@/shared/domain/value-objects/id.ts'

export type ReadResult<T> = {
  data: T[]
  paging: {
    cursors: {
      before: ID | null
      after: number | null
    }
  }
}
