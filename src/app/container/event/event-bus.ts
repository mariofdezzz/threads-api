import { EventBus } from '@/shared/domain/event/event-bus.ts'
import { InMemoryEventBus } from '@/shared/infrastructure/event/in-memory-event-bus.ts'

export const eventBus: EventBus = new InMemoryEventBus([])
