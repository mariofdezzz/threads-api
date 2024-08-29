import { ID } from '@/shared/domain/value-objects/id.ts'

export class PagingCursor {
  readonly paging: boolean
  constructor(
    readonly before?: ID,
    readonly after?: ID,
    readonly limit?: number,
  ) {
    // TODO: throw error if (before && after)
    this.paging = before !== undefined || after !== undefined ||
      limit !== undefined
  }
}
