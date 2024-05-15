import { useParams } from '@solidjs/router';
import { Direction, Room } from '../../types';
import { For, Show, createEffect, createSignal } from 'solid-js';
import { RoomReference } from '../references/RoomReference';
import { MonsterReference, ShopReference, SpellReference } from '../references';
import { getRoom } from '../../utils/rooms';

const Directions: Direction[] = [
  'N',
  'NE',
  'E',
  'SE',
  'S',
  'SW',
  'W',
  'NW',
  'U',
  'D',
];

export function RoomPanel() {
  const params = useParams();
  const [room, setRoom] = createSignal<Room>();

  createEffect(() => {
    const [map, room] = params.number.split('/');
    if (map && room) {
      const rm = getRoom(params.number);
      setRoom(rm);
    }
  });

  return (
    <>
      <Show when={room()}>
        <div>
          {room()?.Name} ({room()?.MapNum}/{room()?.RoomNum})
        </div>
        <div>Light {room().Light}</div>
        <Show when={room()?.Spell}>
          <div>
            Spell: <SpellReference number={room()?.Spell!} />
          </div>
        </Show>
        <h3 class="my-4">Exits</h3>
        <div class="grid grid-cols-[2rem,2fr]">
          <For each={Directions}>
            {(dir) => (
              <Show when={room()?.[dir]}>
                <div>{dir}</div>
                <div class="flex flex-col">
                  <RoomReference number={room()![dir]!} />
                </div>
              </Show>
            )}
          </For>
        </div>
        <Show when={room()?.Shop}>
          <h3 class="my-4">References</h3>
          <div class="grid grid-cols-[1fr,2fr]">
            <div>Shop</div>
            <div>
              <ShopReference number={room()?.Shop!} />
            </div>
          </div>
        </Show>
        <Show when={room()?.Lair}>
          <h3 class="my-4">Lairs (Max: {room()?.LairMax})</h3>
          <For each={room()?.Lair}>
            {(number) => (
              <div>
                <MonsterReference number={number} />
              </div>
            )}
          </For>
        </Show>
      </Show>
    </>
  );
}
