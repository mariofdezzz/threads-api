import { AggregateRoot } from '@/shared/domain/aggregate-root.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { SqlitePrimitives } from '@/shared/infrastructure/persistence/sqlite/sqlite-primitives.ts'

export class SqlitePrimitivesFactory {
  public static create<T extends AggregateRoot>(
    entity: T,
  ): SqlitePrimitives<Primitives<T>> {
    const primitives = entity.toPrimitives()
    const sqlitePrimitives = this.transformPrimitives(primitives)

    return sqlitePrimitives
  }

  private static transformPrimitives<T extends Record<string, unknown>>(
    primitives: T,
  ): SqlitePrimitives<T> {
    return Object.fromEntries(
      Object.entries(primitives).map(([key, value]) => {
        return [
          key.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`),
          value,
        ]
      }),
    ) as any
  }
}
