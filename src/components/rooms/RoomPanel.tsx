import { useParams } from '@solidjs/router';
import { Room } from '../../types';
import { For, Show, createEffect, createSignal } from 'solid-js';
import { RoomReference } from '../references/RoomReference';
import { MonsterReference, ShopReference } from '../references';
import { getRoom } from '../../utils/rooms';

const DirectionsAndNames = [
  ['North', 'N'],
  ['Northeast', 'NE'],
  ['East', 'E'],
  ['Southeast', 'SE'],
  ['South', 'S'],
  ['Southwest', 'SW'],
  ['West', 'W'],
  ['Northwest', 'NW'],
  ['Up', 'U'],
  ['Down', 'D'],
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
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>{room()?.Name}</div>
        </div>
        <h3 class="my-4">Exits</h3>
        <div class="grid grid-cols-[1fr,2fr]">
          <For each={DirectionsAndNames}>
            {([roomLong, roomShort]) => (
              <Show when={room()[roomShort]}>
                <div>{roomLong}</div>
                <div>
                  <RoomReference number={room()[roomShort]} />
                </div>
              </Show>
            )}
          </For>
        </div>
        <h3 class="my-4">References</h3>
        <div class="grid grid-cols-[1fr,2fr]">
          <Show when={room()?.Shop}>
            <div>Shop</div>
            <div>
              <ShopReference number={room()?.Shop} />
            </div>
          </Show>
        </div>
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
