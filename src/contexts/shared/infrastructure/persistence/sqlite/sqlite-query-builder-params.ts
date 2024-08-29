import { Criteria } from '@/shared/domain/criteria/criteria.ts'

export type SqliteQueryBuilderParams = {
  table: string
  criteria?: Criteria
}
