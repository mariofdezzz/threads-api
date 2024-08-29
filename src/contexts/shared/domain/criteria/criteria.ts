import { PagingCursor } from '@/shared/domain/criteria/paging-cursor.ts'

export class Criteria {
  constructor(
    readonly cursor: PagingCursor,
  ) {}
}
