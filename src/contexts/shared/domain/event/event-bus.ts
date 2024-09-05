import { DomainEventSubscriber } from '@/shared/domain/event/domain-event-suscriber.ts'
import { DomainEvent } from '@/shared/domain/event/domain-event.ts'

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>

  registerSubscribers(
    subscribers: DomainEventSubscriber<DomainEvent>[],
  ): void
}
