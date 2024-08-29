import { ID } from '@/shared/domain/value-objects/id.ts'

export type NextPagingCursor = {
  before: ID | null
  after: ID | null
}
