import { ID } from '@/shared/domain/value-objects/id.ts'

export class PagingCursor {
  readonly paging: boolean
  constructor(
    readonly before?: ID,
    readonly after?: ID,
    readonly limit?: number,
  ) {
    this.paging = before !== undefined || after !== undefined ||
      limit !== undefined
  }
}
// TODO: throw error if (before && after)
