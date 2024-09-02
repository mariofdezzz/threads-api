import { DomainEventName } from '@/shared/domain/event/domain-event-name.ts'
import { DomainEvent } from '@/shared/domain/event/domain-event.ts'

export interface DomainEventSubscriber<T extends DomainEvent> {
  on(domainEvent: T): Promise<void>

  subscribedTo(): DomainEventName<T>[]
}
