import { DomainEventSubscriber } from '@/shared/domain/event/domain-event-suscriber.ts'
import { DomainEvent } from '@/shared/domain/event/domain-event.ts'

// TODO

export const domainEventSubscribers: DomainEventSubscriber<DomainEvent>[] = []
