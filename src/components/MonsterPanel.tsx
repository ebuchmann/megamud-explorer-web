import { createEffect, createSignal } from 'solid-js';
import monsterData from '../data/monsters.json';
import { Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Monster } from '../types';

export function MonsterPanel() {
  const params = useParams();
  const [monster, setMonster] = createSignal<Monster>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const monster = monsterData.find((mon) => mon.Number === number);
      setMonster(monster);
    }
  });
  return (
    <p>
      <Show when={!monster()}>Select a monster...</Show>
      <Show when={monster()}>
        <pre>{JSON.stringify(monster(), null, 2)}</pre>
      </Show>
    </p>
  );
}
