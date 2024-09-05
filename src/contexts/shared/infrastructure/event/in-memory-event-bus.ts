import { DomainEventSubscriber } from '@/shared/domain/event/domain-event-suscriber.ts'
import { DomainEvent } from '@/shared/domain/event/domain-event.ts'
import { EventBus } from '@/shared/domain/event/event-bus.ts'

export class InMemoryEventBus implements EventBus {
  // deno-lint-ignore ban-types
  private readonly subscriptions: Map<string, Function[]> = new Map()

  constructor(subscribers: DomainEventSubscriber<DomainEvent>[]) {
    this.registerSubscribers(subscribers)
  }

  async publish(events: DomainEvent[]): Promise<void> {
    const executions: unknown[] = []

    events.forEach((event) => {
      const subscribers = this.subscriptions.get(event.eventName)

      if (subscribers) {
        subscribers.forEach((subscriber) => {
          executions.push(subscriber(event))
        })
      }
    })

    await Promise.all(executions).catch((error) => {
      console.error('Executing subscriptions:', error)
    })
  }

  registerSubscribers(
    subscribers: DomainEventSubscriber<DomainEvent>[],
  ): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        this.subscribe(event.eventName, subscriber)
      })
    })
  }

  private subscribe(
    eventName: string,
    subscriber: DomainEventSubscriber<DomainEvent>,
  ): void {
    const currentSubscriptions = this.subscriptions.get(eventName)
    const subscription = subscriber.on.bind(subscriber)

    if (currentSubscriptions) {
      currentSubscriptions.push(subscription)
    } else {
      this.subscriptions.set(eventName, [subscription])
    }
  }
}
