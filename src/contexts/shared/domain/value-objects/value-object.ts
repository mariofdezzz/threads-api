export type Primitives = string | number | boolean | Date | WebSocket

export abstract class ValueObject<T extends Primitives> {
  constructor(readonly value: T) {
    this.ensureValueIsDefined(value)
  }

  private ensureValueIsDefined(value: T): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
      throw new Error(
        `ValueObject ${this.constructor.name} cannot be instantiated with a null or undefined value`,
      )
    }
  }

  equals(other: ValueObject<T>): boolean {
    return this.constructor.name === other.constructor.name &&
      this.value === other.value
  }

  toString(): string {
    return this.value.toString()
  }

  toJSON(): T {
    return this.value
  }

  toPrimitives(): T {
    return this.value
  }
}
