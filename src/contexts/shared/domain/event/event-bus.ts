import { DomainEvent } from '@/shared/domain/event/domain-event.ts'

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>
}
