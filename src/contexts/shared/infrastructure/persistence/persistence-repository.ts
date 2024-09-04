import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { ID } from '@/shared/domain/value-objects/id.ts'

export abstract class PersistenceRepository<T> {
  protected abstract create(entity: T): Promise<T>

  protected abstract get(id: ID): Promise<T | null>

  protected abstract read(criteria?: Criteria): Promise<T[]>

  protected abstract update(entity: T): Promise<T>

  protected abstract delete(id: ID): Promise<void>
  protected abstract delete(ids: Record<string, ID>): Promise<void>
}
