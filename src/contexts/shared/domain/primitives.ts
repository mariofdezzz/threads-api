import {
  Primitives as VOPrimitives,
  ValueObject,
} from '@/shared/domain/value-objects/value-object.ts'

export type Primitives<C> = {
  [K in keyof ClassProperties<C>]: C[K] extends ValueObject<VOPrimitives>
    ? C[K]['value']
    : C[K] extends Array<unknown>
      ? C[K][number] extends ValueObject<VOPrimitives>
        ? Array<C[K][number]['value']>
      : Array<Primitives<C[K][number]>>
    : MaybeNullablePrimitives<C[K]>
}

type MaybeNullablePrimitives<K> = K extends undefined | null ? K
  : K extends ValueObject<VOPrimitives> ? K['value']
  : Primitives<K>

type ClassProperties<T> = {
  // deno-lint-ignore ban-types
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}
