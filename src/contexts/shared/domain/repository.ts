import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { SearchResult } from './search-result.ts'

export interface Repository<T> {
  save(user: T): Promise<void>
  find(id: ID): Promise<T | null>
  search(criteria?: Criteria): Promise<SearchResult<T>>
  upsert(user: T): Promise<void>
  remove(id: ID): Promise<void>
}
