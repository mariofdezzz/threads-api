// deno-lint-ignore-file no-explicit-any
export abstract class AggregateRoot {
  toPrimitives(): Primitives<this> {
    return structuredClone(
      Object.entries(this).reduce((acc, [key, value]) => {
        acc[key] = value.toPrimitives()

        return acc
      }, {} as any),
    )
  }
}
