import PubSub from 'utilities/PubSub';

type Events = {
  hide: Record<never, never>;
  show: {description?: string; title: string; type: 'failure' | 'success'};
};

const broker = new PubSub<Events>();

export const publish = broker.publish;

export type Publish = typeof publish;

export const subscribe = broker.subscribe;
