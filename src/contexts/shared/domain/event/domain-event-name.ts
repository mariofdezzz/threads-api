import { DomainEvent } from '@/shared/domain/event/domain-event.ts'

export type DomainEventName<T extends DomainEvent> = Pick<T, 'eventName'>
