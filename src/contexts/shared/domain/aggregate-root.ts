// deno-lint-ignore-file no-explicit-any
import { DomainEvent } from '@/shared/domain/event/domain-event.ts'
import { Primitives } from '@/shared/domain/primitives.ts'

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = []

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents
    this.domainEvents = []

    return domainEvents
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event)
  }

  toPrimitives(): Primitives<this> {
    return structuredClone(
      Object.entries(this).filter(([key]) => key !== 'domainEvents').reduce(
        (acc, [key, value]) => {
          acc[key] = value.toPrimitives()

          return acc
        },
        {} as any,
      ),
    )
  }

  toJSON(): Primitives<this> {
    return this.toPrimitives()
  }
}
