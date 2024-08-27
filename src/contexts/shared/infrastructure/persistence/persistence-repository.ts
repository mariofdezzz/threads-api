export abstract class PersistenceRepository<T> {
  protected abstract create(entity: T): Promise<T>
  protected abstract get(id: string): Promise<T | null>
  protected abstract read(): Promise<T[]>
  protected abstract update(entity: T): Promise<T>
  protected abstract delete(id: string): Promise<void>
}
