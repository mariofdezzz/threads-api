import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'
import { ReadResult } from '@/shared/infrastructure/persistence/read-result.ts'

export interface Repository<T> {
  save(user: T): Promise<void>
  find(id: ID): Promise<T | null>
  search(criteria?: Criteria): Promise<ReadResult<T>>
  upsert(user: T): Promise<void>
  remove(id: ID): Promise<void>
}
