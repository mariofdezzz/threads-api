import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { ReadResult } from '@/shared/infrastructure/persistence/read-result.ts'

export abstract class PersistenceRepository<T> {
  protected abstract create(entity: T): Promise<T>
  protected abstract get(id: string): Promise<T | null>
  protected abstract read(criteria?: Criteria): Promise<ReadResult<T>>
  protected abstract update(entity: T): Promise<T>
  protected abstract delete(id: string): Promise<void>
}
