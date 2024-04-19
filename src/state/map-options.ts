import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

export const [stopAtMap, setStopAtMap] = makePersisted(
  createSignal<string>('true'),
  {
    name: 'stop-at-map',
  },
);
