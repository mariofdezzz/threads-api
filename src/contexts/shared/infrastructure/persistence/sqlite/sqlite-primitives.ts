// Recursive utility to transform all keys of an object to snake_case
export type SqlitePrimitives<T extends Record<string, unknown>> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K] extends AtomicTypes
    ? T[K]
    : T[K] extends Record<string, unknown> ? SqlitePrimitives<T[K]>
    : T[K]
}

// Utility type to convert a single string from camelCase to snake_case
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U> ? `${Uncapitalize<T>}${CamelToSnakeCase<U>}`
  : `${Uncapitalize<T>}_${CamelToSnakeCase<Uncapitalize<U>>}`
  : S

type AtomicTypes = Date | WebSocket
