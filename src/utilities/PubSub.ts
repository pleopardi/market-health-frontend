export default class PubSub<Events> {
  private readonly subscriptions: Record<string, any[]> = {};

  public publish = <EventType extends keyof Events & string>(
    eventType: EventType,
    eventData: Events[EventType],
  ) => {
    this.subscriptions[eventType].forEach((handler) => handler(eventData));
  };

  public subscribe = <EventType extends keyof Events & string>(
    eventType: EventType,
    handler: (eventData: Events[EventType]) => void,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const list = this.subscriptions[eventType] ?? [];
    list.push(handler);
    this.subscriptions[eventType] = list;

    return handler;
  };

  public unsubscribe = <EventType extends keyof Events & string>(
    eventType: EventType,
    handler: (eventData: Events[EventType]) => void,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let list = this.subscriptions[eventType] ?? [];
    list = list.filter((h) => h !== handler);
    this.subscriptions[eventType] = list;
  };
}
