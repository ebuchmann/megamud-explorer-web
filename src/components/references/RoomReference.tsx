import { A } from '@solidjs/router';
import { For, Show, createEffect, createSignal } from 'solid-js';
import { Room, RoomLink } from '../../types';
import { getRoom } from '../../utils/rooms';
import { ItemReference } from './ItemReference';
import { SpellReference } from './SpellReference';

type RoomReferenceProps = {
  number: RoomLink;
};

export function RoomReference(props: RoomReferenceProps) {
  const [room, setRoom] = createSignal<Room>();
  const [roomExtra, setRoomExtra] = createSignal<string[]>();

  createEffect(() => {
    const foundRoom = getRoom(props.number);

    setRoom(foundRoom);
    typeof props.number === 'object'
      ? setRoomExtra(props.number.slice(1))
      : setRoomExtra(undefined);
  });

  return (
    <>
      <A
        class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
        href={`/rooms/${room()?.MapNum}/${room()?.RoomNum}`}
      >
        {room()?.Name} {room()?.LairMax && `(${room()?.LairMax})`}
      </A>
      <Show when={roomExtra()}>
        <div>
          <For each={roomExtra()}>
            {(item) => {
              if (item.includes('Key')) {
                return (
                  <div>
                    - Key <ItemReference number={Number(item.split(' ')[1])} />
                  </div>
                );
              }
              if (item.includes('spell')) {
                return (
                  <div>
                    - Trap:{' '}
                    <SpellReference number={Number(item.split(' ')[1])} />
                  </div>
                );
              }
              if (item.includes('Cast:')) {
                const [pre, post] = item.split(' ')[1].split('|');
                return (
                  <div>
                    {pre !== '0' && (
                      <div>
                        - On enter: {pre}{' '}
                        <SpellReference number={Number(pre)} />
                      </div>
                    )}
                    {post !== '0' && (
                      <div>
                        - On exit: <SpellReference number={Number(post)} />
                      </div>
                    )}
                  </div>
                );
              }
              return <div>- {item}</div>;
            }}
          </For>
        </div>
      </Show>
    </>
  );
}
