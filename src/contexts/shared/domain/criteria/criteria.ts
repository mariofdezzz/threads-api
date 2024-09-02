import { Filters } from '@/shared/domain/criteria/filters.ts'
import { PagingCursor } from '@/shared/domain/criteria/paging-cursor.ts'

export class Criteria {
  constructor(
    readonly filters: Filters,
    readonly cursor: PagingCursor,
  ) {}
}
