import { EventBus } from '@/shared/domain/event/event-bus.ts'
import { InMemoryEventBus } from '@/shared/infrastructure/event/in-memory-event-bus.ts'
import { domainEventSubscribers } from '~/container/event/domain-event-subscribers.ts'

export const eventBus: EventBus = new InMemoryEventBus(domainEventSubscribers)
